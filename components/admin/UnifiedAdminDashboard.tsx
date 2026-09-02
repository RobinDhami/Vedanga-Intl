"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import {
  Briefcase,
  CalendarDays,
  Clapperboard,
  FileText,
  GalleryVertical,
  LayoutTemplate,
  Lock,
  LogOut,
  Megaphone,
  MessagesSquare,
  Plus,
  RefreshCw,
  Users,
  Wrench,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
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
  type AdminCollection,
  getAdminPhaseFourCollections,
  getAdminPhaseOneCollections,
  getAdminPhaseThreeCollections,
  getAdminPhaseTwoCollections,
  getSessionUser,
  loginToCms,
  logoutFromCms,
  saveAdminItem,
  validatePhaseOnePayload,
} from "@/lib/cms-api";
import type {
  AdminSavePayload,
  CmsSessionUser,
} from "@/types/cms";

const NEWS_CATEGORY_OPTIONS = ["Academic", "Events", "Facilities", "International", "Sports"] as const;
const EVENT_CATEGORY_OPTIONS = ["Academic", "Sports", "Cultural", "Community"] as const;
const GALLERY_CATEGORY_OPTIONS = ["School Life", "Academics", "Sports", "Events", "Activities"] as const;

const createCollections = [
  { key: "hero-slides", title: "Hero Slides", description: "Homepage carousel content and call-to-action buttons.", countKey: "heroSlides", href: "/admin/hero-slides", icon: LayoutTemplate, buttonLabel: "Add slide" },
  { key: "news", title: "News", description: "Articles, categories, author info, and publication status.", countKey: "news", href: "/admin/news", icon: FileText, buttonLabel: "Add news" },
  { key: "events", title: "Events", description: "Upcoming school events, venue details, and schedules.", countKey: "events", href: "/admin/events", icon: CalendarDays, buttonLabel: "Add event" },
  { key: "notices", title: "Notices", description: "Short urgent announcements and homepage pop-up notices.", countKey: "notices", href: "/admin/notices", icon: Megaphone, buttonLabel: "Add notice" },
  { key: "gallery-images", title: "Gallery Images", description: "Curate the website gallery with categories and publish state.", countKey: "galleryImages", href: "/admin/gallery-images", icon: GalleryVertical, buttonLabel: "Add image" },
  { key: "videos", title: "Videos", description: "Embeds and supporting copy for the School Life video experience.", countKey: "videos", href: "/admin/videos", icon: Clapperboard, buttonLabel: "Add video" },
  { key: "team-members", title: "Team Members", description: "Homepage team cards plus the About team page roster.", countKey: "teamMembers", href: "/admin/team-members", icon: Users, buttonLabel: "Add member" },
  { key: "clubs", title: "Clubs", description: "Student clubs shown on the School Life listing and detail pages.", countKey: "clubs", href: "/admin/clubs", icon: Wrench, buttonLabel: "Add club" },
  { key: "job-openings", title: "Job Openings", description: "Open roles and requirements for the careers page.", countKey: "jobOpenings", href: "/admin/job-openings", icon: Briefcase, buttonLabel: "Add opening" },
] as const;

const reviewCollections = [
  { key: "contact-submissions", title: "Contact Submissions", description: "Incoming questions and outreach from the contact page.", countKey: "contactSubmissions", href: "/admin/contact-submissions", icon: MessagesSquare },
] as const;

type CreateCollectionKey = (typeof createCollections)[number]["key"];

type UnifiedCounts = {
  heroSlides: number;
  news: number;
  events: number;
  notices: number;
  galleryImages: number;
  contactSubmissions: number;
  videos: number;
  teamMembers: number;
  clubs: number;
  jobOpenings: number;
};

