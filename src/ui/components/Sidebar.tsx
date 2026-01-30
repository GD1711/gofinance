"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { House, ChartLine, TrendingUp, PlusCircle, X, Send, Lightbulb } from '@/ui/icons';

interface NavItem {
  href: string;
  icon: React.ElementType;
  label: string;
  isCenter?: boolean;
  isAction?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { href: '/', icon: House, label: 'Início' },
  { href: '/transactions', icon: ChartLine, label: 'Trans.' },
  { href: '#finn', icon: ChartLine, label: 'Finn', isCenter: true },
  { href: '/investments', icon: TrendingUp, label: 'Invest.' },
  { href: '#add', icon: PlusCircle, label: 'Adicionar', isAction: true },
];

interface Message {
  id: string;
  type: 'user' | 'finn';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export default function Sidebar() {
  const pathname = usePathname();
  const [isFinnModalOpen, setIsFinnModalOpen] = useState(false);
  const [isResponding, setIsResponding] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'finn',
      content: 'Olá! Eu sou o Finn, seu assistente financeiro pessoal. Como posso te ajudar hoje?',
      timestamp: new Date(),
      suggestions: [
        'Analisar meus gastos do mês',
        'Sugerir economia',
        'Projeção financeira',
        'Dicas de investimento'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Listen for global openFinnModal event
  useEffect(() => {
    const handler = () => setIsFinnModalOpen(true);
    if (typeof window !== 'undefined') {
      window.addEventListener('openFinnModal', handler as EventListener);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('openFinnModal', handler as EventListener);
      }
    };
  }, []);

  const handleAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('openAddModal'));
    }
  };

  const handleFinnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFinnModalOpen(true);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsResponding(true);

    setTimeout(() => {
      const finnResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'finn',
        content: generateResponse(inputValue),
        timestamp: new Date(),
        suggestions: generateSuggestions(inputValue)
      };
      setMessages(prev => [...prev, finnResponse]);
      setIsResponding(false);
    }, 1500);
  };

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('gasto') || input.includes('despesa')) {
      return 'Analisando seus gastos... Vi que você gastou R$ 2.450,00 este mês. Suas maiores despesas foram: Alimentação (35%), Transporte (25%) e Lazer (20%). Posso sugerir algumas economias!';
    }
    
    if (input.includes('economia') || input.includes('economizar')) {
      return 'Encontrei 3 oportunidades de economia: 1) Reduzir gastos com delivery em 30% = R$ 180/mês, 2) Negociar planos de streaming = R$ 50/mês. Total: R$ 230/mês!';
    }
    
    if (input.includes('investimento') || input.includes('investir')) {
      return 'Com base no seu perfil, sugiro: 50% em Tesouro Selic (reserva), 30% em fundos de índice, 20% em ações diversificadas. Quer detalhes?';
    }
    
    if (input.includes('projeção') || input.includes('futuro')) {
      return 'Projeção para 6 meses: mantendo o ritmo atual, você terá R$ 8.500 economizados. Com as economias sugeridas: R$ 10.600!';
    }

    return 'Entendi! Posso analisar seus gastos, sugerir economias, fazer projeções ou dar dicas de investimento. O que te interessa?';
  };

  const generateSuggestions = (userInput: string): string[] => {
    const input = userInput.toLowerCase();
    
    if (input.includes('gasto')) {
      return ['Como economizar?', 'Comparar com mês passado', 'Detalhes por categoria'];
    }
    
    if (input.includes('economia')) {
      return ['Criar meta', 'Ver histórico', 'Dicas personalizadas'];
    }
    
    if (input.includes('investimento')) {
      return ['Meu perfil', 'Simulação', 'Diversificar'];
    }
    
    return ['Analisar gastos', 'Dicas de economia', 'Planejamento'];
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <>
      {/* Sidebar - Only Desktop (vertical) */}
      <aside className="hidden md:block fixed z-[65] left-4 top-1/2 -translate-y-1/2">
        
        {/* Liquid Glass Container */}
        <div className="relative overflow-hidden border border-white/10 flex flex-col items-center w-20 py-4 rounded-3xl">
          
          {/* Liquid Glass Effect - No Shadow */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-3xl" />
          
          {/* Animated Gradient Overlay */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                'radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Navigation Items */}
          <div className="relative z-10 flex flex-col w-full gap-1 items-center">
            {NAV_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              // Finn (Center Button with Lottie)
              if (item.isCenter) {
                return (
                  <motion.button
                    key={item.href + idx}
                    onClick={handleFinnClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative flex items-center justify-center my-3 w-16 h-16 group"
                  >
                    {/* Lottie Container - No Border, No Background */}
                    <div className="w-full h-full flex items-center justify-center">
                      <DotLottieReact
                        src={isResponding
                          ? "https://lottie.host/e3af700c-f136-4c6f-b6ef-f9806cd69ce0/B6wg9MbLel.lottie"
                          : "https://lottie.host/6aa5c671-8963-49c0-8df8-24f536ff0691/5skE4d5jQJ.lottie"
                        }
                        loop
                        autoplay
                        className="w-14 h-14"
                        style={{ background: 'transparent', border: 'none', boxShadow: 'none', outline: 'none' }}
                      />
                    </div>
                    {/* Tooltip on hover */}
                    <span className="pointer-events-none absolute left-full ml-3 hidden group-hover:inline-block bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                      {item.label}
                    </span>
                  </motion.button>
                );
              }

              // Add Button
              if (item.isAction) {
                return (
                  <motion.button
                    key={item.href + idx}
                    onClick={handleAddClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative flex items-center justify-center rounded-xl transition-all duration-200 my-1 w-14 h-14"
                  >
                    <div className="w-full h-full flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                      <Icon size={20} className="text-white/90" />
                    </div>
                    {/* Tooltip on hover */}
                    <span className="pointer-events-none absolute left-full ml-3 hidden group-hover:inline-block bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                      {item.label}
                    </span>
                  </motion.button>
                );
              }

              // Regular Nav Items
              return (
                <Link
                  key={item.href + idx}
                  href={item.href}
                  className="group relative flex items-center justify-center rounded-xl transition-all duration-200 hover:scale-105 my-1 w-14 h-14"
                >
                  <div
                    className={`w-full h-full flex items-center justify-center rounded-xl transition-colors ${
                      isActive ? 'bg-white/10' : 'bg-transparent hover:bg-white/5'
                    }`}
                  >
                    <Icon size={20} className="text-white/90" />
                  </div>
                  {/* Tooltip on hover */}
                  <span className="pointer-events-none absolute left-full ml-3 hidden group-hover:inline-block bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Finn Modal - Desktop: Beside Sidebar, Mobile: Full Screen Above */}
      <AnimatePresence>
        {isFinnModalOpen && (
          <>
            {/* Backdrop - Behind modal and sidebar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFinnModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55]"
            />

            {/* Desktop Modal - Beside Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed left-28 top-16 w-[480px] max-h-[calc(100vh-8rem)] bg-black/85 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden z-[70] hidden md:flex md:flex-col"
            >
              {/* Header */}
              <div className="relative flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 flex items-center justify-center">
                    <DotLottieReact
                      src={isResponding
                        ? "https://lottie.host/e3af700c-f136-4c6f-b6ef-f9806cd69ce0/B6wg9MbLel.lottie"
                        : "https://lottie.host/6aa5c671-8963-49c0-8df8-24f536ff0691/5skE4d5jQJ.lottie"
                      }
                      loop
                      autoplay
                      className="w-12 h-12"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Finn</h2>
                    <p className="text-sm text-white/60">Assistente financeiro inteligente</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsFinnModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <X size={18} className="text-white" />
                </button>
              </div>

              {/* Quick Actions */}
              <div className="px-6 py-4 border-b border-white/5">
                <div className="grid grid-cols-2 gap-2">
                  {['Analisar gastos', 'Sugerir economia', 'Projeção futura', 'Investimentos'].map((action) => (
                    <button
                      key={action}
                      onClick={() => setInputValue(action)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-left"
                    >
                      <Lightbulb size={14} className="text-blue-400" />
                      <span className="text-xs text-white/80">{action}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${message.type === 'user' ? 'bg-blue-600/20 border-blue-500/30' : 'bg-white/5 border-white/10'} border rounded-2xl p-4`}>
                      <p className="text-white/90 text-sm leading-relaxed">{message.content}</p>
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/70 transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isResponding && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-6 border-t border-white/10">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-white/20 transition-colors"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="px-4 py-3 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Mobile Modal - Full Screen Above */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="md:hidden fixed inset-4 top-4 bottom-24 bg-black/90 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden z-[70] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <DotLottieReact
                      src={isResponding
                        ? "https://lottie.host/e3af700c-f136-4c6f-b6ef-f9806cd69ce0/B6wg9MbLel.lottie"
                        : "https://lottie.host/6aa5c671-8963-49c0-8df8-24f536ff0691/5skE4d5jQJ.lottie"
                      }
                      loop
                      autoplay
                      className="w-8 h-8"
                    />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">Finn</h2>
                    <p className="text-xs text-white/60">Assistente financeiro</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsFinnModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>

              {/* Quick Actions Mobile */}
              <div className="px-4 py-3 border-b border-white/5">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {['Gastos', 'Economia', 'Projeção', 'Investir'].map((action) => (
                    <button
                      key={action}
                      onClick={() => setInputValue(action)}
                      className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                      <span className="text-xs text-white/80">{action}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Messages Mobile */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] ${message.type === 'user' ? 'bg-blue-600/20 border-blue-500/30' : 'bg-white/5 border-white/10'} border rounded-2xl p-3`}>
                      <p className="text-white/90 text-sm leading-relaxed">{message.content}</p>
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {message.suggestions.map((suggestion, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/70 transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isResponding && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area Mobile */}
              <div className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Digite..."
                    className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/20 transition-colors"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="px-3 py-2 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
