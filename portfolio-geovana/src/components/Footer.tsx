"use client";

import { motion } from "framer-motion";
import { Mail, Github, Instagram, Linkedin, MessageCircle } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-background relative pt-24 pb-12 px-6 border-t border-white/5 overflow-hidden">

            {/* Efeito de Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto relative z-10 text-center">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                        Vamos criar algo épico?
                    </h2>
                    <p className="text-xl text-gray-400 mb-10">
                        Seja para refazer sua identidade visual ou lançar uma Landing Page que converte,
                        estou pronta para elevar o nível do seu projeto.
                    </p>

                    <a
                        href="https://wa.me/5535984431670?text=Ol%C3%A1%2C%20Geovana!%20Gostaria%20de%20iniciar%20um%20projeto."
                        target="_blank"
                        className="inline-flex items-center gap-2 px-10 py-5 bg-white text-black text-lg font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                    >
                        <MessageCircle className="w-5 h-5" />
                        Chamar no WhatsApp
                    </a>
                </motion.div>

                <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">

                    <div className="text-2xl font-display font-bold text-white">
                        GEOVANA FERNANDES<span className="text-primary">.</span>
                    </div>

                    <div className="flex gap-4">
                        {/* Instagram Design */}
                        <a href="https://www.instagram.com/geofer_design/" target="_blank" title="Instagram Design" className="p-3 rounded-full bg-white/5 hover:bg-white/20 hover:text-primary transition-all text-white">
                            <Instagram className="w-5 h-5" />
                        </a>
                        {/* Instagram Arte */}
                        <a href="https://www.instagram.com/artyunah/" target="_blank" title="Instagram Arte" className="p-3 rounded-full bg-white/5 hover:bg-white/20 hover:text-accent transition-all text-white">
                            <div className="relative">
                                <Instagram className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full" />
                            </div>
                        </a>
                        {/* GitHub */}
                        <a href="https://github.com/GeohS2" target="_blank" className="p-3 rounded-full bg-white/5 hover:bg-white/20 hover:text-white transition-all text-gray-400">
                            <Github className="w-5 h-5" />
                        </a>
                        {/* Email */}
                        <a href="mailto:gfcdm10@gmail.com" className="p-3 rounded-full bg-white/5 hover:bg-white/20 hover:text-white transition-all text-gray-400">
                            <Mail className="w-5 h-5" />
                        </a>
                    </div>

                    <div className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Geovana Fernandes.
                    </div>

                </div>
            </div>
        </footer>
    );
}