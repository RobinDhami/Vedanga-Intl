"use client";

import { motion } from "framer-motion";
import { BookOpen, Clock, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProgramDetail } from "../programData";

interface ProgramContentProps {
    program: ProgramDetail;
}

export default function ProgramContent({ program }: ProgramContentProps) {
    if (!program) {
        return <div className="min-h-screen flex items-center justify-center">Program not found</div>;
    }
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Hero Section */}
            <div className="relative h-96 w-full overflow-hidden">
                <Image
                    src={program.heroImage}
                    alt={program.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block px-3 py-1 text-sm font-medium bg-white/20 rounded-full mb-4">
                                {program.grades}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{program.title}</h1>
                            <p className="text-xl max-w-3xl">{program.overview}</p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {/* Curriculum Section */}
                <motion.section
                    className="mb-20"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                        <BookOpen size={20} className="text-[#D41D33]" />
                        <span>Curriculum Overview</span>
                    </h2>

                    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Core Subjects</h3>
                            <div className="flex flex-wrap gap-3">
                                {program.curriculum.coreSubjects.map((subject, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                                    >
                                        {subject}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {program.curriculum.electives && (
                        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Elective Subjects</h3>
                                <div className="flex flex-wrap gap-3">
                                    {program.curriculum.electives.map((subject, index) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                                        >
                                            {subject}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {program.curriculum.tracks && (
                        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Specialization Tracks</h3>
                                <div className="space-y-6">
                                    {program.curriculum.tracks.map((track, index) => (
                                        <div key={index}>
                                            <h4 className="text-lg font-semibold text-gray-700 mb-3">{track.name}</h4>
                                            <div className="flex flex-wrap gap-3">
                                                {track.subjects.map((subject, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                                                    >
                                                        {subject}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Teaching Approach</h3>
                            <p className="text-gray-600">{program.curriculum.approach}</p>
                        </div>
                    </div>
                </motion.section>

                {/* Daily Schedule */}
                <motion.section
                    className="mb-20"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <h2 className="text-2xl md:text-3xl  font-bold text-gray-900 mb-8 flex items-center gap-3">
                        <Clock size={20} className="text-[#D41D33]" />
                        <span>Daily Schedule</span>
                    </h2>
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="divide-y divide-gray-200">
                            {program.dailySchedule.map((item, index) => (
                                <div key={index} className="p-6 flex items-start gap-6">
                                    <div className="flex-shrink-0 w-fit">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#D41D33]/10 text-[#D41D33]">
                                            {item.time}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-800">{item.activity}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>
                {/* Features Section */}
                <motion.section
                    className="mb-20"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <h2 className="text-2xl md:text-3xl  font-bold text-gray-900 mb-8 flex items-center gap-3">
                        <BookOpen size={20} className="text-[#D41D33]" />
                        <span>Program Highlights</span>
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {program.features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="w-12 h-12 flex items-center justify-center bg-[#D41D33]/10 text-[#D41D33] rounded-full mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Gallery Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                        <ImageIcon size={20} className="text-[#D41D33]" />
                        <span>Gallery</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {program.gallery.map((image, index) => (
                            <motion.div
                                key={index}
                                className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Image
                                    src={image}
                                    alt={`${program.title} gallery image ${index + 1}`}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.section>


            </div>
        </div>
    );
}