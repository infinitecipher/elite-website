import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Stats } from "@/components/sections/Stats";
import { Services } from "@/components/sections/Services";
import { Countries } from "@/components/sections/Countries";
import { WhyUs } from "@/components/sections/WhyUs";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <Services />
        <Countries />
        <WhyUs />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
