"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const SOURCE_COUNTRIES = [
  { flag: "🇳🇵", name: "Nepal", role: "Skilled & Semi-skilled Workers" },
  { flag: "🇧🇹", name: "Bhutan", role: "Skilled Workers" },
  { flag: "🇮🇳", name: "India", role: "Technical & Professional Staff" },
  { flag: "🇵🇭", name: "Philippines", role: "Domestic & Healthcare Workers" },
  { flag: "🇰🇪", name: "Kenya", role: "General Workforce" },
  { flag: "🇱🇰", name: "Sri Lanka", role: "Domestic & Industrial Workers" },
];

const DEST_COUNTRIES = [
  { flag: "🇰🇼", name: "Kuwait", role: "Gulf employment hub", highlight: true },
  { flag: "🇭🇷", name: "Croatia", role: "European opportunities" },
  { flag: "🇦🇱", name: "Albania", role: "Balkans workforce" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const destVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export function Countries() {
  return (
    <section id="countries" className="bg-white py-24 lg:py-32">
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
            Global Network
          </span>
          <h2
            className="font-heading font-bold text-[#020202]"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
          >
            Our Global Network
          </h2>
          <p className="text-[#888888] text-lg mt-4 max-w-2xl mx-auto">
            We connect talent from across Asia and Africa to employment
            opportunities in the Middle East and Europe.
          </p>
        </motion.div>

        {/* Flow layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-center">
          {/* Source countries */}
          <div>
            <p className="text-[#888888] text-xs uppercase tracking-widest font-semibold mb-6 text-center lg:text-left">
              Talent Sources
            </p>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-3"
            >
              {SOURCE_COUNTRIES.map((country) => (
                <motion.div
                  key={country.name}
                  variants={itemVariants}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#F5F5F5] border border-transparent hover:border-[#D88004]/30 hover:bg-[#D88004]/5 transition-all duration-200 group"
                >
                  <span className="text-3xl">{country.flag}</span>
                  <div>
                    <div className="font-heading font-semibold text-[#020202] group-hover:text-[#D88004] transition-colors">
                      {country.name}
                    </div>
                    <div className="text-[#888888] text-xs">{country.role}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Arrow / flow indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:flex flex-col items-center gap-4 px-6"
          >
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#D88004] to-transparent" />
            <div className="relative flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-[#D88004] flex items-center justify-center shadow-lg shadow-[#D88004]/30">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
              <div className="text-[#D88004] text-xs font-semibold uppercase tracking-widest text-center">
                Matches
                <br />
                Talent
              </div>
            </div>
            <div className="w-px h-16 bg-gradient-to-b from-[#D88004] via-[#D88004] to-transparent" />
          </motion.div>

          {/* Mobile arrow */}
          <div className="lg:hidden flex justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-[#D88004] flex items-center justify-center shadow-lg shadow-[#D88004]/30 rotate-90">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
              <span className="text-[#D88004] text-xs font-semibold uppercase tracking-widest">
                Placed With
              </span>
            </motion.div>
          </div>

          {/* Destination countries */}
          <div>
            <p className="text-[#888888] text-xs uppercase tracking-widest font-semibold mb-6 text-center lg:text-left">
              Employment Destinations
            </p>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-3"
            >
              {DEST_COUNTRIES.map((country) => (
                <motion.div
                  key={country.name}
                  variants={destVariants}
                  className={`flex items-center gap-4 p-5 rounded-xl border transition-all duration-200 ${
                    country.highlight
                      ? "bg-[#0A1628] border-[#D88004]/30"
                      : "bg-[#F5F5F5] border-transparent hover:border-[#D88004]/30 hover:bg-[#D88004]/5"
                  }`}
                >
                  <span className="text-3xl">{country.flag}</span>
                  <div>
                    <div
                      className={`font-heading font-semibold text-lg ${
                        country.highlight ? "text-white" : "text-[#020202]"
                      }`}
                    >
                      {country.name}
                    </div>
                    <div
                      className={`text-sm ${
                        country.highlight ? "text-[#D88004]" : "text-[#888888]"
                      }`}
                    >
                      {country.role}
                    </div>
                  </div>
                  {country.highlight && (
                    <span className="ml-auto px-3 py-1 rounded-full bg-[#D88004]/20 text-[#D88004] text-xs font-medium">
                      Primary
                    </span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
