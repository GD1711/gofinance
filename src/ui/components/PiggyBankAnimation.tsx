
'use client';

import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface PiggyBankAnimationProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function PiggyBankAnimation({
  width = 60,
  height = 60,
  className = '',
}: PiggyBankAnimationProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <DotLottieReact
        src="/animations/piggy-bank.json"
        loop={true}
        autoplay={true}
        style={{ width, height }}
      />
    </div>
  );
}