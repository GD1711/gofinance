/**
 * COMPONENTE: GlassCard
 * Card base com liquid-glass effect
 */

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import LiquidGlass from './LiquidGlass';

interface GlassCardProps {
  children: ReactNode;
  hover?: boolean;
  strong?: boolean;
  className?: string;
  onClick?: () => void;
  liquidGlass?: boolean; // Ativa efeito liquid-glass
  intensity?: 'low' | 'medium' | 'high';
}

export default function GlassCard({ 
  children, 
  hover = false, 
  strong = false,
  className = '', 
  onClick,
  liquidGlass = true, // Ativado por padrão
  intensity = 'medium'
}: GlassCardProps) {
  const content = (
    <motion.div
      className={`p-6 ${hover ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );

  if (liquidGlass) {
    return (
      <LiquidGlass 
        className={`rounded-2xl ${className}`}
        intensity={strong ? 'high' : intensity}
        color="black"
      >
        {content}
      </LiquidGlass>
    );
  }

  // Fallback para glass normal
  const baseClass = strong ? 'glass-card-strong' : 'glass-card';
  return (
    <motion.div
      className={`${baseClass} p-6 ${hover ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
