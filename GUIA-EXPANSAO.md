# 🚀 Guia de Expansão - Como Adicionar Novas Funcionalidades

## 📝 Exemplos Práticos

### 1️⃣ Adicionar Nova Página (ex: Transações)

**Passo 1: Criar a rota**
```bash
src/app/transactions/page.tsx
```

**Passo 2: Implementar**
```typescript
// src/app/transactions/page.tsx
'use client';

import { mockFinancialProfile } from '@/infrastructure/data/mockData';

export default function TransactionsPage() {
  const transactions = mockFinancialProfile.transactions;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background-secondary">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary mb-6">Transações</h1>
        
        <div className="space-y-4">
          {transactions.map(tx => (
            <div key={tx.id} className="glass-card p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-primary">{tx.description}</p>
                  <p className="text-sm text-secondary">{tx.category}</p>
                </div>
                <span className={`font-mono font-bold ${
                  tx.type === 'income' ? 'text-status-green' : 'text-status-red'
                }`}>
                  {tx.type === 'income' ? '+' : '-'} R$ {tx.amount.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
```

**Passo 3: Adicionar link no menu**
```typescript
// Adicionar no header de page.tsx
<Link href="/transactions">Transações</Link>
```

---

### 2️⃣ Criar Novo Componente (ex: QuickStats)

**Passo 1: Criar arquivo**
```bash
src/ui/components/QuickStats.tsx
```

**Passo 2: Implementar**
```typescript
// src/ui/components/QuickStats.tsx
'use client';

import GlassCard from './GlassCard';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

interface QuickStatsProps {
  income: number;
  expenses: number;
  balance: number;
}

export default function QuickStats({ income, expenses, balance }: QuickStatsProps) {
  return (
    <GlassCard>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <TrendingUp className="text-status-green mx-auto mb-2" size={24} />
          <p className="text-xs text-secondary mb-1">Receita</p>
          <p className="font-mono font-semibold text-status-green">
            R$ {income.toFixed(0)}
          </p>
        </div>
        
        <div className="text-center">
          <TrendingDown className="text-status-red mx-auto mb-2" size={24} />
          <p className="text-xs text-secondary mb-1">Despesas</p>
          <p className="font-mono font-semibold text-status-red">
            R$ {expenses.toFixed(0)}
          </p>
        </div>
        
        <div className="text-center">
          <Wallet className="text-primary mx-auto mb-2" size={24} />
          <p className="text-xs text-secondary mb-1">Saldo</p>
          <p className="font-mono font-semibold text-primary">
            R$ {balance.toFixed(0)}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
```

**Passo 3: Usar no dashboard**
```typescript
// Em src/app/page.tsx
import QuickStats from '@/ui/components/QuickStats';

// No JSX:
<QuickStats 
  income={profile.monthlyIncome}
  expenses={profile.fixedExpenses + profile.variableExpenses}
  balance={profile.currentBalance}
/>
```

---

### 3️⃣ Adicionar Nova Regra de Negócio (ex: Projeção de Investimentos)

**Passo 1: Estender entidade**
```typescript
// src/domain/entities/finance.entity.ts

export interface InvestmentProjection {
  months: number;
  initialValue: number;
  monthlyContribution: number;
  annualReturn: number;
  finalValue: number;
  totalContributed: number;
  totalEarnings: number;
}
```

**Passo 2: Criar serviço**
```typescript
// src/domain/services/investment.service.ts

export class InvestmentService {
  static projectGrowth(
    initialValue: number,
    monthlyContribution: number,
    annualReturn: number,
    months: number
  ): InvestmentProjection {
    const monthlyRate = annualReturn / 100 / 12;
    let currentValue = initialValue;
    
    // Juros compostos mês a mês
    for (let i = 0; i < months; i++) {
      currentValue = currentValue * (1 + monthlyRate) + monthlyContribution;
    }
    
    const totalContributed = initialValue + (monthlyContribution * months);
    const totalEarnings = currentValue - totalContributed;
    
    return {
      months,
      initialValue,
      monthlyContribution,
      annualReturn,
      finalValue: currentValue,
      totalContributed,
      totalEarnings,
    };
  }
}
```

**Passo 3: Usar no componente**
```typescript
// No componente:
import { InvestmentService } from '@/domain/services/investment.service';

const projection = InvestmentService.projectGrowth(
  1000,  // R$ 1000 inicial
  200,   // R$ 200/mês
  12,    // 12% ao ano
  12     // 12 meses
);

console.log(`Em 1 ano: R$ ${projection.finalValue.toFixed(2)}`);
```

---

