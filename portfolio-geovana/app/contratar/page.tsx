"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, CreditCard, ArrowRight, ArrowLeft, Send, Lock, Calculator, AlertCircle, Palette, Monitor } from "lucide-react";
import Link from "next/link";

// --- CONFIGURAÇÕES DE SEGURANÇA E DADOS ---
// Chave Pix Aleatória (EVP) para proteger seus dados pessoais
const PIX_KEY = "4cf3f27c-e6d5-49fa-a89b-e20c3cb42c97"; 
const PIX_NAME = "Geovana Fernandes";
const LINK_CARTAO_BASE = "https://link.mercadopago.com.br/seulink"; // Cole seu link real do MP aqui

// --- TABELA DE PREÇOS (BASE) ---
const PRICING = {
    design: { base: 150, label: "Pacote de Design" }, 
    web: { base: 600, label: "Desenvolvimento Web" } 
};

export default function Contratar() {
    const [step, setStep] = useState(1);
    const [service, setService] = useState<"design" | "web" | null>(null);

    // Estado para armazenar respostas e custos extras
    const [answers, setAnswers] = useState<any>({});
    const [extraCost, setExtraCost] = useState(0);

    const [copied, setCopied] = useState(false);
    const [confirmedPay, setConfirmedPay] = useState(false);

    // --- CÁLCULO DO ORÇAMENTO EM TEMPO REAL ---
    const totalValue = useMemo(() => {
        if (!service) return 0;
        return PRICING[service].base + extraCost;
    }, [service, extraCost]);

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    // Função inteligente para lidar com respostas que alteram o preço
    const handleSelection = (key: string, value: string, cost = 0) => {
        setAnswers({ ...answers, [key]: value });
        if (cost > 0) {
            setExtraCost(prev => prev + cost);
        }
    };

    const copyPix = () => {
        navigator.clipboard.writeText(PIX_KEY);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const finishOrder = () => {
        if (!confirmedPay) return;

        const text = `
*SOLICITAÇÃO DE PROJETO APROVADA* ✅
--------------------------------
*Serviço:* ${service === 'design' ? 'Design Gráfico' : 'Landing Page'}
*Valor Estimado:* R$ ${totalValue},00
--------------------------------
*DETALHES DO PROJETO:*
${Object.entries(answers).map(([key, val]) => `• ${key}: ${val}`).join('\n')}
--------------------------------
*STATUS:* Pagamento realizado via Pix/Cartão.
*AÇÃO:* Enviando comprovante abaixo.
    `;

        // Abre WhatsApp com a mensagem pronta
        const url = `https://wa.me/5535984431670?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank");
    };

    return (
        <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">

            {/* Background Decorativo Suave */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />

            <div className="w-full max-w-3xl bg-surface border border-white/10 rounded-3xl p-8 md:p-12 relative z-10 shadow-2xl">

                {/* Header (Visível apenas após escolher o serviço) */}
                {step > 1 && (
                    <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
                        <div>
                            <h1 className="font-display font-bold text-xl md:text-2xl">Configuração do Projeto</h1>
                            <p className="text-xs text-gray-400">Etapa {step} de 3</p>
                        </div>
                        {service && (
                            <div className="text-right">
                                <p className="text-xs text-gray-400 uppercase">Investimento Estimado</p>
                                <p className="text-2xl font-bold text-primary">R$ {totalValue},00</p>
                            </div>
                        )}
                    </div>
                )}

                <AnimatePresence mode="wait">

                    {/* ETAPA 1: Escolha do Serviço (NOVO DESIGN VISUAL) */}
                    {step === 1 && (
                        <motion.div 
                            key="step1" 
                            initial={{ opacity: 0, scale: 0.95 }} 
                            animate={{ opacity: 1, scale: 1 }} 
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <div className="text-center mb-10">
                                <span className="text-primary text-xs font-bold tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                                    Início
                                </span>
                                <h2 className="text-3xl md:text-4xl font-display font-bold mt-4 mb-3 text-white">
                                    Vamos tirar sua ideia do papel?
                                </h2>
                                <p className="text-gray-400 max-w-lg mx-auto">
                                    Selecione a categoria abaixo para que nossa inteligência gere um orçamento e prazo estimados para você.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                
                                {/* Card Design */}
                                <button 
                                    onClick={() => { setService("design"); setExtraCost(0); nextStep(); }} 
                                    className="group relative p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent hover:border-primary/50 hover:from-primary/5 hover:to-primary/0 transition-all duration-300 text-left overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Palette className="w-24 h-24 text-primary rotate-12" />
                                    </div>
                                    
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                                            <Palette className="w-6 h-6" />
                                        </div>
                                        
                                        <h3 className="text-2xl font-bold text-white mb-2">Design Visual</h3>
                                        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                                            Identidade visual, posts para redes sociais, banners e materiais gráficos que vendem.
                                        </p>
                                        
                                        <div className="flex items-center justify-between border-t border-white/10 pt-4">
                                            <span className="text-xs text-gray-500 uppercase font-medium">Investimento inicial</span>
                                            <span className="text-primary font-bold">R$ 150,00</span>
                                        </div>
                                    </div>
                                </button>

                                {/* Card Web */}
                                <button 
                                    onClick={() => { setService("web"); setExtraCost(0); nextStep(); }} 
                                    className="group relative p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent hover:border-secondary/50 hover:from-secondary/5 hover:to-secondary/0 transition-all duration-300 text-left overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Monitor className="w-24 h-24 text-secondary -rotate-12" />
                                    </div>
                                    
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mb-6 text-secondary group-hover:scale-110 transition-transform">
                                            <Monitor className="w-6 h-6" />
                                        </div>
                                        
                                        <h3 className="text-2xl font-bold text-white mb-2">Landing Page</h3>
                                        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                                            Páginas de alta conversão, sites institucionais rápidos e otimizados para vendas.
                                        </p>
                                        
                                        <div className="flex items-center justify-between border-t border-white/10 pt-4">
                                            <span className="text-xs text-gray-500 uppercase font-medium">Investimento inicial</span>
                                            <span className="text-secondary font-bold">R$ 600,00</span>
                                        </div>
                                    </div>
                                </button>

                            </div>
                            
                            <div className="mt-10 text-center">
                                <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">
                                    ← Cancelar e voltar ao início
                                </Link>
                            </div>
                        </motion.div>
                    )}

                    {/* ETAPA 2: Configuração do Orçamento (Perguntas que mudam o preço) */}
                    {step === 2 && service && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <h2 className="text-2xl font-bold mb-2">Personalize seu Pacote</h2>
                            <p className="text-gray-400 mb-6">Selecione as opções para ajustarmos o orçamento final.</p>

                            <div className="space-y-6 mb-8">

                                {/* Pergunta 1: Urgência */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-3">Qual a urgência do projeto?</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => handleSelection("Prazo", "Normal (5-7 dias)", 0)}
                                            className={`p-3 rounded-lg border text-sm ${answers["Prazo"]?.includes("Normal") ? "border-primary bg-primary/10 text-white" : "border-white/10 bg-black/20 text-gray-400"}`}
                                        >
                                            Prazo Normal
                                        </button>
                                        <button
                                            onClick={() => handleSelection("Prazo", "Urgente (2-3 dias)", 100)} // Adiciona R$ 100
                                            className={`p-3 rounded-lg border text-sm ${answers["Prazo"]?.includes("Urgente") ? "border-primary bg-primary/10 text-white" : "border-white/10 bg-black/20 text-gray-400"}`}
                                        >
                                            Urgência (+R$ 100)
                                        </button>
                                    </div>
                                </div>

                                {/* Pergunta 2: Específica por Serviço */}
                                {service === 'web' ? (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-3">Você já tem Domínio e Hospedagem?</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button onClick={() => handleSelection("Infraestrutura", "Sim, já tenho", 0)} className={`p-3 rounded-lg border text-sm ${answers["Infraestrutura"]?.includes("Sim") ? "border-primary bg-primary/10 text-white" : "border-white/10 bg-black/20 text-gray-400"}`}>Sim, já tenho</button>
                                            <button onClick={() => handleSelection("Infraestrutura", "Não, preciso de ajuda", 50)} className={`p-3 rounded-lg border text-sm ${answers["Infraestrutura"]?.includes("Não") ? "border-primary bg-primary/10 text-white" : "border-white/10 bg-black/20 text-gray-400"}`}>Não (+R$ 50)</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-3">Tipo de Arte</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button onClick={() => handleSelection("Tipo", "Artes para Redes Sociais", 0)} className={`p-3 rounded-lg border text-sm ${answers["Tipo"]?.includes("Redes") ? "border-primary bg-primary/10 text-white" : "border-white/10 bg-black/20 text-gray-400"}`}>Social Media</button>
                                            <button onClick={() => handleSelection("Tipo", "Identidade Visual Completa", 200)} className={`p-3 rounded-lg border text-sm ${answers["Tipo"]?.includes("Identidade") ? "border-primary bg-primary/10 text-white" : "border-white/10 bg-black/20 text-gray-400"}`}>Identidade Visual (+R$ 200)</button>
                                        </div>
                                    </div>
                                )}

                                {/* Campo Aberto: Objetivo */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Descreva brevemente o objetivo:</label>
                                    <input
                                        type="text"
                                        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                        placeholder="Ex: Aumentar vendas, lançar curso..."
                                        onChange={(e) => handleSelection("Objetivo", e.target.value)}
                                    />
                                </div>

                            </div>

                            <div className="flex justify-between pt-4 border-t border-white/5">
                                <button onClick={prevStep} className="px-6 py-3 text-gray-400 hover:text-white flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> Voltar</button>
                                <button onClick={nextStep} className="px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/80 flex items-center gap-2 shadow-lg shadow-primary/20">
                                    Aprovar Orçamento <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* ETAPA 3: Checkout Seguro */}
                    {step === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center">

                            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl mb-8 flex items-start gap-3 text-left">
                                <Calculator className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                                <div>
                                    <p className="text-green-400 font-bold text-sm">Orçamento Aprovado</p>
                                    <p className="text-gray-300 text-sm">O valor total do serviço ficou em <strong className="text-white">R$ {totalValue},00</strong>. Para iniciar, realize o pagamento abaixo.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                {/* Opção PIX */}
                                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                                    <p className="font-bold mb-4">Pagamento via Pix</p>
                                    <div className="bg-white p-2 rounded-lg w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                                        <img src="/pix-qr.jpg" alt="QR Code Pix" className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex items-center gap-2 bg-black/40 p-2 rounded-lg border border-white/10">
                                        <span className="font-mono text-xs text-gray-400 truncate flex-1">{PIX_KEY}</span>
                                        <button onClick={copyPix} className="text-primary hover:text-white transition-colors">
                                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Opção Cartão */}
                                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-center">
                                    <p className="font-bold mb-4">Cartão de Crédito</p>
                                    <p className="text-xs text-gray-400 mb-6">Parcele em até 12x via Mercado Pago (Ambiente Seguro).</p>
                                    <a
                                        href={LINK_CARTAO_BASE}
                                        target="_blank"
                                        className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all"
                                    >
                                        <CreditCard className="w-4 h-4" />
                                        Pagar R$ {totalValue}
                                    </a>
                                </div>
                            </div>

                            {/* Trava de Segurança */}
                            <div
                                className="flex items-start gap-3 text-left bg-surface p-4 rounded-xl border border-white/10 mb-6 cursor-pointer hover:bg-white/5 transition-colors"
                                onClick={() => setConfirmedPay(!confirmedPay)}
                            >
                                <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0 ${confirmedPay ? "bg-green-500 border-green-500" : "border-gray-500"}`}>
                                    {confirmedPay && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <p className="text-xs text-gray-400 select-none">
                                    Confirmo que realizei o pagamento do valor acordado e estou ciente que o prazo conta a partir do envio do comprovante.
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <button onClick={prevStep} className="px-4 py-4 rounded-xl border border-white/10 hover:bg-white/5 text-gray-400">
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={finishOrder}
                                    disabled={!confirmedPay}
                                    className={`flex-1 py-4 font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg ${confirmedPay
                                            ? "bg-green-600 hover:bg-green-500 text-white cursor-pointer hover:shadow-green-500/20"
                                            : "bg-gray-800 text-gray-500 cursor-not-allowed"
                                        }`}
                                >
                                    <Send className="w-5 h-5" />
                                    {confirmedPay ? "Enviar Comprovante no WhatsApp" : "Aguardando Confirmação..."}
                                </button>
                            </div>

                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </main>
    );
}