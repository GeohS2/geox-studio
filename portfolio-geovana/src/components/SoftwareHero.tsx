"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";
import Link from "next/link";

export default function SoftwareHero() {
    return (
        <section className="py-24 px-6 relative overflow-hidden">
            {/* Fundo Diferenciado para Destaque */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background z-0" />
            
            <div className="container mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Texto de Venda */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                            <Zap className="w-3 h-3" /> Lançamento Exclusivo
                        </div>
                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
                            A Revolução das <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Gráficas Digitais.</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            Chega de perder horas no CorelDraw. Gere arquivos de impressão perfeitos, com sangria espelhada e marcas de corte em <strong>segundos</strong>. O sistema que as grandes gráficas usam, agora disponível para você.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/software" className="px-8 py-4 bg-white text-black font-bold rounded-full flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                                Ver Software em Ação <ArrowRight className="w-4 h-4" />
                            </Link>
                            <div className="flex items-center gap-4 px-6 py-4 text-sm text-gray-400">
                                <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> Sem Instalação</span>
                                <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> 100% Online</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Showcase do Print (Mockup) */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Efeito de Glow atrás da imagem */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary blur-[100px] opacity-30 rounded-full" />
                        
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-surface/50 backdrop-blur-sm">
                            {/* Header fake do navegador */}
                            <div className="h-8 bg-black/40 border-b border-white/5 flex items-center px-4 gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                                <div className="w-3 h-3 rounded-full bg-green-500/20" />
                            </div>
                            {/* Print do seu sistema */}
                            <img src="/img/image_c53cbd.png" alt="Dashboard Geox Automation" className="w-full h-auto" />
                            
                            {/* Overlay de destaque */}
                            <div className="absolute bottom-6 right-6 bg-surface/90 backdrop-blur border border-white/10 p-4 rounded-xl shadow-lg animate-float">
                                <p className="text-xs text-gray-400 uppercase font-bold">Tempo de Geração</p>
                                <p className="text-2xl font-bold text-green-400 flex items-center gap-1">
                                    0.4s <span className="text-xs text-gray-500 font-normal">/ arquivo</span>
                                </p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}