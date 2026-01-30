/**
 * Tipos para Análise Financeira Detalhada
 * Integração com o sistema Python de estatísticas
 */

export interface CategoryExpense {
  category: string;
  total: number;
  percentage: number;
  transactionsCount: number;
}

export interface FinancialOverview {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
}

export interface FinancialDetailedData {
  overview: FinancialOverview;
  categories: CategoryExpense[];
  highestCategory: CategoryExpense;
  insights: string[];
  predictions: {
    month1: number;
    month2: number;
    month3: number;
  };
}

export interface AxisIndexWithFinancials {
  score: number;
  status: string;
  financialData: FinancialDetailedData;
}
