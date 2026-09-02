"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Clapperboard, RefreshCw, Users } from "lucide-react";

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
import { subscribeToCmsAuthChanged } from "@/lib/cms-auth-events";
import {
  getAdminPhaseThreeCollections,
  getSessionUser,
  saveAdminItem,
} from "@/lib/cms-api";
import type {
  AdminSavePayload,
  CmsSessionUser,
  PhaseThreeCollections,
} from "@/types/cms";

type EditorKey = "videos" | "team-members";

export function PhaseThreeDashboard() {
  const [collections, setCollections] = useState<PhaseThreeCollections | null>(null);
  const [session, setSession] = useState<CmsSessionUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [editor, setEditor] = useState<EditorKey | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState<AdminSavePayload>({
    title: "",
    subtitle: "",
    url: "",
    name: "",
    position: "",
    image_url: "",
    qualifications: "",
    subject: "",
    email: "",
    phone: "",
    team_group: "academic",
    show_on_homepage: false,
    is_published: true,
  });

  const emptyForm = (): AdminSavePayload => ({
    title: "",
    subtitle: "",
    url: "",
    name: "",
    position: "",
    image_url: "",
    qualifications: "",
    subject: "",
    email: "",
    phone: "",
    team_group: "academic",
    show_on_homepage: false,
    is_published: true,
  });

  useEffect(() => {
    const syncSession = async () => {
      const user = await getSessionUser();
      setSession(user);
      if (!user.authenticated || !user.is_staff) {
        setCollections(null);
        setLoading(false);
        return;
      }

      await reload();
    };

    void syncSession();
    const unsubscribe = subscribeToCmsAuthChanged(() => {
      void syncSession();
    });

    return unsubscribe;
  }, []);

  const reload = async () => {
    setLoading(true);
    try {
      const user = await getSessionUser();
      setSession(user);
      if (!user.authenticated || !user.is_staff) {
        setCollections(null);
        return;
      }

      const data = await getAdminPhaseThreeCollections();
      setCollections(data);
    } catch {
      const user = await getSessionUser();
      setSession(user);
      if (!user.authenticated || !user.is_staff) {
        setCollections(null);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!session?.authenticated || !session.is_staff) {
    return null;
  }

  const openCreate = (target: EditorKey) => {
    setEditor(target);
    setMessage("");
    setForm(emptyForm());
  };

  const closeEditor = () => {
    setEditor(null);
    setMessage("");
  };

  const handleSave = async () => {
    if (!editor) return;

    try {
      setSaving(true);
      setMessage("");

      if (editor === "videos") {
        if (!form.title?.trim()) {
          setMessage("Title is required.");
          return;
        }

        if (!form.url?.trim()) {
          setMessage("Video URL is required.");
          return;
        }

        await saveAdminItem("videos", {
          title: form.title,
          subtitle: form.subtitle,
          url: form.url,
          is_published: form.is_published,
        });
      } else {
        if (!form.name?.trim()) {
          setMessage("Name is required.");
          return;
        }

        if (!form.position?.trim()) {
          setMessage("Position is required.");
          return;
        }

        await saveAdminItem("team-members", {
          name: form.name,
          position: form.position,
          image_url: form.image_url,
          qualifications: form.qualifications,
          subject: form.subject,
          email: form.email,
          phone: form.phone,
          team_group: form.team_group,
          show_on_homepage: form.show_on_homepage,
          is_published: form.is_published,
        });
      }

      await reload();
      setForm(emptyForm());
      closeEditor();
      setMessage("Saved successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D41D33]">Phase 3 CMS</p>
          <h2 className="text-3xl font-bold text-gray-900">Videos and Team</h2>
          <p className="text-gray-600">Manage video stories and team members shown across the public site.</p>
        </div>
        <Button onClick={() => void reload()} className="bg-[#D41D33] text-white hover:bg-[#b31828]">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D41D33]/10 text-[#D41D33]">
              <Clapperboard className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl">Videos</CardTitle>
            <CardDescription>Embeds and supporting copy for the School Life video experience.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-gray-900">{loading ? "--" : collections?.videos.length ?? 0}</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D41D33]/10 text-[#D41D33]">
              <Users className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl">Team Members</CardTitle>
            <CardDescription>Homepage team cards plus the About team page roster.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-gray-900">{loading ? "--" : collections?.teamMembers.length ?? 0}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr,1fr]">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
            <div>
              <CardTitle className="text-2xl">Video Entries</CardTitle>
              <CardDescription>These entries power the video section and the full video gallery route.</CardDescription>
            </div>
            <Button variant="outline" className="border-[#D41D33]/20 text-[#D41D33]" onClick={() => openCreate("videos")}>
              Add video
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/admin/videos" className="inline-flex text-sm font-medium text-[#D41D33] hover:underline">
              View all listings
            </Link>
            {!loading && (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/80 p-4 text-sm text-gray-600">
                {collections?.videos.length
                  ? `${collections.videos.length} video item(s). Open View all listings to browse them.`
                  : "No videos added yet. Add one here, then review the saved entries from the dedicated listing page."}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
            <div>
              <CardTitle className="text-2xl">Team Members</CardTitle>
              <CardDescription>These entries power the homepage team image section.</CardDescription>
            </div>
            <Button variant="outline" className="border-[#D41D33]/20 text-[#D41D33]" onClick={() => openCreate("team-members")}>
              Add member
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/admin/team-members" className="inline-flex text-sm font-medium text-[#D41D33] hover:underline">
              View all listings
            </Link>
            {!loading && (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/80 p-4 text-sm text-gray-600">
                {collections?.teamMembers.length
                  ? `${collections.teamMembers.length} team member item(s). Open View all listings to browse the full roster.`
                  : "No team members added yet. Add one here, then use the dedicated listing page to review the roster."}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={Boolean(editor)} onOpenChange={(open) => !open && closeEditor()}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editor === "videos" ? "Create Video Entry" : "Create Team Member"}
            </DialogTitle>
            <DialogDescription>
              {editor === "videos"
                ? "Use the same fields as the current frontend video object."
                : "Use one shared profile for homepage and About team sections."}
            </DialogDescription>
          </DialogHeader>

          {editor && (
            <div className="space-y-4">
              {editor === "videos" ? (
                <>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Title
                    <input
                      className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]"
                      value={form.title ?? ""}
                      onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                    />
                  </label>

                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Subtitle
                    <textarea
                      className="min-h-[120px] rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]"
                      value={form.subtitle ?? ""}
                      onChange={(event) => setForm((current) => ({ ...current, subtitle: event.target.value }))}
                    />
                  </label>

                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Video URL
                    <input
                      className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]"
                      value={form.url ?? ""}
                      onChange={(event) => setForm((current) => ({ ...current, url: event.target.value }))}
                    />
                  </label>
                </>
              ) : (
                <>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Name
                    <input
                      className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]"
                      value={form.name ?? ""}
                      onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                    />
                  </label>

                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Position
                    <input
                      className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]"
                      value={form.position ?? ""}
                      onChange={(event) => setForm((current) => ({ ...current, position: event.target.value }))}
                    />
                  </label>

                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Image path or URL
                    <input
                      className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]"
                      value={form.image_url ?? ""}
                      onChange={(event) => setForm((current) => ({ ...current, image_url: event.target.value }))}
                    />
                  </label>

                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Team Group
                    <select
                      className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]"
                      value={form.team_group ?? "academic"}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          team_group: event.target.value as "academic" | "eca",
                        }))
                      }
                    >
                      <option value="academic">Academic</option>
                      <option value="eca">ECA</option>
                    </select>
                  </label>

                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Subject or Specialty
                    <input
                      className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]"
                      value={form.subject ?? ""}
                      onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value }))}
                    />
                  </label>

                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Email
                    <input
                      className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]"
                      value={form.email ?? ""}
                      onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                    />
                  </label>

                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Phone
                    <input
                      className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]"
                      value={form.phone ?? ""}
                      onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                    />
                  </label>

                  <label className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700">
                    <input
                      type="checkbox"
                      checked={Boolean(form.show_on_homepage)}
                      onChange={(event) => setForm((current) => ({ ...current, show_on_homepage: event.target.checked }))}
                    />
                    Show in homepage team section
                  </label>
                </>
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
                  {saving ? "Saving..." : "Save item"}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
