"use client";

import type { NewsArticle } from "@/types/cms";
import { Calendar, ChevronLeft, ChevronRight, Facebook, Linkedin, Share2, Tag, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function NewsDetail({ article }: { article: NewsArticle }) {
    const pathname = usePathname();
    const [showShareTooltip, setShowShareTooltip] = useState(false);

    const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${pathname}`;
    const shareTitle = article.title;

    const handleShare = async () => {
        try {
            await navigator.share({
                title: shareTitle,
                url: shareUrl
            });
        } catch (err) {
            navigator.clipboard.writeText(shareUrl);
            setShowShareTooltip(true);
            setTimeout(() => setShowShareTooltip(false), 2000);
        }
    };

    const getFormattedDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <nav className="flex mb-8" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2">
                        <li className="inline-flex items-center">
                            <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-[#D41D33] transition-colors">
                                Home
                            </Link>
                        </li>
                        
                        <li>
                            <div className="flex items-center">
                                <ChevronRight className="h-4 w-4 text-gray-400 mx-1" />
                                <Link href="/news" className="ml-1 text-sm text-gray-500 hover:text-[#D41D33] transition-colors md:ml-2">
                                    News
                                </Link>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <ChevronRight className="h-4 w-4 text-gray-400 mx-1" />
                                <span className="ml-1 text-sm font-medium text-[#D41D33] md:ml-2">
                                    {shareTitle}
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>
                <article className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                    {/* Hero Image Section */}
                    <div className="relative h-[50vh] max-h-[600px]">
                        <Image
                            loading="lazy"
                            src={article.image_url}
                            alt={article.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10">
                            <div className="max-w-4xl mx-auto">
                                <div className="flex flex-wrap items-center gap-3 mb-4 text-white">
                                    <span className="px-3 py-1 bg-[#FAA02E] rounded-full text-sm font-medium">
                                        {article.category}
                                    </span>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="h-4 w-4" />
                                        <span>{getFormattedDate(article.published_at || new Date().toISOString())}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <User className="h-4 w-4" />
                                        <span>{article.author}</span>
                                    </div>
                                </div>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                                    {article.title}
                                </h1>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="max-w-4xl mx-auto p-6 sm:p-8 md:p-10">
                        <div
                            className="prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />

                        {/* Tags and Share Section */}
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                                <div className="flex flex-wrap items-center gap-3">
                                    <Tag className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                    <span className="text-gray-500 text-sm">Tags:</span>
                                    <div className="flex flex-wrap gap-2">
                                        {article.tags.map((tag, index) => (
                                            <Link
                                                key={index}
                                                href={`/news?category=${tag.toLowerCase()}`}
                                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-600 transition-colors"
                                            >
                                                {tag}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <button
                                            onClick={handleShare}
                                            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors relative"
                                            aria-label="Share article"
                                        >
                                            <Share2 className="h-5 w-5 text-gray-600" />
                                        </button>
                                        {showShareTooltip && (
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                                Link copied!
                                            </div>
                                        )}
                                    </div>
                                    <span className="text-gray-500 text-sm hidden sm:inline">Share:</span>
                                    <a
                                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                        aria-label="Share on Facebook"
                                    >
                                        <Facebook className="h-5 w-5 text-blue-600" />
                                    </a>
                                    <a
                                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                        aria-label="Share on LinkedIn"
                                    >
                                        <Linkedin className="h-5 w-5 text-blue-700" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
