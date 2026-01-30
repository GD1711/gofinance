/**
 * COMPONENTE: PremiumCenterButton
 * Botão central premium com glassmorphism real e estados elegantes
 * Design: Integrado, flutuante, com profundidade visual sofisticada
 */

'use client';

import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface PremiumCenterButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  label?: string;
  isResponding?: boolean;
}

export default function PremiumCenterButton({ 
  onClick, 
  isActive = false,
  label = 'Finn',
  isResponding = false
}: PremiumCenterButtonProps) {
  return (
    <button onClick={onClick} className="relative md:-mt-4">
      {/* Efeito de integração com o glass container - apenas desktop */}
      <div className="hidden md:block absolute -top-6 left-1/2 -translate-x-1/2 w-28 h-10 bg-gradient-to-b from-transparent via-black/40 to-black/60 backdrop-blur-2xl rounded-t-[32px] shadow-lg" />
      
      {/* Botão Principal com Glassmorphism Premium */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        {/* Glow externo sutil */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full blur-2xl opacity-60"
            animate={{
              background: [
                'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)',
                'radial-gradient(circle, rgba(59,130,246,0.6) 0%, transparent 70%)',
                'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
        
        {/* Container do botão com glassmorphism */}
        <div
          className={`
            relative w-20 h-20 md:w-24 md:h-24 rounded-full
            backdrop-blur-2xl
            ${isActive 
              ? 'md:bg-gradient-to-br md:from-blue-500/90 md:via-blue-600/90 md:to-blue-700/90 bg-transparent' 
              : 'md:bg-gradient-to-br md:from-blue-500/80 md:via-blue-600/80 md:to-blue-700/80 bg-transparent'
            }
            md:shadow-2xl
            md:border md:border-white/20
            transition-all duration-300
            flex items-center justify-center
            group
          `}
        >
          {/* Brilho interno sutil (glass effect) - desktop only */}
          <div className="hidden md:block absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-50" />
          
          {/* Granulação sutil - desktop only */}
          <div 
            className="hidden md:block absolute inset-0 rounded-full opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
              mixBlendMode: 'overlay'
            }}
          />
          
          {/* Lottie Animation (subtler shadow on mobile) */}
          <div className="relative z-10 w-20 h-20 md:w-20 md:h-20">
            <DotLottieReact
              src={isResponding 
                ? "https://lottie.host/e3af700c-f136-4c6f-b6ef-f9806cd69ce0/B6wg9MbLel.lottie"
                : "https://lottie.host/6aa5c671-8963-49c0-8df8-24f536ff0691/5skE4d5jQJ.lottie"
              }
              loop
              autoplay
              className="w-full h-full md:drop-shadow-lg drop-shadow-sm"
              style={{ background: 'transparent', border: 'none', boxShadow: 'none', outline: 'none' }}
            />
          </div>
          
          {/* Ring externo quando ativo */}
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-full ring-2 ring-white/30 ring-offset-4 ring-offset-transparent"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )}
          
          {/* Hover effect - brilho adicional */}
          <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
        </div>
        
        {/* Label abaixo (opcional) - hidden on mobile */}
        {label && (
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap hidden md:block">
            <span className={`
              text-xs font-medium
              ${isActive ? 'text-white' : 'text-white/60'}
              transition-colors duration-300
            `}>
              {label}
            </span>
          </div>
        )}
      </motion.div>
    </button>
  );
}
