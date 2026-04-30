"use client";

import { getPhaseTwoCollections } from "@/lib/cms-api";
import type { GalleryImageItem } from "@/types/cms";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const GalleryDisplay = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImageItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await getPhaseTwoCollections();
      setGalleryImages(data.galleryImages);
    };

    void load();
  }, []);

  const visibleImages =
    galleryImages.length > 0
      ? [
          galleryImages[(currentIndex - 1 + galleryImages.length) % galleryImages.length],
          galleryImages[currentIndex],
          galleryImages[(currentIndex + 1) % galleryImages.length],
        ]
      : [];

  const navigateImage = (dir: "prev" | "next") => {
    setDirection(dir === "prev" ? "left" : "right");
    setIsZoomed(false);

    if (dir === "prev") {
      setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    } else {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }
  };

  const openImage = (id: number) => {
    const index = galleryImages.findIndex((img) => img.id === id);
    setCurrentIndex(index);
    setSelectedImage(id);
    setIsZoomed(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = galleryImages[currentIndex].image_url;
    link.download = `image-${galleryImages[currentIndex].id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: galleryImages[currentIndex].title,
        text: galleryImages[currentIndex].description,
        url: window.location.href,
      });
    } catch {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      switch (e.key) {
        case "ArrowLeft":
          navigateImage("prev");
          break;
        case "ArrowRight":
          navigateImage("next");
          break;
        case "Escape":
          setSelectedImage(null);
          setIsZoomed(false);
          break;
        case "z":
        case "Z":
          setIsZoomed(!isZoomed);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, isZoomed, currentIndex, galleryImages.length]);

  if (galleryImages.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-14 lg:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 text-sm font-semibold text-[#D41D33] bg-[#D41D33]/10 rounded-full mb-4">
            School Life
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-[#D41D33]">Gallery</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore moments that capture the spirit of our school community
          </p>
        </motion.div>

        <div className="relative h-full md:h-[540px] w-full overflow-hidden">
          <button
            onClick={() => navigateImage("prev")}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <ChevronLeft className="md:h-6 md:w-6 h-5 w-5 text-[#D41D33]" />
          </button>
          <button
            onClick={() => navigateImage("next")}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <ChevronRight className="md:h-6 md:w-6 h-5 w-5 text-[#D41D33]" />
          </button>

          <div className="relative h-96 md:h-full w-full flex items-center justify-center">
            <AnimatePresence custom={direction} initial={false}>
              {visibleImages.map((image, index) => (
                <motion.div
                  key={`${image.id}-${currentIndex}`}
                  className={`absolute flex items-center justify-center ${index === 1 ? "z-10" : "z-0"}`}
                  style={{
                    width: index === 1 ? "60%" : "25%",
                    height: index === 1 ? "80%" : "60%",
                    left: index === 0 ? "10%" : index === 2 ? "65%" : "20%",
                    transform: "translateX(-50%)",
                  }}
                  custom={direction}
                  initial={{
                    x: index === 0 ? "-100%" : index === 2 ? "100%" : "0%",
                    opacity: index === 1 ? 1 : 0.5,
                    scale: index === 1 ? 1 : 0.8,
                  }}
                  animate={{
                    x: "0%",
                    opacity: index === 1 ? 1 : 0.5,
                    scale: index === 1 ? 1 : 0.9,
                    filter: index === 1 ? "none" : "brightness(0.7)",
                  }}
                  exit={{
                    x: direction === "right" ? "-100%" : "100%",
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{ duration: 0.5 }}
                  onClick={() => openImage(image.id)}
                >
                  <div
                    className={`relative w-96 h-64 md:w-full md:h-full bg-white rounded-xl shadow-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                      index === 1 ? "ring-2 ring-[#FB9B1E]" : ""
                    }`}
                  >
                    <Image
                      src={image.image_url}
                      alt={image.title}
                      fill
                      className="object-cover"
                      priority={index === 1}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-center my-4 gap-2">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === index ? "bg-[#D41D33] w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsZoomed(false)}
            >
              <div className="relative max-w-6xl w-full max-h-screen">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(null);
                    setIsZoomed(false);
                  }}
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
                >
                  <X className="h-8 w-8" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage("prev");
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/30 hover:bg-white/50 rounded-full transition-colors z-10"
                >
                  <ChevronLeft className="h-8 w-8 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage("next");
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/30 hover:bg-white/50 rounded-full transition-colors z-10"
                >
                  <ChevronRight className="h-8 w-8 text-white" />
                </button>

                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare();
                    }}
                    className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                  >
                    <Share2 className="h-5 w-5 text-gray-800" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload();
                    }}
                    className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                  >
                    <Download className="h-5 w-5 text-gray-800" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsZoomed(!isZoomed);
                    }}
                    className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                  >
                    {isZoomed ? (
                      <ZoomOut className="h-5 w-5 text-gray-800" />
                    ) : (
                      <ZoomIn className="h-5 w-5 text-gray-800" />
                    )}
                  </button>
                </div>

                <motion.div
                  className="relative w-full h-full"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={`overflow-auto ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}>
                    <Image
                      src={galleryImages[currentIndex].image_url}
                      alt={galleryImages[currentIndex].title}
                      width={1200}
                      height={800}
                      className={`mx-auto ${
                        isZoomed ? "w-auto h-auto max-w-none" : "w-full h-auto max-h-[80vh] object-contain"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsZoomed(!isZoomed);
                      }}
                    />
                  </div>

                  <div className="mt-4 text-white text-center">
                    <p className="text-sm text-gray-400 mt-2">
                      {currentIndex + 1} of {galleryImages.length}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GalleryDisplay;
