/**
 * COMPONENTE: EmergencyReserveCard (Premium)
 * Card de reserva de emergência com efeito de fogo fluido animado
 */

'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Target, Calendar, TrendingUp } from '@/ui/icons';

interface EmergencyReserveCardProps {
  currentValue: number;
  targetValue: number;
  deadline?: string;
}

export default function EmergencyReserveCard({
  currentValue = 2800,
  targetValue = 13500,
  deadline = 'Junho 2026'
}: EmergencyReserveCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const progressValue = useMotionValue(0);
  const percentage = Math.round((currentValue / targetValue) * 100);
  
  // Cores do gradiente baseado no progresso
  const getGradientColors = (progress: number) => {
    if (progress <= 33) return { from: '#E8EAED', to: '#B8BBC2', glow: '#E8EAED' }; // Branco/prata
    if (progress <= 66) return { from: '#FFD700', to: '#FFA500', glow: '#FFD700' }; // Amarelo dourado
    return { from: '#FF6B35', to: '#FF4500', glow: '#FF6B35' }; // Vermelho/laranja
  };

  const colors = getGradientColors(percentage);

  // Anima o progresso ao carregar
  useEffect(() => {
    const controls = animate(progressValue, percentage, {
      duration: 2,
      ease: "easeOut"
    });
    return controls.stop;
  }, [percentage, progressValue]);

  // Partículas de fogo
  const fireParticles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: i * 0.3,
    duration: 2 + Math.random() * 1.5,
    x: Math.random() * 100,
    scale: 0.4 + Math.random() * 0.6
  }));

  return (
    <motion.div
      className="relative glass rounded-2xl p-6 overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.02, y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Background Glow Effect */}
      <motion.div
        className="absolute inset-0 opacity-0"
        animate={{ opacity: isHovered ? 0.15 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: `radial-gradient(circle at 50% 50%, ${colors.glow}, transparent 70%)`
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between mb-6">
        <div className="flex items-start gap-3">
          {/* Ícone com glassmorphism */}
          <motion.div 
            className="glass-strong p-3 rounded-2xl"
            animate={{ 
              boxShadow: isHovered 
                ? `0 0 20px ${colors.glow}40`
                : '0 0 0px transparent'
            }}
            transition={{ duration: 0.3 }}
          >
            <Target size={24} className="text-white" />
          </motion.div>
          
          <div>
            <h3 className="text-white font-bold text-lg mb-1">
              Reserva de Emergência
            </h3>
            <div className="flex items-center gap-1.5 text-white/50 text-sm">
              <Calendar size={14} />
              <span>{deadline}</span>
            </div>
          </div>
        </div>

        {/* Badge de progresso */}
        <motion.div 
          className="glass-strong px-3 py-1.5 rounded-full"
          animate={{ scale: isHovered ? 1.05 : 1 }}
        >
          <span className="text-white font-semibold text-sm">
            {percentage}%
          </span>
        </motion.div>
      </div>

      {/* Valores */}
      <div className="relative z-10 grid grid-cols-2 gap-4 mb-6">
        <div className="glass p-3 rounded-xl">
          <p className="text-white/60 text-xs mb-1">Atual</p>
          <p className="text-white font-bold text-lg">
            R$ {currentValue.toLocaleString('pt-BR')}
          </p>
        </div>
        <div className="glass p-3 rounded-xl">
          <p className="text-white/60 text-xs mb-1">Meta</p>
          <p className="text-white font-bold text-lg">
            R$ {targetValue.toLocaleString('pt-BR')}
          </p>
        </div>
      </div>

      {/* Barra de Progresso com Efeito de Fogo */}
      <div className="relative z-10 mb-4">
        <div className="relative h-4 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm">
          {/* Barra de progresso base */}
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full overflow-hidden"
            style={{ 
              width: useTransform(progressValue, [0, 100], ['0%', '100%']),
              background: `linear-gradient(90deg, ${colors.from}, ${colors.to})`
            }}
          >
            {/* Efeito de ondulação */}
            <motion.div
              className="absolute inset-0"
              animate={{
                x: ['0%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                background: `repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 10px,
                  rgba(255,255,255,0.1) 10px,
                  rgba(255,255,255,0.1) 20px
                )`
              }}
            />

            {/* Partículas de fogo */}
            {percentage > 0 && fireParticles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-1.5 h-1.5 rounded-full bg-white"
                style={{
                  left: `${particle.x}%`,
                  top: '50%',
                  y: '-50%',
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, particle.scale, 0],
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Brilho pulsante */}
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-8"
              animate={{
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                background: `linear-gradient(90deg, transparent, ${colors.glow})`
              }}
            />
          </motion.div>

          {/* Glow ao redor da barra */}
          <motion.div
            className="absolute inset-0 rounded-full blur-md"
            style={{
              background: `linear-gradient(90deg, ${colors.from}, ${colors.to})`,
              width: `${percentage}%`,
              opacity: 0.3
            }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Indicador de progresso móvel */}
        {percentage > 5 && (
          <motion.div
            className="absolute top-0 flex items-center gap-1"
            style={{
              left: `${percentage}%`,
              x: '-50%',
              y: '-120%'
            }}
            animate={{
              y: ['-120%', '-130%', '-120%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <TrendingUp size={12} className="text-white" />
            <span className="text-white text-xs font-bold">
              {percentage}%
            </span>
          </motion.div>
        )}
      </div>

      {/* Mensagem motivacional */}
      <motion.div 
        className="relative z-10 text-center"
        animate={{ opacity: isHovered ? 1 : 0.8 }}
      >
        <p className="text-white/70 text-sm font-medium">
          💪 Foco no objetivo, você consegue!
        </p>
      </motion.div>

      {/* Efeito de luz de fundo */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 blur-3xl opacity-20 pointer-events-none"
        style={{ background: colors.glow }}
      />
    </motion.div>
  );
}
