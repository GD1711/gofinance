/**
 * COMPONENTE: LiquidContainer
 * Container com liquid-glass effect para seções grandes
 */

'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface LiquidContainerProps {
  children: ReactNode;
  className?: string;
}

export default function LiquidContainer({ children, className = '' }: LiquidContainerProps) {
  return (
    <div className={`liquid-container ${className}`}>
      {/* Base glass layer com gradiente animado */}
      <motion.div
        className="liquid-container-gradient"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(255, 107, 0, 0.03) 0%, transparent 40%)',
            'radial-gradient(circle at 80% 70%, rgba(255, 107, 0, 0.03) 0%, transparent 40%)',
            'radial-gradient(circle at 40% 90%, rgba(255, 107, 0, 0.03) 0%, transparent 40%)',
            'radial-gradient(circle at 20% 30%, rgba(255, 107, 0, 0.03) 0%, transparent 40%)',
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Blur overlay */}
      <div className="liquid-container-blur" />
      
      {/* Conteúdo */}
      <div className="liquid-container-content">
        {children}
      </div>
    </div>
  );
}
