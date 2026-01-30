/**
 * CARD: Alerta Principal
 * Mostra o alerta mais importante do momento
 */

'use client';

import { Warning, Info } from '@/ui/icons';
import GlassCard from './GlassCard';

interface AlertCardProps {
  message: string | null;
  type?: 'warning' | 'info';
}

export default function AlertCard({ message, type = 'warning' }: AlertCardProps) {
  if (!message) {
    return (
      <GlassCard>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <Info size={20} weight="bold" className="text-primary" />
          </div>
          <div>
            <p className="font-medium text-white">Tudo certo por aqui!</p>
            <p className="text-sm text-white/60">Não há alertas no momento</p>
          </div>
        </div>
      </GlassCard>
    );
  }

  const isWarning = type === 'warning';

  return (
    <GlassCard>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${isWarning ? 'bg-primary/20' : 'bg-primary/20'}`}>
          {isWarning ? (
            <Warning size={20} weight="bold" className="text-primary" />
          ) : (
            <Info size={20} className="text-primary" />
          )}
        </div>
        <div className="flex-1">
          <p className={`font-medium ${isWarning ? 'text-primary' : 'text-primary'}`}>
            {isWarning ? 'Atenção' : 'Informação'}
          </p>
          <p className="text-sm text-white/60 mt-1">
            {message}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
