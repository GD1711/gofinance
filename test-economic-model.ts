/**
 * TESTE: Validação do Modelo Econômico
 * 
 * Execute: npx tsx test-economic-model.ts
 */

import { predictNextMonth, type MonthFinancialData } from './src/domain/services/prediction.service';

console.log('🧪 TESTE DO MODELO ECONÔMICO\n');
console.log('='.repeat(60));

// Cenário 1: Situação saudável (consegue poupar)
console.log('\n📊 CENÁRIO 1: Situação Saudável');
console.log('-'.repeat(60));
const scenario1: MonthFinancialData[] = [
  { month: 'JAN', monthNumber: 0, income: 4200, expenses: 3100, isReal: true },
  { month: 'FEV', monthNumber: 1, income: 4200, expenses: 3000, isReal: true },
  { month: 'MAR', monthNumber: 2, income: 4200, expenses: 2900, isReal: true },
];

const result1 = predictNextMonth(scenario1, 0.15);
console.log('\n📈 Dados de Entrada:');
scenario1.forEach(m => {
  console.log(`  ${m.month}: R$ ${m.income} - R$ ${m.expenses} = R$ ${m.income - m.expenses}`);
});

console.log('\n🔮 Previsão para Abril:');
console.log(`  Entradas: R$ ${result1.predictedIncome}`);
console.log(`  Saídas: R$ ${result1.predictedExpenses}`);
console.log(`  Saldo: R$ ${result1.predictedBalance}`);
console.log(`  Confiança: ${result1.confidence}%`);

console.log('\n💰 Análise Econômica:');
console.log(`  Poupança sugerida (15%): R$ ${result1.suggestedSavings}`);
console.log(`  Saldo após poupar: R$ ${result1.balanceAfterSavings}`);
console.log(`  Poupança realista: R$ ${result1.realisticSavings}`);
console.log(`  Consegue poupar meta? ${result1.insights.canSaveTarget ? '✅ SIM' : '❌ NÃO'}`);

console.log('\n💡 Insight:');
console.log(`  Risco: ${result1.insights.riskLevel.toUpperCase()}`);
console.log(`  ${result1.insights.message}`);
if (result1.insights.suggestion) {
  console.log(`  → ${result1.insights.suggestion}`);
}

// Cenário 2: Situação crítica (não consegue poupar)
console.log('\n\n📊 CENÁRIO 2: Situação Crítica');
console.log('-'.repeat(60));
const scenario2: MonthFinancialData[] = [
  { month: 'JAN', monthNumber: 0, income: 4200, expenses: 3900, isReal: true },
  { month: 'FEV', monthNumber: 1, income: 4200, expenses: 4000, isReal: true },
  { month: 'MAR', monthNumber: 2, income: 4200, expenses: 4100, isReal: true },
];

const result2 = predictNextMonth(scenario2, 0.15);
console.log('\n📈 Dados de Entrada:');
scenario2.forEach(m => {
  console.log(`  ${m.month}: R$ ${m.income} - R$ ${m.expenses} = R$ ${m.income - m.expenses}`);
});

console.log('\n🔮 Previsão para Abril:');
console.log(`  Entradas: R$ ${result2.predictedIncome}`);
console.log(`  Saídas: R$ ${result2.predictedExpenses}`);
console.log(`  Saldo: R$ ${result2.predictedBalance}`);
console.log(`  Confiança: ${result2.confidence}%`);

console.log('\n💰 Análise Econômica:');
console.log(`  Poupança sugerida (15%): R$ ${result2.suggestedSavings}`);
console.log(`  Saldo após poupar: R$ ${result2.balanceAfterSavings}`);
console.log(`  Poupança realista: R$ ${result2.realisticSavings}`);
console.log(`  Consegue poupar meta? ${result2.insights.canSaveTarget ? '✅ SIM' : '❌ NÃO'}`);

console.log('\n💡 Insight:');
console.log(`  Risco: ${result2.insights.riskLevel.toUpperCase()}`);
console.log(`  ${result2.insights.message}`);
if (result2.insights.suggestion) {
  console.log(`  → ${result2.insights.suggestion}`);
}

// Cenário 3: Entrando no vermelho
console.log('\n\n📊 CENÁRIO 3: Entrando no Vermelho');
console.log('-'.repeat(60));
const scenario3: MonthFinancialData[] = [
  { month: 'JAN', monthNumber: 0, income: 4200, expenses: 4100, isReal: true },
  { month: 'FEV', monthNumber: 1, income: 4200, expenses: 4300, isReal: true },
  { month: 'MAR', monthNumber: 2, income: 4200, expenses: 4500, isReal: true },
];

const result3 = predictNextMonth(scenario3, 0.15);
console.log('\n📈 Dados de Entrada:');
scenario3.forEach(m => {
  const balance = m.income - m.expenses;
  console.log(`  ${m.month}: R$ ${m.income} - R$ ${m.expenses} = R$ ${balance} ${balance < 0 ? '🔴' : ''}`);
});

console.log('\n🔮 Previsão para Abril:');
console.log(`  Entradas: R$ ${result3.predictedIncome}`);
console.log(`  Saídas: R$ ${result3.predictedExpenses}`);
console.log(`  Saldo: R$ ${result3.predictedBalance} ${result3.predictedBalance < 0 ? '🔴' : ''}`);
console.log(`  Confiança: ${result3.confidence}%`);

console.log('\n💰 Análise Econômica:');
console.log(`  Poupança sugerida (15%): R$ ${result3.suggestedSavings}`);
console.log(`  Saldo após poupar: R$ ${result3.balanceAfterSavings}`);
console.log(`  Poupança realista: R$ ${result3.realisticSavings}`);
console.log(`  Consegue poupar meta? ${result3.insights.canSaveTarget ? '✅ SIM' : '❌ NÃO'}`);

console.log('\n💡 Insight:');
console.log(`  Risco: ${result3.insights.riskLevel.toUpperCase()}`);
console.log(`  ${result3.insights.message}`);
if (result3.insights.suggestion) {
  console.log(`  → ${result3.insights.suggestion}`);
}

console.log('\n' + '='.repeat(60));
console.log('✅ TESTE CONCLUÍDO\n');
