'use client'
import { getPhaseThreeCollections } from '@/lib/cms-api'
import type { VideoItem } from '@/types/cms'
import { motion } from 'framer-motion'
import React from 'react'
import { useEffect, useState } from 'react'
import { getVideoEmbedUrl } from '@/lib/video'

const Videos = () => {
    const [videoItems, setVideoItems] = useState<VideoItem[]>([]);

    useEffect(() => {
        const load = async () => {
            const data = await getPhaseThreeCollections();
            setVideoItems(data.videos);
        };

        void load();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl font-bold text-[#D41D33] mb-4">Video Gallery</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore moments and memories from our school community through these captured videos
                    </p>
                </motion.div>
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

            </div>
        </div>
    )
}

export default Videos
