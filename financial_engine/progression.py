"""
Progression Module - Progressão Aritmética Pura

Matemática robusta. Invisível ao usuário.
"""

from typing import List, Tuple


class ArithmeticProgression:
    """
    Progressão Aritmética - Base Matemática
    
    Soma = n/2 × (primeiro + último)
    """

    @staticmethod
    def calculate_sum(first: float, last: float, terms: int) -> float:
        """
        Calcula soma da progressão aritmética
        
        Args:
            first: Primeiro termo
            last: Último termo
            terms: Número de termos
        
        Returns:
            Soma total
        """
        return (terms / 2) * (first + last)

    @staticmethod
    def generate_sequence(
        first: float, 
        difference: float, 
        terms: int
    ) -> List[float]:
        """
        Gera sequência de progressão aritmética
        
        Args:
            first: Primeiro termo (a₁)
            difference: Diferença comum (d)
            terms: Quantidade de termos (n)
        
        Returns:
            Lista com a sequência
        """
        return [first + difference * i for i in range(terms)]

    @staticmethod
    def find_difference_for_sum(
        first: float, 
        target_sum: float, 
        terms: int
    ) -> float:
        """
        Encontra a diferença necessária para atingir uma soma
        
        Resolvendo: S = n/2 × (2a + (n-1)d)
        Para d: d = (2S/n - 2a) / (n-1)
        
        Args:
            first: Primeiro termo
            target_sum: Soma desejada
            terms: Número de termos
        
        Returns:
            Diferença ideal
        """
        if terms <= 1:
            return 0.0
        
        return (2 * target_sum / terms - 2 * first) / (terms - 1)

    @staticmethod
    def validate_progression(sequence: List[float]) -> Tuple[bool, float]:
        """
        Valida se uma sequência é progressão aritmética
        
        Args:
            sequence: Sequência a validar
        
        Returns:
            (é_progressão, diferença_comum)
        """
        if len(sequence) < 2:
            return True, 0.0

        differences = [sequence[i+1] - sequence[i] for i in range(len(sequence)-1)]
        
        # Verifica se todas as diferenças são iguais (com tolerância)
        tolerance = 0.01
        first_diff = differences[0]
        is_arithmetic = all(abs(d - first_diff) < tolerance for d in differences)

        return is_arithmetic, first_diff if is_arithmetic else 0.0

    @staticmethod
    def calculate_nth_term(first: float, difference: float, n: int) -> float:
        """
        Calcula o n-ésimo termo
        
        Fórmula: aₙ = a₁ + (n-1)d
        
        Args:
            first: Primeiro termo
            difference: Diferença comum
            n: Posição do termo (1-indexed)
        
        Returns:
            Valor do n-ésimo termo
        """
        return first + (n - 1) * difference

    @staticmethod
    def apply_psychological_cap(
        sequence: List[float], 
        cap: float
    ) -> List[float]:
        """
        Aplica limite psicológico à sequência
        
        Evita valores que causem ruptura comportamental
        
        Args:
            sequence: Sequência original
            cap: Valor máximo permitido
        
        Returns:
            Sequência com limite aplicado
        """
        return [min(value, cap) for value in sequence]
