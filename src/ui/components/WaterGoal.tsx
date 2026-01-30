/**
 * COMPONENTE: WaterGoal
 * Card de meta de água com barra de progresso estilo fitness app
 */

'use client';

import { motion } from 'framer-motion';
import { Drop } from '@/ui/icons';
import GlassCard from './GlassCard';
import ProgressBar from './ProgressBar';

interface WaterGoalProps {
  currentValue: number; // em litros
  goalValue: number; // em litros
  unit?: string;
}

export default function WaterGoal({
  currentValue,
  goalValue,
  unit = 'L',
}: WaterGoalProps) {
  const percentage = Math.min((currentValue / goalValue) * 100, 100);
  const isGoalReached = percentage >= 100;

  return (
    <GlassCard strong>
      <div className="flex items-start gap-3 mb-4">
        <div className={`p-2.5 rounded-xl ${isGoalReached ? 'bg-status-success/20' : 'bg-primary/20'}`}>
          <Drop size={24} weight="bold" className={isGoalReached ? 'text-status-success' : 'text-primary'} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-1">Water</h3>
          <p className="text-sm text-white/60">
            {percentage >= 100 
              ? 'Goal completed! Great job today!' 
              : `${Math.round(percentage)}% of goal. ${isGoalReached ? 'Perfect!' : 'Keep going!'}`
            }
          </p>
        </div>
      </div>

      {/* Barra de Progresso com Riscos */}
      <div className="mb-4">
        <ProgressBar
          value={percentage}
          showAbsoluteValue
          absoluteValue={`${currentValue}${unit} / ${goalValue}${unit}`}
        />
      </div>

      {/* Range Labels */}
      <div className="flex items-center justify-between text-xs text-white/40 mb-3">
        <span className="font-mono">1.8{unit}</span>
        <span className="font-mono">2.5{unit}</span>
      </div>

      {/* Add Water Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium transition-colors"
      >
        Add Water
      </motion.button>
    </GlassCard>
  );
}
