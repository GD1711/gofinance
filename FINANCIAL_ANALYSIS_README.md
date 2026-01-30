# 🧮 Sistema de Análise Financeira Inteligente

Sistema Python para cálculo de estatísticas e previsões financeiras com base nos inputs do usuário.

## 📋 Funcionalidades

- ✅ Cálculo automático de **Receitas**, **Gastos** e **Saldo**
- ✅ Agrupamento de despesas por **categoria**
- ✅ Análise de **percentual por categoria**
- ✅ Identificação do **maior gasto**
- ✅ Geração de **insights automáticos**
- ✅ **Previsões** de saldo futuro (1-3 meses)
- ✅ Exportação para **JSON**
- ✅ Status financeiro inteligente

## 🚀 Como Usar

### Executar Exemplo

```bash
python financial_analysis.py
```

### Saída Esperada

```
============================================================
📊 VISÃO GERAL FINANCEIRA
============================================================
💵 Receitas:  R$ 3,500.00
💸 Gastos:    R$ 2,347.80
💰 Saldo:     R$ 1,152.20

📌 DETALHAMENTO DOS GASTOS
------------------------------------------------------------
• Aluguel ........... R$  1,200.00
• Alimentação ....... R$    620.50
• Transporte ........ R$    280.00
• Assinaturas ....... R$    147.30
• Outros ............ R$    100.00

🧠 INSIGHTS
------------------------------------------------------------
  🔍 Maior gasto atual: Aluguel (51.1% do total)
  ⚠️ Aluguel representa um gasto alto (51.1%)

🔮 PREVISÕES (3 MESES)
------------------------------------------------------------
  Mês 1: R$ 2,304.40
  Mês 2: R$ 3,456.60
  Mês 3: R$ 4,608.80
```

## 💻 Uso Programático

```python
from financial_analysis import FinancialAnalyzer, Transaction

# Criar analisador
analyzer = FinancialAnalyzer()

# Adicionar transações
analyzer.add_transaction(Transaction(
    id="1",
    date="2026-01-05",
    category="Salário",
    amount=3500.00,
    type="income"
))

analyzer.add_transaction(Transaction(
    id="2",
    date="2026-01-10",
    category="Aluguel",
    amount=1200.00,
    type="expense"
))

# Obter visão geral
overview = analyzer.get_overview()
print(f"Saldo: R$ {overview.balance:.2f}")

# Gerar insights
insights = analyzer.generate_insights()
for insight in insights:
    print(insight)

# Exportar JSON
json_data = analyzer.export_to_json()
```

## 🎯 Integração com Frontend

O sistema exporta dados no formato JSON compatível com TypeScript:

```typescript
// src/domain/types/financial-overview.types.ts
interface FinancialDetailedData {
  overview: {
    income: number;
    expenses: number;
    balance: number;
    status: 'excellent' | 'good' | 'warning' | 'critical';
  };
  categories: Array<{
    name: string;
    total: number;
    percentage: number;
    count: number;
  }>;
  insights: string[];
  predictions: {
    month_1: number;
    month_2: number;
    month_3: number;
  };
}
```

## 📊 Status Financeiro

| Taxa de Poupança | Status |
|-----------------|--------|
| ≥ 30% | Excelente ⭐⭐⭐ |
| 20-29% | Bom ⭐⭐ |
| 10-19% | Alerta ⚠️ |
| < 10% | Crítico 🚨 |

## 🔧 Personalização

### Adicionar Nova Categoria

Simplesmente adicione transações com a nova categoria:

```python
analyzer.add_transaction(Transaction(
    id="X",
    category="Lazer",  # Nova categoria
    amount=200.00,
    type="expense"
))
```

### Ajustar Previsões

Modifique o método `predict_future_balance()`:

```python
def predict_future_balance(self, months: int = 6):  # 6 meses
    # ... sua lógica
```

## 📦 Dependências

- Python 3.8+
- Dataclasses (built-in)
- JSON (built-in)
- Typing (built-in)

**Sem dependências externas!** 🎉

## 🧪 Testes

```bash
# Executar exemplo com dados mockados
python financial_analysis.py

# Verificar saída JSON
python -c "from financial_analysis import *; a = FinancialAnalyzer(); print(a.export_to_json())"
```

## 🎯 Próximos Passos

- [ ] API REST para integração
- [ ] Persistência em banco de dados
- [ ] Machine Learning para previsões avançadas
- [ ] Análise de tendências temporais
- [ ] Alertas inteligentes por email/SMS
- [ ] Dashboard interativo

## 📝 Licença

MIT

## 👨‍💻 Autor

GOFinance Team - 2026
