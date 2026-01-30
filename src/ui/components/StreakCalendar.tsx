/**
 * COMPONENTE: StreakCalendar
 * Calendário circular mostrando "Dias no Azul" - sequência de dias positivos
 */

'use client';

import { motion } from 'framer-motion';
import { CalendarBlank, TrendUp } from '@/ui/icons';

interface StreakCalendarProps {
  currentStreak: number;
  weekData: boolean[]; // true = dia positivo, false = negativo
  month?: string;
}

export default function StreakCalendar({ 
  currentStreak, 
  weekData,
  month = 'Janeiro'
}: StreakCalendarProps) {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  
  return (
    <div className="glass-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm text-white/60 mb-1">Your Streak</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold font-mono text-primary">{currentStreak}</span>
            <span className="text-lg text-white/60">Weeks</span>
          </div>
        </div>
        <button className="text-primary text-sm hover:underline">View Calendar</button>
      </div>

      {/* Week Days */}
      <div className="flex justify-between items-center mb-3">
        {days.map((day, index) => (
          <div key={index} className="text-center w-10">
            <span className="text-xs text-white/40 font-medium">{day}</span>
          </div>
        ))}
      </div>

      {/* Circular Progress Indicators */}
      <div className="flex justify-between items-center">
        {weekData.map((isPositive, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {isPositive ? (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-glow">
                <span className="text-white font-bold text-sm">{index + 3}</span>
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center">
                <span className="text-white/40 font-bold text-sm">{index + 3}</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Progress Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <div className="w-2 h-2 rounded-full bg-primary"></div>
        <div className="w-2 h-2 rounded-full bg-white/20"></div>
        <div className="w-2 h-2 rounded-full bg-white/20"></div>
      </div>
    </div>
  );
}
