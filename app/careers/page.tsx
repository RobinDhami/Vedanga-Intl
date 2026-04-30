"use client";

import { motion } from "framer-motion";
import { Briefcase, Clock, GraduationCap, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { getPhaseFourCollections } from "@/lib/cms-api";
import type { JobOpeningItem } from "@/types/cms";

export default function Careers() {
  const [jobOpenings, setJobOpenings] = useState<JobOpeningItem[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await getPhaseFourCollections();
      setJobOpenings(data.jobOpenings);
    };

    void load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {jobOpenings.length === 0 ? (
          <div className="text-center py-40">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-8 bg-red-100 text-red-600 rounded-full">
              <XCircle className="h-12 w-12" />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-300 mb-4">No Job Openings Available</h2>
          </div>
        ) : (
          <>
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold text-[#DB2139] mb-4">Join Our Team</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Explore career opportunities at Vedanga International School
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
              {jobOpenings.map((job, index) => (
                <motion.div
                  key={job.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.1, delay: index * 0.025 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="p-3 rounded-lg bg-red-100 text-red-600">
                        <Briefcase className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                        <div className="mt-1">
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                            {job.department}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-5 flex-grow">{job.description}</p>

                    <div className="space-y-3 mb-5">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{job.employment_type}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{job.experience} experience</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <GraduationCap className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{job.education}</span>
                      </div>
                    </div>

                    <div className="mt-auto rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-600">
                      Applications open through the school office
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
