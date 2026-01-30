/**
 * COMPONENTE: FinancialLevel
 * Sistema de níveis financeiros com gamificação
 */

'use client';

import { motion } from 'framer-motion';
import { Trophy, Target, TrendUp, Rocket, Crown } from '@/ui/icons';
import ProgressBar from './ProgressBar';

export type FinancialLevelType = 'survival' | 'stability' | 'balance' | 'growth' | 'freedom';

interface FinancialLevelProps {
  currentLevel: FinancialLevelType;
  progress: number; // 0-100
  nextLevelRequirement?: string;
}

const LEVELS = {
  survival: {
    name: 'Sobrevivência',
    icon: Target,
    color: 'text-status-danger',
    bgColor: 'bg-status-danger/10',
    description: 'Foco em estabilizar gastos básicos',
  },
  stability: {
    name: 'Estabilidade',
    icon: Trophy,
    color: 'text-status-warning',
    bgColor: 'bg-status-warning/10',
    description: 'Construindo reserva de emergência',
  },
  balance: {
    name: 'Equilíbrio',
    icon: TrendUp,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    description: 'Dívidas controladas e poupando',
  },
  growth: {
    name: 'Crescimento',
    icon: Rocket,
    color: 'text-status-success',
    bgColor: 'bg-status-success/10',
    description: 'Investindo com consistência',
  },
  freedom: {
    name: 'Liberdade',
    icon: Crown,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    description: 'Independência financeira alcançada',
  },
};

export default function FinancialLevel({ 
  currentLevel, 
  progress,
  nextLevelRequirement 
}: FinancialLevelProps) {
  const level = LEVELS[currentLevel];
  const Icon = level.icon;

  return (
    <div className="glass-card-strong p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm text-white/60">Nível Financeiro</h3>
        <div className={`p-2 rounded-lg ${level.bgColor}`}>
          <Icon size={20} className={level.color} />
        </div>
      </div>

      {/* Level Name */}
      <h2 className="text-2xl font-bold text-white mb-2">{level.name}</h2>
      <p className="text-sm text-white/60 mb-6">{level.description}</p>

      {/* Progress Bar */}
      <div className="mb-4">
        <ProgressBar 
          value={progress}
          label="Progresso para próximo nível"
          height="sm"
        />
      </div>

      {/* Next Level Requirement */}
      {nextLevelRequirement && (
        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
          <p className="text-xs text-white/60">Próximo objetivo:</p>
          <p className="text-sm text-white mt-1">{nextLevelRequirement}</p>
        </div>
      )}
    </div>
  );
}
