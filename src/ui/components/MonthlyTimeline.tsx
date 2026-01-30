/**
 * COMPONENTE: MonthlyTimeline
 * Timeline mensal com previsões e status visual (verde/amarelo/vermelho)
 */

'use client';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { TrendUp, TrendDown, Minus } from '@/ui/icons';
import GlassCard from './GlassCard';

interface MonthData {
  month: Date;
  expectedBalance: number;
  income: number;
  expenses: number;
  status: 'healthy' | 'warning' | 'critical';
  confidence: number;
}

interface MonthlyTimelineProps {
  months: MonthData[];
  showDetails?: boolean;
}

export default function MonthlyTimeline({ months, showDetails = false }: MonthlyTimelineProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    if (status === 'healthy') return 'bg-primary border-primary/30 text-primary';
    if (status === 'warning') return 'bg-primary border-primary/30 text-primary';
    return 'bg-primary border-primary/30 text-primary';
  };

  const getStatusBg = (status: string) => {
    if (status === 'healthy') return 'bg-primary/10';
    if (status === 'warning') return 'bg-primary/10';
    return 'bg-primary/10';
  };

  return (
    <GlassCard className="overflow-hidden">
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">Previsão Mensal</h3>
          <p className="text-sm text-white/60">Projeção dos próximos {months.length} meses</p>
        </div>

        {/* Timeline */}
        <div className="space-y-3">
          {months.map((month, index) => {
            const monthName = format(month.month, 'MMM', { locale: ptBR });
            const monthYear = format(month.month, 'yyyy');
            const netChange = month.income - month.expenses;
            const trend = netChange > 0 ? 'up' : netChange < 0 ? 'down' : 'neutral';

            return (
              <div
                key={index}
                className={`relative p-4 rounded-xl border transition-all hover:scale-[1.01] ${getStatusBg(month.status)} ${getStatusColor(month.status)}`}
              >
                <div className="flex items-center justify-between">
                  {/* Month Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-center min-w-[60px]">
                      <p className="text-xs uppercase opacity-60">{monthName}</p>
                      <p className="text-2xl font-bold font-mono">{format(month.month, 'MM')}</p>
                      {index === 0 && (
                        <span className="text-xs opacity-60">atual</span>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-mono text-lg font-semibold">
                          {formatCurrency(month.expectedBalance)}
                        </span>
                        {trend !== 'neutral' && (
                          <span className="text-xs flex items-center gap-1 opacity-80">
                            {trend === 'up' ? <TrendUp size={12} /> : <TrendDown size={12} />}
                            {formatCurrency(Math.abs(netChange))}
                          </span>
                        )}
                      </div>
                      
                      {showDetails && (
                        <div className="flex gap-4 text-xs opacity-60">
                          <span>↑ {formatCurrency(month.income)}</span>
                          <span>↓ {formatCurrency(month.expenses)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Confidence Badge */}
                  <div className="text-right">
                    <div className="text-xs opacity-60 mb-1">confiança</div>
                    <div className="text-sm font-semibold">{month.confidence}%</div>
                  </div>
                </div>

                {/* Status Indicator Line */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${
                  month.status === 'healthy' ? 'bg-primary' :
                  month.status === 'warning' ? 'bg-primary' :
                  'bg-primary'
                }`} />
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 pt-2 text-xs text-white/60">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span>Saudável</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span>Atenção</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span>Crítico</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
