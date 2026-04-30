"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { CalendarDays, Megaphone, School, Clock } from "lucide-react";


export default function Notices() {
  const notices = [
    {
      title: "Admission Open for Academic Year 2024-25",
      date: "2024-02-15",
      category: "Admissions",
      content: "Applications are now being accepted for all grades. Limited seats available. Early applications receive priority consideration for scholarships and financial aid.",
      icon: <School className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Parent-Teacher Meeting Schedule",
      date: "2024-02-10",
      category: "Academic",
      content: "The first term parent-teacher meeting will be held on March 1st, 2024 from 2:00 PM to 5:00 PM. Please schedule your appointment through the parent portal.",
      icon: <Megaphone className="h-5 w-5" />,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Holiday Notice: Holi Festival",
      date: "2024-02-05",
      category: "Holiday",
      content: "School will remain closed on March 25th, 2024 for Holi celebrations. Classes will resume on March 27th. Wishing all our students and staff a colorful and safe celebration!",
      icon: <CalendarDays className="h-5 w-5" />,
      color: "bg-green-100 text-green-600"
    }
  ];

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
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1, delay: index * 0.05 }}
              whileHover={{ y: -2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 ${notice.color} rounded-lg`}>
                    {notice.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <span className={`px-3 py-1 ${notice.color} bg-opacity-20 rounded-full text-xs font-medium w-fit`}>
                        {notice.category}
                      </span>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{getTimeAgo(notice.date)}</span>
                      </div>
                    </div>

                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{notice.title}</h2>
                    <p className="text-gray-600 mb-4 line-clamp-2">{notice.content}</p>

                    <button className="flex items-center text-[#D41D33] hover:text-[#d54359] font-medium transition-colors group mr-2">
                      Read full notice
                      <ChevronRight size={18} />
                    </button>
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