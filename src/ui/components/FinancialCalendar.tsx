/**
 * COMPONENTE: FinancialCalendar
 * Calendário mensal com indicadores de entradas e saídas
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowCircleUp, ArrowCircleDown, X } from '@/ui/icons';
import { useState } from 'react';

interface DayData {
  day: number;
  hasIncome?: boolean;
  hasExpense?: boolean;
  isCritical?: boolean;
  isToday?: boolean;
  incomeAmount?: number;
  expenseAmount?: number;
  transactions?: Array<{
    type: 'income' | 'expense';
    category: string;
    amount: number;
    description: string;
  }>;
}

interface FinancialCalendarProps {
  month: string;
  year: number;
  days: DayData[];
}

export default function FinancialCalendar({ month, year, days }: FinancialCalendarProps) {
  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getBorderClasses = (dayData: DayData) => {
    if (dayData.hasIncome && dayData.hasExpense) {
      return 'border-2 border-gradient-to-r from-blue-500 to-red-500';
    }
    if (dayData.hasIncome) {
      return 'border-2 border-blue-500';
    }
    if (dayData.hasExpense) {
      return 'border-2 border-red-500';
    }
    return 'border border-gray-700';
  };

  return (
    <>
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">
            {month} {year}
          </h3>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <ArrowCircleUp size={14} weight="bold" className="text-blue-400" />
              <span className="text-gray-400">Ganhos</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ArrowCircleDown size={14} weight="bold" className="text-red-400" />
              <span className="text-gray-400">Gastos</span>
            </div>
          </div>
        </div>

        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-2 mb-3">
          {weekDays.map((day, idx) => (
            <div key={idx} className="text-center text-sm text-gray-500 font-medium py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid - MAIOR */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((dayData, index) => {
            const hasBoth = dayData.hasIncome && dayData.hasExpense;
            
            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.005 }}
                onClick={() => dayData.day && setSelectedDay(dayData)}
                className={`
                  relative w-full h-14 flex flex-col items-center justify-center
                  rounded-xl cursor-pointer transition-all text-sm
                  ${dayData.isToday 
                    ? 'bg-primary/20 text-white font-bold ring-2 ring-primary' 
                    : dayData.isCritical
                    ? 'bg-red-500/10 text-red-400'
                    : dayData.day
                    ? 'hover:bg-gray-800 text-gray-300'
                    : 'text-transparent pointer-events-none'
                  }
                  ${hasBoth 
                    ? 'border-2 border-transparent bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-red-500/30'
                    : dayData.hasIncome
                    ? 'border-2 border-blue-500/50'
                    : dayData.hasExpense
                    ? 'border-2 border-red-500/50'
                    : 'border border-gray-800'
                  }
                `}
              >
                <span className="font-semibold">{dayData.day || ''}</span>
                
                {/* Indicadores menores abaixo do número */}
                {(dayData.hasIncome || dayData.hasExpense) && (
                  <div className="absolute bottom-1.5 flex gap-1">
                    {dayData.hasIncome && (
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    )}
                    {dayData.hasExpense && (
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    )}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Modal de Detalhamento do Dia */}
      <AnimatePresence>
        {selectedDay && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDay(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9998]"
            />
            
            <div className="fixed inset-0 flex items-center justify-center p-4 z-[9999] pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="pointer-events-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] w-full max-w-md max-h-[90vh] overflow-hidden"
              >
                <div className="overflow-y-auto max-h-[90vh] p-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {/* Header do Modal */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">
                        Dia {selectedDay.day} de {month}
                      </h3>
                      {selectedDay.isToday && (
                        <span className="text-xs text-primary font-medium">Hoje</span>
                      )}
                    </div>
                    <button
                      onClick={() => setSelectedDay(null)}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/25 transition-all duration-150 backdrop-blur-xl border border-white/15 group"
                      aria-label="Fechar"
                    >
                      <X size={18} className="text-white/80 group-hover:text-white transition-colors" />
                    </button>
                  </div>

                  {/* Resumo Financeiro do Dia */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {selectedDay.hasIncome && (
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <ArrowCircleUp size={16} weight="bold" className="text-blue-400" />
                          <span className="text-xs text-blue-400 font-medium">Ganhos</span>
                        </div>
                        <p className="text-lg font-bold text-white">
                          {formatCurrency(selectedDay.incomeAmount || 0)}
                        </p>
                      </div>
                    )}
                    
                    {selectedDay.hasExpense && (
                      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <ArrowCircleDown size={16} weight="bold" className="text-red-400" />
                          <span className="text-xs text-red-400 font-medium">Gastos</span>
                        </div>
                        <p className="text-lg font-bold text-white">
                          {formatCurrency(selectedDay.expenseAmount || 0)}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Lista de Transações */}
                  {selectedDay.transactions && selectedDay.transactions.length > 0 ? (
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-white/70 uppercase tracking-wider">
                        Transações
                      </h4>
                      {selectedDay.transactions.map((transaction, idx) => (
                        <div
                          key={idx}
                          className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/8 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {transaction.type === 'income' ? (
                                <ArrowCircleUp size={14} weight="bold" className="text-blue-400" />
                              ) : (
                                <ArrowCircleDown size={14} weight="bold" className="text-red-400" />
                              )}
                              <span className="text-xs text-white/60 font-medium">
                                {transaction.category}
                              </span>
                            </div>
                            <span className={`text-sm font-bold ${transaction.type === 'income' ? 'text-blue-400' : 'text-red-400'}`}>
                              {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                            </span>
                          </div>
                          {transaction.description && (
                            <p className="text-xs text-white/50 leading-relaxed">
                              {transaction.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-white/40 text-sm">Nenhuma transação registrada</p>
                    </div>
                  )}

                  {/* Botão de Fechar */}
                  <button
                    onClick={() => setSelectedDay(null)}
                    className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium rounded-xl transition-all shadow-lg shadow-blue-500/20"
                  >
                    Fechar
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
