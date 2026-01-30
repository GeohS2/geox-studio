"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        name: "Ricardo Silva",
        role: "E-commerce Shopee",
        text: "A Geovana transformou minha loja. As artes ficaram incríveis e minhas vendas aumentaram 30% na primeira semana.",
        stars: 5
    },
    {
        name: "Ana Clara",
        role: "Infoprodutora",
        text: "Precisava de uma Landing Page urgente e ela entregou antes do prazo, com um design super moderno. Recomendo demais!",
        stars: 5
    },
    {
        name: "Marcos V.",
        role: "Vendedor Mercado Livre",
        text: "Profissionalismo raro de encontrar. O entendimento dela sobre o que converte em vendas faz toda a diferença.",
        stars: 5
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 px-6 bg-background relative overflow-hidden">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">O que dizem meus clientes</h2>
                    <p className="text-gray-400">Feedback real de quem já transformou seu negócio comigo.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-surface border border-white/5 p-8 rounded-3xl relative hover:border-primary/30 transition-all duration-300"
                        >
                            <Quote className="absolute top-8 right-8 w-10 h-10 text-white/5 rotate-180" />

                            <div className="flex gap-1 mb-6">
                                {[...Array(item.stars)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                ))}
                            </div>

                            <p className="text-gray-300 mb-6 leading-relaxed">"{item.text}"</p>

                            <div>
                                <p className="font-bold text-white">{item.name}</p>
                                <p className="text-xs text-primary">{item.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}