"""
Validation Module - Validação de Protocolos

Garante que metas sejam alcançáveis. Sem ilusões.
"""

from typing import Dict, Any


class ProtocolValidator:
    """
    Valida protocolos financeiros
    
    Realismo antes de otimismo.
    """

    @staticmethod
    def validate_feasibility(
        target: float,
        periods: int,
        monthly_income: float,
        max_commitment_rate: float = 0.3
    ) -> Dict[str, Any]:
        """
        Valida se um protocolo é viável
        
        Args:
            target: Meta financeira
            periods: Períodos disponíveis
            monthly_income: Renda mensal
            max_commitment_rate: Taxa máxima recomendada (30% padrão)
        
        Returns:
            Análise de viabilidade
        """
        if periods <= 0 or monthly_income <= 0:
            return {
                'feasible': False,
                'reason': 'Parâmetros inválidos',
                'recommendation': 'Revise os valores informados'
            }

        monthly_required = target / periods
        commitment_rate = monthly_required / monthly_income

        feasible = commitment_rate <= max_commitment_rate

        if feasible:
            if commitment_rate < 0.1:
                tier = 'confortável'
                recommendation = 'Protocolo suave. Considere aumentar para acelerar resultados.'
            elif commitment_rate < 0.2:
                tier = 'equilibrado'
                recommendation = 'Protocolo viável. Mantém margem de segurança adequada.'
            else:
                tier = 'desafiador'
                recommendation = 'Protocolo exigente. Requer disciplina consistente.'
        else:
            # Calcula ajuste necessário
            suggested_periods = int((target / (monthly_income * max_commitment_rate))) + 1
            tier = 'inviável'
            recommendation = f'Estenda para {suggested_periods} períodos ou reduza a meta.'

        return {
            'feasible': feasible,
            'tier': tier,
            'monthly_required': round(monthly_required, 2),
            'commitment_rate': round(commitment_rate * 100, 1),
            'max_recommended_rate': round(max_commitment_rate * 100, 1),
            'recommendation': recommendation,
            'suggested_periods': suggested_periods if not feasible else periods
        }

    @staticmethod
    def validate_consistency(
        expected_values: list,
        actual_values: list,
        tolerance: float = 0.2
    ) -> Dict[str, Any]:
        """
        Valida consistência comportamental
        
        Args:
            expected_values: Valores esperados
            actual_values: Valores reais
            tolerance: Tolerância de desvio (20% padrão)
        
        Returns:
            Análise de consistência
        """
        if not expected_values or not actual_values:
            return {
                'consistent': False,
                'deviation': 1.0,
                'status': 'sem_dados'
            }

        periods = min(len(expected_values), len(actual_values))
        
        deviations = []
        for i in range(periods):
            expected = expected_values[i]
            actual = actual_values[i] if i < len(actual_values) else 0
            
            if expected > 0:
                deviation = abs(expected - actual) / expected
                deviations.append(deviation)

        if not deviations:
            return {
                'consistent': False,
                'deviation': 1.0,
                'status': 'invalido'
            }

        avg_deviation = sum(deviations) / len(deviations)
        consistent = avg_deviation <= tolerance

        if consistent:
            if avg_deviation < 0.1:
                status = 'excelente'
            elif avg_deviation < 0.15:
                status = 'bom'
            else:
                status = 'aceitável'
        else:
            status = 'inconsistente'

        return {
            'consistent': consistent,
            'deviation': round(avg_deviation, 2),
            'status': status,
            'periods_evaluated': periods
        }

    @staticmethod
    def calculate_sustainability_score(
        current_streak: int,
        total_periods: int,
        missed_periods: int
    ) -> Dict[str, Any]:
        """
        Calcula score de sustentabilidade
        
        Mede capacidade de manter protocolo longo prazo
        
        Args:
            current_streak: Sequência atual sem falhas
            total_periods: Total de períodos
            missed_periods: Períodos não cumpridos
        
        Returns:
            Score de sustentabilidade
        """
        if total_periods == 0:
            return {
                'score': 0.0,
                'level': 'indefinido',
                'sustainable': False
            }

        completion_rate = (total_periods - missed_periods) / total_periods
        streak_bonus = min(current_streak / total_periods, 0.3)  # Máx 30% de bônus
        
        score = (completion_rate * 0.7) + streak_bonus

        if score >= 0.9:
            level = 'consolidado'
            sustainable = True
        elif score >= 0.7:
            level = 'estável'
            sustainable = True
        elif score >= 0.5:
            level = 'em_formação'
            sustainable = False
        else:
            level = 'instável'
            sustainable = False

        return {
            'score': round(score, 2),
            'level': level,
            'sustainable': sustainable,
            'completion_rate': round(completion_rate, 2),
            'current_streak': current_streak
        }