### 4️⃣ Adicionar Animação (ex: Card com fade-in)

```typescript
// src/ui/components/AnimatedCard.tsx
'use client';

import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

export default function AnimatedCard({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <GlassCard>{children}</GlassCard>
    </motion.div>
  );
}

// Uso:
<AnimatedCard delay={0.1}>
  <h2>Conteúdo aqui</h2>
</AnimatedCard>
```

---

### 5️⃣ Adicionar Gráfico (ex: Gráfico de Evolução)

```typescript
// src/ui/components/BalanceChart.tsx
'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import GlassCard from './GlassCard';

interface BalanceChartProps {
  data: { month: string; balance: number }[];
}

export default function BalanceChart({ data }: BalanceChartProps) {
  return (
    <GlassCard>
      <h3 className="text-lg font-semibold text-primary mb-4">
        Evolução do Saldo
      </h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="month" 
            stroke="rgba(255,255,255,0.6)"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.6)"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(18, 24, 43, 0.95)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
            }}
          />
          <Line 
            type="monotone" 
            dataKey="balance" 
            stroke="#10b981" 
            strokeWidth={2}
            dot={{ fill: '#10b981', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}

// Uso:
const chartData = [
  { month: 'Jan', balance: 4500 },
  { month: 'Fev', balance: 5200 },
  { month: 'Mar', balance: 5800 },
  { month: 'Abr', balance: 6100 },
];

<BalanceChart data={chartData} />
```

---

### 6️⃣ Adicionar Persistência Local (ex: Salvar preferências)

```typescript
// src/utils/storage.ts

export class LocalStorage {
  static save<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  static load<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  static remove(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  }
}

// Uso em componente:
import { LocalStorage } from '@/utils/storage';

// Salvar
LocalStorage.save('user-profile', profile);

// Carregar
const profile = LocalStorage.load<FinancialProfile>('user-profile');
```

---

### 7️⃣ Adicionar Hook Customizado (ex: useFinancialData)

```typescript
// src/hooks/useFinancialData.ts
'use client';

import { useState, useEffect } from 'react';
import { FinancialProfile } from '@/domain/entities/finance.entity';
import { ForecastService, HealthScoreService } from '@/domain/services/finance.service';

export function useFinancialData(profile: FinancialProfile) {
  const [forecast, setForecast] = useState(() => 
    ForecastService.calculateForecast(profile, 6)
  );
  
  const [healthScore, setHealthScore] = useState(() =>
    HealthScoreService.calculateHealthScore(profile)
  );

  useEffect(() => {
    setForecast(ForecastService.calculateForecast(profile, 6));
    setHealthScore(HealthScoreService.calculateHealthScore(profile));
  }, [profile]);

  return { forecast, healthScore };
}

// Uso:
const { forecast, healthScore } = useFinancialData(profile);
```

---

## 🎯 Padrões a Seguir

### ✅ Boas Práticas

1. **Sempre use a camada correta**
   - Regras de negócio → domain/
   - UI → ui/components/
   - Rotas → app/

2. **Componentes pequenos e focados**
   - Cada componente = 1 responsabilidade
   - Máximo 150 linhas

3. **Nomeação clara**
   - Componentes: PascalCase (FutureBalanceCard)
   - Arquivos: kebab-case ou PascalCase.tsx
   - Funções: camelCase (calculateForecast)

4. **TypeScript sempre**
   - Defina interfaces
   - Evite `any`
   - Use tipos explícitos

5. **Mobile first**
   - Design para mobile primeiro
   - Use breakpoints: md:, lg:

### ❌ Evite

1. **Lógica de negócio em componentes**
   ```typescript
   // ❌ Ruim
   function Card() {
     const score = calculateHealthScore(); // Lógica no componente
   }

   // ✅ Bom
   function Card({ score }) {
     // Só renderização
   }
   ```

2. **Componentes gigantes**
   - Quebre em componentes menores
   - Extraia lógica para hooks

3. **Estilos inline complexos**
   ```typescript
   // ❌ Ruim
   <div style={{ backgroundColor: '#fff', padding: '20px' }}>

   // ✅ Bom
   <div className="glass-card p-6">
   ```

---

## 🔧 Comandos Úteis

```bash
# Adicionar nova dependência
npm install nome-do-pacote

# Remover dependência
npm uninstall nome-do-pacote

# Verificar tipos
npx tsc --noEmit

# Build de produção
npm run build

# Limpar cache
rm -rf .next
```

---

## 📚 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [Recharts](https://recharts.org/)

---

**Dica final:** Sempre teste suas mudanças no navegador antes de commitar!
