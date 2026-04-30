"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { getLatestNoticeOverlay } from "@/lib/cms-api";
import type { Notice } from "@/types/cms";

export default function NoticeOverlay() {
  const [isOpen, setIsOpen] = useState(true);
  const [latestNotice, setLatestNotice] = useState<Notice | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    const load = async () => {
      const notice = await getLatestNoticeOverlay();
      setLatestNotice(notice);
    };

    void load();
  }, []);

  if (pathname !== "/" || !latestNotice) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full overflow-hidden"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative h-full">
              <Image
                priority
                src={latestNotice.image_url || "/images/foto2.jpg"}
                alt={latestNotice.title}
                className="w-full h-[590px] md:h-[640px] object-cover"
                width={1000}
                height={1000}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-white/5 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                <h2 className="text-2xl font-bold mb-2">{latestNotice.title}</h2>
                {latestNotice.published_at && <p className="text-white/90">{latestNotice.published_at}</p>}
                {latestNotice.link && (
                  <Link target="_blank" href={latestNotice.link}>
                    <button className="px-6 py-2 my-2 bg-[#D41D33] text-white rounded-lg hover:bg-opacity-90 transition-colors">
                      Learn More
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
