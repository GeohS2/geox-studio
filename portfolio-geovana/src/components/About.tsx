"use client";

import { motion } from "framer-motion";
import { Award, Users, TrendingUp, MonitorPlay } from "lucide-react";

export default function About() {
    return (
        <section id="about" className="py-24 px-6 bg-surface border-t border-white/5 relative overflow-hidden">

            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* FOTO DA FOUNDER */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative order-2 lg:order-1"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-[2rem] blur-2xl opacity-20 transform -rotate-3" />
                        
                        <div className="relative aspect-[3/4] md:aspect-square rounded-[2rem] overflow-hidden border border-white/10 bg-background/50 group">
                            <img
                                src="/img/perfil.jpeg" // Sua foto na pasta public/img
                                alt="Geovana Fernandes - Founder GEOX"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            
                            <div className="absolute bottom-6 left-6 p-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl">
                                <p className="text-xs text-primary font-bold uppercase tracking-wider mb-1">Founder & Lead Creative</p>
                                <p className="text-white font-display text-lg">Geovana Fernandes</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* TEXTO INSTITUCIONAL DA MARCA */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="order-1 lg:order-2"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-[2px] bg-primary"></div>
                            <span className="text-gray-400 text-sm uppercase tracking-widest">
                                The GEOX Vision
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
                            Onde o Design estratégico encontra a <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                                Tecnologia de Ponta.
                            </span>
                        </h2>

                        <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                            A <strong>GEOX</strong> é um estúdio criativo que une design autoral e desenvolvimento web
                            para criar soluções visuais e digitais completas — do primeiro impacto visual à conversão final.
                        </p>

                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            Atuamos com artes para marketplaces, anúncios, identidade visual, materiais para impressão,
                            landing pages e sites modernos. Não entregamos apenas estética ou código:
                            criamos experiências pensadas para comunicar, vender e posicionar marcas.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-colors">
                                <MonitorPlay className="w-6 h-6 text-primary mb-2" />
                                <h4 className="font-bold text-white mb-1">Soluções Digitais Completas</h4>
                                <p className="text-xs text-gray-400">
                                    Artes, branding, landing pages e sites.
                                </p>
                            </div>

                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-colors">
                                <TrendingUp className="w-6 h-6 text-accent mb-2" />
                                <h4 className="font-bold text-white mb-1">Design que Converte</h4>
                                <p className="text-xs text-gray-400">
                                    Foco em vendas, posicionamento e resultado.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}