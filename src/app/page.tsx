/**
 * PÁGINA: Dashboard Principal
 * Estrutura: Header → Barra de Meses → Cards + Calendário → Seção Inferior
 */

'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Bell, TrendUp, Warning, Target, ArrowRight, User, Eye } from '@/ui/icons';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { financialAnalyzer } from '@/application/services/financial-analyzer.service';
import { mockFinancialData } from '@/infrastructure/data/mock-financial-data';
import GlassCard from '@/ui/components/GlassCard';
import MonthsCarousel from '@/ui/components/MonthsCarousel';
import MonthModal from '@/ui/components/MonthModal';
import FinancialCalendar from '@/ui/components/FinancialCalendar';
import BottomNav from '@/ui/components/BottomNav';
import ProgressBar from '@/ui/components/ProgressBar';
import LottieWebComponent from '@/ui/components/LottieWebComponent';
import ProfileModal from '@/ui/components/ProfileModal';
import FinancialInsights from '@/ui/components/FinancialInsights';
import FinancialGoalCard from '@/ui/components/FinancialGoalCard';
import FloatingAddButton from '@/ui/components/FloatingAddButton';
import RecentTransactions from '@/ui/components/RecentTransactions';
// FinancialOverviewCard removed per request
import AddTransactionModal from '@/ui/components/AddTransactionModal';
import EmergencyReserveCard from '@/ui/components/EmergencyReserveCard';
import ProgressStatsCard from '@/ui/components/ProgressStatsCard';

