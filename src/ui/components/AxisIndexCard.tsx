/**
 * COMPONENTE: AxisIndexCard
 * Interface emocional focada em consequências - Glass Design
 */

import { motion } from 'framer-motion';
import { FinancialAxisIndex } from '@/domain/types/financial-data.types';
import { Eye, TrendUp, Warning as AlertTriangle } from '@/ui/icons';
import { mockFinancialOverview } from '@/infrastructure/data/mock-financial-overview';

interface AxisIndexCardProps {
  axisIndex: FinancialAxisIndex;
}

export default function AxisIndexCard({ axisIndex }: AxisIndexCardProps) {
  const { score, status } = axisIndex;

  // Foco em consequências e futuro
  const getConsequenceData = (score: number, status: string) => {
    if (score >= 80) {
      return {
        emoji: '😄',
        title: 'Futuro brilhante',
        consequence: 'Você está no caminho da liberdade financeira',
        action: 'Continue assim',
        color: 'from-green-400 to-emerald-400',
        bgGlow: 'shadow-[0_0_30px_rgba(16,185,129,0.3)]',
        icon: TrendUp,
      };
    } else if (score >= 70) {
      return {
        emoji: '😊',
        title: 'Caminho seguro',
        consequence: '',
        action: 'Pequenos ajustes aceleram o progresso',
        color: 'from-gray-200 to-gray-300',
        bgGlow: 'shadow-[0_0_25px_rgba(200,200,200,0.3)]',
        icon: Eye,
      };
    } else if (score >= 50) {
      return {
        emoji: '😐',
        title: 'Atenção necessária',
        consequence: 'Em 3 meses as coisas podem complicar',
        action: 'Um ajuste agora evita problemas',
        color: 'from-gray-300 to-gray-400',
        bgGlow: 'shadow-[0_0_25px_rgba(180,180,180,0.3)]',
        icon: AlertTriangle,
      };
    } else {
      return {
        emoji: '😰',
        title: 'Momento crítico',
        consequence: 'Sem mudanças, vai ficar difícil',
        action: 'Ação imediata faz a diferença',
        color: 'from-red-500 to-red-600',
        bgGlow: 'shadow-[0_0_30px_rgba(239,68,68,0.3)]',
        icon: AlertTriangle,
      };
    }
  };

  const consequenceData = getConsequenceData(score, status);
  const Icon = consequenceData.icon;
  
  return (
    <div className={`glass rounded-xl p-6 h-full relative overflow-hidden ${consequenceData.bgGlow}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 h-full flex flex-col"
      >
        {/* Layout especial para "Caminho seguro" */}
        {consequenceData.title === 'Caminho seguro' ? (
          <>
                <div className="text-center mb-4">
                  <h3 className="text-white font-semibold text-xl mb-2">Caminho seguro</h3>
                </div>

                {/* Score visual (number removed) */}
                <div className="flex justify-center mb-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${consequenceData.color}`} />
                </div>

                <div className="mt-auto space-y-3">
                  {/* Header removed as requested (Visão Geral removed) */}
                  <div className="text-center mb-2" />

              {/* 3 Colunas - Receitas, Gastos, Saldo */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                {/* Receitas */}
                <div className="glass-strong p-2 rounded-lg text-center">
                  <div className="text-xs text-white/60 mb-1">💵 Receitas</div>
                  <div className="text-sm font-bold text-green-400">
                    R$ {mockFinancialOverview.overview.totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                </div>

                {/* Gastos */}
                <div className="glass-strong p-2 rounded-lg text-center">
                  <div className="text-xs text-white/60 mb-1">💸 Gastos</div>
                  <div className="text-sm font-bold text-red-400">
                    R$ {mockFinancialOverview.overview.totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                </div>

                {/* Saldo */}
                <div className="glass-strong p-2 rounded-lg text-center">
                  <div className="text-xs text-white/60 mb-1">💰 Saldo</div>
                  <div className="text-sm font-bold text-primary">
                    R$ {mockFinancialOverview.overview.balance.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                </div>
              </div>

              {/* Detalhamento dos Gastos */}
              <div className="glass p-3 rounded-lg">
                <h5 className="text-white/80 text-xs font-semibold mb-2">📌 Detalhamento dos Gastos</h5>
                <div className="space-y-1 text-xs text-white/70">
                  {mockFinancialOverview.categories.map((category, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>• {category.category}</span>
                      <span className="font-mono">R$ {category.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insight contextual dinâmico */}
              <div className="glass-strong p-2 rounded-lg">
                <p className="text-xs text-white/70 leading-relaxed">
                  {mockFinancialOverview.insights[0] || ''}
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Layout padrão para outros cards */}
            <div className="flex items-center justify-between mb-4">
              <Icon size={20} className="text-white/60" />
              <span className="text-4xl">{consequenceData.emoji}</span>
            </div>
            
            <div className="mb-4">
              <h3 className="text-white font-semibold text-lg mb-2">
                {consequenceData.title}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {consequenceData.consequence}
              </p>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${consequenceData.color}`} />
            </div>
            
            <div className="mt-auto">
              <div className="glass p-3 rounded-lg">
                <p className="text-white/90 text-sm">
                  🎯 {consequenceData.action}
                </p>
              </div>
            </div>
          </>
        )}
      </motion.div>
      
      {/* Background gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${consequenceData.color} opacity-5 rounded-xl`}
      />
    </div>
  );
}
