"""
🧮 Sistema de Análise Financeira Inteligente
Calcula estatísticas e previsões com base nos inputs do usuário
"""

from typing import Dict, List, Tuple
from dataclasses import dataclass
from datetime import datetime
import json


@dataclass
class Transaction:
    """Representa uma transação financeira"""
    id: str
    date: str
    category: str
    amount: float
    type: str  # 'income' ou 'expense'
    description: str = ""


@dataclass
class CategorySummary:
    """Resumo por categoria"""
    category: str
    total: float
    percentage: float
    transactions_count: int


@dataclass
class FinancialOverview:
    """Visão geral financeira"""
    total_income: float
    total_expenses: float
    balance: float
    categories: List[CategorySummary]
    highest_category: CategorySummary
    status: str  # 'excellent', 'good', 'warning', 'critical'


class FinancialAnalyzer:
    """Motor de análise financeira"""
    
    def __init__(self):
        self.transactions: List[Transaction] = []
    
    def add_transaction(self, transaction: Transaction):
        """Adiciona uma transação"""
        self.transactions.append(transaction)
    
    def calculate_totals(self) -> Tuple[float, float, float]:
        """Calcula receitas, gastos e saldo total"""
        income = sum(t.amount for t in self.transactions if t.type == 'income')
        expenses = sum(t.amount for t in self.transactions if t.type == 'expense')
        balance = income - expenses
        return income, expenses, balance
    
    def analyze_by_category(self) -> List[CategorySummary]:
        """Agrupa e analisa gastos por categoria"""
        # Filtra apenas despesas
        expenses = [t for t in self.transactions if t.type == 'expense']
        
        if not expenses:
            return []
        
        total_expenses = sum(t.amount for t in expenses)
        
        # Agrupa por categoria
        categories_dict: Dict[str, List[float]] = {}
        for transaction in expenses:
            if transaction.category not in categories_dict:
                categories_dict[transaction.category] = []
            categories_dict[transaction.category].append(transaction.amount)
        
        # Cria resumos
        summaries = []
        for category, amounts in categories_dict.items():
            total = sum(amounts)
            percentage = (total / total_expenses * 100) if total_expenses > 0 else 0
            
            summaries.append(CategorySummary(
                category=category,
                total=total,
                percentage=percentage,
                transactions_count=len(amounts)
            ))
        
        # Ordena por valor (maior primeiro)
        summaries.sort(key=lambda x: x.total, reverse=True)
        return summaries
    
    def get_financial_status(self, balance: float, income: float) -> str:
        """Determina o status financeiro"""
        if income == 0:
            return 'warning'
        
        savings_rate = (balance / income * 100) if income > 0 else 0
        
        if savings_rate >= 30:
            return 'excellent'
        elif savings_rate >= 20:
            return 'good'
        elif savings_rate >= 10:
            return 'warning'
        else:
            return 'critical'
    
    def get_overview(self) -> FinancialOverview:
        """Gera visão geral completa"""
        income, expenses, balance = self.calculate_totals()
        categories = self.analyze_by_category()
        
        highest_category = categories[0] if categories else CategorySummary(
            category="Nenhum",
            total=0,
            percentage=0,
            transactions_count=0
        )
        
        status = self.get_financial_status(balance, income)
        
        return FinancialOverview(
            total_income=income,
            total_expenses=expenses,
            balance=balance,
            categories=categories,
            highest_category=highest_category,
            status=status
        )
    
    def generate_insights(self) -> List[str]:
        """Gera insights automáticos"""
        overview = self.get_overview()
        insights = []
        
        # Insight sobre maior categoria
        if overview.highest_category.total > 0:
            insights.append(
                f"🔍 Maior gasto atual: {overview.highest_category.category} "
                f"({overview.highest_category.percentage:.1f}% do total)"
            )
        
        # Insight sobre taxa de poupança
        if overview.total_income > 0:
            savings_rate = (overview.balance / overview.total_income * 100)
            if savings_rate < 10:
                insights.append("⚠️ Taxa de poupança abaixo de 10%. Considere reduzir gastos.")
            elif savings_rate >= 30:
                insights.append("✨ Excelente! Você está poupando mais de 30% da renda.")
        
        # Insight sobre categorias com alerta
        for category in overview.categories:
            if category.percentage > 35:
                insights.append(
                    f"⚠️ {category.category} representa um gasto alto ({category.percentage:.1f}%)"
                )
        
        return insights
    
    def predict_future_balance(self, months: int = 3) -> Dict[str, float]:
        """Prevê saldo futuro baseado no padrão atual"""
        income, expenses, balance = self.calculate_totals()
        
        monthly_savings = balance
        predictions = {}
        
        for month in range(1, months + 1):
            future_balance = balance + (monthly_savings * month)
            predictions[f"month_{month}"] = future_balance
        
        return predictions
    
    def export_to_json(self) -> str:
        """Exporta análise para JSON"""
        overview = self.get_overview()
        insights = self.generate_insights()
        predictions = self.predict_future_balance()
        
        data = {
            "overview": {
                "income": overview.total_income,
                "expenses": overview.total_expenses,
                "balance": overview.balance,
                "status": overview.status
            },
            "categories": [
                {
                    "name": cat.category,
                    "total": cat.total,
                    "percentage": round(cat.percentage, 2),
                    "count": cat.transactions_count
                }
                for cat in overview.categories
            ],
            "insights": insights,
            "predictions": predictions
        }
        
        return json.dumps(data, ensure_ascii=False, indent=2)


# 📊 Exemplo de uso
def example_usage():
    """Demonstração do sistema"""
    analyzer = FinancialAnalyzer()
    
    # Adiciona transações de exemplo
    transactions = [
        Transaction("1", "2026-01-05", "Salário", 3500.00, "income"),
        Transaction("2", "2026-01-10", "Aluguel", 1200.00, "expense"),
        Transaction("3", "2026-01-12", "Alimentação", 620.50, "expense"),
        Transaction("4", "2026-01-15", "Transporte", 280.00, "expense"),
        Transaction("5", "2026-01-18", "Assinaturas", 147.30, "expense"),
        Transaction("6", "2026-01-20", "Outros", 100.00, "expense"),
    ]
    
    for transaction in transactions:
        analyzer.add_transaction(transaction)
    
    # Gera análise
    overview = analyzer.get_overview()
    
    print("=" * 60)
    print("📊 VISÃO GERAL FINANCEIRA")
    print("=" * 60)
    print(f"💵 Receitas:  R$ {overview.total_income:,.2f}")
    print(f"💸 Gastos:    R$ {overview.total_expenses:,.2f}")
    print(f"💰 Saldo:     R$ {overview.balance:,.2f}")
    print()
    
    print("📌 DETALHAMENTO DOS GASTOS")
    print("-" * 60)
    for category in overview.categories:
        dots = "." * (20 - len(category.category))
        print(f"• {category.category} {dots} R$ {category.total:>10,.2f}")
    print()
    
    print("🧠 INSIGHTS")
    print("-" * 60)
    insights = analyzer.generate_insights()
    for insight in insights:
        print(f"  {insight}")
    print()
    
    print("🔮 PREVISÕES (3 MESES)")
    print("-" * 60)
    predictions = analyzer.predict_future_balance(3)
    for month, balance in predictions.items():
        month_num = month.split("_")[1]
        print(f"  Mês {month_num}: R$ {balance:,.2f}")
    print()
    
    # Exporta JSON
    print("📄 JSON EXPORT")
    print("-" * 60)
    print(analyzer.export_to_json())


if __name__ == "__main__":
    example_usage()
