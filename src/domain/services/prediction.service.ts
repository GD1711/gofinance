/**
 * SERVIÇO: PredictionService
 * Sistema de previsão e orientação financeira baseado em princípios econômicos validados
 * 
 * FUNDAMENTOS ECONÔMICOS:
 * 1. Média móvel ponderada (Time Series Economics)
 *    - Usado em projeções financeiras e consumo familiar
 *    - Dá mais peso aos meses recentes (comportamento muda com o tempo)
 * 
 * 2. Regra da poupança forçada (Pay Yourself First)
 *    - Princípio clássico: poupança vem ANTES do consumo
 *    - Protege contra gastar 100% da renda
 * 
 * 3. Taxa de poupança saudável (OECD / Estudos US/EU)
 *    - < 10% = risco financeiro
 *    - 10-20% = saudável
 *    - > 20% = excelente
 * 
 * 4. Economia comportamental
 *    - Feedback simples e acionável
 *    - Alertas não punitivos
 *    - Aumenta adesão e reduz abandono
 * 
 * MÉTODO: Ajuste Progressivo de Consumo (APC)
 * - Diagnóstico: quanto sobra vs quanto deveria ser guardado
 * - Ajuste realista: se não comporta meta, sugere poupança menor
 * - Regra de ouro: nunca deixar saldo final zerar
 */

export interface MonthFinancialData {
  month: string;
  monthNumber: number; // 0-11 (JAN=0, DEZ=11)
  income: number;
  expenses: number;
  isReal: boolean; // true = dados reais, false = previsão
}

export interface PredictionResult {
  predictedIncome: number;
  predictedExpenses: number;
  predictedBalance: number;
  
  // NOVOS CAMPOS ECONÔMICOS
  suggestedSavings: number; // Poupança sugerida (padrão 15%)
  balanceAfterSavings: number; // Saldo após guardar a poupança sugerida
  savingsRate: number; // Taxa aplicada (0.10 = 10%, 0.15 = 15%, 0.20 = 20%)
  realisticSavings: number; // Poupança ajustada se a meta for inviável
  
  status: 'positive' | 'negative' | 'neutral';
  confidence: number; // 0-100%
  
  // INSIGHTS AUTOMÁTICOS
  insights: {
    canSaveTarget: boolean; // Consegue guardar a meta sem entrar no vermelho?
    riskLevel: 'low' | 'medium' | 'high'; // Risco financeiro
    message: string; // Feedback acionável
    suggestion?: string; // Ação concreta a tomar
  };
}

/**
 * Calcula média móvel ponderada
 * Dá mais peso aos valores recentes (peso cresce linearmente)
 * 
 * Exemplo: [100, 200, 300]
 * Pesos: 1, 2, 3
 * Resultado: (100×1 + 200×2 + 300×3) / (1+2+3) = 233.33
 */
export function weightedAverage(values: number[]): number {
  if (values.length === 0) return 0;
  
  const weights = values.map((_, i) => i + 1);
  const weightedSum = values.reduce((sum, val, i) => sum + val * weights[i], 0);
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  
  return weightedSum / totalWeight;
}

/**
 * Calcula a confiança da previsão baseada na quantidade de dados
 * 1 mês = 40% | 2 meses = 60% | 3 meses = 75% | 4+ meses = 85%
 */
export function calculateConfidence(monthCount: number): number {
  if (monthCount <= 0) return 0;
  if (monthCount === 1) return 40;
  if (monthCount === 2) return 60;
  if (monthCount === 3) return 75;
  return 85; // 4+ meses
}

/**
 * Calcula o nível de risco financeiro
 * Baseado em: saldo/renda ratio + tendência de gastos
 */
