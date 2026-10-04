"use client";

import { motion } from "framer-motion";
import { BookOpen, BrainCircuit, Calculator, Code, Computer, FlaskConical, FolderOpenDot, Footprints, Globe, HandHeart, Handshake, HopOff, IndianRupee, Languages, Leaf, Music, Network, Palette, Rocket, Shield, Smile, ThermometerIcon, ThermometerSnowflake, Turtle, Users, WholeWord } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Subject {
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface Subjects {
  [key: string]: Subject[];
}

interface Pillar {
  title: string;
  icon: React.ReactNode;
  description: string;
}

const subjects: Subjects = {
  "Core": [
    {
      name: "English",
      icon: <BookOpen />,
      description: "Comprehensive literature studies, creative writing, and language proficiency development."
    },
    {
      name: "Mathematics",
      icon: <Calculator />,
      description: "Problem-solving techniques with real-world applications and logical reasoning."
    },
    {
      name: "Science and Technology",
      icon: <FlaskConical />,
      description: "Hands-on experiments and theoretical knowledge across scientific disciplines."
    },
    {
      name: "Social Studies",
      icon: <Handshake />,
      description: "Exploration of history, geography, and social structures to foster global awareness."
    },
    {
      name: "Health, Physical Education and Creative Arts",
      icon: <ThermometerIcon />,
      description: "Promoting health, hygiene, and physical fitness through interactive activities."
    },
    {
      name: "Computer Science",
      icon: <Computer />,
      description: "Digital literacy, programming basics, and practical applications of technology."
    },
  ],
  "Languages": [
    {
      name: "Nepali and Sero Fero",
      icon: <IndianRupee />,
      description: "Nepali language, local context, and cultural learning through communication and exploration."
    },
    {
      name: "English",
      icon: <WholeWord />,
      description: "Global communication skills and literary exploration."
    },
    {
      name: "Nepal Bhasa",
      icon: <Languages />,
      description: "Preservation and promotion of local language and cultural heritage."
    },
  ],
  "Technology": [
    { name: "Coding", icon: <Code />, description: "Modern programming languages and concepts" },
    { name: "Robotics", icon: <Rocket />, description: "Engineering and creativity combined" },
    { name: "AI Basics", icon: <BrainCircuit />, description: "Introduction to future technologies" },
    { name: "STEAM", icon: <FlaskConical />, description: "Integrated science, technology, engineering, arts, and mathematics learning" }
  ],
  "Life & Career": [
    { name: "Entrepreneurship and Financial Literacy", icon: <IndianRupee />, description: "Building initiative, financial awareness, and practical decision-making" },
    { name: "Life Skills", icon: <Smile />, description: "Developing communication, resilience, problem-solving, and everyday independence" },
    { name: "Community Service", icon: <HandHeart />, description: "Encouraging meaningful service and contribution to the wider community" },
    { name: "Career Education", icon: <Rocket />, description: "Helping students explore interests, pathways, and future opportunities" }
  ],
  "Sports": [
    { name: "Basketball", icon: <HopOff />, description: "Agility, teamwork and strategy on court" },
    { name: "Cricket", icon: <Shield />, description: "Focus, patience and coordination" },
    { name: "Volleyball", icon: <Users />, description: "Strengthen reflex and team spirit" },
    { name: "Table Tennis", icon: <Network />, description: "Speed and precision in motion" },
    { name: "Football", icon: <Footprints />, description: "Energy, tactics and sportsmanship" },
    { name: "Badminton", icon: <Rocket />, description: "Fast-paced rallies and fitness" },
    { name: "Karate", icon: <FolderOpenDot />, description: "Builds strength, discipline and focus" }
  ],
  "ECA": [
    { name: "Dance", icon: <Turtle />, description: "Creative expression and movement" },
    { name: "Drama", icon: <Palette />, description: "Creative expression through performance, storytelling, and collaboration" },
    { name: "Skating", icon: <Footprints />, description: "Balance, agility, and fun" },
    { name: "Karate classes", icon: <Shield />, description: "Discipline and self-defense" },
    { name: "Woodwork", icon: <FolderOpenDot />, description: "Hands-on creativity with tools" },
    { name: "Field visit, excursions", icon: <Globe />, description: "Exploring learning beyond classrooms" },
    { name: "Skill enhancement activities", icon: <BrainCircuit />, description: "Focused sessions on soft and hard skills" },
    { name: "Cooking", icon: <Leaf />, description: "Culinary skills through guided experience" },
    { name: "Swimming", icon: <ThermometerSnowflake />, description: "Water safety and physical development" },
    { name: "Visual Art", icon: <Palette />, description: "Artistic growth with various mediums" },
    { name: "Sculpting", icon: <Turtle />, description: "3D creative expression" },
    { name: "Music", icon: <Music />, description: "Theory and performance-based learning" },
    { name: "Guitar, Keyboard, Madal, Vocal, Cajon", icon: <Music />, description: "Diverse musical training" },
    { name: "Yoga", icon: <Handshake />, description: "Mind-body balance and mindfulness" }
  ],

};

const programPillars: Pillar[] = [
  {
    title: "Academic Excellence",
    icon: <BookOpen className="w-5 h-5" />,
    description: "Rigorous learning aligned with national standards."
  },
  {
    title: "Character and Citizenship",
    icon: <HandHeart className="w-5 h-5" />,
    description: "Integrity, empathy, leadership, and service."
  },
  {
    title: "Innovation and Creativity",
    icon: <Rocket className="w-5 h-5" />,
    description: "Design thinking, arts, and entrepreneurship."
  },
  {
    title: "Technology and Digital Fluency",
    icon: <Computer className="w-5 h-5" />,
    description: "Responsible and effective use of digital tools."
  },
  {
    title: "Health and Well-being",
    icon: <Smile className="w-5 h-5" />,
    description: "Physical fitness, emotional resilience, and mental wellness."
  },
  {
    title: "Global Competence",
    icon: <Globe className="w-5 h-5" />,
    description: "Cultural understanding, communication, and sustainability."
  },
  {
    title: "Community Partnership",
    icon: <Handshake className="w-5 h-5" />,
    description: "Strong collaboration with families and local organizations."
  },
  {
    title: "Continuous Improvement",
    icon: <BrainCircuit className="w-5 h-5" />,
    description: "Evidence-based planning and reflective practice."
  }
];

export default function Curriculum() {
  const [activeCategory, setActiveCategory] = useState<string>("Core");

  return (
    <div className="min-h-screen bg-white">
      {/* Clean Hero Section */}
      <div className="bg-[#D41D33] text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-xs p-2 px-3 rounded-full bg-white w-fit text-[#D41D33] font-medium mb-4 opacity-90">ACADEMIC FRAMEWORK</p>
            <h1 className="text-4xl font-bold mb-6">Our Curriculum Approach</h1>
            <p className="text-lg max-w-2xl mx-auto opacity-90">
              Balanced education combining academic excellence with practical skills
            </p>
          </div>
        </div>
      </div>

      {/* Simple Subject Navigation */}
      <div className="max-w-7xl mx-auto px-6 -mt-6">
        <div className="flex flex-wrap justify-center gap-2">
          {Object.keys(subjects).map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium shadow-md transition-colors ${activeCategory === category
                ? 'bg-[#FBA126] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Clean Subject Cards */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {subjects[activeCategory].map((subject) => (
            <motion.div
              key={subject.name}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#D41D33]/10 rounded-lg text-[#D41D33]">
                  {subject.icon}
                </div>
                <h3 className="text-xl font-semibold">{subject.name}</h3>
              </div>
              <p className="text-gray-600">{subject.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Minimal Pillars Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Our <span className="text-[#D41D33]">Educational </span>Pillars</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              The framework rests on eight interconnected pillars.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programPillars.map((pillar) => (
              <div key={pillar.title} className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#D41D33]/10 rounded-lg text-[#D41D33]">
                    {pillar.icon}
                  </div>
                  <h3 className="font-semibold">{pillar.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Simple Two-Column Feature */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Beyond Classroom Learning
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1 text-[#D41D33]">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Global Collaborations</h4>
                    <p className="text-gray-600 text-sm">Partnerships with schools worldwide</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1 text-[#D41D33]">
                    <Palette className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Creative Showcases</h4>
                    <p className="text-gray-600 text-sm">Annual exhibitions of student work</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1 text-[#D41D33]">
                    <HandHeart className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Collaborative Leadership</h4>
                    <p className="text-gray-600 text-sm">Showcase of individual and teamwork brilliance</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative min-h-[320px] overflow-hidden border-t border-gray-200 bg-gray-50 lg:border-l lg:border-t-0">
              <Image
                src="/images/robotics.jpg"
                alt="Students working together on a robotics project at Vedanga"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
