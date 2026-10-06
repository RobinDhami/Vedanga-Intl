"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Megaphone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { getNotices } from "@/lib/cms-api";
import type { Notice } from "@/types/cms";

function formatPublishedDate(value?: string) {
  if (!value) return "Recent update";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recent update";
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function UpdatesPage() {
  const [updates, setUpdates] = useState<Notice[]>([]);

  useEffect(() => {
    void getNotices().then(setUpdates);
  }, []);

  return (
    <main className="bg-slate-50 py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.header initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#D41D33]">Vedanga International School</p>
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">Updates</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">Upcoming activities, important announcements, and the latest information from our school.</p>
        </motion.header>
        <div className="space-y-5">
          {updates.map((update, index) => (
            <motion.article key={update.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex gap-4">
                <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#D41D33] sm:flex">
                  <Megaphone className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex items-center gap-2 text-sm text-slate-500"><Clock className="h-4 w-4" />{formatPublishedDate(update.published_at)}</div>
                  <h2 className="text-2xl font-semibold text-slate-900">{update.title}</h2>
                  <p className="mt-3 whitespace-pre-line text-slate-600">{update.excerpt}</p>
                  {update.link ? (
                    <Link href={update.link} className="mt-5 inline-flex items-center gap-2 font-semibold text-[#D41D33] hover:text-[#b31828]">Learn more <ArrowUpRight className="h-4 w-4" /></Link>
                  ) : null}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        {updates.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-600">No updates have been published yet.</div> : null}
      </div>
    </main>
  );
}
