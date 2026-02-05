"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Check, Copy, CreditCard, ArrowRight, ArrowLeft, Send, 
    ShoppingBag, Printer, Globe, Palette, Star, ChevronLeft, ChevronRight, Home 
} from "lucide-react";
import Link from "next/link";

// --- CONFIGURAÇÕES GERAIS ---
const PIX_KEY = "4cf3f27c-e6d5-49fa-a89b-e20c3cb42c97"; 
const LINK_CARTAO_BASE = "https://link.mercadopago.com.br/seulink"; 

// --- TIPAGEM ---
interface PricingPackage {
    id: string;
    title: string;
    price: number;
    desc: string;
    popular: boolean;
    highlight?: boolean;
    images?: string[]; // Array de imagens para o carrossel
}

// --- BANCO DE DADOS DE PACOTES E IMAGENS ---
const PRICING_OPTIONS: Record<string, PricingPackage[]> = {
    marketplace: [
        { 
            id: "kit-shopee", 
            title: "Kit Personalização Completa", 
            price: 200, 
            desc: "O essencial para vender: Logo + Capa + 3 Banners Rotativos + Destaques.",
            popular: true,
            images: ["/img/PackBannerShopee1.png", "/img/PackBannerShopee2.png", "/img/PackBannerShopee3.png"]
        },
        { 
            id: "logo-avulsa", 
            title: "Logo & Identidade Express", 
            price: 120, 
            desc: "Criação de logotipo profissional e paleta de cores para sua loja.",
            popular: false,
            images: ["/img/logoGEOX.png", "/img/logoGEOXcinza.png"]
        }
    ],
    impressao: [
        { id: "essencial", title: "Pacote Essencial (5 Artes)", price: 95, desc: "Ideal para começar. Sai a R$19/arte.", popular: false, images: ["/img/qualidade.png"] },
        { id: "avancado", title: "Pacote Avançado (10 Artes)", price: 180, desc: "O mais pedido. Sai a R$18/arte.", popular: true, images: ["/img/qualidade.png"] },
        { id: "profissional", title: "Profissional (15 Artes)", price: 255, desc: "Alta demanda. Sai a R$17/arte.", popular: false, images: ["/img/qualidade.png"] },
        { id: "vip", title: "MENSALIDADE VIP (Ilimitado)", price: 1500, desc: "Sua agência particular. Artes ilimitadas todo mês.", popular: false, highlight: true, images: ["/img/qualidade.png"] }
    ],
    web: [
        { id: "lp", title: "Landing Page High-End", price: 600, desc: "Página de alta conversão, Copywriting incluso e Design Premium.", popular: true, images: ["/img/landingPage1.png", "/img/landingPage3.png", "/img/landingPage4.png"] },
        { id: "site", title: "Site Institucional Completo", price: 1200, desc: "Site multipáginas, Blog, SEO Avançado e Painel Admin.", popular: false, images: ["/img/landingPage2.png", "/img/landingPage1.png"] }
    ],
    design: [
        { id: "social", title: "Pack Social Media (5 Artes)", price: 150, desc: "Posts estratégicos para Feed ou Stories.", popular: true, images: ["/img/DesignsDiversos.png", "/img/DesignsDiversas2.png"] },
        { id: "id-visual", title: "Branding Completo", price: 450, desc: "Manual da marca, Logo, Tipografia e Aplicações.", popular: false, images: ["/img/logoGEOX.png", "/img/DesignsDiversos3.png"] }
    ]
};

