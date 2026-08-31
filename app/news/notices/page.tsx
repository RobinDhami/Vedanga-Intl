"use client";

import { motion } from "framer-motion";
import { ChevronRight, Clock, Megaphone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { getNotices } from "@/lib/cms-api";
import type { Notice } from "@/types/cms";

export default function Notices() {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    void getNotices().then(setNotices);
  }, []);

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-[#D41D33]">Notices & Announcements</h1>
        <p className="text-gray-600 mb-8">Stay updated with the latest school news and important information</p>

        <div className="space-y-4">
          {notices.map((notice, index) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1, delay: index * 0.05 }}
              whileHover={{ y: -2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-100 text-[#D41D33] rounded-lg">
                    <Megaphone className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <span className="px-3 py-1 bg-red-100 text-[#D41D33] rounded-full text-xs font-medium w-fit">
                        Notice
                      </span>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{getTimeAgo(notice.published_at || new Date().toISOString())}</span>
                      </div>
                    </div>

                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{notice.title}</h2>
                    <p className="text-gray-600 mb-4 line-clamp-2">{notice.excerpt}</p>

                    {notice.link && (
                      <Link href={notice.link} className="flex items-center text-[#D41D33] hover:text-[#d54359] font-medium transition-colors group mr-2">
                        Read full notice
                        <ChevronRight size={18} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

       
      </motion.div>
    </div>
  );
}
