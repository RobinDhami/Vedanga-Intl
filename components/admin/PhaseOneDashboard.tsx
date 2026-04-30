"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import {
  CalendarDays,
  FileText,
  LayoutTemplate,
  Lock,
  LogOut,
  Megaphone,
  Plus,
  RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { emitCmsAuthChanged } from "@/lib/cms-auth-events";
import {
  getAdminPhaseOneCollections,
  getPhaseOneCollections,
  getSessionUser,
  loginToCms,
  logoutFromCms,
  saveAdminItem,
  validatePhaseOnePayload,
  updateAdminItem,
} from "@/lib/cms-api";
import type {
  AdminSavePayload,
  CmsSessionUser,
  PhaseOneCollections,
} from "@/types/cms";

const collectionsMeta = [
  {
    key: "heroSlides",
    label: "Hero Slides",
    description: "Homepage carousel content and call-to-action buttons.",
    icon: LayoutTemplate,
  },
  {
    key: "news",
    label: "News",
    description: "Articles, categories, author info, and publication status.",
    icon: FileText,
  },
  {
    key: "events",
    label: "Events",
    description: "Upcoming school events, venue details, and schedules.",
    icon: CalendarDays,
  },
  {
    key: "notices",
    label: "Notices",
    description: "Short urgent announcements and homepage pop-up notices.",
    icon: Megaphone,
  },
] as const;

type CollectionKey = (typeof collectionsMeta)[number]["key"];
type RouteKey = "hero-slides" | "notices" | "news" | "events";

const NEWS_CATEGORY_OPTIONS = ["Academic", "Events", "Facilities", "International", "Sports"] as const;
const EVENT_CATEGORY_OPTIONS = ["Academic", "Sports", "Cultural", "Community"] as const;

const routeMap: Record<CollectionKey, RouteKey> = {
  heroSlides: "hero-slides",
  notices: "notices",
  news: "news",
  events: "events",
};

