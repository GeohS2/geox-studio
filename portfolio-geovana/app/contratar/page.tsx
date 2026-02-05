"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, CreditCard, ArrowRight, ArrowLeft, Send, ShoppingBag, Printer, Globe, Palette, Star } from "lucide-react";

// --- CONFIGURAÇÕES DE DADOS ---
const PIX_KEY = "4cf3f27c-e6d5-49fa-a89b-e20c3cb42c97"; // Sua chave
const LINK_CARTAO_BASE = "https://link.mercadopago.com.br/seulink"; 

// Interface para corrigir o erro de 'highlight'
interface PricingPackage {
    id: string;
    title: string;
    price: number;
    desc: string;
    popular: boolean;
    highlight?: boolean;
    image?: string; // Caminho da foto do produto
}

// --- TABELA DE PREÇOS E PRODUTOS ---
const PRICING_OPTIONS: Record<string, PricingPackage[]> = {
    marketplace: [
        { 
            id: "kit-shopee", 
            title: "Kit Personalização Completa", 
            price: 200, 
            desc: "1 Logo + 1 Capa + 2 Banners Carrossel + 1 Banner Destaque.",
            popular: true,
            image: "/img/PackBannerShopee1.png" // Foto do Kit
        },
        { 
            id: "logo-avulsa", 
            title: "Apenas Logotipo", 
            price: 120, 
            desc: "Criação de logotipo profissional e variações.",
            popular: false,
            image: "/img/logoGEOX.png" // Foto da Logo
        }
    ],
    impressao: [
        { id: "essencial", title: "Pacote Essencial", price: 95, desc: "5 Artes PDF (R$19/cada)", popular: false, image: "/img/tabela-valores.jpg" },
        { id: "avancado", title: "Pacote Avançado", price: 180, desc: "10 Artes PDF (R$18/cada)", popular: true, image: "/img/tabela-valores.jpg" },
        { id: "profissional", title: "Pacote Profissional", price: 255, desc: "15 Artes PDF (R$17/cada)", popular: false, image: "/img/tabela-valores.jpg" },
        { id: "vip", title: "MENSALIDADE VIP", price: 1500, desc: "Artes Ilimitadas (Max 50/sem)", popular: true, highlight: true, image: "/img/vip-promo.jpg" } // Foto VIP Dourada
    ],
    web: [
        { id: "lp", title: "Landing Page High-End", price: 600, desc: "Página única de alta conversão.", popular: true, image: "/img/landingPage1.png" },
        { id: "site", title: "Site Institucional", price: 1200, desc: "Site completo com múltiplas páginas.", popular: false, image: "/img/landingPage2.png" }
    ],
    design: [
        { id: "social", title: "Pack Social Media", price: 150, desc: "5 Artes para Feed/Stories.", popular: true, image: "/img/DesignsDiversos.png" },
        { id: "id-visual", title: "Identidade Visual", price: 400, desc: "Logo + Cores + Tipografia.", popular: false, image: "/img/logoGEOXcinza.png" }
    ]
};

function ContratarContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("service") as "marketplace" | "impressao" | "web" | "design" | null;

    // Se vier com link, já pula pro passo 2
    const [step, setStep] = useState(initialCategory ? 2 : 1);
    const [category, setCategory] = useState<"marketplace" | "impressao" | "web" | "design" | null>(initialCategory);
    
    const [selectedPackage, setSelectedPackage] = useState<PricingPackage | null>(null);
    const [answers, setAnswers] = useState<any>({});
    
    const [copied, setCopied] = useState(false);
    const [confirmedPay, setConfirmedPay] = useState(false);

    // Soma total automática
    const totalValue = useMemo(() => {
        let total = selectedPackage ? selectedPackage.price : 0;
        if (answers["Urgencia"] === "Sim") total += 100;
        return total;
    }, [selectedPackage, answers]);

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleAnswer = (key: string, value: string) => {
        setAnswers({ ...answers, [key]: value });
    };

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
*DETALHES:*
${Object.entries(answers).map(([key, val]) => `• ${key}: ${val}`).join('\n')}
--------------------------------
*STATUS:* Pagamento confirmado.
*Obs:* Envio o comprovante na sequência.
        `;
        window.open(`https://wa.me/5535984431670?text=${encodeURIComponent(text)}`, "_blank");
    };

    // Lógica inteligente da Imagem Lateral
    const currentImage = useMemo(() => {
        // 1. Se tem pacote selecionado e ele tem imagem específica, usa ela
        if (selectedPackage?.image) return selectedPackage.image;
        
        // 2. Se não, usa uma imagem padrão da categoria (Fallback)
        if (category === "impressao") return "/img/tabela-valores.jpg"; 
        if (category === "marketplace") return "/img/PackBannerShopee1.png";
        if (category === "web") return "/img/landingPage1.png";
        
        // 3. Imagem padrão geral
        return "/img/DesignsDiversos.png"; 
    }, [category, selectedPackage]);

    return (
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 px-4 md:px-0">
            
            {/* --- COLUNA ESQUERDA: WIZARD DE CONTRATAÇÃO --- */}
            <div className="bg-surface/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl h-fit">
                
                {/* Header do Wizard */}
                <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
                    <div>
                        <h1 className="font-display font-bold text-2xl text-white">Contratar Serviço</h1>
                        <p className="text-sm text-gray-400">Etapa {step} de 3</p>
                    </div>
                    {category && (
                        <div className="text-right">
                             <p className="text-xs text-gray-400 uppercase">Total Estimado</p>
                             <p className="text-2xl font-bold text-primary">R$ {totalValue},00</p>
                        </div>
                    )}
                </div>

                <AnimatePresence mode="wait">
                    
                    {/* ETAPA 1: ESCOLHA DA CATEGORIA (Só aparece se não veio pelo link) */}
                    {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                            <h2 className="text-xl font-bold mb-4 text-white">Escolha a Categoria:</h2>
                            <div className="grid grid-cols-1 gap-3">
                                {[
                                    { id: "marketplace", icon: <ShoppingBag />, label: "Shopee & Mercado Livre" },
                                    { id: "impressao", icon: <Printer />, label: "Artes para Impressão" },
                                    { id: "web", icon: <Globe />, label: "Sites & Landing Pages" },
                                    { id: "design", icon: <Palette />, label: "Design & Social Media" }
                                ].map((cat) => (
                                    <button 
                                        key={cat.id}
                                        onClick={() => { setCategory(cat.id as any); nextStep(); }}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary transition-all text-left group"
                                    >
                                        <div className="text-gray-400 group-hover:text-primary transition-colors">{cat.icon}</div>
                                        <span className="font-bold text-lg text-white">{cat.label}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* ETAPA 2: SELEÇÃO DE PACOTE (Checkout Style) */}
                    {step === 2 && category && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <h2 className="text-xl font-bold mb-4 text-white">Selecione o Pacote:</h2>
                            
                            {/* Lista de Produtos */}
                            <div className="grid grid-cols-1 gap-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                                {PRICING_OPTIONS[category].map((pkg) => (
                                    <button
                                        key={pkg.id}
                                        onClick={() => setSelectedPackage(pkg)}
                                        className={`p-4 rounded-xl border text-left transition-all relative ${
                                            selectedPackage?.id === pkg.id 
                                            ? "bg-primary/20 border-primary ring-1 ring-primary" 
                                            : "bg-white/5 border-white/10 hover:bg-white/10"
                                        } ${pkg.highlight ? "border-yellow-500/50 bg-yellow-500/5" : ""}`}
                                    >
                                        {pkg.popular && <span className="absolute top-3 right-3 text-[10px] font-bold bg-white text-black px-2 rounded-full shadow-lg">POPULAR</span>}
                                        {pkg.highlight && <span className="absolute top-3 right-3 text-[10px] font-bold bg-yellow-400 text-black px-2 rounded-full flex items-center gap-1 shadow-lg shadow-yellow-500/20"><Star size={8} fill="black"/> VIP</span>}
                                        
                                        <h3 className="font-bold text-white text-lg">{pkg.title}</h3>
                                        <p className="text-xs text-gray-300 mt-1 mb-2 leading-relaxed">{pkg.desc}</p>
                                        <p className="text-xl font-bold text-primary">R$ {pkg.price}</p>
                                    </button>
                                ))}
                            </div>

                            {/* Adicionais */}
                            <div className="mt-6 pt-6 border-t border-white/10">
                                <label className="block text-sm text-gray-300 mb-2">Precisa de Urgência?</label>
                                <div className="flex gap-3">
                                    <button onClick={() => handleAnswer("Urgencia", "Nao")} className={`flex-1 py-2 rounded-lg border text-sm transition-colors ${answers["Urgencia"] === "Nao" ? "bg-white text-black border-white" : "border-white/20 text-gray-400 hover:border-white/40"}`}>Normal</button>
                                    <button onClick={() => handleAnswer("Urgencia", "Sim")} className={`flex-1 py-2 rounded-lg border text-sm transition-colors ${answers["Urgencia"] === "Sim" ? "bg-red-500/20 border-red-500 text-red-400" : "border-white/20 text-gray-400 hover:border-red-500/50"}`}>Urgente (+R$100)</button>
                                </div>
                            </div>

                            <div className="flex justify-between mt-8 items-center">
                                <button onClick={() => category ? setStep(1) : prevStep()} className="text-gray-400 text-sm hover:text-white transition-colors">Trocar Categoria</button>
                                <button onClick={nextStep} disabled={!selectedPackage} className="px-8 py-3 bg-primary text-white font-bold rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/80 transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
                                    Ir para Pagamento <ArrowRight size={16} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* ETAPA 3: PAGAMENTO (Fim do Fluxo) */}
                    {step === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                            
                            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl mb-6">
                                <p className="text-green-400 text-xs font-bold uppercase tracking-wider">Total a Pagar</p>
                                <div className="text-4xl font-bold text-white mt-1">R$ {totalValue},00</div>
                                <p className="text-xs text-gray-400 mt-2">Liberação imediata após envio do comprovante.</p>
                            </div>

                            <div className="space-y-4 mb-6">
                                {/* PIX BOX */}
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                    <p className="font-bold mb-2 text-sm text-white flex items-center justify-center gap-2"><Check size={14} className="text-green-400"/> Chave Pix (Copia e Cola)</p>
                                    <div className="flex items-center gap-2 bg-black/40 p-3 rounded-lg border border-white/5">
                                        <span className="font-mono text-xs text-gray-400 truncate flex-1">{PIX_KEY}</span>
                                        <button onClick={copyPix} className="p-2 hover:bg-white/10 rounded transition-colors" title="Copiar">
                                            <Copy size={16} className={copied ? "text-green-400" : "text-primary"} />
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="relative py-2">
                                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                                    <div className="relative flex justify-center"><span className="bg-surface px-2 text-xs text-gray-500">OU</span></div>
                                </div>

                                <a href={LINK_CARTAO_BASE} target="_blank" className="block w-full py-3 bg-blue-600 rounded-xl font-bold text-sm text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20">
                                    Pagar com Cartão de Crédito
                                </a>
                            </div>

                            {/* Checkbox de Segurança */}
                            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-white/10" onClick={() => setConfirmedPay(!confirmedPay)}>
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${confirmedPay ? "bg-green-500 border-green-500" : "border-gray-500"}`}>
                                    {confirmedPay && <Check size={12} className="text-white" />}
                                </div>
                                <p className="text-xs text-gray-400 text-left select-none">
                                    Confirmo que realizei o pagamento e enviarei o comprovante.
                                </p>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button onClick={prevStep} className="p-3 rounded-xl border border-white/10 hover:bg-white/5 text-gray-400 transition-colors"><ArrowLeft size={20} /></button>
                                <button onClick={finishOrder} disabled={!confirmedPay} className={`flex-1 font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg ${confirmedPay ? "bg-green-600 hover:bg-green-500 text-white cursor-pointer hover:shadow-green-500/20" : "bg-gray-800 text-gray-500 cursor-not-allowed"}`}>
                                    <Send size={18} /> Enviar Comprovante
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* --- COLUNA DIREITA: VITRINE DO PRODUTO (Estática) --- */}
            <div className="hidden lg:block relative h-full min-h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-black/20 group shadow-2xl sticky top-24">
                
                {/* Overlay Gradiente para texto legível */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 opacity-90" />
                
                {/* Imagem do Produto */}
                <motion.img 
                    key={currentImage} // Chave força a animação ao trocar de imagem
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src={currentImage} 
                    alt="Preview do Serviço Selecionado" 
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Info Flutuante sobre o Produto */}
                <div className="absolute bottom-10 left-10 z-20 max-w-sm">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full uppercase tracking-wider mb-3 inline-block shadow-lg">
                            {selectedPackage ? "Pacote Selecionado" : "Exemplo Real"}
                        </span>
                        <h3 className="text-3xl font-bold text-white mb-2 leading-tight">
                            {selectedPackage ? selectedPackage.title : 
                             category === "impressao" ? "Tabela Oficial & Pacotes" : 
                             category === "marketplace" ? "Lojas que Vendem Muito" : 
                             "Qualidade Visual GEOX"}
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            {selectedPackage ? selectedPackage.desc : 
                             category === "impressao" ? "Escolha o pacote ideal para sua demanda mensal. O VIP garante artes ilimitadas." :
                             "Desenvolvemos layouts focados na experiência do usuário e conversão. Veja ao lado como ficará seu projeto."}
                        </p>
                    </motion.div>
                </div>
            </div>

        </div>
    );
}

// Componente Principal (Export Default)
export default function Contratar() {
    return (
        <main className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
            
            {/* Suspense é necessário para usar useSearchParams no Next.js App Router */}
            <Suspense fallback={<div className="text-white text-center">Carregando Vitrine...</div>}>
                <ContratarContent />
            </Suspense>
        </main>
    );
}