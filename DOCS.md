# Documentação do Projeto SaldoFuturo

## 🎯 Visão Geral

SaldoFuturo é um app financeiro previsivo SaaS com arquitetura limpa, design glassmorphism e UX humana.

## 📁 Arquitetura

### Camadas

```
src/
├── app/              # Next.js App Router (rotas e páginas)
├── domain/           # Regras de negócio puras
│   ├── entities/     # Entidades de domínio
│   └── services/     # Serviços de negócio
├── application/      # Casos de uso (use cases)
├── infrastructure/   # Integrações externas
│   └── data/         # Repositórios, APIs, mock data
└── ui/               # Componentes visuais
    └── components/   # Componentes reutilizáveis
```

### Princípios

1. **Separação de responsabilidades**: cada camada tem uma função clara
2. **Domínio isolado**: regras de negócio não dependem de framework
3. **Código legível**: clareza > complexidade
4. **Mobile first**: design responsivo desde o início

## 🎨 Design System

### Cores

- **Background**: `#0a0e1a` (fundo escuro azulado)
- **Glass**: transparência controlada com blur
- **Status**:
  - Verde `#10b981`: saudável, positivo
  - Amarelo `#f59e0b`: atenção, cuidado
  - Vermelho `#ef4444`: crítico, negativo

### Tipografia

- **UI/Texto**: Inter (var(--font-inter))
- **Valores**: Space Grotesk (var(--font-space-grotesk))

### Componentes Base

- **GlassCard**: container glassmorphism
- **ValueDisplay**: exibição de valores financeiros
- **StatusBadge**: badge de status colorido

## 💰 Lógica Financeira

### Entidades Principais

1. **FinancialProfile**: perfil financeiro do usuário
   - Saldo atual
   - Receitas e despesas
   - Ativos e passivos
   - Transações

2. **ForecastScenario**: previsão mensal
   - Saldo esperado
   - Status (healthy/warning/critical)
   - Confiança (0-100%)

3. **HealthScore**: saúde financeira
   - Score 0-100
   - Nível (excelente/bom/atenção/crítico)
   - Mensagem e dicas

### Serviços

1. **ForecastService**: cálculo de previsões
   - Projeta saldo para N meses
   - Considera receitas recorrentes
   - Estima despesas variáveis
   - Calcula confiança da previsão

2. **HealthScoreService**: score de saúde
   - Avalia saldo positivo
   - Verifica reserva de emergência
   - Analisa endividamento
   - Mede capacidade de poupança

3. **InsightsService**: feedback inteligente
   - Gera alertas críticos
   - Sugere próximas ações
   - Linguagem humana e clara

## 🎯 Funcionalidades MVP

### Dashboard Principal

1. **Saldo Futuro**
   - Projeção para fim do mês
   - Tendência (subindo/descendo)
   - Feedback contextual

2. **Saúde Financeira**
   - Score visual circular
   - Nível e mensagem
   - Status com cores

3. **Alerta Principal**
   - Aviso mais importante
   - Visual destacado

4. **Próxima Ação**
   - Sugestão acionável
   - Orientação clara

5. **Timeline Mensal**
   - Previsão 6 meses
   - Status visual (cores)
   - Confiança da previsão

## 🚀 Como Usar

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
npm start
```

## 📝 Próximos Passos

### Fase Atual: MVP Funcional ✅

- [x] Arquitetura limpa
- [x] Design system glassmorphism
- [x] Regras de domínio financeiro
- [x] Dashboard básico
- [x] Previsão mensal
- [x] Feedback textual

### Próxima Fase: Funcionalidades

- [ ] Cadastro de transações
- [ ] Edição de perfil financeiro
- [ ] Histórico de score
- [ ] Exportar relatórios
- [ ] Metas financeiras

### Futuro: Escala

- [ ] Backend real (NestJS/Node)
- [ ] Banco de dados (PostgreSQL)
- [ ] Autenticação (NextAuth)
- [ ] API RESTful
- [ ] Testes automatizados
- [ ] Deploy (Vercel)

## 💡 Princípios de UX

1. **Clareza absoluta**: cada card responde 1 pergunta
2. **Linguagem humana**: sem jargões técnicos
3. **Informação essencial primeiro**: hierarquia visual clara
4. **Feedback contextual**: mensagens personalizadas
5. **Ações sugeridas**: próximos passos sempre visíveis

## 🎨 Decisões de Design

### Por que Glassmorphism?

- Moderno e premium
- Legível com fundo escuro
- Hierarquia visual clara
- Não distrai do conteúdo

### Por que Dark Theme?

- Reduz fadiga visual
- Destaca valores e cores de status
- Sensação premium
- Economia de energia (OLED)

### Por que Mobile First?

- Maioria dos usuários acessa por mobile
- Força priorização de conteúdo
- Melhor performance
- Experiência consistente

## 📊 Tecnologias

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Styling**: Tailwind CSS
- **Animações**: Framer Motion
- **Ícones**: Lucide React
- **Gráficos**: Recharts
- **Datas**: date-fns

## 🤝 Contribuindo

Este é um projeto de portfólio e estudo. Sugestões são bem-vindas!

## 📄 Licença

Projeto pessoal - Use como referência para estudos.
