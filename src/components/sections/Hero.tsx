"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Globe = dynamic(
  () => import("@/components/Globe").then((m) => m.Globe),
  { ssr: false }
);

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0A1628 0%, #0D1F3C 60%, #071020 100%)",
        minHeight: "100svh",
      }}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(216,128,4,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(216,128,4,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── DESKTOP layout (lg+): side by side ──────────────────────────── */}
      <div className="hidden lg:flex items-center min-h-screen max-w-7xl mx-auto px-8 gap-8">
        {/* Text — left half */}
        <div className="flex-1 py-32 pt-36 max-w-2xl">
          <TextContent />
        </div>
        {/* Globe — right half */}
        <div className="flex-1 h-[600px]">
          <Globe />
        </div>
      </div>

      {/* ── MOBILE layout (<lg): stacked ────────────────────────────────── */}
      <div className="lg:hidden flex flex-col pt-28 pb-10 px-4 sm:px-6">
        {/* Text */}
        <div className="mb-6">
          <TextContent />
        </div>
        {/* Globe — full width, fixed height so it's clearly visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full rounded-2xl overflow-hidden"
          style={{ height: "340px" }}
        >
          <Globe />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors"
        aria-label="Scroll to next section"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </motion.button>
    </section>
  );
}

function TextContent() {
  return (
    <>
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D88004]/15 border border-[#D88004]/30 mb-6"
      >
        <span className="w-2 h-2 rounded-full bg-[#D88004] animate-pulse" />
        <span className="text-[#D88004] text-sm font-medium">
          Licensed International Recruitment Agency
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-heading font-bold text-white leading-tight mb-5"
        style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
      >
        Connecting Global Talent{" "}
        <span className="text-[#D88004]">with Opportunity</span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 max-w-xl"
      >
        Elite Global Workforce provides trusted manpower recruitment from
        Asia &amp; Africa to Kuwait, Croatia, and Albania.
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="flex flex-wrap gap-3"
      >
        <button
          onClick={() => scrollTo("contact")}
          className="px-6 py-3.5 rounded-xl bg-[#D88004] text-white font-semibold hover:bg-[#c07003] active:scale-95 transition-all duration-200 shadow-lg shadow-[#D88004]/25 text-sm sm:text-base"
        >
          Apply for a Job
        </button>
        <button
          onClick={() => scrollTo("contact")}
          className="px-6 py-3.5 rounded-xl border-2 border-white/40 text-white font-semibold hover:border-white/80 hover:bg-white/5 active:scale-95 transition-all duration-200 text-sm sm:text-base"
        >
          Hire Workers
        </button>
        <a
          href="https://wa.me/96550552409"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3.5 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#1ebe5b] active:scale-95 transition-all duration-200 shadow-lg shadow-[#25D366]/25 flex items-center gap-2 text-sm sm:text-base"
        >
          <WhatsAppIcon />
          WhatsApp Us
        </a>
      </motion.div>

      {/* Trust indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-white/10"
      >
        {[
          { value: "50+", label: "Workers Deployed" },
          { value: "6+",  label: "Countries Served" },
          { value: "Est. 2023", label: "Licensed Agency" },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <div className="text-xl sm:text-2xl font-heading font-bold text-[#D88004]">
              {item.value}
            </div>
            <div className="text-white/50 text-xs mt-0.5">{item.label}</div>
          </div>
        ))}
      </motion.div>
    </>
  );
}
