"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Pencil, RefreshCw, Trash2 } from "lucide-react";

import { adminCollectionConfig, type AdminCollectionRoute } from "@/components/admin/admin-collection-config";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
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
import { convertBsDateToAd, formatAdDateAsBs } from "@/lib/nepali-date";
import {
  deleteAdminItem,
  getAdminCollectionItems,
  getSessionUser,
  updateAdminItem,
  validatePhaseOnePayload,
} from "@/lib/cms-api";
import type {
  AdminSavePayload,
  ClubItem,
  CmsSessionUser,
  ContactSubmissionItem,
  EventItem,
  GalleryImageItem,
  HeroSlide,
  JobOpeningItem,
  NewsArticle,
  Notice,
  TeamMemberItem,
  VideoItem,
} from "@/types/cms";

type CollectionItem =
  | HeroSlide
  | Notice
  | NewsArticle
  | EventItem
  | GalleryImageItem
  | ContactSubmissionItem
  | VideoItem
  | TeamMemberItem
  | ClubItem
  | JobOpeningItem;

const NEWS_CATEGORY_OPTIONS = ["Academic", "Events", "Facilities", "International", "Sports"] as const;
const EVENT_CATEGORY_OPTIONS = ["Academic", "Sports", "Cultural", "Community"] as const;

function renderTitle(route: AdminCollectionRoute, item: CollectionItem) {
  if (route === "contact-submissions") {
    const contact = item as ContactSubmissionItem;
    return `${contact.first_name} ${contact.last_name}`.trim() || contact.email;
  }

  if (route === "team-members") {
    return (item as TeamMemberItem).name;
  }

  if (route === "clubs") {
    return (item as ClubItem).name;
  }

  return "title" in item ? item.title : "Untitled";
}

function renderStatus(item: CollectionItem, route: AdminCollectionRoute) {
  if (route === "contact-submissions") {
    return (item as ContactSubmissionItem).status || "new";
  }

  return (item as Exclude<CollectionItem, ContactSubmissionItem>).is_published ? "Published" : "Draft";
}

function getIdentifier(route: AdminCollectionRoute, item: CollectionItem) {
  if (route === "news" || route === "events" || route === "clubs") {
    return (item as NewsArticle | EventItem | ClubItem).slug;
  }

  return item.id;
}

function renderSummary(route: AdminCollectionRoute, item: CollectionItem) {
  switch (route) {
    case "hero-slides":
      return [(item as HeroSlide).subtitle || "No subtitle"];
    case "notices":
      return [(item as Notice).excerpt || "No summary"];
    case "news": {
      const news = item as NewsArticle;
      return [news.category, news.author, news.excerpt];
    }
    case "events": {
      const event = item as EventItem;
      const bsDate = formatAdDateAsBs(event.date);
      return [event.category, event.venue, bsDate ? `${bsDate} BS` : event.date];
    }
    case "gallery-images": {
      const gallery = item as GalleryImageItem;
      return [gallery.category || "Uncategorized", gallery.description || "No description"];
    }
    case "contact-submissions": {
      const contact = item as ContactSubmissionItem;
      return [contact.email, contact.phone, contact.message || "No message provided."];
    }
    case "videos": {
      const video = item as VideoItem;
      return [video.subtitle || "No subtitle", video.url];
    }
    case "team-members": {
      const member = item as TeamMemberItem;
      return [
        member.position,
        `${(member.team_group ?? "academic").toUpperCase()}${member.show_on_homepage ? " · Homepage" : ""}`,
        member.email || member.image_url || "No extra details",
      ];
    }
    case "job-openings": {
      const job = item as JobOpeningItem;
      return [job.department, job.employment_type, job.description];
    }
    case "clubs": {
      const club = item as ClubItem;
      return [club.meeting_day || "No meeting day", club.advisor || "No advisor", `${club.members} members`];
    }
  }
}

