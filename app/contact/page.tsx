"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, PhoneCall, Facebook, Instagram, Twitter, Music } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import Link from "next/link";
import dynamic from "next/dynamic";
import { submitContactSubmission } from "@/lib/cms-api";

const contactFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  message: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const MapSection = dynamic(() => import('@/components/MapSection'), { ssr: false });

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const toastId = toast.loading("Sending your message...");
      await submitContactSubmission({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        message: data.message,
      });
      toast.success("Message sent successfully!", {
        id: toastId,
        description: "We'll get back to you soon",
      });
      reset();
    } catch (error) {
      toast.error("Failed to send message", {
        description: error instanceof Error ? error.message : "Please try again later",
      });
    }
  };

  const socialLinks = [
    { icon: Facebook, name: "Facebook", url: "https://www.facebook.com/vedangaInternationalschool" },
    { icon: Instagram, name: "Instagram", url: "https://www.instagram.com/vedangainternational" },
    { icon: Twitter, name: "Twitter", url: "https://twitter.com/vedanga" },
    { icon: Music, name: "TikTok", url: "https://www.tiktok.com/@vedanga.internati" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8 md:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#D41D33] mb-3 lg:mb-4">
            Contact Us
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base lg:text-lg">
            Have questions? We&apos;d love to hear from you. Send us a message
            and we&apos;ll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {/* Left side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 md:space-y-8"
          >
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-4 md:mb-6">
                Contact Information
              </h2>
              <div className="space-y-5 md:space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 flex items-start gap-4">
                    <div className="p-3 bg-[#D41D33]/10 rounded-lg text-[#D41D33]">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Phone</h3>
                      <p className="text-gray-600 mt-1">+977 015372578</p>
                    </div>
                  </div>
                  <Link
                    href="tel:+977984-1777518"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-[#D41D33] hover:bg-[#b31828] text-white rounded-lg transition-colors"
                  >
                    <PhoneCall className="h-4 w-4" />
                    <span className="text-sm">Call Now</span>
                  </Link>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 flex items-start gap-4">
                    <div className="p-3 bg-[#D41D33]/10 rounded-lg text-[#D41D33]">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Email</h3>
                      <p className="text-gray-600 mt-1">info@vedanga.edu.np
                      </p>
                    </div>
                  </div>
                  <Link
                    href="mailto:info@vedanga.edu.np"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-[#D41D33] hover:bg-[#b31828] text-white rounded-lg transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">Email Now</span>
                  </Link>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#D41D33]/10 rounded-lg text-[#D41D33]">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Office Hours</h3>
                    <p className="text-gray-600 mt-1">Monday - Friday: 8:00 AM - 4:00 PM</p>
                    <p className="text-gray-600">Saturday: 8:00 AM - 12:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 overflow-hidden">
              <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-4 md:mb-6">
                Our Socials
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors overflow-hidden"
                  >
                    <div className="flex-shrink-0 p-2 bg-[#D41D33]/10 rounded-lg text-[#D41D33]">
                      <social.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-medium text-gray-800 truncate">{social.name}</h3>
                      <p className="text-gray-600 text-sm mt-1 truncate">
                        {social.url.replace('https://', '')}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 h-full">
              <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-4 md:mb-6">
                Get in Touch
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 md:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      {...register("firstName")}
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D41D33] focus:border-transparent"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      {...register("lastName")}
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D41D33] focus:border-transparent"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D41D33] focus:border-transparent"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone <span className="text-red-600">*</span>
                  </label>
                  <input
                    {...register("phone")}
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D41D33] focus:border-transparent"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D41D33] focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#D41D33] hover:bg-[#b31828] text-white rounded-lg transition-colors disabled:opacity-70"
                >
                  <Send className="h-5 w-5" />
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 md:mt-12 lg:mt-16 bg-white rounded-xl shadow-md overflow-hidden h-64 sm:h-80 lg:h-96">
          <MapSection />
        </div>
      </div>
    </div>
  );
}
