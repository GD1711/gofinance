"use client";

import { motion } from 'framer-motion';
import { Shield, Lock, Unlock } from 'lucide-react';

interface ProtocolStatusCardProps {
  status: 'reached' | 'in_progress' | 'incomplete';
  maturityLevel: 'maduro' | 'desenvolvendo' | 'aprendendo' | 'iniciante';
  maturityScore: number;
  periodsCompleted: number;
  totalPeriods: number;
  interpretation: string;
  onViewDetails?: () => void;
}

/**
 * Card de Status do Protocolo
 * Não mostra números diretos. Revela significado.
 */
export default function ProtocolStatusCard({
  status,
  maturityLevel,
  maturityScore,
  periodsCompleted,
  totalPeriods,
  interpretation,
  onViewDetails,
}: ProtocolStatusCardProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'reached':
        return {
          label: 'PROTOCOLO_COMPLETO',
          color: 'emerald',
          icon: '✓',
        };
      case 'in_progress':
        return {
          label: 'PROTOCOLO_EM_OPERAÇÃO',
          color: 'blue',
          icon: '◆',
        };
      default:
        return {
          label: 'PROTOCOLO_INICIADO',
          color: 'zinc',
          icon: '○',
        };
    }
  };

  const getMaturityConfig = () => {
    const configs = {
      maduro: {
        label: 'MATURIDADE_CONSOLIDADA',
        color: 'emerald',
        unlocked: true,
      },
      desenvolvendo: {
        label: 'MATURIDADE_EM_DESENVOLVIMENTO',
        color: 'blue',
        unlocked: false,
      },
      aprendendo: {
        label: 'FASE_DE_APRENDIZADO',
        color: 'purple',
        unlocked: false,
      },
      iniciante: {
        label: 'PROTOCOLO_INICIAL',
        color: 'zinc',
        unlocked: false,
      },
    };
    return configs[maturityLevel];
  };

  const statusConfig = getStatusConfig();
  const maturityConfig = getMaturityConfig();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      <div className="relative bg-black border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-all duration-300">
        {/* Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_50%,rgba(255,255,255,0.01)_50%)] bg-[length:100%_4px] pointer-events-none" />

        {/* Header */}
        <div className="relative border-b border-zinc-800 px-6 py-4 bg-zinc-950">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <Shield className="w-4 h-4 text-zinc-600" />
              </div>
              <div>
                <div className="font-mono text-xs text-zinc-600 tracking-wider">
                  BASE_FINANCEIRA.SYS
                </div>
                <div className={`font-mono text-sm text-${statusConfig.color}-400 mt-1`}>
                  {statusConfig.label}
                </div>
              </div>
            </div>
            
            <div className={`font-mono text-2xl text-${statusConfig.color}-400`}>
              {statusConfig.icon}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6 space-y-6">
          {/* Linha do tempo visual (sem números) */}
          <div className="space-y-2">
            <div className="font-mono text-xs text-zinc-600 uppercase tracking-wider">
              PROGRESSÃO_TEMPORAL
            </div>
            <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(periodsCompleted / totalPeriods) * 100}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className={`h-full bg-gradient-to-r from-${statusConfig.color}-600 to-${statusConfig.color}-400`}
              />
            </div>
            <div className="flex justify-between text-xs font-mono text-zinc-700">
              <span>INÍCIO</span>
              <span>CONCLUSÃO</span>
            </div>
          </div>

          {/* Interpretação narrativa */}
          <div className="space-y-2">
            <div className="font-mono text-xs text-zinc-600 uppercase tracking-wider">
              ANÁLISE_COMPORTAMENTAL
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed font-mono">
              {interpretation}
            </p>
          </div>

          {/* Nível de maturidade */}
          <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800">
            <div className="space-y-1">
              <div className="font-mono text-xs text-zinc-600">
                NÍVEL_ATUAL
              </div>
              <div className={`font-mono text-sm text-${maturityConfig.color}-400`}>
                {maturityConfig.label}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {maturityConfig.unlocked ? (
                <>
                  <Unlock className="w-5 h-5 text-emerald-500" />
                  <span className="font-mono text-xs text-emerald-500">
                    DESBLOQUEADO
                  </span>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 text-zinc-600" />
                  <span className="font-mono text-xs text-zinc-600">
                    BLOQUEADO
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Indicador de precisão (sutil) */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1 bg-zinc-900">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${maturityScore * 100}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className={`h-full bg-${maturityConfig.color}-500`}
              />
            </div>
            <span className="font-mono text-xs text-zinc-600">
              PRECISÃO: {Math.round(maturityScore * 100)}%
            </span>
          </div>
        </div>

        {/* Footer */}
        {onViewDetails && (
          <div className="relative border-t border-zinc-800 px-6 py-3 bg-zinc-950">
            <button
              onClick={onViewDetails}
              className="font-mono text-xs text-zinc-600 hover:text-zinc-400 uppercase tracking-wider transition-colors"
            >
              [ EXIBIR_DADOS_COMPLETOS ]
            </button>
          </div>
        )}

        {/* Glow effect on hover */}
        <div className={`absolute inset-0 bg-gradient-to-r from-${statusConfig.color}-500/0 via-${statusConfig.color}-500/0 to-${statusConfig.color}-500/0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
      </div>
    </motion.div>
  );
}
