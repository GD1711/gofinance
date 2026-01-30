/**
 * TIPOS: Entidades de Gamificação
 */

export type FinancialLevelType = 'survival' | 'stability' | 'balance' | 'growth' | 'freedom';

export interface GamificationData {
  level: FinancialLevelType;
  progress: number;
  streakDays: number;
  achievements: Achievement[];
  goals: FinancialGoal[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  isUnlocked: boolean;
}

export interface FinancialGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category: 'emergency' | 'investment' | 'savings' | 'debt' | 'purchase';
  status: 'active' | 'completed' | 'failed';
}
