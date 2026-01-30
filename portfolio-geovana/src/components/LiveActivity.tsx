"use client";

import { motion } from "framer-motion";
import { CalendarClock, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function LiveActivity() {
  const [nextMonth, setNextMonth] = useState("");

  useEffect(() => {
    // Lógica para pegar sempre o PRÓXIMO mês automaticamente
    const date = new Date();
    date.setMonth(date.getMonth() + 1); // Soma 1 ao mês atual
    
    // Formata para o nome do mês por extenso (Ex: "Fevereiro")
    const monthName = date.toLocaleString('pt-BR', { month: 'long' });
    
    // Deixa a primeira letra maiúscula
    setNextMonth(monthName.charAt(0).toUpperCase() + monthName.slice(1));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="fixed bottom-6 left-6 z-40"
    >
      <div className="bg-surface/90 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-4 max-w-xs">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
            <CalendarClock className="w-5 h-5 text-green-400" />
          </div>
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-surface rounded-full animate-pulse"></span>
        </div>
        
        <div>
          <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Agenda GEOX</p>
          <p className="text-sm font-medium text-white leading-tight">
            Disponibilidade para <span className="text-primary font-bold">{nextMonth}</span> quase esgotada.
          </p>
          <div className="mt-2 flex items-center gap-2 text-[10px] text-gray-500 bg-white/5 px-2 py-1 rounded-md w-fit">
            <Zap className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            Resposta média: 20 min
          </div>
        </div>
      </div>
    </motion.div>
  );
}