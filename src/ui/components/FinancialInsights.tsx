/**
 * COMPONENTE: FinancialInsights
 * Intervenção focada em consequências - Glass Design
 */

'use client';

import { motion } from 'framer-motion';
import { Eye, Warning, TrendUp, ArrowRight } from '@/ui/icons';
import { Intervention } from '@/domain/types/financial-data.types';

interface FinancialInsightsProps {
  intervention: Intervention;
}

export default function FinancialInsights({ intervention }: FinancialInsightsProps) {
  const { type, message, microAction, impact, priority } = intervention;

  // Remover container motivacional conforme solicitação
  if (type === 'motivational') return null;

  // Redesign focado em consequências
  const getConsequenceConfig = (type: string, priority: string) => {
    const configs = {
      corrective: {
        icon: Warning,
        color: 'text-red-400',
        bgGlow: 'shadow-[0_0_25px_rgba(239,68,68,0.2)]',
        title: 'Momento de agir',
        urgency: 'Sua situação precisa de atenção agora',
      },
      preventive: {
        icon: Eye,
        color: 'text-yellow-400', 
        bgGlow: 'shadow-[0_0_20px_rgba(255,193,7,0.2)]',
        title: 'Futuro em risco',
        urgency: 'Um ajuste agora evita problemas maiores',
      },
      motivational: {
        icon: TrendUp,
        color: 'text-green-400',
        bgGlow: 'shadow-[0_0_20px_rgba(16,185,129,0.2)]',
        title: 'Você está no caminho',
        urgency: 'Continue assim para manter o progresso',
      },
    };

    return configs[type as keyof typeof configs] || configs.preventive;
  };

  const config = getConsequenceConfig(type, priority);
  const Icon = config.icon;

  return (
    <div className={`glass rounded-xl p-6 relative overflow-hidden ${config.bgGlow}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header minimalista */}
        <div className="flex items-start gap-4 mb-4">
          <div className="glass-strong p-3 rounded-xl">
            <Icon size={24} className={config.color} />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold text-lg mb-1">
              {config.title}
            </h3>
            <p className="text-white/70 text-sm">
              {config.urgency}
            </p>
          </div>
        </div>

        {/* Consequência principal */}
        <div className="mb-5">
          <div className="glass p-4 rounded-xl">
            <p className="text-white/90 leading-relaxed">{message}</p>
          </div>
        </div>

        {/* Ação prática */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="glass-strong p-4 rounded-xl cursor-pointer group transition-all duration-300"
        >
          <div className="flex items-start gap-3">
            <div className={`w-2 h-2 rounded-full ${config.color.replace('text-', 'bg-')} mt-2 flex-shrink-0`} />
            <div className="flex-1">
              <p className="text-white font-medium mb-2">{microAction}</p>
              <p className="text-white/60 text-sm">✨ {impact}</p>
            </div>
            <ArrowRight 
              size={16} 
              className="text-white/40 group-hover:text-white/60 transition-colors mt-1" 
            />
          </div>
        </motion.div>
      </motion.div>
      
      {/* Background effect */}
      <div className={`absolute top-0 right-0 w-32 h-32 ${config.color.replace('text-', 'bg-')} opacity-5 rounded-full blur-3xl`} />
    </div>
  );
}
