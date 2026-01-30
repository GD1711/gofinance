/**
 * Financial Goal Planner Service
 * 
 * Sistema de planejamento financeiro educacional baseado em:
 * - Progressão aritmética
 * - Metas por período
 * - Constância e disciplina
 * 
 * Não faz previsões especulativas. Apenas cálculos determinísticos
 * para educação financeira e fundo de emergência.
 */

import {
  FinancialGoalPlan,
  LinearPlan,
  ProgressiveChallenge,
  FinancialChallenge,
  ChallengeProgress,
} from '../types/financial-planning.types';

export class FinancialGoalPlannerService {
  /**
   * Cria um plano linear simples
   * Divide o valor alvo igualmente pelos meses
   */
  static createLinearPlan(targetAmount: number, months: number): LinearPlan {
    const monthlyAverage = targetAmount / months;
    
    return {
      type: 'linear',
      months,
      monthlyAverage: Math.round(monthlyAverage * 100) / 100,
      target: targetAmount,
      targetAmount,
    };
  }

  /**
   * Cria um desafio progressivo baseado em progressão aritmética
   * 
   * Fórmula: Soma = n/2 × (primeiro + último)
   * 
   * @param targetAmount - Valor alvo total
   * @param months - Duração em meses
   * @param startValue - Valor inicial (padrão: 1)
   * @param increment - Incremento por período (padrão: 1)
   * @param maxIncrement - Valor máximo permitido (padrão: 500)
   */
  static createProgressiveChallenge(
    targetAmount: number,
    months: number,
    startValue: number = 1,
    increment: number = 1,
    maxIncrement: number = 500
  ): ProgressiveChallenge {
    const values: number[] = [];
    let current = startValue;

    for (let i = 0; i < months; i++) {
      values.push(current);
      current = Math.min(current + increment, maxIncrement);
    }

    const totalAccumulated = values.reduce((sum, val) => sum + val, 0);
    const goalReached = totalAccumulated >= targetAmount;

    return {
      type: 'progressive',
      values,
      totalAccumulated,
      goalReached,
      startValue,
      increment,
      maxIncrement,
      targetAmount,
      months,
    };
  }

  /**
   * Calcula um desafio progressivo ajustado para atingir exatamente a meta
   * Usa progressão aritmética otimizada
   */
  static createOptimizedProgressiveChallenge(
    targetAmount: number,
    months: number
  ): ProgressiveChallenge {
    // Fórmula da progressão aritmética: Soma = n/2 × (primeiro + último)
    // Resolvendo para criar uma progressão que atinja exatamente o target
    
    // Começamos pequeno e calculamos o incremento ideal
    const startValue = 1;
    
    // Para progressão aritmética: S = n/2 × (2a + (n-1)d)
    // Onde S = soma, n = termos, a = primeiro termo, d = diferença
    // Resolvendo para d: d = (2S/n - 2a) / (n-1)
    
    const optimalIncrement = Math.max(
      1,
      Math.round((2 * targetAmount / months - 2 * startValue) / (months - 1))
    );

    const values: number[] = [];
    let current = startValue;

    for (let i = 0; i < months; i++) {
      values.push(current);
      current = current + optimalIncrement;
    }

    // Ajuste fino: se ultrapassou muito, reduz os últimos valores
    let totalAccumulated = values.reduce((sum, val) => sum + val, 0);
    
    if (totalAccumulated > targetAmount * 1.2) {
      // Recalcula com incremento menor
      return this.createOptimizedProgressiveChallenge(
        targetAmount,
        months
      );
    }

    const goalReached = totalAccumulated >= targetAmount;

    return {
      type: 'progressive',
      values,
      totalAccumulated,
      goalReached,
      startValue,
      increment: optimalIncrement,
      maxIncrement: values[values.length - 1],
      targetAmount,
      months,
    };
  }

  /**
   * Calcula o progresso atual de um desafio
   */
  static calculateProgress(
    challenge: FinancialChallenge,
    actualValues: number[]
  ): ChallengeProgress[] {
    const progress: ChallengeProgress[] = [];
    let accumulated = 0;

    challenge.plan.values?.forEach((expectedValue, index) => {
      const actualValue = actualValues[index] || 0;
      accumulated += actualValue;

      const percentComplete = (accumulated / challenge.targetAmount) * 100;

      progress.push({
        month: index + 1,
        expectedValue,
        actualValue,
        accumulated,
        percentComplete: Math.min(100, Math.round(percentComplete)),
      });
    });

    return progress;
  }

  /**
   * Calcula taxa de constância
   * Mede o quão consistente o usuário foi com o plano
   * Retorna valor entre 0 e 1
   */
  static calculateConsistencyRate(
    expectedValues: number[],
    actualValues: number[]
  ): number {
    if (expectedValues.length === 0) return 0;

    let totalDeviation = 0;
    let totalExpected = 0;

    expectedValues.forEach((expected, index) => {
      const actual = actualValues[index] || 0;
      totalDeviation += Math.abs(expected - actual);
      totalExpected += expected;
    });

    if (totalExpected === 0) return 0;

    const deviationRate = totalDeviation / totalExpected;
    const consistencyRate = Math.max(0, 1 - deviationRate);

    return Math.round(consistencyRate * 100) / 100;
  }

  /**
   * Calcula margem de segurança
   * Quanto % acima da meta o usuário deveria ter
   */
  static calculateSafetyMargin(
    targetAmount: number,
    marginPercent: number = 20
  ): number {
    return targetAmount * (1 + marginPercent / 100);
  }

  /**
   * Gera um desafio completo baseado nos parâmetros
   */
  static generateChallenge(
    targetAmount: number,
    months: number,
    useLarge: boolean = false
  ): FinancialChallenge {
    const plan = useLarge
      ? this.createLinearPlan(targetAmount, months)
      : this.createOptimizedProgressiveChallenge(targetAmount, months);

    return {
      id: `challenge-${Date.now()}`,
      title: useLarge ? 'Plano Linear' : 'Desafio Progressivo',
      description: useLarge
        ? 'Meta dividida igualmente por período'
        : 'Comece pequeno e aumente gradualmente',
      targetAmount,
      duration: months,
      plan,
      progress: 0,
      currentMonth: 1,
      startDate: new Date(),
      accepted: false,
    };
  }

  /**
   * Analisa se a meta é realista baseada na renda
   */
  static isRealisticGoal(
    targetAmount: number,
    months: number,
    monthlyIncome: number,
    maxSavingsRate: number = 0.3 // 30% da renda
  ): {
    realistic: boolean;
    monthlyRequired: number;
    percentOfIncome: number;
    recommendation: string;
  } {
    const monthlyRequired = targetAmount / months;
    const percentOfIncome = (monthlyRequired / monthlyIncome) * 100;
    const realistic = percentOfIncome <= maxSavingsRate * 100;

    let recommendation = '';
    
    if (!realistic) {
      const suggestedMonths = Math.ceil(targetAmount / (monthlyIncome * maxSavingsRate));
      recommendation = `Sugerimos estender para ${suggestedMonths} meses para manter sustentabilidade.`;
    } else if (percentOfIncome < 10) {
      recommendation = 'Meta confortável. Considere aumentar para acelerar resultados.';
    } else {
      recommendation = 'Meta equilibrada. Possível com disciplina.';
    }

    return {
      realistic,
      monthlyRequired: Math.round(monthlyRequired * 100) / 100,
      percentOfIncome: Math.round(percentOfIncome * 100) / 100,
      recommendation,
    };
  }
}
