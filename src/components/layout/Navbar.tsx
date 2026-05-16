"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Countries", href: "#countries" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

function scrollTo(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A1628]/90 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => scrollTo("#home")}
            className="flex items-center shrink-0"
            aria-label="Go to top"
          >
            <span className="flex items-center px-3 py-1.5 rounded-xl bg-white/95 shadow-md shadow-black/20 backdrop-blur-sm">
              <Image
                src="/logo.png"
                alt="Elite Global Workforce Logo"
                width={140}
                height={56}
                className="h-11 w-auto object-contain"
                priority
              />
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium text-white/80 hover:text-[#D88004] transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => scrollTo("#contact")}
              className="px-5 py-2.5 rounded-lg bg-[#D88004] text-white text-sm font-semibold hover:bg-[#c07003] transition-colors duration-200"
            >
              Hire Workers
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="px-5 py-2.5 rounded-lg border border-[#D88004] text-[#D88004] text-sm font-semibold hover:bg-[#D88004]/10 transition-colors duration-200"
            >
              Apply Now
            </button>
          </div>

          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className="lg:hidden p-2 text-white"
              aria-label="Open navigation menu"
            >
              <Menu size={24} />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[#0A1628] border-l border-[#D88004]/20 w-72"
            >
              <SheetHeader className="pb-4 border-b border-white/10">
                <SheetTitle className="text-white font-heading">
                  Elite Global Workforce
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2 pt-6 px-4">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => {
                      setMobileOpen(false);
                      setTimeout(() => scrollTo(link.href), 150);
                    }}
                    className="text-left py-3 px-4 text-white/80 hover:text-[#D88004] hover:bg-[#D88004]/10 rounded-lg transition-colors duration-200 text-sm font-medium"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
              <div className="flex flex-col gap-3 pt-6 px-4 mt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setTimeout(() => scrollTo("#contact"), 150);
                  }}
                  className="w-full py-3 rounded-lg bg-[#D88004] text-white text-sm font-semibold hover:bg-[#c07003] transition-colors"
                >
                  Hire Workers
                </button>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setTimeout(() => scrollTo("#contact"), 150);
                  }}
                  className="w-full py-3 rounded-lg border border-[#D88004] text-[#D88004] text-sm font-semibold hover:bg-[#D88004]/10 transition-colors"
                >
                  Apply Now
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
