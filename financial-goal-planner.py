"""
Sistema de Planejamento Financeiro Educacional

Base matemática: progressão aritmética, metas por período, constância
Foco: educação financeira acessível sem linguagem técnica visível

Não faz previsões especulativas. Apenas cálculos determinísticos.
"""

from typing import Dict, List, Tuple
from dataclasses import dataclass


@dataclass
class LinearPlan:
    """Plano linear - valor fixo por período"""
    type: str
    months: int
    monthly_average: float
    target: float


@dataclass
class ProgressiveChallenge:
    """Desafio progressivo baseado em progressão aritmética"""
    type: str
    values: List[float]
    total_accumulated: float
    goal_reached: bool
    start_value: float
    increment: float
    max_increment: float


class FinancialGoalPlanner:
    """
    Planejador de metas financeiras educacional
    
    Usa matemática simples e invisível:
    - Progressão aritmética: Soma = n/2 × (primeiro + último)
    - Taxa de constância
    - Margem de segurança
    """

    def __init__(self, target_amount: float, months: int):
        """
        Args:
            target_amount: Valor alvo total
            months: Duração em meses
        """
        self.target_amount = target_amount
        self.months = months

    def linear_plan(self) -> LinearPlan:
        """
        Cria um plano linear simples
        Divide o valor alvo igualmente pelos meses
        """
        monthly_value = self.target_amount / self.months
        
        return LinearPlan(
            type="linear",
            months=self.months,
            monthly_average=round(monthly_value, 2),
            target=self.target_amount
        )

    def progressive_challenge(
        self, 
        start: float = 1, 
        increment: float = 1, 
        max_increment: float = 500
    ) -> ProgressiveChallenge:
        """
        Cria um desafio progressivo baseado em progressão aritmética
        
        Fórmula: Soma = n/2 × (primeiro + último)
        
        Args:
            start: Valor inicial (padrão: 1)
            increment: Incremento por período (padrão: 1)
            max_increment: Valor máximo permitido (padrão: 500)
        
        Returns:
            Desafio progressivo com valores por período
        """
        values = []
        current = start

        for _ in range(self.months):
            values.append(current)
            current = min(current + increment, max_increment)

        total = sum(values)
        goal_reached = total >= self.target_amount

        return ProgressiveChallenge(
            type="progressive",
            values=values,
            total_accumulated=round(total, 2),
            goal_reached=goal_reached,
            start_value=start,
            increment=increment,
            max_increment=max_increment
        )

    def optimized_progressive_challenge(self) -> ProgressiveChallenge:
        """
        Calcula um desafio progressivo ajustado para atingir exatamente a meta
        
        Usa a fórmula da progressão aritmética otimizada:
        S = n/2 × (2a + (n-1)d)
        
        Onde:
        S = soma total
        n = número de termos
        a = primeiro termo
        d = diferença comum
        
        Resolvendo para d: d = (2S/n - 2a) / (n-1)
        """
        start_value = 1
        
        # Calcula o incremento ideal usando progressão aritmética
        optimal_increment = max(
            1,
            round((2 * self.target_amount / self.months - 2 * start_value) / (self.months - 1))
        )

        values = []
        current = start_value

        for _ in range(self.months):
            values.append(current)
            current = current + optimal_increment

        total_accumulated = sum(values)
        goal_reached = total_accumulated >= self.target_amount

        return ProgressiveChallenge(
            type="progressive",
            values=values,
            total_accumulated=round(total_accumulated, 2),
            goal_reached=goal_reached,
            start_value=start_value,
            increment=optimal_increment,
            max_increment=values[-1]
        )

    def calculate_consistency_rate(
        self,
        expected_values: List[float],
        actual_values: List[float]
    ) -> float:
        """
        Calcula taxa de constância
        Mede o quão consistente o usuário foi com o plano
        
        Retorna valor entre 0 e 1
        
        Args:
            expected_values: Valores esperados por período
            actual_values: Valores reais atingidos
        
        Returns:
            Taxa de constância (0 = inconsistente, 1 = perfeito)
        """
        if not expected_values:
            return 0.0

        total_deviation = 0
        total_expected = 0

        for expected, actual in zip(expected_values, actual_values):
            total_deviation += abs(expected - actual)
            total_expected += expected

        if total_expected == 0:
            return 0.0

        deviation_rate = total_deviation / total_expected
        consistency_rate = max(0, 1 - deviation_rate)

        return round(consistency_rate, 2)

    @staticmethod
    def calculate_safety_margin(target_amount: float, margin_percent: float = 20) -> float:
        """
        Calcula margem de segurança
        Quanto % acima da meta o usuário deveria ter
        
        Args:
            target_amount: Valor alvo
            margin_percent: Margem de segurança em % (padrão: 20%)
        
        Returns:
            Valor com margem de segurança aplicada
        """
        return target_amount * (1 + margin_percent / 100)

    def analyze_realistic_goal(
        self,
        monthly_income: float,
        max_savings_rate: float = 0.3
    ) -> Dict[str, any]:
        """
        Analisa se a meta é realista baseada na renda
        
        Args:
            monthly_income: Renda mensal
            max_savings_rate: Taxa máxima de poupança recomendada (padrão: 30%)
        
        Returns:
            Análise com recomendações
        """
        monthly_required = self.target_amount / self.months
        percent_of_income = (monthly_required / monthly_income) * 100
        realistic = percent_of_income <= max_savings_rate * 100

        recommendation = ""
        
        if not realistic:
            suggested_months = int(self.target_amount / (monthly_income * max_savings_rate)) + 1
            recommendation = f"Sugerimos estender para {suggested_months} meses para manter sustentabilidade."
        elif percent_of_income < 10:
            recommendation = "Meta confortável. Considere aumentar para acelerar resultados."
        else:
            recommendation = "Meta equilibrada. Possível com disciplina."

        return {
            "realistic": realistic,
            "monthly_required": round(monthly_required, 2),
            "percent_of_income": round(percent_of_income, 2),
            "recommendation": recommendation
        }


