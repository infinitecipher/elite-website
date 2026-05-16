"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";

const VIDEOS = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  src: `/videos/testimonial-${i + 1}.mp4`,
  label: `Worker Testimonial #${i + 1}`,
}));

function VideoCard({ video }: { video: (typeof VIDEOS)[0] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div
      className="shrink-0 w-72 sm:w-80 rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(216,128,4,0.15)",
      }}
    >
      <div className="relative aspect-[9/16] bg-[#071020] group">
        <video
          ref={videoRef}
          src={video.src}
          preload="none"
          controls={playing}
          playsInline
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          className="w-full h-full object-cover"
          aria-label={video.label}
        />
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <button
              onClick={handlePlay}
              className="w-16 h-16 rounded-full bg-[#D88004] flex items-center justify-center shadow-xl shadow-[#D88004]/30 hover:bg-[#c07003] hover:scale-105 active:scale-95 transition-all duration-200"
              aria-label={`Play ${video.label}`}
            >
              <Play className="w-7 h-7 text-white fill-white ml-1" />
            </button>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="font-heading font-semibold text-white text-sm">
          {video.label}
        </p>
        <p className="text-white/40 text-xs mt-1">
          Placed worker experience
        </p>
      </div>
    </div>
  );
}

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (amount: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "#0A1628" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#D88004]/15 border border-[#D88004]/30 text-[#D88004] text-sm font-semibold mb-6">
              Success Stories
            </span>
            <h2
              className="font-heading font-bold text-white"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
            >
              Hear From Our Placed Workers
            </h2>
            <p className="text-white/60 text-base mt-3 max-w-xl">
              Real stories from workers we&apos;ve successfully placed in
              Kuwait and beyond.
            </p>
          </div>

          {/* Scroll controls */}
          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => scrollBy(-340)}
              className="w-11 h-11 rounded-full bg-white/5 border border-white/10 hover:bg-[#D88004]/20 hover:border-[#D88004]/40 flex items-center justify-center text-white transition-all duration-200"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollBy(340)}
              className="w-11 h-11 rounded-full bg-white/5 border border-white/10 hover:bg-[#D88004]/20 hover:border-[#D88004]/40 flex items-center justify-center text-white transition-all duration-200"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>

        {/* Horizontal scroll carousel */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {VIDEOS.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              style={{ scrollSnapAlign: "start" }}
            >
              <VideoCard video={video} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
