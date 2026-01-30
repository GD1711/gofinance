'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from '@/ui/icons';
import AddTransactionModal from './AddTransactionModal';

interface FloatingAddButtonProps {
  onAdd?: (type: string, value: number) => void;
}

export default function FloatingAddButton({ onAdd }: FloatingAddButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Modal de Adicionar */}
      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Botão principal */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-24 right-20 z-40 w-14 h-14 bg-primary rounded-full ring-4 ring-primary/30 shadow-2xl shadow-primary/60 flex items-center justify-center"
        style={{ marginBottom: '0.5rem' }}
      >
        <motion.div
          animate={{ rotate: isModalOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Plus size={24} className="text-white" weight="bold" />
        </motion.div>
      </motion.button>
    </>
  );
}
