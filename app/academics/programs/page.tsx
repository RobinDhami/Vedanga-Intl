"use client";

import { motion } from "framer-motion";
import { GraduationCap, Book, Globe, Calculator, Microscope, Palette, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const programs = [
  {
    title: "Primary Education",
    grades: "Grades 1-5",
    description: "Our foundational program emphasizes holistic development through engaging, age-appropriate learning experiences that spark curiosity and build essential skills.",
    icon: <Book className="h-8 w-8" />,
    features: ["English Medium Instruction", "STEAM Integration", "Physical Education", "Arts & Music"],
    image: "/images/foto4.jpg",
    color: "bg-blue-100 text-blue-600"
    ,slug:'primary-education'
  },
  {
    title: "Middle School",
    grades: "Grades 6-8",
    description: "Transitional years that deepen subject knowledge while developing critical thinking and independent learning skills through project-based approaches.",
    icon: <Calculator className="h-8 w-8" />,
    features: ["Advanced Mathematics", "Science Labs", "Language Arts", "Social Studies"],
    image: "/images/foto13.jpg",
    color: "bg-purple-100 text-purple-600"
    , slug: 'middle-school'
  },
  {
    title: "Secondary Education",
    grades: "Grades 9-10",
    description: "Comprehensive preparation for national examinations with specialized tracks and intensive support to ensure academic success and career readiness.",
    icon: <GraduationCap className="h-8 w-8" />,
    features: ["SEE Preparation", "Career Counseling", "Advanced Sciences", "Computer Studies"],
    image: "/images/foto12.jpg",
    color: "bg-green-100 text-green-600"
    ,slug:'secondary-education'

  },
  
];

export default function Programs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF981F]/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D41D33]/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 text-sm font-semibold text-[#D41D33] bg-[#D41D33]/10 rounded-full mb-4 tracking-wider">
            ACADEMIC PATHWAYS
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-[#D41D33]">Academic Programs</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive educational pathways designed to nurture intellectual growth and prepare students for future success
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              className="group relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  loading="lazy"
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold">{program.title}</h3>
                  <p className="text-white/90">{program.grades}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 ${program.color} rounded-lg`}>
                    {program.icon}
                  </div>
                  <div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${program.color}`}>
                      {program.grades}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{program.description}</p>

                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-gray-500 mb-3">KEY FEATURES</h4>
                  <ul className="space-y-2">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className={`w-2 h-2 mt-2 rounded-full ${program.color.replace('bg-', 'bg-').replace('text-', '')}`}></span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/academics/programs/${program.slug}`}
                  className="inline-flex items-center text-[#D41D33] font-medium group-hover:text-[#A3162A] transition-colors"
                >
                  Explore Program Details
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

   
      </div>
    </div>
  );
}