/**
 * DOMAIN LAYER - Serviços de Negócio
 * Regras financeiras validadas e lógica pura
 */

import { FinancialProfile, ForecastScenario, HealthScore, Transaction } from '../entities/finance.entity';
import { addMonths, startOfMonth } from 'date-fns';

export class ForecastService {
  /**
   * Calcula previsão financeira para os próximos N meses
   */
  static calculateForecast(profile: FinancialProfile, months: number = 6): ForecastScenario[] {
    const scenarios: ForecastScenario[] = [];
    let currentBalance = profile.currentBalance;

    for (let i = 0; i < months; i++) {
      const targetMonth = addMonths(startOfMonth(new Date()), i);
      
      // Calcula receitas esperadas
      const expectedIncome = this.calculateExpectedIncome(profile, targetMonth);
      
      // Calcula despesas esperadas (fixas + estimativa de variáveis)
      const expectedExpenses = this.calculateExpectedExpenses(profile, targetMonth);
      
      // Projeta saldo
      const projectedBalance = currentBalance + expectedIncome - expectedExpenses;
      
      // Define status baseado no saldo projetado
      const status = this.determineStatus(projectedBalance, expectedIncome);
      
      // Confiança diminui com o tempo (mais longe = menos certeza)
      const confidence = Math.max(50, 95 - (i * 8));

      scenarios.push({
        month: targetMonth,
        expectedBalance: projectedBalance,
        income: expectedIncome,
        expenses: expectedExpenses,
        status,
        confidence,
      });

      currentBalance = projectedBalance;
    }

    return scenarios;
  }

  private static calculateExpectedIncome(profile: FinancialProfile, month: Date): number {
    // Renda mensal base
    let income = profile.monthlyIncome;

    // Adiciona transações recorrentes de entrada no mês
    const recurrentIncome = profile.transactions
      .filter(t => t.type === 'income' && t.recurrent)
      .reduce((sum, t) => sum + t.amount, 0);

    return income + recurrentIncome;
  }

  private static calculateExpectedExpenses(profile: FinancialProfile, month: Date): number {
    // Despesas fixas
    let expenses = profile.fixedExpenses;

    // Pagamento de passivos (dívidas)
    const liabilitiesPayment = profile.liabilities
      .reduce((sum, l) => sum + l.monthlyPayment, 0);

    // Estimativa de despesas variáveis (média dos últimos 3 meses)
    const avgVariableExpenses = profile.variableExpenses;

    return expenses + liabilitiesPayment + avgVariableExpenses;
  }

  private static determineStatus(balance: number, income: number): 'healthy' | 'warning' | 'critical' {
    const ratio = income > 0 ? balance / income : 0;

    if (balance < 0) return 'critical';
    if (ratio < 0.5) return 'warning';
    return 'healthy';
  }
}

