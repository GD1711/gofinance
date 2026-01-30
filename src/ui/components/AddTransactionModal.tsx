'use client';

import React, { useState } from 'react';
import { BrandIcon } from './BrandIcon';
import { BrandIconsService, BrandSuggestion } from '@/application/services/brand-icons.service';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TransactionType = 'income' | 'expense' | 'investment' | 'emergency' | null;
type RecurrenceFrequency = 'weekly' | 'biweekly' | 'monthly' | 'yearly';

interface TransactionFormData {
  type: TransactionType;
  amount: string;
  description: string;
  category: string;
  date: string;
  isRecurrent: boolean;
  recurrenceFrequency?: RecurrenceFrequency;
  brandName?: string;
  origin?: string;
  investmentType?: string;
  expectedReturn?: string;
}

export function AddTransactionModal({ isOpen, onClose }: AddTransactionModalProps) {
  const [step, setStep] = useState<'select' | 'form'>('select');
  const [selectedType, setSelectedType] = useState<TransactionType>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<BrandSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const [formData, setFormData] = useState<TransactionFormData>({
    type: null,
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    isRecurrent: false,
  });

  const categories = {
    income: ['Salário', 'Freelance', 'Presente', 'Venda', 'Investimento', 'Outros'],
    expense: ['Alimentação', 'Transporte', 'Moradia', 'Entretenimento', 'Saúde', 'Educação', 'Compras', 'Serviços', 'Outros'],
    investment: ['Ações', 'Fundos Imobiliários', 'Renda Fixa', 'Criptomoedas', 'Tesouro Direto', 'Outros'],
  };

  if (!isOpen) return null;

  const handleSelectType = (type: TransactionType) => {
    setSelectedType(type);
    setFormData({ ...formData, type });
    setStep('form');
  };

  const handleBack = () => {
    setStep('select');
    setSelectedType(null);
    setSearchQuery('');
    setSuggestions([]);
  };

  const handleClose = () => {
    setStep('select');
    setSelectedType(null);
    setSearchQuery('');
    setSuggestions([]);
    setFormData({
      type: null,
      amount: '',
      description: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      isRecurrent: false,
    });
    onClose();
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setFormData({ ...formData, description: value });
    
    if (value.length >= 1) {
      const results = BrandIconsService.searchBrands(value);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectBrand = (brand: BrandSuggestion) => {
    setSearchQuery(brand.displayName);
    setFormData({
      ...formData,
      description: brand.displayName,
      category: brand.category,
      brandName: brand.name,
    });
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aqui você integraria com seu backend/estado global
    console.log('Transaction submitted:', formData);
    
    // Mostrar notificação de sucesso
    alert(`${selectedType === 'income' ? 'Receita' : selectedType === 'expense' ? 'Despesa' : selectedType === 'investment' ? 'Investimento' : 'Reserva de Emergência'} adicionada com sucesso!`);
    
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 md:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[92vh] md:max-h-[90vh] overflow-y-auto bg-black/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-black/50 backdrop-blur-xl border-b border-white/10">
          {step === 'form' && (
            <button
              onClick={handleBack}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <h2 className="text-base md:text-lg font-semibold text-white flex-1 text-center">
            {step === 'select' ? 'Adicionar Transação' : 
             selectedType === 'income' ? 'Nova Receita' :
             selectedType === 'expense' ? 'Nova Despesa' :
             selectedType === 'investment' ? 'Novo Investimento' :
             'Reserva de Emergência'}
          </h2>
          <button
            onClick={handleClose}
            className="p-1.5 md:p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          {step === 'select' ? (
            <div className="grid grid-cols-2 gap-2.5 md:gap-3">
              {/* Card: Receita */}
              <button
                onClick={() => handleSelectType('income')}
                className="group relative p-4 md:p-5 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 hover:border-green-500/50 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/0 group-hover:from-green-500/10 group-hover:to-green-500/5 transition-all duration-300" />
                <div className="relative flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-green-500/10 transition-colors">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h3 className="text-xs md:text-sm font-semibold text-white">Receita</h3>
                  <p className="text-[10px] md:text-xs text-white/50 text-center leading-tight">
                    Salário, freelance
                  </p>
                </div>
              </button>

              {/* Card: Despesa */}
              <button
                onClick={() => handleSelectType('expense')}
                className="group relative p-4 md:p-5 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 hover:border-red-500/50 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/0 group-hover:from-red-500/10 group-hover:to-red-500/5 transition-all duration-300" />
                <div className="relative flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-red-500/10 transition-colors">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </div>
                  <h3 className="text-xs md:text-sm font-semibold text-white">Despesa</h3>
                  <p className="text-[10px] md:text-xs text-white/50 text-center leading-tight">
                    Compras, contas
                  </p>
                </div>
              </button>

              {/* Card: Investimento */}
              <button
                onClick={() => handleSelectType('investment')}
                className="group relative p-4 md:p-5 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-blue-500/5 transition-all duration-300" />
                <div className="relative flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-xs md:text-sm font-semibold text-white">Investimento</h3>
                  <p className="text-[10px] md:text-xs text-white/50 text-center leading-tight">
                    Ações, fundos
                  </p>
                </div>
              </button>

              {/* Card: Reserva de Emergência */}
              <button
                onClick={() => handleSelectType('emergency')}
                className="group relative p-4 md:p-5 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 hover:border-yellow-500/50 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 to-yellow-500/0 group-hover:from-yellow-500/10 group-hover:to-yellow-500/5 transition-all duration-300" />
                <div className="relative flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-yellow-500/10 transition-colors">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xs md:text-sm font-semibold text-white">Reserva</h3>
                  <p className="text-[10px] md:text-xs text-white/50 text-center leading-tight">
                    Fundo emergencial
                  </p>
                </div>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Valor */}
              <div>
                <label className="block text-xs font-medium text-white/70 mb-2">
                  Valor
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 text-sm">R$</span>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all"
                    placeholder="0,00"
                  />
                </div>
              </div>

              {/* Descrição com Busca Inteligente (apenas para despesas) */}
              {selectedType === 'expense' && (
                <div className="relative">
                  <label className="block text-xs font-medium text-white/70 mb-2">
                    Descrição 
                    <span className="text-xs text-white/40 ml-2">
                      (Digite para buscar marcas)
                    </span>
                  </label>
                  <input
                    type="text"
                    required
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all"
                    placeholder="Ex: n (Netflix), u (Uber), s (Spotify)..."
                  />
                  
                  {/* Sugestões */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute z-20 w-full mt-2 bg-black/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden">
                      {suggestions.map((brand) => (
                        <button
                          key={brand.name}
                          type="button"
                          onClick={() => handleSelectBrand(brand)}
                          className="w-full flex items-center space-x-3 px-3 py-2.5 hover:bg-white/5 transition-colors text-left border-b border-white/5 last:border-0"
                        >
                          <div className="flex-shrink-0">
                            <BrandIcon brandName={brand.name} size={24} forceWhite={true} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium">{brand.displayName}</p>
                            <p className="text-xs text-white/40">{brand.category}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Descrição/Origem para outros tipos */}
              {selectedType !== 'expense' && (
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-2">
                    {selectedType === 'income' ? 'Origem' : 'Descrição'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all"
                    placeholder={selectedType === 'income' ? 'Ex: Salário, Freelance' : 'Descrição'}
                  />
                </div>
              )}

              {/* Tipo de Investimento */}
              {selectedType === 'investment' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-2">
                      Tipo de Investimento
                    </label>
                    <select
                      required
                      value={formData.investmentType || ''}
                      onChange={(e) => setFormData({ ...formData, investmentType: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all"
                    >
                      <option value="" className="bg-black">Selecione...</option>
                      {categories.investment.map((cat) => (
                        <option key={cat} value={cat} className="bg-black">{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-2">
                      Rentabilidade Esperada (% ao ano)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.expectedReturn || ''}
                      onChange={(e) => setFormData({ ...formData, expectedReturn: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all"
                      placeholder="Ex: 12.5"
                    />
                  </div>
                </>
              )}

              {/* Categoria */}
              {selectedType !== 'investment' && selectedType !== 'emergency' && (
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-2">
                    Categoria
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all"
                  >
                    <option value="" className="bg-black">Selecione...</option>
                    {(selectedType === 'income' ? categories.income : categories.expense).map((cat) => (
                      <option key={cat} value={cat} className="bg-black">{cat}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Data */}
              <div>
                <label className="block text-xs font-medium text-white/70 mb-2">
                  Data
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all"
                />
              </div>

              {/* Recorrência */}
              {selectedType !== 'emergency' && (
                <>
                  <div className="flex items-center space-x-2 py-2">
                    <input
                      type="checkbox"
                      id="isRecurrent"
                      checked={formData.isRecurrent}
                      onChange={(e) => setFormData({ ...formData, isRecurrent: e.target.checked })}
                      className="w-4 h-4 rounded border-white/20 bg-white/5 text-white focus:ring-1 focus:ring-white/20"
                    />
                    <label htmlFor="isRecurrent" className="text-white/70 text-sm cursor-pointer">
                      Transação recorrente
                    </label>
                  </div>

                  {formData.isRecurrent && (
                    <div className="space-y-2 animate-fadeIn">
                      <label className="block text-xs font-medium text-white/70 mb-2">
                        Frequência
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {(['weekly', 'biweekly', 'monthly', 'yearly'] as RecurrenceFrequency[]).map((freq) => (
                          <button
                            key={freq}
                            type="button"
                            onClick={() => setFormData({ ...formData, recurrenceFrequency: freq })}
                            className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                              formData.recurrenceFrequency === freq
                                ? 'bg-white/10 border-white/20 text-white'
                                : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white/70'
                            }`}
                          >
                            {freq === 'weekly' ? 'Semanal' :
                             freq === 'biweekly' ? 'Quinzenal' :
                             freq === 'monthly' ? 'Mensal' :
                             'Anual'}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-white/40 mt-1">
                        Será deduzido automaticamente nos próximos períodos
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Ícone selecionado */}
              {formData.brandName && (
                <div className="p-3 bg-white/5 rounded-lg border border-white/10 flex items-center space-x-3">
                  <BrandIcon brandName={formData.brandName} size={32} forceWhite={true} />
                  <div>
                    <p className="text-white text-sm font-medium">{formData.description}</p>
                    <p className="text-xs text-white/40">{formData.category}</p>
                  </div>
                </div>
              )}

              {/* Botões */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm rounded-lg font-medium transition-colors border border-white/10"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm rounded-lg font-medium transition-all shadow-lg shadow-blue-500/20"
                >
                  Adicionar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddTransactionModal;
