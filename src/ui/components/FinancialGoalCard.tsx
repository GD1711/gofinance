/**
 * COMPONENTE: FinancialGoalCard
 * Card de meta financeira com barra de progresso
 */

'use client';

import { motion } from 'framer-motion';
import { Target, TrendUp, Calendar } from '@/ui/icons';
import ProgressBar from './ProgressBar';

interface FinancialGoalCardProps {
  title: string;
  currentValue: number;
  targetValue: number;
  deadline?: string;
  category?: 'savings' | 'investment' | 'debt' | 'expense';
}

export default function FinancialGoalCard({
  title,
  currentValue,
  targetValue,
  deadline,
  category = 'savings',
}: FinancialGoalCardProps) {
  const percentage = Math.min((currentValue / targetValue) * 100, 100);
  const remaining = Math.max(targetValue - currentValue, 0);
  const isCompleted = percentage >= 100;

  const categoryConfig = {
    savings: {
      icon: Target,
      color: 'text-primary',
      bgColor: 'bg-primary/20',
    },
    investment: {
      icon: TrendUp,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
    },
    debt: {
      icon: Target,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
    },
    expense: {
      icon: Target,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
    },
  };

  const config = categoryConfig[category];
  const Icon = config.icon;

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div className={`p-2.5 rounded-xl ${config.bgColor} flex-shrink-0`}>
            <Icon size={20} className={config.color} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-white mb-1 truncate">{title}</h3>
            {deadline && (
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Calendar size={12} />
                <span>{deadline}</span>
              </div>
            )}
          </div>
        </div>
        {isCompleted && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex-shrink-0 ml-2"
          >
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Valores */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <p className="text-xs text-gray-400 mb-1">Atual</p>
          <p className="text-lg font-bold font-mono text-white">
            R$ {currentValue.toLocaleString('pt-BR')}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">Meta</p>
          <p className="text-lg font-bold font-mono text-white">
            R$ {targetValue.toLocaleString('pt-BR')}
          </p>
        </div>
      </div>

      {/* Barra de Progresso */}
      <ProgressBar
        value={percentage}
        showAbsoluteValue
        absoluteValue={`Faltam R$ ${remaining.toLocaleString('pt-BR')}`}
        height="md"
        showPercentage={false}
      />

      {/* Status Message */}
      {!isCompleted && (
        <p className="text-xs text-gray-400 mt-3">
          {percentage >= 75
            ? 'Quase lá! Continue assim.'
            : percentage >= 50
            ? 'Bom progresso, mantenha o ritmo.'
            : 'Foco no objetivo, você consegue!'}
        </p>
      )}
      {isCompleted && (
        <p className="text-xs text-green-400 mt-3 font-medium">
          🎉 Meta alcançada! Parabéns!
        </p>
      )}
    </div>
  );
}
