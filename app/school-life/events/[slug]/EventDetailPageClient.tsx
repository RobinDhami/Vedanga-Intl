"use client";

import { useEffect, useState } from "react";

import { getEvent } from "@/lib/cms-api";
import type { EventItem } from "@/types/cms";
import { EventDetail } from "./EventDetail";

export default function EventDetailPageClient({ slug }: { slug: string }) {
  const [event, setEvent] = useState<EventItem | null | undefined>(undefined);

  useEffect(() => {
    void getEvent(slug).then(setEvent);
  }, [slug]);

  if (event === undefined) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600">Loading event…</div>;
  }

  if (!event) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600">Event not found</div>;
  }

  return <EventDetail event={event} />;
}
