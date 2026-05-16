"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, MapPin, Globe, Video } from "lucide-react";

const STATS = [
  {
    icon: Users,
    value: 50,
    suffix: "+",
    label: "Workers Deployed Overseas",
    description: "Successfully placed abroad",
  },
  {
    icon: MapPin,
    value: 30,
    suffix: "+",
    label: "Workers Placed in Kuwait",
    description: "Active in the Gulf region",
  },
  {
    icon: Globe,
    value: 6,
    suffix: "+",
    label: "Countries Supported",
    description: "Source nations worldwide",
  },
  {
    icon: Video,
    value: 9,
    suffix: "",
    label: "Worker Testimonials",
    description: "Happy placed workers",
  },
];

function AnimatedCounter({
  target,
  suffix,
  duration = 2000,
  inView,
}: {
  target: number;
  suffix: string;
  duration?: number;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "#0A1628" }}
    >
      {/* Decorative background gradient */}
      <div className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse at center, #1a3a6b 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#D88004]/15 border border-[#D88004]/30 text-[#D88004] text-sm font-semibold mb-6">
            Our Impact
          </span>
          <h2
            className="font-heading font-bold text-white"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
          >
            Numbers That Tell Our Story
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative p-8 rounded-2xl text-center"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(216,128,4,0.2)",
                }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#D88004]/10 mb-6">
                  <Icon className="w-7 h-7 text-[#D88004]" />
                </div>
                <div
                  className="font-heading font-black text-white mb-2"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}
                >
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    inView={inView}
                  />
                </div>
                <div className="font-heading font-semibold text-white/90 text-base mb-1">
                  {stat.label}
                </div>
                <div className="text-white/40 text-sm">{stat.description}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
