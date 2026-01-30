/**
 * SERVIÇO: Análise Financeira Inteligente
 * "Cérebro do app" - Normalização, Projeção, Índice, Intervenção
 */

import {
  FinancialData,
  MonthlyBalance,
  FinancialAxisIndex,
  FinancialAnalysis,
  Intervention,
  RecurringIncome,
  FixedExpense,
  VariableExpense,
  Debt,
} from '@/domain/types/financial-data.types';

export class FinancialAnalyzerService {
  /**
   * PASSO 1: NORMALIZAÇÃO
   * Transforma tudo em fluxo mensal previsível
   */
  private normalizeIncome(data: FinancialData): number {
    let monthlyIncome = 0;

    // Normalizar rendas recorrentes
    data.income.recurring.forEach((income: RecurringIncome) => {
      if (!income.isActive) return;

      switch (income.frequency) {
        case 'monthly':
          monthlyIncome += income.amount;
          break;
        case 'biweekly':
          monthlyIncome += (income.amount * 26) / 12; // 26 quinzenas/ano
          break;
        case 'weekly':
          monthlyIncome += (income.amount * 52) / 12; // 52 semanas/ano
          break;
      }
    });

    // Adicionar outras entradas
    monthlyIncome += data.income.other;

    return monthlyIncome;
  }

  private normalizeExpenses(data: FinancialData): {
    fixed: number;
    variable: number;
    total: number;
  } {
    // Gastos fixos
    const fixed = data.expenses.fixed
      .filter((expense: FixedExpense) => expense.isActive)
      .reduce((sum, expense) => sum + expense.amount, 0);

    // Média de gastos variáveis
    const variable = data.expenses.variable.reduce(
      (sum, expense) => sum + expense.averageAmount,
      0
    );

    return {
      fixed,
      variable,
      total: fixed + variable,
    };
  }

  private normalizeDebts(data: FinancialData): {
    monthlyPayment: number;
    totalDebt: number;
    weightedInterest: number;
  } {
    const monthlyPayment = data.debts.reduce(
      (sum, debt) => sum + debt.installmentAmount,
      0
    );

    const totalDebt = data.debts.reduce(
      (sum, debt) => sum + debt.totalAmount,
      0
    );

    // Juros ponderado pela dívida total
    const weightedInterest = data.debts.reduce(
      (sum, debt) => sum + (debt.interestRate * debt.totalAmount) / totalDebt,
      0
    );

    return {
      monthlyPayment,
      totalDebt,
      weightedInterest,
    };
  }

  /**
   * PASSO 2: PROJEÇÃO NO TEMPO
   * Simula mês atual, +3 meses, +6 meses
   */
  private projectBalance(
    data: FinancialData,
    monthsAhead: number
  ): MonthlyBalance {
    const income = this.normalizeIncome(data);
    const expenses = this.normalizeExpenses(data);
    const debts = this.normalizeDebts(data);

    // Calcular tendência de gasto variável
    const variableTrend = this.calculateVariableTrend(data.expenses.variable);

    // Projetar gastos variáveis com tendência
    const projectedVariable = expenses.variable * (1 + variableTrend * monthsAhead);

    const totalExpenses = expenses.fixed + projectedVariable;
    const netBalance = income - totalExpenses - debts.monthlyPayment;

    // Calcular saldo acumulado projetado
    const projectedBalance = netBalance * monthsAhead;

    // Confiança da projeção (diminui com o tempo)
    const confidence = Math.max(95 - monthsAhead * 5, 50);

    const targetMonth = new Date();
    targetMonth.setMonth(targetMonth.getMonth() + monthsAhead);

    return {
      month: targetMonth,
      totalIncome: income,
      totalExpenses,
      debtPayments: debts.monthlyPayment,
      netBalance,
      projectedBalance,
      confidence,
    };
  }

  private calculateVariableTrend(expenses: VariableExpense[]): number {
    // Tendência média (-0.1 a +0.1 por mês)
    const trends = expenses.map((exp) => {
      if (exp.trend === 'increasing') return 0.05;
      if (exp.trend === 'decreasing') return -0.03;
      return 0;
    });

    if (trends.length === 0) return 0;
    return trends.reduce((sum: number, trend) => sum + trend, 0) / trends.length;
  }

