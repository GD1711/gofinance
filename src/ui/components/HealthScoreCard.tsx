/**
 * CARD: Saúde Financeira
 * Score simples + cor + frase curta
 */

'use client';

import { Heart, Warning, CheckCircle } from '@/ui/icons';
import GlassCard from './GlassCard';

interface HealthScoreCardProps {
  score: number;
  level: 'excelente' | 'bom' | 'atenção' | 'crítico';
  message: string;
  color: 'green' | 'yellow' | 'red';
}

export default function HealthScoreCard({ score, level, message, color }: HealthScoreCardProps) {
  const colorClasses = {
    green: 'text-primary bg-primary/20 border-primary/30',
    yellow: 'text-primary bg-primary/20 border-primary/30',
    red: 'text-primary bg-primary/20 border-primary/30',
  };

  const icons = {
    green: CheckCircle,
    yellow: Warning,
    red: Warning,
  };

  const Icon = icons[color];

  // Calcula o progresso circular
  const circumference = 2 * Math.PI * 45; // raio = 45
  const offset = circumference - (score / 100) * circumference;

  return (
    <GlassCard>
      <div className="space-y-4">
        {/* Label */}
        <div className="flex items-center gap-2">
          <Heart size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-white">Saúde Financeira</h3>
        </div>

        {/* Score Circular */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <svg className="transform -rotate-90 w-28 h-28">
              {/* Background circle */}
              <circle
                cx="56"
                cy="56"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-white/10"
              />
              {/* Progress circle */}
              <circle
                cx="56"
                cy="56"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="transition-all duration-1000 text-primary"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold font-mono text-primary">{score}</span>
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${colorClasses[color]} border`}>
              <Icon size={16} />
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              {message}
            </p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
