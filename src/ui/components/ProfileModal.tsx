/**
 * COMPONENTE: ProfileModal
 * Modal de perfil com glassmorphism
 * 
 * FEATURES:
 * - Avatar do Google (não editável) ou avatar padrão (convidado)
 * - Nome e email (fonte: Google) ou "Convidado"
 * - Configurações editáveis (meta poupança, tema, alertas)
 * - Logout ou CTA para fazer login (convidado)
 * - Click fora fecha o modal
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, SignOut, Target, Bell, Moon, Sun, User, GoogleChromeLogo, Warning } from '@/ui/icons';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import LiquidGlass from './LiquidGlass';

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ProfileModal({ open, onClose }: ProfileModalProps) {
  const { isGuest, user, saveUserData, getUserData, signOut } = useAuth();
  
  // Carrega dados locais para qualquer modo (guest ou authenticated)
  const [localData, setLocalData] = useState(() => {
    if (typeof window !== 'undefined') {
      return getUserData();
    }
    return {
      financialData: [],
      settings: { savingsGoal: 15, alertsEnabled: true, theme: 'dark' as const }
    };
  });
  
  const [savingsGoal, setSavingsGoal] = useState(localData.settings.savingsGoal || 15);
  const [alertsEnabled, setAlertsEnabled] = useState(localData.settings.alertsEnabled !== false);
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>(localData.settings.theme || 'dark');

  // Salva configurações localmente (para ambos os modos)
  const handleSettingChange = (setting: string, value: any) => {
    // Sempre salva local até ter backend
    saveUserData({
      settings: {
        savingsGoal: setting === 'savingsGoal' ? value : savingsGoal,
        alertsEnabled: setting === 'alertsEnabled' ? value : alertsEnabled,
        theme: setting === 'theme' ? value : theme
      }
    });
    
    if (setting === 'savingsGoal') setSavingsGoal(value);
    if (setting === 'alertsEnabled') setAlertsEnabled(value);
    if (setting === 'theme') setTheme(value);
  };

  const handleLogout = () => {
    signOut();
    onClose();
    window.location.href = '/login';
  };

  const handleGoogleLogin = () => {
    // Login simulado offline
    onClose();
    window.location.href = '/login';
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="relative z-10 w-full max-w-md"
          >
            <LiquidGlass intensity="high" color="black" className="overflow-hidden">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Perfil</h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X size={20} className="text-white/60" />
                  </button>
                </div>

                {/* Avatar e Info */}
                <div className="flex flex-col items-center gap-3 mb-6 pb-6 border-b border-white/10">
                  {user?.image ? (
                    <img
                      src={user.image}
                      alt={user.name || 'User'}
                      className="w-20 h-20 rounded-full ring-2 ring-primary/20"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center ring-2 ring-white/10">
                      <User size={36} className="text-white/60" />
                    </div>
                  )}
                  
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-white">
                      {user?.name || 'Convidado'}
                    </h3>
                    {user?.email && (
                      <p className="text-sm text-white/60">
                        {user.email}
                      </p>
                    )}
                  </div>

                  {isGuest ? (
                    <>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                        <Warning size={14} weight="bold" className="text-primary" />
                        <span className="text-xs text-primary font-medium">
                          Modo convidado
                        </span>
                      </div>
                      
                      {/* CTA para fazer login */}
                      <motion.button
                        onClick={handleGoogleLogin}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white text-black font-semibold shadow-lg hover:shadow-xl transition-all"
                      >
                        <GoogleChromeLogo size={18} weight="bold" />
                        <span>Entrar com Google</span>
                      </motion.button>
                      <p className="text-xs text-center text-white/60 px-4">
                        Salve seus dados na nuvem e acesse de qualquer dispositivo
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-status-success/10 border border-status-success/20">
                        <div className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
                        <span className="text-xs text-status-success font-medium">
                          Conta Google conectada
                        </span>
                      </div>
                      <p className="text-xs text-white/40 text-center mt-2">
                        Essas informações vêm da sua conta Google
                      </p>
                    </>
                  )}
                </div>

                {/* Configurações */}
                <div className="space-y-6">
                  <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider">
                    Configurações
                  </h3>
                  <h3 className="text-sm font-bold text-white/80 uppercase tracking-wide">
                    Configurações
                  </h3>

                  {/* Meta de Poupança */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target size={16} className="text-primary" />
                        <label className="text-sm text-white">Meta de Poupança</label>
                      </div>
                      <span className="text-sm font-bold text-primary">
                        {savingsGoal}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      step="5"
                      value={savingsGoal}
                      onChange={(e) => setSavingsGoal(Number(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none bg-white/10 cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                    <p className="text-xs text-white/40">
                      Recomendado: 10-20% (OECD)
                    </p>
                  </div>

                  {/* Alertas Financeiros */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-2">
                      <Bell size={16} className="text-primary" />
                      <span className="text-sm text-white">Alertas Financeiros</span>
                    </div>
                    <button
                      onClick={() => handleSettingChange('alertsEnabled', !alertsEnabled)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        alertsEnabled ? 'bg-primary' : 'bg-white/20'
                      }`}
                    >
                      <motion.div
                        animate={{ x: alertsEnabled ? 24 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-lg"
                      />
                    </button>
                  </div>

                  {/* Tema */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      {theme === 'dark' ? (
                        <Moon size={16} className="text-primary" />
                      ) : (
                        <Sun size={16} className="text-primary" />
                      )}
                      <label className="text-sm text-white">Tema</label>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {(['dark', 'light', 'system'] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => handleSettingChange('theme', t)}
                          className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                            theme === t
                              ? 'bg-primary text-white'
                              : 'bg-white/5 text-white/60 hover:bg-white/10'
                          }`}
                        >
                          {t === 'dark' ? 'Escuro' : t === 'light' ? 'Claro' : 'Sistema'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Logout / Sair do modo convidado */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-status-error/10 hover:bg-status-error/20 border border-status-error/20 text-status-error font-medium transition-all"
                >
                  <SignOut size={18} weight="bold" />
                  <span>{isGuest ? 'Sair do modo convidado' : 'Sair da conta'}</span>
                </button>
              </div>
            </LiquidGlass>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