  /**
   * PASSO 3: ÍNDICE DO EIXO FINANCEIRO
   * Calcula score invisível baseado em fatores-chave
   */
  private calculateAxisIndex(
    data: FinancialData,
    current: MonthlyBalance,
    future: MonthlyBalance
  ): FinancialAxisIndex {
    const income = this.normalizeIncome(data);
    const expenses = this.normalizeExpenses(data);
    const debts = this.normalizeDebts(data);

    // 1. % da renda comprometida (gastos + dívidas)
    const incomeCommitment =
      ((expenses.total + debts.monthlyPayment) / income) * 100;

    // 2. % destinada à reserva (meta: 15% da renda)
    const reserveAllocation =
      (data.goals.emergencyFund.monthlyContribution / income) * 100;

    // 3. Peso das dívidas (relação dívida/renda anual)
    const debtWeight = (debts.totalDebt / (income * 12)) * 100;

    // 4. Tendência do saldo futuro
    const futureTrend: 'positive' | 'neutral' | 'negative' =
      future.netBalance > current.netBalance * 1.1
        ? 'positive'
        : future.netBalance < current.netBalance * 0.9
        ? 'negative'
        : 'neutral';

    // Calcular score final (0-100)
    let score = 100;

    // Penalizar comprometimento excessivo
    if (incomeCommitment > 80) score -= 30;
    else if (incomeCommitment > 70) score -= 20;
    else if (incomeCommitment > 60) score -= 10;

    // Bonificar reserva adequada
    if (reserveAllocation >= 15) score += 10;
    else if (reserveAllocation >= 10) score += 5;
    else if (reserveAllocation < 5) score -= 15;

    // Penalizar dívidas pesadas
    if (debtWeight > 50) score -= 25;
    else if (debtWeight > 30) score -= 15;
    else if (debtWeight > 15) score -= 5;

    // Ajustar por tendência futura
    if (futureTrend === 'positive') score += 10;
    else if (futureTrend === 'negative') score -= 15;

    // Garantir range 0-100
    score = Math.max(0, Math.min(100, score));

    // Definir status baseado no sistema único de classificação
    let status: 'stable' | 'warning' | 'critical';
    let color: 'green' | 'yellow' | 'red';

    if (score >= 70) {
      status = 'stable';    // 🟢 Estável
      color = 'green';
    } else if (score >= 40) {
      status = 'warning';   // 🟡 Em Risco  
      color = 'yellow';
    } else {
      status = 'critical';  // 🔴 Fora do Eixo
      color = 'red';
    }

    return {
      score,
      status,
      color,
      factors: {
        incomeCommitment,
        reserveAllocation,
        debtWeight,
        futureTrend,
      },
    };
  }

  /**
   * PASSO 4: INTERVENÇÃO INTELIGENTE
   * Gera orientações baseadas em psicologia comportamental
   */
  private generateIntervention(
    axisIndex: FinancialAxisIndex,
    current: MonthlyBalance,
    future: MonthlyBalance,
    data: FinancialData
  ): Intervention {
    const { status, factors } = axisIndex;

    // FORA DO EIXO - Ação corretiva urgente (mas gradual)
    if (status === 'critical') {
      if (future.netBalance < 0) {
        return {
          type: 'corrective',
          message: `Seus gastos estão acima da renda. Em ${Math.abs(
            Math.round(future.projectedBalance / current.netBalance)
          )} meses o saldo ficará negativo.`,
          microAction: `Reduza R$ ${Math.abs(future.netBalance).toFixed(
            0
          )} em gastos variáveis este mês (escolha apenas 1 categoria).`,
          impact: 'Evita entrada no vermelho e mantém estabilidade',
          priority: 'high',
        };
      }

      if (factors.debtWeight > 50) {
        return {
          type: 'corrective',
          message: 'Suas dívidas estão pesando muito no orçamento.',
          microAction: 'Priorize pagar a dívida com maior juros primeiro.',
          impact: 'Libera renda para outras prioridades',
          priority: 'high',
        };
      }
    }

    // EM RISCO - Ação preventiva
    if (status === 'warning') {
      if (factors.reserveAllocation < 10) {
        const suggestedAmount = Math.round(current.totalIncome * 0.1);
        return {
          type: 'preventive',
          message: 'Sua reserva de emergência precisa crescer.',
          microAction: `Guarde R$ ${suggestedAmount} este mês (apenas este valor, nada mais).`,
          impact: 'Constrói proteção financeira gradualmente',
          priority: 'medium',
        };
      }

      if (factors.incomeCommitment > 70) {
        return {
          type: 'preventive',
          message: 'Mais de 70% da sua renda está comprometida.',
          microAction:
            'Escolha 1 gasto variável e reduza 10% apenas nele este mês.',
          impact: 'Aumenta margem de segurança',
          priority: 'medium',
        };
      }
    }

    // ESTÁVEL - Motivação e manutenção
    return {
      type: 'motivational',
      message: 'Você está no eixo financeiro! Parabéns.',
      microAction: 'Continue assim. Sua disciplina está gerando previsibilidade.',
      impact: 'Mantém estabilidade e constrói futuro seguro',
      priority: 'low',
    };
  }

