'use client'

import { getEvents } from '@/lib/cms-api'
import type { EventItem } from '@/types/cms'
import Image from 'next/image'
import { Calendar, ChevronRight, MapPin } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const LatestEvents = () => {
    const [eventItems, setEventItems] = useState<EventItem[]>([])

    useEffect(() => {
        void getEvents().then(setEventItems)
    }, [])

    return (
        <section className="py-12 sm:py-14 lg:py-16 bg-gradient-to-b from-gray-100 to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-10 sm:mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <span className="inline-block px-3 py-1 text-xs sm:text-sm font-semibold text-[#D41D33] bg-[#D41D33]/10 rounded-full mb-3 sm:mb-4">
                        What&apos;s Happening
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Upcoming <span className="text-[#D41D33]">Events</span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover our upcoming activities and join the community
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {eventItems.slice(0,3).map((event, index) => (
                        <motion.div
                            key={event.id}
                            className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="relative h-48 sm:h-52 md:h-60 overflow-hidden">
                                <Image
                                    src={event.image_url}
                                    alt={event.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    priority={index < 3} // Only prioritize first 3 images
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <div className="absolute top-3 right-3 bg-[#D41D33] text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-bold">
                                    {event.category}
                                </div>
                            </div>

                            <div className="p-5 sm:p-6">
                                <div className="flex justify-between text-xs sm:text-sm text-gray-500 mb-3">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-[#D41D33]" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-[#D41D33]" />
                                        <span>{event.venue}</span>
                                    </div>
                                </div>

                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-[#D41D33] transition-colors">
                                    {event.title}
                                </h3>

                                <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2">
                                    {event.description}
                                </p>

                                <Link
                                    href={`/school-life/events/${event.slug}`}
                                    className="inline-flex items-center text-[#D41D33] font-medium group-hover:text-[#A3162A] transition-colors text-sm sm:text-base"
                                    aria-label={`View details for ${event.title}`}
                                >
                                    View Details
                                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="text-center mt-14"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <Link
                        href="/school-life/events"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[#D41D33] hover:bg-[#A3162A] transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
                    >
                        View All Events
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}

export default LatestEvents