function getEditForm(route: AdminCollectionRoute, item: CollectionItem): AdminSavePayload {
  switch (route) {
    case "hero-slides": {
      const hero = item as HeroSlide;
      return {
        title: hero.title,
        subtitle: hero.subtitle,
        cta_text: hero.cta_text,
        cta_link: hero.cta_link,
        image_url: hero.image_url,
        is_published: hero.is_published ?? false,
      };
    }
    case "notices": {
      const notice = item as Notice;
      return {
        title: notice.title,
        excerpt: notice.excerpt,
        link: notice.link,
        image_url: notice.image_url,
        show_in_overlay: notice.show_in_overlay ?? false,
        is_published: notice.is_published ?? false,
      };
    }
    case "news": {
      const news = item as NewsArticle;
      return {
        title: news.title,
        category: news.category,
        excerpt: news.excerpt,
        author: news.author,
        content: news.content,
        image_url: news.image_url,
        is_published: news.is_published ?? false,
      };
    }
    case "events": {
      const event = item as EventItem;
      return {
        title: event.title,
        category: event.category,
        description: event.description,
        venue: event.venue,
        date: event.date,
        image_url: event.image_url,
        is_published: event.is_published ?? false,
      };
    }
    case "gallery-images": {
      const gallery = item as GalleryImageItem;
      return {
        title: gallery.title,
        category: gallery.category,
        description: gallery.description,
        image_url: gallery.image_url,
        is_published: gallery.is_published ?? false,
      };
    }
    case "videos": {
      const video = item as VideoItem;
      return {
        title: video.title,
        subtitle: video.subtitle,
        url: video.url,
        is_published: video.is_published ?? false,
      };
    }
    case "team-members": {
      const member = item as TeamMemberItem;
      return {
        name: member.name,
        position: member.position,
        image_url: member.image_url,
        qualifications: member.qualifications,
        subject: member.subject,
        email: member.email,
        phone: member.phone,
        team_group: member.team_group ?? "academic",
        show_on_homepage: member.show_on_homepage ?? false,
        sort_order: member.sort_order ?? 0,
        is_published: member.is_published ?? false,
      };
    }
    case "job-openings": {
      const job = item as JobOpeningItem;
      return {
        title: job.title,
        department: job.department,
        employment_type: job.employment_type,
        experience: job.experience,
        education: job.education,
        description: job.description,
        image_url: job.image_url,
        is_published: job.is_published ?? false,
      };
    }
    case "clubs": {
      const club = item as ClubItem;
      return {
        name: club.name,
        description: club.description,
        icon_name: club.icon_name,
        members: club.members,
        meeting_day: club.meeting_day,
        activities: club.activities,
        advisor: club.advisor,
        image_url: club.image_url,
        is_published: club.is_published ?? false,
      };
    }
    case "contact-submissions":
      return {};
  }
}

function validatePayload(route: AdminCollectionRoute, payload: AdminSavePayload) {
  if (route === "hero-slides" || route === "notices" || route === "news" || route === "events") {
    return validatePhaseOnePayload(route, payload);
  }

  if (route === "gallery-images") {
    if (!payload.image_url?.trim()) return { valid: false, message: "Gallery image is required." };
    return { valid: true };
  }

  if (route === "videos") {
    if (!payload.title?.trim()) return { valid: false, message: "Title is required." };
    if (!payload.url?.trim()) return { valid: false, message: "Video URL is required." };
    return { valid: true };
  }

  if (route === "team-members") {
    if (!payload.name?.trim()) return { valid: false, message: "Name is required." };
    if (!payload.position?.trim()) return { valid: false, message: "Position is required." };
    return { valid: true };
  }

  if (route === "clubs") {
    if (!payload.name?.trim()) return { valid: false, message: "Club name is required." };
    if (!payload.description?.trim()) return { valid: false, message: "Description is required." };
    if (!payload.image_url?.trim()) return { valid: false, message: "Club image is required." };
    return { valid: true };
  }

  if (route === "job-openings") {
    if (!payload.title?.trim()) return { valid: false, message: "Title is required." };
    if (!payload.department?.trim()) return { valid: false, message: "Department is required." };
    if (!payload.employment_type?.trim()) return { valid: false, message: "Employment type is required." };
    if (!payload.experience?.trim()) return { valid: false, message: "Experience is required." };
    if (!payload.education?.trim()) return { valid: false, message: "Education is required." };
    if (!payload.description?.trim()) return { valid: false, message: "Description is required." };
    return { valid: true };
  }

  return { valid: true };
}

