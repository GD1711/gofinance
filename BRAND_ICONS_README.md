# 🎨 Sistema de Ícones de Marcas

## 📦 Biblioteca Utilizada: Simple Icons

A aplicação utiliza a biblioteca **Simple Icons**, que é o padrão da indústria para logos de marcas, com mais de 3000 ícones vetoriais de alta qualidade.

## ✨ Funcionalidades Implementadas

### 1. Modal de Adicionar Transações
Modal centralizado com 4 opções principais:

- **💰 Receita/Entrada**: Salário, freelance, presente, venda
- **💸 Despesa/Saída**: Com busca inteligente de marcas
- **📊 Investimento**: Tipos de investimento e rentabilidade
- **🚨 Reserva de Emergência**: Depósito na reserva

### 2. Busca Inteligente de Marcas

Ao digitar no campo de descrição (em despesas), o sistema sugere automaticamente marcas com seus ícones:

#### Marcas Disponíveis (50+ marcas):

**Streaming & Entretenimento:**
- Netflix, Spotify, Disney+, Prime Video, HBO Max
- YouTube Premium, Apple TV+, Crunchyroll

**Transporte:**
- Uber, Lyft, 99

**Alimentação:**
- iFood, Rappi, Uber Eats
- McDonald's, Starbucks, Subway, Burger King

**Compras:**
- Amazon, Mercado Livre, Magazine Luiza
- Americanas, Shopee, AliExpress

**Tecnologia:**
- Apple, Google, Microsoft, Samsung
- PlayStation, Xbox, Nintendo, Steam

**Telecomunicações:**
- Vivo, TIM, Claro, Oi

**Saúde & Fitness:**
- Gympass, Smart Fit

**Educação:**
- Udemy, Coursera, Duolingo

**Serviços:**
- Dropbox, Notion, Canva, Adobe

### 3. Categorização Automática

Quando você seleciona uma marca sugerida:
- ✅ O ícone é exibido automaticamente
- ✅ A categoria é preenchida automaticamente
- ✅ A cor da categoria é aplicada

### 4. Sistema de Recorrência

Marque uma transação como recorrente e configure:
- **Semanal**: Toda semana
- **Quinzenal**: A cada 15 dias
- **Mensal**: Todo mês
- **Anual**: Uma vez por ano

**Recursos:**
- 📅 Dedução automática nos próximos períodos
- ⏰ Aparece no calendário futuro
- 🔔 Notificação 1 dia antes do débito

## 🔧 Componentes Criados

### 1. `BrandIcon.tsx`
Componente reutilizável para renderizar ícones do Simple Icons.

**Uso:**
```tsx
import { BrandIcon } from '@/ui/components/BrandIcon';

<BrandIcon brandName="netflix" size={32} />
<BrandIcon brandName="spotify" size={24} />
```

### 2. `BrandIconsService.ts`
Serviço com métodos utilitários:

```typescript
// Buscar marcas
BrandIconsService.searchBrands('netf') // Retorna: [{ name: 'netflix', displayName: 'Netflix', category: 'Entretenimento' }]

// Obter categoria de uma marca
BrandIconsService.getCategoryForBrand('netflix') // 'Entretenimento'

// Verificar se ícone existe
BrandIconsService.hasIcon('netflix') // true

// Obter todas as marcas
BrandIconsService.getAllBrands()

// Obter marcas por categoria
BrandIconsService.getBrandsByCategory('Entretenimento')
```

### 3. `AddTransactionModal.tsx`
Modal completo com:
- Seleção de tipo de transação (4 cards)
- Formulários específicos para cada tipo
- Busca inteligente com sugestões
- Sistema de recorrência
- Validação de campos

## 🚀 Como Usar

### Adicionar Nova Transação

1. Clique no botão flutuante **+** (canto inferior direito)
2. Selecione o tipo de transação
3. Preencha os campos do formulário
4. Para despesas, comece a digitar no campo "Descrição" e veja as sugestões aparecerem
5. Clique em uma sugestão para usar o ícone e categoria automaticamente
6. Marque como recorrente se necessário
7. Clique em "Adicionar"

### Adicionar Novas Marcas

Para adicionar mais marcas ao sistema, edite o arquivo:
`src/application/services/brand-icons.service.ts`

Adicione no objeto `POPULAR_BRANDS`:

```typescript
const POPULAR_BRANDS: Record<string, { displayName: string; category: string }> = {
  // ... marcas existentes
  novamarca: { displayName: 'Nova Marca', category: 'Categoria' },
};
```

**Nota:** O nome da chave (`novamarca`) deve corresponder ao nome no Simple Icons. Verifique em: https://simpleicons.org/

## 📚 Documentação Adicional

- **Simple Icons**: https://simpleicons.org/
- **NPM Package**: https://www.npmjs.com/package/simple-icons

## ⚠️ Boas Práticas

1. **Não altere cores oficiais** das marcas em uso comercial
2. **Use ícones pequenos** e discretos
3. **Não use como CTA principal** para evitar problemas legais
4. **Sempre verifique** se a marca existe no Simple Icons antes de adicionar

## 🎯 Próximos Passos

- [ ] Integrar com backend para salvar transações
- [ ] Implementar notificações para recorrências
- [ ] Sistema de aprendizado de categorias
- [ ] Cache de ícones para melhor performance
- [ ] Adicionar mais marcas brasileiras
- [ ] Personalização de ícones customizados
