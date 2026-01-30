"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Plus } from 'lucide-react';
import FinancialChallengeModal from './FinancialChallengeModal';
import FinancialGoalPlanCard from './FinancialGoalPlanCard';
import ProgressiveChallengeCard from './ProgressiveChallengeCard';
import { FinancialGoalPlannerService } from '@/domain/services/financial-goal-planner.service';
import type { FinancialChallenge } from '@/domain/types/financial-planning.types';

/**
 * Seção Base Financeira
 * Sistema de planejamento educacional baseado em constância
 * Não faz previsões especulativas - apenas controle absoluto
 */
export default function FinancialBaseSection() {
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState<FinancialChallenge | null>(null);
  const [showStrategySelection, setShowStrategySelection] = useState(false);

  // Exemplo de desafio em andamento
  const exampleChallenge: FinancialChallenge = {
    id: 'challenge-1',
    title: 'Desafio Progressivo',
    description: 'Comece pequeno e aumente gradualmente',
    targetAmount: 10000,
    duration: 9,
    plan: FinancialGoalPlannerService.createOptimizedProgressiveChallenge(10000, 9),
    progress: 45,
    currentMonth: 4,
    startDate: new Date('2026-01-01'),
    accepted: true,
  };

  const handleAcceptChallenge = () => {
    setShowStrategySelection(true);
  };

  const handleSelectStrategy = () => {
    // Aqui você criaria um novo desafio
    const newChallenge = FinancialGoalPlannerService.generateChallenge(5000, 6, false);
    setActiveChallenge({ ...newChallenge, accepted: true });
    setShowStrategySelection(false);
  };

  const handleCreateNewChallenge = () => {
    setShowChallengeModal(true);
  };

  return (
    <section className="space-y-6">
      {/* Cabeçalho da seção */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center border border-amber-500/30">
            <Shield className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Base Financeira</h2>
            <p className="text-sm text-zinc-400">
              Construa controle antes de investir
            </p>
          </div>
        </div>

        <button
          onClick={handleCreateNewChallenge}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white text-sm font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30"
        >
          <Plus className="w-4 h-4" />
          Novo desafio
        </button>
      </div>

      {/* Descrição sutil */}
      <div className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800/50">
        <p className="text-sm text-zinc-400 leading-relaxed">
          Não depende de risco. Cria hábito. Ensina matemática financeira básica.
          <br />
          <span className="text-amber-400/80">Prepara você para investir depois.</span>
        </p>
      </div>

      {/* Desafio ativo */}
      {(activeChallenge?.accepted || exampleChallenge.accepted) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-white">Desafio Atual</h3>
          <FinancialGoalPlanCard
            challenge={activeChallenge || exampleChallenge}
            currentProgress={(activeChallenge || exampleChallenge).progress}
          />
        </motion.div>
      )}

      {/* Seleção de estratégia */}
      {showStrategySelection && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Escolha sua estratégia
            </h3>
            <p className="text-sm text-zinc-400">
              Ambas alcançam a meta. Escolha a que faz mais sentido para você.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Estratégia progressiva */}
            <ProgressiveChallengeCard
              challenge={FinancialGoalPlannerService.createOptimizedProgressiveChallenge(5000, 6)}
              currentMonth={1}
              onSelectStrategy={handleSelectStrategy}
            />

            {/* Estratégia linear */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative group"
            >
              <div className="relative bg-gradient-to-br from-zinc-900/90 via-neutral-900/90 to-zinc-900/90 backdrop-blur-xl rounded-2xl border border-zinc-800/50 p-6 overflow-hidden hover:border-zinc-700/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-blue-500/5 transition-all duration-500" />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/30">
                      <Shield className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Plano Linear</h3>
                      <p className="text-sm text-zinc-400 mt-0.5">
                        Valor fixo todo mês
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                      <span className="text-sm text-zinc-300">Valor mensal</span>
                      <span className="text-lg font-bold text-white">
                        R$ {(5000 / 6).toFixed(0)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                      <span className="text-sm text-zinc-300">Total acumulado</span>
                      <span className="text-lg font-bold text-white">R$ 5.000</span>
                    </div>
                  </div>

                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                    Mesma quantia todo período.
                    <br />
                    Previsível. Constante.{' '}
                    <span className="text-blue-400 font-medium">Disciplinado</span>.
                  </p>

                  <button
                    onClick={handleSelectStrategy}
                    className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium text-sm rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50"
                  >
                    Escolher esta estratégia →
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Estado vazio - incentiva criar primeiro desafio */}
      {!activeChallenge?.accepted && !exampleChallenge.accepted && !showStrategySelection && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative p-12 bg-gradient-to-br from-zinc-900/50 via-neutral-900/50 to-zinc-900/50 rounded-2xl border border-zinc-800/50 text-center"
        >
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center border border-amber-500/30">
              <Shield className="w-8 h-8 text-amber-400" />
            </div>
            
            <h3 className="text-xl font-semibold text-white">
              Pronto para começar?
            </h3>
            
            <p className="text-sm text-zinc-400 leading-relaxed">
              Antes das bolsas, antes dos gráficos...
              <br />
              havia apenas uma pergunta:
              <br />
              <span className="text-amber-400 italic">
                "Se eu guardar um pouco hoje, quem eu me torno amanhã?"
              </span>
            </p>

            <button
              onClick={handleCreateNewChallenge}
              className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/30"
            >
              Aceitar um desafio
            </button>
          </div>
        </motion.div>
      )}

      {/* Modal de desafio */}
      <FinancialChallengeModal
        isOpen={showChallengeModal}
        onClose={() => setShowChallengeModal(false)}
        onAccept={handleAcceptChallenge}
      />
    </section>
  );
}
