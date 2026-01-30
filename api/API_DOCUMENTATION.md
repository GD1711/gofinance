# 📖 API Documentation - GoApp Financial Protocol

## Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Quick Start](#quick-start)
4. [Endpoints](#endpoints)
5. [Validações](#validações)
6. [Segurança](#segurança)
7. [Testes](#testes)
8. [Deploy](#deploy)

---

## Visão Geral

Esta não é uma API de CRUD. É um **motor de decisão financeira educacional**.

### Responsabilidades

✓ Validar metas (valor × período)  
✓ Garantir coerência matemática  
✓ Aplicar regras comportamentais  
✓ Retornar dados + interpretação  
✓ Nunca expor cálculos brutos  

### Diferencial

A UI consome **insights**, não fórmulas.

---

## Arquitetura

### Camadas

```
┌─────────────────────────────────────┐
│     1. VALIDAÇÃO (Schemas)          │  ← Pydantic
│   Se passou, está válido            │
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│    2. GOVERNANÇA (Middleware)       │  ← Rate limit
│   Rate limiting + validação         │
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│     3. ENDPOINTS (FastAPI)          │  ← Orquestração
│   Recebe, orquestra, estrutura      │
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│    4. ENGINE (Progression)          │  ← Matemática
│   Calcula. Não valida. Não decide.  │
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│    5. INSIGHTS (Interpretation)     │  ← Psicologia
│   Interpreta números. Gera narrativa│
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│    6. RESPONSE (Structured)         │  ← Dados + Significado
│   Status + Insight + Recomendação   │
└─────────────────────────────────────┘
```

### Estrutura de Arquivos

```
api/
├── main.py                    # FastAPI app + endpoints
├── schemas.py                 # Validação Pydantic
├── config.py                  # Configurações
├── middleware.py              # Governança e segurança
│
├── engine/
│   ├── progression.py         # Motor matemático
│   └── insights.py            # Interpretação comportamental
│
└── tests/
    ├── test_engine.py
    ├── test_endpoints.py
    └── test_validation.py
```

---

## Quick Start

### Instalação

```bash
cd api
pip install -r requirements.txt
```

### Executar

```bash
python main.py
```

✅ API: http://localhost:8000  
✅ Docs: http://localhost:8000/docs

### Testar

```bash
# Teste manual
python test_manual.py

# Testes automatizados
pytest tests/ -v
```

---

## Endpoints

### Health Check

```
GET /
GET /health
```

### Documentação

```
GET /docs       → Swagger UI
GET /redoc      → ReDoc
```

### Protocolos

#### POST /api/v1/protocols/progressive

Cria protocolo progressivo personalizado.

**Request:**
```json
{
  "goal": {
    "target_amount": 1000,
    "periods": 12
  },
  "protocol": {
    "start_value": 1,
    "increment": 2,
    "cap": 100
  }
}
```

**Response:**
```json
{
  "protocol_version": "1.0",
  "protocol_type": "progressive",
  "status": {
    "status": "incomplete",
    "viability": 0.144,
    "insight": "Fase de construção. O hábito ainda está se formando.",
    "recommendation": "Revisite os parâmetros..."
  },
  "result": {
    "total_accumulated": 144,
    "average_per_period": 12,
    "periods_completed": 12,
    "peak_value": 23
  }
}
```

#### POST /api/v1/protocols/optimized

Calcula protocolo otimizado automaticamente.

**Request:**
```json
{
  "target_amount": 1000,
  "periods": 12
}
```

**Response:**
```json
{
  "protocol_type": "optimized",
  "status": {
    "status": "optimal",
    "viability": 1.0,
    "insight": "Constância consolidada. Base financeira estabilizada.",
    "recommendation": "Protocolo otimizado matematicamente..."
  }
}
```

#### POST /api/v1/protocols/compare

Compara protocolo manual vs otimizado.

**Request:**
```json
{
  "goal": {
    "target_amount": 1000,
    "periods": 12
  },
  "protocol": {
    "start_value": 1,
    "increment": 2,
    "cap": 100
  }
}
```

**Response:**
```json
{
  "comparison": {
    "progressive": {
      "total": 144,
      "viability": 0.144,
      "status": "incomplete"
    },
    "optimized": {
      "total": 1000,
      "viability": 1.0,
      "status": "optimal"
    }
  },
  "insight": "Protocolo otimizado oferece X% mais eficiência.",
  "recommendation": "Considere ajustar incrementos..."
}
```

#### GET /api/v1/protocols/info

Informações sobre protocolos disponíveis.

**Response:**
```json
{
  "protocol_version": "1.0",
  "available_protocols": [
    {
      "type": "progressive",
      "description": "Progressão personalizada com teto psicológico",
      "parameters": ["start_value", "increment", "cap"]
    },
    {
      "type": "optimized",
      "description": "Progressão matemática otimizada",
      "parameters": ["automatic"]
    }
  ],
  "validation_rules": {
    "target_amount": "10 a 1.000.000",
    "periods": "3 a 120 meses",
    "start_value": "1 a 100",
    "increment": "0.5 a 50",
    "cap": "10 a 2000"
  }
}
```

---

## Validações

### 1. Validação Matemática (Pydantic)

```python
target_amount: 10 ≤ x ≤ 1.000.000
periods: 3 ≤ x ≤ 120
start_value: 1 ≤ x ≤ 100
increment: 0.5 ≤ x ≤ 50
cap: 10 ≤ x ≤ 2000
```

### 2. Validação Comportamental (Middleware)

**Meta absurda?**
```python
if monthly_rate > 10000 and periods < 12:
    ❌ Rejeitado (educacionalmente inviável)
```

**Incremento agressivo?**
```python
if increment > cap * 0.5:
    ❌ Rejeitado (progressão insustentável)
```

**Cap muito baixo?**
```python
if cap < start + (increment * 2):
    ❌ Rejeitado (sem espaço para progressão)
```

### 3. Exemplos de Rejeições

**Meta muito alta:**
```json
{
  "decision": "rejected",
  "reason": "Meta fora do escopo educacional. Este sistema constrói constância, não promete riqueza."
}
```

**Período muito curto:**
```json
{
  "decision": "rejected",
  "reason": "Período muito curto. Comportamento requer no mínimo 3 ciclos para se formar."
}
```

---

## Segurança

### Rate Limiting

- **60 requisições/minuto**
- **1000 requisições/hora**

### Security Headers

- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Strict-Transport-Security

### CORS

Configurável em `main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Logs de Decisão

Não loga valores, loga decisões:

```json
{
  "timestamp": "2026-01-30T10:30:00",
  "decision_type": "protocol_creation",
  "outcome": "approved",
  "reason": "meta dentro do escopo educacional"
}
```

---

## Testes

### Executar Todos

```bash
pytest tests/ -v
```

### Testes Específicos

```bash
# Engine matemático
pytest tests/test_engine.py -v

# Endpoints API
pytest tests/test_endpoints.py -v

# Validações
pytest tests/test_validation.py -v
```

### Coverage

```bash
pytest tests/ --cov=. --cov-report=html
```

### Teste Manual

```bash
python test_manual.py
```

Resultado esperado:
```
✅ PASSOU - Health Check
✅ PASSOU - Protocolo Progressivo
✅ PASSOU - Protocolo Otimizado
✅ PASSOU - Comparação
✅ PASSOU - Validações
✅ PASSOU - Info

🎉 TODOS OS TESTES PASSARAM!
```

---

## Deploy

### Docker

**Dockerfile:**
```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["gunicorn", "main:app", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000"]
```

**Build e Run:**
```bash
docker build -t goapp-api .
docker run -p 8000:8000 goapp-api
```

### Docker Compose

```yaml
version: '3.8'

services:
  api:
    build: ./api
    ports:
      - "8000:8000"
    environment:
      - LOG_LEVEL=info
      - RATE_LIMIT_PER_MINUTE=60
    restart: unless-stopped
```

### Produção

```bash
# Com Gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000

# Ou com Uvicorn
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

---

## Integração com Next.js

### Service TypeScript

Arquivo criado: `src/services/financial-protocol.service.ts`

**Uso:**
```typescript
import { FinancialProtocolService } from '@/services/financial-protocol.service';

// Criar protocolo
const response = await FinancialProtocolService.createProgressiveProtocol(
  { target_amount: 1000, periods: 12 },
  { start_value: 1, increment: 2, cap: 100 }
);

// Usar resultado
console.log(response.status.insight);
console.log(response.status.viability);
```

### Configuração

**`.env.local`:**
```
NEXT_PUBLIC_FINANCIAL_API_URL=http://localhost:8000
```

### Página Demo

Já criada em: `src/app/protocol-demo/page.tsx`

Acesse: http://localhost:3000/protocol-demo

---

## Filosofia de Design

### 1. Separação de Responsabilidades

- **API** = Governa entrada/saída
- **Engine** = Calcula
- **Insights** = Interpreta

### 2. Nunca Expor Cálculo Bruto

❌ "Você precisa economizar R$ 83,33/mês"  
✅ "Ritmo sólido. O sistema está funcionando."

### 3. Educação, Não Promessa

❌ "Você terá R$ X em Y anos"  
✅ "Constância consolidada. Base financeira estabilizada."

### 4. Validação Protetora

A API protege o usuário de si mesmo:
- Metas irreais
- Prazos absurdos
- Protocolos destrutivos

---

## Próximos Passos

### Fase 2 (Futuro)
- [ ] Autenticação JWT
- [ ] Banco de dados (PostgreSQL)
- [ ] Histórico de protocolos
- [ ] Analytics

### Fase 3 (Futuro)
- [ ] Cache (Redis)
- [ ] Observabilidade (Prometheus)
- [ ] CI/CD (GitHub Actions)
- [ ] Deploy em cloud

---

## Suporte

- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc
- **Health Check:** http://localhost:8000/health

---

**Desenvolvido com Python 3.11 + FastAPI + Pydantic v2**  
**Filosofia: Educação Financeira Comportamental**  
**Status: ✅ Pronto para uso**
