"use client";

import { heroSlides } from "@/data/dummy";
import { ChevronLeft, ChevronRight, MoveRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState<"left" | "right">("right");
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    const totalSlides = heroSlides.length;

    // Check mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying || isMobile) return;

        const interval = setInterval(() => {
            setDirection("right");
            setCurrentIndex((prev) => (prev + 1) % totalSlides);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, totalSlides, isMobile]);

    const handleNext = () => {
        setIsAutoPlaying(false);
        setDirection("right");
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
        setTimeout(() => setIsAutoPlaying(true), 5000);
    };

    const handlePrev = () => {
        setIsAutoPlaying(false);
        setDirection("left");
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
        setTimeout(() => setIsAutoPlaying(true), 5000);
    };

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.25,
                ease: [0.22, 1, 0.36, 1],
                when: "beforeChildren"
            }
        }
    };

    const backgroundVariants = {
        enter: (direction: string) => ({
            opacity: 0,
            scale: direction === "right" ? 1.05 : 0.95
        }),
        center: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1.2,
                ease: [0.33, 1, 0.68, 1]
            }
        },
        exit: (direction: string) => ({
            opacity: 0,
            scale: direction === "right" ? 0.95 : 1.05,
            transition: {
                duration: 1.2,
                ease: [0.33, 1, 0.68, 1]
            }
        })
    };

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.3,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    const buttonHover = {
        hover: {
            scale: 1.05,
            transition: { duration: 0.2 }
        },
        tap: {
            scale: 0.95,
            transition: { duration: 0.1 }
        }
    };

    return (
        <section
            className="relative h-screen max-h-[800px] min-h-[600px] overflow-hidden"
            onMouseEnter={() => !isMobile && setIsAutoPlaying(false)}
            onMouseLeave={() => !isMobile && setIsAutoPlaying(true)}
        >
            {/* Animated Background */}
            <AnimatePresence custom={direction} initial={false}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={backgroundVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src={heroSlides[currentIndex].image}
                        alt={heroSlides[currentIndex].title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/30" />
                </motion.div>
            </AnimatePresence>

            {/* Content Container */}
            <div className="relative h-full flex items-center pt-16 lg:pt-0">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-2 items-center">
                        {/* Text Content */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeIn}
                            className="text-white text-center lg:text-left"
                            key={`text-${currentIndex}`}
                        >
                            <motion.p
                                className="text-lg md:text-xl mb-3 text-white/90 leading-relaxed"
                                variants={textVariants}
                            >
                                We provide
                            </motion.p>
                            <motion.h1
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 md:mb-6"
                                variants={textVariants}
                            >
                                {heroSlides[currentIndex].title}
                            </motion.h1>
                            <motion.p
                                className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 text-white/90 leading-relaxed"
                                variants={textVariants}
                            >
                                {heroSlides[currentIndex].subtitle}
                            </motion.p>
                            <motion.div
                                variants={textVariants}
                                className="flex items-center justify-center lg:justify-start"
                            >
                                <motion.div
                                    whileHover={isMobile ? {} : buttonHover.hover}
                                    whileTap={buttonHover.tap}
                                    className="inline-flex"
                                >
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-bold bg-[#da973e] text-white rounded-full hover:shadow-xl transition-all group"
                                >
                                    Contact Us
                                    <ChevronRight className="ml-1 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        {/* Desktop-only Carousel */}
                        {!isMobile && (
                            <div className="relative w-full hidden lg:block">
                                <div className="grid grid-cols-3 gap-6 px-2">
                                    {[currentIndex, (currentIndex + 1) % totalSlides, (currentIndex + 2) % totalSlides].map((idx) => (
                                        <motion.div
                                            key={idx}
                                            className="relative h-80 rounded-xl overflow-hidden cursor-pointer"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                transition: {
                                                    duration: 0.6,
                                                    delay: idx === currentIndex ? 0.4 : 0.2 * (idx % 3)
                                                }
                                            }}
                                            whileHover={{ scale: 0.98 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                                setDirection(idx > currentIndex ? "right" : "left");
                                                setCurrentIndex(idx);
                                            }}
                                        >
                                            <Image
                                                src={heroSlides[idx].image}
                                                alt={heroSlides[idx].title}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                                <h3 className="text-[#fba61e] font-bold text-lg">{heroSlides[idx].title}</h3>
                                            </div>
                                            {idx === currentIndex && (
                                                <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-yellow-400 shadow-md" />
                                            )}
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Desktop Navigation */}
                                <div className="mt-8 px-2 flex items-center gap-4">
                                    <motion.button
                                        onClick={handlePrev}
                                        className="p-2 rounded-full bg-white/10 hover:bg-white/20"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <ChevronLeft className="text-white" size={20} />
                                    </motion.button>
                                    <div className="flex-1 flex items-center gap-2">
                                        <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-[#FB9A1E]"
                                                initial={{ width: "0%" }}
                                                animate={{
                                                    width: `${((currentIndex + 1) / totalSlides) * 100}%`,
                                                    transition: {
                                                        duration: 1.2,
                                                        ease: [0.33, 1, 0.68, 1]
                                                    }
                                                }}
                                            />
                                        </div>
                                        <span className="text-[#FB9A1E] text-3xl font-bold min-w-[40px] text-right">
                                            {currentIndex + 1}
                                        </span>
                                    </div>
                                    <motion.button
                                        onClick={handleNext}
                                        className="p-2 rounded-full bg-white/10 hover:bg-white/20"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <ChevronRight className="text-white" size={20} />
                                    </motion.button>
                                </div>
                            </div>
                        )}

                        {/* Mobile Navigation Arrows */}
                        {isMobile && (
                            <div className="flex justify-center gap-8 mt-6 lg:hidden">
                                <motion.button
                                    onClick={handlePrev}
                                    className="p-3 rounded-full bg-white/10 hover:bg-white/20"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{
                                        scale: 0.9,
                                        transition: { duration: 0.1 }
                                    }}
                                >
                                    <ChevronLeft className="text-white" size={24} />
                                </motion.button>
                                <motion.button
                                    onClick={handleNext}
                                    className="p-3 rounded-full bg-white/10 hover:bg-white/20"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{
                                        scale: 0.9,
                                        transition: { duration: 0.1 }
                                    }}
                                >
                                    <ChevronRight className="text-white" size={24} />
                                </motion.button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Slide Indicator */}
            {isMobile && (
                <motion.div
                    className="absolute bottom-8 left-0 right-0 flex justify-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        transition: { delay: 0.5 }
                    }}
                >
                    {heroSlides.map((_, idx) => (
                        <motion.button
                            key={idx}
                            onClick={() => {
                                setDirection(idx > currentIndex ? "right" : "left");
                                setCurrentIndex(idx);
                            }}
                            className={`w-2 h-2 rounded-full transition-all ${currentIndex === idx ? "bg-[#FB9A1E]" : "bg-white/50"}`}
                            whileHover={{ scale: 1.5 }}
                            whileTap={{ scale: 0.8 }}
                        />
                    ))}
                </motion.div>
            )}
        </section>
    );
};

export default Hero;
