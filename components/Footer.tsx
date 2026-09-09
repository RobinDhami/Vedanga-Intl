import { School, Facebook, Instagram, Linkedin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
    const socialLinks = [
        { icon: Facebook, url: 'https://www.facebook.com/vedangaInternationalschool' },
        { icon: Instagram, url: 'https://www.instagram.com/vedangainternational' },
        { icon: Linkedin, url: 'https://www.linkedin.com/company/vedanga-international-school' },
    ];

    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="flex flex-col items-center">
                                <Image
                                    priority
                                    src="/images/logo.png"
                                    alt="Vedanga Logo"
                                    width={40}
                                    height={40}
                                    className="h-8 w-fit lg:h-12 lg:w-fit object-cover"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-xl text-[#D41326] -mb-1">Vedanga</span>
                                <span className="font-bold text-base text-[#D41326] -mb-2">International School</span>
                            </div>
                        </div>
                        <p className="text-gray-400">Nurturing Minds, Shaping Futures</p>
                        <div className="space-y-2">
                            <p className="text-gray-400">Rabibhawan, Kathmandu</p>

                            <p className="text-gray-400"> <Link href="tel:01-5372578 ">Phone: 01-5372578 </Link></p>


                            <p className="text-gray-400"> <Link href="mailto:vedanga79@gmail.com">Email: vedanga79@gmail.com </Link></p>
                        </div>
                        <div className="flex space-x-4 mt-4">
                            {socialLinks.map((social, index) => (
                                <Link key={index} href={social.url} target="_blank" rel="noopener noreferrer">
                                    <social.icon className="h-6 w-6 text-gray-400 hover:text-white transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                        <div className="space-y-2">
                            <Link href="/about/principal-message" className="block text-gray-400 hover:text-white transition-colors">Principal&apos;s Message</Link>
                            <Link href="/academics/programs" className="block text-gray-400 hover:text-white transition-colors">Programs</Link>
                            <Link href="/school-life/events" className="block text-gray-400 hover:text-white transition-colors">Events</Link>
                            <Link href="/news/notices" className="block text-gray-400 hover:text-white transition-colors">Notices</Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-4">Academics</h3>
                        <div className="space-y-2">
                            <Link href="/academics/curriculum" className="block text-gray-400 hover:text-white transition-colors">Curriculum</Link>
                            <Link href="/school-life/clubs" className="block text-gray-400 hover:text-white transition-colors">Student Clubs</Link>
                            <Link href="/careers" className="block text-gray-400 hover:text-white transition-colors">Career Opportunities</Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
                        <div className="space-y-2">
                            <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors">Contact Us</Link>
                            <Link href="/about/our-team" className="block text-gray-400 hover:text-white transition-colors">Our Team</Link>
                            <Link href="/about/vision-mission" className="block text-gray-400 hover:text-white transition-colors">Vision & Mission</Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>© {new Date().getFullYear()} Vedanga International School. All rights reserved.</p>
                </div>
            </div>
        </footer >
    );
};

export default Footer;
