"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Megaphone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { getLatestPopupUpdate } from "@/lib/cms-api";
import type { Notice } from "@/types/cms";

const SESSION_KEY_PREFIX = "vedanga-update-popup:";

export default function UpdatePopup() {
  const pathname = usePathname();
  const [update, setUpdate] = useState<Notice | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return;

    let cancelled = false;
    void getLatestPopupUpdate().then((nextUpdate) => {
      if (cancelled || !nextUpdate) return;
      const sessionKey = `${SESSION_KEY_PREFIX}${nextUpdate.id}`;
      if (sessionStorage.getItem(sessionKey) === "dismissed") return;
      setUpdate(nextUpdate);
      setIsOpen(true);
    });

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePopup();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, update]);

  function closePopup() {
    if (update) sessionStorage.setItem(`${SESSION_KEY_PREFIX}${update.id}`, "dismissed");
    setIsOpen(false);
  }

  if (pathname !== "/" || !update) return null;

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="update-popup-title" onClick={closePopup}>
          <motion.article initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }} className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={closePopup} className="absolute right-4 top-4 z-10 rounded-full bg-white/95 p-2 text-slate-700 shadow-sm transition hover:bg-white hover:text-slate-950" aria-label="Close update popup">
              <X className="h-5 w-5" />
            </button>
            {update.image_url ? (
              <div className="relative aspect-[16/9] w-full bg-slate-100">
                <Image priority src={update.image_url} alt={update.title} fill sizes="(max-width: 640px) 100vw, 576px" className="object-cover" />
              </div>
            ) : null}
            <div className="p-6 sm:p-8">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#D41D33]"><Megaphone className="h-5 w-5" /></div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#D41D33]">School update</p>
              <h2 id="update-popup-title" className="text-2xl font-bold text-slate-900 sm:text-3xl">{update.title}</h2>
              <p className="mt-3 whitespace-pre-line text-slate-600">{update.excerpt}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {update.link ? (
                  <Link href={update.link} onClick={closePopup} className="inline-flex items-center gap-2 rounded-xl bg-[#D41D33] px-5 py-3 font-semibold text-white transition hover:bg-[#b31828]">Learn more <ArrowUpRight className="h-4 w-4" /></Link>
                ) : null}
                <button type="button" onClick={closePopup} className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50">Close</button>
              </div>
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