export class HealthScoreService {
  /**
   * Calcula score de saúde financeira (0-100)
   */
  static calculateHealthScore(profile: FinancialProfile): HealthScore {
    let score = 50; // Base neutra
    const tips: string[] = [];

    // 1. Saldo positivo (+20 pontos)
    if (profile.currentBalance > 0) {
      score += 20;
    } else {
      score -= 20;
      tips.push('Trabalhe para sair do vermelho');
    }

    // 2. Reserva de emergência (3-6 meses de despesas)
    const monthlyExpenses = profile.fixedExpenses + profile.variableExpenses;
    const emergencyMonths = monthlyExpenses > 0 ? profile.currentBalance / monthlyExpenses : 0;

    if (emergencyMonths >= 6) {
      score += 20;
    } else if (emergencyMonths >= 3) {
      score += 10;
      tips.push('Aumente sua reserva de emergência para 6 meses');
    } else {
      tips.push('Crie uma reserva de emergência (mínimo 3 meses)');
    }

    // 3. Taxa de endividamento (< 30% da renda)
    const totalDebt = profile.liabilities.reduce((sum, l) => sum + l.monthlyPayment, 0);
    const debtRatio = profile.monthlyIncome > 0 ? (totalDebt / profile.monthlyIncome) * 100 : 0;

    if (debtRatio < 30) {
      score += 15;
    } else if (debtRatio < 50) {
      score += 5;
      tips.push('Reduza suas dívidas para menos de 30% da renda');
    } else {
      score -= 15;
      tips.push('Nível de endividamento crítico - priorize pagar dívidas');
    }

    // 4. Capacidade de poupança (sobra > 20% da renda)
    const netIncome = profile.monthlyIncome - monthlyExpenses - totalDebt;
    const savingsRate = profile.monthlyIncome > 0 ? (netIncome / profile.monthlyIncome) * 100 : 0;

    if (savingsRate >= 20) {
      score += 15;
    } else if (savingsRate >= 10) {
      score += 5;
      tips.push('Tente poupar pelo menos 20% da sua renda');
    } else if (savingsRate < 0) {
      score -= 10;
      tips.push('Você está gastando mais do que ganha');
    } else {
      tips.push('Aumente sua taxa de poupança');
    }

    // Limita o score entre 0 e 100
    score = Math.max(0, Math.min(100, score));

    // Define nível e mensagem
    const { level, color, message } = this.getScoreLevel(score);

    return {
      score: Math.round(score),
      level,
      color,
      message,
      tips: tips.slice(0, 3), // Máximo 3 dicas
    };
  }

  private static getScoreLevel(score: number): {
    level: 'excelente' | 'bom' | 'atenção' | 'crítico';
    color: 'green' | 'yellow' | 'red';
    message: string;
  } {
    if (score >= 80) {
      return {
        level: 'excelente',
        color: 'green',
        message: 'Sua saúde financeira está excelente! Continue assim.',
      };
    }
    if (score >= 60) {
      return {
        level: 'bom',
        color: 'green',
        message: 'Você está no caminho certo. Vamos melhorar ainda mais?',
      };
    }
    if (score >= 40) {
      return {
        level: 'atenção',
        color: 'yellow',
        message: 'Alguns ajustes são necessários para equilibrar suas finanças.',
      };
    }
    return {
      level: 'crítico',
      color: 'red',
      message: 'Sua situação precisa de atenção urgente. Vamos começar pelos passos básicos.',
    };
  }
}

export class InsightsService {
  /**
   * Gera insights e feedbacks humanos baseados em dados
   */
  static generateMainAlert(profile: FinancialProfile, forecast: ForecastScenario[]): string | null {
    // Verifica se vai ficar negativo nos próximos 3 meses
    const criticalMonths = forecast.slice(0, 3).filter(s => s.status === 'critical');
    
    if (criticalMonths.length > 0) {
      const firstCritical = criticalMonths[0];
      const monthName = this.getMonthName(firstCritical.month);
      return `Atenção: seu saldo pode ficar negativo em ${monthName}`;
    }

    // Verifica grande queda no saldo
    const currentBalance = profile.currentBalance;
    const threeMonthsBalance = forecast[2]?.expectedBalance || 0;
    const drop = ((currentBalance - threeMonthsBalance) / currentBalance) * 100;

    if (drop > 50) {
      return 'Seu saldo pode cair mais de 50% nos próximos 3 meses';
    }

    return null;
  }

  static suggestNextAction(healthScore: HealthScore, profile: FinancialProfile): string {
    if (healthScore.tips.length > 0) {
      return healthScore.tips[0];
    }

    // Ações padrão baseadas no nível
    if (healthScore.level === 'crítico') {
      return 'Revise seus gastos e identifique o que pode ser cortado';
    }
    if (healthScore.level === 'atenção') {
      return 'Organize suas despesas fixas e crie um orçamento mensal';
    }
    if (healthScore.level === 'bom') {
      return 'Considere investir o dinheiro que você está poupando';
    }
    return 'Continue acompanhando sua evolução financeira';
  }

  private static getMonthName(date: Date): string {
    const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
                    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    return months[date.getMonth()];
  }
}
