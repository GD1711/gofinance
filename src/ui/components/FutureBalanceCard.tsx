/**
 * CARD: Saldo Futuro
 * Mostra o saldo projetado para fim do mês com tendência
 */

'use client';

import { TrendUp, TrendDown } from '@/ui/icons';
import GlassCard from './GlassCard';
import ValueDisplay from './ValueDisplay';

interface FutureBalanceCardProps {
  currentBalance: number;
  projectedBalance: number;
  daysRemaining: number;
  status: 'healthy' | 'warning' | 'critical';
}

export default function FutureBalanceCard({
  currentBalance,
  projectedBalance,
  daysRemaining,
  status,
}: FutureBalanceCardProps) {
  const difference = projectedBalance - currentBalance;
  const trend = difference >= 0 ? 'up' : 'down';
  const percentChange = currentBalance !== 0 
    ? Math.abs((difference / currentBalance) * 100).toFixed(1)
    : '0';

  const statusMessages = {
    healthy: 'Você está no caminho certo!',
    warning: 'Atenção ao seu planejamento',
    critical: 'Revise seus gastos urgente',
  };

  const TrendIcon = trend === 'up' ? TrendUp : TrendDown;

  return (
    <GlassCard>
      <div className="space-y-4">
        {/* Label */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-primary">Saldo Futuro</h3>
          <span className="text-sm text-white/40">{daysRemaining} dias restantes</span>
        </div>

        {/* Valor Principal */}
        <ValueDisplay
          value={projectedBalance}
          label="Projeção para fim do mês"
          size="large"
          trend={trend}
          trendValue={`${percentChange}%`}
        />

        {/* Feedback */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20">
          <TrendIcon 
            size={20} 
            className="mt-0.5 flex-shrink-0 text-primary"
          />
          <div>
            <p className="font-medium text-primary">
              {statusMessages[status]}
            </p>
            <p className="text-sm text-white/60 mt-1">
              {difference >= 0 
                ? `Você vai acumular R$ ${Math.abs(difference).toFixed(2)} este mês`
                : `Você vai gastar R$ ${Math.abs(difference).toFixed(2)} a mais este mês`
              }
            </p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
