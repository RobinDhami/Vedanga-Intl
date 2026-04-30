"use client";

import { motion } from "framer-motion";
import { BookOpen, BrainCircuit, Calculator, Code, Computer, FlaskConical, FolderOpenDot, Footprints, Globe, HandHeart, Handshake, HopOff, IndianRupee, Languages, Leaf, Music, Network, Palette, Rocket, Shield, Smile, ThermometerIcon, ThermometerSnowflake, Turtle, Users, WholeWord } from "lucide-react";
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
      name: "Sciences",
      icon: <FlaskConical />,
      description: "Hands-on experiments and theoretical knowledge across scientific disciplines."
    },
    {
      name: "Social Studies",
      icon: <Handshake />,
      description: "Exploration of history, geography, and social structures to foster global awareness."
    },
    {
      name: "Health, Sanitation and Physical Education",
      icon: <ThermometerIcon />,
      description: "Promoting health, hygiene, and physical fitness through interactive activities."
    },
    {
      name: "Computer",
      icon: <Computer />,
      description: "Digital literacy, programming basics, and practical applications of technology."
    },
    {
      name: "Nepali",
      icon: <Languages />,
      description: "Cultural heritage and language mastery through literature and communication skills."
    },
    {
      name: "Moral and Civic Education",
      icon: <Smile />,
      description: "Building ethical values, civic responsibility, and social awareness."
    },],
  "Languages": [
    {
      name: "Nepali",
      icon: <IndianRupee />,
      description: "Cultural heritage and language mastery through literature and communication skills."
    },
    {
      name: "English",
      icon: <WholeWord />,
      description: "Global communication skills and literary exploration."
    },
    {
      name: "Newari",
      icon: <Languages />,
      description: "Preservation and promotion of local language and cultural heritage."
    },
    {
      name: "Spanish",
      icon: <Languages />,
      description: "Global opportunities and cultural exchange through language proficiency."
    },
  ],
  "Technology": [
    { name: "Coding", icon: <Code />, description: "Modern programming languages and concepts" },
    { name: "Robotics", icon: <Rocket />, description: "Engineering and creativity combined" },
    { name: "AI Basics", icon: <BrainCircuit />, description: "Introduction to future technologies" }
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
    title: "Future Skills",
    icon: <Rocket className="w-5 h-5" />,
    description: "Preparing students for evolving careers"
  },
  {
    title: "Global Outlook",
    icon: <Globe className="w-5 h-5" />,
    description: "International perspective in all subjects"
  },
  {
    title: "Sustainability",
    icon: <Leaf className="w-5 h-5" />,
    description: "Eco-conscious learning integrated throughout"
  },
  {
    title: "Mindful Growth",
    icon: <BrainCircuit className="w-5 h-5" />,
    description: "Social-emotional development alongside academics"
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
              Foundational principles guiding our curriculum design
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
            <div className="flex flex-col justify-center items-center bg-gray-50 p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-gray-200">
              <div className="text-center">
                <div className="text-5xl font-bold text-[#D41D33] mb-2">87%</div>
                <p className="text-gray-600 text-2xl mb-6">
                  of graduates feel exceptionally prepared for future challenges
                </p>
                <p className="text-gray-600 text-2xl">
                  Preparing our future leaders
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}