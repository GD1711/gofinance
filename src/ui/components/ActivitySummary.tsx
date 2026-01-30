/**
 * COMPONENTE: ActivitySummary
 * Resumo de atividade financeira com números grandes e impactantes
 */

'use client';

import { motion } from 'framer-motion';
import { TrendUp, TrendDown, CurrencyDollar, Target } from '@/ui/icons';

interface ActivitySummaryProps {
  caloriesBurn?: number;
  caloriesTarget?: number;
  steps?: number;
  stepsTarget?: number;
  activeTime?: number;
  activeTimeUnit?: string;
}

interface MetricCardProps {
  value: string | number;
  target?: string | number;
  label: string;
  icon?: React.ReactNode;
  unit?: string;
  color?: string;
}

function MetricCard({ value, target, label, icon, unit, color = 'text-primary' }: MetricCardProps) {
  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-sm text-white/60">{label}</h3>
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-baseline gap-2">
          <span className={`text-5xl font-bold font-mono ${color}`}>
            {typeof value === 'number' ? value.toLocaleString('en-US') : value}
          </span>
          {unit && <span className="text-lg text-white/40">{unit}</span>}
        </div>
        
        {target && (
          <div className="flex items-center gap-2 text-sm">
            <Target size={14} className="text-white/40" />
            <span className="text-white/40">Target</span>
            <span className="text-white/60 font-mono">{target}</span>
            {unit && <span className="text-white/40">{unit}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ActivitySummary({
  caloriesBurn = 1828,
  caloriesTarget = 2000,
  steps = 9880,
  stepsTarget = 10000,
  activeTime = 45,
  activeTimeUnit = 'MIN'
}: ActivitySummaryProps) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Your Activity</h2>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          value={caloriesBurn}
          target={caloriesTarget}
          label="CALORIES BURN"
          icon={<TrendUp size={16} className="text-primary" />}
          unit="KCAL"
          color="text-primary"
        />

        <MetricCard
          value={steps}
          target={stepsTarget}
          label="STEPS"
          icon={<Target size={16} className="text-primary" />}
          unit="STEPS"
          color="text-primary"
        />

        <MetricCard
          value={activeTime}
          label="ACTIVE TIME"
          icon={<CurrencyDollar size={16} weight="bold" className="text-primary" />}
          unit={activeTimeUnit}
          color="text-primary"
        />
      </div>
    </div>
  );
}
