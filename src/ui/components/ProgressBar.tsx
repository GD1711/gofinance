/**
 * COMPONENTE: ProgressBar
 * Barra de progresso horizontal com textura de riscos verticais
 * Números estilo calculadora/display digital
 */

'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
  showAbsoluteValue?: boolean;
  absoluteValue?: string;
  height?: 'sm' | 'md' | 'lg';
  animate?: boolean;
  showPercentage?: boolean;
}

export default function ProgressBar({
  value,
  label,
  showAbsoluteValue = false,
  absoluteValue,
  height = 'md',
  animate = true,
  showPercentage = true,
}: ProgressBarProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const clampedValue = Math.min(Math.max(value, 0), 100);

  // Animação do número contando
  useEffect(() => {
    if (!animate) {
      setDisplayValue(clampedValue);
      return;
    }

    let start = 0;
    const end = clampedValue;
    const duration = 600;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [clampedValue, animate]);

  const heightClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-white/60">{label}</span>
          {showAbsoluteValue && absoluteValue && (
            <span className="text-xs text-white/40 font-mono">{absoluteValue}</span>
          )}
        </div>
      )}

      <div className="flex items-center gap-3">
        {/* Barra de Progresso */}
        <div
          className={`relative flex-1 ${heightClasses[height]} bg-white/10 rounded-xl overflow-hidden backdrop-blur-sm`}
        >
          {/* Parte Preenchida (Branco Acinzentado com Riscos) */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${clampedValue}%` }}
            transition={{ duration: animate ? 0.6 : 0, ease: 'easeOut' }}
            className="absolute inset-y-0 left-0 rounded-xl overflow-hidden"
            style={{
              background: 'linear-gradient(to right, #C0C0C0, #E5E5E5)',
            }}
          >
            {/* Textura de Riscos Verticais */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 3px,
                  rgba(0, 0, 0, 0.3) 3px,
                  rgba(0, 0, 0, 0.3) 4px
                )`,
              }}
            />
          </motion.div>

          {/* Brilho Sutil */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)',
            }}
          />
        </div>

        {/* Número Estilo Calculadora Antiga (opcional) */}
        {showPercentage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <div className="digital-display text-2xl font-bold font-mono tracking-wider text-primary">
              {displayValue}%
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
