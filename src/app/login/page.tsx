/**
 * PÁGINA: Login
 * Autenticação OFFLINE (admin/admin) + Modo Convidado
 */

'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { GoogleChromeLogo, Shield, Lightning, ArrowRight, User, Lock, TrendUp } from '@/ui/icons';
import { useAuth } from '@/hooks/useAuth';
import { Button, Input } from '@heroui/react';
import LiquidGlass from '@/ui/components/LiquidGlass';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signInWithGoogle, enterAsGuest } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = signIn(username, password);
    if (success) {
      router.push('/');
    } else {
      setError('Usuário ou senha incorretos');
    }
  };

  const handleGoogleLogin = () => {
    // Login simulado offline
    signInWithGoogle({
      name: 'Usuário Google',
      email: 'usuario@google.com',
      picture: 'https://ui-avatars.com/api/?name=Usuario+Google&background=FF6B00&color=fff&size=128'
    });
    router.push('/');
  };

  const handleGuestMode = () => {
    enterAsGuest();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-50" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <LiquidGlass intensity="high" color="black">
          <div className="p-8">
            {/* Logo e Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 mb-4">
                <TrendUp size={32} weight="bold" className="text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                GOFinance
              </h1>
              <p className="text-white/60">
                Previsão financeira inteligente
              </p>
            </div>

            {/* Formulário de Login */}
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="px-4 py-2 rounded-lg bg-status-error/10 border border-status-error/20 text-status-error text-sm">
                  {error}
                </div>
              )}
              
              <Input
                type="text"
                label="Usuário"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                startContent={<User size={18} className="text-white/40" />}
                classNames={{
                  base: "w-full",
                  label: "text-white/60",
                  input: "text-white placeholder:text-white/30 bg-transparent",
                  inputWrapper: "bg-white/5 border border-white/10 data-[hover=true]:bg-white/10 group-data-[focus=true]:border-primary",
                }}
              />

              <Input
                type="password"
                label="Senha"
                placeholder="admin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                startContent={<Lock size={18} className="text-white/40" />}
                classNames={{
                  base: "w-full",
                  label: "text-white/60",
                  input: "text-white placeholder:text-white/30 bg-transparent",
                  inputWrapper: "bg-white/5 border border-white/10 data-[hover=true]:bg-white/10 group-data-[focus=true]:border-primary",
                }}
              />

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white font-semibold"
                size="lg"
              >
                Entrar
              </Button>

              <p className="text-xs text-center text-white/40">
                Credenciais de teste: <span className="text-primary">admin / admin</span>
              </p>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-black px-4 text-white/40 uppercase tracking-wider">
                  ou continue com
                </span>
              </div>
            </div>

            {/* Botão Google */}
            <Button
              onClick={handleGoogleLogin}
              className="w-full bg-white text-black font-semibold"
              size="lg"
              startContent={<GoogleChromeLogo size={24} weight="bold" />}
            >
              Google (simulado)
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-black px-4 text-white/40 uppercase tracking-wider">
                  ou
                </span>
              </div>
            </div>

            {/* Botão Convidado */}
            <Button
              onClick={handleGuestMode}
              variant="bordered"
              className="w-full border-white/10 text-white hover:bg-white/10"
              size="lg"
              startContent={<ArrowRight size={20} />}
            >
              Entrar sem login
            </Button>

            <p className="mt-3 text-xs text-center text-white/40">
              Teste o app agora. Sem cadastro, sem complicação.
            </p>

            {/* Features */}
            <div className="mt-8 space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Shield size={16} weight="bold" className="text-primary" />
                </div>
                <div>
                  <p className="text-white font-medium">Seguro e Confiável</p>
                  <p className="text-white/60 text-xs">
                    OAuth 2.0 com Google. Sem senhas no nosso sistema.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Lightning size={16} weight="bold" className="text-primary" />
                </div>
                <div>
                  <p className="text-white font-medium">Login em segundos</p>
                  <p className="text-white/60 text-xs">
                    Use sua conta Google existente. Sem cadastros longos.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <p className="mt-8 text-xs text-center text-white/40">
              Ao continuar, você concorda com nossos{' '}
              <a href="#" className="text-primary hover:underline">Termos de Uso</a>
              {' '}e{' '}
              <a href="#" className="text-primary hover:underline">Política de Privacidade</a>
            </p>
          </div>
        </LiquidGlass>
      </motion.div>
    </div>
  );
}
