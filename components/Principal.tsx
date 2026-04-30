'use client'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Principal = () => {
    return (
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Image with decorative elements */}
                    <motion.div
                        className="relative order-2 lg:order-1"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <div className="relative h-[350px] sm:h-[400px] lg:h-[500px] w-full overflow-hidden rounded-lg lg:rounded-xl shadow-lg lg:shadow-2xl">
                            <Image
                                src="/images/ppp.png"
                                alt="Principal"
                                fill
                                className="z-40 object-cover"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                loading='lazy'
                            />
                            <div className="z-50 absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                        </div>
                        <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-[#D41D33]/90 rounded-lg lg:rounded-xl z-10"></div>
                        <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-[#FF981F]/90 rounded-lg lg:rounded-xl z-10"></div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        className="order-1 lg:order-2"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <span className="inline-block px-3 py-1 text-xs sm:text-sm font-semibold text-[#D41D33] bg-[#D41D33]/10 rounded-full mb-4 sm:mb-6">
                            Message
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 lg:mb-8 leading-tight">
                            Message from Our <span className='text-[#D41D33]'>Principal</span>
                        </h2>
                        <div className="prose prose-sm sm:prose-base lg:prose-lg text-gray-600 mb-6 lg:mb-8">
                            <p className="mb-4 sm:mb-6">
                                Welcome to Vedanga International School. As the Principal, it is my privilege to lead an institution that stands at the forefront of educational excellence. Our commitment to providing a world-class education is unwavering.
                            </p>
                            <p>
                                We foster an environment where students are encouraged to explore, innovate, and develop into well-rounded global citizens. Our holistic approach ensures each child reaches their fullest potential.
                            </p>
                        </div>
                        <Link
                            href="/about/principal-message"
                            className="inline-flex items-center px-4 py-2.5 sm:px-5 sm:py-3 border-2 border-[#D41D33] text-xs sm:text-sm hover:text-sm transition-all duration-200 text-[#D41D33] rounded-lg shadow-md hover:shadow-lg font-medium group hover:bg-[#D41D33]/5"
                            aria-label="Read full message from principal"
                        >
                            Read Full Message
                            <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Principal