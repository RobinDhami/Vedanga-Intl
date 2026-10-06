"use client";

import { ArrowRight, Megaphone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { getNotices } from "@/lib/cms-api";
import type { Notice } from "@/types/cms";

export default function LatestUpdates() {
  const [updates, setUpdates] = useState<Notice[]>([]);

  useEffect(() => {
    void getNotices().then(setUpdates);
  }, []);

  if (updates.length === 0) return null;

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#D41D33]">Stay informed</p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Latest Updates</h2>
          </div>
          <Link href="/updates" className="inline-flex items-center gap-2 font-semibold text-[#D41D33] hover:text-[#b31828]">
            View all updates <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {updates.slice(0, 3).map((update) => (
            <article key={update.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#D41D33]">
                <Megaphone className="h-5 w-5" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">{update.title}</h3>
              <p className="line-clamp-3 text-slate-600">{update.excerpt}</p>
              {update.link ? (
                <Link href={update.link} className="mt-5 inline-flex items-center gap-2 font-semibold text-[#D41D33] hover:text-[#b31828]">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