function calculateRiskLevel(
  predictedBalance: number,
  predictedIncome: number,
  realMonths: MonthFinancialData[]
): 'low' | 'medium' | 'high' {
  const balanceRatio = predictedBalance / predictedIncome;
  
  // Analisa se gastos estão crescendo
  const lastThreeExpenses = realMonths.slice(-3).map(m => m.expenses);
  const isExpenseGrowing = lastThreeExpenses.length >= 2 && 
    lastThreeExpenses[lastThreeExpenses.length - 1] > lastThreeExpenses[0];

  if (predictedBalance < 0 || balanceRatio < 0.05) return 'high';
  if (balanceRatio < 0.10 || isExpenseGrowing) return 'medium';
  return 'low';
}

/**
 * Gera insights automáticos baseados em economia comportamental
 * ESTRATÉGIA: Diagnóstico claro + Ação concreta + Motivação positiva
 */
function generateInsights(
  predictedBalance: number,
  suggestedSavings: number,
  balanceAfterSavings: number,
  realisticSavings: number,
  canSaveTarget: boolean,
  riskLevel: 'low' | 'medium' | 'high',
  targetRate: number
): {
  canSaveTarget: boolean;
  riskLevel: 'low' | 'medium' | 'high';
  message: string;
  suggestion?: string;
} {
  const targetPercent = Math.round(targetRate * 100);

  // 🟢 Consegue guardar tranquilamente
  if (canSaveTarget && balanceAfterSavings > 500) {
    return {
      canSaveTarget: true,
      riskLevel,
      message: `Você consegue guardar R$ ${Math.round(suggestedSavings).toLocaleString('pt-BR')} (${targetPercent}%) sem apertar.`,
      suggestion: `Considere aumentar para ${targetPercent + 5}% e construir reserva de emergência.`
    };
  }

  // 🟡 Consegue guardar, mas fica apertado
  if (canSaveTarget && balanceAfterSavings >= 0) {
    return {
      canSaveTarget: true,
      riskLevel,
      message: `Guardar ${targetPercent}% é possível, mas deixa pouca margem (R$ ${Math.round(balanceAfterSavings).toLocaleString('pt-BR')}).`,
      suggestion: `Tente reduzir R$ 200-300 em gastos variáveis para ter mais folga.`
    };
  }

  // 🔴 Não comporta a meta
  if (!canSaveTarget && predictedBalance > 0) {
    const savingsPercent = Math.round((realisticSavings / predictedBalance) * 100);
    return {
      canSaveTarget: false,
      riskLevel,
      message: `Guardar ${targetPercent}% colocaria você no vermelho.`,
      suggestion: `Comece com R$ ${Math.round(realisticSavings).toLocaleString('pt-BR')} (${savingsPercent}% do saldo). Corte gastos aos poucos.`
    };
  }

  // 🔴 Vai entrar no vermelho
  if (predictedBalance < 0) {
    const deficit = Math.abs(predictedBalance);
    return {
      canSaveTarget: false,
      riskLevel: 'high',
      message: `Próximo mês entra no vermelho (falta R$ ${Math.round(deficit).toLocaleString('pt-BR')}).`,
      suggestion: `Urgente: identifique onde cortar despesas. Priorize essenciais.`
    };
  }

  // 🟡 Saldo muito baixo
  return {
    canSaveTarget: false,
    riskLevel: 'high',
    message: `Saldo previsto é muito baixo (R$ ${Math.round(predictedBalance).toLocaleString('pt-BR')}).`,
    suggestion: `Evite novos gastos e crie buffer mínimo de R$ 500.`
  };
}

/**
 * Prevê o próximo mês com orientação econômica
 * Aplica: média ponderada + poupança forçada + insights comportamentais
 * 
 * @param realMonths - Apenas meses com dados reais
 * @param targetSavingsRate - Taxa de poupança desejada (padrão 0.15 = 15%)
 */
