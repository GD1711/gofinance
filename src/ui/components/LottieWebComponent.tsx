'use client';

import { useEffect, useRef } from 'react';

interface LottieWebComponentProps {
  src: string;
  width?: string;
  height?: string;
  autoplay?: boolean;
  loop?: boolean;
  className?: string;
}

export default function LottieWebComponent({
  src,
  width = '120px',
  height = '120px',
  autoplay = true,
  loop = true,
  className = ''
}: LottieWebComponentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const element = document.createElement('dotlottie-wc');
      element.setAttribute('src', src);
      element.style.width = width;
      element.style.height = height;
      
      if (autoplay) {
        element.setAttribute('autoplay', '');
      }
      
      if (loop) {
        element.setAttribute('loop', '');
      }

      containerRef.current.appendChild(element);

      return () => {
        if (containerRef.current && element.parentNode) {
          element.parentNode.removeChild(element);
        }
      };
    }
  }, [src, width, height, autoplay, loop]);

  return <div ref={containerRef} className={className} />;
}