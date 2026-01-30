# 🧠 Sistema de Análise Financeira Inteligente - GOFinance

## 📋 Visão Geral

Sistema de análise financeira baseado em psicologia comportamental e estatística, que transforma dados financeiros pessoais em **insights acionáveis** sem alarmes ou termos técnicos complexos.

## 🎯 Princípios do Sistema

### 1. **Nunca Pune, Apenas Ajusta**
- Orientações preventivas ao invés de avisos alarmantes
- Foco em micro ações comportamentais
- Mensagens claras e acessíveis

### 2. **Estatística Simples, Não IA Mágica**
- Projeções baseadas em comportamento real
- Normalização de fluxo mensal
- Tendências calculadas a partir de histórico

### 3. **Gamificação Sutil**
- Streaks de meses positivos
- Progresso visual da reserva
- Conquistas discretas (sem fogos de artifício)

## 📊 Estrutura de Dados

### Entrada do Usuário

```typescript
interface FinancialData {
  income: {
    recurring: RecurringIncome[];  // Salários, freelance
    other: number;                  // Entradas extras
  };
  
  expenses: {
    fixed: FixedExpense[];         // Aluguel, internet, escola
    variable: VariableExpense[];   // Mercado, lazer, transporte
  };
  
  debts: Debt[];                   // Valor, parcela, juros, prazo
  
  goals: {
    emergencyFund: EmergencyFund;  // Reserva de emergência
    goals: Goal[];                 // Metas (viagem, compra)
  };
}
```

## 🔄 Lógica Central (4 Passos)

### **Passo 1: Normalização**
Transforma tudo em fluxo mensal previsível:

```
Saldo Base = Renda Mensal
           - Gastos Fixos
           - Média de Gastos Variáveis
           - Dívidas
```

**Resultado**: Saldo mensal projetável

---

### **Passo 2: Projeção no Tempo**
Simula 3 cenários temporais:
- ✅ Mês atual
- ✅ +3 meses
- ✅ +6 meses

**Fatores considerados**:
- Recorrência de rendas
- Histórico de gastos
- Tendência de crescimento/redução
- Confiança da projeção (diminui com tempo)

---

### **Passo 3: Índice do Eixo Financeiro** 🎯

Score invisível (0-100) calculado com base em:

| Fator | Peso | Descrição |
|-------|------|-----------|
| **Renda Comprometida** | Alto | % da renda usada em gastos + dívidas |
| **Reserva Mensal** | Médio | % destinada à poupança (meta: 15%) |
| **Peso das Dívidas** | Alto | Relação dívida/renda anual |
| **Tendência Futura** | Médio | Saldo futuro vs atual |

**Classificação**:
- 🟢 **Estável** (70-100): Situação controlada
- 🟡 **Atenção** (40-69): Prevenção necessária
- 🔴 **Fora do Eixo** (0-39): Ação corretiva urgente

---

### **Passo 4: Intervenção Inteligente** 💡

Baseada em **psicologia comportamental** (Nudge, economia comportamental):

#### Tipos de Intervenção:

**🔴 CORRETIVA** (Status crítico)
```
Mensagem: "Se continuar assim, em 2 meses seu saldo entra no vermelho."
Ação: "Identifique R$ 450 de gastos variáveis que podem ser reduzidos este mês."
Impacto: "Evita aperto financeiro severo"
```

**🟡 PREVENTIVA** (Status atenção)
```
Mensagem: "Sua reserva de emergência está abaixo do recomendado."
Ação: "Guardar R$ 450 agora evita aperto no fim do mês."
Impacto: "Constrói proteção financeira gradualmente"
```

**🟢 MOTIVACIONAL** (Status estável)
```
Mensagem: "Você está no caminho certo!"
Ação: "Continue com disciplina. Você ganhou previsibilidade."
Impacto: "Mantém estabilidade financeira"
```

## 🎮 Gamificação

### 1. **Streaks** 🔥
Meses positivos consecutivos (baseado em histórico real)

### 2. **Progresso da Reserva** 📊
Barra visual: 0% → 100% (meta: 3-6 meses de despesas)

### 3. **Conquistas Silenciosas** 🏆
- "25% da reserva conquistada"
- "3 meses positivos consecutivos"
- "Dívidas reduzidas em 20%"

## 📈 Análise de Gargalos

Identifica os **3 maiores gastos** com sugestões práticas:

| Categoria | Sugestão Comportamental |
|-----------|-------------------------|
| **Moradia** | "Revise custos extras reduzíveis (energia, água)" |
| **Mercado** | "Planeje compras semanais, evite desperdícios" |
| **Lazer** | "Ajuste gradualmente sem sacrificar qualidade" |
| **Assinaturas** | "Cancele serviços não utilizados frequentemente" |

## 🔧 Uso no Código

### Instância do Analisador
```typescript
import { financialAnalyzer } from '@/application/services/financial-analyzer.service';
import { mockFinancialData } from '@/infrastructure/data/mock-financial-data';

// Executar análise completa
const analysis = financialAnalyzer.analyze(mockFinancialData);
```

### Resultado da Análise
```typescript
interface FinancialAnalysis {
  currentBalance: MonthlyBalance;      // Saldo atual
  projections: {
    month3: MonthlyBalance;            // Projeção 3 meses
    month6: MonthlyBalance;            // Projeção 6 meses
  };
  axisIndex: FinancialAxisIndex;       // Índice 0-100 + status
  bottlenecks: Bottleneck[];           // Top 3 gastos
  savingCapacity: {                    // Potencial de poupança
    current: number;
    potential: number;
    blockers: string[];
  };
  intervention: Intervention;          // Orientação inteligente
  gamification: {                      // Sistema de progresso
    streak: number;
    reserveProgress: number;
    achievements: string[];
  };
}
```

## 🎨 Componentes UI

### 1. **AxisIndexCard**
Exibe o score do Índice do Eixo com círculo de progresso

### 2. **FinancialInsights**
Card de intervenção com mensagem, micro ação e impacto

### 3. **FinancialGoalCard**
Progresso de metas (reserva, objetivos)

## 📝 Próximos Passos

### Fase 1 (MVP) ✅
- [x] Sistema de análise completo
- [x] Mock data funcional
- [x] Componentes UI integrados

### Fase 2 (Implementação)
- [ ] Formulário de entrada de dados
- [ ] Persistência com localStorage
- [ ] Histórico mensal real
- [ ] Gráficos de tendência

### Fase 3 (Backend)
- [ ] API REST para dados financeiros
- [ ] Banco de dados (PostgreSQL)
- [ ] Autenticação completa
- [ ] Multi-device sync

### Fase 4 (Avançado)
- [ ] Machine Learning para previsões
- [ ] Alertas inteligentes por push
- [ ] Relatórios PDF exportáveis
- [ ] Integração com bancos (Open Finance)

## 🚀 Como Testar

1. **Inicie o servidor**:
```bash
npm run dev
```

2. **Acesse**: http://localhost:3000

3. **Login**: Use `admin/admin` ou entre como convidado

4. **Veja a análise**: Dashboard principal mostra todos os insights

## 📚 Referências

- **Psicologia Comportamental**: Nudge Theory (Richard Thaler)
- **Economia Comportamental**: Daniel Kahneman (Thinking, Fast and Slow)
- **Princípios Financeiros**: Pay Yourself First, Emergency Fund (OECD)
- **Design Pattern**: Clean Architecture (Robert C. Martin)

---

**Desenvolvido com foco em ética, privacidade e clareza financeira** 🎯
