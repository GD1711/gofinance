# 📊 MODELO ECONÔMICO - SALDOFUTURO

## 🎯 Visão Geral

SaldoFuturo não é apenas um app de previsão financeira.  
É um **sistema de decisão econômica** baseado em princípios validados, economia comportamental e métodos reais de construção de reservas.

**Diferencial:** Não fazemos "achismo". Cada cálculo tem fundamento econômico.

---

## 🧮 FUNDAMENTOS ECONÔMICOS

### 1️⃣ Média Móvel Ponderada (Time Series Economics)

**Origem:**
- Amplamente usado em análise de séries temporais
- Aplicado em: projeções de consumo familiar, forecasting, análise de demanda

**Por que funciona:**
- Comportamento financeiro **muda com o tempo**
- Meses recentes são **mais relevantes** que meses antigos
- Pesos crescentes: últimos meses têm maior influência

**Implementação:**
```typescript
Exemplo: [100, 200, 300]
Pesos:    [1,   2,   3]
Média ponderada = (100×1 + 200×2 + 300×3) / (1+2+3) = 233.33
```

**Vantagens vs média simples:**
- ✅ Responde mais rápido a mudanças de padrão
- ✅ Ignora outliers antigos
- ✅ Captura tendências atuais

---

### 2️⃣ Pay Yourself First (Poupança Forçada)

**Origem:**
- Princípio clássico de finanças pessoais
- Citado por: George S. Clason ("O Homem Mais Rico da Babilônia"), David Bach ("Automatização do Milhão")

**Conceito:**
> "A poupança deve vir **ANTES** do consumo, não depois."

**Por que funciona:**
- A maioria das pessoas gasta tudo que sobra
- Se você guardar apenas "o que sobrar", não sobrará nada
- **Decisão automática > disciplina manual**

**Implementação:**
```typescript
Entradas previstas: R$ 4.200
Taxa de poupança: 15%
Poupança forçada: R$ 630 (guardados ANTES de gastar)
Saldo restante: R$ 3.570 (disponível para despesas)
```

---

### 3️⃣ Taxa de Poupança Saudável (OECD / Estudos US/EU)

**Baseado em:**
- OECD (Organização para a Cooperação e Desenvolvimento Econômico)
- Estudos de household savings nos EUA, Europa e Brasil

**Classificação:**

| Taxa | Status | Interpretação |
|------|--------|---------------|
| < 10% | 🔴 Crítico | Risco financeiro alto, vulnerável a emergências |
| 10-15% | 🟡 Aceitável | Começando a construir reserva |
| 15-20% | 🟢 Saudável | Padrão recomendado para classe média |
| > 20% | 🟢 Excelente | Construção acelerada de patrimônio |

**Por que 15% é o padrão?**
- Permite construir reserva de emergência (6 meses) em ~3 anos
- Balanceamento entre qualidade de vida e segurança financeira
- Taxa viável para a maioria das rendas médias

---

### 4️⃣ Economia Comportamental (Behavioral Economics)

**Origem:**
- Daniel Kahneman (Prêmio Nobel)
- Richard Thaler (Nudge Theory)
- Aplicado em: apps financeiros, programas de poupança

**Princípios aplicados:**

#### A) Feedback Não Punitivo
❌ "Você gastou demais, está errado!"  
✅ "Reduzindo R$ 300, você atinge a meta de poupança."

**Por que funciona:**
- Mensagens punitivas geram **abandono**
- Feedback acionável gera **adesão**

#### B) Frases Acionáveis
❌ "Seu saldo está baixo."  
✅ "Evite novos gastos e crie buffer mínimo de R$ 500."

**Por que funciona:**
- Diz **o que fazer**, não só o problema
- Reduz ansiedade e aumenta controle percebido

#### C) Ajuste Progressivo (APC - Método Próprio)
Se a meta de 15% não é viável:
```typescript
Poupança realista = max(0, saldo × 0.5)
```

