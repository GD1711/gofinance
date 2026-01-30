/**
 * TIPOS: Estrutura de Dados Financeiros
 * Sistema de entrada do usuário e análise financeira
 */

// 1. RENDA
export interface RecurringIncome {
  id: string;
  name: string;
  amount: number;
  frequency: 'monthly' | 'biweekly' | 'weekly';
  startDate: Date;
  isActive: boolean;
}

export interface Income {
  recurring: RecurringIncome[];
  other: number; // Entradas imprevisíveis mensais
}

// 2. GASTOS
export interface FixedExpense {
  id: string;
  name: string;
  amount: number;
  dueDay: number;
  category: 'housing' | 'utilities' | 'education' | 'subscriptions' | 'other';
  isActive: boolean;
}

export interface VariableExpense {
  category: 'groceries' | 'leisure' | 'transport' | 'health' | 'other';
  averageAmount: number;
  lastMonthAmount?: number;
  trend: 'increasing' | 'stable' | 'decreasing';
}

export interface Expenses {
  fixed: FixedExpense[];
  variable: VariableExpense[];
}

// 3. DÍVIDAS
export interface Debt {
  id: string;
  name: string;
  totalAmount: number;
  installmentAmount: number;
  interestRate: number; // % anual
  remainingMonths: number;
  dueDay: number;
  type: 'loan' | 'credit_card' | 'financing' | 'other';
}

// 4. OBJETIVOS
export interface EmergencyFund {
  targetAmount: number;
  currentAmount: number;
  monthlyContribution: number;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: Date;
  priority: 'high' | 'medium' | 'low';
  category: 'travel' | 'purchase' | 'investment' | 'other';
}

export interface Goals {
  emergencyFund: EmergencyFund;
  goals: Goal[];
}

// ESTRUTURA COMPLETA
export interface FinancialData {
  userId: string;
  income: Income;
  expenses: Expenses;
  debts: Debt[];
  goals: Goals;
  updatedAt: Date;
}

// RESULTADO DA ANÁLISE
export interface MonthlyBalance {
  month: Date;
  totalIncome: number;
  totalExpenses: number;
  debtPayments: number;
  netBalance: number;
  projectedBalance: number;
  confidence: number; // 0-100
}

export interface FinancialAxisIndex {
  score: number; // 0-100
  status: 'stable' | 'warning' | 'critical';
  color: 'green' | 'yellow' | 'red';
  factors: {
    incomeCommitment: number; // % da renda comprometida
    reserveAllocation: number; // % destinada à reserva
    debtWeight: number; // Peso das dívidas
    futureTrend: 'positive' | 'neutral' | 'negative';
  };
}

export interface Intervention {
  type: 'preventive' | 'corrective' | 'motivational';
  message: string;
  microAction: string;
  impact: string;
  priority: 'high' | 'medium' | 'low';
}

export interface FinancialAnalysis {
  currentBalance: MonthlyBalance;
  projections: {
    month3: MonthlyBalance;
    month6: MonthlyBalance;
  };
  axisIndex: FinancialAxisIndex;
  bottlenecks: {
    category: string;
    amount: number;
    percentage: number;
    suggestion: string;
  }[];
  savingCapacity: {
    current: number;
    potential: number;
    blockers: string[];
  };
  intervention: Intervention;
  gamification: {
    streak: number; // Meses positivos consecutivos
    reserveProgress: number; // 0-100
    achievements: string[];
  };
}