export function PhaseOneDashboard() {
  const [collections, setCollections] = useState<PhaseOneCollections | null>(null);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"api" | "seed">("api");
  const [session, setSession] = useState<CmsSessionUser | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [activeEditor, setActiveEditor] = useState<CollectionKey | null>(null);
  const [editingIdentifier, setEditingIdentifier] = useState<string | number | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [form, setForm] = useState<AdminSavePayload>({
    title: "",
    subtitle: "",
    excerpt: "",
    description: "",
    category: "",
    author: "",
    venue: "",
    date: "",
    cta_text: "",
    cta_link: "",
    link: "",
    content: "",
    is_published: true,
  });

  const getEmptyForm = (): AdminSavePayload => ({
    title: "",
    subtitle: "",
    excerpt: "",
    description: "",
    category: "",
    author: "",
    venue: "",
    date: "",
    cta_text: "",
    cta_link: "",
    link: "",
    content: "",
    is_published: true,
  });

  const closeEditor = () => {
    setActiveEditor(null);
    setEditingIdentifier(null);
    setMessage("");
  };

  const load = async () => {
    setLoading(true);
    try {
      const data =
        session?.authenticated && session.is_staff
          ? await getAdminPhaseOneCollections()
          : await getPhaseOneCollections();
      setCollections(data);
      setSource(process.env.NEXT_PUBLIC_CMS_API_BASE_URL ? "api" : "seed");
    } catch {
      const data = await getPhaseOneCollections();
      setCollections(data);
      setSource("seed");
    }
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, [session?.authenticated, session?.is_staff]);

  useEffect(() => {
    const bootstrap = async () => {
      const user = await getSessionUser();
      setSession(user);
      setCheckingSession(false);
    };

    void bootstrap();
  }, []);

  const openCreate = (key: CollectionKey) => {
    setActiveEditor(key);
    setEditingIdentifier(null);
    setMessage("");
    setForm(getEmptyForm());
  };

  const buildPayload = (key: CollectionKey): AdminSavePayload => {
    if (key === "heroSlides") {
      return {
        title: form.title,
        subtitle: form.subtitle,
        cta_text: form.cta_text,
        cta_link: form.cta_link,
        is_published: form.is_published,
      };
    }

    if (key === "notices") {
      return {
        title: form.title,
        excerpt: form.excerpt,
        link: form.link,
        is_published: form.is_published,
      };
    }

    if (key === "news") {
      return {
        title: form.title,
        category: form.category,
        excerpt: form.excerpt,
        author: form.author,
        content: form.content,
        is_published: form.is_published,
      };
    }

    return {
      title: form.title,
      category: form.category,
      description: form.description,
      venue: form.venue,
      date: form.date,
      is_published: form.is_published,
    };
  };

  const handleSave = async () => {
    if (!activeEditor) return;

    const collection = routeMap[activeEditor];
    const validation = validatePhaseOnePayload(collection, form);
    if (!validation.valid) {
      setMessage(validation.message ?? "Please complete the required fields.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");
      const payload = buildPayload(activeEditor);

      if (editingIdentifier !== null) {
        await updateAdminItem(collection, editingIdentifier, payload);
      } else {
        await saveAdminItem(collection, payload);
      }
      await load();
      setForm(getEmptyForm());
      closeEditor();
      setMessage(editingIdentifier !== null ? "Updated successfully." : "Saved successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    try {
      const user = await loginToCms(credentials.username, credentials.password);
      setSession(user);
      emitCmsAuthChanged();
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutFromCms();
      emitCmsAuthChanged();
    } finally {
      setSession({ authenticated: false, is_staff: false });
      closeEditor();
    }
  };

  if (checkingSession) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-gray-500">Checking admin session...</p>
      </div>
    );
  }

  if (!session?.authenticated || !session.is_staff) {
    return (
      <div className="mx-auto max-w-md">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="space-y-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D41D33]/10 text-[#D41D33]">
              <Lock className="h-7 w-7" />
            </div>
            <div>
              <CardTitle className="text-3xl">Staff sign in</CardTitle>
              <CardDescription>
                Use your Django staff account to manage hero slides, news, events, and notices.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <label className="grid gap-2 text-sm font-medium text-gray-700">
                Username
                <input
                  className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]"
                  value={credentials.username}
                  onChange={(event) => setCredentials((current) => ({ ...current, username: event.target.value }))}
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-gray-700">
                Password
                <input
                  type="password"
                  className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]"
                  value={credentials.password}
                  onChange={(event) => setCredentials((current) => ({ ...current, password: event.target.value }))}
                />
              </label>

              {authError && <p className="text-sm text-red-600">{authError}</p>}

              <Button type="submit" disabled={authLoading} className="w-full bg-[#D41D33] text-white hover:bg-[#b31828]">
                {authLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-red-100 bg-[radial-gradient(circle_at_top_left,_rgba(212,29,51,0.14),_transparent_30%),linear-gradient(135deg,#fff7f6,#ffffff)] p-8 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D41D33]">Phase 1 CMS</p>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Content dashboard for the school website</h1>
            <p className="text-base text-gray-600">
              This is the lean custom admin surface for the first content modules: hero slides, news, events, and
              notices.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600">
              Signed in as {session.username}
            </span>
            <span className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600">
              Data source: {source === "api" ? "CMS API" : "seed fallback"}
            </span>
            <Button onClick={() => void load()} className="bg-[#D41D33] text-white hover:bg-[#b31828]">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" onClick={() => void handleLogout()}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {collectionsMeta.map(({ key, label, description, icon: Icon }) => (
          <Card key={key} className="border-gray-200 shadow-sm">
            <CardHeader className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D41D33]/10 text-[#D41D33]">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl">{label}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-gray-900">{loading || !collections ? "--" : collections[key].length}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        {collectionsMeta.map(({ key, label, description }) => {
          const itemCount = collections?.[key]?.length ?? 0;
          return (
            <Card key={key} className="border-gray-200 shadow-sm">
              <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
                <div className="space-y-2">
                  <CardTitle className="text-2xl">{label}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </div>
                <Button variant="outline" className="border-[#D41D33]/20 text-[#D41D33] hover:bg-[#D41D33]/5 hover:text-[#D41D33]" onClick={() => openCreate(key)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href={`/admin/${routeMap[key]}`} className="inline-flex text-sm font-medium text-[#D41D33] hover:underline">
                  View all listings
                </Link>
                {loading && <p className="text-sm text-gray-500">Loading content...</p>}
                {!loading && (
                  <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/80 p-4 text-sm text-gray-600">
                    {itemCount === 0
                      ? "No items available yet. Use Add to create the first item, then open the dedicated listing page to review it."
                      : `${itemCount} item(s) in this collection. Open View all listings to browse the saved entries.`}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </section>

      <Dialog open={Boolean(activeEditor)} onOpenChange={(open) => !open && closeEditor()}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {activeEditor
                ? `${editingIdentifier !== null ? "Edit" : "Create"} ${collectionsMeta.find((item) => item.key === activeEditor)?.label}`
                : "Quick editor"}
            </DialogTitle>
            <DialogDescription>Minimal custom admin form for phase 1.</DialogDescription>
          </DialogHeader>

          {activeEditor && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-gray-700">
                  Title
                  <input
                    className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]"
                    value={form.title ?? ""}
                    onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                  />
                </label>

                {(activeEditor === "heroSlides" || activeEditor === "news" || activeEditor === "events") && (
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    {activeEditor === "heroSlides" ? "Subtitle" : "Category"}
                    {activeEditor === "heroSlides" ? (
                      <input
                        className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]"
                        value={form.subtitle ?? ""}
                        onChange={(event) => setForm((current) => ({ ...current, subtitle: event.target.value }))}
                      />
                    ) : (
                      <select
                        className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-[#D41D33]"
                        value={form.category ?? ""}
                        onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                      >
                        <option value="">Select a category</option>
                        {(activeEditor === "news" ? NEWS_CATEGORY_OPTIONS : EVENT_CATEGORY_OPTIONS).map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                  </label>
                )}
              </div>

              {(activeEditor === "news" || activeEditor === "notices" || activeEditor === "events") && (
                <label className="grid gap-2 text-sm font-medium text-gray-700">
                  Summary
                  <textarea
                    className="min-h-[120px] rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]"
                    value={(form.excerpt ?? form.description) || ""}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        ...(activeEditor === "events" ? { description: event.target.value } : { excerpt: event.target.value }),
                      }))
                    }
                  />
                </label>
              )}

              {activeEditor === "news" && (
                <>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Author
                    <input
                      className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]"
                      value={form.author ?? ""}
                      onChange={(event) => setForm((current) => ({ ...current, author: event.target.value }))}
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Content
                    <textarea
                      className="min-h-[180px] rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]"
                      value={form.content ?? ""}
                      onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))}
                    />
                  </label>
                </>
              )}

              {activeEditor === "events" && (
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Venue
                    <input
                      className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]"
                      value={form.venue ?? ""}
                      onChange={(event) => setForm((current) => ({ ...current, venue: event.target.value }))}
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Event date
                    <input
                      type="date"
                      className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]"
                      value={form.date ?? ""}
                      onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))}
                    />
                  </label>
                </div>
              )}

              {activeEditor === "heroSlides" && (
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    CTA text
                    <input
                      className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]"
                      value={form.cta_text ?? ""}
                      onChange={(event) => setForm((current) => ({ ...current, cta_text: event.target.value }))}
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    CTA link
                    <input
                      className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]"
                      value={form.cta_link ?? ""}
                      onChange={(event) => setForm((current) => ({ ...current, cta_link: event.target.value }))}
                    />
                  </label>
                </div>
              )}

              {activeEditor === "notices" && (
                <label className="grid gap-2 text-sm font-medium text-gray-700">
                  Notice link
                  <input
                    className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]"
                    value={form.link ?? ""}
                    onChange={(event) => setForm((current) => ({ ...current, link: event.target.value }))}
                  />
                </label>
              )}

              <label className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={Boolean(form.is_published)}
                  onChange={(event) => setForm((current) => ({ ...current, is_published: event.target.checked }))}
                />
                Publish immediately
              </label>

              {message && <p className="text-sm text-gray-600">{message}</p>}

              <DialogFooter>
                <Button variant="outline" onClick={closeEditor}>
                  Close
                </Button>
                <Button onClick={() => void handleSave()} disabled={saving} className="bg-[#D41D33] text-white hover:bg-[#b31828]">
                  {saving ? "Saving..." : editingIdentifier !== null ? "Update item" : "Save item"}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
