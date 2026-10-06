'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getPhaseThreeCollections } from '@/lib/cms-api';
import type { VideoItem } from '@/types/cms';
import { getVideoEmbedUrl } from '@/lib/video';
import { useEffect, useState } from 'react';
const VideoSection = () => {
    const [videoItems, setVideoItems] = useState<VideoItem[]>([]);

    useEffect(() => {
        const load = async () => {
            const data = await getPhaseThreeCollections();
            setVideoItems(data.videos);
        };

        void load();
    }, []);

    return (
        <section className="py-12 sm:py-14 lg:py-16 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <span className="inline-block px-4 py-1 text-sm font-semibold text-[#D41D33] bg-[#D41D33]/10 rounded-xl mb-4">
                        School Life
                    </span>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Our <span className="text-[#D41D33]">Videos</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover our vibrant school life through a variety of videos and stories.
                    </p>
                </motion.div>

                {/* Videos Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videoItems.map((video) => (
                        <motion.div
                            key={video.id}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: video.id * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="relative w-full h-0 pb-[56.25%]">
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src={getVideoEmbedUrl(video.url)}
                                    title={video.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-gray-800">{video.title}</h3>
                                <p className="text-sm text-gray-600 mt-1">{video.subtitle}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Button */}
                <motion.div
                    className="text-center mt-14"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <Link
                        href="/school-life/videos"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[#D41D33] hover:bg-[#A3162A] transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
                    >
                        View All Videos
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default VideoSection;
