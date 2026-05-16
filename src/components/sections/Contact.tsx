"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Clock, MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/96550552409";
const EMAIL = "mylene.elite@gmail.com";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const contactCards = [
  {
    icon: <WhatsAppIcon />,
    label: "WhatsApp",
    value: "+965 505 52409",
    hint: "Fastest response — usually within minutes",
    href: WHATSAPP_URL,
    external: true,
    accent: "#25D366",
    cta: "Chat Now",
  },
  {
    icon: <Mail className="w-6 h-6" />,
    label: "Email",
    value: EMAIL,
    hint: "For detailed inquiries and formal requests",
    href: `mailto:${EMAIL}`,
    external: false,
    accent: "#D88004",
    cta: "Send Email",
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "#0A1628" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(216,128,4,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#D88004]/10 border border-[#D88004]/20 text-[#D88004] text-sm font-semibold mb-6">
            Get In Touch
          </span>
          <h2
            className="font-heading font-bold text-white"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
          >
            Ready to Get Started?
          </h2>
          <p className="text-white/60 text-lg mt-4 max-w-xl mx-auto leading-relaxed">
            Whether you&apos;re an employer looking for workers or a candidate
            seeking an opportunity abroad — reach out and we&apos;ll get back to
            you promptly.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {contactCards.map((card, i) => (
            <motion.a
              key={card.label}
              href={card.href}
              target={card.external ? "_blank" : undefined}
              rel={card.external ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl p-8 flex flex-col gap-5 cursor-pointer overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{
                  background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${card.accent}15 0%, transparent 70%)`,
                  border: `1px solid ${card.accent}30`,
                }}
              />

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300"
                style={{
                  background: `${card.accent}15`,
                  border: `1px solid ${card.accent}30`,
                  color: card.accent,
                }}
              >
                {card.icon}
              </div>

              {/* Text */}
              <div className="flex-1">
                <div className="text-white/40 text-xs uppercase tracking-widest mb-1">
                  {card.label}
                </div>
                <div
                  className="font-heading font-semibold text-white text-xl mb-2 break-all group-hover:transition-colors duration-200"
                  style={{ color: "white" }}
                >
                  {card.value}
                </div>
                <div className="flex items-center gap-1.5 text-white/40 text-sm">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  {card.hint}
                </div>
              </div>

              {/* CTA */}
              <div
                className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold self-start transition-all duration-200 group-hover:opacity-90"
                style={{ background: card.accent, color: "#fff" }}
              >
                <MessageCircle className="w-4 h-4" />
                {card.cta}
              </div>
            </motion.a>
          ))}
        </div>

        {/* Response time banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
          style={{
            background: "rgba(216,128,4,0.06)",
            border: "1px solid rgba(216,128,4,0.18)",
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(216,128,4,0.12)" }}
          >
            <Clock className="w-5 h-5 text-[#D88004]" />
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            <span className="text-white font-semibold">Response time:</span>{" "}
            WhatsApp inquiries are answered within minutes during business hours.
            Email responses within 24 hours. For urgent hiring needs, WhatsApp
            is always the fastest route.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
