/**
 * COMPONENTE: MonthlyTransactionsTable
 * Tabela mensal de entradas/saídas estilo Excel com liquid-glass
 * Valores reais até mês atual, previsão apenas próximo mês
 */

'use client';

import { motion } from 'framer-motion';
import { TrendUp, TrendDown } from '@/ui/icons';
import LiquidGlass from './LiquidGlass';

import { useState } from 'react';

interface MonthData {
  month: string;
  monthNumber: number; // 0-11
  income: number;
  expenses: number;
  isCurrentMonth: boolean;
  isFutureMonth: boolean;
  isPredicted: boolean; // Apenas próximo mês
}

interface MonthlyTransactionsTableProps {
  months: MonthData[];
  currentMonthIndex: number;
  onUpdateMonth?: (monthIndex: number, income: number, expenses: number) => void;
}

export default function MonthlyTransactionsTable({ 
  months, 
  currentMonthIndex,
  onUpdateMonth 
}: MonthlyTransactionsTableProps) {
  const [editingCell, setEditingCell] = useState<{ monthIndex: number; field: 'income' | 'expenses' } | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleCellClick = (monthIndex: number, field: 'income' | 'expenses', currentValue: number) => {
    // Só permite editar meses até o atual (não permite editar previsões)
    if (monthIndex > currentMonthIndex) return;
    
    setEditingCell({ monthIndex, field });
    setEditValue(String(currentValue));
  };

  const handleSave = () => {
    if (!editingCell || !onUpdateMonth) {
      setEditingCell(null);
      return;
    }

    const monthData = months.find(m => m.monthNumber === editingCell.monthIndex);
    if (!monthData) {
      setEditingCell(null);
      return;
    }

    const newValue = parseFloat(editValue) || 0;
    const income = editingCell.field === 'income' ? newValue : monthData.income;
    const expenses = editingCell.field === 'expenses' ? newValue : monthData.expenses;

    onUpdateMonth(editingCell.monthIndex, income, expenses);
    setEditingCell(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditingCell(null);
    }
  };

  return (
    <LiquidGlass className="overflow-hidden" intensity="high" color="black">
      <div>
        {/* Header da Tabela */}
        <div className="grid grid-cols-3 gap-4 p-4 border-b border-white/10 bg-white/5">
          <div className="text-xs font-bold text-white/60 uppercase tracking-wider">
            Mês
          </div>
          <div className="text-xs font-bold text-white/60 uppercase tracking-wider text-right">
            Entradas
          </div>
          <div className="text-xs font-bold text-white/60 uppercase tracking-wider text-right">
            Saídas
          </div>
        </div>

      {/* Linhas da Tabela */}
      <div className="max-h-[600px] overflow-y-auto scrollbar-hide">
        {months.map((monthData, index) => {
          const balance = monthData.income - monthData.expenses;
          
          return (
            <motion.div
              key={monthData.monthNumber}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02 }}
              className={`grid grid-cols-3 gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors relative ${
                monthData.isCurrentMonth 
                  ? 'bg-primary/5 border-primary/20' 
                  : monthData.isFutureMonth && !monthData.isPredicted
                  ? 'opacity-40'
                  : ''
              }`}
            >
              {/* Indicador Lateral */}
              <div 
                className={`absolute left-0 top-0 bottom-0 w-1 ${
                  balance >= 0 ? 'bg-status-success' : 'bg-status-error'
                }`}
              />

              {/* Coluna 1: Mês */}
              <div className="flex flex-col justify-center pl-3">
                <div>
                  <div className={`font-bold ${
                    monthData.isCurrentMonth 
                      ? 'text-white text-base' 
                      : 'text-white/80'
                  }`}>
                    {monthData.month}
                  </div>
                  {monthData.isPredicted && (
                    <div className="text-[10px] text-white/40 uppercase tracking-wide">
                      Previsto
                    </div>
                  )}
                </div>
              </div>

              {/* Coluna 2: Entradas */}
              <div className="flex items-center justify-end">
                {editingCell?.monthIndex === monthData.monthNumber && editingCell.field === 'income' ? (
                  <input
                    type="number"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="w-32 px-2 py-1 bg-black/50 border border-primary rounded text-right font-mono font-semibold text-status-success focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <div 
                    onClick={() => handleCellClick(monthData.monthNumber, 'income', monthData.income)}
                    className={`font-mono font-semibold cursor-pointer hover:bg-white/5 px-2 py-1 rounded transition-colors ${
                      monthData.isPredicted 
                        ? 'text-status-success/60'
                        : 'text-status-success'
                    } ${monthData.monthNumber <= currentMonthIndex ? 'hover:ring-1 hover:ring-primary/30' : ''}`}
                  >
                    R$ {monthData.income.toLocaleString('pt-BR', { 
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0 
                    })}
                  </div>
                )}
                {!monthData.isFutureMonth && (
                  <TrendUp size={14} weight="bold" className="ml-1.5 text-status-success/60" />
                )}
              </div>

              {/* Coluna 3: Saídas */}
              <div className="flex items-center justify-end">
                {editingCell?.monthIndex === monthData.monthNumber && editingCell.field === 'expenses' ? (
                  <input
                    type="number"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="w-32 px-2 py-1 bg-black/50 border border-primary rounded text-right font-mono font-semibold text-status-error focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <div 
                    onClick={() => handleCellClick(monthData.monthNumber, 'expenses', monthData.expenses)}
                    className={`font-mono font-semibold cursor-pointer hover:bg-white/5 px-2 py-1 rounded transition-colors ${
                      monthData.isPredicted 
                        ? 'text-status-error/60'
                        : monthData.expenses > monthData.income
                        ? 'text-status-error'
                        : 'text-status-warning'
                    } ${monthData.monthNumber <= currentMonthIndex ? 'hover:ring-1 hover:ring-primary/30' : ''}`}
                  >
                    R$ {monthData.expenses.toLocaleString('pt-BR', { 
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0 
                    })}
                  </div>
                )}
                {!monthData.isFutureMonth && (
                  <TrendDown size={14} weight="bold" className="ml-1.5 text-status-error/60" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Rodapé com Resumo */}
      <div className="p-4 border-t border-white/10 bg-white/5">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-xs text-white/60">
            Total Anual
          </div>
          <div className="text-right">
            <div className="text-sm font-mono font-bold text-status-success">
              R$ {months
                .filter(m => !m.isFutureMonth || m.isPredicted)
                .reduce((acc, m) => acc + m.income, 0)
                .toLocaleString('pt-BR')}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-mono font-bold text-status-error">
              R$ {months
                .filter(m => !m.isFutureMonth || m.isPredicted)
                .reduce((acc, m) => acc + m.expenses, 0)
                .toLocaleString('pt-BR')}
            </div>
          </div>
        </div>
      </div>
      </div>
    </LiquidGlass>
  );
}
