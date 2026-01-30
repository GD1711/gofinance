'use client';

import React from 'react';
import * as simpleIcons from 'simple-icons';

interface BrandIconProps {
  brandName: string;
  size?: number;
  className?: string;
  forceWhite?: boolean;
}

export function BrandIcon({ brandName, size = 24, className = '', forceWhite = false }: BrandIconProps) {
  // Converte o nome da marca para o formato do simple-icons (ex: "Netflix" -> "siNetflix")
  const iconKey = `si${brandName.charAt(0).toUpperCase() + brandName.slice(1).toLowerCase()}`;
  
  // @ts-ignore - simple-icons usa chaves dinâmicas
  const icon = simpleIcons[iconKey];

  if (!icon) {
    // Ícone genérico se não encontrar a marca
    return (
      <div 
        className={`flex items-center justify-center rounded-lg bg-white/10 ${className}`}
        style={{ width: size, height: size }}
      >
        <span className="text-white font-bold text-xs">
          {brandName.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      style={{ fill: forceWhite ? '#ffffff' : `#${icon.hex}` }}
      dangerouslySetInnerHTML={{ __html: icon.path }}
    />
  );
}
