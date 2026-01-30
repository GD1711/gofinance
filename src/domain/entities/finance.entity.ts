/**
 * DOMAIN LAYER - Entidades
 * Objetos de negócio puros, sem dependências externas
 */

export interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'fixed';
  category: string;
  amount: number;
  date: Date;
  description: string;
  recurrent?: boolean;
  recurrenceInterval?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export interface Asset {
  id: string;
  name: string;
  type: 'cash' | 'investment' | 'property';
  currentValue: number;
  expectedReturn?: number; // % anual
  liquidityDays?: number;
}

export interface Liability {
  id: string;
  name: string;
  type: 'debt' | 'loan' | 'financing';
  totalAmount: number;
  remainingAmount: number;
  monthlyPayment: number;
  interestRate: number;
  dueDate: Date;
}

export interface FinancialProfile {
  userId: string;
  currentBalance: number;
  monthlyIncome: number;
  fixedExpenses: number;
  variableExpenses: number;
  assets: Asset[];
  liabilities: Liability[];
  transactions: Transaction[];
}

export interface ForecastScenario {
  month: Date;
  expectedBalance: number;
  income: number;
  expenses: number;
  status: 'healthy' | 'warning' | 'critical';
  confidence: number; // 0-100
}

export interface HealthScore {
  score: number; // 0-100
  level: 'excelente' | 'bom' | 'atenção' | 'crítico';
  color: 'green' | 'yellow' | 'red';
  message: string;
  tips: string[];
}
