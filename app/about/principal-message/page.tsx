"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Award, BookOpen, Quote } from "lucide-react";
import Image from "next/image";

export default function PrincipalMessage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-10 sm:py-16 lg:py-20">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-[#FF981F]/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-[#D41D33]/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 text-xs sm:text-sm font-semibold text-[#D41D33] bg-[#D41D33]/10 rounded-full mb-3 sm:mb-4 tracking-wider">
            MESSAGE
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            From the <span className="text-[#D41D33]">Principal&apos;s</span> Desk
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Guiding Vedanga International School towards educational excellence
          </p>
        </motion.div>

        <div className="lg:flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-12 items-start">
          {/* Principal Profile Card */}
          <motion.div
            className="lg:w-1/3 w-full mb-8 lg:mb-0"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden lg:sticky lg:top-24 border border-gray-100">
              <div className="relative h-60 sm:h-72 lg:h-80 w-full">
                <Image
                  loading="lazy"
                  src="/images/ppp.png"
                  alt="Principal"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                  <h2 className="text-xl sm:text-2xl font-bold">Mr. Bhawesh Sapkota</h2>
                  <p className="text-white/90 text-sm sm:text-base">Principal</p>
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2 bg-[#FF981F]/10 rounded-lg">
                    <Award className="h-5 w-5 sm:h-6 sm:w-6 text-[#FF981F]" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium text-gray-500">Qualifications</h3>
                    <p className="text-gray-700 text-sm font-semibold sm:text-base">Masters in Humanities</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2 bg-[#FF981F]/10 rounded-lg">
                    <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-[#FF981F]" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium text-gray-500">Experience</h3>
                    <p className="text-gray-700 text-sm font-semibold sm:text-base">30+ years in education</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2 bg-[#FF981F]/10 rounded-lg">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-[#FF981F]" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium text-gray-500">Email</h3>
                    <p className="text-gray-700 text-sm sm:text-base font-semibold break-all">sapkotabhaweshvedanga@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2 bg-[#FF981F]/10 rounded-lg">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-[#FF981F]" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium text-gray-500">Phone</h3>
                    <p className="text-gray-700 text-sm font-semibold sm:text-base">+977 98</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Message Content */}
          <motion.div
            className="lg:w-2/3 w-full max-h-[calc(100vh-4rem)] overflow-y-auto pr-2 shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-8 md:p-10 lg:p-12 border border-gray-100">
              <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-6 sm:mb-8">
                 Dear valued parents and stakeholders,
                </p>

                <p className="text-gray-600 leading-relaxed mb-6 sm:mb-8">
                  The role of a school is not limited within the area of pursuing academic excellence only, but also to motivate and empower its pupils to become everlasting learners, critical thinkers and productive members of an ever-changing global society. The aim of teaching and learning should be all round development of the pupils. The knowledge they obtained should be transformed in their everyday work experience. Realizing this fact, the acquisition of Vedanga has been done recently by new management team with the mission to address the needs and aspirations of parents through the latest model of progressive teaching pedagogy to help the children to be practical, competitive and responsible citizens.
                </p>

                <div className="relative my-8 sm:my-10 lg:my-12 p-6 sm:p-8 bg-[#D41D33]/5 rounded-lg sm:rounded-xl border-l-4 border-[#D41D33]">
                  <Quote className="absolute top-2 left-3 h-6 w-6 sm:h-8 sm:w-8 text-[#D41D33]/30" />
                  <p className="text-lg sm:text-xl italic text-gray-700 font-medium mt-1 sm:mt-2">
                    &quot;Education is not just about acquiring knowledge, but about shaping character and building futures.&quot;
                  </p>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6 sm:mb-8">
                  Vedanga is committed to providing an atmosphere to the students for multifaceted development, where children are encouraged to channelize their potential in the pursuit of excellence. This can be possible in a holistic and student-centric environment. At Vedanga, we provide such environment where the talents, skills and abilities of each student are identified, nurtured and encouraged so that they can reach greater heights. We provide them with a platform to think, explore, express, and exhibit their skills. This school has adopted the policy of empowering the children to negotiate several issues that confront them by nurturing skills in children to solve problems. We leave no stone unturned to inculcate strong values combining with academics and extra-curricular activities in the children to develop themselves as the professionals in their subject of interest, to develop themselves as dynamic leaders and self-disciplined social humans, self-reliant and independent risk bearing global citizen leading to face the challenges. The school is committed in preparing our pupils to be dynamic leaders having knowledge and skills to be fit at local as well as at the global market.

                </p>

                <p className="text-gray-600 leading-relaxed mb-6 sm:mb-8">
                  There is no doubt a student has every hope and possibility of becoming a responsible and balanced citizen who lives in to contribute to the family and to shoulder the responsibilities of the society. Keeping this fact into consideration, we encourage our students to set their goals within their reach until they gain their confidence and determination. We motivate them to set clear goals and make specific plans to achieve them. This will help them to move forward purposefully in their life and have the pleasure of watching their dreams into reality.
                </p>

                <div className="my-8 sm:my-10 lg:my-12 p-4 sm:p-6 bg-gray-50 rounded-lg sm:rounded-xl">
                  <h3 className="text-lg sm:text-xl font-bold text-[#D41D33] mb-3 sm:mb-4">Our Core Commitments:</h3>
                  <ul className="space-y-3 sm:space-y-4">
                    <li className="flex items-start gap-2 sm:gap-3">
                      <span className="inline-flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-[#D41D33] text-white text-xs sm:text-sm font-bold">1</span>
                      <span className="text-gray-700 text-sm sm:text-base">Academic excellence through innovative teaching</span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <span className="inline-flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-[#FF981F] text-white text-xs sm:text-sm font-bold">2</span>
                      <span className="text-gray-700 text-sm sm:text-base">Character development and values education</span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <span className="inline-flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-[#D41D33] text-white text-xs sm:text-sm font-bold">3</span>
                      <span className="text-gray-700 text-sm sm:text-base">Preparing independent and entrepreneurial students</span>
                    </li>
                  </ul>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6 sm:mb-8">
                  In fact, we are devoted to instill in the students the academic excellence, prepare them for life, groom them to face the challenges of tomorrow and encourage them to be socially relevant. Hence, our approaches to learning are child-centric, activity-based and research-oriented. The primary focus of our curriculum is to create the environment where each child is involved in the learning process so that their learning turns into a combination of classroom study, research and scientific discovery.
                </p>

                <p className="text-gray-600 leading-relaxed mb-8 sm:mb-10 lg:mb-12">
                  Ultimately, I am confident that the Vedangaeans will make themselves stronger adding a new break to the majesty of the school.
                </p>

                <div className="border-t border-gray-200 pt-6 sm:pt-8">
                  <p className="text-lg sm:text-xl font-semibold text-gray-900">
                    Warm regards,<br />
                    <span className="text-[#D41D33]">Mr. Bhawesh Sapkota</span><br />
                    Principal, Vedanga International School
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
