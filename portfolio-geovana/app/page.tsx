// src/app/page.tsx
import Hero from "@/components/Hero";
import SoftwareHero from "@/components/SoftwareHero"; 
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import LiveActivity from "@/components/LiveActivity";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <SoftwareHero />
      <Services />
      <Projects />
      <About />
      <Testimonials />
      <Footer />
      <LiveActivity />
    </main>
  );
}