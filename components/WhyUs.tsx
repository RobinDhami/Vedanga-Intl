'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Check, BookOpen, Laptop, Music, Paintbrush, GraduationCap, Utensils, Book, HeartPulse, Bus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const WhyUs = () => {
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    };

    const featureCardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 }
    };

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-[#aa1625] via-[#C40618] to-[#FD9B21] text-white py-24 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-6"
                    >
                        <span className="inline-block px-4 py-1 text-sm font-semibold text-white bg-white/20 rounded-full mb-4">
                            Excellence in Education
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                            Why Choose <span className="text-[#FFD700]">Vedanga?</span>
                        </h1>
                        <p className="text-lg sm:text-xl max-w-3xl mx-auto text-white/90">
                            Discover what makes Vedanga a unique and nurturing environment for your child&apos;s holistic development.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* About Vedanga Batika Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="flex flex-col lg:flex-row items-center gap-12"
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <div className="lg:w-1/2 relative">
                            <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-[#FD9B21]/20 to-[#C40618]/20 rounded-xl rotate-1"></div>
                            <Image
                                height={100}
                                width={100}
                                src="/images/foto12.jpg"
                                alt="Children learning at Vedanga Batika"
                                className="relative w-full h-96 object-cover rounded-lg shadow-xl z-10"
                            />
                        </div>
                        <div className="lg:w-1/2">
                            <h3 className="text-3xl font-bold text-gray-900 mb-6">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C40618] to-[#FD9B21]">
                                    About Vedanga
                                </span>
                            </h3>
                            <div className="space-y-4 text-gray-600">
                                <p className="text-lg">
                                    Vedanga International School is committed to providing an atmosphere to the students for multifaceted development to encourage and channelize their potential in the pursuit of excellence which can be possible in a holistic and student-centric environment.Also,Vedanga Batika is a pre-school chain of Vedanga International School, renowned as a premier institution in Nepal&apos;s education landscape for its progressive approach.
                                </p>
                                <p className="text-lg">
                                    We offer a <span className="font-semibold text-[#C40618]">&quot;learning by doing&quot;</span> methodology that provides rich experiential learning both inside and outside the classroom to nurture critical thinkers and lifelong learners.
                                    Our interdisciplinary, experiential, and collaborative environment encourages children to explore knowledge while developing positive behaviors and social-emotional skills.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Special Features Section */}
            <section className="py-16 bg-gradient-to-b from-[#F9F9F9] to-[#f9f9f9d0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-12"
                    >
                        <span className="inline-block px-4 py-1 text-sm font-semibold text-[#C40618] bg-[#C40618]/10 rounded-full mb-4">
                            Our Approach
                        </span>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Special Features of <span className="text-[#C40618]">Vedanga</span>
                        </h3>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            We combine innovative teaching methods with a nurturing environment to foster holistic development.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Learning by doing",
                                desc: "Hands-on experiences that make learning meaningful and memorable",
                                icon: <Check className="w-6 h-6" />
                            },
                            {
                                title: "Play-based learning",
                                desc: "Developmentally appropriate play that builds cognitive and social skills",
                                icon: <Paintbrush className="w-6 h-6" />
                            },
                            {
                                title: "Critical thinking",
                                desc: "Activities designed to develop problem-solving and analytical skills",
                                icon: <GraduationCap className="w-6 h-6" />
                            },
                            {
                                title: "Project-based learning",
                                desc: "Real-world projects that integrate multiple subject areas",
                                icon: <BookOpen className="w-6 h-6" />
                            },
                            {
                                title: "Social-emotional learning",
                                desc: "Programs that develop self-awareness and interpersonal skills",
                                icon: <HeartPulse className="w-6 h-6" />
                            },
                            {
                                title: "Creative expression",
                                desc: "Arts and music programs that foster imagination and creativity",
                                icon: <Music className="w-6 h-6" />
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={featureCardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                            >
                                <div className="w-12 h-12 flex items-center justify-center bg-[#C40618]/10 text-[#C40618] rounded-full mb-4">
                                    {feature.icon}
                                </div>
                                <h4 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h4>
                                <p className="text-gray-600">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Curriculum Sections */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="flex flex-col lg:flex-row-reverse items-center gap-12"
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <div className="lg:w-1/2 relative">
                            <div className="absolute -inset-2 md:-inset-4  bg-gradient-to-r from-[#FD9B21]/20 to-[#C40618]/20 rounded-xl -rotate-1"></div>
                            <Image
                                height={100}
                                width={100}
                                src="/images/foto13.jpg"
                                alt="Classroom activities at Vedanga Batika"
                                className="relative w-full h-96 object-cover rounded-lg shadow-xl z-10"
                            />
                        </div>
                        <div className="lg:w-1/2">
                            <h3 className="text-3xl font-bold text-gray-900 mb-6">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C40618] to-[#FD9B21]">
                                    Our Curriculum
                                </span>
                            </h3>
                            <div className="space-y-4 text-gray-600 ">
                                <p className="text-lg">
                                    Our carefully designed curriculum ensures a smooth transition from pre-school to Grade 1, with theme-based classes in Art, Craft, Food, Music, Dance, and Language.
                                </p>
                                <p className="text-lg">
                                    Classrooms are intentionally designed to encourage exploration, foster problem-solving, and offer diverse learning opportunities at each child&apos;s individual pace.
                                </p>
                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    {["Play-based learning", "Interactive activities", "Thematic units", "Skill development"].map((item, i) => (
                                        <div key={i} className="flex items-center space-x-2">
                                            <div className="w-5 h-5 bg-[#C40618]/10 text-[#C40618] rounded-full flex items-center justify-center">
                                                <Check className="w-3 h-3" />
                                            </div>
                                            <span className="text-gray-700">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Infant Toddler Section */}
            <section className="py-16 bg-[#F9F9F9]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="flex flex-col lg:flex-row items-center gap-12"
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <div className="lg:w-1/2 relative">
                            <div className="absolute -inset-2 md:-inset-4  bg-gradient-to-r from-[#FD9B21]/20 to-[#C40618]/20 rounded-xl rotate-1"></div>
                            <Image
                                height={100}
                                width={100}
                                src="/images/foto17.jpg"
                                alt="Infant toddler activities at Vedanga Batika"
                                className="relative w-full h-96 object-cover rounded-lg shadow-xl z-10"
                            />
                        </div>
                        <div className="lg:w-1/2">
                            <h3 className="text-3xl font-bold text-gray-900 mb-6">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C40618] to-[#FD9B21]">
                                    Infant Toddler Program
                                </span>
                            </h3>
                            <div className="space-y-4 text-gray-600">
                                <p className="text-lg">
                                    Our daily curriculum provides developmentally appropriate activities designed specifically for our youngest learners.
                                </p>
                                <p className="text-lg">
                                    Each activity includes a detailed &quot;Rationale&quot; to help teachers understand the holistic purpose of the activity and confidently plan their own lessons.
                                </p>
                                <ul className="mt-4 space-y-3">
                                    {["Sensory play", "Motor skill development", "Language exposure", "Social interaction"].map((item, i) => (
                                        <li key={i} className="flex items-start">
                                            <div className="flex-shrink-0 mt-1">
                                                <div className="w-4 h-4 bg-[#C40618]/10 text-[#C40618] rounded-full flex items-center justify-center">
                                                    <Check className="w-2 h-2" />
                                                </div>
                                            </div>
                                            <span className="ml-3 text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Core Subjects Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-12"
                    >
                        <span className="inline-block px-4 py-1 text-sm font-semibold text-[#C40618] bg-[#C40618]/10 rounded-full mb-4">
                            Academic Excellence
                        </span>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Core <span className="text-[#C40618]">Curriculum</span>
                        </h3>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Our comprehensive curriculum covers all essential subject areas for holistic development.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { name: "English", icon: <BookOpen className="w-6 h-6" /> },
                            { name: "Mathematics", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg> },
                            { name: "Science", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg> },
                            { name: "Social Studies", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg> },
                            { name: "Nepali", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg> },
                            { name: "Moral & Civic Education", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg> },
                            { name: "Environment Studies", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg> },
                            { name: "Health & Physical Education", icon: <HeartPulse className="w-6 h-6" /> },
                            { name: "Computer Science", icon: <Laptop className="w-6 h-6" /> },
                        ].map((subject, index) => (
                            <motion.div
                                key={index}
                                variants={featureCardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex items-start space-x-4"
                            >
                                <div className="flex-shrink-0 w-10 h-10 bg-[#C40618]/10 text-[#C40618] rounded-full flex items-center justify-center mt-1">
                                    {subject.icon}
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-800">{subject.name}</h4>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Facilities Section */}
            <section className="py-16 bg-gradient-to-b from-[#F9F9F9] to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-12"
                    >
                        <span className="inline-block px-4 py-1 text-sm font-semibold text-[#C40618] bg-[#C40618]/10 rounded-full mb-4">
                            World-Class Facilities
                        </span>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Our Additional <span className="text-[#C40618]">Facilities</span>
                        </h3>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            We provide state-of-the-art facilities to support our students&apos; learning and development.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: "Cafeteria",
                                desc: "Fresh & nutritious meals prepared under hygienic conditions by trained staff",
                                icon: <Utensils className="w-8 h-8" />,
                                img: "/images/foto1.jpg"
                            },
                            {
                                title: "Library",
                                desc: "Well-stocked with books and digital resources for all age groups",
                                icon: <Book className="w-8 h-8" />,
                                img: "/images/foto3.jpg"
                            },
                            {
                                title: "Infirmary",
                                desc: "Staffed with qualified nurses to provide first aid and maintain health records",
                                icon: <HeartPulse className="w-8 h-8" />,
                                img: "/images/foto13.jpg"
                            },
                            {
                                title: "Transportation",
                                desc: "Safe and reliable transport services covering all parts of Kathmandu",
                                icon: <Bus className="w-8 h-8" />,
                                img: "/images/foto14.jpg"
                            },
                        ].map((facility, index) => (
                            <motion.div
                                key={index}
                                variants={featureCardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        height={100}
                                        width={100}
                                        src={facility.img}
                                        alt={facility.title}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-[#C40618]">
                                        {facility.icon}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h4 className="text-xl font-bold text-gray-800 mb-2">{facility.title}</h4>
                                    <p className="text-gray-600">{facility.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-[#aa1625] via-[#C40618] to-[#FD9B21] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join the Vedanga Family?</h3>
                        <p className="text-xl max-w-3xl mx-auto mb-8 text-white/90">
                            Experience the difference of our holistic approach to early childhood education.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href={'/contact'}><button className="px-8 py-3 bg-white text-[#C40618] rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                                Contact Us
                            </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default WhyUs;