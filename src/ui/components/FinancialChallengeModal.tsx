"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FinancialChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

/**
 * Modal com narrativa imersiva e efeito de máquina de escrever
 * Apresenta o conceito de planejamento financeiro de forma emocional
 */
export default function FinancialChallengeModal({
  isOpen,
  onClose,
  onAccept,
}: FinancialChallengeModalProps) {
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const narrative = [
    'Ano desconhecido.',
    '',
    'Antes das bolsas, antes dos gráficos,\nantes mesmo de alguém chamar isso de investimento…',
    '',
    'havia apenas uma pergunta:',
    '',
    '"Se eu guardar um pouco hoje,\nquem eu me torno amanhã?"',
    '',
    'Nenhuma previsão.\nNenhuma aposta.\nApenas constância.',
    '',
    'Este sistema não promete riqueza rápida.\nEle constrói algo mais raro:\ncontrole.',
    '',
    'Você escolhe o valor.\nVocê escolhe o tempo.\nO cálculo apenas obedece.',
    '',
    'Aceita um desafio?',
  ];

  // Efeito de máquina de escrever
  useEffect(() => {
    if (!isOpen) {
      setCurrentParagraph(0);
      setDisplayedText('');
      setIsTypingComplete(false);
      return;
    }

    if (currentParagraph >= narrative.length) {
      setIsTypingComplete(true);
      return;
    }

    const text = narrative[currentParagraph];
    let charIndex = 0;

    // Parágrafos vazios aparecem instantaneamente
    if (text === '') {
      setDisplayedText('');
      const timer = setTimeout(() => {
        setCurrentParagraph(prev => prev + 1);
      }, 200);
      return () => clearTimeout(timer);
    }

    setDisplayedText('');

    const typingInterval = setInterval(() => {
      if (charIndex < text.length) {
        setDisplayedText(text.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        // Pausa entre parágrafos
        setTimeout(() => {
          setCurrentParagraph(prev => prev + 1);
        }, 800);
      }
    }, 30); // Velocidade da digitação

    return () => clearInterval(typingInterval);
  }, [isOpen, currentParagraph]);

  const handleAccept = () => {
    onAccept();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl"
            >
              {/* Container vintage */}
              <div className="relative bg-gradient-to-br from-zinc-900 via-neutral-900 to-stone-900 rounded-2xl border border-amber-900/30 shadow-2xl overflow-hidden">
                {/* Efeito de papel antigo */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none" />
                
                {/* Vinheta nas bordas */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40 pointer-events-none" />

                {/* Conteúdo */}
                <div className="relative p-8 md:p-12">
                  {/* Decoração vintage superior */}
                  <div className="flex items-center justify-center mb-8">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-700/50 to-transparent" />
                    <div className="mx-4 text-amber-700/70 text-xs tracking-[0.3em] font-light">
                      ARQUIVO CONFIDENCIAL
                    </div>
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-700/50 to-transparent" />
                  </div>

                  {/* Texto com efeito de máquina de escrever */}
                  <div className="min-h-[400px] flex flex-col justify-center">
                    <div className="space-y-6 font-mono text-zinc-300 leading-relaxed">
                      {narrative.slice(0, currentParagraph).map((paragraph, index) => (
                        <motion.p
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`
                            ${paragraph === '' ? 'h-2' : ''}
                            ${paragraph === 'Ano desconhecido.' ? 'text-amber-600/80 text-sm tracking-wider' : ''}
                            ${paragraph.includes('"') ? 'text-amber-500/90 italic text-lg pl-4 border-l-2 border-amber-700/40' : ''}
                            ${paragraph === 'Aceita um desafio?' ? 'text-2xl text-amber-400 font-semibold text-center mt-8' : ''}
                            whitespace-pre-line
                          `}
                        >
                          {index === currentParagraph - 1 ? displayedText : paragraph}
                        </motion.p>
                      ))}
                      
                      {/* Parágrafo atual sendo digitado */}
                      {currentParagraph < narrative.length && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`
                            ${narrative[currentParagraph] === 'Ano desconhecido.' ? 'text-amber-600/80 text-sm tracking-wider' : ''}
                            ${narrative[currentParagraph].includes('"') ? 'text-amber-500/90 italic text-lg pl-4 border-l-2 border-amber-700/40' : ''}
                            ${narrative[currentParagraph] === 'Aceita um desafio?' ? 'text-2xl text-amber-400 font-semibold text-center mt-8' : ''}
                            whitespace-pre-line
                          `}
                        >
                          {displayedText}
                          {/* Cursor piscante */}
                          {displayedText && (
                            <motion.span
                              animate={{ opacity: [1, 0, 1] }}
                              transition={{ duration: 0.8, repeat: Infinity }}
                              className="inline-block w-2 h-5 bg-amber-500 ml-1"
                            />
                          )}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  {/* Botões de ação */}
                  <AnimatePresence>
                    {isTypingComplete && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col sm:flex-row gap-4 mt-12"
                      >
                        <button
                          onClick={handleAccept}
                          className="flex-1 px-8 py-4 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-mono text-sm tracking-wider rounded-lg border border-amber-500/50 shadow-lg shadow-amber-900/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-900/70 hover:scale-[1.02]"
                        >
                          [ Aceitar desafio ]
                        </button>
                        
                        <button
                          onClick={onClose}
                          className="flex-1 px-8 py-4 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400 hover:text-zinc-300 font-mono text-sm tracking-wider rounded-lg border border-zinc-700/50 transition-all duration-300 hover:border-zinc-600"
                        >
                          [ Agora não ]
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Decoração vintage inferior */}
                  <div className="flex items-center justify-center mt-8 opacity-30">
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-800 to-transparent" />
                  </div>
                </div>
              </div>

              {/* Selo vintage no canto */}
              <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-gradient-to-br from-amber-700 to-amber-900 border-2 border-amber-600 flex items-center justify-center rotate-12 shadow-xl">
                <span className="text-amber-200 text-xs font-bold transform -rotate-12">EST</span>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
