"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { FinancialGoalPlannerService } from '@/domain/services/financial-goal-planner.service';
import type { FinancialChallenge } from '@/domain/types/financial-planning.types';

interface CreateChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (challenge: FinancialChallenge) => void;
}

/**
 * Modal para criar um novo desafio financeiro
 * Interface limpa e intuitiva para definir meta e duração
 */
export default function CreateChallengeModal({
  isOpen,
  onClose,
  onCreate,
}: CreateChallengeModalProps) {
  const [step, setStep] = useState(1);
  const [targetAmount, setTargetAmount] = useState('');
  const [months, setMonths] = useState('');
  const [strategyType, setStrategyType] = useState<'linear' | 'progressive'>('progressive');
  const [monthlyIncome, setMonthlyIncome] = useState('');

  const handleCreate = () => {
    const amount = parseFloat(targetAmount);
    const duration = parseInt(months);
    
    if (isNaN(amount) || isNaN(duration) || amount <= 0 || duration <= 0) {
      alert('Por favor, preencha todos os campos corretamente');
      return;
    }

    const challenge = FinancialGoalPlannerService.generateChallenge(
      amount,
      duration,
      strategyType === 'linear'
    );

    onCreate(challenge);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setStep(1);
    setTargetAmount('');
    setMonths('');
    setStrategyType('progressive');
    setMonthlyIncome('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Análise de viabilidade
  const getViabilityAnalysis = () => {
    const amount = parseFloat(targetAmount);
    const duration = parseInt(months);
    const income = parseFloat(monthlyIncome);

    if (isNaN(amount) || isNaN(duration) || isNaN(income)) return null;

    return FinancialGoalPlannerService.isRealisticGoal(amount, duration, income, 0.3);
  };

  const viability = getViabilityAnalysis();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl"
            >
              <div className="relative bg-gradient-to-br from-zinc-900 via-neutral-900 to-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="relative p-6 border-b border-zinc-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center border border-amber-500/30">
                        <Target className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">Criar Novo Desafio</h2>
                        <p className="text-sm text-zinc-400">Defina sua meta e construa disciplina</p>
                      </div>
                    </div>
                    <button
                      onClick={handleClose}
                      className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                      <X className="w-5 h-5 text-zinc-400" />
                    </button>
                  </div>

                  {/* Progress Steps */}
                  <div className="flex items-center gap-2 mt-6">
                    {[1, 2, 3].map((s) => (
                      <div
                        key={s}
                        className={`flex-1 h-1 rounded-full transition-all ${
                          s <= step ? 'bg-amber-500' : 'bg-zinc-800'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {/* Step 1: Meta */}
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div>
                          <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-3">
                            <DollarSign className="w-4 h-4 text-amber-400" />
                            Qual sua meta?
                          </label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-lg">
                              R$
                            </span>
                            <input
                              type="number"
                              value={targetAmount}
                              onChange={(e) => setTargetAmount(e.target.value)}
                              placeholder="10.000"
                              className="w-full pl-12 pr-4 py-4 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white text-lg placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:bg-zinc-800 transition-all"
                            />
                          </div>
                          <p className="text-xs text-zinc-500 mt-2">
                            Defina um valor realista baseado nos seus objetivos
                          </p>
                        </div>

                        <div>
                          <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-3">
                            <Calendar className="w-4 h-4 text-amber-400" />
                            Em quanto tempo?
                          </label>
                          <input
                            type="number"
                            value={months}
                            onChange={(e) => setMonths(e.target.value)}
                            placeholder="9"
                            className="w-full px-4 py-4 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white text-lg placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:bg-zinc-800 transition-all"
                          />
                          <p className="text-xs text-zinc-500 mt-2">
                            Número de meses para alcançar a meta
                          </p>
                        </div>

                        <button
                          onClick={() => setStep(2)}
                          disabled={!targetAmount || !months}
                          className="w-full px-6 py-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-600 text-white font-medium rounded-xl transition-all duration-300 disabled:cursor-not-allowed"
                        >
                          Continuar →
                        </button>
                      </motion.div>
                    )}

                    {/* Step 2: Estratégia */}
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">
                            Escolha sua estratégia
                          </h3>
                          <p className="text-sm text-zinc-400 mb-6">
                            Ambas alcançam a meta. Escolha a que faz mais sentido para você.
                          </p>
                        </div>

                        <div className="space-y-4">
                          {/* Progressivo */}
                          <button
                            onClick={() => setStrategyType('progressive')}
                            className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                              strategyType === 'progressive'
                                ? 'border-purple-500 bg-purple-500/10'
                                : 'border-zinc-800 bg-zinc-800/30 hover:border-zinc-700'
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-purple-500/30 flex-shrink-0">
                                <TrendingUp className="w-6 h-6 text-purple-400" />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-white font-semibold mb-1">Desafio Progressivo</h4>
                                <p className="text-sm text-zinc-400 mb-3">
                                  Comece pequeno e aumente gradualmente
                                </p>
                                <div className="flex items-center gap-2">
                                  {strategyType === 'progressive' && (
                                    <span className="text-xs px-2 py-1 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">
                                      Selecionado
                                    </span>
                                  )}
                                  <span className="text-xs text-zinc-500">
                                    Ideal para criar hábito
                                  </span>
                                </div>
                              </div>
                            </div>
                          </button>

                          {/* Linear */}
                          <button
                            onClick={() => setStrategyType('linear')}
                            className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                              strategyType === 'linear'
                                ? 'border-blue-500 bg-blue-500/10'
                                : 'border-zinc-800 bg-zinc-800/30 hover:border-zinc-700'
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/30 flex-shrink-0">
                                <Target className="w-6 h-6 text-blue-400" />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-white font-semibold mb-1">Plano Linear</h4>
                                <p className="text-sm text-zinc-400 mb-3">
                                  Valor fixo todo mês
                                </p>
                                <div className="flex items-center gap-2">
                                  {strategyType === 'linear' && (
                                    <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                      Selecionado
                                    </span>
                                  )}
                                  <span className="text-xs text-zinc-500">
                                    Previsível e constante
                                  </span>
                                </div>
                              </div>
                            </div>
                          </button>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => setStep(1)}
                            className="flex-1 px-6 py-4 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 font-medium rounded-xl transition-all"
                          >
                            ← Voltar
                          </button>
                          <button
                            onClick={() => setStep(3)}
                            className="flex-1 px-6 py-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-medium rounded-xl transition-all duration-300"
                          >
                            Continuar →
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Confirmação */}
                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">
                            Análise de viabilidade
                          </h3>
                          <p className="text-sm text-zinc-400 mb-6">
                            Opcional: informe sua renda mensal para uma recomendação personalizada
                          </p>
                        </div>

                        <div>
                          <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-3">
                            <DollarSign className="w-4 h-4 text-amber-400" />
                            Renda mensal (opcional)
                          </label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                              R$
                            </span>
                            <input
                              type="number"
                              value={monthlyIncome}
                              onChange={(e) => setMonthlyIncome(e.target.value)}
                              placeholder="3.000"
                              className="w-full pl-12 pr-4 py-4 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:bg-zinc-800 transition-all"
                            />
                          </div>
                        </div>

                        {/* Análise de viabilidade */}
                        {viability && (
                          <div className={`p-4 rounded-xl border ${
                            viability.realistic
                              ? 'bg-emerald-500/10 border-emerald-500/30'
                              : 'bg-amber-500/10 border-amber-500/30'
                          }`}>
                            <div className="flex items-start gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                viability.realistic
                                  ? 'bg-emerald-500/20'
                                  : 'bg-amber-500/20'
                              }`}>
                                {viability.realistic ? '✓' : '⚠'}
                              </div>
                              <div className="flex-1">
                                <div className={`text-sm font-semibold mb-1 ${
                                  viability.realistic ? 'text-emerald-400' : 'text-amber-400'
                                }`}>
                                  {viability.realistic ? 'Meta viável' : 'Atenção'}
                                </div>
                                <p className="text-sm text-zinc-300 mb-2">
                                  {viability.recommendation}
                                </p>
                                <div className="text-xs text-zinc-400">
                                  Valor mensal necessário: R$ {viability.monthlyRequired.toFixed(2)} ({viability.percentOfIncome.toFixed(1)}% da renda)
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Resumo */}
                        <div className="p-6 bg-zinc-800/30 rounded-xl border border-zinc-800">
                          <h4 className="text-white font-semibold mb-4">Resumo do desafio</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-zinc-400">Meta</span>
                              <span className="text-white font-semibold">R$ {parseFloat(targetAmount).toLocaleString('pt-BR')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-400">Duração</span>
                              <span className="text-white font-semibold">{months} meses</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-400">Estratégia</span>
                              <span className="text-white font-semibold">
                                {strategyType === 'progressive' ? 'Progressivo' : 'Linear'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => setStep(2)}
                            className="flex-1 px-6 py-4 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 font-medium rounded-xl transition-all"
                          >
                            ← Voltar
                          </button>
                          <button
                            onClick={handleCreate}
                            className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30"
                          >
                            Criar desafio ✓
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
