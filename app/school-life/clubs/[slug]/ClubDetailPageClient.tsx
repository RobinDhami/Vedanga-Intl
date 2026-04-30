"use client";

import { useEffect, useState } from "react";

import { ClubDetail } from "./ClubDetail";
import { getClubs } from "@/lib/cms-api";
import type { ClubItem } from "@/types/cms";

export default function ClubDetailPageClient({ slug }: { slug: string }) {
  const [club, setClub] = useState<ClubItem | null>(null);

  useEffect(() => {
    const load = async () => {
      const clubs = await getClubs();
      setClub(clubs.find((item) => item.slug === slug) ?? null);
    };

    void load();
  }, [slug]);

  if (!club) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600">Club not found</div>;
  }

  return <ClubDetail club={club} />;
}
