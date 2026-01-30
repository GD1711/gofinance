"use client";

import { motion } from 'framer-motion';
import { TrendingUp, Zap, Award } from 'lucide-react';
import type { ProgressiveChallenge } from '@/domain/types/financial-planning.types';

interface ProgressiveChallengeCardProps {
  challenge: ProgressiveChallenge;
  currentMonth: number;
  onSelectStrategy?: () => void;
}

/**
 * Card de Estratégia Progressiva
 * Mostra evolução sem valores diários
 * Foca na curva de crescimento e disciplina
 */
export default function ProgressiveChallengeCard({
  challenge,
  currentMonth,
  onSelectStrategy,
}: ProgressiveChallengeCardProps) {
  const maxValue = Math.max(...challenge.values);
  const currentValue = challenge.values[currentMonth - 1] || challenge.startValue;
  const nextValue = challenge.values[currentMonth] || currentValue;

  // Calcula a taxa de crescimento
  const growthRate = ((nextValue - currentValue) / currentValue) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      <div className="relative bg-gradient-to-br from-purple-950/30 via-indigo-950/30 to-blue-950/30 backdrop-blur-xl rounded-2xl border border-purple-800/30 p-6 overflow-hidden hover:border-purple-700/50 transition-all duration-300">
        {/* Efeito de brilho */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-transparent to-blue-500/0 group-hover:from-purple-500/5 group-hover:to-blue-500/5 transition-all duration-500" />

        {/* Cabeçalho */}
        <div className="relative flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-purple-500/30">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                Desafio Progressivo
              </h3>
              <p className="text-sm text-zinc-400 mt-0.5">
                Comece pequeno, cresça gradualmente
              </p>
            </div>
          </div>
        </div>

        {/* Visualização da curva de crescimento */}
        <div className="relative mb-6 h-32 flex items-end gap-1 px-2">
          {challenge.values.slice(0, 12).map((value, index) => {
            const height = (value / maxValue) * 100;
            const isPast = index < currentMonth - 1;
            const isCurrent = index === currentMonth - 1;
            const isFuture = index >= currentMonth;

            return (
              <motion.div
                key={index}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: `${height}%`, opacity: 1 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="relative flex-1 rounded-t-sm group/bar"
              >
                <div
                  className={`
                    w-full h-full rounded-t-sm transition-all duration-300
                    ${isPast ? 'bg-gradient-to-t from-purple-600 to-purple-400 opacity-60' : ''}
                    ${isCurrent ? 'bg-gradient-to-t from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/50' : ''}
                    ${isFuture ? 'bg-gradient-to-t from-zinc-700 to-zinc-600 opacity-30' : ''}
                    group-hover/bar:opacity-100
                  `}
                />
                
                {/* Tooltip no hover */}
                {index < challenge.values.length && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      Mês {index + 1}: R$ {value}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Legenda do gráfico */}
        <div className="relative flex items-center justify-between text-xs text-zinc-500 mb-6 px-2">
          <span>Início</span>
          <span className="text-center">Evolução mensal</span>
          <span>Meta</span>
        </div>

        {/* Estatísticas principais */}
        <div className="relative grid grid-cols-3 gap-4 mb-6">
          <div className="space-y-1">
            <div className="text-xs text-zinc-500">Início</div>
            <div className="text-lg font-bold text-purple-400">
              R$ {challenge.startValue}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-zinc-500">Atual</div>
            <div className="text-lg font-bold text-blue-400">
              R$ {currentValue}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-zinc-500">Máximo</div>
            <div className="text-lg font-bold text-cyan-400">
              R$ {challenge.maxIncrement}
            </div>
          </div>
        </div>

        {/* Informações de crescimento */}
        <div className="relative space-y-3 mb-4">
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-zinc-300">Incremento mensal</span>
            </div>
            <span className="text-sm font-semibold text-white">
              +R$ {challenge.increment}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-zinc-300">Total acumulado</span>
            </div>
            <span className="text-sm font-semibold text-white">
              R$ {challenge.totalAccumulated.toLocaleString('pt-BR')}
            </span>
          </div>
        </div>

        {/* Indicador de meta */}
        {challenge.goalReached && (
          <div className="relative flex items-center gap-2 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/30 mb-4">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <span className="text-emerald-400 text-lg">✓</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-emerald-400">
                Meta alcançável
              </div>
              <div className="text-xs text-emerald-500/70">
                Este plano atinge o objetivo
              </div>
            </div>
          </div>
        )}

        {/* Explicação simples */}
        <div className="relative pt-4 border-t border-zinc-800/50">
          <p className="text-sm text-zinc-400 leading-relaxed mb-4">
            Você começa pequeno. A cada período, o valor aumenta.
            <br />
            Não porque você pode mais, mas porque você{' '}
            <span className="text-purple-400 font-medium">aprende mais</span>.
          </p>

          {onSelectStrategy && (
            <button
              onClick={onSelectStrategy}
              className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium text-sm rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
            >
              Escolher esta estratégia →
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
