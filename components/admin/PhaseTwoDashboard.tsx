"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GalleryVertical, MessagesSquare, RefreshCw } from "lucide-react";

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
  getAdminPhaseTwoCollections,
  getSessionUser,
  saveAdminItem,
} from "@/lib/cms-api";
import type { AdminSavePayload, CmsSessionUser, PhaseTwoCollections } from "@/types/cms";

const collectionMeta = [
  {
    key: "galleryImages",
    label: "Gallery Images",
    description: "Curate the website gallery with categories and publish state.",
    icon: GalleryVertical,
  },
  {
    key: "contactSubmissions",
    label: "Contact Submissions",
    description: "Review incoming questions and outreach from the contact page.",
    icon: MessagesSquare,
  },
] as const;

type CollectionKey = (typeof collectionMeta)[number]["key"];

export function PhaseTwoDashboard() {
  const [collections, setCollections] = useState<PhaseTwoCollections | null>(null);
  const [session, setSession] = useState<CmsSessionUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState<AdminSavePayload>({
    title: "",
    description: "",
    category: "",
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

      setLoading(true);
      try {
        const data = await getAdminPhaseTwoCollections();
        setCollections(data);
      } catch {
        setCollections(null);
      } finally {
        setLoading(false);
      }
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

      const data = await getAdminPhaseTwoCollections();
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

  const openCreate = () => {
    setEditorOpen(true);
    setEditingId(null);
    setMessage("");
    setForm({
      title: "",
      description: "",
      category: "",
      is_published: true,
    });
  };

  const closeEditor = () => {
    setEditorOpen(false);
    setEditingId(null);
    setMessage("");
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");
      await saveAdminItem("gallery-images", form);
      await reload();
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
      <div className="space-y-2">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D41D33]">Phase 2 CMS</p>
            <h2 className="text-3xl font-bold text-gray-900">Gallery and incoming submissions</h2>
            <p className="text-gray-600">
              This layer adds richer gallery content and real inbound capture for contact flows.
            </p>
          </div>
          <Button onClick={() => void reload()} className="bg-[#D41D33] text-white hover:bg-[#b31828]">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
        {collectionMeta.map(({ key, label, description, icon: Icon }) => {
          const count = collections?.[key as CollectionKey]?.length ?? 0;
          return (
            <Card key={key} className="border-gray-200 shadow-sm">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D41D33]/10 text-[#D41D33]">
                  <Icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{label}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-gray-900">{loading ? "--" : count}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr,1fr]">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
            <div>
              <CardTitle className="text-2xl">Gallery Images</CardTitle>
              <CardDescription>Published gallery content visible on the homepage and gallery page.</CardDescription>
            </div>
            <Button variant="outline" className="border-[#D41D33]/20 text-[#D41D33]" onClick={openCreate}>
              Add image
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/admin/gallery-images" className="inline-flex text-sm font-medium text-[#D41D33] hover:underline">
              View all listings
            </Link>
            {!loading && (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/80 p-4 text-sm text-gray-600">
                {collections?.galleryImages.length
                  ? `${collections.galleryImages.length} gallery image item(s). Open View all listings to browse them.`
                  : "No gallery images yet. Add one here, then use View all listings to review the saved entries."}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Contact Submissions</CardTitle>
            <CardDescription>Incoming messages captured from the contact page.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/admin/contact-submissions" className="inline-flex text-sm font-medium text-[#D41D33] hover:underline">
              View all submissions
            </Link>
            {!loading && (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/80 p-4 text-sm text-gray-600">
                {collections?.contactSubmissions.length
                  ? `${collections.contactSubmissions.length} contact submission(s). Open View all submissions to inspect the entries.`
                  : "No contact submissions yet. New messages will appear on the dedicated submissions page."}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={editorOpen} onOpenChange={(open) => !open && closeEditor()}>
        <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Create Gallery Image</DialogTitle>
            <DialogDescription>Lean admin editor for phase 2 content items.</DialogDescription>
          </DialogHeader>
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

              <label className="grid gap-2 text-sm font-medium text-gray-700">
                Category
                <input
                  className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]"
                  value={form.category ?? ""}
                  onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                />
              </label>
            </div>

            <label className="grid gap-2 text-sm font-medium text-gray-700">
              Description
              <textarea
                className="min-h-[120px] rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]"
                value={form.description ?? ""}
                onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
              />
            </label>

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
        </DialogContent>
      </Dialog>
    </section>
  );
}
