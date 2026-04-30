"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Briefcase, RefreshCw } from "lucide-react";

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
  getAdminPhaseFourCollections,
  getSessionUser,
  saveAdminItem,
} from "@/lib/cms-api";
import type { AdminSavePayload, CmsSessionUser, PhaseFourCollections } from "@/types/cms";

export function PhaseFourDashboard() {
  const [collections, setCollections] = useState<PhaseFourCollections | null>(null);
  const [session, setSession] = useState<CmsSessionUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [editorOpen, setEditorOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState<AdminSavePayload>({
    title: "",
    department: "",
    employment_type: "",
    experience: "",
    education: "",
    description: "",
    is_published: true,
  });

  const emptyForm = (): AdminSavePayload => ({
    title: "",
    department: "",
    employment_type: "",
    experience: "",
    education: "",
    description: "",
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

      const data = await getAdminPhaseFourCollections();
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
    setMessage("");
    setForm(emptyForm());
  };

  const closeEditor = () => {
    setEditorOpen(false);
    setMessage("");
  };

  const handleSave = async () => {
    if (!form.title?.trim()) {
      setMessage("Title is required.");
      return;
    }
    if (!form.department?.trim()) {
      setMessage("Department is required.");
      return;
    }
    if (!form.employment_type?.trim()) {
      setMessage("Employment type is required.");
      return;
    }
    if (!form.experience?.trim()) {
      setMessage("Experience is required.");
      return;
    }
    if (!form.education?.trim()) {
      setMessage("Education is required.");
      return;
    }
    if (!form.description?.trim()) {
      setMessage("Description is required.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");
      await saveAdminItem("job-openings", form);
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
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D41D33]">Phase 4 CMS</p>
          <h2 className="text-3xl font-bold text-gray-900">Careers</h2>
          <p className="text-gray-600">Manage job openings shown on the public careers page.</p>
        </div>
        <Button onClick={() => void reload()} className="bg-[#D41D33] text-white hover:bg-[#b31828]">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D41D33]/10 text-[#D41D33]">
            <Briefcase className="h-6 w-6" />
          </div>
          <CardTitle className="text-xl">Job Openings</CardTitle>
          <CardDescription>Open roles and requirements for the careers page.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-gray-900">{loading ? "--" : collections?.jobOpenings.length ?? 0}</p>
        </CardContent>
      </Card>

      <Card className="border-gray-200 shadow-sm">
        <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
          <div>
            <CardTitle className="text-2xl">Career Listings</CardTitle>
            <CardDescription>Published roles that appear on `/careers`.</CardDescription>
          </div>
          <Button variant="outline" className="border-[#D41D33]/20 text-[#D41D33]" onClick={openCreate}>
            Add opening
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <Link href="/admin/job-openings" className="inline-flex text-sm font-medium text-[#D41D33] hover:underline">
            View all listings
          </Link>
          {!loading && (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/80 p-4 text-sm text-gray-600">
              {collections?.jobOpenings.length
                ? `${collections.jobOpenings.length} job opening item(s). Open View all listings to browse the saved entries.`
                : "No job openings added yet. Add one here, then review the saved entries on the dedicated listing page."}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={editorOpen} onOpenChange={(open) => !open && closeEditor()}>
        <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Create Job Opening</DialogTitle>
            <DialogDescription>Lean admin editor for the careers page.</DialogDescription>
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
                Department
                <input
                  className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]"
                  value={form.department ?? ""}
                  onChange={(event) => setForm((current) => ({ ...current, department: event.target.value }))}
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-gray-700">
                Employment type
                <input
                  className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]"
                  value={form.employment_type ?? ""}
                  onChange={(event) => setForm((current) => ({ ...current, employment_type: event.target.value }))}
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-gray-700">
                Experience
                <input
                  className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]"
                  value={form.experience ?? ""}
                  onChange={(event) => setForm((current) => ({ ...current, experience: event.target.value }))}
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-gray-700 md:col-span-2">
                Education
                <input
                  className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D41D33]"
                  value={form.education ?? ""}
                  onChange={(event) => setForm((current) => ({ ...current, education: event.target.value }))}
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
