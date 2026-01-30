/**
 * COMPONENTE: MonthBar
 * Cards minimalistas de meses com glass effect - SEM scroll
 */

'use client';

import { motion } from 'framer-motion';

interface MonthData {
  month: string;
  status: 'excellent' | 'stable' | 'warning' | 'risk';
  label: string;
}

interface MonthBarProps {
  months: MonthData[];
  currentMonth: number;
  onMonthClick: (monthIndex: number, monthData: MonthData) => void;
}

export default function MonthBar({ months, currentMonth, onMonthClick }: MonthBarProps) {
  const getMonthConfig = (status: string, isCurrentMonth: boolean, isPastOrCurrent: boolean) => {
    // Meses futuros ficam acinzentados com efeito blur/fosco
    if (!isPastOrCurrent) {
      return {
        emoji: '⚪',
        className: 'bg-white/5 border border-white/5 backdrop-blur-sm',
        blur: true,
      };
    }
    
    const configs = {
      excellent: {
        emoji: '🔥',
        className: isCurrentMonth 
          ? 'glass-strong shadow-[0_0_30px_rgba(255,107,0,0.5)] ring-2 ring-primary/30 scale-105' 
          : 'glass hover:glass-strong',
        blur: false,
      },
      stable: {
        emoji: '🔥', 
        className: isCurrentMonth 
          ? 'glass-strong shadow-[0_0_30px_rgba(255,107,0,0.5)] ring-2 ring-primary/30 scale-105' 
          : 'glass hover:glass-strong',
        blur: false,
      },
      warning: {
        emoji: '❄️',
        className: isCurrentMonth 
          ? 'glass-strong shadow-[0_0_30px_rgba(59,130,246,0.4)] ring-2 ring-blue-400/30 scale-105' 
          : 'glass hover:glass-strong',
        blur: false,
      },
      risk: {
        emoji: '❄️',
        className: isCurrentMonth 
          ? 'glass-strong shadow-[0_0_30px_rgba(59,130,246,0.4)] ring-2 ring-blue-400/30 scale-105' 
          : 'glass hover:glass-strong',
        blur: false,
      },
    };
    
    return configs[status as keyof typeof configs] || configs.stable;
  };
  
  return (
    <div className="w-full">
      {/* Grid otimizado: 4 colunas no mobile (3 linhas), 6 no tablet (2 linhas), 12 no desktop (1 linha) */}
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 md:gap-2.5 lg:gap-3 w-full">
        {months.map((monthData, index) => {
          const isCurrentMonth = index === currentMonth;
          const isPastOrCurrent = index <= currentMonth;
          const config = getMonthConfig(monthData.status, isCurrentMonth, isPastOrCurrent);
          
          return (
            <motion.button
              key={index}
              onClick={() => onMonthClick(index, monthData)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={isPastOrCurrent ? { scale: 1.05, y: -2 } : {}}
              whileTap={isPastOrCurrent ? { scale: 0.95 } : {}}
              className={`
                relative p-2.5 md:p-3 lg:p-4 rounded-xl transition-all duration-300
                min-h-[75px] md:min-h-[80px] flex flex-col items-center justify-center
                ${config.className}
                ${!isPastOrCurrent ? 'opacity-40 cursor-not-allowed' : ''}
                ${config.blur ? 'blur-[0.5px]' : ''}
              `}
              disabled={!isPastOrCurrent}
            >
              {/* Emoji */}
              <div className={`text-xl md:text-2xl mb-1 transition-all ${!isPastOrCurrent ? 'opacity-50 grayscale' : ''}`}>
                {config.emoji}
              </div>
              
              {/* Mês */}
              <p className={`text-xs md:text-sm font-medium transition-all ${
                isCurrentMonth ? 'text-white font-bold' : 
                isPastOrCurrent ? 'text-white/90' : 
                'text-white/30'
              }`}>
                {monthData.month}
              </p>
              
              {/* Current month indicator - mais proeminente */}
              {isCurrentMonth && (
                <motion.div
                  className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_12px_rgba(255,107,0,0.8)]" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
