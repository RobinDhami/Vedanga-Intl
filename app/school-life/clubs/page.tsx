"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Camera, ChevronRight, Code, Mic, Music, Palette, Users } from "lucide-react";
import { useEffect, useState } from "react";

import { getClubs } from "@/lib/cms-api";
import type { ClubItem } from "@/types/cms";

const iconMap = {
  code: Code,
  camera: Camera,
  mic: Mic,
  palette: Palette,
  music: Music,
} as const;

export default function Clubs() {
  const [clubs, setClubs] = useState<ClubItem[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await getClubs();
      setClubs(data);
    };

    void load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-[#DB2139] mb-4">Student Clubs & Organizations</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover your passion, develop new skills, and connect with like-minded peers through our diverse range of student-led clubs.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {clubs.map((club, index) => {
            const Icon = iconMap[club.icon_name] ?? Code;
            return (
              <motion.div
                key={club.slug}
                className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={club.image_url}
                    alt={`${club.name} club`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="p-3 bg-[#D41D33]/10 text-[#D41D33] rounded-lg">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{club.name}</h3>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{club.members} members</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-5 flex-grow">{club.description}</p>

                  <div className="mb-5">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">Activities</h4>
                    <div className="flex flex-wrap gap-2">
                      {club.activities.map((activity, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-gray-50 rounded-full text-xs font-medium text-gray-600 border border-gray-200"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="flex flex-col xl:flex-row md:justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <span className="font-medium">Advisor:</span>
                        <span className="ml-1">{club.advisor || "TBA"}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">Meets: </span>
                        <span className="ml-1">{club.meeting_day || "TBA"}</span>
                      </div>
                    </div>

                    <Link href={`/school-life/clubs/${club.slug}`}>
                      <button className="w-full flex items-center justify-center px-4 py-2.5 bg-[#DB2139] text-white rounded-lg hover:bg-[#e94158] transition-colors group">
                        <span className="font-medium">View details</span>
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
