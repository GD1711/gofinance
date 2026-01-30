/**
 * COMPONENTE: LiquidGlass
 * Efeito liquid-glass avançado com movimento orgânico
 * Inspirado em @callstack/liquid-glass adaptado para web
 */

'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, ReactNode } from 'react';

interface LiquidGlassProps {
  children: ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  color?: string; // cor base do glass (padrão: black)
}

export default function LiquidGlass({ 
  children, 
  className = '',
  intensity = 'medium',
  color = 'black'
}: LiquidGlassProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs suaves para movimento orgânico
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Transformações baseadas na posição do mouse
  const rotateX = useTransform(y, [-0.5, 0.5], ['2deg', '-2deg']);
  const rotateY = useTransform(x, [-0.5, 0.5], ['-2deg', '2deg']);

  // Intensidade do blur e opacidade
  const intensityMap = {
    low: { blur: 8, opacity: 0.5 },
    medium: { blur: 16, opacity: 0.7 },
    high: { blur: 24, opacity: 0.85 }
  };

  const { blur, opacity } = intensityMap[intensity];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const offsetX = (e.clientX - centerX) / rect.width;
    const offsetY = (e.clientY - centerY) / rect.height;
    
    mouseX.set(offsetX);
    mouseY.set(offsetY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      className={`liquid-glass-container ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {/* Layer 1: Base glass com gradiente animado */}
      <motion.div
        className="liquid-glass-base"
        animate={{
          background: [
            `radial-gradient(circle at 20% 30%, rgba(255, 255, 255, ${opacity * 0.15}) 0%, transparent 50%)`,
            `radial-gradient(circle at 80% 70%, rgba(255, 255, 255, ${opacity * 0.15}) 0%, transparent 50%)`,
            `radial-gradient(circle at 40% 90%, rgba(255, 255, 255, ${opacity * 0.15}) 0%, transparent 50%)`,
            `radial-gradient(circle at 20% 30%, rgba(255, 255, 255, ${opacity * 0.15}) 0%, transparent 50%)`,
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          zIndex: 1,
        }}
      />

      {/* Layer 2: Blur glass com movimento */}
      <div
        className="liquid-glass-blur"
        style={{
          position: 'absolute',
          inset: 0,
          background: color === 'black' 
            ? `rgba(0, 0, 0, ${opacity})`
            : `rgba(255, 107, 0, ${opacity * 0.1})`,
          backdropFilter: `blur(${blur}px) saturate(180%)`,
          WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
          borderRadius: 'inherit',
          zIndex: 2,
        }}
      />

      {/* Layer 3: Border com gradiente animado */}
      <motion.div
        className="liquid-glass-border"
        animate={{
          background: [
            'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 107, 0, 0.2) 100%)',
            'linear-gradient(225deg, rgba(255, 107, 0, 0.2) 0%, transparent 50%, rgba(255, 255, 255, 0.1) 100%)',
            'linear-gradient(315deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 107, 0, 0.2) 100%)',
            'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 107, 0, 0.2) 100%)',
          ],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          zIndex: 3,
        }}
      />

      {/* Layer 4: Conteúdo */}
      <div
        style={{
          position: 'relative',
          zIndex: 4,
        }}
      >
        {children}
      </div>

      {/* Layer 5: Highlight sutil no hover */}
      <motion.div
        className="liquid-glass-highlight"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 107, 0, 0.1) 0%, transparent 50%)',
          borderRadius: 'inherit',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />
    </motion.div>
  );
}
