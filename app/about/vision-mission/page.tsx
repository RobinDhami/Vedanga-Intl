"use client";

import { motion } from "framer-motion";
import { Target, Star, Compass, Award, Heart, ArrowRight, GraduationCap, FlaskConical, BookOpen, Users } from "lucide-react";
import Image from "next/image";

export default function VisionMission() {
  const values = [
    {
      title: "Excellence",
      description: "Striving for the highest standards in education and character development",
      icon: <Star className="h-6 w-6" />,
      color: "bg-[#D41D33]/10 text-[#D41D33]"
    },
    {
      title: "Innovation",
      description: "Embracing new ideas and methods in teaching and learning",
      icon: <Compass className="h-6 w-6" />,
      color: "bg-[#FF981F]/10 text-[#FF981F]"
    },
    {
      title: "Leadership",
      description: "Developing future leaders with strong moral values",
      icon: <Award className="h-6 w-6" />,
      color: "bg-[#D41D33]/10 text-[#D41D33]"
    },
    {
      title: "Community",
      description: "Fostering a supportive and inclusive learning environment",
      icon: <Heart className="h-6 w-6" />,
      color: "bg-[#FF981F]/10 text-[#FF981F]"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section with Future Doctor/Engineer Image */}
        <motion.div
          className="relative rounded-2xl overflow-hidden mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#D41D33]/70 to-[#FF981F]/70 z-10"></div>
          <Image
            loading="lazy"
            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Future doctor and engineer students working together"
            width={1920}
            height={1080}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-8">
            <span className="inline-block px-4 py-1 text-sm font-semibold text-white bg-white/20 rounded-full mb-4">
              Shaping Future Professionals
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Educating the <span className="text-[#FF981F]">Leaders</span> of  <span className="text-[#FF981F]">Tomorrow</span>
            </h1>
            <p className="text-white/90 text-lg max-w-3xl mx-auto">
              Our vision and mission prepare students for careers that will shape the future of healthcare and technology
            </p>
          </div>
        </motion.div>

        {/* Vision & Mission Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-24 relative">
          {/* Decorative elements */}
          <div className="hidden lg:block absolute -top-10 -left-20 w-40 h-40 rounded-full bg-[#D41D33]/10 blur-3xl"></div>
          <div className="hidden lg:block absolute -bottom-10 -right-20 w-40 h-40 rounded-full bg-[#FF981F]/10 blur-3xl"></div>

          {/* Vision Card */}
          <motion.div
            className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D41D33] to-[#FF981F]"></div>
            <div className="flex items-start gap-6 mb-8">
              <div className="p-4 bg-[#D41D33]/10 rounded-xl">
                <Target className="h-8 w-8 text-[#D41D33]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Vision</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-[#D41D33] to-[#FF981F] mb-4"></div>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">
              To cultivate the next generation of medical pioneers engineering innovators,
              equipping them with both technical expertise and compassionate leadership to solve humanity&apos;s greatest challenges.
            </p>
            <div className="mt-6 flex gap-4">
              <div className="flex items-center gap-2 text-sm text-[#FF981F]">
                <FlaskConical className="h-4 w-4" />
                <span>STEM Excellence</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#D41D33]">
                <GraduationCap className="h-4 w-4" />
                <span>Professional Readiness</span>
              </div>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF981F] to-[#D41D33]"></div>
            <div className="flex items-start gap-6 mb-8">
              <div className="p-4 bg-[#FF981F]/10 rounded-xl">
                <Compass className="h-8 w-8 text-[#FF981F]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Mission</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-[#FF981F] to-[#D41D33] mb-4"></div>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">
              Through cutting-edge STEM programs and hands-on professional training,
              we prepare students for careers that will advance medical science, technological innovation and advancments.
            </p>
            <div className="mt-6 flex gap-4">
              <div className="flex items-center gap-2 text-sm text-[#FF981F]">
                <BookOpen className="h-4 w-4" />
                <span>Research Focus</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#D41D33]">
                <Users className="h-4 w-4" />
                <span>Patient-Centered</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Values Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our <span className="text-[#D41D33]">Core Values</span></h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The fundamental principles that guide our STEM-focused education
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className="group relative bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden"
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className={`absolute top-0 left-0 w-full h-1 ${value.color.includes('[#D41D33]') ? 'bg-[#D41D33]' : 'bg-[#FF981F]'}`}></div>
              <div className="flex flex-col h-full">
                <div className={`p-3 ${value.color} rounded-lg mb-6 w-12 h-12 flex items-center justify-center`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* STEM Pathways Section */}
        <motion.div
          className="bg-gradient-to-br from-[#D41D33] to-[#FF981F] rounded-2xl p-12 mb-24 text-white relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 opacity-10 bg-[url('/images/circuit-pattern.svg')] bg-cover"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-8">STEM Career Pathways</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Medical Sciences */}
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <FlaskConical className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">Pre-Medical Program</h3>
                </div>
                <p className="text-white/90 mb-4">
                  Rigorous preparation for medical school with advanced biology, chemistry, and anatomy courses.
                </p>
                <ul className="text-white/80 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF981F]">•</span> Clinical shadowing opportunities
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF981F]">•</span> Medical research projects
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF981F]">•</span> MCAT preparation
                  </li>
                </ul>
              </div>

              {/* Biomedical Engineering */}
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
                      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                      <path d="M12 2v2" />
                      <path d="M12 22v-2" />
                      <path d="m17 20.66-1-1.73" />
                      <path d="M11 10.27 7 3.34" />
                      <path d="m20.66 17-1.73-1" />
                      <path d="m3.34 7 1.73 1" />
                      <path d="M14 12h8" />
                      <path d="M2 12h2" />
                      <path d="m20.66 7-1.73 1" />
                      <path d="m3.34 17 1.73-1" />
                      <path d="m17 3.34-1 1.73" />
                      <path d="m11 13.73-4 6.93" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Biomedical Engineering</h3>
                </div>
                <p className="text-white/90 mb-4">
                  Combining engineering principles with medical sciences to develop healthcare technologies.
                </p>
                <ul className="text-white/80 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF981F]">•</span> Medical device prototyping
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF981F]">•</span> Biomechanics studies
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF981F]">•</span> FDA regulation training
                  </li>
                </ul>
              </div>

              {/* Computer Science */}
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="14" height="10" x="5" y="9" rx="2" />
                      <rect width="20" height="8" x="2" y="5" rx="2" />
                      <path d="M2 15h20" />
                      <path d="M9 9v4" />
                      <path d="M15 9v4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Computer Science</h3>
                </div>
                <p className="text-white/90 mb-4">
                  Cutting-edge programming and system design for tomorrow&apos;s technology leaders.
                </p>
                <ul className="text-white/80 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF981F]">•</span> AI/ML specialization
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF981F]">•</span> Cybersecurity training
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF981F]">•</span> Hackathon competitions
                  </li>
                </ul>
              </div>

              {/* Mechanical Engineering */}
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 10a2 2 0 1 0-4 0v4a2 2 0 1 0 4 0v-4Z" />
                      <path d="M12 12v4" />
                      <path d="M10 10v4" />
                      <path d="M16 12h1" />
                      <path d="M7 12h1" />
                      <path d="M16 8h1" />
                      <path d="M7 8h1" />
                      <path d="m2 2 20 20" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Mechanical Engineering</h3>
                </div>
                <p className="text-white/90 mb-4">
                  Hands-on training in design, analysis, and manufacturing of mechanical systems.
                </p>
                <ul className="text-white/80 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF981F]">•</span> CAD/CAM certification
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF981F]">•</span> Robotics lab access
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF981F]">•</span> Industry co-op programs
                  </li>
                </ul>
              </div>

              {/* Environmental Science */}
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                      <path d="M8.5 8.5v.01" />
                      <path d="M16 15.5v.01" />
                      <path d="M12 12v.01" />
                      <path d="M11 17v.01" />
                      <path d="M7 14v.01" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Environmental Science</h3>
                </div>
                <p className="text-white/90 mb-4">
                  Preparing students to tackle global environmental challenges through science and policy.
                </p>
                <ul className="text-white/80 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF981F]">•</span> Field research expeditions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF981F]">•</span> Sustainability projects
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF981F]">•</span> Climate modeling
                  </li>
                </ul>
              </div>

              {/* Electrical Engineering */}
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Electrical Engineering</h3>
                </div>
                <p className="text-white/90 mb-4">
                  Developing expertise in circuits, power systems, and emerging electrical technologies.
                </p>
                <ul className="text-white/80 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF981F]">•</span> Smart grid technology
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF981F]">•</span> Embedded systems design
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF981F]">•</span> Renewable energy focus
                  </li>
                </ul>
              </div>
              {/* {Architecture Engineering} */}
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Architecture Engineering</h3>
                </div>
                <p className="text-white/90 mb-4">
                  Developing expertise in circuits, power systems, and emerging electrical technologies.
                </p>
                <ul className="text-white/80 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF981F]">•</span> Smart grid technology
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF981F]">•</span> Embedded systems design
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF981F]">•</span> Renewable energy focus
                  </li>
                </ul>
              </div>
              {/* {Hotel Management Engineering} */}

              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Hotel Management</h3>
                </div>
                <p className="text-white/90 mb-4">
                  Developing expertise in circuits, power systems, and emerging electrical technologies.
                </p>
                <ul className="text-white/80 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF981F]">•</span> Smart grid technology
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF981F]">•</span> Embedded systems design
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF981F]">•</span> Renewable energy focus
                  </li>
                </ul>
              </div>
              {/* {Hotel Management Engineering} */}

              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Arts and Crafts</h3>
                </div>
                <p className="text-white/90 mb-4">
                  Developing expertise in circuits, power systems, and emerging electrical technologies.
                </p>
                <ul className="text-white/80 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF981F]">•</span> Smart grid technology
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF981F]">•</span> Embedded systems design
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF981F]">•</span> Renewable energy focus
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

      
      </div>
    </div>
  );
}