  /**
   * ANÁLISE COMPLETA
   * Método principal que executa todos os passos
   */
  public analyze(data: FinancialData): FinancialAnalysis {
    // Projeções
    const current = this.projectBalance(data, 0);
    const month3 = this.projectBalance(data, 3);
    const month6 = this.projectBalance(data, 6);

    // Índice do Eixo
    const axisIndex = this.calculateAxisIndex(data, current, month3);

    // Identificar gargalos
    const bottlenecks = this.identifyBottlenecks(data);

    // Capacidade de poupança
    const savingCapacity = this.calculateSavingCapacity(data, current);

    // Intervenção
    const intervention = this.generateIntervention(
      axisIndex,
      current,
      month3,
      data
    );

    // Gamificação
    const gamification = this.calculateGamification(data, current);

    return {
      currentBalance: current,
      projections: {
        month3,
        month6,
      },
      axisIndex,
      bottlenecks,
      savingCapacity,
      intervention,
      gamification,
    };
  }

  private identifyBottlenecks(data: FinancialData) {
    const income = this.normalizeIncome(data);
    const expenses = this.normalizeExpenses(data);

    const categories: { category: string; amount: number }[] = [];

    // Adicionar gastos fixos por categoria
    const fixedByCategory = data.expenses.fixed.reduce((acc, exp) => {
      if (!exp.isActive) return acc;
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {} as Record<string, number>);

    Object.entries(fixedByCategory).forEach(([category, amount]) => {
      categories.push({ category: `Fixo: ${category}`, amount });
    });

    // Adicionar gastos variáveis
    data.expenses.variable.forEach((exp) => {
      categories.push({
        category: `Variável: ${exp.category}`,
        amount: exp.averageAmount,
      });
    });

    // Ordenar por maior gasto
    categories.sort((a, b) => b.amount - a.amount);

    // Retornar top 3 com sugestões
    return categories.slice(0, 3).map((cat) => ({
      category: cat.category,
      amount: cat.amount,
      percentage: (cat.amount / income) * 100,
      suggestion: this.getSuggestionForCategory(cat.category, cat.amount),
    }));
  }

  private getSuggestionForCategory(category: string, amount: number): string {
    if (category.includes('housing')) {
      return 'Moradia é essencial, mas revise se há custos extras reduzíveis.';
    }
    if (category.includes('groceries')) {
      return 'Planeje compras semanais e evite desperdícios.';
    }
    if (category.includes('leisure')) {
      return 'Lazer é importante, mas pode ser ajustado sem sacrificar qualidade.';
    }
    if (category.includes('subscriptions')) {
      return 'Cancele assinaturas não utilizadas frequentemente.';
    }
    return 'Avalie se este gasto pode ser otimizado gradualmente.';
  }

  private calculateSavingCapacity(
    data: FinancialData,
    current: MonthlyBalance
  ) {
    const potential = Math.max(0, current.netBalance);
    const currentSavings = data.goals.emergencyFund.monthlyContribution;

    const blockers: string[] = [];
    if (current.debtPayments > current.totalIncome * 0.3) {
      blockers.push('Dívidas consomem mais de 30% da renda');
    }
    if (current.totalExpenses > current.totalIncome * 0.7) {
      blockers.push('Gastos acima de 70% da renda');
    }
    if (data.expenses.variable.some((e) => e.trend === 'increasing')) {
      blockers.push('Gastos variáveis em tendência de alta');
    }

    return {
      current: currentSavings,
      potential,
      blockers,
    };
  }

  private calculateGamification(
    data: FinancialData,
    current: MonthlyBalance
  ) {
    // Streak: meses positivos (simulado - deveria vir do histórico)
    const streak = current.netBalance > 0 ? 3 : 0;

    // Progresso da reserva
    const reserveProgress = Math.min(
      100,
      (data.goals.emergencyFund.currentAmount /
        data.goals.emergencyFund.targetAmount) *
        100
    );

    // Conquistas
    const achievements: string[] = [];
    if (reserveProgress >= 25) achievements.push('25% da reserva conquistada');
    if (streak >= 3) achievements.push('3 meses positivos consecutivos');
    if (current.netBalance > 0) achievements.push('Saldo positivo este mês');

    return {
      streak,
      reserveProgress,
      achievements,
    };
  }
}

// Instância singleton
export const financialAnalyzer = new FinancialAnalyzerService();
