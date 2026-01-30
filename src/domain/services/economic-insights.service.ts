/**
 * SERVIÇO: EconomicInsightsService
 * Geração de insights financeiros baseados em economia comportamental
 * 
 * PRINCÍPIOS:
 * - Feedback não punitivo (evita linguagem negativa)
 * - Mensagens acionáveis (o que fazer, não só o problema)
 * - Baseado em thresholds validados (10%, 15%, 20% poupança)
 */

export type RiskLevel = 'low' | 'medium' | 'high';

export interface FinancialInsight {
  canSaveTarget: boolean;
  riskLevel: RiskLevel;
  message: string;
  suggestion?: string;
}

/**
 * Calcula o nível de risco financeiro
 * Baseado em:
 * - Saldo previsto vs renda
 * - Tendência dos últimos meses
 * - Capacidade de poupança
 */
export function calculateRiskLevel(
  predictedBalance: number,
  predictedIncome: number,
  realMonths: any[]
): RiskLevel {
  const balanceRatio = predictedBalance / predictedIncome;
  
  // Analisa tendência: gastos estão crescendo?
  const lastThreeExpenses = realMonths.slice(-3).map(m => m.expenses);
  const isExpenseGrowing = lastThreeExpenses.length >= 2 && 
    lastThreeExpenses[lastThreeExpenses.length - 1] > lastThreeExpenses[0];

  // RISCO ALTO: saldo negativo ou menos de 5% da renda
  if (predictedBalance < 0 || balanceRatio < 0.05) {
    return 'high';
  }

  // RISCO MÉDIO: saldo entre 5-10% da renda OU gastos crescendo
  if (balanceRatio < 0.10 || isExpenseGrowing) {
    return 'medium';
  }

  // RISCO BAIXO: saldo acima de 10% da renda
  return 'low';
}

/**
 * Gera insights automáticos baseados em economia comportamental
 * 
 * ESTRATÉGIA:
 * 1. Diagnóstico claro (situação atual)
 * 2. Ação concreta (o que fazer)
 * 3. Motivação positiva (sem culpa)
 */
export function generateInsights(
  predictedBalance: number,
  suggestedSavings: number,
  balanceAfterSavings: number,
  realisticSavings: number,
  canSaveTarget: boolean,
  riskLevel: RiskLevel,
  targetRate: number
): FinancialInsight {
  const targetPercent = Math.round(targetRate * 100);

  // 🟢 CENÁRIO 1: Consegue guardar a meta tranquilamente
  if (canSaveTarget && balanceAfterSavings > 500) {
    return {
      canSaveTarget: true,
      riskLevel,
      message: `Você consegue guardar R$ ${Math.round(suggestedSavings)} (${targetPercent}%) sem apertar.`,
      suggestion: `Considere aumentar para ${targetPercent + 5}% e construir reserva de emergência.`
    };
  }

  // 🟡 CENÁRIO 2: Consegue guardar, mas fica apertado
  if (canSaveTarget && balanceAfterSavings >= 0) {
    return {
      canSaveTarget: true,
      riskLevel,
      message: `Guardar ${targetPercent}% é possível, mas deixa pouca margem (R$ ${Math.round(balanceAfterSavings)}).`,
      suggestion: `Tente reduzir R$ 200-300 em gastos variáveis para ter mais folga.`
    };
  }

  // 🔴 CENÁRIO 3: Não comporta a meta (poupança forçada causaria vermelho)
  if (!canSaveTarget && predictedBalance > 0) {
    const savingsPercent = Math.round((realisticSavings / predictedBalance) * 100);
    return {
      canSaveTarget: false,
      riskLevel,
      message: `Guardar ${targetPercent}% colocaria você no vermelho.`,
      suggestion: `Comece com R$ ${Math.round(realisticSavings)} (${savingsPercent}% do saldo). Corte gastos aos poucos.`
    };
  }

  // 🔴 CENÁRIO 4: Vai entrar no vermelho (saldo negativo)
  if (predictedBalance < 0) {
    const deficit = Math.abs(predictedBalance);
    return {
      canSaveTarget: false,
      riskLevel: 'high',
      message: `Próximo mês entra no vermelho (falta R$ ${Math.round(deficit)}).`,
      suggestion: `Urgente: identifique onde cortar despesas. Priorize essenciais.`
    };
  }

  // 🟡 CENÁRIO 5: Saldo zero ou muito baixo (risco iminente)
  return {
    canSaveTarget: false,
    riskLevel: 'high',
    message: `Saldo previsto é muito baixo (R$ ${Math.round(predictedBalance)}).`,
    suggestion: `Evite novos gastos e crie buffer mínimo de R$ 500.`
  };
}

/**
 * Classifica a taxa de poupança (baseado em estudos OECD)
 */
export function classifySavingsRate(rate: number): string {
  if (rate >= 0.20) return 'excelente';
  if (rate >= 0.15) return 'saudável';
  if (rate >= 0.10) return 'aceitável';
  return 'crítico';
}

/**
 * Calcula quanto precisa reduzir em gastos para atingir meta
 */
export function calculateExpenseReduction(
  currentExpenses: number,
  currentIncome: number,
  targetSavingsRate: number
): number {
  const targetExpenses = currentIncome * (1 - targetSavingsRate);
  return Math.max(0, currentExpenses - targetExpenses);
}