function emptyFormFor(collection: CreateCollectionKey): AdminSavePayload {
  switch (collection) {
    case "hero-slides":
      return { title: "", subtitle: "", cta_text: "", cta_link: "", image_url: "", is_published: true };
    case "news":
      return { title: "", category: "", excerpt: "", author: "", content: "", image_url: "", is_published: true };
    case "events":
      return { title: "", category: "", description: "", venue: "", date: "", image_url: "", is_published: true };
    case "notices":
      return { title: "", excerpt: "", link: "", image_url: "", show_in_overlay: false, is_published: true };
    case "gallery-images":
      return { title: "", category: "", description: "", image_url: "", is_published: true };
    case "videos":
      return { title: "", subtitle: "", url: "", is_published: true };
    case "team-members":
      return { name: "", position: "", image_url: "", qualifications: "", subject: "", email: "", phone: "", team_group: "academic", show_on_homepage: false, is_published: true };
    case "job-openings":
      return { title: "", department: "", employment_type: "", experience: "", education: "", description: "", image_url: "", is_published: true };
    case "clubs":
      return { name: "", description: "", icon_name: "code", members: 0, meeting_day: "", activities: [], advisor: "", image_url: "", is_published: true };
  }
}

function initialCounts(): UnifiedCounts {
  return { heroSlides: 0, news: 0, events: 0, notices: 0, galleryImages: 0, contactSubmissions: 0, videos: 0, teamMembers: 0, clubs: 0, jobOpenings: 0 };
}

