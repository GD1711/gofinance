/**
 * Sistema de Planejamento Financeiro Educacional
 * Base matemática: progressão aritmética, metas por período, constância
 */

export type PlanType = 'linear' | 'progressive';

export interface FinancialGoalPlan {
  type: PlanType;
  targetAmount: number;
  months: number;
  monthlyAverage?: number;
  values?: number[];
  totalAccumulated?: number;
  goalReached?: boolean;
}

export interface LinearPlan extends FinancialGoalPlan {
  type: 'linear';
  months: number;
  monthlyAverage: number;
  target: number;
  targetAmount: number;
}

export interface ProgressiveChallenge extends FinancialGoalPlan {
  type: 'progressive';
  values: number[];
  totalAccumulated: number;
  goalReached: boolean;
  startValue: number;
  increment: number;
  maxIncrement: number;
  targetAmount: number;
  months: number;
}

export interface FinancialChallenge {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  duration: number; // meses
  plan: FinancialGoalPlan;
  progress: number; // 0-100
  currentMonth: number;
  startDate: Date;
  accepted: boolean;
}

export interface ChallengeProgress {
  month: number;
  expectedValue: number;
  actualValue: number;
  accumulated: number;
  percentComplete: number;
}
