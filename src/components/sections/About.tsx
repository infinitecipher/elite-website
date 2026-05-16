"use client";

import { motion } from "framer-motion";
import { Shield, BadgeCheck, Eye } from "lucide-react";

const BADGES = [
  {
    icon: Shield,
    title: "Ethical Recruitment",
    desc: "We follow international ethical recruitment standards — no hidden fees, no deception, no exploitation.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Employers",
    desc: "Every employer we partner with is thoroughly vetted to ensure safe, legal, and fair work conditions.",
  },
  {
    icon: Eye,
    title: "Transparent Process",
    desc: "From application to deployment, every step is communicated clearly to workers and employers alike.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function About() {
  return (
    <section id="about" className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={itemVariants}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#D88004]/10 text-[#D88004] text-sm font-semibold mb-6">
                About Us
              </span>
              <h2 className="font-heading font-bold text-[#020202] leading-tight mb-6"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}>
                Your Trusted Partner in{" "}
                <span className="text-[#D88004]">Global Recruitment</span>
              </h2>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-[#888888] text-lg leading-relaxed mb-6"
            >
              Established in 2023, Elite Global Workforce is a licensed
              international manpower and recruitment agency committed to ethical,
              transparent, and professional hiring practices.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-[#888888] text-lg leading-relaxed mb-6"
            >
              We bridge the gap between skilled talent from Asia and Africa and
              employers in Kuwait, Croatia, and Albania — creating meaningful
              employment opportunities that benefit both workers and businesses.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-[#888888] text-lg leading-relaxed"
            >
              Our ethical placement process ensures long-term employment
              matching — protecting workers&apos; rights and satisfying
              employers&apos; operational needs with qualified, motivated
              candidates.
            </motion.p>
          </motion.div>

          {/* Badges column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-6"
          >
            {BADGES.map((badge) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.title}
                  variants={itemVariants}
                  className="flex gap-5 p-6 rounded-2xl bg-[#F5F5F5] border-l-4 border-[#D88004] hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-[#D88004]/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#D88004]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-[#020202] text-lg mb-2">
                      {badge.title}
                    </h3>
                    <p className="text-[#888888] text-sm leading-relaxed">
                      {badge.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
