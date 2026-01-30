import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials"; // Novo
import LiveActivity from "@/components/LiveActivity"; // Novo

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <div id="home">
        <Hero />
      </div>
      
      {/* Elemento Flutuante de Atividade (aparece em cima de tudo) */}
      <LiveActivity />

      <Services />
      <Projects />
      <About />
      <Testimonials /> {/* Seção de Prova Social */}
      <Footer />
      
    </main>
  );
}