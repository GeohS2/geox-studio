"use client";

import { motion } from "framer-motion";
import { Palette, Code2, ShoppingBag, Printer, Megaphone, Layout, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
    {
        id: "marketplace", // ID usado para direcionar o cliente
        title: "Kit Marketplace",
        description: "A solução completa para transformar visitantes em compradores na Shopee e Mercado Livre.",
        icon: <ShoppingBag className="w-8 h-8 text-accent" />,
        features: ["Logo Profissional", "Capa para Loja", "Banners Rotativos", "Banner Destaque"],
        gradient: "from-orange-500/10 to-red-500/10",
        border: "group-hover:border-orange-500/50"
    },
    {
        id: "web",
        title: "Landing Pages",
        description: "Páginas de vendas projetadas psicologicamente para converter tráfego em lucro.",
        icon: <Layout className="w-8 h-8 text-secondary" />,
        features: ["Design Persuasivo", "Copywriting Visual", "Alta Velocidade", "Mobile First"],
        gradient: "from-blue-500/10 to-cyan-500/10",
        border: "group-hover:border-secondary/50"
    },
    {
        id: "impressao",
        title: "Pacotes de Impressão",
        description: "Artes em alta resolução prontas para gráfica. Ideal para quadros e faixas decorativas.",
        icon: <Printer className="w-8 h-8 text-green-400" />,
        features: ["Arquivos em PDF/CMYK", "Quadros Decorativos", "Pacotes Mensais", "Alta Resolução"],
        gradient: "from-green-500/10 to-emerald-500/10",
        border: "group-hover:border-green-500/50"
    },
    {
        id: "design",
        title: "Branding & Logotipos",
        description: "Criação de marcas memoráveis que transmitem autoridade e confiança imediata.",
        icon: <Palette className="w-8 h-8 text-purple-400" />,
        features: ["Logotipo Principal", "Paleta de Cores", "Tipografia", "Manual da Marca"],
        gradient: "from-purple-500/10 to-pink-500/10",
        border: "group-hover:border-purple-500/50"
    },
    {
        id: "web",
        title: "Sites Institucionais",
        description: "Sua empresa com endereço fixo na web. Sites robustos para negócios que querem crescer.",
        icon: <Code2 className="w-8 h-8 text-blue-400" />,
        features: ["Multi-páginas", "Painel Administrativo", "Blog Integrado", "SEO Avançado"],
        gradient: "from-indigo-500/10 to-blue-500/10",
        border: "group-hover:border-indigo-500/50"
    },
    {
        id: "design",
        title: "Criativos para Anúncios",
        description: "Imagens focadas em CTR (Clique) para seus anúncios no Facebook, Instagram e Google.",
        icon: <Megaphone className="w-8 h-8 text-yellow-400" />,
        features: ["Foco em Atenção", "Design para Tráfego Pago", "Variações Teste A/B", "Feed/Stories"],
        gradient: "from-yellow-500/10 to-orange-500/10",
        border: "group-hover:border-yellow-500/50"
    }
];

export default function Services() {
    return (
        <section id="services" className="py-24 px-6 bg-background relative">
            <div className="container mx-auto">

                <div className="mb-16 text-center max-w-2xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-primary font-medium tracking-wider text-sm uppercase"
                    >
                        Soluções 360º
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-display font-bold mt-2 mb-4"
                    >
                        Tudo o que sua marca precisa.
                    </motion.h2>
                    <p className="text-gray-400">
                        Do digital ao impresso, entregamos qualidade visual que posiciona sua marca no topo.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <Link key={index} href={`/contratar?service=${service.id}`} className="block h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`group relative p-8 rounded-3xl border border-white/5 bg-surface hover:bg-white/5 transition-all duration-500 overflow-hidden h-full flex flex-col ${service.border}`}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                                        {service.icon}
                                    </div>

                                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">{service.title}</h3>
                                    <p className="text-gray-400 mb-6 text-sm leading-relaxed flex-grow">
                                        {service.description}
                                    </p>

                                    <ul className="space-y-2 mb-6">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-2 text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
                                                <div className="w-1 h-1 rounded-full bg-primary" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-auto flex items-center gap-2 text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                        Contratar Agora <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}