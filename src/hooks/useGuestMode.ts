/**
 * HOOK: useGuestMode
 * Gerencia modo convidado vs autenticado
 * 
 * FEATURES:
 * - Detecta se usuário é convidado (localStorage)
 * - Persiste TODOS os dados localmente (sem backend ainda)
 * - Dados salvos no localStorage para ambos os modos
 * - Migração para banco quando backend estiver pronto
 */

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export type UserMode = 'guest' | 'authenticated' | 'loading';

export interface GuestData {
  financialData: any[];
  settings: {
    savingsGoal: number;
    alertsEnabled: boolean;
    theme: 'dark' | 'light' | 'system';
  };
}

export function useGuestMode() {
  const { data: session, status } = useSession();
  
  // Verifica guest mode imediatamente no client-side
  const [initialMode] = useState<UserMode>(() => {
    if (typeof window !== 'undefined') {
      const isGuest = localStorage.getItem('gofinance_guest_mode') === 'true';
      return isGuest ? 'guest' : 'loading';
    }
    return 'loading';
  });
  
  const [mode, setMode] = useState<UserMode>(initialMode);

  useEffect(() => {
    if (status === 'loading') {
      // Não muda o mode se já é guest
      if (mode !== 'guest') {
        setMode('loading');
      }
      return;
    }

    if (status === 'authenticated') {
      setMode('authenticated');
      // Dados continuam locais até ter backend
    } else {
      const isGuest = localStorage.getItem('gofinance_guest_mode') === 'true';
      setMode(isGuest ? 'guest' : 'loading');
    }
  }, [status]);

  const enterAsGuest = () => {
    localStorage.setItem('gofinance_guest_mode', 'true');
    setMode('guest');
  };

  const exitGuestMode = () => {
    localStorage.removeItem('gofinance_guest_mode');
    setMode('loading');
  };

  // Salva dados localmente (para ambos os modos até ter backend)
  const saveGuestData = (data: Partial<GuestData>) => {
    const existing = getGuestData();
    const updated = { ...existing, ...data };
    const storageKey = mode === 'authenticated' && session?.user?.id 
      ? `gofinance_data_${session.user.id}`
      : 'gofinance_guest_data';
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const getGuestData = (): GuestData => {
    const storageKey = mode === 'authenticated' && session?.user?.id
      ? `gofinance_data_${session.user.id}`
      : 'gofinance_guest_data';
    const stored = localStorage.getItem(storageKey);
    if (!stored) {
      return {
        financialData: [],
        settings: {
          savingsGoal: 15,
          alertsEnabled: true,
          theme: 'dark'
        }
      };
    }
    return JSON.parse(stored);
  };

  const migrateGuestDataIfNeeded = () => {
    // TODO: Implementar quando tiver backend
    // Por enquanto, dados ficam todos no localStorage
  };

  return {
    mode,
    isGuest: mode === 'guest',
    isAuthenticated: mode === 'authenticated',
    isLoading: mode === 'loading',
    enterAsGuest,
    exitGuestMode,
    saveGuestData,
    getGuestData,
    user: session?.user || null
  };
}