# ==========================================
# EXEMPLOS DE USO
# ==========================================

def example_basic_usage():
    """Exemplo básico de uso"""
    print("=" * 60)
    print("EXEMPLO 1: Plano Linear vs Desafio Progressivo")
    print("=" * 60)
    print()
    
    # Meta: R$ 10.000 em 9 meses
    planner = FinancialGoalPlanner(target_amount=10000, months=9)

    # Plano linear
    linear = planner.linear_plan()
    print(f"📊 PLANO LINEAR")
    print(f"   Valor mensal: R$ {linear.monthly_average:.2f}")
    print(f"   Duração: {linear.months} meses")
    print(f"   Meta: R$ {linear.target:.2f}")
    print()

    # Desafio progressivo otimizado
    challenge = planner.optimized_progressive_challenge()
    print(f"🚀 DESAFIO PROGRESSIVO")
    print(f"   Início: R$ {challenge.start_value:.2f}")
    print(f"   Incremento: R$ {challenge.increment:.2f}")
    print(f"   Total acumulado: R$ {challenge.total_accumulated:.2f}")
    print(f"   Meta alcançada: {'✓ Sim' if challenge.goal_reached else '✗ Não'}")
    print()
    print(f"   Valores por mês:")
    for i, value in enumerate(challenge.values, 1):
        print(f"      Mês {i}: R$ {value:.2f}")
    print()


def example_consistency_analysis():
    """Exemplo de análise de constância"""
    print("=" * 60)
    print("EXEMPLO 2: Análise de Constância")
    print("=" * 60)
    print()
    
    planner = FinancialGoalPlanner(target_amount=5000, months=6)
    challenge = planner.optimized_progressive_challenge()
    
    # Valores esperados
    expected = challenge.values
    
    # Simulação: usuário foi 90% consistente
    actual = [v * 0.9 for v in expected]
    
    consistency = planner.calculate_consistency_rate(expected, actual)
    
    print(f"📈 ANÁLISE DE CONSTÂNCIA")
    print(f"   Taxa de constância: {consistency * 100:.0f}%")
    print()
    print(f"   Comparação:")
    for i, (exp, act) in enumerate(zip(expected, actual), 1):
        diff = act - exp
        print(f"      Mês {i}: Esperado R$ {exp:.2f} | Real R$ {act:.2f} | Diferença: R$ {diff:.2f}")
    print()


def example_realistic_goal_analysis():
    """Exemplo de análise de meta realista"""
    print("=" * 60)
    print("EXEMPLO 3: Meta Realista?")
    print("=" * 60)
    print()
    
    planner = FinancialGoalPlanner(target_amount=8000, months=6)
    
    # Renda mensal: R$ 3.000
    analysis = planner.analyze_realistic_goal(monthly_income=3000)
    
    print(f"💰 ANÁLISE DE VIABILIDADE")
    print(f"   Meta: R$ {planner.target_amount:.2f} em {planner.months} meses")
    print(f"   Renda mensal: R$ 3.000,00")
    print(f"   Valor mensal necessário: R$ {analysis['monthly_required']:.2f}")
    print(f"   % da renda: {analysis['percent_of_income']:.1f}%")
    print(f"   Realista: {'✓ Sim' if analysis['realistic'] else '✗ Não'}")
    print(f"   Recomendação: {analysis['recommendation']}")
    print()


def example_safety_margin():
    """Exemplo de margem de segurança"""
    print("=" * 60)
    print("EXEMPLO 4: Margem de Segurança")
    print("=" * 60)
    print()
    
    target = 10000
    margin_20 = FinancialGoalPlanner.calculate_safety_margin(target, 20)
    margin_30 = FinancialGoalPlanner.calculate_safety_margin(target, 30)
    
    print(f"🛡️  MARGEM DE SEGURANÇA")
    print(f"   Meta base: R$ {target:.2f}")
    print(f"   Com 20% de margem: R$ {margin_20:.2f}")
    print(f"   Com 30% de margem: R$ {margin_30:.2f}")
    print()


if __name__ == "__main__":
    # Executa todos os exemplos
    example_basic_usage()
    example_consistency_analysis()
    example_realistic_goal_analysis()
    example_safety_margin()
    
    print("=" * 60)
    print("✨ Sistema pronto para integração com UI")
    print("=" * 60)
