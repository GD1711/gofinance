"""
Progressive Engine - Motor de Cálculo Puro

Responsabilidade: CALCULAR.
Não valida. Não interpreta. Não decide.

A API governa. O engine executa.
"""

from typing import List, Tuple
from dataclasses import dataclass


@dataclass
class ProgressionResult:
    """Resultado bruto do cálculo"""
    progression: List[float]
    total: float
    periods: int
    average: float
    peak: float


class ProgressiveEngine:
    """
    Motor Matemático de Progressão
    
    Input: parâmetros validados
    Output: números puros
    
    Sem regras de negócio aqui.
    """
    
    def __init__(self, target: float, periods: int):
        """
        Inicializa engine com meta e períodos
        
        Args:
            target: Valor alvo (já validado)
            periods: Número de períodos (já validado)
        """
        self.target = target
        self.periods = periods
    
    def calculate(
        self, 
        start: float, 
        increment: float, 
        cap: float
    ) -> ProgressionResult:
        """
        Calcula progressão aritmética com teto
        
        Fórmula base: aₙ = a₁ + (n-1) × d
        Com limitação: min(aₙ, cap)
        
        Args:
            start: Valor inicial
            increment: Incremento por período
            cap: Valor máximo
        
        Returns:
            Resultado do cálculo puro
        """
        progression = []
        current = start
        
        for _ in range(self.periods):
            progression.append(current)
            current = min(current + increment, cap)
        
        total = sum(progression)
        average = total / self.periods if self.periods > 0 else 0
        peak = max(progression) if progression else 0
        
        return ProgressionResult(
            progression=progression,
            total=round(total, 2),
            periods=self.periods,
            average=round(average, 2),
            peak=round(peak, 2)
        )
    
    def optimize(self) -> ProgressionResult:
        """
        Calcula progressão otimizada para atingir exatamente o alvo
        
        Resolve: S = n/2 × (2a + (n-1)d)
        Para d: d = (2S/n - 2a) / (n-1)
        
        Returns:
            Progressão otimizada
        """
        start = 1.0
        
        if self.periods <= 1:
            # Caso especial: 1 período
            increment = 0.0
            progression = [self.target]
        else:
            # Calcula incremento ideal
            increment = (2 * self.target / self.periods - 2 * start) / (self.periods - 1)
            
            # Garante incremento não-negativo
            if increment < 0:
                increment = 0.0
            
            # Gera progressão
            progression = [
                start + increment * i 
                for i in range(self.periods)
            ]
        
        total = sum(progression)
        average = total / self.periods if self.periods > 0 else 0
        peak = max(progression) if progression else 0
        
        return ProgressionResult(
            progression=[round(v, 2) for v in progression],
            total=round(total, 2),
            periods=self.periods,
            average=round(average, 2),
            peak=round(peak, 2)
        )
    
    def calculate_viability(self, total_accumulated: float) -> float:
        """
        Calcula taxa de viabilidade (0-1)
        
        Args:
            total_accumulated: Total acumulado
        
        Returns:
            Taxa de 0 (inviável) a 1 (alcançado)
        """
        if self.target <= 0:
            return 0.0
        
        return min(1.0, total_accumulated / self.target)
    
    def simulate_scenarios(
        self, 
        start_range: Tuple[float, float],
        increment_range: Tuple[float, float],
        cap: float,
        samples: int = 5
    ) -> List[ProgressionResult]:
        """
        Simula múltiplos cenários de progressão
        
        Útil para UI mostrar opções ao usuário.
        
        Args:
            start_range: (min, max) para valor inicial
            increment_range: (min, max) para incremento
            cap: Teto máximo
            samples: Número de cenários
        
        Returns:
            Lista de resultados simulados
        """
        scenarios = []
        
        start_min, start_max = start_range
        inc_min, inc_max = increment_range
        
        start_step = (start_max - start_min) / (samples - 1) if samples > 1 else 0
        inc_step = (inc_max - inc_min) / (samples - 1) if samples > 1 else 0
        
        for i in range(samples):
            start = start_min + i * start_step
            increment = inc_min + i * inc_step
            
            result = self.calculate(start, increment, cap)
            scenarios.append(result)
        
        return scenarios
    
    @staticmethod
    def validate_arithmetic_progression(sequence: List[float]) -> Tuple[bool, float]:
        """
        Valida se uma sequência é progressão aritmética
        
        Args:
            sequence: Sequência a validar
        
        Returns:
            (é_progressão, diferença_comum)
        """
        if len(sequence) < 2:
            return True, 0.0
        
        differences = [
            sequence[i+1] - sequence[i] 
            for i in range(len(sequence) - 1)
        ]
        
        # Tolerância para erros de arredondamento
        tolerance = 0.01
        first_diff = differences[0]
        is_arithmetic = all(
            abs(d - first_diff) < tolerance 
            for d in differences
        )
        
        return is_arithmetic, first_diff if is_arithmetic else 0.0
