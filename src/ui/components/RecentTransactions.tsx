'use client';

import { useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { Pencil, Trash, ArrowRight } from '@/ui/icons';
import Image from 'next/image';

interface Transaction {
  id: string;
  icon: string;
  name: string;
  amount: number;
  type: 'expense' | 'income';
  date: string;
  category: string;
  categoryColor: string;
  isRecurring?: boolean;
  logoUrl?: string;
}

interface RecentTransactionsProps {
  transactions?: Transaction[];
  onViewAll?: () => void;
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (transaction: Transaction) => void;
  onTransactionClick?: (transaction: Transaction) => void;
}

export default function RecentTransactions({ 
  transactions: propTransactions,
  onViewAll, 
  onEdit, 
  onDelete, 
  onTransactionClick 
}: RecentTransactionsProps) {
  const [swipedId, setSwipedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Mock data - últimas 5 transações (usado se não houver transações passadas)
  const mockTransactions: Transaction[] = [
    {
      id: '1',
      icon: '📺',
      name: 'Netflix',
      amount: 55.90,
      type: 'expense',
      date: 'Recorrente • 15/jan',
      category: 'Entretenimento',
      categoryColor: 'bg-gray-500',
      isRecurring: true,
    },
    {
      id: '2',
      icon: '🍕',
      name: 'iFood - Pizza Hut',
      amount: 87.50,
      type: 'expense',
      date: 'Hoje, 20:35',
      category: 'Alimentação',
      categoryColor: 'bg-gray-400',
    },
    {
      id: '3',
      icon: '⛽',
      name: 'Posto Ipiranga',
      amount: 150.00,
      type: 'expense',
      date: 'Ontem',
      category: 'Transporte',
      categoryColor: 'bg-gray-500',
    },
    {
      id: '4',
      icon: '🏋️',
      name: 'Smartfit',
      amount: 79.90,
      type: 'expense',
      date: 'Recorrente • 10/jan',
      category: 'Saúde',
      categoryColor: 'bg-green-500',
      isRecurring: true,
    },
    {
      id: '5',
      icon: '🛒',
      name: 'Mercado Extra',
      amount: 234.60,
      type: 'expense',
      date: '08/jan',
      category: 'Mercado',
      categoryColor: 'bg-yellow-500',
    },
  ];

  // Usa transações passadas ou mock data
  const transactions = propTransactions && propTransactions.length > 0 
    ? propTransactions 
    : mockTransactions;

  const handleDragEnd = (event: any, info: PanInfo, transactionId: string) => {
    if (info.offset.x < -50) {
      setSwipedId(transactionId);
    } else if (info.offset.x > 50) {
      setSwipedId(null);
    }
  };

  return (
    <div className="glass rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-semibold text-lg tracking-tight">Últimos lançamentos</h3>
        <button
          onClick={onViewAll}
          className="text-white/60 text-sm font-medium hover:text-white transition-colors flex items-center gap-1.5 group"
        >
          Ver todos
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Transactions List */}
      <div className="space-y-2">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="relative overflow-hidden rounded-xl">
            {/* Action Buttons (behind) - includes amount before buttons */}
            <div className="absolute inset-0 flex items-center justify-end gap-3 pr-4 bg-gradient-to-l from-white/5 to-transparent">
              {/* Amount (visible when swiped) */}
              <div className="flex items-center pr-2 sm:pr-4">
                <span
                  className={`font-mono font-bold text-lg tracking-tight mr-2 whitespace-nowrap
                    ${transaction.type === 'expense' ? 'text-red-400/90' : 'text-green-400/90'}`}
                  aria-hidden
                >
                  {transaction.type === 'expense' ? '-' : '+'}R$ {transaction.amount.toFixed(2)}
                </span>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(transaction);
                }}
                className="p-2.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all"
                aria-label="Editar transação"
              >
                <Pencil size={16} className="text-white" weight="bold" />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(transaction);
                }}
                className="p-2.5 rounded-lg bg-red-600/15 backdrop-blur-sm border border-red-600/25 hover:bg-red-600/20 hover:border-red-600/30 transition-all"
                aria-label="Excluir transação"
              >
                <Trash size={16} className="text-white" weight="bold" />
              </motion.button>
            </div>

            {/* Transaction Card (draggable) */}
            <motion.div
              drag="x"
              dragConstraints={{ left: -100, right: 0 }}
              dragElastic={0.1}
              onDragEnd={(e, info) => handleDragEnd(e, info, transaction.id)}
              onClick={() => onTransactionClick?.(transaction)}
              onHoverStart={() => setHoveredId(transaction.id)}
              onHoverEnd={() => setHoveredId(null)}
              whileHover={{ scale: 1.005 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 rounded-xl p-4 cursor-pointer transition-all backdrop-blur-sm"
              style={{
                boxShadow: hoveredId === transaction.id 
                  ? '0 4px 20px rgba(255, 255, 255, 0.05)' 
                  : '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div className="flex items-center gap-4">
                {/* Icon/Logo - WHITE ONLY */}
                <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 overflow-hidden border border-white/10">
                  {transaction.logoUrl ? (
                    <div className="w-6 h-6 relative grayscale brightness-200 contrast-125">
                      <Image
                        src={transaction.logoUrl}
                        alt={transaction.name}
                        width={24}
                        height={24}
                        className="w-full h-full object-contain"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <span className="text-xl grayscale brightness-200 contrast-125">
                      {transaction.icon}
                    </span>
                  )}
                </div>

                {/* Info Section */}
                <div className="flex-1 min-w-0 flex items-center justify-between gap-4">
                  {/* Left: Name, Date, Category */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium text-[15px] truncate tracking-tight mb-0.5">
                      {transaction.name}
                    </h4>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-white/40 font-normal">
                        {transaction.date}
                      </span>
                      {transaction.isRecurring && (
                        <span className="text-[10px] text-white/50 font-medium tracking-wide uppercase">
                          • Recorrente
                        </span>
                      )}
                      <span className="text-[10px] text-white/30 font-medium tracking-wide uppercase">
                        • {transaction.category}
                      </span>
                    </div>
                  </div>

                  {/* Right area reserved for actions (amount shown on swipe) */}
                  <div className="flex-shrink-0" aria-hidden />
                </div>
              </div>

              {/* Subtle ripple effect on click */}
              {hoveredId === transaction.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white rounded-xl pointer-events-none"
                />
              )}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {transactions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-3 grayscale brightness-200">📊</div>
          <p className="text-white/40 text-sm">Nenhuma transação ainda</p>
        </div>
      )}
    </div>
  );
}
