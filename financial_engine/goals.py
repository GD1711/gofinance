"""
Goals Module - Protocolos de Meta

Sistema determinístico. Sem probabilidade. Apenas método.
"""

from typing import Dict, List, Any
from dataclasses import dataclass


@dataclass
class ProtocolResult:
    """Resultado de um protocolo de economia"""
    progression: List[float]
    total: float
    target: float
    status: str  # 'reached' | 'in_progress' | 'incomplete'
    periods: int
    consistency_required: float


class ProgressiveSavingProtocol:
    """
    Protocolo Progressivo de Economia
    
    Não promete riqueza. Constrói constância.
    """

    def __init__(self, target: float, periods: int):
        """
        Args:
            target: Valor alvo (destino)
            periods: Número de períodos (tempo)
        """
        self.target = target
        self.periods = periods

    def generate_progression(
        self, 
        start: float = 1, 
        step: float = 1, 
        cap: float = 500
    ) -> ProtocolResult:
        """
        Gera progressão aritmética com limite psicológico
        
        O valor inicial é simbólico.
        O crescimento é progressivo.
        O limite existe para evitar ruptura.
        
        Args:
            start: Valor inicial (simbólico)
            step: Incremento por período
            cap: Teto máximo (barreira psicológica)
        
        Returns:
            Resultado do protocolo
        """
        progression = []
        value = start

        for _ in range(self.periods):
            progression.append(value)
            value = min(value + step, cap)

        total = sum(progression)
        
        # Determina status
        if total >= self.target:
            status = 'reached'
        elif total >= self.target * 0.8:  # 80% ou mais
            status = 'in_progress'
        else:
            status = 'incomplete'

        # Calcula consistência necessária (0-1)
        consistency_required = min(1.0, self.target / total if total > 0 else 0)

        return ProtocolResult(
            progression=progression,
            total=round(total, 2),
            target=self.target,
            status=status,
            periods=self.periods,
            consistency_required=round(consistency_required, 2)
        )

    def optimize_for_target(self) -> ProtocolResult:
        """
        Otimiza progressão para atingir exatamente o alvo
        
        Usa progressão aritmética ajustada:
        S = n/2 × (2a + (n-1)d)
        Resolvendo para d: d = (2S/n - 2a) / (n-1)
        """
        start = 1.0
        
        # Calcula incremento ideal
        if self.periods <= 1:
            step = self.target - start
        else:
            step = max(
                1.0,
                (2 * self.target / self.periods - 2 * start) / (self.periods - 1)
            )

        progression = []
        value = start

        for _ in range(self.periods):
            progression.append(value)
            value = value + step

        total = sum(progression)

        return ProtocolResult(
            progression=progression,
            total=round(total, 2),
            target=self.target,
            status='reached' if total >= self.target else 'in_progress',
            periods=self.periods,
            consistency_required=1.0
        )

    def linear_distribution(self) -> ProtocolResult:
        """
        Distribuição linear - valor constante
        
        Previsível. Estável. Disciplinado.
        """
        monthly_value = self.target / self.periods
        progression = [monthly_value] * self.periods
        total = sum(progression)

        return ProtocolResult(
            progression=progression,
            total=round(total, 2),
            target=self.target,
            status='reached',
            periods=self.periods,
            consistency_required=1.0
        )

    def calculate_maturity_score(
        self, 
        actual_values: List[float]
    ) -> Dict[str, Any]:
        """
        Calcula maturidade financeira baseada em comportamento
        
        Não avalia montante. Avalia método.
        
        Args:
            actual_values: Valores reais depositados
        
        Returns:
            Score de maturidade e interpretação
        """
        if not actual_values:
            return {
                'score': 0.0,
                'level': 'iniciante',
                'ready_for_investment': False
            }

        expected = self.optimize_for_target().progression[:len(actual_values)]
        
        # Calcula desvio
        total_deviation = 0
        total_expected = 0
        
        for exp, act in zip(expected, actual_values):
            total_deviation += abs(exp - act)
            total_expected += exp

        if total_expected == 0:
            consistency = 0.0
        else:
            consistency = max(0, 1 - (total_deviation / total_expected))

        # Calcula continuidade (não quebrou a sequência)
        continuity = sum(1 for v in actual_values if v > 0) / len(actual_values)

        # Score final (50% consistência + 50% continuidade)
        score = (consistency * 0.5 + continuity * 0.5)

        # Determina nível
        if score >= 0.8:
            level = 'maduro'
            ready = True
        elif score >= 0.6:
            level = 'desenvolvendo'
            ready = False
        elif score >= 0.4:
            level = 'aprendendo'
            ready = False
        else:
            level = 'iniciante'
            ready = False

        return {
            'score': round(score, 2),
            'consistency': round(consistency, 2),
            'continuity': round(continuity, 2),
            'level': level,
            'ready_for_investment': ready,
            'periods_completed': len(actual_values),
            'minimum_periods_required': 3  # Mínimo para desbloquear investimentos
        }
