/**
 * PÁGINA: Finn - Assistente Virtual Inteligente
 * Assistente financeiro pessoal com IA
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import BottomNav from '@/ui/components/BottomNav';
import AddTransactionModal from '@/ui/components/AddTransactionModal';
import { Bot, Send, Lightbulb, TrendingUp, PiggyBank, AlertTriangle } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'finn';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export default function FinnPage() {
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
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [addModalOpen, setAddModalOpen] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Listen for sidebar add action
  useEffect(() => {
    const handler = () => setAddModalOpen(true);
    if (typeof window !== 'undefined') {
      window.addEventListener('openAddModal', handler as EventListener);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('openAddModal', handler as EventListener);
      }
    };
  }, []);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    // Adiciona mensagem do usuário
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simula resposta do Finn
    setTimeout(() => {
      const finnResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'finn',
        content: generateResponse(content),
        timestamp: new Date(),
        suggestions: generateSuggestions(content)
      };
      setMessages(prev => [...prev, finnResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('gasto') || input.includes('despesa')) {
      return 'Analisando seus gastos... Vi que você gastou R$ 2.450,00 este mês. Suas maiores despesas foram: Alimentação (35%), Transporte (25%) e Lazer (20%). Posso sugerir algumas economias se quiser!';
    }
    
    if (input.includes('economia') || input.includes('economizar')) {
      return 'Encontrei 3 oportunidades de economia: 1) Reduzir gastos com delivery em 30% = R$ 180/mês, 2) Negociar planos de streaming = R$ 50/mês, 3) Usar transporte público 2x/semana = R$ 120/mês. Total: R$ 350/mês!';
    }
    
    if (input.includes('investimento') || input.includes('investir')) {
      return 'Com base no seu perfil e objetivos, sugiro: 50% em Tesouro Selic (reserva), 30% em fundos de índice (longo prazo), 20% em ações diversificadas. Posso detalhar mais se quiser!';
    }
    
    if (input.includes('projeção') || input.includes('futuro')) {
      return 'Projeção para os próximos 6 meses: Se manter o ritmo atual, você terá R$ 8.500,00 economizados. Aplicando as economias sugeridas, pode chegar a R$ 10.600,00!';
    }

    return 'Entendi sua pergunta! Estou sempre aprendendo para te ajudar melhor. Posso analisar seus gastos, sugerir economias, fazer projeções financeiras ou dar dicas de investimento. O que te interessa mais?';
  };

  const generateSuggestions = (userInput: string): string[] => {
    const input = userInput.toLowerCase();
    
    if (input.includes('gasto')) {
      return ['Como economizar?', 'Comparar com mês passado', 'Ver detalhes por categoria'];
    }
    
    if (input.includes('economia')) {
      return ['Criar meta de economia', 'Ver histórico de economias', 'Dicas personalizadas'];
    }
    
    if (input.includes('investimento')) {
      return ['Meu perfil de investidor', 'Simulação de rendimento', 'Diversificar portfólio'];
    }
    
    return ['Analisar gastos', 'Dicas de economia', 'Planejamento mensal'];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-background pb-24 pt-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 mb-6">
        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
              <Bot size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Finn</h1>
              <p className="text-white/60 text-sm">Seu assistente financeiro inteligente</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-4xl mx-auto px-4 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => handleSendMessage('Analisar meus gastos do mês')}
            className="glass-card rounded-2xl p-4 hover:scale-105 transition-transform"
          >
            <TrendingUp size={24} className="text-primary mb-2" />
            <p className="text-xs text-white/80 font-medium">Análise de Gastos</p>
          </button>
          
          <button
            onClick={() => handleSendMessage('Sugerir economia')}
            className="glass-card rounded-2xl p-4 hover:scale-105 transition-transform"
          >
            <Lightbulb size={24} className="text-accent mb-2" />
            <p className="text-xs text-white/80 font-medium">Dicas de Economia</p>
          </button>
          
          <button
            onClick={() => handleSendMessage('Projeção financeira')}
            className="glass-card rounded-2xl p-4 hover:scale-105 transition-transform"
          >
            <PiggyBank size={24} className="text-success mb-2" />
            <p className="text-xs text-white/80 font-medium">Projeção</p>
          </button>
          
          <button
            onClick={() => handleSendMessage('Dicas de investimento')}
            className="glass-card rounded-2xl p-4 hover:scale-105 transition-transform"
          >
            <AlertTriangle size={24} className="text-warning mb-2" />
            <p className="text-xs text-white/80 font-medium">Investimentos</p>
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="max-w-4xl mx-auto px-4 mb-24">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                {message.type === 'finn' && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Bot size={16} className="text-white" />
                    </div>
                    <span className="text-xs text-white/60">Finn</span>
                  </div>
                )}
                
                <div
                  className={`rounded-2xl p-4 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-br from-primary to-accent text-white'
                      : 'glass-card text-white/90'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>

                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(suggestion)}
                        className="px-3 py-1.5 rounded-full glass-card text-xs text-white/70 hover:text-white hover:scale-105 transition-all"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}

                <p className="text-xs text-white/40 mt-2">
                  {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="glass-card rounded-2xl p-4">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-20 left-0 right-0 px-4 pb-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-strong rounded-3xl p-3 flex items-center gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              placeholder="Pergunte algo ao Finn..."
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/40 px-2"
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim()}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      <AddTransactionModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} />
      <BottomNav activeItem="/finn" onAddClick={() => setAddModalOpen(true)} isResponding={isTyping} />
    </div>
  );
}