**Exemplo:**
- Saldo previsto: R$ 200
- Meta de 15%: R$ 630 (inviável, causaria déficit)
- Poupança ajustada: R$ 100 (50% do saldo)

**Por que funciona:**
- **Guarda menos, mas guarda**
- Cria hábito (fundamento da economia comportamental)
- Evita desistência por meta impossível

---

## 🔄 MÉTODO: AJUSTE PROGRESSIVO DE CONSUMO (APC)

### Etapa 1: Diagnóstico
O sistema calcula:
- Quanto você **vai ter** (previsão)
- Quanto você **deveria guardar** (meta saudável)
- Quanto **realmente consegue guardar** (ajustado)

### Etapa 2: Análise de Viabilidade
```typescript
Saldo previsto: R$ 1.100
Poupança sugerida (15%): R$ 630
Saldo após poupar: R$ 470 ✅ (viável)
```

### Etapa 3: Ajuste Realista (se necessário)
```typescript
Saldo previsto: R$ 200
Poupança sugerida (15%): R$ 630
Saldo após poupar: -R$ 430 ❌ (inviável)

→ Poupança ajustada: R$ 100 (50% do saldo)
→ Mensagem: "Comece com R$ 100. Corte gastos aos poucos."
```

### Etapa 4: Regra de Ouro
> **NUNCA deixe o saldo final zerar.**

Mesmo que a poupança seja pequena, sempre sobra algo para imprevistos.

---

## 📈 NÍVEIS DE RISCO (RISK ASSESSMENT)

### Cálculo do Risco
Baseado em 2 fatores:
1. **Saldo/Renda ratio** (quanto sobra percentualmente)
2. **Tendência de gastos** (gastos estão crescendo?)

### Classificação

| Risco | Condição | Interpretação |
|-------|----------|---------------|
| 🔴 Alto | Saldo < 0 OU < 5% da renda | Déficit iminente, ação urgente |
| 🟡 Médio | Saldo < 10% da renda OU gastos crescendo | Atenção necessária |
| 🟢 Baixo | Saldo > 10% da renda | Situação saudável |

**Exemplo:**
```typescript
Renda prevista: R$ 4.200
Saldo previsto: R$ 300
Ratio: 300/4200 = 7.1% → Risco Médio 🟡
```

---

## 💡 GERAÇÃO DE INSIGHTS

### Cenários e Mensagens

#### 🟢 Cenário 1: Consegue guardar tranquilamente
```
Condição: balanceAfterSavings > R$ 500
Mensagem: "Você consegue guardar R$ 630 (15%) sem apertar."
Sugestão: "Considere aumentar para 20% e construir reserva de emergência."
```

#### 🟡 Cenário 2: Consegue guardar, mas fica apertado
```
Condição: balanceAfterSavings >= 0 e <= R$ 500
Mensagem: "Guardar 15% é possível, mas deixa pouca margem (R$ 150)."
Sugestão: "Tente reduzir R$ 200-300 em gastos variáveis para ter mais folga."
```

#### 🔴 Cenário 3: Não comporta a meta
```
Condição: balanceAfterSavings < 0
Mensagem: "Guardar 15% colocaria você no vermelho."
Sugestão: "Comece com R$ 100 (50% do saldo). Corte gastos aos poucos."
```

#### 🔴 Cenário 4: Vai entrar no vermelho
```
Condição: predictedBalance < 0
Mensagem: "Próximo mês entra no vermelho (falta R$ 430)."
Sugestão: "Urgente: identifique onde cortar despesas. Priorize essenciais."
```

---

## 🎓 VALIDAÇÃO CIENTÍFICA

### Estudos que fundamentam o modelo:

1. **Thaler, R. & Benartzi, S. (2004)**  
   "Save More Tomorrow: Using Behavioral Economics to Increase Employee Saving"  
   → Base do Pay Yourself First

