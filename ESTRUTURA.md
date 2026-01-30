# 🏗️ Estrutura Completa do Projeto

## 📂 Árvore de Arquivos

```
goapp/
│
├── 📄 package.json                 # Dependências e scripts
├── 📄 tsconfig.json                # Configuração TypeScript
├── 📄 tailwind.config.ts           # Configuração Tailwind + Design System
├── 📄 postcss.config.mjs           # PostCSS para Tailwind
├── 📄 next.config.mjs              # Configuração Next.js
├── 📄 .gitignore                   # Arquivos ignorados pelo Git
│
├── 📖 README.md                    # Visão geral do projeto
├── 📖 DOCS.md                      # Documentação completa
├── 📖 START.md                     # Guia de início rápido
└── 📖 ESTRUTURA.md                 # Este arquivo
│
└── src/                            # Código fonte
    │
    ├── 🌐 app/                     # Next.js App Router
    │   ├── layout.tsx              # Layout raiz (fontes, metadata)
    │   ├── page.tsx                # Dashboard principal (HOME)
    │   └── globals.css             # Estilos globais + Tailwind
    │
    ├── 💼 domain/                  # CAMADA DE DOMÍNIO (regras puras)
    │   │
    │   ├── entities/               # Entidades de negócio
    │   │   └── finance.entity.ts   # Transaction, Asset, Liability, etc.
    │   │
    │   └── services/               # Serviços de domínio
    │       └── finance.service.ts  # ForecastService, HealthScoreService, etc.
    │
    ├── 📋 application/             # CASOS DE USO (futuramente)
    │   └── (vazio por enquanto)
    │
    ├── 🔧 infrastructure/          # INFRAESTRUTURA (dados, APIs)
    │   └── data/
    │       └── mockData.ts         # Dados de exemplo para desenvolvimento
    │
    └── 🎨 ui/                      # COMPONENTES VISUAIS
        └── components/
            ├── GlassCard.tsx            # Card base glassmorphism
            ├── ValueDisplay.tsx         # Exibição de valores financeiros
            ├── StatusBadge.tsx          # Badge de status (verde/amarelo/vermelho)
            ├── FutureBalanceCard.tsx    # Card "Saldo Futuro"
            ├── HealthScoreCard.tsx      # Card "Saúde Financeira"
            ├── AlertCard.tsx            # Card "Alerta Principal"
            ├── NextActionCard.tsx       # Card "Próxima Ação"
            └── MonthlyTimeline.tsx      # Timeline de previsão mensal
```

## 🎯 Responsabilidades por Camada

### 🌐 App (Apresentação)
**O que faz:**
- Rotas e páginas Next.js
- Composição de componentes
- Lógica de UI (estados, eventos)

**Não faz:**
- Regras de negócio
- Cálculos financeiros

### 💼 Domain (Domínio)
**O que faz:**
- Regras de negócio puras
- Entidades e serviços
- Lógica financeira validada

**Não faz:**
- Depender de frameworks
- Acessar banco de dados
- Renderizar UI

### 📋 Application (Casos de Uso)
**O que fará:**
- Orquestrar serviços de domínio
- Coordenar fluxos complexos
- Validar entrada de usuários

### 🔧 Infrastructure (Infraestrutura)
**O que faz/fará:**
- Persistência de dados
- APIs externas
- Repositórios

### 🎨 UI (Componentes)
**O que faz:**
- Componentes visuais reutilizáveis
- Design system
- Microinterações

## 📊 Fluxo de Dados

```
Usuario
  ↓
[page.tsx] ← chama
  ↓
[domain/services] ← usa
  ↓
[domain/entities] ← manipula
  ↓
[infrastructure/data] ← busca dados
  ↓
[ui/components] ← renderiza
  ↓
Tela do Usuario
```

## 🎨 Componentes UI - Hierarquia

```
Dashboard (page.tsx)
│
├── Header
│   ├── Logo
│   └── Menu
│
├── FutureBalanceCard
│   ├── ValueDisplay
│   ├── TrendIndicator
│   └── StatusMessage
│
├── HealthScoreCard
│   ├── CircularScore
│   └── StatusBadge
│
├── AlertCard
│   └── Icon + Message
│
├── NextActionCard
│   └── Icon + Action
│
├── MonthlyTimeline
│   └── MonthCard[] (x6)
│       ├── Month Info
│       ├── Balance
│       └── Status Indicator
│
└── Footer
```

## 🔑 Arquivos Chave

### Mais Importantes

1. **src/app/page.tsx**
   - Dashboard principal
   - Integra todos os componentes
   - Usa serviços de domínio

2. **src/domain/services/finance.service.ts**
   - ForecastService: cálculo de previsões
   - HealthScoreService: score de saúde
   - InsightsService: alertas e sugestões

3. **src/domain/entities/finance.entity.ts**
   - Definições de tipos
   - Interfaces das entidades

### Configuração

1. **tailwind.config.ts**
   - Cores do design system
   - Fontes (Inter + Space Grotesk)
   - Extensões do Tailwind

2. **src/app/globals.css**
   - Classes utilitárias
   - Componentes base (glass-card, etc.)
   - Scrollbar customizado

## 🎨 Design System - Tokens

### Cores
```typescript
background: {
  DEFAULT: "#0a0e1a",    // Fundo escuro azulado
  secondary: "#12182b",   // Fundo secundário
}

glass: {
  border: "rgba(255, 255, 255, 0.1)",  // Borda sutil
  bg: "rgba(255, 255, 255, 0.05)",     // Fundo transparente
}

status: {
  green: "#10b981",   // Saudável
  yellow: "#f59e0b",  // Atenção
  red: "#ef4444",     // Crítico
}
```

### Tipografia
```css
font-sans → Inter (UI e textos)
font-mono → Space Grotesk (valores financeiros)

value-large  → 4xl-5xl (saldo principal)
value-medium → 2xl-3xl (valores médios)
value-small  → xl (valores secundários)
```

### Espaçamento
```
Card padding: p-6 (24px)
Card gap: space-y-4 (16px)
Border radius: rounded-2xl (16px)
```

## 🔄 Próximas Adições

Quando o projeto crescer, adicione:

```
src/
├── app/
│   ├── dashboard/           # Dashboard separado
│   ├── transactions/        # Gestão de transações
│   ├── profile/            # Perfil do usuário
│   └── api/                # API routes Next.js
│
├── application/
│   ├── use-cases/          # Casos de uso específicos
│   └── ports/              # Interfaces para infraestrutura
│
├── infrastructure/
│   ├── repositories/       # Acesso ao banco
│   ├── api/               # Clients de API
│   └── cache/             # Sistema de cache
│
├── hooks/                 # Custom React hooks
├── utils/                 # Funções utilitárias
├── types/                 # Tipos TypeScript globais
└── __tests__/            # Testes automatizados
```

## 📈 Status Atual

✅ **MVP Funcional Completo**
- Arquitetura limpa implementada
- Design system glassmorphism
- 6 componentes principais
- Regras de domínio financeiro
- Dashboard totalmente funcional

🎯 **Pronto para:**
- Desenvolvimento de novas features
- Integração com backend real
- Testes com usuários
- Deploy em produção

---

**Esta estrutura foi pensada para ser:**
- ✨ Clara e organizada
- 🚀 Escalável desde o início
- 🧩 Fácil de manter e evoluir
- 💼 Profissional e vendável