export function AdminCollectionPage({ route }: { route: AdminCollectionRoute }) {
  const [session, setSession] = useState<CmsSessionUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CollectionItem | null>(null);
  const [form, setForm] = useState<AdminSavePayload>({});
  const [eventBsDate, setEventBsDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const config = adminCollectionConfig[route];
  const canEdit = route !== "contact-submissions";

  const heading = useMemo(() => `${config.label} Listings`, [config.label]);

  const closeEditor = () => {
    setEditorOpen(false);
    setEditingItem(null);
    setForm({});
    setEventBsDate("");
    setMessage("");
  };

  const load = async () => {
    setLoading(true);
    const user = await getSessionUser();
    setSession(user);

    if (!user.authenticated || !user.is_staff) {
      setItems([]);
      setLoading(false);
      return;
    }

    try {
      setItems(await getAdminCollectionItems<CollectionItem>(route));
      setMessage("");
    } catch (error) {
      setItems([]);
      setMessage(error instanceof Error ? error.message : `Unable to load ${config.label.toLowerCase()}.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
    const unsubscribe = subscribeToCmsAuthChanged(() => {
      void load();
    });
    return unsubscribe;
  }, [route]);

  const openEdit = (item: CollectionItem) => {
    setEditingItem(item);
    setForm(getEditForm(route, item));
    setEventBsDate(route === "events" ? formatAdDateAsBs((item as EventItem).date) : "");
    setMessage("");
    setEditorOpen(true);
  };

  const handleSave = async () => {
    if (!editingItem) return;

    const validation = validatePayload(route, form);
    if (!validation.valid) {
      setMessage(validation.message ?? "Please complete the required fields.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");
      await updateAdminItem(route, getIdentifier(route, editingItem), form);
      await load();
      closeEditor();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Update failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: CollectionItem) => {
    const label = renderTitle(route, item);
    if (!window.confirm(`Delete "${label}"?`)) return;

    try {
      setMessage("");
      await deleteAdminItem(route, getIdentifier(route, item));
      await load();
      if (editingItem && getIdentifier(route, editingItem) === getIdentifier(route, item)) {
        closeEditor();
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Delete failed.");
    }
  };

  if (!session?.authenticated || !session.is_staff) {
    return (
      <main className="min-h-screen bg-[#fcfcfd] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Admin access required</CardTitle>
              <CardDescription>Return to the dashboard and sign in with a staff account first.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to admin
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fcfcfd] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl border border-red-100 bg-[radial-gradient(circle_at_top_left,_rgba(212,29,51,0.14),_transparent_30%),linear-gradient(135deg,#fff7f6,#ffffff)] p-8 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D41D33]">{config.phaseLabel}</p>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">{heading}</h1>
              <p className="text-base text-gray-600">Browse and manage all entries for this collection from one dedicated page.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/admin">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to dashboard
                </Button>
              </Link>
              <Button onClick={() => void load()} className="bg-[#D41D33] text-white hover:bg-[#b31828]">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
        </section>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">{config.label}</CardTitle>
            <CardDescription>{loading ? "Loading entries..." : `${items.length} item(s)`}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {message && <p className="text-sm text-gray-600">{message}</p>}

            {!loading && items.length === 0 && <p className="text-sm text-gray-500">No items available yet.</p>}

            {items.map((item, index) => {
              const summaryLines = renderSummary(route, item);
              const status = renderStatus(item, route);
              return (
                <div key={`${route}-${"id" in item ? item.id : index}`} className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-2">
                      <p className="text-lg font-semibold text-gray-900">{renderTitle(route, item)}</p>
                      {summaryLines.map((line) => (
                        <p key={line} className="text-sm text-gray-600">
                          {line}
                        </p>
                      ))}
                    </div>
                    <div className="flex flex-col items-start gap-3 md:items-end">
                      <span
                        className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium ${
                          route === "contact-submissions"
                            ? "bg-slate-100 text-slate-700"
                            : status === "Published"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {status}
                      </span>
                      <div className="flex gap-2">
                        {canEdit && (
                          <Button variant="outline" size="sm" onClick={() => openEdit(item)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                        )}
                        <Button variant="outline" size="sm" onClick={() => void handleDelete(item)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <Dialog open={editorOpen} onOpenChange={(open) => !open && closeEditor()}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Edit Entry</DialogTitle>
            <DialogDescription>Update the selected entry and save the changes back to the CMS.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {route === "hero-slides" && (
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

            {route === "notices" && (
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

            {route === "news" && (
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

            {route === "events" && (
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
                    Event date (BS)
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="YYYY-MM-DD"
                      className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]"
                      value={eventBsDate}
                      onChange={(event) => {
                        const value = event.target.value;
                        setEventBsDate(value);
                        setForm((current) => ({ ...current, date: convertBsDateToAd(value) ?? "" }));
                      }}
                    />
                    <span className="text-xs font-normal text-gray-500">Enter the date in Bikram Sambat (BS).</span>
                  </label>
                </div>
                <ImageUploadField collection="events" value={form.image_url} onChange={(image_url) => setForm((current) => ({ ...current, image_url }))} required />
              </>
            )}

            {route === "gallery-images" && (
              <>
                <ImageUploadField collection="gallery-images" value={form.image_url} onChange={(image_url) => setForm((current) => ({ ...current, image_url }))} required />
              </>
            )}

            {route === "videos" && (
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

            {route === "team-members" && (
              <>
                <label className="grid gap-2 text-sm font-medium text-gray-700">
                  Name
                  <input className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.name ?? ""} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
                </label>
                <label className="grid gap-2 text-sm font-medium text-gray-700">
                  Display Order
                  <span className="text-xs font-normal text-gray-500">Lower numbers appear first.</span>
                  <input type="number" min="0" step="1" className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={form.sort_order ?? 0} onChange={(event) => setForm((current) => ({ ...current, sort_order: Number(event.target.value) }))} />
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

            {route === "job-openings" && (
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

            {route === "clubs" && (
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
                  <textarea className="min-h-[100px] rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]" value={Array.isArray(form.activities) ? form.activities.join("\n") : ""} onChange={(event) => setForm((current) => ({ ...current, activities: event.target.value.split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean) }))} />
                </label>
                <ImageUploadField collection="clubs" value={form.image_url} onChange={(image_url) => setForm((current) => ({ ...current, image_url }))} required />
              </>
            )}

            {route !== "contact-submissions" && (
              <label className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700">
                <input type="checkbox" checked={Boolean(form.is_published)} onChange={(event) => setForm((current) => ({ ...current, is_published: event.target.checked }))} />
                Publish immediately
              </label>
            )}

            {message && <p className="text-sm text-gray-600">{message}</p>}

            <DialogFooter>
              <Button variant="outline" onClick={closeEditor}>
                Close
              </Button>
              <Button onClick={() => void handleSave()} disabled={saving} className="bg-[#D41D33] text-white hover:bg-[#b31828]">
                {saving ? "Saving..." : "Update item"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
