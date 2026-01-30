/**
 * MOCK DATA: Dados de gamificação
 */

import { GamificationData } from '@/domain/entities/gamification.entity';

export const mockGamificationData: GamificationData = {
  level: 'balance',
  progress: 65,
  streakDays: 21,
  achievements: [
    {
      id: 'ach-1',
      name: 'Primeiro Mês no Azul',
      description: 'Complete 1 mês com saldo positivo',
      icon: 'trophy',
      unlockedAt: new Date('2026-01-15'),
      isUnlocked: true,
    },
    {
      id: 'ach-2',
      name: 'Reserva de Emergência',
      description: 'Construa 3 meses de reserva',
      icon: 'shield',
      isUnlocked: false,
    },
    {
      id: 'ach-3',
      name: 'Investidor Iniciante',
      description: 'Faça seu primeiro investimento',
      icon: 'trending-up',
      isUnlocked: false,
    },
  ],
  goals: [
    {
      id: 'goal-1',
      title: 'Reserva de Emergência',
      targetAmount: 15000,
      currentAmount: 8500,
      deadline: new Date('2026-06-30'),
      category: 'emergency',
      status: 'active',
    },
    {
      id: 'goal-2',
      title: 'Quitar Cartão de Crédito',
      targetAmount: 3000,
      currentAmount: 1500,
      deadline: new Date('2026-03-31'),
      category: 'debt',
      status: 'active',
    },
  ],
};