export function UnifiedAdminDashboard() {
  const [session, setSession] = useState<CmsSessionUser | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [counts, setCounts] = useState<UnifiedCounts>(initialCounts());
  const [editorOpen, setEditorOpen] = useState(false);
  const [activeCollection, setActiveCollection] = useState<CreateCollectionKey | null>(null);
  const [form, setForm] = useState<AdminSavePayload>({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const [phaseOne, phaseTwo, phaseThree, phaseFour] = await Promise.all([
        getAdminPhaseOneCollections(),
        getAdminPhaseTwoCollections(),
        getAdminPhaseThreeCollections(),
        getAdminPhaseFourCollections(),
      ]);

      setCounts({
        heroSlides: phaseOne.heroSlides.length,
        news: phaseOne.news.length,
        events: phaseOne.events.length,
        notices: phaseOne.notices.length,
        galleryImages: phaseTwo.galleryImages.length,
        contactSubmissions: phaseTwo.contactSubmissions.length,
        videos: phaseThree.videos.length,
        teamMembers: phaseThree.teamMembers.length,
        clubs: phaseFour.clubs.length,
        jobOpenings: phaseFour.jobOpenings.length,
      });
    } catch {
      setCounts(initialCounts());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const bootstrap = async () => {
      const user = await getSessionUser();
      setSession(user);
      setCheckingSession(false);

      if (user.authenticated && user.is_staff) {
        await load();
      } else {
        setLoading(false);
      }
    };

    void bootstrap();
  }, []);

  const openCreate = (collection: CreateCollectionKey) => {
    setActiveCollection(collection);
    setForm(emptyFormFor(collection));
    setMessage("");
    setEditorOpen(true);
  };

  const closeEditor = () => {
    setEditorOpen(false);
    setActiveCollection(null);
    setForm({});
    setMessage("");
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    try {
      const user = await loginToCms(credentials.username, credentials.password);
      setSession(user);
      emitCmsAuthChanged();
      await load();
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
      setCounts(initialCounts());
      closeEditor();
    }
  };

  const validateCurrentForm = () => {
    if (!activeCollection) {
      return { valid: false, message: "No collection selected." };
    }

    if (activeCollection === "hero-slides" || activeCollection === "news" || activeCollection === "events" || activeCollection === "notices") {
      return validatePhaseOnePayload(activeCollection, form);
    }

    if (activeCollection === "gallery-images") {
      if (!form.title?.trim()) return { valid: false, message: "Title is required." };
      if (!form.image_url?.trim()) return { valid: false, message: "Gallery image is required." };
      return { valid: true };
    }

    if (activeCollection === "videos") {
      if (!form.title?.trim()) return { valid: false, message: "Title is required." };
      if (!form.url?.trim()) return { valid: false, message: "Video URL is required." };
      return { valid: true };
    }

    if (activeCollection === "team-members") {
      if (!form.name?.trim()) return { valid: false, message: "Name is required." };
      if (!form.position?.trim()) return { valid: false, message: "Position is required." };
      return { valid: true };
    }

    if (activeCollection === "clubs") {
      if (!form.name?.trim()) return { valid: false, message: "Name is required." };
      if (!form.description?.trim()) return { valid: false, message: "Description is required." };
      if (!form.image_url?.trim()) return { valid: false, message: "Club image is required." };
      return { valid: true };
    }

    if (!form.title?.trim()) return { valid: false, message: "Title is required." };
    if (!form.department?.trim()) return { valid: false, message: "Department is required." };
    if (!form.employment_type?.trim()) return { valid: false, message: "Employment type is required." };
    if (!form.experience?.trim()) return { valid: false, message: "Experience is required." };
    if (!form.education?.trim()) return { valid: false, message: "Education is required." };
    if (!form.description?.trim()) return { valid: false, message: "Description is required." };
    return { valid: true };
  };

  const buildPayload = (): AdminSavePayload => {
    switch (activeCollection) {
      case "hero-slides":
        return { title: form.title, subtitle: form.subtitle, cta_text: form.cta_text, cta_link: form.cta_link, image_url: form.image_url, is_published: form.is_published };
      case "news":
        return { title: form.title, category: form.category, excerpt: form.excerpt, author: form.author, content: form.content, image_url: form.image_url, is_published: form.is_published };
      case "events":
        return { title: form.title, category: form.category, description: form.description, venue: form.venue, date: form.date, image_url: form.image_url, is_published: form.is_published };
      case "notices":
        return { title: form.title, excerpt: form.excerpt, link: form.link, image_url: form.image_url, show_in_overlay: form.show_in_overlay, is_published: form.is_published };
      case "gallery-images":
        return { title: form.title, category: form.category, description: form.description, image_url: form.image_url, is_published: form.is_published };
      case "videos":
        return { title: form.title, subtitle: form.subtitle, url: form.url, is_published: form.is_published };
      case "team-members":
        return { name: form.name, position: form.position, image_url: form.image_url, qualifications: form.qualifications, subject: form.subject, email: form.email, phone: form.phone, team_group: form.team_group, show_on_homepage: form.show_on_homepage, is_published: form.is_published };
      case "clubs":
        return { name: form.name, description: form.description, icon_name: form.icon_name, members: form.members, meeting_day: form.meeting_day, activities: form.activities, advisor: form.advisor, image_url: form.image_url, is_published: form.is_published };
      case "job-openings":
        return { title: form.title, department: form.department, employment_type: form.employment_type, experience: form.experience, education: form.education, description: form.description, image_url: form.image_url, is_published: form.is_published };
      default:
        return {};
    }
  };

  const handleSave = async () => {
    if (!activeCollection) return;

    const validation = validateCurrentForm();
    if (!validation.valid) {
      setMessage(validation.message ?? "Please complete the required fields.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");
      await saveAdminItem(activeCollection as AdminCollection, buildPayload());
      await load();
      closeEditor();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  if (checkingSession) {
    return (
      <main className="min-h-screen bg-[#fcfcfd] px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-sm text-gray-500">Checking admin session...</p>
        </div>
      </main>
    );
  }

  if (!session?.authenticated || !session.is_staff) {
    return (
      <main className="min-h-screen bg-[#fcfcfd] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D41D33]/10 text-[#D41D33]">
                <Lock className="h-7 w-7" />
              </div>
              <div>
                <CardTitle className="text-3xl">Staff sign in</CardTitle>
                <CardDescription>
                  Use your website administrator account to manage content from one unified dashboard.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <label className="grid gap-2 text-sm font-medium text-gray-700">
                  Username
                  <input className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={credentials.username} onChange={(event) => setCredentials((current) => ({ ...current, username: event.target.value }))} />
                </label>
                <label className="grid gap-2 text-sm font-medium text-gray-700">
                  Password
                  <input type="password" className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={credentials.password} onChange={(event) => setCredentials((current) => ({ ...current, password: event.target.value }))} />
                </label>
                {authError && <p className="text-sm text-red-600">{authError}</p>}
                <Button type="submit" disabled={authLoading} className="w-full bg-[#D41D33] text-white hover:bg-[#b31828]">
                  {authLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fcfcfd] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <section className="rounded-3xl border border-red-100 bg-[radial-gradient(circle_at_top_left,_rgba(212,29,51,0.14),_transparent_30%),linear-gradient(135deg,#fff7f6,#ffffff)] p-8 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D41D33]">Unified CMS</p>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">One admin surface for the school website</h1>
              <p className="text-base text-gray-600">
                Create content here, review listings on dedicated routes, and manage the site without bouncing between phase-based dashboards.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600">
                Signed in as {session.username}
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

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[...createCollections, ...reviewCollections].map(({ title, description, icon: Icon, countKey }) => (
            <Card key={title} className="border-gray-200 shadow-sm">
              <CardHeader className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D41D33]/10 text-[#D41D33]">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl">{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-gray-900">{loading ? "--" : counts[countKey]}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Content Collections</h2>
            <p className="text-sm text-gray-600">Create new entries here and open the listing pages for editing, deleting, and review.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {createCollections.map(({ key, title, description, href, buttonLabel, countKey }) => (
              <Card key={key} className="border-gray-200 shadow-sm">
                <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </div>
                  <Button variant="outline" className="border-[#D41D33]/20 text-[#D41D33] hover:bg-[#D41D33]/5 hover:text-[#D41D33]" onClick={() => openCreate(key)}>
                    <Plus className="mr-2 h-4 w-4" />
                    {buttonLabel}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href={href} className="inline-flex text-sm font-medium text-[#D41D33] hover:underline">
                    View all listings
                  </Link>
                  {!loading && (
                    <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/80 p-4 text-sm text-gray-600">
                      {counts[countKey] === 0
                        ? "No items available yet. Use Add to create the first entry, then manage the full collection from its listing page."
                        : "Entries exist in this collection. Open the listing page to edit, delete, or review everything in one place."}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Review Queues</h2>
            <p className="text-sm text-gray-600">Collections that are mainly for review rather than creation.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {reviewCollections.map(({ key, title, description, href, countKey }) => (
              <Card key={key} className="border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href={href} className="inline-flex text-sm font-medium text-[#D41D33] hover:underline">
                    View all submissions
                  </Link>
                  {!loading && (
                    <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/80 p-4 text-sm text-gray-600">
                      {counts[countKey] === 0
                        ? "No submissions yet. New messages will appear on the dedicated review page."
                        : `${counts[countKey]} submission(s) waiting in the review queue.`}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <Dialog open={editorOpen} onOpenChange={(open) => !open && closeEditor()}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {activeCollection
                ? `Create ${createCollections.find((collection) => collection.key === activeCollection)?.title ?? "Item"}`
                : "Create item"}
            </DialogTitle>
            <DialogDescription>Use this unified form surface to create new CMS entries.</DialogDescription>
          </DialogHeader>

          {activeCollection && (
            <div className="space-y-4">
              {activeCollection === "hero-slides" && (
                <>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Title
                    <input className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.title ?? ""} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} />
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Subtitle
                    <input className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.subtitle ?? ""} onChange={(event) => setForm((current) => ({ ...current, subtitle: event.target.value }))} />
                  </label>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="grid gap-2 text-sm font-medium text-gray-700">
                      CTA text
                      <input className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.cta_text ?? ""} onChange={(event) => setForm((current) => ({ ...current, cta_text: event.target.value }))} />
                    </label>
                    <label className="grid gap-2 text-sm font-medium text-gray-700">
                      CTA link
                      <input className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.cta_link ?? ""} onChange={(event) => setForm((current) => ({ ...current, cta_link: event.target.value }))} />
                    </label>
                  </div>
                  <ImageUploadField collection="hero-slides" value={form.image_url} onChange={(image_url) => setForm((current) => ({ ...current, image_url }))} required />
                </>
              )}

              {activeCollection === "notices" && (
                <>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Title
                    <input className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.title ?? ""} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} />
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Summary
                    <textarea className="min-h-[120px] rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.excerpt ?? ""} onChange={(event) => setForm((current) => ({ ...current, excerpt: event.target.value }))} />
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Notice link
                    <input className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.link ?? ""} onChange={(event) => setForm((current) => ({ ...current, link: event.target.value }))} />
                  </label>
                  <ImageUploadField collection="notices" value={form.image_url} onChange={(image_url) => setForm((current) => ({ ...current, image_url }))} />
                  <label className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700">
                    <input type="checkbox" checked={Boolean(form.show_in_overlay)} onChange={(event) => setForm((current) => ({ ...current, show_in_overlay: event.target.checked }))} />
                    Show this notice in homepage overlay
                  </label>
                </>
              )}

              {activeCollection === "news" && (
                <>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Title
                    <input className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.title ?? ""} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} />
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Category
                    <select className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.category ?? ""} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}>
                      <option value="">Select a category</option>
                      {NEWS_CATEGORY_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Summary
                    <textarea className="min-h-[120px] rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.excerpt ?? ""} onChange={(event) => setForm((current) => ({ ...current, excerpt: event.target.value }))} />
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Author
                    <input className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.author ?? ""} onChange={(event) => setForm((current) => ({ ...current, author: event.target.value }))} />
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Content
                    <textarea className="min-h-[180px] rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.content ?? ""} onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))} />
                  </label>
                  <ImageUploadField collection="news" value={form.image_url} onChange={(image_url) => setForm((current) => ({ ...current, image_url }))} required />
                </>
              )}

              {activeCollection === "events" && (
                <>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Title
                    <input className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.title ?? ""} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} />
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Category
                    <select className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.category ?? ""} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}>
                      <option value="">Select a category</option>
                      {EVENT_CATEGORY_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Summary
                    <textarea className="min-h-[120px] rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.description ?? ""} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} />
                  </label>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="grid gap-2 text-sm font-medium text-gray-700">
                      Venue
                      <input className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.venue ?? ""} onChange={(event) => setForm((current) => ({ ...current, venue: event.target.value }))} />
                    </label>
                    <label className="grid gap-2 text-sm font-medium text-gray-700">
                      Event date
                      <input type="date" className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.date ?? ""} onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))} />
                    </label>
                  </div>
                  <ImageUploadField collection="events" value={form.image_url} onChange={(image_url) => setForm((current) => ({ ...current, image_url }))} required />
                </>
              )}

              {activeCollection === "gallery-images" && (
                <>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Title
                    <input className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.title ?? ""} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} />
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Category
                    <select className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.category ?? ""} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}>
                      <option value="">Select a category</option>
                      {GALLERY_CATEGORY_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Description
                    <textarea className="min-h-[120px] rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.description ?? ""} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} />
                  </label>
                  <ImageUploadField collection="gallery-images" value={form.image_url} onChange={(image_url) => setForm((current) => ({ ...current, image_url }))} required />
                </>
              )}

              {activeCollection === "videos" && (
                <>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Title
                    <input className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.title ?? ""} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} />
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Subtitle
                    <textarea className="min-h-[120px] rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.subtitle ?? ""} onChange={(event) => setForm((current) => ({ ...current, subtitle: event.target.value }))} />
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Video URL
                    <input className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.url ?? ""} onChange={(event) => setForm((current) => ({ ...current, url: event.target.value }))} />
                  </label>
                </>
              )}

              {activeCollection === "team-members" && (
                <>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Name
                    <input className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.name ?? ""} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Position
                    <input className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.position ?? ""} onChange={(event) => setForm((current) => ({ ...current, position: event.target.value }))} />
                  </label>
                  <ImageUploadField collection="team-members" value={form.image_url} onChange={(image_url) => setForm((current) => ({ ...current, image_url }))} />
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Team Group
                    <select className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.team_group ?? "academic"} onChange={(event) => setForm((current) => ({ ...current, team_group: event.target.value as "academic" | "eca" }))}>
                      <option value="academic">Academic</option>
                      <option value="eca">ECA</option>
                    </select>
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Subject or Specialty
                    <input className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.subject ?? ""} onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value }))} />
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Email
                    <input className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.email ?? ""} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} />
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Phone
                    <input className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.phone ?? ""} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} />
                  </label>
                  <label className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700">
                    <input type="checkbox" checked={Boolean(form.show_on_homepage)} onChange={(event) => setForm((current) => ({ ...current, show_on_homepage: event.target.checked }))} />
                    Show in homepage team section
                  </label>
                </>
              )}

              {activeCollection === "clubs" && (
                <>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Club name
                    <input className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.name ?? ""} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Description
                    <textarea className="min-h-[160px] rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.description ?? ""} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} />
                  </label>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="grid gap-2 text-sm font-medium text-gray-700">
                      Icon
                      <select className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.icon_name ?? "code"} onChange={(event) => setForm((current) => ({ ...current, icon_name: event.target.value as "code" | "camera" | "mic" | "palette" | "music" }))}>
                        <option value="code">Code</option>
                        <option value="camera">Camera</option>
                        <option value="mic">Mic</option>
                        <option value="palette">Palette</option>
                        <option value="music">Music</option>
                      </select>
                    </label>
                    <label className="grid gap-2 text-sm font-medium text-gray-700">
                      Members
                      <input type="number" min="0" className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.members ?? 0} onChange={(event) => setForm((current) => ({ ...current, members: Number(event.target.value) }))} />
                    </label>
                    <label className="grid gap-2 text-sm font-medium text-gray-700">
                      Meeting day
                      <input className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.meeting_day ?? ""} onChange={(event) => setForm((current) => ({ ...current, meeting_day: event.target.value }))} />
                    </label>
                    <label className="grid gap-2 text-sm font-medium text-gray-700">
                      Advisor
                      <input className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.advisor ?? ""} onChange={(event) => setForm((current) => ({ ...current, advisor: event.target.value }))} />
                    </label>
                  </div>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Activities
                    <textarea className="min-h-[100px] rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" placeholder="One per line or comma separated" value={Array.isArray(form.activities) ? form.activities.join("\n") : ""} onChange={(event) => setForm((current) => ({ ...current, activities: event.target.value.split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean) }))} />
                  </label>
                  <ImageUploadField collection="clubs" value={form.image_url} onChange={(image_url) => setForm((current) => ({ ...current, image_url }))} required />
                </>
              )}

              {activeCollection === "job-openings" && (
                <>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Title
                    <input className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.title ?? ""} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} />
                  </label>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="grid gap-2 text-sm font-medium text-gray-700">
                      Department
                      <input className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.department ?? ""} onChange={(event) => setForm((current) => ({ ...current, department: event.target.value }))} />
                    </label>
                    <label className="grid gap-2 text-sm font-medium text-gray-700">
                      Employment type
                      <input className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.employment_type ?? ""} onChange={(event) => setForm((current) => ({ ...current, employment_type: event.target.value }))} />
                    </label>
                    <label className="grid gap-2 text-sm font-medium text-gray-700">
                      Experience
                      <input className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.experience ?? ""} onChange={(event) => setForm((current) => ({ ...current, experience: event.target.value }))} />
                    </label>
                    <label className="grid gap-2 text-sm font-medium text-gray-700">
                      Education
                      <input className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.education ?? ""} onChange={(event) => setForm((current) => ({ ...current, education: event.target.value }))} />
                    </label>
                  </div>
                  <label className="grid gap-2 text-sm font-medium text-gray-700">
                    Description
                    <textarea className="min-h-[120px] rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.description ?? ""} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} />
                  </label>
                  <ImageUploadField collection="job-openings" value={form.image_url} onChange={(image_url) => setForm((current) => ({ ...current, image_url }))} />
                </>
              )}

              <label className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700">
                <input type="checkbox" checked={Boolean(form.is_published)} onChange={(event) => setForm((current) => ({ ...current, is_published: event.target.checked }))} />
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
    </main>
  );
}