export function predictNextMonth(
  realMonths: MonthFinancialData[], 
  targetSavingsRate: number = 0.15
): PredictionResult {
  const incomes = realMonths.map(m => m.income);
  const expenses = realMonths.map(m => m.expenses);

  // 1️⃣ PREVISÃO BASE (média ponderada)
  const predictedIncome = weightedAverage(incomes);
  const predictedExpenses = weightedAverage(expenses);
  const predictedBalance = predictedIncome - predictedExpenses;

  // 2️⃣ POUPANÇA FORÇADA (Pay Yourself First)
  const suggestedSavings = predictedIncome * targetSavingsRate;
  const balanceAfterSavings = predictedBalance - suggestedSavings;

  // 3️⃣ AJUSTE PROGRESSIVO DE CONSUMO (APC)
  // Se a meta não é viável, sugere poupança realista
  const canSaveTarget = balanceAfterSavings >= 0;
  const realisticSavings = canSaveTarget 
    ? suggestedSavings 
    : Math.max(0, predictedBalance * 0.5); // Guarda 50% do saldo se não comporta meta

  // 4️⃣ ANÁLISE DE RISCO
  const riskLevel = calculateRiskLevel(predictedBalance, predictedIncome, realMonths);

  // 5️⃣ INSIGHTS COMPORTAMENTAIS
  const insights = generateInsights(
    predictedBalance,
    suggestedSavings,
    balanceAfterSavings,
    realisticSavings,
    canSaveTarget,
    riskLevel,
    targetSavingsRate
  );

  const status = predictedBalance > 0 ? 'positive' : predictedBalance < 0 ? 'negative' : 'neutral';
  const confidence = calculateConfidence(realMonths.length);

  return {
    predictedIncome: Math.round(predictedIncome),
    predictedExpenses: Math.round(predictedExpenses),
    predictedBalance: Math.round(predictedBalance),
    suggestedSavings: Math.round(suggestedSavings),
    balanceAfterSavings: Math.round(balanceAfterSavings),
    savingsRate: targetSavingsRate,
    realisticSavings: Math.round(realisticSavings),
    status,
    confidence,
    insights
  };
}

/**
 * Gera previsões para o ano inteiro
 * Apenas o mês imediatamente após o atual recebe previsão
 * Demais meses futuros ficam com valores zerados
 */
export function calculateYearPredictions(
  currentMonthIndex: number,
  realData: MonthFinancialData[]
): MonthFinancialData[] {
  const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
  const result: MonthFinancialData[] = [];

  // Preenche dados reais e previsão
  const realMonths = realData.filter(m => m.isReal);
  const prediction = predictNextMonth(realMonths);

  for (let i = 0; i < 12; i++) {
    // Busca dado real
    const existingData = realData.find(m => m.monthNumber === i);

    if (existingData) {
      // Mês com dados reais
      result.push(existingData);
    } else if (i === currentMonthIndex + 1) {
      // Próximo mês: adiciona previsão
      result.push({
        month: months[i],
        monthNumber: i,
        income: prediction.predictedIncome,
        expenses: prediction.predictedExpenses,
        isReal: false
      });
    } else {
      // Meses futuros: zerados
      result.push({
        month: months[i],
        monthNumber: i,
        income: 0,
        expenses: 0,
        isReal: false
      });
    }
  }

  return result;
}

/**
 * Atualiza dados de um mês específico (imutável)
 */
export function updateMonthData(
  months: MonthFinancialData[],
  monthIndex: number,
  income: number,
  expenses: number
): MonthFinancialData[] {
  const existing = months.find(m => m.monthNumber === monthIndex);

  if (existing) {
    // Atualiza mês existente
    return months.map(m =>
      m.monthNumber === monthIndex
        ? { ...m, income, expenses, isReal: true }
        : m
    );
  } else {
    // Adiciona novo mês
    const monthNames = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
    return [
      ...months,
      {
        month: monthNames[monthIndex],
        monthNumber: monthIndex,
        income,
        expenses,
        isReal: true
      }
    ].sort((a, b) => a.monthNumber - b.monthNumber);
  }
}
