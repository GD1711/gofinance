/**
 * MOCK DATA - Dados de exemplo para desenvolvimento
 * Em produção, isso virá do backend
 */

import { FinancialProfile } from '@/domain/entities/finance.entity';

export const mockFinancialProfile: FinancialProfile = {
  userId: 'user-123',
  currentBalance: 4500,
  monthlyIncome: 5000,
  fixedExpenses: 2800,
  variableExpenses: 1200,
  assets: [
    {
      id: 'asset-1',
      name: 'Conta Corrente',
      type: 'cash',
      currentValue: 4500,
    },
    {
      id: 'asset-2',
      name: 'Investimentos',
      type: 'investment',
      currentValue: 12000,
      expectedReturn: 12,
      liquidityDays: 30,
    },
  ],
  liabilities: [
    {
      id: 'debt-1',
      name: 'Cartão de Crédito',
      type: 'debt',
      totalAmount: 3000,
      remainingAmount: 3000,
      monthlyPayment: 500,
      interestRate: 15,
      dueDate: new Date('2026-02-15'),
    },
  ],
  transactions: [
    {
      id: 'tx-1',
      type: 'income',
      category: 'Salário',
      amount: 5000,
      date: new Date('2026-01-05'),
      description: 'Salário mensal',
      recurrent: true,
      recurrenceInterval: 'monthly',
    },
    {
      id: 'tx-2',
      type: 'fixed',
      category: 'Aluguel',
      amount: 1500,
      date: new Date('2026-01-10'),
      description: 'Aluguel',
      recurrent: true,
      recurrenceInterval: 'monthly',
    },
  ],
};