2. **Kahneman, D. & Tversky, A. (1979)**  
   "Prospect Theory: An Analysis of Decision under Risk"  
   → Feedback não punitivo aumenta adesão

3. **OECD Household Savings Data (2020-2024)**  
   → Taxas de 10-20% são consideradas saudáveis

4. **Dave, C., Eckel, C. C., Johnson, C. A., & Rojas, C. (2010)**  
   "Eliciting risk preferences: When is simple better?"  
   → Mensagens simples > complexas

---

## 🚀 DIFERENCIAIS DO PRODUTO

### O que NÃO fazemos (e por quê):
❌ **Não usamos IA generativa** - Previsões devem ser explicáveis  
❌ **Não prevemos previsão** - Erro acumulado distorce projeções  
❌ **Não damos conselhos genéricos** - Tudo é baseado nos seus dados  
❌ **Não punimos o usuário** - Economia comportamental prova que isso falha  

### O que fazemos (e por quê):
✅ **Média ponderada** - Método estatístico validado  
✅ **Poupança forçada** - Princípio de finanças pessoais comprovado  
✅ **Ajuste progressivo** - Cria hábito mesmo quando meta é inviável  
✅ **Feedback acionável** - Diz o que fazer, não só o problema  

---

## 📊 MÉTRICAS DE SUCESSO

Para validar se o método funciona, medimos:

1. **Taxa de adesão** (usuários que voltam após 30 dias)
2. **Poupança média acumulada** (após 6 meses de uso)
3. **Redução de stress financeiro** (survey NPS)
4. **Precisão das previsões** (MAE - Mean Absolute Error)

**Meta:**
- 60%+ de retenção em 6 meses
- 80%+ de precisão nas previsões (±10%)
- NPS > 50

---

## 🔮 ROADMAP DE EVOLUÇÃO

### Fase 2: Detecção de Padrões
- Identificar **curva de consumo** (gastos crescendo?)
- Alertar **risco financeiro em X meses**
- Detectar **despesas anormais**

### Fase 3: Metas Automáticas
- Calcular **quanto precisa poupar por mês** para atingir objetivo
- Simular **cenários "E se?"** (reduzir 20% de gastos → quanto sobra?)
- **Decomposição de despesas** (fixas vs variáveis)

### Fase 4: Inteligência Avançada
- Classificar despesas por categoria automaticamente
- Comparar com benchmark do seu perfil (renda similar)
- Gerar **plano de ação personalizado**

### Fase 5: B2B
- Benefício corporativo (empresa oferece para funcionários)
- Dashboard agregado (RH vê saúde financeira do time)
- Programas de educação financeira corporativa

---

## 🎯 CONCLUSÃO

SaldoFuturo é **fintech-grade** porque:

1. ✅ Usa métodos econômicos validados
2. ✅ Aplica economia comportamental
3. ✅ É explicável (não é caixa-preta)
4. ✅ Educa o usuário sem parecer aula
5. ✅ Cria hábito financeiro saudável

**Não é só um app que mostra números.**  
É um **sistema de decisão financeira** baseado em ciência, não em achismo.

---

## 📚 REFERÊNCIAS

1. Thaler, R. H., & Benartzi, S. (2004). Save more tomorrow: Using behavioral economics to increase employee saving. Journal of Political Economy, 112(S1), S164-S187.

2. Kahneman, D., & Tversky, A. (1979). Prospect theory: An analysis of decision under risk. Econometrica, 47(2), 263-291.

3. OECD (2024). Household savings (indicator). doi: 10.1787/cfc6f499-en

4. Bach, D. (2004). The Automatic Millionaire: A Powerful One-Step Plan to Live and Finish Rich. Broadway Books.

5. Clason, G. S. (1926). The Richest Man in Babylon. Penguin Books.

---

**Última atualização:** Janeiro 2026  
**Versão do modelo:** 1.0 (APC - Ajuste Progressivo de Consumo)
