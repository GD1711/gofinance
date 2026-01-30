"use client";

import { motion } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';

interface InvestmentLockCardProps {
  periodsCompleted: number;
  periodsRequired: number;
  maturityScore: number;
  maturityRequired: number;
  isUnlocked: boolean;
  onUnlock?: () => void;
}

/**
 * Card de Módulo de Investimentos (Bloqueado/Desbloqueado)
 * Gamificação sutil através de desbloqueio baseado em mérito
 */
export default function InvestmentLockCard({
  periodsCompleted,
  periodsRequired,
  maturityScore,
  maturityRequired,
  isUnlocked,
  onUnlock,
}: InvestmentLockCardProps) {
  const periodsPending = Math.max(0, periodsRequired - periodsCompleted);
  const scorePercent = Math.round(maturityScore * 100);
  const requiredPercent = Math.round(maturityRequired * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <div className={`relative bg-black border ${isUnlocked ? 'border-emerald-800' : 'border-zinc-800'} overflow-hidden`}>
        {/* Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_50%,rgba(255,255,255,0.01)_50%)] bg-[length:100%_4px] pointer-events-none" />

        {/* Header */}
        <div className={`relative border-b ${isUnlocked ? 'border-emerald-900 bg-emerald-950/30' : 'border-zinc-800 bg-zinc-950'} px-6 py-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded border ${isUnlocked ? 'bg-emerald-950/50 border-emerald-800' : 'bg-zinc-900 border-zinc-800'} flex items-center justify-center`}>
                {isUnlocked ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', bounce: 0.5 }}
                  >
                    <ArrowRight className="w-4 h-4 text-emerald-500" />
                  </motion.div>
                ) : (
                  <Lock className="w-4 h-4 text-zinc-600" />
                )}
              </div>
              <div>
                <div className="font-mono text-xs text-zinc-600 tracking-wider">
                  MÓDULO_AVANÇADO
                </div>
                <div className={`font-mono text-sm ${isUnlocked ? 'text-emerald-400' : 'text-zinc-500'} mt-1`}>
                  {isUnlocked ? 'INVESTIMENTOS_DESBLOQUEADO' : 'INVESTIMENTOS_BLOQUEADO'}
                </div>
              </div>
            </div>
            
            <div className={`font-mono text-xs px-3 py-1 border ${isUnlocked ? 'border-emerald-800 text-emerald-500 bg-emerald-950/30' : 'border-zinc-800 text-zinc-600 bg-zinc-900'}`}>
              {isUnlocked ? 'ATIVO' : 'INATIVO'}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6 space-y-6">
          {!isUnlocked ? (
            <>
              {/* Mensagem protocolar quando bloqueado */}
              <div className="space-y-4">
                <div className="font-mono text-xs text-zinc-600 uppercase tracking-wider">
                  PRÉ-REQUISITOS_NECESSÁRIOS
                </div>
                
                <div className="space-y-3">
                  <div className="p-4 bg-zinc-950 border border-zinc-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs text-zinc-500">
                        BASE_FINANCEIRA_ESTABILIZADA
                      </span>
                      <span className={`font-mono text-xs ${periodsPending === 0 ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {periodsPending === 0 ? '✓ COMPLETO' : `${periodsPending} PERÍODO(S)`}
                      </span>
                    </div>
                    <div className="h-1 bg-zinc-900">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(periodsCompleted / periodsRequired) * 100}%` }}
                        transition={{ duration: 1 }}
                        className="h-full bg-amber-600"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-zinc-950 border border-zinc-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs text-zinc-500">
                        CONSTÂNCIA_VERIFICADA
                      </span>
                      <span className={`font-mono text-xs ${scorePercent >= requiredPercent ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {scorePercent >= requiredPercent ? '✓ ATINGIDO' : `${scorePercent}% / ${requiredPercent}%`}
                      </span>
                    </div>
                    <div className="h-1 bg-zinc-900">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(scorePercent / requiredPercent) * 100}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-amber-600"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Texto protocolar */}
              <div className="space-y-2 pt-4 border-t border-zinc-800">
                <p className="text-sm text-zinc-500 leading-relaxed font-mono">
                  Antes de investir dinheiro,<br />
                  prove que pode investir comportamento.
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Mensagem quando desbloqueado */}
              <div className="space-y-4">
                <div className="font-mono text-xs text-emerald-600 uppercase tracking-wider">
                  ACESSO_CONCEDIDO
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-mono text-emerald-500">
                    <span>✓</span>
                    <span>Base financeira consolidada</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-mono text-emerald-500">
                    <span>✓</span>
                    <span>Constância verificada</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-mono text-emerald-500">
                    <span>✓</span>
                    <span>Maturidade comportamental atingida</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-emerald-900/30">
                <p className="text-sm text-zinc-400 leading-relaxed font-mono">
                  Você formou um método.<br />
                  Agora pode aplicá-lo com risco controlado.
                </p>
                <p className="text-sm text-emerald-500 font-mono">
                  Bem-vindo ao próximo protocolo.
                </p>
              </div>

              {onUnlock && (
                <button
                  onClick={onUnlock}
                  className="w-full px-6 py-4 bg-emerald-900/30 hover:bg-emerald-900/50 text-emerald-400 font-mono text-sm tracking-wider border border-emerald-800 hover:border-emerald-700 transition-all duration-300 uppercase"
                >
                  [ Acessar_Módulo_Investimentos ]
                </button>
              )}
            </>
          )}
        </div>

        {/* Glow effect when unlocked */}
        {isUnlocked && (
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 pointer-events-none" />
        )}
      </div>
    </motion.div>
  );
}
