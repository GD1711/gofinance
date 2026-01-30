'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MonthData {
  month: string;
  status: 'excellent' | 'stable' | 'warning' | 'risk';
  label: string;
  balance?: number;
}

interface MonthsCarouselProps {
  months: MonthData[];
  currentMonth: number;
  onMonthClick: (monthIndex: number, monthData: MonthData) => void;
}

export default function MonthsCarousel({ months, currentMonth, onMonthClick }: MonthsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll para o mês atual no mobile
    if (scrollRef.current && window.innerWidth < 768) {
      const monthElement = scrollRef.current.children[currentMonth] as HTMLElement;
      if (monthElement) {
        monthElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [currentMonth]);

  return (
    <div className="relative w-full overflow-hidden">
      
      {/* 
        Mobile: Scroll horizontal
        Desktop (md-xl): Grid 12 colunas (1 linha)
        Desktop pequeno (sm-md): Grid 6 colunas (2 linhas)
      */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto pb-4 px-3 touch-pan-x sm:grid sm:grid-cols-6 sm:overflow-visible sm:pb-0 sm:px-2 md:grid md:grid-cols-12 md:overflow-visible md:pb-0 md:px-1 md:gap-1.5 gap-2 [&::-webkit-scrollbar]:hidden"
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {months.map((monthData, index) => {
          const isPast = index < currentMonth;
          const isCurrent = index === currentMonth;
          const isFuture = index > currentMonth;
          const isAvailable = isCurrent || isPast;
          const isFirstOrLast = index === 0 || index === months.length - 1;

          // Determinar tendência apenas para mês atual
          const isPositiveTrend = monthData.status === 'excellent' || monthData.status === 'stable';

          return (
            <motion.button
              key={index}
              whileHover={isAvailable ? { scale: 1.02, y: -2 } : {}}
              whileTap={isAvailable ? { scale: 0.98 } : {}}
              onClick={() => isAvailable && onMonthClick(index, monthData)}
              disabled={isFuture}
              className={
                `flex-shrink-0 w-40 h-24
                sm:w-full sm:h-28
                md:w-full md:h-20
                rounded-xl
                relative
                overflow-hidden
                transition-all duration-300 ease-out
                ${isAvailable ? 'cursor-pointer' : 'cursor-not-allowed'}`
              }
            >
              {/* Borda Animada Premium - Mês Atual */}
              {isCurrent && (
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-white"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(255, 255, 255, 0.3)',
                      '0 0 30px rgba(255, 255, 255, 0.5)',
                      '0 0 20px rgba(255, 255, 255, 0.3)',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              )}

              {/* Borda Premium - Cinza para passados, sutil para futuros */}
              {!isCurrent && (
                <div
                  className={`
                    absolute inset-0 rounded-xl
                    ${isPast ? 'border border-white/20' : ''}
                    ${isFuture ? 'border border-white/10' : ''}
                  `}
                />
              )}

              {/* Glass Background para meses disponíveis */}
              {!isFuture && (
                <div
                  className={`
                    absolute inset-0 rounded-xl
                    transition-all duration-300
                    ${isCurrent ? 'bg-white/10 backdrop-blur-xl' : 'bg-white/5 backdrop-blur-lg'}
                  `}
                />
              )}

              {/* Desfoque Intenso Glass Fumê - Meses Futuros */}
              {isFuture && (
                <div className="absolute inset-0 rounded-xl">
                  {/* Glass background com blur extremo */}
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-[32px]" />
                  {/* Overlay fumê adicional */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/40" />
                </div>
              )}

              {/* Conteúdo */}
              <div 
                className={`
                  relative z-10 flex flex-col items-center justify-center h-full gap-1 px-1
                  rounded-xl
                  transition-all duration-300
                `}
              >
                {/* Nome do Mês */}
                <span
                  className={`
                    font-bold uppercase tracking-wide
                    transition-all duration-300
                    text-base sm:text-lg
                    ${isCurrent ? 'md:text-sm' : 'md:text-xs'}
                    ${
                      isCurrent
                        ? 'text-white drop-shadow-lg'
                        : isPast
                        ? 'text-white/70'
                        : 'text-white/20 blur-[1px]'
                    }
                  `}
                >
                  {monthData.month}
                </span>

                {/* Ícone de tendência - Apenas Mês atual e passados */}
                {(isCurrent || isPast) && (
                  <div className="mt-0.5">
                    {isPositiveTrend ? (
                      <TrendingUp size={14} className="text-green-400 drop-shadow-lg md:w-3 md:h-3" strokeWidth={2.5} />
                    ) : (
                      <TrendingDown size={14} className="text-red-400 drop-shadow-lg md:w-3 md:h-3" strokeWidth={2.5} />
                    )}
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Fade nas bordas apenas no mobile */}
      <div className="md:hidden absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black via-black/70 to-transparent pointer-events-none" />
      <div className="md:hidden absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black via-black/70 to-transparent pointer-events-none" />
    </div>
  );
}
