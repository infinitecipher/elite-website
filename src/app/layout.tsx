import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const BASE_URL = "https://eliteglobalworkforce.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  // ── Title ──────────────────────────────────────────────────────────────────
  title: {
    default: "Elite Global Workforce | International Manpower & Recruitment Agency",
    template: "%s | Elite Global Workforce",
  },

  // ── Description ────────────────────────────────────────────────────────────
  description:
    "Elite Global Workforce is a licensed international manpower and recruitment agency established in 2023. We connect skilled workers from Nepal, India, Philippines, Bhutan, Kenya and Sri Lanka with employers in Kuwait, Croatia and Albania. 50+ workers successfully deployed overseas.",

  // ── Keywords (long-tail, geo-specific) ────────────────────────────────────
  keywords: [
    "manpower agency Kuwait",
    "international recruitment agency",
    "overseas job placement",
    "Kuwait manpower recruitment",
    "Nepal workers Kuwait",
    "Philippines workers abroad",
    "India manpower export",
    "Sri Lanka overseas jobs",
    "Kenya workers Kuwait",
    "Bhutan overseas employment",
    "Croatia work visa workers",
    "Albania manpower agency",
    "licensed recruitment agency",
    "construction workers Kuwait",
    "domestic workers Kuwait",
    "hospitality workers recruitment",
    "logistics manpower agency",
    "overseas employment agency",
    "ethical recruitment agency",
    "international manpower supply",
    "skilled workers overseas",
    "unskilled workers placement",
    "Elite Global Workforce",
    "eliteglobalworkforce.com",
  ],

  // ── Canonical & alternates ────────────────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-US": BASE_URL,
      "en-KW": BASE_URL,
    },
  },

  // ── Authors & category ────────────────────────────────────────────────────
  authors: [{ name: "Elite Global Workforce", url: BASE_URL }],
  creator: "Elite Global Workforce",
  publisher: "Elite Global Workforce",
  category: "Recruitment & Staffing",
  classification: "Business / Employment Agency",

  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_KW"],
    url: BASE_URL,
    siteName: "Elite Global Workforce",
    title: "Elite Global Workforce | International Manpower & Recruitment Agency",
    description:
      "Licensed international manpower and recruitment agency connecting skilled talent from Asia & Africa to employers in Kuwait, Croatia and Albania. 50+ workers deployed. Established 2023.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Elite Global Workforce — International Recruitment Agency",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X ──────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@EliteGlobalWF",
    title: "Elite Global Workforce | International Manpower & Recruitment Agency",
    description:
      "Connecting skilled workers from Asia & Africa to trusted employers in Kuwait, Croatia and Albania. Licensed agency. Ethical recruitment.",
    images: [{ url: "/og-image.png", alt: "Elite Global Workforce" }],
  },

  // ── Favicons ─────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.ico",               sizes: "any" },
      { url: "/favicon-16x16.png",         sizes: "16x16",  type: "image/png" },
      { url: "/favicon-32x32.png",         sizes: "32x32",  type: "image/png" },
      { url: "/favicon-48x48.png",         sizes: "48x48",  type: "image/png" },
      { url: "/android-chrome-192x192.png",sizes: "192x192",type: "image/png" },
      { url: "/android-chrome-512x512.png",sizes: "512x512",type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },

  // ── PWA manifest ─────────────────────────────────────────────────────────
  manifest: "/site.webmanifest",

  // ── Robots ────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Verification placeholders (add keys when available) ──────────────────
  verification: {
    // google: "your-google-site-verification-token",
    // yandex: "your-yandex-verification-token",
  },
};

// ── JSON-LD structured data ───────────────────────────────────────────────────

const employmentAgencySchema = {
  "@context": "https://schema.org",
  "@type": ["EmploymentAgency", "LocalBusiness"],
  "@id": `${BASE_URL}/#organization`,
  name: "Elite Global Workforce",
  alternateName: "Elite Global Workforce International Recruitment",
  description:
    "Licensed international manpower and recruitment agency established in 2023, connecting skilled workers from Asia and Africa to employers in Kuwait, Croatia and Albania.",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/logo.png`,
    width: 979,
    height: 394,
  },
  image: `${BASE_URL}/og-image.png`,
  telephone: "+96550552409",
  email: "mylene.elite@gmail.com",
  foundingDate: "2023",
  currenciesAccepted: "KWD, USD",
  address: {
    "@type": "PostalAddress",
    addressCountry: "KW",
    addressLocality: "Kuwait City",
    addressRegion: "Al Asimah",
  },
  areaServed: [
    { "@type": "Country", name: "Kuwait",  sameAs: "https://www.wikidata.org/wiki/Q817" },
    { "@type": "Country", name: "Croatia", sameAs: "https://www.wikidata.org/wiki/Q224" },
    { "@type": "Country", name: "Albania", sameAs: "https://www.wikidata.org/wiki/Q222" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Recruitment Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Overseas Manpower Sourcing",
          description: "End-to-end manpower sourcing from Nepal, India, Philippines, Bhutan, Kenya and Sri Lanka.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Local Kuwait Staffing",
          description: "Recruitment and placement of workers for companies operating in Kuwait.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Candidate Screening & Visa Coordination",
          description: "Full candidate screening, documentation, and visa and deployment coordination.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Overseas Job Placement",
          description: "Connecting qualified applicants from Asia and Africa with verified overseas employers.",
        },
      },
    ],
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+96550552409",
      contactType: "customer service",
      contactOption: "TollFree",
      availableLanguage: ["English", "Arabic"],
    },
    {
      "@type": "ContactPoint",
      email: "mylene.elite@gmail.com",
      contactType: "customer support",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "47",
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  url: BASE_URL,
  name: "Elite Global Workforce",
  description: "International Manpower & Recruitment Agency",
  publisher: { "@id": `${BASE_URL}/#organization` },
  inLanguage: "en-US",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",     item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Services", item: `${BASE_URL}/#services` },
    { "@type": "ListItem", position: 3, name: "Countries",item: `${BASE_URL}/#countries` },
    { "@type": "ListItem", position: 4, name: "Contact",  item: `${BASE_URL}/#contact` },
  ],
};

// ── Root layout ───────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} h-full`}>
      <head>
        {/* Theme & format */}
        <meta name="theme-color" content="#D88004" />
        <meta name="color-scheme" content="dark light" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />

        {/* Geo meta — helps Kuwait/MENA local SEO */}
        <meta name="geo.region" content="KW" />
        <meta name="geo.placename" content="Kuwait City, Kuwait" />
        <meta name="geo.position" content="29.3759;47.9774" />
        <meta name="ICBM" content="29.3759, 47.9774" />

        {/* Business classification */}
        <meta name="classification" content="Business, Employment, Recruitment" />
        <meta name="category" content="Recruitment Agency" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="30 days" />
        <meta name="language" content="English" />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(employmentAgencySchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
