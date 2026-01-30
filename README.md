# 💰 GoFinance

**Aplicativo de gestão financeira inteligente** com sistema de previsão, gamificação e análise de saúde financeira.

> Transforme seus dados financeiros em insights acionáveis com uma interface moderna e intuitiva.

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Como Executar](#-como-executar)
- [Desenvolvimento no VS Code](#-desenvolvimento-no-vs-code)
- [Git: Push, Pull e Commits](#-git-push-pull-e-commits)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Deploy](#-deploy)
- [Contribuindo](#-contribuindo)

---

## 🎯 Sobre o Projeto

**GoFinance** é uma plataforma web completa de gestão financeira pessoal que utiliza inteligência artificial e análise preditiva para ajudar usuários a:

- 📊 **Visualizar** suas finanças de forma clara e interativa
- 🔮 **Prever** saldos futuros baseados em padrões de gastos
- 🎮 **Gamificar** o processo de economia com níveis e conquistas
- 💡 **Receber insights** personalizados sobre saúde financeira
- 📈 **Acompanhar metas** de curto, médio e longo prazo

### 🌟 Destaques

- ✨ Design moderno com **Glass Morphism** e **Liquid Animations**
- 🏗️ Arquitetura limpa (Clean Architecture) para escalabilidade
- 📱 Totalmente responsivo (Mobile First)
- 🔐 Autenticação segura com NextAuth.js
- 🎨 Componentes reutilizáveis e modularizados
- 🚀 Performance otimizada com Next.js 15

---

## 🚀 Funcionalidades

### 💳 Gestão de Transações
- ✅ Adicionar, editar e excluir receitas e despesas
- ✅ Categorização automática de transações
- ✅ Filtros por período, categoria e tipo
- ✅ Visualização em tabelas e gráficos interativos

### 📊 Dashboard Inteligente
- ✅ Visão geral de saldo atual e futuro
- ✅ Gráficos de evolução patrimonial
- ✅ Análise de distribuição de gastos
- ✅ Indicadores de saúde financeira (score 0-100)

### 🔮 Sistema de Previsão
- ✅ Previsão de saldo futuro (3, 6, 12 meses)
- ✅ Análise de padrões de gastos recorrentes
- ✅ Alertas de possíveis déficits
- ✅ Sugestões de economia baseadas em IA

### 🎮 Gamificação
- ✅ Sistema de níveis financeiros (Iniciante → Mestre)
- ✅ Conquistas e badges
- ✅ Streak de dias economizando
- ✅ Desafios mensais

### 📈 Investimentos
- ✅ Acompanhamento de carteira de investimentos
- ✅ Cálculo de rentabilidade
- ✅ Diversificação de portfólio
- ✅ Comparação com índices de mercado

### 🎯 Metas Financeiras
- ✅ Criação de objetivos personalizados
- ✅ Acompanhamento de progresso visual
- ✅ Reserva de emergência automática
- ✅ Calculadora de tempo para atingir metas

---

## 🛠️ Tecnologias

### Frontend
- **[Next.js 15](https://nextjs.org/)** - Framework React com SSR e App Router
- **[React 18](https://react.dev/)** - Biblioteca para interfaces de usuário
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado de JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitário

### UI/UX
- **[Framer Motion](https://www.framer.com/motion/)** - Animações fluidas
- **[Lucide React](https://lucide.dev/)** - Ícones modernos
- **[Recharts](https://recharts.org/)** - Gráficos interativos
- **[Lottie](https://lottiefiles.com/)** - Animações vetoriais

### Autenticação & Estado
- **[NextAuth.js](https://next-auth.js.org/)** - Autenticação para Next.js
- **[React Hooks](https://react.dev/reference/react)** - Gerenciamento de estado

### Ferramentas de Desenvolvimento
- **[ESLint](https://eslint.org/)** - Linting de código
- **[PostCSS](https://postcss.org/)** - Processamento de CSS
- **[date-fns](https://date-fns.org/)** - Manipulação de datas

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **[Node.js](https://nodejs.org/)** (versão 18 ou superior)
- **[npm](https://www.npmjs.com/)** ou **[yarn](https://yarnpkg.com/)** ou **[pnpm](https://pnpm.io/)**
- **[Git](https://git-scm.com/)**
- **[VS Code](https://code.visualstudio.com/)** (recomendado)

### Verificar instalações:

```bash
node --version   # Deve mostrar v18.x.x ou superior
npm --version    # Deve mostrar 9.x.x ou superior
git --version    # Deve mostrar 2.x.x ou superior
```

---

## 💻 Instalação

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/GD1711/gofinance.git
cd gofinance
```

### 2️⃣ Instalar dependências

Escolha seu gerenciador de pacotes preferido:

```bash
# npm
npm install

# ou yarn
yarn install

# ou pnpm
pnpm install
```

### 3️⃣ Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
cp .env.local.example .env.local
```

Edite o `.env.local` com suas configurações:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sua-chave-secreta-aqui

# Database (se usar)
DATABASE_URL=postgresql://...

# APIs externas (opcional)
API_KEY=...
```

---

## 🎮 Como Executar

### Modo Desenvolvimento

Inicia o servidor de desenvolvimento com hot-reload:

```bash
npm run dev
```

Acesse: **http://localhost:3000**

### Modo Produção

Build otimizado para produção:

```bash
npm run build
npm start
```

### Linting

Verificar problemas no código:

```bash
npm run lint
```

---

## 🖥️ Desenvolvimento no VS Code

### Abrindo o Projeto

1. **Abrir o VS Code:**
   ```bash
   code .
   ```
   
2. **Ou abrir pelo menu:**
   - File → Open Folder → Selecione a pasta `gofinance`

### Terminal Integrado

Usar o terminal do VS Code para desenvolvimento:

1. **Abrir terminal:** `` Ctrl + ` `` (ou View → Terminal)

2. **Criar novo terminal:**
   - Clique no `+` no painel do terminal
   - Ou `Ctrl + Shift + '`

3. **Múltiplos terminais:**
   - Terminal 1: `npm run dev` (servidor)
   - Terminal 2: Comandos git
   - Terminal 3: Outros scripts

### Comandos Úteis no Terminal VS Code

```bash
# Iniciar desenvolvimento
npm run dev

# Verificar status do Git
git status

# Ver branches
git branch

# Instalar nova dependência
npm install nome-do-pacote

# Rodar build
npm run build

# Limpar cache do Next.js
rm -rf .next
```

### Extensões Recomendadas para VS Code

Instale estas extensões para melhor experiência:

- **ES7+ React/Redux/React-Native snippets** - Snippets React
- **Tailwind CSS IntelliSense** - Autocomplete Tailwind
- **Pretty TypeScript Errors** - Erros TS mais legíveis
- **Error Lens** - Erros inline
- **GitLens** - Git superpowers
- **Thunder Client** - Testar APIs
- **Auto Rename Tag** - Renomear tags HTML
- **Path Intellisense** - Autocomplete de caminhos

### Atalhos Úteis VS Code

```
Ctrl + P          → Busca rápida de arquivos
Ctrl + Shift + P  → Command Palette
Ctrl + `          → Abrir/fechar terminal
Ctrl + B          → Toggle sidebar
Ctrl + /          → Comentar linha
Alt + ↑/↓         → Mover linha
Shift + Alt + ↓   → Duplicar linha
Ctrl + D          → Selecionar próxima ocorrência
F2                → Renomear símbolo
```

---

## 🔄 Git: Push, Pull e Commits

### Configuração Inicial (primeira vez)

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@example.com"
```

### Workflow Básico

#### 1️⃣ Verificar Status

```bash
git status
```

Mostra arquivos modificados, adicionados ou excluídos.

#### 2️⃣ Adicionar Arquivos

```bash
# Adicionar arquivo específico
git add src/components/NovoComponente.tsx

# Adicionar todos os arquivos modificados
git add .

# Adicionar por padrão
git add src/**/*.tsx
```

#### 3️⃣ Fazer Commit

```bash
# Commit com mensagem descritiva
git commit -m "feat: adiciona componente de filtro de transações"

# Commit com descrição detalhada
git commit -m "fix: corrige cálculo de saldo futuro" -m "- Ajusta lógica de projeção mensal
- Adiciona validação de dados nulos
- Atualiza testes unitários"
```

#### 4️⃣ Enviar para GitHub (Push)

```bash
# Push para branch atual
git push

# Push especificando branch
git push origin main

# Forçar push (cuidado!)
git push -f origin main
```

#### 5️⃣ Baixar Atualizações (Pull)

```bash
# Pull da branch atual
git pull

# Pull de branch específica
git pull origin main

# Pull com rebase
git pull --rebase
```

### Comandos Git Avançados

#### Criar Nova Branch

```bash
# Criar e mudar para nova branch
git checkout -b feature/nova-funcionalidade

# Criar branch sem mudar
git branch feature/nova-funcionalidade
```

#### Mudar de Branch

```bash
git checkout main
git checkout feature/login
```

#### Ver Histórico

```bash
# Log simples
git log --oneline

# Log com gráfico
git log --graph --oneline --all

# Log de um arquivo específico
git log -- src/app/page.tsx
```

#### Desfazer Alterações

```bash
# Descartar mudanças em arquivo
git checkout -- arquivo.tsx

# Desfazer último commit (mantém arquivos modificados)
git reset --soft HEAD~1

# Desfazer último commit (descarta tudo)
git reset --hard HEAD~1

# Reverter commit específico
git revert abc123
```

#### Stash (Guardar Temporariamente)

```bash
# Guardar alterações
git stash

# Guardar com mensagem
git stash save "WIP: implementando filtros"

# Listar stashes
git stash list

# Aplicar último stash
git stash apply

# Aplicar e remover stash
git stash pop
```

#### Ver Diferenças

```bash
# Ver mudanças não commitadas
git diff

# Ver mudanças em arquivo específico
git diff src/app/page.tsx

# Ver diferença entre branches
git diff main..feature/login
```

### Convenção de Commits

Use prefixos para mensagens claras:

```bash
feat:     # Nova funcionalidade
fix:      # Correção de bug
docs:     # Documentação
style:    # Formatação (sem mudança de código)
refactor: # Refatoração
test:     # Adiciona/corrige testes
chore:    # Tarefas de manutenção
perf:     # Melhoria de performance
```

**Exemplos:**

```bash
git commit -m "feat: adiciona página de investimentos"
git commit -m "fix: corrige erro no cálculo de juros"
git commit -m "docs: atualiza README com instruções de deploy"
git commit -m "refactor: melhora estrutura de componentes"
```

### Sincronização Completa (Workflow Diário)

```bash
# 1. Baixar atualizações
git pull origin main

# 2. Ver o que mudou
git status

# 3. Adicionar alterações
git add .

# 4. Commitar com mensagem descritiva
git commit -m "feat: implementa dashboard de investimentos"

# 5. Enviar para GitHub
git push origin main
```

---

## 📁 Estrutura do Projeto

```
gofinance/
├── public/                      # Arquivos estáticos
│   └── animations/              # Animações Lottie
│       ├── liquid-glass.json
│       └── piggy-bank.json
│
├── src/
│   ├── app/                     # App Router do Next.js
│   │   ├── api/                 # API Routes
│   │   │   └── auth/            # Rotas de autenticação
│   │   ├── dashboard/           # Página do dashboard
│   │   ├── transactions/        # Página de transações
│   │   ├── investments/         # Página de investimentos
│   │   ├── login/               # Página de login
│   │   ├── layout.tsx           # Layout raiz
│   │   ├── page.tsx             # Página inicial
│   │   └── globals.css          # Estilos globais
│   │
│   ├── domain/                  # Camada de domínio (Clean Arch)
│   │   ├── entities/            # Entidades de negócio
│   │   │   ├── finance.entity.ts
│   │   │   └── gamification.entity.ts
│   │   ├── services/            # Serviços de domínio
│   │   │   ├── finance.service.ts
│   │   │   ├── prediction.service.ts
│   │   │   └── economic-insights.service.ts
│   │   └── types/               # Tipos de domínio
│   │       ├── financial-data.types.ts
│   │       └── financial-overview.types.ts
│   │
│   ├── application/             # Camada de aplicação
│   │   └── services/            # Serviços de aplicação
│   │       ├── financial-analyzer.service.ts
│   │       └── brand-icons.service.ts
│   │
│   ├── infrastructure/          # Camada de infraestrutura
│   │   └── data/                # Dados mockados (mock data)
│   │       ├── mock-financial-data.ts
│   │       ├── mock-financial-overview.ts
│   │       ├── mockData.ts
│   │       └── mockGamificationData.ts
│   │
│   ├── ui/                      # Camada de interface
│   │   ├── components/          # Componentes React
│   │   │   ├── ActivitySummary.tsx
│   │   │   ├── AddTransactionModal.tsx
│   │   │   ├── FinancialCalendar.tsx
│   │   │   ├── LiquidGlassAnimation.tsx
│   │   │   ├── HealthScoreCard.tsx
│   │   │   └── ... (50+ componentes)
│   │   └── icons/               # Ícones customizados
│   │       └── index.tsx
│   │
│   ├── hooks/                   # Custom React Hooks
│   │   ├── useAuth.ts
│   │   └── useGuestMode.ts
│   │
│   ├── types/                   # Tipos TypeScript globais
│   │   └── lottie.d.ts
│   │
│   └── auth.ts                  # Configuração NextAuth
│
├── .vscode/                     # Configurações VS Code
│   └── settings.json
│
├── .env.local.example           # Exemplo de variáveis de ambiente
├── .gitignore                   # Arquivos ignorados pelo Git
├── next.config.mjs              # Configuração Next.js
├── tailwind.config.ts           # Configuração Tailwind
├── tsconfig.json                # Configuração TypeScript
├── postcss.config.mjs           # Configuração PostCSS
├── package.json                 # Dependências e scripts
│
├── setup-github.ps1             # Script de setup GitHub (Windows)
├── setup-github.sh              # Script de setup GitHub (Linux/Mac)
├── GITHUB_SETUP_GUIDE.md        # Guia de setup GitHub
│
└── README.md                    # Este arquivo
```

### Arquitetura Limpa (Clean Architecture)

O projeto segue os princípios da Clean Architecture:

1. **Domain** - Regras de negócio puras (entities, services)
2. **Application** - Casos de uso e orquestração
3. **Infrastructure** - Acesso a dados, APIs externas
4. **UI** - Componentes visuais e interação

**Fluxo de dependências:**  
`UI → Application → Domain ← Infrastructure`

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento (localhost:3000) |
| `npm run build` | Cria build otimizado para produção |
| `npm start` | Inicia servidor de produção |
| `npm run lint` | Executa ESLint para verificar código |

### Scripts Personalizados (Adicionar em package.json)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf .next node_modules"
  }
}
```

---

## 🚀 Deploy

### Vercel (Recomendado)

1. **Instalar Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Fazer deploy:**
   ```bash
   vercel
   ```

3. **Deploy de produção:**
   ```bash
   vercel --prod
   ```

### Outras Plataformas

- **Netlify**: Conecte o repositório GitHub
- **Railway**: Deploy automático via GitHub
- **Docker**: Use o Dockerfile incluído

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga os passos:

1. **Fork** o projeto
2. **Crie uma branch** para sua feature: `git checkout -b feature/MinhaFeature`
3. **Commit** suas mudanças: `git commit -m 'feat: adiciona MinhaFeature'`
4. **Push** para a branch: `git push origin feature/MinhaFeature`
5. **Abra um Pull Request**

### Boas Práticas

- ✅ Escreva commits descritivos
- ✅ Mantenha código limpo e legível
- ✅ Adicione comentários quando necessário
- ✅ Teste antes de fazer push
- ✅ Siga o estilo de código do projeto

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor

**Gustavo**  
📧 Email: gustavobap0612@gmail.com  
🐙 GitHub: [@GD1711](https://github.com/GD1711)

---

## 🙏 Agradecimentos

- Next.js Team pela excelente framework
- Comunidade Open Source
- Todos os contribuidores

---

## 📞 Suporte

Encontrou um bug ou tem uma sugestão?

- 🐛 [Abra uma issue](https://github.com/GD1711/gofinance/issues)
- 💬 [Discussões](https://github.com/GD1711/gofinance/discussions)

---

<div align="center">

**⭐ Se este projeto foi útil, considere dar uma estrela!**

[⬆ Voltar ao topo](#-gofinance)

</div>
