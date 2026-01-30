/**
 * PÁGINA: Transações
 * Visão mensal preditiva de entradas e saídas
 */

'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendUp, Warning, PencilSimple, Coin, Target, Shield } from '@/ui/icons';
import { useRouter } from 'next/navigation';
import GlassCard from '@/ui/components/GlassCard';
import MonthlyTransactionsTable from '@/ui/components/MonthlyTransactionsTable';
import BottomNav from '@/ui/components/BottomNav';
import AddTransactionModal, { TransactionData } from '@/ui/components/AddTransactionModal';
import { 
  calculateYearPredictions, 
  updateMonthData, 
  predictNextMonth,
  type MonthFinancialData 
} from '@/domain/services/prediction.service';

export default function TransactionsPage() {
  const router = useRouter();
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Estado: dados financeiros reais
  const [financialData, setFinancialData] = useState<MonthFinancialData[]>([
    { month: 'JAN', monthNumber: 0, income: 4200, expenses: 3100, isReal: true },
  ]);

  const currentMonthIndex = 0; // Janeiro (0-indexed)
  const currentYear = 2026;

  // Calcular todas as previsões baseadas nos dados reais
  const monthsWithPredictions = useMemo(() => {
    return calculateYearPredictions(currentMonthIndex, financialData);
  }, [financialData, currentMonthIndex]);

  // Calcular previsão do próximo mês com análise econômica
  const nextMonthPrediction = useMemo(() => {
    const realMonths = financialData.filter(m => m.isReal);
    return predictNextMonth(realMonths, 0.15); // Meta: 15% de poupança
  }, [financialData]);

  // Handler: atualizar dados de um mês
  const handleUpdateMonth = (monthIndex: number, income: number, expenses: number) => {
    const updated = updateMonthData(financialData, monthIndex, income, expenses);
    setFinancialData(updated);
  };

  // Dados para a tabela
  const tableData = monthsWithPredictions.map((m: MonthFinancialData) => ({
    month: m.month,
    monthNumber: m.monthNumber,
    income: m.income,
    expenses: m.expenses,
    isCurrentMonth: m.monthNumber === currentMonthIndex,
    isFutureMonth: m.monthNumber > currentMonthIndex,
    isPredicted: !m.isReal && m.monthNumber === currentMonthIndex + 1,
  }));

  const currentMonth = monthsWithPredictions[currentMonthIndex];
  const nextMonth = monthsWithPredictions[currentMonthIndex + 1];
  
  const currentBalance = currentMonth.income - currentMonth.expenses;
  const nextBalance = nextMonth ? nextMonth.income - nextMonth.expenses : 0;

  // Dados econômicos do próximo mês
  const { 
    suggestedSavings, 
    balanceAfterSavings, 
    realisticSavings, 
    insights,
    confidence,
    savingsRate
  } = nextMonthPrediction;

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/5">
        <div className="p-4 flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/')}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <ArrowLeft size={20} className="text-white" />
            </motion.button>
            <div>
              <h1 className="text-white font-bold text-lg">Transações</h1>
              <p className="text-white/40 text-xs">Visão mensal {currentYear}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 space-y-5 mt-5">
        {/* Cards de Resumo Econômico */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Mês Atual */}
          <GlassCard strong>
            <div className="flex items-start justify-between mb-2">
              <p className="text-xs text-white/60 uppercase tracking-wide">Janeiro 2026</p>
              <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                currentBalance >= 0 
                  ? 'bg-status-success/20 text-status-success'
                  : 'bg-status-error/20 text-status-error'
              }`}>
                ATUAL
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className={`text-2xl font-bold font-mono ${
                currentBalance >= 0 ? 'text-status-success' : 'text-status-error'
              }`}>
                R$ {Math.abs(currentBalance).toLocaleString('pt-BR')}
              </span>
            </div>
            <p className="text-xs text-white/60">
              Saldo do mês
            </p>
          </GlassCard>

          {/* Próximo Mês (Saldo Bruto) */}
          <GlassCard strong>
            <div className="flex items-start justify-between mb-2">
              <p className="text-xs text-white/60 uppercase tracking-wide">Fevereiro 2026</p>
              <div className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/20 text-primary flex items-center gap-1">
                <span>{confidence}%</span>
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className={`text-2xl font-bold font-mono ${
                nextBalance >= 0 ? 'text-status-success/80' : 'text-status-error/80'
              }`}>
                R$ {Math.abs(nextBalance).toLocaleString('pt-BR')}
              </span>
            </div>
            <p className="text-xs text-white/60">
              Saldo previsto
            </p>
          </GlassCard>

          {/* Poupança Sugerida */}
          <GlassCard strong>
            <div className="flex items-start justify-between mb-2">
              <p className="text-xs text-white/60 uppercase tracking-wide">Poupança Forçada</p>
              <div className="p-1 rounded-lg bg-primary/20">
                <Coin size={12} weight="bold" className="text-primary" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold font-mono text-primary">
                R$ {(insights.canSaveTarget ? suggestedSavings : realisticSavings).toLocaleString('pt-BR')}
              </span>
            </div>
            <p className="text-xs text-white/60">
              {insights.canSaveTarget 
                ? `${Math.round(savingsRate * 100)}% da renda` 
                : `Ajustado (${Math.round((realisticSavings / nextBalance) * 100)}%)`}
            </p>
          </GlassCard>

          {/* Saldo Pós-Poupança */}
          <GlassCard strong>
            <div className="flex items-start justify-between mb-2">
              <p className="text-xs text-white/60 uppercase tracking-wide">Após Poupar</p>
              <div className={`p-1 rounded-lg ${
                balanceAfterSavings >= 0 ? 'bg-status-success/20' : 'bg-status-warning/20'
              }`}>
                {balanceAfterSavings >= 0 ? (
                  <Shield size={12} className="text-status-success" />
                ) : (
                  <Warning size={12} weight="bold" className="text-status-warning" />
                )}
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className={`text-2xl font-bold font-mono ${
                balanceAfterSavings >= 0 ? 'text-status-success' : 'text-status-warning'
              }`}>
                R$ {Math.abs(balanceAfterSavings).toLocaleString('pt-BR')}
              </span>
            </div>
            <p className="text-xs text-white/60">
              {balanceAfterSavings >= 0 ? 'Folga saudável' : 'Meta muito alta'}
            </p>
          </GlassCard>
        </div>

        {/* Insight Econômico (Destaque) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard strong>
            <div className="flex items-start gap-4">
              {/* Ícone de Risco */}
              <div className={`p-3 rounded-xl ${
                insights.riskLevel === 'low' 
                  ? 'bg-status-success/20' 
                  : insights.riskLevel === 'medium'
                  ? 'bg-status-warning/20'
                  : 'bg-status-error/20'
              }`}>
                {insights.riskLevel === 'low' ? (
                  <Shield size={24} className="text-status-success" />
                ) : insights.riskLevel === 'medium' ? (
                  <Warning size={24} weight="bold" className="text-status-warning" />
                ) : (
                  <Warning size={24} weight="bold" className="text-status-error" />
                )}
              </div>
              
              {/* Mensagem e Sugestão */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-bold text-white">
                    Análise Econômica
                  </h3>
                  <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    insights.riskLevel === 'low' 
                      ? 'bg-status-success/20 text-status-success' 
                      : insights.riskLevel === 'medium'
                      ? 'bg-status-warning/20 text-status-warning'
                      : 'bg-status-error/20 text-status-error'
                  }`}>
                    Risco {insights.riskLevel === 'low' ? 'Baixo' : insights.riskLevel === 'medium' ? 'Médio' : 'Alto'}
                  </div>
                </div>
                
                <p className="text-sm text-white/90 mb-2 leading-relaxed">
                  {insights.message}
                </p>
                
                {insights.suggestion && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-primary/10 border border-primary/20">
                    <Target size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-white/80 leading-relaxed">
                      <strong className="text-primary">Ação recomendada:</strong> {insights.suggestion}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Tabela Mensal */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Visão Mensal</h2>
              <p className="text-sm text-white/60">
                Valores reais até janeiro • Previsão para fevereiro • Clique para editar
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/40">
              <PencilSimple size={14} weight="bold" />
              <span>Editável</span>
            </div>
          </div>
          <MonthlyTransactionsTable 
            months={tableData} 
            currentMonthIndex={currentMonthIndex}
            onUpdateMonth={handleUpdateMonth}
          />
        </div>

        {/* Explicação Metodológica */}
        <GlassCard>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-primary/20">
              <Warning size={18} weight="bold" className="text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">
                Fundamentos Econômicos
              </h4>
              <div className="space-y-2 text-xs text-white/70 leading-relaxed">
                <p>
                  <strong className="text-white">Média móvel ponderada:</strong> Dá mais peso aos meses recentes, 
                  usado em projeções financeiras profissionais.
                </p>
                <p>
                  <strong className="text-white">Pay Yourself First:</strong> A poupança vem ANTES do consumo. 
                  O sistema sugere guardar {Math.round(savingsRate * 100)}% da renda (taxa saudável segundo OECD).
                </p>
                <p>
                  <strong className="text-white">Ajuste Progressivo (APC):</strong> Se a meta não for viável, 
                  o sistema sugere poupar menos, mas nunca zero. Economia comportamental validada.
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-white/10">
                <p className="text-xs text-white/60">
                  <strong className="text-primary">Dica:</strong> Clique nos valores na tabela para editá-los. 
                  Todas as previsões são recalculadas automaticamente.
                </p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Add Transaction Modal */}
      <AddTransactionModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={(transaction: TransactionData) => {
          console.log('Transação adicionada:', transaction);
          // Implementar lógica de salvamento
        }}
      />

      {/* Bottom Navigation */}
      <BottomNav activeItem="/transactions" onAddClick={() => setAddModalOpen(true)} />
    </div>
  );
}
