"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Users,
  Search,
  FileCheck,
  Plane,
  Star,
  Link,
  BookOpen,
} from "lucide-react";

const EMPLOYER_SERVICES = [
  {
    icon: Briefcase,
    title: "Overseas Manpower Sourcing",
    desc: "We source qualified workers from Nepal, India, Philippines, Bhutan, Kenya, and Sri Lanka for your specific requirements.",
  },
  {
    icon: Users,
    title: "Local Kuwait Staffing",
    desc: "Direct placement services for employers already operating in Kuwait who need additional workforce support.",
  },
  {
    icon: Search,
    title: "Candidate Screening",
    desc: "Rigorous background checks, skill assessments, and medical testing to deliver only the most qualified candidates.",
  },
  {
    icon: FileCheck,
    title: "Visa & Deployment Coordination",
    desc: "End-to-end documentation support: visas, work permits, travel arrangements, and onboarding assistance.",
  },
];

const APPLICANT_SERVICES = [
  {
    icon: Plane,
    title: "Job Placement Abroad",
    desc: "Access legitimate job opportunities in Kuwait, Croatia, and Albania with verified, ethical employers.",
  },
  {
    icon: Star,
    title: "Career Matching",
    desc: "We match your skills and experience with the right employer and role — not just any open position.",
  },
  {
    icon: Link,
    title: "Employer Connection",
    desc: "We connect you directly with our verified network of employers, bypassing unreliable third-party agents.",
  },
  {
    icon: BookOpen,
    title: "Recruitment Process Guidance",
    desc: "Step-by-step guidance through every stage: application, interviews, documentation, and pre-departure orientation.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function ServiceCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="flex gap-4 p-5 rounded-xl hover:bg-[#D88004]/5 transition-colors duration-200"
    >
      <div className="shrink-0 w-10 h-10 rounded-lg bg-[#D88004]/10 flex items-center justify-center mt-0.5">
        <Icon className="w-5 h-5 text-[#D88004]" />
      </div>
      <div>
        <h4 className="font-heading font-semibold text-[#020202] mb-1.5">
          {title}
        </h4>
        <p className="text-[#888888] text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="bg-[#F5F5F5] py-24 lg:py-32">
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
            Our Services
          </span>
          <h2
            className="font-heading font-bold text-[#020202]"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
          >
            What We Offer
          </h2>
          <p className="text-[#888888] text-lg mt-4 max-w-2xl mx-auto">
            Comprehensive recruitment solutions for both employers seeking
            talent and workers seeking opportunity abroad.
          </p>
        </motion.div>

        {/* Two column cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* For Employers */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="bg-white rounded-3xl overflow-hidden shadow-sm"
            style={{ borderTop: "4px solid #D88004" }}
          >
            <div className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[#D88004] flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[#020202] text-xl">
                    For Employers
                  </h3>
                  <p className="text-[#888888] text-sm">
                    Hire qualified international workers
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {EMPLOYER_SERVICES.map((s) => (
                  <ServiceCard key={s.title} {...s} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* For Applicants */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="bg-white rounded-3xl overflow-hidden shadow-sm"
            style={{ borderTop: "4px solid #D88004" }}
          >
            <div className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[#0A1628] flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[#020202] text-xl">
                    For Applicants
                  </h3>
                  <p className="text-[#888888] text-sm">
                    Find trusted employment abroad
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {APPLICANT_SERVICES.map((s) => (
                  <ServiceCard key={s.title} {...s} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
