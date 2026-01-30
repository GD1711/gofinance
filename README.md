<div align="center">

# 🚀 GoApp Financial Protocol

### Motor de Decisão Financeira Educacional

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/yourusername/goapp)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.11+-yellow.svg)](https://www.python.org/)
[![Next.js](https://img.shields.io/badge/next.js-15-black.svg)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.128+-teal.svg)](https://fastapi.tiangolo.com/)

[🎯 Demo](http://localhost:3000) • [📖 Documentação](api/API_DOCUMENTATION.md) • [🔧 API Docs](http://localhost:8000/docs)

</div>

---

## 💡 Sobre o Projeto

**GoApp não é uma planilha. É um motor de decisão.**

Uma plataforma financeira moderna que combina **validação comportamental**, **progressão gamificada** e **insights psicológicos** para transformar a forma como as pessoas gerenciam dinheiro.

### Diferencial

- ✓ **API Educacional**: Valida metas antes de apresentá-las
- ✓ **Insights, não números**: "Ritmo sólido" em vez de "R$ 83,33/mês"
- ✓ **Proteção comportamental**: Rejeita metas irreais ou destrutivas
- ✓ **Gamificação estratégica**: Progressão AR com tetos psicológicos
- ✓ **Clean Architecture**: 6 camadas de validação e governança

---

## 🎯 Features

### Frontend (Next.js 15 + TypeScript)

- 🎨 **Design System**: Liquid Glass + Microvisualizações
- 📊 **Dashboard Financeiro**: Overview com gráficos interativos
- 💸 **Transações**: Histórico com categorização automática
- 🎯 **Metas Financeiras**: Planejador com protocolos progressivos
- 🤖 **FINN AI**: Assistente financeiro conversacional
- 📈 **Investimentos**: Portfólio com análise de performance
- 🏆 **Gamificação**: Sistema de desafios e conquistas

### Backend (FastAPI + Python 3.11)

- ✅ **6 Camadas de Validação**: Pydantic + Middleware + Engine
- 🔒 **Rate Limiting**: 60 req/min, 1000 req/hora
- 📈 **Motor Matemático**: Progressão aritmética otimizada
- 🧠 **Engine de Insights**: Interpretação comportamental
- 🛡️ **Validação Protetora**: Rejeita metas educacionalmente inviáveis
- 📊 **21+ Testes**: Cobertura de engine, endpoints e validações
- 🔄 **REST API**: 6 endpoints documentados com Swagger

---

## ⚡ Quick Start

### Pré-requisitos

- Node.js 18+
- Python 3.11+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/yourusername/goapp.git
cd goapp

# Frontend
npm install
npm run dev

# Backend (em outro terminal)
cd api
pip install -r requirements.txt
python main.py
```

### Acesse

- 🎨 **Frontend**: http://localhost:3000
- ⚙️ **API**: http://localhost:8000
- 📚 **Swagger UI**: http://localhost:8000/docs
- 📖 **ReDoc**: http://localhost:8000/redoc

---

## 🏗️ Arquitetura

```
goapp/
├── src/                           # Frontend Next.js
│   ├── app/                       # Pages (App Router)
│   ├── ui/components/             # Componentes React
│   ├── domain/                    # Lógica de negócio
│   ├── application/               # Casos de uso
│   └── infrastructure/            # Mock data & services
│
├── api/                           # Backend FastAPI
│   ├── main.py                    # API REST
│   ├── schemas.py                 # Validação Pydantic
│   ├── middleware.py              # Governança
│   ├── engine/
│   │   ├── progression.py         # Motor matemático
│   │   └── insights.py            # Interpretação
│   └── tests/                     # 21+ testes
│
└── public/                        # Assets estáticos
```

### Camadas da API

```
1. VALIDAÇÃO (Pydantic)      → Se passou, está válido
2. GOVERNANÇA (Middleware)   → Rate limiting + segurança
3. ENDPOINTS (FastAPI)       → Orquestração
4. ENGINE (Progression)      → Matemática pura
5. INSIGHTS (Interpretation) → Psicologia financeira
6. RESPONSE (Structured)     → Dados + Significado
```

---

## 📡 API REST

### Endpoints Disponíveis

#### POST `/api/v1/protocols/progressive`

Cria protocolo progressivo personalizado.

**Request:**
```json
{
  "goal": { "target_amount": 1000, "periods": 12 },
  "protocol": { "start_value": 1, "increment": 2, "cap": 100 }
}
```

**Response:**
```json
{
  "protocol_type": "progressive",
  "status": {
    "viability": 0.144,
    "insight": "Fase de construção. O hábito ainda está se formando.",
    "recommendation": "Revisite os parâmetros..."
  },
  "result": {
    "total_accumulated": 144,
    "periods_completed": 12
  }
}
```

#### POST `/api/v1/protocols/optimized`

Calcula protocolo otimizado automaticamente.

#### POST `/api/v1/protocols/compare`

Compara protocolo manual vs otimizado.

#### GET `/api/v1/protocols/info`

Informações sobre protocolos e regras de validação.

#### GET `/health`

Health check da API.

**📖 [Documentação Completa](api/API_DOCUMENTATION.md)**

---

## 🎨 Design System

### Liquid Glass

- **Cards**: Glassmorphism com blur + transparência
- **Animações**: 60fps com Lottie + Framer Motion
- **Cores**: Sistema de tokens com dark mode nativo
- **Tipografia**: Inter + SF Pro (fallback)

### Componentes

- `FinancialBaseSection`: Overview principal
- `FinancialCalendar`: Calendário de transações
- `FinancialGoalPlanner`: Planejador de metas
- `TransactionsCard`: Histórico com categorias
- `BottomNav`: Navegação com microvisualizações

---

## 🧪 Testes

### Backend

```bash
cd api

# Todos os testes
pytest tests/ -v

# Com coverage
pytest tests/ --cov=. --cov-report=html

# Teste manual
python test_manual.py
```

### Frontend

```bash
# Executar em dev
npm run dev

# Build para produção
npm run build
npm start
```

---

## 🔒 Segurança

- ✅ Rate limiting (60/min, 1000/hora)
- ✅ Security headers (XSS, CSP, HSTS)
- ✅ CORS configurado
- ✅ Validação Pydantic em 3 camadas
- ✅ Logs de decisão (não valores sensíveis)
- ✅ Middleware de proteção comportamental

---

## 🚀 Deploy

### Docker

```bash
# API
docker build -t goapp-api ./api
docker run -p 8000:8000 goapp-api

# Frontend
docker build -t goapp-web .
docker run -p 3000:3000 goapp-web
```

### Docker Compose

```bash
docker-compose up -d
```

### Produção

**Backend:**
```bash
cd api
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

**Frontend:**
```bash
npm run build
npm start
```

---

## 🛠️ Stack Tecnológica

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Linguagem**: TypeScript 5
- **Styling**: Tailwind CSS 3
- **Animações**: Lottie + Framer Motion
- **Icons**: Lucide React
- **State**: React Hooks

### Backend
- **Framework**: FastAPI 0.128+
- **Linguagem**: Python 3.11+
- **Validação**: Pydantic 2.12+
- **Server**: Uvicorn
- **Testes**: Pytest

---

## 📚 Documentação

- 📖 [Documentação da API](api/API_DOCUMENTATION.md) - Completa e consolidada
- 🔧 [Swagger UI](http://localhost:8000/docs) - Interativa
- 📚 [ReDoc](http://localhost:8000/redoc) - Estática

---

## 🎯 Roadmap

### ✅ Fase 1 - MVP (Concluído)
- [x] Frontend Next.js completo
- [x] API REST com 6 endpoints
- [x] Validação comportamental
- [x] Sistema de insights
- [x] 21+ testes automatizados
- [x] Documentação completa

### 🔄 Fase 2 - Autenticação (Em breve)
- [ ] NextAuth.js
- [ ] JWT tokens
- [ ] Perfil de usuário
- [ ] Histórico persistente

### 🚀 Fase 3 - Escala (Futuro)
- [ ] Banco de dados (PostgreSQL)
- [ ] Cache (Redis)
- [ ] Observabilidade (Prometheus)
- [ ] Deploy em cloud

---

## 🤝 Contribuindo

Contribuições são bem-vindas!

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add: nova feature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Diretrizes

- Use TypeScript no frontend
- Siga os padrões de validação no backend
- Adicione testes para novas features
- Mantenha a filosofia educacional da API

---

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

---

## 👨‍💻 Autor

**Desenvolvido com 💙 por [Seu Nome]**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Seu Nome](https://linkedin.com/in/yourprofile)

---

<div align="center">

### ⭐ Gostou do projeto? Deixe uma estrela!

**GoApp** - Transformando a educação financeira através da tecnologia

[Reportar Bug](https://github.com/yourusername/goapp/issues) • [Solicitar Feature](https://github.com/yourusername/goapp/issues) • [Documentação](api/API_DOCUMENTATION.md)

</div>
