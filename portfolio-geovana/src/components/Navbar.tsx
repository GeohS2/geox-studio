"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link"; // Melhor usar Link do Next

const links = [
    { name: "Início", href: "#home" },
    { name: "Serviços", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Sobre", href: "#about" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">

                {/* LOGO DA MARCA */}
                <Link href="/" className="block relative h-8 md:h-10 w-auto hover:opacity-80 transition-opacity">
                    <img 
                        src="/img/logoGEOX.png" // Usando a versão colorida para destaque
                        alt="GEOX Studio" 
                        className="h-full w-auto object-contain"
                    />
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-gray-300 hover:text-white hover:text-primary transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                    <a 
                        href="https://wa.me/5535984431670"
                        target="_blank"
                        className="px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-all flex items-center gap-2"
                    >
                        Fale com a GEOX
                    </a>
                </div>

                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 w-full bg-surface border-b border-white/10 md:hidden p-4 flex flex-col gap-4"
                >
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-gray-300 hover:text-primary block"
                        >
                            {link.name}
                        </a>
                    ))}
                </motion.div>
            )}
        </nav>
    );
}