/**
 * HOOK: useAuth
 * Sistema de autenticação 100% offline (sem backend/API)
 * 
 * FEATURES:
 * - Modo convidado (localStorage)
 * - Modo Google simulado (localStorage)
 * - Zero dependência de API
 * - Dados locais por usuário
 */

'use client';

import { useState, useEffect } from 'react';

export type UserMode = 'guest' | 'authenticated' | 'loading';

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export interface UserData {
  financialData: any[];
  settings: {
    savingsGoal: number;
    alertsEnabled: boolean;
    theme: 'dark' | 'light' | 'system';
  };
}

const STORAGE_KEYS = {
  MODE: 'gofinance_mode',
  USER: 'gofinance_user',
  GUEST_DATA: 'gofinance_guest_data',
};

export function useAuth() {
  // Inicialização imediata do cliente - sem loading
  const [mode, setMode] = useState<UserMode>(() => {
    if (typeof window === 'undefined') return 'guest';
    const savedMode = localStorage.getItem(STORAGE_KEYS.MODE);
    return (savedMode as UserMode) || 'guest';
  });

  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null;
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    // Verifica modo ao carregar
    const savedMode = localStorage.getItem(STORAGE_KEYS.MODE);
    if (savedMode) {
      setMode(savedMode as UserMode);
      if (savedMode === 'authenticated') {
        const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      }
    } else {
      setMode('guest');
    }
  }, []);

  // Entra como convidado
  const enterAsGuest = () => {
    localStorage.setItem(STORAGE_KEYS.MODE, 'guest');
    setMode('guest');
    setUser(null);
  };

  // Login com credenciais (offline)
  const signIn = (username: string, password: string): boolean => {
    // Credenciais fixas para teste
    if (username === 'admin' && password === 'admin') {
      const userId = 'admin_local';
      const newUser: User = {
        id: userId,
        name: 'Administrador',
        email: 'admin@gofinance.com',
        image: 'https://ui-avatars.com/api/?name=Admin&background=FF6B00&color=fff&size=128',
      };
      
      localStorage.setItem(STORAGE_KEYS.MODE, 'authenticated');
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
      
      // Migra dados do convidado se existirem
      const guestData = localStorage.getItem(STORAGE_KEYS.GUEST_DATA);
      if (guestData) {
        localStorage.setItem(`gofinance_data_${userId}`, guestData);
        localStorage.removeItem(STORAGE_KEYS.GUEST_DATA);
      }
      
      setMode('authenticated');
      setUser(newUser);
      return true;
    }
    return false;
  };

  // Login simulado com Google (offline)
  const signInWithGoogle = (googleUser: { name: string; email: string; picture?: string }) => {
    const userId = `google_${Date.now()}`;
    const newUser: User = {
      id: userId,
      name: googleUser.name,
      email: googleUser.email,
      image: googleUser.picture,
    };
    
    localStorage.setItem(STORAGE_KEYS.MODE, 'authenticated');
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
    
    // Migra dados do convidado se existirem
    const guestData = localStorage.getItem(STORAGE_KEYS.GUEST_DATA);
    if (guestData) {
      localStorage.setItem(`gofinance_data_${userId}`, guestData);
      localStorage.removeItem(STORAGE_KEYS.GUEST_DATA);
    }
    
    setMode('authenticated');
    setUser(newUser);
  };

  // Logout
  const signOut = () => {
    localStorage.removeItem(STORAGE_KEYS.MODE);
    localStorage.removeItem(STORAGE_KEYS.USER);
    setMode('loading');
    setUser(null);
  };

  // Salva dados do usuário
  const saveUserData = (data: Partial<UserData>) => {
    const existing = getUserData();
    const updated = { ...existing, ...data };
    
    const storageKey = mode === 'authenticated' && user?.id
      ? `gofinance_data_${user.id}`
      : STORAGE_KEYS.GUEST_DATA;
    
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  // Recupera dados do usuário
  const getUserData = (): UserData => {
    const storageKey = mode === 'authenticated' && user?.id
      ? `gofinance_data_${user.id}`
      : STORAGE_KEYS.GUEST_DATA;
    
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

  return {
    mode,
    user,
    isGuest: mode === 'guest',
    isAuthenticated: mode === 'authenticated',
    isLoading: mode === 'loading',
    enterAsGuest,
    signIn,
    signInWithGoogle,
    signOut,
    saveUserData,
    getUserData,
  };
}
