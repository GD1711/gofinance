/**
 * Mock de Dados Financeiros Detalhados
 * Gerado pelo sistema Python de análise
 */

import { FinancialDetailedData } from '@/domain/types/financial-overview.types';

export const mockFinancialOverview: FinancialDetailedData = {
  overview: {
    totalIncome: 3500.00,
    totalExpenses: 2347.80,
    balance: 1152.20,
    status: 'good'
  },
  categories: [
    {
      category: 'Aluguel',
      total: 1200.00,
      percentage: 51.1,
      transactionsCount: 1
    },
    {
      category: 'Alimentação',
      total: 620.50,
      percentage: 26.4,
      transactionsCount: 8
    },
    {
      category: 'Transporte',
      total: 280.00,
      percentage: 11.9,
      transactionsCount: 4
    },
    {
      category: 'Assinaturas',
      total: 147.30,
      percentage: 6.3,
      transactionsCount: 3
    },
    {
      category: 'Outros',
      total: 100.00,
      percentage: 4.3,
      transactionsCount: 2
    }
  ],
  highestCategory: {
    category: 'Aluguel',
    total: 1200.00,
    percentage: 51.1,
    transactionsCount: 1
  },
  insights: [
    '🔍 Maior gasto atual: Aluguel (51.1% do total)',
    '⚠️ Aluguel representa um gasto alto (51.1%)'
  ],
  predictions: {
    month1: 2304.40,
    month2: 3456.60,
    month3: 4608.80
  }
};
