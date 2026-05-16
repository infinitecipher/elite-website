import Image from "next/image";

function InfiniteCipherWordmark() {
  return (
    <svg
      width="160"
      height="32"
      viewBox="0 0 400 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="InfiniteCipher"
    >
      {/* IC mark */}
      <polygon points="16,10 58,10 70,22 70,70 16,70" stroke="#F1EFE8" strokeWidth="2" strokeLinejoin="round" fill="none"/>
      <line x1="27" y1="29" x2="44" y2="29" stroke="#F1EFE8" strokeWidth="2" strokeLinecap="round"/>
      <line x1="35" y1="29" x2="35" y2="52" stroke="#F1EFE8" strokeWidth="2" strokeLinecap="round"/>
      <line x1="27" y1="52" x2="44" y2="52" stroke="#F1EFE8" strokeWidth="2" strokeLinecap="round"/>
      <path d="M 57 33 C 65 33 69 37 69 40 C 69 43 65 47 57 47" stroke="#AFA9EC" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <circle cx="68" cy="22" r="3.5" fill="#AFA9EC"/>
      {/* Divider */}
      <line x1="86" y1="18" x2="86" y2="62" stroke="#3a3a3a" strokeWidth="0.75"/>
      {/* Wordmark */}
      <text x="100" y="48" fontFamily="Georgia, 'Times New Roman', serif" fontSize="28" fontWeight="400" letterSpacing="-0.5" fill="#F1EFE8">Infinite</text>
      <text x="244" y="48" fontFamily="'Courier New', Courier, monospace" fontSize="18" fontWeight="700" letterSpacing="5" fill="#AFA9EC">CIPHER</text>
    </svg>
  );
}

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Countries", href: "#countries" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="bg-[#020202] border-t-4 border-[#D88004]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <span className="inline-flex items-center px-3 py-1.5 rounded-xl bg-white/95 shadow-md shadow-black/30 w-fit">
              <Image
                src="/logo.png"
                alt="Elite Global Workforce"
                width={160}
                height={64}
                className="h-11 w-auto object-contain"
              />
            </span>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              International Recruitment Agency connecting skilled talent from
              Asia &amp; Africa to trusted employers worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#D88004] font-heading font-semibold text-sm uppercase tracking-wider mb-6">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-[#D88004] text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#D88004] font-heading font-semibold text-sm uppercase tracking-wider mb-6">
              Get In Touch
            </h3>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:mylene.elite@gmail.com"
                className="flex items-center gap-3 text-white/60 hover:text-[#D88004] text-sm transition-colors duration-200"
              >
                <span className="text-[#D88004]">Email:</span>
                mylene.elite@gmail.com
              </a>
              <a
                href="https://wa.me/96550552409"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/60 hover:text-[#D88004] text-sm transition-colors duration-200"
              >
                <span className="text-[#D88004]">WhatsApp:</span>
                +965 505 52409
              </a>
              <div className="flex flex-col gap-2 mt-2">
                <span className="text-white/60 text-sm">Serving:</span>
                <div className="flex flex-wrap gap-2">
                  {["Kuwait", "Croatia", "Albania"].map((c) => (
                    <span
                      key={c}
                      className="px-3 py-1 rounded-full bg-[#D88004]/10 border border-[#D88004]/30 text-[#D88004] text-xs font-medium"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm text-center sm:text-left">
            &copy; 2023&ndash;2026 Elite Global Workforce. All rights reserved.
          </p>
          <a
            href="https://www.infinitecipher.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 leading-none opacity-70 hover:opacity-100 transition-opacity duration-200"
          >
            <span className="text-white/30 text-xs whitespace-nowrap">Developed by</span>
            <div className="flex items-center" style={{ marginTop: "-1px" }}>
              <InfiniteCipherWordmark />
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
}
