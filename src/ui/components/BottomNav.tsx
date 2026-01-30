/**
 * COMPONENTE: BottomNav
 * Navegação inferior premium com glass effect
 * Layout: Início | Transações | [FINN] | Investimentos | Adicionar
 */

'use client';

import { House, ChartLine, TrendingUp, PlusCircle } from '@/ui/icons';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import PremiumCenterButton from './PremiumCenterButton';

interface NavItem {
  href: string;
  icon: React.ElementType;
  label: string;
  isCenter?: boolean;
  isAction?: boolean;
  position?: 'left' | 'right';
}

const NAV_ITEMS: NavItem[] = [
  { href: '/', icon: House, label: 'Início', position: 'left' },
  { href: '/transactions', icon: ChartLine, label: 'Transações', position: 'left' },
  { href: '/investments', icon: TrendingUp, label: 'Investimentos', position: 'right' },
  { href: '#', icon: PlusCircle, label: 'Adicionar', isAction: true, position: 'right' },
];

interface BottomNavProps {
  activeItem?: string;
  onAddClick?: () => void;
  isResponding?: boolean;
}

export default function BottomNav({ activeItem, onAddClick, isResponding = false }: BottomNavProps) {
  const pathname = usePathname();

  const handleItemClick = (item: NavItem, e: React.MouseEvent) => {
    if (item.isAction) {
      e.preventDefault();
      onAddClick?.();
    }
  };

  const handleFinnClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('openFinnModal'));
    }
  };

  const leftItems = NAV_ITEMS.filter(item => item.position === 'left');
  const rightItems = NAV_ITEMS.filter(item => item.position === 'right');

  // Verificar se Finn está ativo
  const isFinnActive = pathname === '/finn' || activeItem === '/finn';

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      {/* Glass Container Premium (mobile softer background) */}
      <div className="relative bg-black/50 md:bg-black/70 backdrop-blur-3xl rounded-[28px] shadow-2xl border border-white/10 overflow-visible">
        {/* Gradient Overlay sutil (reduced) */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/[0.02] to-transparent pointer-events-none rounded-[28px]" />
        
        <div className="relative max-w-4xl mx-auto px-3 md:px-6">
          <div className="flex items-center justify-between py-2 md:py-2.5">
            {/* Lado Esquerdo */}
            <div className="flex items-center gap-1 md:gap-2">
              {leftItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  (activeItem && (activeItem === item.href || activeItem.toLowerCase() === item.label.toLowerCase())) ||
                  (!activeItem && pathname === item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      relative flex flex-col items-center gap-0.5 px-3 md:px-5 py-2 md:py-2.5 rounded-xl transition-all duration-300
                      ${isActive
                        ? 'text-white bg-white/5 shadow-sm'
                        : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                      }
                    `}
                  >
                    <Icon size={22} weight={isActive ? 'fill' : 'regular'} />
                    <span className="hidden md:block text-[10px] md:text-[11px] font-medium">{item.label}</span>
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-white/60 shadow-sm" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Centro - Botão Premium Finn */}
            <PremiumCenterButton 
              onClick={handleFinnClick}
              isActive={isFinnActive}
              isResponding={isResponding}
            />

            {/* Lado Direito */}
            <div className="flex items-center gap-1 md:gap-2">
              {rightItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  (activeItem && (activeItem === item.href || activeItem.toLowerCase() === item.label.toLowerCase())) ||
                  (!activeItem && pathname === item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleItemClick(item, e)}
                    className={`
                      relative flex flex-col items-center gap-0.5 px-3 md:px-5 py-2 md:py-2.5 rounded-xl transition-all duration-300
                      ${item.isAction
                        ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-500/10'
                        : isActive
                        ? 'text-white bg-white/5 shadow-sm'
                        : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                      }
                    `}
                  >
                    <Icon size={22} weight={isActive ? 'fill' : 'regular'} />
                    <span className="hidden md:block text-[10px] md:text-[11px] font-medium">{item.label}</span>
                    {isActive && !item.isAction && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-white/60 shadow-sm" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
