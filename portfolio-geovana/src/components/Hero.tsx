"use client";

import { motion } from "framer-motion";
import { ArrowRight, MousePointer2 } from "lucide-react"; // Importe MousePointer2
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20">

            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] glow-primary rounded-full blur-3xl opacity-40" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] glow-secondary rounded-full blur-3xl opacity-40" />

            <div className="container mx-auto z-10 text-center flex flex-col items-center">

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm"
                >
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm text-gray-300 font-medium">GEOX Studio: Agenda Aberta 2026</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-6 tracking-tight"
                >
                    Elevando Marcas com <br />
                    <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        Design & Code High-End.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed"
                >
                    Somos um estúdio digital especializado em identidade visual para E-commerce e Landing Pages de alta performance.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
                >
                    <Link 
                            href="/contratar"
                            className="px-8 py-4 bg-white text-black font-bold rounded-full flex items-center justify-center gap-2 hover:bg-gray-200 transition-all transform hover:scale-105"
                        >
                            Iniciar Projeto
                        <ArrowRight className="w-4 h-4" />
                    </Link>

                    <a href="#portfolio" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-full flex items-center justify-center gap-2 hover:bg-white/10 transition-all backdrop-blur-sm">
                        <MousePointer2 className="w-4 h-4" />
                        Explorar Portfolio
                    </a>
                </motion.div>

            </div>
        </section>
    );
}