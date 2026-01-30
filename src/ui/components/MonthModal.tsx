/**
 * COMPONENTE: MonthModal
 * Modal Premium - Estética minimalista com feedback visual protagonista
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendUp, TrendDown } from '@/ui/icons';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useEffect, useState } from 'react';

interface MonthData {
  month: string;
  status: 'excellent' | 'stable' | 'warning' | 'risk';
  label: string;
}

interface MonthModalProps {
  isOpen: boolean;
  onClose: () => void;
  monthData: MonthData | null;
  monthIndex: number;
}

export default function MonthModal({ isOpen, onClose, monthData, monthIndex }: MonthModalProps) {
  const [lottieKey, setLottieKey] = useState(0);

  // Reinicia animação quando o modal abre
  useEffect(() => {
    if (isOpen) {
      setLottieKey(prev => prev + 1);
    }
  }, [isOpen]);

  // Detecta se é um mês com gastos elevados (Janeiro = index 0)
  const isHighSpendingMonth = monthIndex === 0;

  // Foco em consequências ao invés de números
  const getConsequences = (status: string) => {
    const consequences = {
      excellent: {
        future: 'Você está construindo um futuro seguro.',
        trend: 'upward' as const,
        action: 'Continue assim - sua disciplina está pagando.',
        feeling: 'Liberdade financeira se aproximando.',
      },
      stable: {
        future: '',
        trend: 'stable' as const, 
        action: 'Pequenos ajustes podem acelerar seu progresso.',
        feeling: 'Você tem controle da situação.',
      },
      warning: {
        future: 'Em 3 meses, você pode ter dificuldades.',
        trend: 'downward' as const,
        action: 'Um ajuste agora evita problemas maiores.',
        feeling: 'Hora de prestar atenção aos sinais.',
      },
      risk: {
        future: 'Sem mudanças, as coisas vão complicar.',
        trend: 'downward' as const,
        action: 'Ação imediata vai fazer a diferença.',
        feeling: 'Você pode reverter isso agora.',
      }
    };
    
    return consequences[status as keyof typeof consequences] || consequences.stable;
  };
  
  const consequences = monthData ? getConsequences(monthData.status) : null;
  
  if (!monthData || !consequences) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9998]"
          />
          
          <div className="fixed inset-0 flex items-center justify-center p-4 z-[9999] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`pointer-events-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] w-full ${isHighSpendingMonth ? 'max-w-lg' : 'max-w-md'} max-h-[90vh] overflow-hidden resize md:resize`}
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-2 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/25 transition-all duration-150 backdrop-blur-xl border border-white/15 z-10 group"
                aria-label="Fechar modal"
              >
                <X size={18} className="text-white/80 group-hover:text-white transition-colors" />
              </button>

              {/* Scroll Container */}
              <div 
                className="overflow-y-auto max-h-[90vh] p-6"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >

              {isHighSpendingMonth ? (
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center justify-center w-full mb-5">
                    <DotLottieReact
                      key={lottieKey}
                      src="https://lottie.host/d444c0bd-02bc-445f-8ab6-80a54a1742d7/C604CMgKvx.lottie"
                      loop
                      autoplay
                      style={{ width: '180px', height: '180px', maxWidth: '100%' }}
                    />
                  </div>

                  <div className="text-center space-y-2.5 mb-6">
                    <h2 className="text-xl font-semibold text-white tracking-tight">
                      Janeiro • Gastos Elevados
                    </h2>
                    <p className="text-white/60 text-sm leading-relaxed max-w-sm mx-auto">
                      Identificamos gastos acima da média. Revise suas despesas para manter o equilíbrio financeiro.
                    </p>
                  </div>

                  <button
                    onClick={onClose}
                    className="px-8 py-3 bg-white/15 hover:bg-white/20 active:bg-white/25 backdrop-blur-xl border border-white/25 rounded-xl text-white text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-white/40 shadow-lg"
                  >
                    Entendido
                  </button>
                </div>
              ) : (
                <div>
                  <div className="mb-5">
                    <h2 className="text-xl font-semibold text-white tracking-tight">
                      {monthData.month}
                    </h2>
                  </div>
                  
                  <div className="text-center mb-5 space-y-2.5">
                    <h3 className="text-lg text-white/90 leading-relaxed">
                      {consequences.future || consequences.feeling}
                    </h3>
                    <p className="text-sm text-white/60">
                      {consequences.feeling}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-center mb-5">
                    <div className="bg-white/8 backdrop-blur-xl border border-white/15 px-4 py-2.5 rounded-xl flex items-center gap-2.5">
                      {consequences.trend === 'upward' && <TrendUp size={18} className="text-white/90" />}
                      {consequences.trend === 'downward' && <TrendDown size={18} className="text-white/90" />}
                      {consequences.trend === 'stable' && <div className="w-5 h-0.5 bg-white/70 rounded" />}
                      <span className="text-white/80 text-xs font-medium">
                        {consequences.trend === 'upward' && 'Trajetória ascendente'}
                        {consequences.trend === 'downward' && 'Precisa de atenção'}
                        {consequences.trend === 'stable' && 'Situação estável'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="h-px bg-white/10 mb-5" />
                  
                  <div className="bg-white/8 backdrop-blur-xl border border-white/15 p-4 rounded-xl mb-5">
                    <h4 className="text-white/90 font-medium mb-2 flex items-center gap-2 text-sm">
                      <span className="text-base">→</span>
                      Próximo passo
                    </h4>
                    <p className="text-white/65 text-xs leading-relaxed">
                      {consequences.action}
                    </p>
                  </div>

                  <button
                    onClick={onClose}
                    className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium rounded-xl transition-all shadow-lg shadow-blue-500/20"
                  >
                    Fechar
                  </button>
                </div>
              )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}