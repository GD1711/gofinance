/**
 * CARD: Próxima Ação
 * Sugere a próxima ação mais importante
 */

'use client';

import { ArrowRight, Target } from '@/ui/icons';
import GlassCard from './GlassCard';

interface NextActionCardProps {
  action: string;
  onClick?: () => void;
}

export default function NextActionCard({ action, onClick }: NextActionCardProps) {
  return (
    <GlassCard hover={!!onClick} onClick={onClick}>
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 rounded-lg bg-primary/20">
            <Target size={20} className="text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-white/60 mb-1">Próxima ação sugerida</p>
            <p className="font-medium text-white">{action}</p>
          </div>
        </div>
        {onClick && (
          <ArrowRight size={20} className="text-white/40 flex-shrink-0 ml-2" />
        )}
      </div>
    </GlassCard>
  );
}
