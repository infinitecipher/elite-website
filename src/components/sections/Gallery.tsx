"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

const IMAGES = [
  { src: "/images/gallery-1.jpg", alt: "Elite Global Workforce team operations" },
  { src: "/images/gallery-2.jpg", alt: "Recruitment and placement process" },
  { src: "/images/gallery-3.jpg", alt: "Skilled workers ready for deployment" },
  { src: "/images/gallery-4.jpg", alt: "International workforce operations" },
];

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + IMAGES.length) % IMAGES.length : 0));
  const next = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % IMAGES.length : 0));

  return (
    <section id="gallery" className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#D88004]/10 text-[#D88004] text-sm font-semibold mb-6">
            Our Gallery
          </span>
          <h2
            className="font-heading font-bold text-[#020202]"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
          >
            Our Team &amp; Operations
          </h2>
          <p className="text-[#888888] text-lg mt-4 max-w-xl mx-auto">
            A look at how we work behind the scenes to connect talent with
            opportunity.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {IMAGES.map((img, index) => (
            <motion.button
              key={img.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => openLightbox(index)}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer bg-[#F5F5F5] block w-full"
              aria-label={`View ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-[#0A1628]/0 group-hover:bg-[#0A1628]/40 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 rounded-full bg-[#D88004] flex items-center justify-center shadow-lg">
                  <ZoomIn className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X size={20} />
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xl transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous image"
          >
            &#8249;
          </button>

          {/* Image */}
          <div
            className="relative w-full max-w-4xl mx-8 aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={IMAGES[lightboxIndex].src}
              alt={IMAGES[lightboxIndex].alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Next */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xl transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next image"
          >
            &#8250;
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {lightboxIndex + 1} / {IMAGES.length}
          </div>
        </div>
      )}
    </section>
  );
}
