"use client";

import { motion } from "framer-motion";
import { Palette, Code2, ShoppingBag, LayoutTemplate, Paintbrush, Rocket } from "lucide-react";

const services = [
    {
        title: "Design Gráfico & E-commerce",
        description: "Identidade visual que destaca sua marca no Mercado Livre, Shopee e Redes Sociais.",
        icon: <Palette className="w-8 h-8 text-accent" />,
        features: ["Banners para Shopee/ML", "Identidade Visual Completa", "Artes para Redes Sociais", "Material para Impressão"],
        gradient: "from-purple-900/20 to-blue-900/20",
        border: "group-hover:border-accent/50"
    },
    {
        title: "Landing Pages & Front-end",
        description: "Páginas de alta conversão desenvolvidas com código limpo e foco em vendas.",
        icon: <Code2 className="w-8 h-8 text-secondary" />,
        features: ["Landing Pages de Alta Conversão", "Sites Institucionais", "Otimização de SEO", "Performance Extrema"],
        gradient: "from-blue-900/20 to-cyan-900/20",
        border: "group-hover:border-secondary/50"
    }
];

export default function Services() {
    return (
        <section id="services" className="py-24 px-6 bg-background relative">
            <div className="container mx-auto">

                {/* Cabeçalho da Seção */}
                <div className="mb-16 text-center max-w-2xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-primary font-medium tracking-wider text-sm uppercase"
                    >
                        Especialidades
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-display font-bold mt-2 mb-4"
                    >
                        Design Criativo + Tecnologia
                    </motion.h2>
                    <p className="text-gray-400">
                        A combinação perfeita para elevar o nível do seu negócio digital.
                    </p>
                </div>

                {/* Grid de Serviços */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className={`group relative p-8 rounded-3xl border border-white/5 bg-surface hover:bg-white/5 transition-all duration-500 overflow-hidden ${service.border}`}
                        >
                            {/* Efeito de Gradiente no Fundo */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                                    {service.icon}
                                </div>

                                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                                <p className="text-gray-400 mb-8 leading-relaxed">
                                    {service.description}
                                </p>

                                <ul className="space-y-3">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}