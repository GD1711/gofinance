'use client';

import { motion } from 'framer-motion';
import { TrendUp, TrendDown, Wallet } from '@/ui/icons';

interface CategoryExpense {
  name: string;
  amount: number;
  percentage: number;
}

interface FinancialOverviewCardProps {
  income?: number;
  expenses?: number;
  balance?: number;
  categoryBreakdown?: CategoryExpense[];
}

export default function FinancialOverviewCard({
  income = 3500,
  expenses = 2348,
  balance = 1152,
  categoryBreakdown = [
    { name: 'Aluguel', amount: 1200.00, percentage: 51.1 },
    { name: 'Alimentação', amount: 620.50, percentage: 26.4 },
    { name: 'Transporte', amount: 280.00, percentage: 11.9 },
    { name: 'Assinaturas', amount: 147.30, percentage: 6.3 },
    { name: 'Outros', amount: 100.00, percentage: 4.3 },
  ],
}: FinancialOverviewCardProps) {
  const topExpense = categoryBreakdown[0];

  return (
    <div className="glass rounded-2xl p-6 h-full">
      {/* Visão Geral */}
      <div className="mb-6">
        <div className="grid grid-cols-3 gap-4 mb-4">
          {/* Receitas */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendUp size={16} className="text-green-400" />
              <span className="text-xs text-white/60">Receitas</span>
            </div>
            <p className="text-lg font-bold text-green-400">
              R$ {income.toLocaleString('pt-BR')}
            </p>
          </div>

          {/* Gastos */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendDown size={16} className="text-red-400" />
              <span className="text-xs text-white/60">Gastos</span>
            </div>
            <p className="text-lg font-bold text-red-400">
              R$ {expenses.toLocaleString('pt-BR')}
            </p>
          </div>

          {/* Saldo */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Wallet size={16} className="text-gray-300" />
              <span className="text-xs text-white/60">Saldo</span>
            </div>
            <p className={`text-lg font-bold ${balance >= 0 ? 'text-gray-300' : 'text-gray-400'}`}>
              R$ {balance.toLocaleString('pt-BR')}
            </p>
          </div>
        </div>
      </div>

      {/* Separador */}
      <div className="h-px bg-white/10 mb-4" />

      {/* Detalhamento dos Gastos */}
      <div>
        <h4 className="text-white/80 font-medium text-sm mb-3 flex items-center gap-2">
          📌 Detalhamento dos Gastos
        </h4>
        <div className="space-y-2">
          {categoryBreakdown.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-sm text-white/80">{category.name}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-white">
                  R$ {category.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-white/40">
                  {category.percentage.toFixed(1)}%
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Insight */}
      {topExpense && (
        <>
          <div className="h-px bg-white/10 my-4" />
          <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
            <div className="flex items-start gap-2">
              <span className="text-lg">🔍</span>
              <div className="flex-1">
                <p className="text-sm text-white/90 mb-1">
                  <span className="font-semibold">Maior gasto atual:</span>{' '}
                  {topExpense.name} ({topExpense.percentage.toFixed(1)}% do total)
                </p>
                <p className="text-xs text-white/60">
                  {topExpense.name === 'Aluguel' 
                    ? '💡 Moradia é essencial, mas revise se há custos extras reduzíveis.'
                    : '💡 Analise se este gasto pode ser otimizado.'}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
