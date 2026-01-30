/**
 * PÁGINA: Dashboard Panel
 * Painel de controle inspirado na segunda imagem
 */

'use client';

import { motion } from 'framer-motion';
import { CalendarBlank, CheckCircle, Clock, ArrowRight, X } from '@/ui/icons';
import GlassCard from '@/ui/components/GlassCard';
import LiquidGlassAnimation from '@/ui/components/LiquidGlassAnimation';
import FinancialBaseSection from '@/ui/components/FinancialBaseSection';

interface Task {
  id: string;
  title: string;
  daysRemaining: number;
  steps: { current: number; total: number };
  status: 'on-track' | 'at-risk' | 'completed';
}

interface Notification {
  id: string;
  user: string;
  message: string;
  timeAgo: string;
  avatar?: string;
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Construir Reserva de Emergência',
    daysRemaining: 8,
    steps: { current: 6, total: 7 },
    status: 'on-track',
  },
  {
    id: '2',
    title: 'Reduzir Despesas Variáveis em 20%',
    daysRemaining: 4,
    steps: { current: 3, total: 7 },
    status: 'at-risk',
  },
  {
    id: '3',
    title: 'Investir em Renda Fixa',
    daysRemaining: 1,
    steps: { current: 0, total: 7 },
    status: 'at-risk',
  },
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    user: 'Sistema Financeiro',
    message: 'Seu saldo ultrapassou a meta mensal!',
    timeAgo: '2h ago',
  },
  {
    id: '2',
    user: 'Lembrete',
    message: 'Pagamento do cartão vence em 3 dias',
    timeAgo: '11h ago',
  },
  {
    id: '3',
    user: 'Conquista',
    message: 'Nova conquista desbloqueada: 7 dias no azul',
    timeAgo: '1h ago',
  },
];

export default function DashboardPanel() {
  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header com Animação Liquid Glass */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <GlassCard strong>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard Financeiro</h1>
                <p className="text-white/60">Acompanhe seu progresso financeiro em tempo real</p>
              </div>
              <div className="hidden md:block">
                <LiquidGlassAnimation 
                  width={120} 
                  height={120}
                  className="opacity-80"
                />
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Seção Base Financeira - Planejamento Educacional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <FinancialBaseSection />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tasks in Progress */}
          <div className="lg:col-span-2">
            <GlassCard strong>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Tasks in Progress</h2>
                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <ArrowRight size={20} className="text-white" />
                </button>
              </div>

              <div className="space-y-4">
                {mockTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-4 hover:bg-glass-hover transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-white font-medium mb-1">{task.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-white/60">
                          <Clock size={14} />
                          <span>{task.daysRemaining} days</span>
                        </div>
                      </div>
                      
                      {/* Steps Progress */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-white/60">Steps {task.steps.current}/{task.steps.total}</span>
                        <div className="flex gap-1">
                          {Array.from({ length: task.steps.total }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < task.steps.current
                                  ? 'bg-primary'
                                  : 'bg-white/20'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(task.steps.current / task.steps.total) * 100}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className={`h-full rounded-full ${
                          task.status === 'on-track'
                            ? 'bg-primary'
                            : task.status === 'at-risk'
                            ? 'bg-status-warning'
                            : 'bg-status-success'
                        }`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            {/* Calendar Section */}
            <GlassCard strong className="mt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">September 2025</h2>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-white/10">
                    <CalendarBlank size={20} weight="bold" className="text-white" />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <div key={day} className="text-center text-sm text-white/60 py-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }).map((_, i) => {
                  const dayNum = i - 3;
                  const isCurrentMonth = dayNum >= 1 && dayNum <= 30;
                  const hasEvent = [23, 24, 25, 26].includes(dayNum);
                  
                  return (
                    <div
                      key={i}
                      className={`aspect-square flex items-center justify-center rounded-lg text-sm ${
                        !isCurrentMonth
                          ? 'text-white/20'
                          : hasEvent
                          ? 'bg-primary text-white font-bold'
                          : 'text-white/60 hover:bg-white/5'
                      } cursor-pointer transition-colors`}
                    >
                      {isCurrentMonth ? dayNum : ''}
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </div>

          {/* Notifications */}
          <div className="space-y-6">
            <GlassCard strong>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Notifications</h2>
                <button className="p-2 rounded-lg hover:bg-white/10">
                  <X size={20} className="text-white" />
                </button>
              </div>

              <div className="space-y-4">
                {mockNotifications.map((notif, index) => (
                  <motion.div
                    key={notif.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">
                        {notif.user[0]}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="text-white text-sm font-medium">{notif.user}</h4>
                        <span className="text-xs text-white/40">{notif.timeAgo}</span>
                      </div>
                      <p className="text-sm text-white/60">{notif.message}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            {/* Profile Card */}
            <GlassCard strong>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Profile</h2>
                <button className="p-2 rounded-lg hover:bg-white/10">
                  <ArrowRight size={20} className="text-white" />
                </button>
              </div>

              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-dark mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl text-white font-bold">MR</span>
                </div>
                <h3 className="text-lg font-bold text-white">Mike Ryan</h3>
                <p className="text-sm text-white/60">Product designer</p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/60">ID</span>
                  <span className="text-white font-mono">937645</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/60">E-mail</span>
                  <span className="text-white">olivia@email.com</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/60">Department</span>
                  <span className="text-white">Design</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-white/60">Team</span>
                  <span className="text-white">B2B Fintech product</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
