"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Eye, Layers } from "lucide-react";

const categories = ["Todos", "Landing Pages", "Design & Social"];

// Mapeamento das imagens reais da pasta public/img
const projects = [
  {
    id: 1,
    title: "Landing Page High-End",
    category: "Landing Pages",
    image: "/img/landingPage1.png", // Imagem real
    description: "Página de alta conversão com estética neon e dark mode."
  },
  {
    id: 2,
    title: "Identidade Visual Shopee",
    category: "Design & Social",
    image: "/img/PackBannerShopee1.png", // Imagem real
    description: "Kit completo de banners para loja oficial na Shopee."
  },
  {
    id: 3,
    title: "Minimalist Interior Design",
    category: "Landing Pages",
    image: "/img/landingPage2.png", // Imagem real
    description: "Layout limpo e sofisticado para setor de arquitetura/decoração."
  },
  {
    id: 4,
    title: "Campanha Promocional",
    category: "Design & Social",
    image: "/img/DesignsDiversos.png", // Imagem real
    description: "Criativos focados em CTR para anúncios de redes sociais."
  },
  {
    id: 5,
    title: "Página de Vendas Info",
    category: "Landing Pages",
    image: "/img/landingPage4.png", // Imagem real
    description: "Estrutura persuasiva mobile-first para infoprodutos."
  },
  {
    id: 6,
    title: "Pack Gold E-commerce",
    category: "Design & Social",
    image: "/img/PackBannerShopee3.png", // Imagem real
    description: "Design premium para destacar produtos de alto ticket."
  }
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredProjects = projects.filter(project => 
    activeCategory === "Todos" ? true : project.category === activeCategory
  );

  return (
    <section id="portfolio" className="py-24 px-6 bg-background relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="text-primary font-medium tracking-wider text-sm uppercase flex items-center gap-2">
              <Layers className="w-4 h-4" /> Portfolio GEOX
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mt-2">Obras Selecionadas</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeCategory === cat 
                    ? "bg-white text-black border-white" 
                    : "bg-transparent text-gray-400 border-white/10 hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border border-white/5 bg-surface"
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <span className="text-accent text-xs font-bold uppercase tracking-wider mb-1 block">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-300 text-xs line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}