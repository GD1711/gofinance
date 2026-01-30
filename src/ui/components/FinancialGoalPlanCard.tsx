"use client";

import { motion } from 'framer-motion';
import { Target, Calendar, TrendingUp } from 'lucide-react';
import type { FinancialChallenge } from '@/domain/types/financial-planning.types';

interface FinancialGoalPlanCardProps {
  challenge: FinancialChallenge;
  currentProgress: number; // 0-100
  onViewDetails?: () => void;
}

/**
 * Card de Meta Definida
 * Exibe valor alvo, período e status visual com barra de progresso
 * Linguagem simples, sem jargões técnicos
 */
export default function FinancialGoalPlanCard({
  challenge,
  currentProgress,
  onViewDetails,
}: FinancialGoalPlanCardProps) {
  const progressPercent = Math.min(100, Math.max(0, currentProgress));
  const isComplete = progressPercent >= 100;
  
  // Calcula tempo restante
  const monthsElapsed = challenge.currentMonth - 1;
  const monthsRemaining = challenge.duration - monthsElapsed;
  
  // Status baseado no progresso
  const getStatus = () => {
    if (isComplete) return { text: 'Completo', color: 'text-emerald-400' };
    if (progressPercent >= 75) return { text: 'Quase lá', color: 'text-amber-400' };
    if (progressPercent >= 50) return { text: 'No caminho', color: 'text-blue-400' };
    if (progressPercent >= 25) return { text: 'Progredindo', color: 'text-purple-400' };
    return { text: 'Começando', color: 'text-zinc-400' };
  };

  const status = getStatus();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      <div className="relative bg-gradient-to-br from-zinc-900/90 via-neutral-900/90 to-zinc-900/90 backdrop-blur-xl rounded-2xl border border-zinc-800/50 p-6 overflow-hidden hover:border-zinc-700/50 transition-all duration-300">
        {/* Brilho sutil no hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-transparent to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-amber-500/5 transition-all duration-500" />

        {/* Cabeçalho */}
        <div className="relative flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center border border-amber-500/30">
              <Target className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                {challenge.title}
              </h3>
              <p className="text-sm text-zinc-400 mt-0.5">
                {challenge.description}
              </p>
            </div>
          </div>
          
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${status.color} bg-white/5 border border-current/20`}>
            {status.text}
          </div>
        </div>

        {/* Meta e período */}
        <div className="relative grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <Target className="w-3.5 h-3.5" />
              <span>Meta</span>
            </div>
            <div className="text-2xl font-bold text-white">
              R$ {challenge.targetAmount.toLocaleString('pt-BR')}
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>Duração</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {challenge.duration} {challenge.duration === 1 ? 'mês' : 'meses'}
            </div>
          </div>
        </div>

        {/* Barra de progresso */}
        <div className="relative mb-4">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
            <span>Progresso</span>
            <span className="font-mono font-semibold text-white">
              {progressPercent.toFixed(0)}%
            </span>
          </div>
          
          {/* Trilha da barra */}
          <div className="relative h-3 bg-zinc-800/50 rounded-full overflow-hidden border border-zinc-700/50">
            {/* Preenchimento */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 rounded-full"
            />
            
            {/* Brilho animado */}
            <motion.div
              animate={{
                x: ['0%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Marcadores de progresso */}
          <div className="flex justify-between mt-2">
            <div className="text-xs text-zinc-600">Início</div>
            <div className="text-xs text-zinc-600">Meta</div>
          </div>
        </div>

        {/* Informações adicionais */}
        <div className="relative flex items-center justify-between pt-4 border-t border-zinc-800/50">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <TrendingUp className="w-4 h-4" />
            <span>
              {monthsRemaining > 0
                ? `${monthsRemaining} ${monthsRemaining === 1 ? 'mês' : 'meses'} restante${monthsRemaining === 1 ? '' : 's'}`
                : 'Período concluído'}
            </span>
          </div>

          {onViewDetails && (
            <button
              onClick={onViewDetails}
              className="text-sm text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              Ver detalhes →
            </button>
          )}
        </div>

        {/* Indicador visual de conquista */}
        {isComplete && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center border-2 border-emerald-400 shadow-lg shadow-emerald-500/50"
          >
            <span className="text-2xl">✓</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
