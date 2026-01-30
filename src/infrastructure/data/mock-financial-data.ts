/**
 * MOCK DATA: Dados de exemplo para demonstração
 */

import { FinancialData } from '@/domain/types/financial-data.types';

export const mockFinancialData: FinancialData = {
  userId: 'user_demo',
  income: {
    recurring: [
      {
        id: '1',
        name: 'Salário CLT',
        amount: 4500,
        frequency: 'monthly',
        startDate: new Date('2025-01-01'),
        isActive: true,
      },
      {
        id: '2',
        name: 'Freelance',
        amount: 800,
        frequency: 'monthly',
        startDate: new Date('2025-01-01'),
        isActive: true,
      },
    ],
    other: 200, // Entradas extras médias
  },
  expenses: {
    fixed: [
      {
        id: '1',
        name: 'Aluguel',
        amount: 1200,
        dueDay: 10,
        category: 'housing',
        isActive: true,
      },
      {
        id: '2',
        name: 'Internet + TV',
        amount: 150,
        dueDay: 5,
        category: 'utilities',
        isActive: true,
      },
      {
        id: '3',
        name: 'Academia',
        amount: 120,
        dueDay: 15,
        category: 'other',
        isActive: true,
      },
      {
        id: '4',
        name: 'Netflix + Spotify',
        amount: 50,
        dueDay: 1,
        category: 'subscriptions',
        isActive: true,
      },
    ],
    variable: [
      {
        category: 'groceries',
        averageAmount: 800,
        lastMonthAmount: 850,
        trend: 'stable',
      },
      {
        category: 'transport',
        averageAmount: 300,
        lastMonthAmount: 280,
        trend: 'stable',
      },
      {
        category: 'leisure',
        averageAmount: 400,
        lastMonthAmount: 520,
        trend: 'increasing',
      },
      {
        category: 'health',
        averageAmount: 200,
        lastMonthAmount: 150,
        trend: 'stable',
      },
    ],
  },
  debts: [
    {
      id: '1',
      name: 'Cartão de Crédito',
      totalAmount: 3200,
      installmentAmount: 400,
      interestRate: 2.5, // % ao mês
      remainingMonths: 8,
      dueDay: 8,
      type: 'credit_card',
    },
    {
      id: '2',
      name: 'Financiamento Moto',
      totalAmount: 8000,
      installmentAmount: 350,
      interestRate: 1.2,
      remainingMonths: 24,
      dueDay: 20,
      type: 'financing',
    },
  ],
  goals: {
    emergencyFund: {
      targetAmount: 13500, // 3 meses de despesas
      currentAmount: 2800,
      monthlyContribution: 300,
    },
    goals: [
      {
        id: '1',
        name: 'Viagem para Europa',
        targetAmount: 8000,
        currentAmount: 1200,
        deadline: new Date('2026-12-01'),
        priority: 'medium',
        category: 'travel',
      },
      {
        id: '2',
        name: 'Curso de Inglês',
        targetAmount: 2500,
        currentAmount: 800,
        deadline: new Date('2026-06-01'),
        priority: 'high',
        category: 'other',
      },
    ],
  },
  updatedAt: new Date(),
};