export default function Home() {
  const router = useRouter();
  const { mode, isGuest, isAuthenticated, user } = useAuth();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [monthModalOpen, setMonthModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<{index: number, data: any} | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);

  // Redefine a animação quando o componente for montado/remontado
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
    
    // Listener para quando a página fica visível novamente
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Página ficou visível, reinicia animação
        setAnimationKey(prev => prev + 1);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Redirect para login se não for convidado nem autenticado
  useEffect(() => {
    if (!isGuest && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isGuest, isAuthenticated, router]);

  // Escuta evento global para abrir modal de adicionar (disparado pela Sidebar)
  useEffect(() => {
    const handleOpenAdd = () => setAddModalOpen(true);
    if (typeof window !== 'undefined') {
      window.addEventListener('openAddModal', handleOpenAdd as EventListener);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('openAddModal', handleOpenAdd as EventListener);
      }
    };
  }, []);

  const userName = user?.name?.split(' ')[0] || 'Convidado';
  const userImage = user?.image || null;

  // Mês atual dinâmico (0 = Janeiro, 11 = Dezembro)
  const currentMonth = new Date().getMonth();

  // Análise financeira inteligente
  const analysis = useMemo(() => {
    return financialAnalyzer.analyze(mockFinancialData);
  }, []);

  // Mock data - Meses do ano
  const monthsData = [
    { month: 'Jan', status: 'stable' as const, label: 'Crescimento forte' },
    { month: 'Fev', status: 'excellent' as const, label: 'Meta atingida' },
    { month: 'Mar', status: 'warning' as const, label: 'Déficit controlado' },
    { month: 'Abr', status: 'stable' as const, label: 'Mês positivo' },
    { month: 'Mai', status: 'excellent' as const, label: 'Crescimento' },
    { month: 'Jun', status: 'risk' as const, label: 'Atenção' },
    { month: 'Jul', status: 'stable' as const, label: 'Recuperação' },
    { month: 'Ago', status: 'stable' as const, label: 'Mês positivo' },
    { month: 'Set', status: 'excellent' as const, label: 'Forte crescimento' },
    { month: 'Out', status: 'excellent' as const, label: 'Meta superada' },
    { month: 'Nov', status: 'warning' as const, label: 'Mês atual' },
    { month: 'Dez', status: 'stable' as const, label: 'Previsão' },
  ];
  
  const handleMonthClick = (monthIndex: number, monthData: any) => {
    setSelectedMonth({ index: monthIndex, data: monthData });
    setMonthModalOpen(true);
  };

  // Mock data - Calendário com transações detalhadas
  const calendarDays = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const hasIncome = [5, 15, 25].includes(day);
    const hasExpense = [3, 8, 12, 18, 22, 28].includes(day);
    
    // Transações mock para dias específicos
    const transactions = [];
    let incomeAmount = 0;
    let expenseAmount = 0;

    if (day === 5) {
      transactions.push({
        type: 'income' as const,
        category: 'Salário',
        amount: 5000,
        description: 'Salário mensal'
      });
      incomeAmount = 5000;
    }
    
    if (day === 15) {
      transactions.push({
        type: 'income' as const,
        category: 'Freelance',
        amount: 1200,
        description: 'Projeto de consultoria'
      });
      incomeAmount = 1200;
    }

    if (day === 25) {
      transactions.push({
        type: 'income' as const,
        category: 'Investimentos',
        amount: 350,
        description: 'Dividendos'
      });
      incomeAmount = 350;
    }

    if (day === 3) {
      transactions.push({
        type: 'expense' as const,
        category: 'Alimentação',
        amount: 250,
        description: 'Compras do mercado'
      });
      expenseAmount = 250;
    }

    if (day === 8) {
      transactions.push({
        type: 'expense' as const,
        category: 'Transporte',
        amount: 180,
        description: 'Combustível e manutenção'
      });
      expenseAmount = 180;
    }

    if (day === 12) {
      transactions.push(
        {
          type: 'income' as const,
          category: 'Venda',
          amount: 800,
          description: 'Venda de item usado'
        },
        {
          type: 'expense' as const,
          category: 'Lazer',
          amount: 150,
          description: 'Cinema e jantar'
        }
      );
      incomeAmount = 800;
      expenseAmount = 150;
    }

    if (day === 18) {
      transactions.push({
        type: 'expense' as const,
        category: 'Saúde',
        amount: 320,
        description: 'Consulta médica'
      });
      expenseAmount = 320;
    }

    if (day === 22) {
      transactions.push({
        type: 'expense' as const,
        category: 'Educação',
        amount: 450,
        description: 'Curso online'
      });
      expenseAmount = 450;
    }

    if (day === 28) {
      transactions.push({
        type: 'expense' as const,
        category: 'Moradia',
        amount: 1500,
        description: 'Aluguel mensal'
      });
      expenseAmount = 1500;
    }

    return {
      day,
      hasIncome,
      hasExpense,
      isCritical: day === 28,
      isToday: day === 24,
      incomeAmount,
      expenseAmount,
      transactions: transactions.length > 0 ? transactions : undefined
    };
  });

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* 1️⃣ HEADER (TOPO FIXO) */}
      <div className="sticky top-0 z-50 glass-strong bg-black/60 rounded-b-3xl">
        <div className="p-3 md:p-4 flex items-center justify-between max-w-7xl mx-auto px-2 md:px-4">
          <motion.div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setProfileModalOpen(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {userImage ? (
              <img
                src={userImage}
                alt={userName}
                className="w-10 h-10 rounded-full ring-4 ring-primary/40 shadow-lg"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center ring-4 ring-primary/40 shadow-lg">
                <User size={20} className="text-white/60" />
              </div>
            )}
            <div>
              <h1 className="text-white font-semibold">
                Olá, {userName}
              </h1>
              <p className="text-white/40 text-xs">
                {isGuest ? 'Modo convidado' : 'Sua saúde financeira'}
              </p>
            </div>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <Bell size={20} className="text-white" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full animate-pulse" />
          </motion.button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 md:px-4 space-y-5 mt-5">
        {/* 2️⃣ CARROSSEL DE MESES */}
        <section>
          <MonthsCarousel 
            months={monthsData} 
            currentMonth={currentMonth} 
            onMonthClick={handleMonthClick}
          />
        </section>

        {/* 3️⃣ ÁREA PRINCIPAL */}
        <section>
          {/* Layout: Cards principais + Calendário lado a lado */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Coluna 1: Projeção de Futuro */}
            <div className="glass rounded-xl p-6 h-full relative overflow-hidden">
              <div className="relative z-10 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4">
                  <Eye size={20} className="text-white/60" />
                  <h3 className="text-white/90 font-medium">Olhando para frente</h3>
                </div>
                
                {/* Animação Centralizada */}
                <div className="flex justify-center mb-2">
                  <DotLottieReact
                    src="https://lottie.host/cd6c7477-8cfc-44f0-bf4d-fa6c7aeb5a56/POVOASX1Nf.lottie"
                    loop={false}
                    autoplay
                    style={{ 
                      width: '220px', 
                      height: '220px',
                      maxWidth: '100%'
                    }}
                    key={animationKey} // Força reinicialização
                  />
                </div>
                
                {/* Conteúdo Principal */}
                <div className="text-center mb-4">
                  <p className="text-white/70 text-sm mb-2">Em 3 meses você terá:</p>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-3xl font-bold text-white">
                      {analysis.projections.month3.netBalance > 0 ? '+' : ''}R$ {analysis.projections.month3.projectedBalance.toLocaleString('pt-BR')}
                    </span>
                    {analysis.projections.month3.netBalance > 0 ? (
                      <TrendUp size={18} className="text-green-400" />
                    ) : (
                      <Warning size={18} className="text-red-400" />
                    )}
                  </div>
                  
                  <div className="glass p-3 rounded-lg">
                    <p className="text-white/80 text-sm">
                      {analysis.projections.month3.netBalance > 0 
                        ? 'Você está construindo um futuro mais seguro'
                        : 'Sem ajustes, as coisas podem complicar'
                      }
                    </p>
                  </div>
                </div>
                
                {/* Footer */}
                <div className="mt-auto text-center">
                  <div className="text-xs text-white/50">
                    Baseado no seu padrão atual
                  </div>
                </div>
              </div>
              
              {/* Background effect */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            </div>

            {/* FinancialOverviewCard removed */}
            
            {/* Coluna 3: Calendário */}
            <div className="glass rounded-xl p-4 h-full">
              <FinancialCalendar
                month="Janeiro"
                year={2026}
                days={calendarDays}
              />
            </div>
          </div>

          {/* 3.2 Intervenção Inteligente */}
          <div className="mb-6">
            <FinancialInsights intervention={analysis.intervention} />
          </div>
        </section>

        {/* 4️⃣ SEÇÃO INFERIOR */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Emergency Reserve - Premium Card */}
          <EmergencyReserveCard
            currentValue={mockFinancialData.goals.emergencyFund.currentAmount}
            targetValue={mockFinancialData.goals.emergencyFund.targetAmount}
            deadline="Junho 2026"
          />

          {/* Progress Stats - Premium Card */}
          <ProgressStatsCard
            streak={analysis.gamification.streak}
            reserveProgress={analysis.gamification.reserveProgress}
            achievements={analysis.gamification.achievements}
          />
          
          {/* (Removido) Análise Financeira duplicada */}
        </section>

        {/* Últimos Lançamentos */}
        <section className="mt-6">
          <RecentTransactions
            transactions={recentTransactions}
            onViewAll={() => router.push('/transactions')}
            onEdit={(transaction) => console.log('Edit:', transaction)}
            onDelete={(transaction) => console.log('Delete:', transaction)}
            onTransactionClick={(transaction) => console.log('View:', transaction)}
          />
        </section>

        {/* Insights Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Capacidade de Poupança */}
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 h-full">
            <h3 className="text-white font-semibold mb-4">Capacidade de Poupança</h3>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400">Atual</span>
                <span className="text-sm text-white font-medium">
                  R$ {analysis.savingCapacity.current.toLocaleString('pt-BR')}/mês
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Potencial</span>
                <span className="text-lg text-green-400 font-bold">
                  R$ {analysis.savingCapacity.potential.toLocaleString('pt-BR')}/mês
                </span>
              </div>
            </div>

            {analysis.savingCapacity.blockers.length > 0 && (
              <>
                <div className="h-px bg-gray-700 my-4" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Bloqueadores</p>
                  <div className="space-y-2">
                    {analysis.savingCapacity.blockers.map((blocker, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Warning size={14} weight="bold" className="text-primary mt-0.5" />
                        <span className="text-xs text-gray-300">{blocker}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Container Dinâmico: Insights */}
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 h-full">
            <h3 className="text-white font-semibold mb-4">Insights Rápidos</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                <div className="p-1.5 rounded-lg bg-gray-500/20">
                  <Warning size={16} weight="bold" className="text-gray-300" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white font-medium">Despesas altas</p>
                  <p className="text-xs text-gray-400">+15% este mês</p>
                </div>
                <ArrowRight size={16} className="text-gray-500" />
              </div>

              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                <div className="p-1.5 rounded-lg bg-green-500/20">
                  <TrendUp size={16} className="text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white font-medium">Meta atingida</p>
                  <p className="text-xs text-gray-400">Reserva de emergência</p>
                </div>
                <ArrowRight size={16} className="text-gray-500" />
              </div>

              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                <div className="p-1.5 rounded-lg bg-primary/20">
                  <Target size={16} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white font-medium">Próximo objetivo</p>
                  <p className="text-xs text-gray-400">Investir em renda fixa</p>
                </div>
                <ArrowRight size={16} className="text-gray-500" />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Profile Modal */}
      <ProfileModal open={profileModalOpen} onClose={() => setProfileModalOpen(false)} />
      
      {/* Month Modal */}
      <MonthModal 
        isOpen={monthModalOpen}
        onClose={() => setMonthModalOpen(false)}
        monthData={selectedMonth?.data || null}
        monthIndex={selectedMonth?.index || 0}
      />

      {/* Add Transaction Modal */}
      <AddTransactionModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
      />

      {/* Bottom Navigation */}
      <BottomNav activeItem="/" onAddClick={() => setAddModalOpen(true)} />
    </div>
  );
}
