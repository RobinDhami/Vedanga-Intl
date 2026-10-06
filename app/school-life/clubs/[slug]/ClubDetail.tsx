"use client";

import { Camera, ChevronRight, Code, Mic, Music, Palette } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { ClubItem } from "@/types/cms";

const iconMap = {
  code: Code,
  camera: Camera,
  mic: Mic,
  palette: Palette,
  music: Music,
} as const;

export const ClubDetail = ({ club }: { club: ClubItem }) => {
  const Icon = iconMap[club.icon_name] ?? Code;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-[#D41D33] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="h-4 w-4 text-gray-400 mx-1" />
                <Link href="/school-life" className="ml-1 text-sm text-gray-500 hover:text-[#D41D33] transition-colors md:ml-2">
                  School Life
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="h-4 w-4 text-gray-400 mx-1" />
                <Link href="/school-life/clubs" className="ml-1 text-sm text-gray-500 hover:text-[#D41D33] transition-colors md:ml-2">
                  Clubs
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="h-4 w-4 text-gray-400 mx-1" />
                <span className="ml-1 text-sm font-medium text-[#D41D33] md:ml-2">{club.name}</span>
              </div>
            </li>
          </ol>
        </nav>
        <article className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="relative h-[50vh] max-h-[600px]">
            <Image
              src={club.image_url || "/images/foto18.jpg"}
              alt={club.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">{club.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-white">
                  <div className="flex items-center gap-2 text-sm">
                    <Icon className="h-5 w-5" />
                    <span>{club.description}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto p-6 sm:p-8 md:p-10">
            <div className="prose prose-lg max-w-none mb-12 text-justify">
              <p>{club.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Club Details</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#D41D33] rounded-full mt-2 mr-2"></span>
                    <span className="text-gray-600">Members: {club.members}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#D41D33] rounded-full mt-2 mr-2"></span>
                    <span className="text-gray-600">Meeting Day: {club.meeting_day || "TBA"}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#D41D33] rounded-full mt-2 mr-2"></span>
                    <span className="text-gray-600">Advisor: {club.advisor || "TBA"}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Activities</h2>
                <ul className="list-disc list-inside space-y-2">
                  {club.activities.map((activity, idx) => (
                    <li key={idx} className="text-gray-600">
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
