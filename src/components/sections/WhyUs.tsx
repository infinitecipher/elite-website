"use client";

import { motion } from "framer-motion";
import { Globe, Zap, BadgeCheck, Search, Network } from "lucide-react";

const REASONS = [
  {
    icon: Globe,
    title: "Trusted Recruitment Network",
    desc: "Built on trust and integrity since 2023, our reputation is our greatest asset. We maintain long-term relationships with both employers and workers.",
  },
  {
    icon: Zap,
    title: "Fast Deployment Process",
    desc: "Our streamlined process gets qualified workers deployed quickly — reducing time-to-hire and minimizing operational disruption for employers.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Employers Only",
    desc: "We partner exclusively with verified, legitimate employers. Every job offer we facilitate is from a company that has passed our thorough vetting process.",
  },
  {
    icon: Search,
    title: "Transparent Hiring Process",
    desc: "No hidden fees. No surprise terms. Every aspect of the recruitment process is disclosed clearly to applicants and employers from day one.",
  },
  {
    icon: Network,
    title: "International Reach",
    desc: "Operating across Asia, Africa, the Middle East, and Europe — we have the geographic breadth to source the right talent for every requirement.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export function WhyUs() {
  return (
    <section
      id="why-us"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #0A1628 0%, #071020 100%)",
      }}
    >
      {/* Decorative top-right glow */}
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-10 rounded-full blur-3xl"
        style={{ background: "#D88004" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#D88004]/15 border border-[#D88004]/30 text-[#D88004] text-sm font-semibold mb-6">
            Why Choose Us
          </span>
          <h2
            className="font-heading font-bold text-white"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
          >
            Why Elite Global Workforce?
          </h2>
          <p className="text-white/60 text-lg mt-4 max-w-2xl mx-auto">
            We are more than a recruitment agency — we are a bridge to better
            futures for both workers and the businesses that need them.
          </p>
        </motion.div>

        {/* Reason cards — 2-col on desktop, stacked on mobile */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {REASONS.map((reason, i) => {
            const Icon = reason.icon;
            const isLast = i === REASONS.length - 1;
            return (
              <motion.div
                key={reason.title}
                variants={itemVariants}
                className={`flex gap-5 p-7 rounded-2xl transition-all duration-300 hover:border-[#D88004]/40 ${
                  isLast ? "md:col-span-2 md:max-w-lg md:mx-auto" : ""
                }`}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-[#D88004]/15 flex items-center justify-center border border-[#D88004]/20">
                  <Icon className="w-6 h-6 text-[#D88004]" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-white text-lg mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
