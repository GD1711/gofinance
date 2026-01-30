/**
 * COMPONENTE: ProgressStatsCard (Premium)
 * Card de progresso e conquistas com design premium
 */

'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Trophy, Target } from '@/ui/icons';

interface ProgressStatsCardProps {
  streak: number;
  reserveProgress: number;
  achievements: string[];
}

export default function ProgressStatsCard({
  streak = 3,
  reserveProgress = 21,
  achievements = []
}: ProgressStatsCardProps) {
  const roundedProgress = Math.round(reserveProgress);

  return (
    <motion.div
      className="relative glass rounded-2xl p-6 overflow-hidden"
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Background glow effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="glass-strong p-2 rounded-xl">
            <TrendingUp size={20} className="text-primary" />
          </div>
          <h3 className="text-white font-bold text-lg">Seu Progresso</h3>
        </div>

        {/* Streak - Destaque maior */}
        <motion.div 
          className="glass-strong p-5 rounded-2xl mb-5 relative overflow-hidden"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          {/* Background gradient animado */}
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              background: [
                'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                'linear-gradient(135deg, #F7931E 0%, #FF6B35 100%)',
                'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex-1">
              <p className="text-white/60 text-xs font-medium mb-2 uppercase tracking-wide">
                Sequência Positiva
              </p>
              <div className="flex items-baseline gap-2">
                <motion.span 
                  className="text-4xl font-black text-white"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {streak}
                </motion.span>
                <span className="text-white/60 text-sm font-medium">
                  {streak === 1 ? 'mês' : 'meses'}
                </span>
              </div>
            </div>
            
            {/* Ícone de fogo animado */}
            <motion.div 
              className="text-5xl"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [-5, 5, -5]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🔥
            </motion.div>
          </div>

          {/* Efeito de brilho */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Reserva de Emergência */}
        <div className="glass p-4 rounded-xl mb-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target size={16} className="text-primary" />
              <span className="text-white/70 text-sm font-medium">
                Reserva de Emergência
              </span>
            </div>
            <motion.span 
              className="text-white font-bold text-lg"
              key={roundedProgress}
              initial={{ scale: 1.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {roundedProgress}%
            </motion.span>
          </div>

          {/* Barra de progresso premium */}
          <div className="relative h-2.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${roundedProgress}%` }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              style={{
                background: 'linear-gradient(90deg, #667EEA 0%, #764BA2 50%, #F093FB 100%)',
              }}
            >
              {/* Efeito de brilho animado */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  x: ['0%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  background: `repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 10px,
                    rgba(255,255,255,0.2) 10px,
                    rgba(255,255,255,0.2) 20px
                  )`
                }}
              />
            </motion.div>

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full blur-sm"
              style={{
                background: 'linear-gradient(90deg, #667EEA 0%, #764BA2 50%, #F093FB 100%)',
                width: `${roundedProgress}%`,
                opacity: 0.4
              }}
            />
          </div>
        </div>

        {/* Conquistas */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Trophy size={16} className="text-yellow-400" />
            <p className="text-white/50 text-xs uppercase tracking-wide font-medium">
              Conquistas
            </p>
          </div>

          <div className="space-y-2">
            {achievements.length > 0 ? (
              achievements.map((achievement, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-2.5 glass p-3 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 + 0.5 }}
                  whileHover={{ x: 4, backgroundColor: 'rgba(255,255,255,0.05)' }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
                  <span className="text-white/80 text-sm leading-relaxed">
                    {achievement}
                  </span>
                </motion.div>
              ))
            ) : (
              <p className="text-white/40 text-sm italic">
                Continue avançando para desbloquear conquistas
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary/10 to-transparent blur-xl pointer-events-none" />
    </motion.div>
  );
}
