'use client';

import React, { useEffect, useRef } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface LiquidGlassAnimationProps {
  src?: string;
  autoplay?: boolean;
  loop?: boolean;
  className?: string;
  width?: number;
  height?: number;
}

export default function LiquidGlassAnimation({
  src = '/animations/liquid-glass.json',
  autoplay = true,
  loop = true,
  className = '',
  width = 200,
  height = 200,
}: LiquidGlassAnimationProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <DotLottieReact
        src={src}
        loop={loop}
        autoplay={autoplay}
        style={{ width, height }}
      />
    </div>
  );
}

// Componente com controle avançado para Next.js
export function ControlledLiquidGlass() {
  const lottieRef = useRef<any>(null);

  const handlePlay = () => {
    if (lottieRef.current) {
      lottieRef.current.play();
    }
  };

  const handlePause = () => {
    if (lottieRef.current) {
      lottieRef.current.pause();
    }
  };

  const handleStop = () => {
    if (lottieRef.current) {
      lottieRef.current.stop();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <DotLottieReact
        ref={lottieRef}
        src="/animations/liquid-glass.json"
        loop={false}
        autoplay={false}
        style={{ width: 300, height: 300 }}
      />
      
      <div className="flex gap-2">
        <button
          onClick={handlePlay}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Play
        </button>
        
        <button
          onClick={handlePause}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          Pause
        </button>
        
        <button
          onClick={handleStop}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Stop
        </button>
      </div>
    </div>
  );
}