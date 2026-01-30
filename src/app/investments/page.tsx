/**
 * PÁGINA: Investimentos - Análises de Mercado em Tempo Real
 * Acompanhamento de índices, ações e oportunidades
 */

'use client';

import { useState } from 'react';
import BottomNav from '@/ui/components/BottomNav';
import { TrendingUp, TrendingDown, Activity, CurrencyDollar, Eye, AlertCircle } from '@/ui/icons';

interface MarketIndex {
  name: string;
  symbol: string;
  value: number;
  change: number;
  changePercent: number;
}

interface Investment {
  name: string;
  symbol: string;
  type: 'stock' | 'fund' | 'crypto' | 'fixed';
  value: number;
  quantity: number;
  change: number;
  changePercent: number;
}

interface MarketNews {
  id: string;
  title: string;
  summary: string;
  timestamp: string;
  category: 'bull' | 'bear' | 'neutral';
}

export default function InvestmentsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'news'>('overview');

  const marketIndices: MarketIndex[] = [
    { name: 'IBOVESPA', symbol: 'IBOV', value: 128450, change: 1250, changePercent: 0.98 },
    { name: 'S&P 500', symbol: 'SPX', value: 5125, change: -23, changePercent: -0.45 },
    { name: 'NASDAQ', symbol: 'IXIC', value: 16850, change: 85, changePercent: 0.51 },
    { name: 'Dólar', symbol: 'USD/BRL', value: 4.95, change: -0.02, changePercent: -0.40 },
  ];

  const portfolio: Investment[] = [
    { name: 'Magazine Luiza', symbol: 'MGLU3', type: 'stock', value: 2.45, quantity: 100, change: 0.12, changePercent: 5.15 },
    { name: 'Petrobras', symbol: 'PETR4', type: 'stock', value: 38.50, quantity: 50, change: -0.80, changePercent: -2.04 },
    { name: 'Tesouro Selic', symbol: 'SELIC', type: 'fixed', value: 5000, quantity: 1, change: 45, changePercent: 0.91 },
    { name: 'Bitcoin', symbol: 'BTC', type: 'crypto', value: 285000, quantity: 0.01, change: 1500, changePercent: 0.53 },
  ];

  const news: MarketNews[] = [
    {
      id: '1',
      title: 'Banco Central mantém Selic em 10,75%',
      summary: 'Copom decide manter taxa básica de juros estável pelo terceiro mês consecutivo.',
      timestamp: '2h atrás',
      category: 'neutral'
    },
    {
      id: '2',
      title: 'Bolsa fecha em alta com valorização de 0,98%',
      summary: 'Ibovespa encerra pregão positivo puxado por ações de commodities.',
      timestamp: '4h atrás',
      category: 'bull'
    },
    {
      id: '3',
      title: 'Petróleo cai após dados de estoque dos EUA',
      summary: 'Preço do barril recua com aumento inesperado nos estoques americanos.',
      timestamp: '6h atrás',
      category: 'bear'
    },
  ];

  const totalPortfolioValue = portfolio.reduce((acc, inv) => {
    return acc + (inv.value * inv.quantity);
  }, 0);

  const totalPortfolioChange = portfolio.reduce((acc, inv) => {
    return acc + (inv.change * inv.quantity);
  }, 0);

  const totalPortfolioChangePercent = (totalPortfolioChange / (totalPortfolioValue - totalPortfolioChange)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-background pb-24 pt-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Investimentos</h1>
        <p className="text-white/60">Análises de mercado em tempo real</p>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="flex gap-2 glass-card rounded-2xl p-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
              activeTab === 'overview'
                ? 'bg-gradient-to-br from-primary to-accent text-white shadow-glow'
                : 'text-white/60 hover:text-white/80'
            }`}
          >
            Mercado
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
              activeTab === 'portfolio'
                ? 'bg-gradient-to-br from-primary to-accent text-white shadow-glow'
                : 'text-white/60 hover:text-white/80'
            }`}
          >
            Portfólio
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
              activeTab === 'news'
                ? 'bg-gradient-to-br from-primary to-accent text-white shadow-glow'
                : 'text-white/60 hover:text-white/80'
            }`}
          >
            Notícias
          </button>
        </div>
      </div>

      {/* Market Overview */}
      {activeTab === 'overview' && (
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {marketIndices.map((index) => (
              <div key={index.symbol} className="glass-card rounded-3xl p-6 hover:scale-[1.02] transition-transform">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-white/60 text-sm mb-1">{index.name}</p>
                    <p className="text-2xl font-bold text-white">{index.symbol}</p>
                  </div>
                  <div className={`p-2 rounded-xl ${index.change > 0 ? 'bg-success/20' : 'bg-danger/20'}`}>
                    {index.change > 0 ? (
                      <TrendingUp size={20} className="text-success" />
                    ) : (
                      <TrendingDown size={20} className="text-danger" />
                    )}
                  </div>
                </div>
                
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white mb-1">
                      {index.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${index.change > 0 ? 'text-success' : 'text-danger'}`}>
                        {index.change > 0 ? '+' : ''}{index.change.toFixed(2)}
                      </span>
                      <span className={`text-xs ${index.change > 0 ? 'text-success/70' : 'text-danger/70'}`}>
                        ({index.changePercent > 0 ? '+' : ''}{index.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                  <button className="px-4 py-2 rounded-xl glass-strong text-xs text-white hover:scale-105 transition-transform">
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Market Insights */}
          <div className="glass-card rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Activity size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Insights do Mercado</h2>
                <p className="text-xs text-white/60">Análise em tempo real</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-sm text-white/90 mb-2">📈 Tendência de Alta</p>
                <p className="text-xs text-white/60">
                  O mercado brasileiro mostra sinais positivos com alta de commodities e fluxo estrangeiro positivo.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-sm text-white/90 mb-2">💰 Oportunidades</p>
                <p className="text-xs text-white/60">
                  Ações do setor financeiro apresentam bom momento para entrada, com valuations atrativos.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio */}
      {activeTab === 'portfolio' && (
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          {/* Portfolio Summary */}
          <div className="glass-card rounded-3xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-white/60 text-sm mb-2">Valor Total do Portfólio</p>
                <p className="text-4xl font-bold text-white mb-2">
                  R$ {totalPortfolioValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <div className="flex items-center gap-2">
                  <span className={`text-lg font-medium ${totalPortfolioChange > 0 ? 'text-success' : 'text-danger'}`}>
                    {totalPortfolioChange > 0 ? '+' : ''}R$ {totalPortfolioChange.toFixed(2)}
                  </span>
                  <span className={`text-sm ${totalPortfolioChange > 0 ? 'text-success/70' : 'text-danger/70'}`}>
                    ({totalPortfolioChangePercent > 0 ? '+' : ''}{totalPortfolioChangePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-2xl ${totalPortfolioChange > 0 ? 'bg-success/20' : 'bg-danger/20'}`}>
                <CurrencyDollar size={32} className={totalPortfolioChange > 0 ? 'text-success' : 'text-danger'} />
              </div>
            </div>

            {/* Asset Distribution */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs text-white/60 mb-1">Ações</p>
                <p className="text-lg font-bold text-white">45%</p>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs text-white/60 mb-1">Renda Fixa</p>
                <p className="text-lg font-bold text-white">35%</p>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs text-white/60 mb-1">Cripto</p>
                <p className="text-lg font-bold text-white">15%</p>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs text-white/60 mb-1">Outros</p>
                <p className="text-lg font-bold text-white">5%</p>
              </div>
            </div>
          </div>

          {/* Investments List */}
          <div className="space-y-3">
            {portfolio.map((investment) => (
              <div key={investment.symbol} className="glass-card rounded-3xl p-5 hover:scale-[1.02] transition-transform">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                      <span className="text-sm font-bold text-white">
                        {investment.symbol.substring(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-white">{investment.name}</p>
                      <p className="text-xs text-white/60">{investment.symbol}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    investment.type === 'stock' ? 'bg-primary/20 text-primary' :
                    investment.type === 'fund' ? 'bg-accent/20 text-accent' :
                    investment.type === 'crypto' ? 'bg-warning/20 text-warning' :
                    'bg-success/20 text-success'
                  }`}>
                    {investment.type === 'stock' ? 'Ação' :
                     investment.type === 'fund' ? 'Fundo' :
                     investment.type === 'crypto' ? 'Cripto' :
                     'Renda Fixa'}
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-white/60 mb-1">Valor Atual</p>
                    <p className="text-2xl font-bold text-white">
                      R$ {(investment.value * investment.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-white/40 mt-1">
                      {investment.quantity} {investment.type === 'crypto' ? 'unid.' : 'cotas'} × R$ {investment.value.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end mb-1">
                      {investment.change > 0 ? (
                        <TrendingUp size={16} className="text-success" />
                      ) : (
                        <TrendingDown size={16} className="text-danger" />
                      )}
                      <span className={`text-sm font-medium ${investment.change > 0 ? 'text-success' : 'text-danger'}`}>
                        {investment.changePercent > 0 ? '+' : ''}{investment.changePercent.toFixed(2)}%
                      </span>
                    </div>
                    <p className={`text-xs ${investment.change > 0 ? 'text-success/70' : 'text-danger/70'}`}>
                      {investment.change > 0 ? '+' : ''}R$ {(investment.change * investment.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* News */}
      {activeTab === 'news' && (
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          {news.map((item) => (
            <div key={item.id} className="glass-card rounded-3xl p-6 hover:scale-[1.02] transition-transform cursor-pointer">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  item.category === 'bull' ? 'bg-success/20' :
                  item.category === 'bear' ? 'bg-danger/20' :
                  'bg-white/10'
                }`}>
                  {item.category === 'bull' ? (
                    <TrendingUp size={24} className="text-success" />
                  ) : item.category === 'bear' ? (
                    <TrendingDown size={24} className="text-danger" />
                  ) : (
                    <AlertCircle size={24} className="text-white/60" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/70 mb-3">{item.summary}</p>
                  <p className="text-xs text-white/40">{item.timestamp}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="glass-card rounded-3xl p-8 text-center">
            <AlertCircle size={48} className="text-white/40 mx-auto mb-4" />
            <p className="text-white/60 mb-4">Conecte suas contas para receber notícias personalizadas</p>
            <button className="px-6 py-3 rounded-xl bg-gradient-to-br from-primary to-accent text-white font-medium hover:scale-105 transition-transform shadow-glow">
              Conectar Conta
            </button>
          </div>
        </div>
      )}

      <BottomNav activeItem="/investments" />
    </div>
  );
}
