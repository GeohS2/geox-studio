"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, ShieldCheck, Zap, Cpu, CreditCard, ChevronRight, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// --- CONFIGURAÇÃO DOS PLANOS ---
const PLANS = [
    {
        id: "starter",
        name: "Pré-Pago (Start)",
        price: "50",
        period: "único",
        credits: "200 Créditos",
        features: ["R$ 0,25 por arte", "Sem validade", "Sangria Automática", "Suporte Básico"],
        highlight: false,
        btn: "Comprar Créditos"
    },
    {
        id: "basic",
        name: "Plano Basic",
        price: "199",
        period: "/mês",
        credits: "1.500 Gerações",
        features: ["R$ 0,13 por arte", "Painel de Gestão", "Prioridade na Fila", "Atualizações Grátis"],
        highlight: true,
        btn: "Assinar Basic"
    },
    {
        id: "pro",
        name: "GEOX PRO",
        price: "399",
        period: "/mês",
        credits: "ILIMITADO",
        features: ["Custo ZERO por arte", "Etiqueta de Envio (Em breve)", "Múltiplos Usuários", "Suporte WhatsApp VIP"],
        highlight: false,
        btn: "Assinar PRO"
    }
];

export default function SoftwarePage() {
    const [selectedPlan, setSelectedPlan] = useState<any>(null);
    const [step, setStep] = useState(1); // 1: Form, 2: Pagamento, 3: Sucesso
    const [formData, setFormData] = useState({ name: "", email: "", whatsapp: "" });

    // Função para abrir o checkout
    const openCheckout = (plan: any) => {
        setSelectedPlan(plan);
        setStep(1);
        // Travar scroll do body
        document.body.style.overflow = "hidden";
    };

    const closeCheckout = () => {
        setSelectedPlan(null);
        document.body.style.overflow = "auto";
    };

    const handlePayment = () => {
        // Simulação de processamento
        setStep(3);
        
        // Montar mensagem WhatsApp
        const msg = `Olá! Quero contratar o *${selectedPlan.name}* (R$ ${selectedPlan.price}).%0A%0A*Meus Dados:*%0ANome: ${formData.name}%0AEmail: ${formData.email}%0A%0AAguardo liberação do acesso.`;
        
        // Redirecionar após 2s
        setTimeout(() => {
            window.open(`https://wa.me/5535984431670?text=${msg}`, "_blank");
        }, 1500);
    };

    return (
        <main className="bg-background min-h-screen">
            <Navbar />
            
            {/* HERO SECTION */}
            <section className="pt-40 pb-20 px-6 text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
                
                <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
                    Automação para <br />
                    <span className="text-primary">Gráficas Modernas</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                    O software que elimina o trabalho manual do designer. Focado em Quadros Decorativos, Placas e Adesivos.
                </p>

                {/* IMAGEM PRINCIPAL DO SISTEMA */}
                <div className="container mx-auto max-w-5xl relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-30"></div>
                    <img 
                        src="/img/image_c53cbd.png" 
                        alt="Interface do Software" 
                        className="relative rounded-2xl border border-white/10 shadow-2xl w-full"
                    />
                </div>
            </section>

            {/* FEATURES GRID */}
            <section className="py-20 px-6 bg-surface/50 border-y border-white/5">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Por que usar o GEOX Automation?</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Sangria Espelhada", desc: "Cria bordas espelhadas automaticamente para quadros chassi.", icon: <Cpu className="text-purple-400"/> },
                            { title: "Corte Inteligente", desc: "Detecta múltiplos itens em um único print e separa.", icon: <Zap className="text-yellow-400"/> },
                            { title: "Economia Real", desc: "Reduz seu custo de R$ 0,70 para centavos por arte.", icon: <ShieldCheck className="text-green-400"/> },
                        ].map((feat, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/50 transition-all">
                                <div className="w-12 h-12 rounded-xl bg-black/40 flex items-center justify-center mb-4 text-primary">
                                    {feat.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{feat.title}</h3>
                                <p className="text-gray-400 text-sm">{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PRICING SECTION */}
            <section id="planos" className="py-24 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-display font-bold mb-4">Planos Flexíveis</h2>
                        <p className="text-gray-400">Escolha o poder de processamento da sua gráfica.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                        {PLANS.map((plan) => (
                            <div 
                                key={plan.id}
                                className={`relative p-8 rounded-3xl border flex flex-col h-full transition-all duration-300 ${
                                    plan.highlight 
                                    ? "bg-surface border-primary shadow-[0_0_40px_-10px_rgba(124,58,237,0.3)] scale-105 z-10" 
                                    : "bg-surface/50 border-white/10 hover:border-white/30"
                                }`}
                            >
                                {plan.highlight && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                                        Mais Popular
                                    </div>
                                )}

                                <h3 className="text-lg font-bold text-gray-300 uppercase tracking-widest mb-2">{plan.name}</h3>
                                <div className="mb-6">
                                    <span className="text-4xl font-display font-bold text-white">R$ {plan.price}</span>
                                    <span className="text-sm text-gray-500">{plan.period}</span>
                                </div>

                                <div className="bg-white/5 rounded-xl p-4 mb-8 text-center border border-white/5">
                                    <p className="text-sm text-gray-400 mb-1">Capacidade</p>
                                    <p className="text-xl font-bold text-white">{plan.credits}</p>
                                </div>

                                <ul className="space-y-4 mb-8 flex-1">
                                    {plan.features.map((feat, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                                                <Check className="w-3 h-3 text-green-500" />
                                            </div>
                                            {feat}
                                        </li>
                                    ))}
                                </ul>

                                <button 
                                    onClick={() => openCheckout(plan)}
                                    className={`w-full py-4 rounded-xl font-bold transition-all ${
                                        plan.highlight 
                                        ? "bg-primary text-white hover:bg-primary/90" 
                                        : "bg-white text-black hover:bg-gray-200"
                                    }`}
                                >
                                    {plan.btn}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />

            {/* --- CHECKOUT MODAL (Sistema de Pagamento Simulado) --- */}
            {selectedPlan && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#0f172a] w-full max-w-lg rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header Modal */}
                        <div className="p-6 border-b border-white/10 bg-white/5 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">Checkout Seguro</h3>
                                    <p className="text-xs text-gray-400">Ambiente Criptografado</p>
                                </div>
                            </div>
                            <button onClick={closeCheckout} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Corpo do Modal */}
                        <div className="p-8">
                            
                            {/* Resumo do Pedido */}
                            <div className="flex justify-between items-center bg-black/30 p-4 rounded-xl mb-6 border border-white/5">
                                <div>
                                    <p className="text-sm text-gray-400">Plano Selecionado</p>
                                    <p className="font-bold text-white text-lg">{selectedPlan.name}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-primary text-xl">R$ {selectedPlan.price}</p>
                                    <p className="text-xs text-gray-500">{selectedPlan.period}</p>
                                </div>
                            </div>

                            {/* STEP 1: DADOS */}
                            {step === 1 && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Nome Completo</label>
                                        <input 
                                            type="text" 
                                            placeholder="Ex: João Silva" 
                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-primary outline-none"
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold uppercase text-gray-500 mb-1 block">E-mail (Será seu login)</label>
                                        <input 
                                            type="email" 
                                            placeholder="Ex: joao@grafica.com" 
                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-primary outline-none"
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        />
                                    </div>
                                    <button 
                                        onClick={() => setStep(2)}
                                        disabled={!formData.name || !formData.email}
                                        className="w-full bg-primary text-white font-bold py-4 rounded-xl mt-4 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                                    >
                                        Ir para Pagamento <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            )}

                            {/* STEP 2: PAGAMENTO FAKE (INTEGRAÇÃO PREPARADA) */}
                            {step === 2 && (
                                <div className="space-y-4">
                                    <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl mb-4">
                                        <p className="text-sm text-green-400 font-bold mb-1">Método de Pagamento</p>
                                        <p className="text-xs text-gray-400">Por enquanto, a ativação é feita via Pix/WhatsApp para segurança.</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mb-6">
                                        <button className="p-4 border border-primary bg-primary/10 rounded-xl flex flex-col items-center gap-2 text-primary font-bold">
                                            <Zap className="w-6 h-6" /> Pix
                                        </button>
                                        <button className="p-4 border border-white/10 bg-white/5 rounded-xl flex flex-col items-center gap-2 text-gray-400 hover:bg-white/10 transition-colors">
                                            <CreditCard className="w-6 h-6" /> Cartão
                                        </button>
                                    </div>

                                    <button 
                                        onClick={handlePayment}
                                        className="w-full bg-green-500 text-white font-bold py-4 rounded-xl hover:bg-green-400 transition-all shadow-[0_0_20px_-5px_rgba(34,197,94,0.4)]"
                                    >
                                        Pagar e Ativar Agora
                                    </button>
                                    <button onClick={() => setStep(1)} className="w-full text-center text-sm text-gray-500 mt-2 hover:text-white">Voltar</button>
                                </div>
                            )}

                            {/* STEP 3: LOADING / SUCESSO */}
                            {step === 3 && (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-white">Processando...</h3>
                                    <p className="text-gray-400 text-sm mt-2">Estamos gerando sua chave de acesso.</p>
                                    <p className="text-gray-500 text-xs mt-1">Você será redirecionado para o WhatsApp.</p>
                                </div>
                            )}

                        </div>
                    </motion.div>
                </div>
            )}
        </main>
    );
}