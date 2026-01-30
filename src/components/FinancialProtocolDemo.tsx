/**
 * Financial Protocol Demo
 * 
 * Componente de demonstração da integração com API Python.
 * Mostra insights, não números crus.
 */

'use client';

import { useState } from 'react';
import { FinancialProtocolService, ProtocolResponse } from '@/services/financial-protocol.service';

export default function FinancialProtocolDemo() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProtocolResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [targetAmount, setTargetAmount] = useState(1000);
  const [periods, setPeriods] = useState(12);
  const [protocolType, setProtocolType] = useState<'progressive' | 'optimized'>('progressive');
  
  // Progressive protocol params
  const [startValue, setStartValue] = useState(1);
  const [increment, setIncrement] = useState(2);
  const [cap, setCap] = useState(100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      let response: ProtocolResponse;
      
      if (protocolType === 'optimized') {
        response = await FinancialProtocolService.createOptimizedProtocol({
          target_amount: targetAmount,
          periods: periods
        });
      } else {
        response = await FinancialProtocolService.createProgressiveProtocol(
          {
            target_amount: targetAmount,
            periods: periods
          },
          {
            start_value: startValue,
            increment: increment,
            cap: cap
          }
        );
      }
      
      setResult(response);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🎯 Protocolo Financeiro</h1>
        <p className="text-gray-600">
          Sistema de constância comportamental. Não prevê retorno, forma mentalidade.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* FORM */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Configuração</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Tipo de Protocolo */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Tipo de Protocolo
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setProtocolType('progressive')}
                  className={`flex-1 py-2 rounded-lg transition ${
                    protocolType === 'progressive'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Progressivo
                </button>
                <button
                  type="button"
                  onClick={() => setProtocolType('optimized')}
                  className={`flex-1 py-2 rounded-lg transition ${
                    protocolType === 'optimized'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Otimizado
                </button>
              </div>
            </div>

            {/* Meta */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Meta Financeira (R$)
              </label>
              <input
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg"
                min={10}
                max={1000000}
              />
            </div>

            {/* Períodos */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Períodos (meses)
              </label>
              <input
                type="number"
                value={periods}
                onChange={(e) => setPeriods(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg"
                min={3}
                max={120}
              />
            </div>

            {/* Parâmetros Progressivos */}
            {protocolType === 'progressive' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Valor Inicial (R$)
                  </label>
                  <input
                    type="number"
                    value={startValue}
                    onChange={(e) => setStartValue(Number(e.target.value))}
                    className="w-full px-4 py-2 border rounded-lg"
                    min={1}
                    max={100}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Incremento (R$)
                  </label>
                  <input
                    type="number"
                    value={increment}
                    onChange={(e) => setIncrement(Number(e.target.value))}
                    className="w-full px-4 py-2 border rounded-lg"
                    min={0.5}
                    max={50}
                    step={0.5}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Teto Máximo (R$)
                  </label>
                  <input
                    type="number"
                    value={cap}
                    onChange={(e) => setCap(Number(e.target.value))}
                    className="w-full px-4 py-2 border rounded-lg"
                    min={10}
                    max={2000}
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Calculando...' : 'Calcular Protocolo'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* RESULTADO */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Resultado</h2>
          
          {!result ? (
            <div className="text-center text-gray-500 py-12">
              Configure e calcule um protocolo para ver os resultados.
            </div>
          ) : (
            <div className="space-y-6">
              {/* Status Badge */}
              <div className="flex items-center gap-3">
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                  result.status.status === 'optimal' || result.status.status === 'reached'
                    ? 'bg-green-100 text-green-700'
                    : result.status.status === 'in_progress'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {FinancialProtocolService.translateStatus(result.status.status)}
                </div>
                
                <div className="text-2xl font-bold">
                  {FinancialProtocolService.formatViability(result.status.viability)}
                </div>
              </div>

              {/* Insight Principal */}
              <div className="bg-white rounded-xl p-4 border-l-4 border-blue-500">
                <h3 className="font-semibold text-sm text-gray-600 mb-2">
                  💡 Insight Comportamental
                </h3>
                <p className="text-gray-800 leading-relaxed">
                  {result.status.insight}
                </p>
              </div>

              {/* Recomendação */}
              {result.status.recommendation && (
                <div className="bg-white rounded-xl p-4 border-l-4 border-purple-500">
                  <h3 className="font-semibold text-sm text-gray-600 mb-2">
                    🎯 Recomendação
                  </h3>
                  <p className="text-gray-800 leading-relaxed">
                    {result.status.recommendation}
                  </p>
                </div>
              )}

              {/* Métricas */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4">
                  <div className="text-xs text-gray-600 mb-1">Total Acumulado</div>
                  <div className="text-xl font-bold text-gray-800">
                    {FinancialProtocolService.formatCurrency(result.result.total_accumulated)}
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4">
                  <div className="text-xs text-gray-600 mb-1">Média/Período</div>
                  <div className="text-xl font-bold text-gray-800">
                    {FinancialProtocolService.formatCurrency(result.result.average_per_period)}
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4">
                  <div className="text-xs text-gray-600 mb-1">Períodos</div>
                  <div className="text-xl font-bold text-gray-800">
                    {result.result.periods_completed}
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4">
                  <div className="text-xs text-gray-600 mb-1">Valor Máximo</div>
                  <div className="text-xl font-bold text-gray-800">
                    {FinancialProtocolService.formatCurrency(result.result.peak_value)}
                  </div>
                </div>
              </div>

              {/* Maturidade (se otimizado) */}
              {result.result.maturity_insight && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                  <h3 className="font-semibold text-sm text-gray-600 mb-2">
                    🌱 Maturidade
                  </h3>
                  <p className="text-sm text-gray-800">
                    {result.result.maturity_insight}
                  </p>
                </div>
              )}

              {/* Timestamp */}
              <div className="text-xs text-gray-500 text-center">
                Protocolo v{result.protocol_version} • {result.protocol_type}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
