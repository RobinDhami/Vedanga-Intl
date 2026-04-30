"use client";

import { motion } from "framer-motion";
import { Award, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { legacyTeamMembers } from "@/data/cms-legacy";
import { getTeamMembers } from "@/lib/cms-api";
import type { TeamMemberItem } from "@/types/cms";

const placeholderImage = "/images/NoImage.png";

const seededAcademicTeam = legacyTeamMembers
  .filter((member) => member.team_group === "academic")
  .map(
    (member, index): TeamMemberItem => ({
      id: index + 1,
      name: member.name,
      position: member.position,
      image_url: member.image,
      qualifications: member.qualifications,
      subject: member.subject,
      email: member.email,
      phone: member.phone,
      team_group: member.team_group,
      show_on_homepage: member.show_on_homepage,
      sort_order: index + 1,
      is_published: true,
    })
  );

const seededEcaTeam = legacyTeamMembers
  .filter((member) => member.team_group === "eca")
  .map(
    (member, index): TeamMemberItem => ({
      id: index + 101,
      name: member.name,
      position: member.position,
      image_url: member.image,
      qualifications: member.qualifications,
      subject: member.subject,
      email: member.email,
      phone: member.phone,
      team_group: member.team_group,
      show_on_homepage: member.show_on_homepage,
      sort_order: index + 1,
      is_published: true,
    })
  );

export default function OurTeam() {
  const [activeTab, setActiveTab] = useState<"academic" | "eca">("academic");
  const [academicTeam, setAcademicTeam] = useState<TeamMemberItem[]>(seededAcademicTeam);
  const [ecaTeam, setEcaTeam] = useState<TeamMemberItem[]>(seededEcaTeam);

  useEffect(() => {
    const load = async () => {
      const [academic, eca] = await Promise.all([
        getTeamMembers({ group: "academic" }),
        getTeamMembers({ group: "eca" }),
      ]);

      setAcademicTeam(academic);
      setEcaTeam(eca);
    };

    void load();
  }, []);

  const displayedTeam = activeTab === "academic" ? academicTeam : ecaTeam;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 text-sm font-semibold text-[#D41D33] bg-[#D41D33]/10 rounded-full mb-4">
            Faculty & Staff
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Our <span className="text-[#D41D33]">Professionals</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our dedicated educators bring passion, expertise, and innovation to create an inspiring learning
            environment
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("academic")}
              className={`px-6 py-2 rounded-md font-medium text-sm transition-colors ${
                activeTab === "academic" ? "bg-white text-[#D41D33] shadow-sm" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Academic Team
            </button>
            <button
              onClick={() => setActiveTab("eca")}
              className={`px-6 py-2 rounded-md font-medium text-sm transition-colors ${
                activeTab === "eca" ? "bg-white text-[#D41D33] shadow-sm" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              ECA Team
            </button>
          </div>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8 mb-20">
          {displayedTeam.map((member, index) => (
            <motion.div
              key={member.id ?? `${member.team_group}-${member.name}`}
              className="group relative w-full max-w-sm md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  loading="lazy"
                  src={member.image_url || placeholderImage}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-[#FAA02E] font-medium">{member.position}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 mt-0.5 text-[#D41D33] flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Experience</p>
                      <p className="text-gray-700">{member.qualifications || "Details coming soon"}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link
                    href={member.email ? `mailto:${member.email}` : "#"}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#D41D33] text-white rounded-lg hover:bg-[#A3162A] transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </Link>
                  <Link
                    href={member.phone ? `tel:${member.phone}` : "#"}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-[#D41D33] text-[#D41D33] rounded-lg hover:bg-[#D41D33] hover:text-white transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
