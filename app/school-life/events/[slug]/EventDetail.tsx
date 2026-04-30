"use client";

import { Calendar, ChevronRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Event {
  title: string;
  date: string;
  time: string;
  venue: string;
  image: string;
  description: string;
  schedule: {
    day: string;
    date: string;
    events: string[];
  }[];
}

export function EventDetail({ event }: { event: Event }) {
  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
                <Link href="/school-life/events" className="ml-1 text-sm text-gray-500 hover:text-[#D41D33] transition-colors md:ml-2">
                  Events
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="h-4 w-4 text-gray-400 mx-1" />
                <span className="ml-1 text-sm font-medium text-[#D41D33] md:ml-2">
                  {event.title}
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <article className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="relative h-[50vh] max-h-[600px]">
            <Image
              loading="lazy"
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                  {event.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-white">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>{getFormattedDate(event.date)} • {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{event.venue}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto p-6 sm:p-8 md:p-10">
            <div
              className="prose prose-lg max-w-none mb-12 text-justify"
              dangerouslySetInnerHTML={{ __html: event.description }}
            />

            <h2 className="text-2xl font-bold text-gray-800 mb-6">Event Schedule</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {event.schedule.map((day) => (
                <div
                  key={day.day}
                  className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-[#D41D33] transition-colors"
                >
                  <h3 className="text-xl font-semibold mb-2">{day.day}</h3>
                  <p className="text-[#FAA02E] font-medium mb-4">{day.date}</p>
                  <ul className="space-y-3">
                    {day.events.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-[#D41D33] rounded-full mt-2 mr-2"></span>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