// --- COMPONENTE INTERNO (Lógica) ---
function ContratarContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("service") as "marketplace" | "impressao" | "web" | "design" | null;

    const [step, setStep] = useState(initialCategory ? 2 : 1);
    const [category, setCategory] = useState<string | null>(initialCategory);
    const [selectedPackage, setSelectedPackage] = useState<PricingPackage | null>(null);
    
    // Estado do Formulário
    const [answers, setAnswers] = useState<any>({ urgencia: "Nao", details: "" });
    
    // Estado de Pagamento
    const [copied, setCopied] = useState(false);
    const [confirmedPay, setConfirmedPay] = useState(false);

    // Estado do Carrossel
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    // Resetar carrossel quando muda categoria ou pacote
    useEffect(() => { setCurrentImgIndex(0); }, [category, selectedPackage]);

    // Cálculo Total
    const totalValue = useMemo(() => {
        let total = selectedPackage ? selectedPackage.price : 0;
        if (answers.urgencia === "Sim") total += 100;
        return total;
    }, [selectedPackage, answers]);

    // Navegação
    const nextStep = () => setStep(step + 1);
    const prevStep = () => step === 2 && !initialCategory ? setStep(1) : setStep(step - 1);

    // Handlers
    const handleDetail = (e: any) => setAnswers({ ...answers, details: e.target.value });
    const toggleUrgencia = (val: string) => setAnswers({ ...answers, urgencia: val });

    const copyPix = () => {
        navigator.clipboard.writeText(PIX_KEY);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const finishOrder = () => {
        if (!confirmedPay) return;
        const text = `
*NOVO PEDIDO - GEOX STUDIO* 🚀
--------------------------------
*Categoria:* ${category?.toUpperCase()}
*Pacote:* ${selectedPackage?.title}
*Valor Final:* R$ ${totalValue},00
--------------------------------
*URGÊNCIA:* ${answers.urgencia}
*DETALHES DO PROJETO:*
${answers.details || "Sem observações adicionais."}
--------------------------------
*STATUS:* Pagamento confirmado pelo cliente.
*Obs:* Envio o comprovante na sequência.
        `;
        window.open(`https://wa.me/5535984431670?text=${encodeURIComponent(text)}`, "_blank");
    };

    // Lógica das Imagens do Carrossel
    const galleryImages = useMemo(() => {
        if (selectedPackage?.images) return selectedPackage.images;
        // Fallback genérico por categoria se nenhum pacote selecionado
        if (category === "marketplace") return ["/img/PackBannerShopee1.png", "/img/PackBannerShopee2.png"];
        if (category === "web") return ["/img/landingPage1.png", "/img/landingPage2.png"];
        if (category === "impressao") return ["/img/tabela-valores.jpg"];
        return ["/img/DesignsDiversos.png"];
    }, [category, selectedPackage]);

    const nextImage = () => setCurrentImgIndex((prev) => (prev + 1) % galleryImages.length);
    const prevImage = () => setCurrentImgIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

    return (
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 px-4 md:px-0 h-auto lg:h-[800px]">
            
            {/* --- COLUNA ESQUERDA: CONTROLE (Ocupa 7 colunas) --- */}
            <div className="lg:col-span-7 bg-surface/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col h-full relative overflow-hidden">
                
                {/* Botão Voltar ao Início */}
                <Link href="/" className="absolute top-6 right-6 text-xs font-bold text-gray-500 hover:text-white flex items-center gap-1 transition-colors z-20">
                    <Home className="w-3 h-3" /> Início
                </Link>

                {/* Header Dinâmico */}
                <div className="mb-6 pb-6 border-b border-white/5">
                    <h1 className="font-display font-bold text-3xl text-white mb-1">
                        {step === 3 ? "Checkout Seguro" : "Configure seu Projeto"}
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span className={`px-2 py-0.5 rounded ${step >= 1 ? "bg-primary text-white" : "bg-white/10"}`}>1. Categoria</span>
                        <span className="text-white/20">/</span>
                        <span className={`px-2 py-0.5 rounded ${step >= 2 ? "bg-primary text-white" : "bg-white/10"}`}>2. Detalhes</span>
                        <span className="text-white/20">/</span>
                        <span className={`px-2 py-0.5 rounded ${step >= 3 ? "bg-green-500 text-white" : "bg-white/10"}`}>3. Pagamento</span>
                    </div>
                </div>

                {/* Corpo do Formulário com Scroll Interno se necessário */}
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                    <AnimatePresence mode="wait">
                        
                        {/* ETAPA 1: CATEGORIAS */}
                        {step === 1 && (
                            <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                                <p className="text-gray-300 mb-4">Selecione a área que você precisa de ajuda hoje:</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { id: "marketplace", icon: <ShoppingBag />, label: "Shopee & ML", desc: "Kits completos para vender mais." },
                                        { id: "impressao", icon: <Printer />, label: "Impressão", desc: "Faixas, quadros e outdoors." },
                                        { id: "web", icon: <Globe />, label: "Web & Sites", desc: "Landing Pages de alta conversão." },
                                        { id: "design", icon: <Palette />, label: "Design & Social", desc: "Identidade visual e posts." }
                                    ].map((cat) => (
                                        <button 
                                            key={cat.id}
                                            onClick={() => { setCategory(cat.id); nextStep(); }}
                                            className="flex flex-col gap-3 p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary transition-all text-left group"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                                {cat.icon}
                                            </div>
                                            <div>
                                                <span className="font-bold text-lg text-white block">{cat.label}</span>
                                                <span className="text-xs text-gray-400">{cat.desc}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* ETAPA 2: PACOTES E DETALHES */}
                        {step === 2 && category && (
                            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <div className="space-y-6">
                                    
                                    {/* Seleção de Pacote */}
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">1. Escolha o Pacote</h3>
                                        <div className="grid grid-cols-1 gap-3">
                                            {PRICING_OPTIONS[category].map((pkg) => (
                                                <button
                                                    key={pkg.id}
                                                    onClick={() => setSelectedPackage(pkg)}
                                                    className={`p-4 rounded-xl border text-left transition-all relative group ${
                                                        selectedPackage?.id === pkg.id 
                                                        ? "bg-primary/10 border-primary ring-1 ring-primary" 
                                                        : "bg-white/5 border-white/10 hover:bg-white/10"
                                                    } ${pkg.highlight ? "border-yellow-500/50 bg-yellow-500/5" : ""}`}
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h4 className={`font-bold text-lg ${selectedPackage?.id === pkg.id ? "text-primary" : "text-white"}`}>{pkg.title}</h4>
                                                            <p className="text-xs text-gray-400 mt-1 max-w-[90%]">{pkg.desc}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <span className="block text-xl font-bold text-white">R$ {pkg.price}</span>
                                                            {pkg.popular && <span className="text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full inline-block mt-1">POPULAR</span>}
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Campo de Detalhes (Novo) */}
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">2. Detalhes do Projeto</h3>
                                        <textarea
                                            placeholder="Descreva brevemente o que você precisa (cores, referências, textos...)"
                                            className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-primary focus:outline-none min-h-[80px] resize-none placeholder:text-gray-600"
                                            onChange={handleDetail}
                                            value={answers.details}
                                        />
                                    </div>

                                    {/* Urgência */}
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">3. Prazo de Entrega</h3>
                                        <div className="flex gap-3">
                                            <button 
                                                onClick={() => toggleUrgencia("Nao")}
                                                className={`flex-1 p-3 rounded-xl border text-sm transition-all ${answers.urgencia === "Nao" ? "bg-white text-black border-white font-bold" : "bg-transparent border-white/10 text-gray-400"}`}
                                            >
                                                Padrão (Sem custo)
                                            </button>
                                            <button 
                                                onClick={() => toggleUrgencia("Sim")}
                                                className={`flex-1 p-3 rounded-xl border text-sm transition-all ${answers.urgencia === "Sim" ? "bg-red-500/20 border-red-500 text-red-400 font-bold" : "bg-transparent border-white/10 text-gray-400"}`}
                                            >
                                                Urgente (+R$100)
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        )}

                        {/* ETAPA 3: PAGAMENTO */}
                        {step === 3 && (
                            <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                
                                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/10 border border-green-500/30 p-6 rounded-2xl text-center">
                                    <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-1">Total Final</p>
                                    <div className="text-5xl font-display font-bold text-white tracking-tight">R$ {totalValue},00</div>
                                    <p className="text-xs text-gray-400 mt-2">Pagamento único • Sem taxas ocultas</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* PIX */}
                                    <div className="bg-white/5 p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-colors">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center"><Check size={14} className="text-green-400"/></div>
                                            <p className="font-bold text-sm text-white">Pix (Recomendado)</p>
                                        </div>
                                        <div className="flex items-center gap-2 bg-black/40 p-3 rounded-lg border border-white/5 relative group">
                                            <span className="font-mono text-xs text-gray-400 truncate flex-1 select-all">{PIX_KEY}</span>
                                            <button onClick={copyPix} className="p-2 hover:bg-white/10 rounded transition-colors absolute right-1">
                                                {copied ? <Check size={14} className="text-green-400"/> : <Copy size={14} className="text-white"/>}
                                            </button>
                                        </div>
                                        <p className="text-[10px] text-gray-500 mt-2 text-center">Aprovação imediata</p>
                                    </div>

                                    {/* CARTÃO */}
                                    <a href={LINK_CARTAO_BASE} target="_blank" className="bg-white/5 p-5 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-colors group flex flex-col justify-center text-center">
                                        <CreditCard size={24} className="text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform"/>
                                        <p className="font-bold text-sm text-white mb-1">Cartão de Crédito</p>
                                        <p className="text-[10px] text-gray-500">Em até 12x via Mercado Pago</p>
                                    </a>
                                </div>

                                {/* Checkbox */}
                                <div 
                                    className="flex items-start gap-3 p-4 rounded-xl bg-black/20 border border-white/5 cursor-pointer hover:bg-black/30 transition-colors"
                                    onClick={() => setConfirmedPay(!confirmedPay)}
                                >
                                    <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-all ${confirmedPay ? "bg-green-500 border-green-500" : "border-gray-600"}`}>
                                        {confirmedPay && <Check size={12} className="text-white" />}
                                    </div>
                                    <p className="text-xs text-gray-400 leading-snug select-none">
                                        Declaro que realizei o pagamento no valor de <strong>R$ {totalValue},00</strong> e enviarei o comprovante para iniciar o projeto.
                                    </p>
                                </div>

                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer do Controle (Botões) */}
                <div className="pt-6 border-t border-white/10 flex justify-between items-center mt-auto">
                    {step > 1 ? (
                        <button onClick={prevStep} className="text-gray-400 hover:text-white text-sm flex items-center gap-2 px-2 py-2">
                            <ArrowLeft size={16} /> Voltar
                        </button>
                    ) : (
                        <div /> 
                    )}

                    {step === 3 ? (
                        <button 
                            onClick={finishOrder} 
                            disabled={!confirmedPay} 
                            className={`px-8 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg transition-all ${confirmedPay ? "bg-green-500 hover:bg-green-400 text-black hover:shadow-green-500/20 transform hover:-translate-y-1" : "bg-gray-800 text-gray-500 cursor-not-allowed"}`}
                        >
                            <Send size={18} /> Enviar Comprovante
                        </button>
                    ) : (
                        <button 
                            onClick={nextStep} 
                            disabled={step === 2 && !selectedPackage} 
                            className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-white/10 transition-all"
                        >
                            {step === 1 ? "Ver Pacotes" : "Ir para Pagamento"} <ArrowRight size={16} />
                        </button>
                    )}
                </div>

            </div>

            {/* --- COLUNA DIREITA: VITRINE (Carrossel Interativo) --- */}
            <div className="lg:col-span-5 hidden lg:flex flex-col h-[800px] sticky top-6">
                <div className="relative flex-1 rounded-3xl overflow-hidden border border-white/10 bg-black/40 group shadow-2xl">
                    
                    {/* Imagem */}
                    <AnimatePresence mode="wait">
                        <motion.img 
                            key={galleryImages[currentImgIndex]}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            src={galleryImages[currentImgIndex]} 
                            alt="Preview" 
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </AnimatePresence>

                    {/* Overlay e Controles */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-black/20" />
                    
                    {/* Setas de Navegação (Só mostra se tiver + de 1 imagem) */}
                    {galleryImages.length > 1 && (
                        <>
                            <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/10 hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100">
                                <ChevronLeft size={20} />
                            </button>
                            <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/10 hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100">
                                <ChevronRight size={20} />
                            </button>
                            {/* Indicadores (Bolinhas) */}
                            <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-2">
                                {galleryImages.map((_, idx) => (
                                    <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImgIndex ? "bg-white w-4" : "bg-white/30"}`} />
                                ))}
                            </div>
                        </>
                    )}

                    {/* Informações Flutuantes */}
                    <div className="absolute bottom-8 left-8 right-8 z-20">
                        <motion.div 
                            key={selectedPackage?.id || "default"}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/90 backdrop-blur text-white text-[10px] font-bold rounded-full uppercase tracking-wider mb-4 shadow-lg border border-white/20">
                                <Star size={10} fill="white" />
                                {selectedPackage ? "Pacote Selecionado" : "Qualidade GEOX"}
                            </span>
                            
                            <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-3 leading-tight">
                                {selectedPackage ? selectedPackage.title : 
                                 category === "impressao" ? "Impressão de Alta Definição" : 
                                 category === "marketplace" ? "Lojas que Vendem" : 
                                 "Design Estratégico"}
                            </h3>
                            
                            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
                                {selectedPackage ? selectedPackage.desc : 
                                 "Cada pixel é pensado para transmitir autoridade e converter visitantes em clientes fiéis. Veja os exemplos acima."}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

        </div>
    );
}

// Componente Principal (Wrapper)
export default function Contratar() {
    return (
        <main className="min-h-screen bg-background flex items-center justify-center p-4 lg:p-8 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary fixed" />
            <Suspense fallback={<div className="text-white text-center animate-pulse">Carregando central...</div>}>
                <ContratarContent />
            </Suspense>
        </main>
    );
}