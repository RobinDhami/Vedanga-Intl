"use client";

import { Eventcategories, events } from "@/data/dummy";
import { motion } from "framer-motion";
import { Calendar, MapPin, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleEvents, setVisibleEvents] = useState(6);

  const filteredEvents = selectedCategory === "All"
    ? events
    : events.filter((event) => event.category === selectedCategory);

  const loadMoreEvents = () => {
    setVisibleEvents((prev) => prev + 6);
  };

  const getTimeAgo = (dateString: string) => {
    const eventDate = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - eventDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays === -1) return "Tomorrow";
    if (eventDate < now && diffInDays > 7) return `Event finished ${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) > 1 ? "s" : ""} ago `;
    if (eventDate < now && diffInDays < 7) return `Event finished ${Math.floor(diffInDays)} day${Math.floor(diffInDays) > 1 ? "s" : ""} ago `;
    if (eventDate > now && diffInDays * -1 > 7) return `${Math.floor(diffInDays * -1 / 7)} week${Math.floor(diffInDays * -1 / 7) > 1 ? "s" : ""} to go `;
    if (eventDate > now && diffInDays < 7) return ` ${Math.floor(diffInDays * -1)} day${Math.floor(diffInDays) < 1 ? "s" : ""} to go `;
    return eventDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-[#D41D33] mb-3">Upcoming Major Events</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover exciting activities and important dates in our school community
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {[...Eventcategories].map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setVisibleEvents(6);
              }}
              className={`px-5 py-2 rounded-full transition-all ${
                selectedCategory === category
                  ? "bg-[#D41D33] text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.slice(0, visibleEvents).map((event, index) => (
            <motion.div
              key={event.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <Link href={`/school-life/events/${event.slug}`} className="block h-full">
                <div className="relative h-64">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/5 to-transparent group-hover:from-black/20 transition-colors z-10" />
                  <Image
                    loading="lazy"
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div
                    className={`absolute top-4 right-4 ${
                      event.category === "Academic"
                        ? "bg-[#D41D33]"
                        : event.category === "Sports"
                          ? "bg-[#FFA500]"
                          : event.category === "Community"
                            ? "bg-[#26a122]"
                            : event.category === "Cultural"
                              ? "bg-[#8B008B]"
                              : "bg-gray-500"
                    } text-white px-3 py-1 rounded-full text-sm font-medium shadow-md z-20`}
                  >
                    {event.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#D41D33] transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-red-500" />
                      <span>{event.venue}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-red-500" />
                      <span>{getTimeAgo(event.date)}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-[#D41D33] font-medium group-hover:text-[#b83549] transition-colors">
                    <span className="flex items-center justify-center">View details</span>
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <motion.div className="text-center py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-gray-500 text-lg">No events found in this category</p>
          </motion.div>
        )}

        {visibleEvents < filteredEvents.length && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={loadMoreEvents}
              className="px-8 py-3 bg-[#D41D33] text-white rounded-lg hover:bg-[#A3162A] transition-colors shadow-md hover:shadow-lg font-medium"
            >
              Load More Events
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
