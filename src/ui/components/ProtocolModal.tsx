"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

interface ProtocolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

/**
 * Modal de Protocolo - Linguagem Fria e Científica
 * Não ensina. Apenas apresenta realidade processada.
 */
export default function ProtocolModal({
  isOpen,
  onClose,
  onAccept,
}: ProtocolModalProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Narrativa protocolar
  const narrative = [
    'Registro nº 001.',
    '',
    'Nenhum sistema financeiro falhou por falta de dinheiro.',
    'Falhou por falta de método.',
    '',
    'Antes dos juros,',
    'antes das projeções,',
    'antes do risco…',
    '',
    'existe apenas uma variável controlável:',
    'o comportamento humano ao longo do tempo.',
    '',
    'Este mecanismo não acelera.',
    'Ele sustenta.',
    '',
    'Você define o alvo.',
    'Você define o período.',
    'O sistema remove o acaso.',
    '',
    'Aceita operar sob constância?',
  ];

  // Som de digitação (simulado com Web Audio API)
  const playTypeSound = () => {
    if (!soundEnabled) return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'square';
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.03);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.03);
    } catch (e) {
      // Silently fail if Web Audio API não disponível
    }
  };

  // Efeito de máquina de escrever
  useEffect(() => {
    if (!isOpen) {
      setCurrentLine(0);
      setDisplayedText('');
      setIsComplete(false);
      return;
    }

    if (currentLine >= narrative.length) {
      setIsComplete(true);
      return;
    }

    const text = narrative[currentLine];
    
    // Linhas vazias aparecem instantaneamente
    if (text === '') {
      setDisplayedText('');
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, 150);
      return () => clearTimeout(timer);
    }

    setDisplayedText('');
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (charIndex < text.length) {
        setDisplayedText(text.slice(0, charIndex + 1));
        playTypeSound();
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentLine(prev => prev + 1);
        }, 600);
      }
    }, 35); // 35ms por caractere (mais lento, mais mecânico)

    return () => clearInterval(typingInterval);
  }, [isOpen, currentLine, soundEnabled]);

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
            className="fixed inset-0 bg-black/95 z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="relative w-full max-w-3xl"
            >
              {/* Container protocolar */}
              <div className="relative bg-black border border-zinc-800 shadow-2xl overflow-hidden">
                {/* Scanlines effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_50%,rgba(255,255,255,0.02)_50%)] bg-[length:100%_4px]" />
                </div>

                {/* Header protocolar */}
                <div className="relative border-b border-zinc-800 px-8 py-4 bg-zinc-950">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="font-mono text-xs text-zinc-600 uppercase tracking-wider">
                        PROTOCOLO_INICIAÇÃO.SYS
                      </span>
                    </div>
                    
                    <button
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className="p-1.5 rounded hover:bg-zinc-900 transition-colors"
                      title={soundEnabled ? "Desativar som" : "Ativar som"}
                    >
                      {soundEnabled ? (
                        <Volume2 className="w-4 h-4 text-zinc-600" />
                      ) : (
                        <VolumeX className="w-4 h-4 text-zinc-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terminal content */}
                <div className="relative p-12 min-h-[500px] flex flex-col justify-center">
                  <div className="space-y-4 font-mono text-zinc-300 leading-relaxed">
                    {narrative.slice(0, currentLine).map((line, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`
                          ${line === '' ? 'h-2' : ''}
                          ${line === 'Registro nº 001.' ? 'text-amber-600 text-xs tracking-widest' : ''}
                          ${line === 'Aceita operar sob constância?' ? 'text-xl text-amber-500 font-semibold text-center mt-8' : ''}
                          ${line.includes('variável controlável') || line.includes('comportamento humano') ? 'text-amber-400/90' : ''}
                          whitespace-pre-line
                        `}
                      >
                        {index === currentLine - 1 ? displayedText : line}
                      </motion.div>
                    ))}
                    
                    {/* Linha atual sendo digitada */}
                    {currentLine < narrative.length && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`
                          ${narrative[currentLine] === 'Registro nº 001.' ? 'text-amber-600 text-xs tracking-widest' : ''}
                          ${narrative[currentLine] === 'Aceita operar sob constância?' ? 'text-xl text-amber-500 font-semibold text-center mt-8' : ''}
                          ${narrative[currentLine].includes('variável controlável') || narrative[currentLine].includes('comportamento humano') ? 'text-amber-400/90' : ''}
                          whitespace-pre-line
                        `}
                      >
                        {displayedText}
                        {/* Cursor mecânico */}
                        {displayedText && (
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="inline-block w-2 h-4 bg-amber-500 ml-1 align-middle"
                          />
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Botões de ação */}
                <AnimatePresence>
                  {isComplete && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="relative border-t border-zinc-800 px-8 py-6 bg-zinc-950"
                    >
                      <div className="flex gap-4">
                        <button
                          onClick={handleAccept}
                          className="flex-1 px-6 py-4 bg-amber-900/30 hover:bg-amber-900/50 text-amber-400 font-mono text-sm tracking-wider border border-amber-900/50 hover:border-amber-700 transition-all duration-300 uppercase"
                        >
                          [ Iniciar Protocolo ]
                        </button>
                        
                        <button
                          onClick={onClose}
                          className="flex-1 px-6 py-4 bg-zinc-900/30 hover:bg-zinc-800/50 text-zinc-500 hover:text-zinc-400 font-mono text-sm tracking-wider border border-zinc-800 hover:border-zinc-700 transition-all uppercase"
                        >
                          [ Encerrar ]
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer info */}
                <div className="absolute bottom-2 left-8 text-xs font-mono text-zinc-800">
                  {!isComplete && `PROCESSANDO... ${Math.round((currentLine / narrative.length) * 100)}%`}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
