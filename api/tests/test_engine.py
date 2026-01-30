"""
Testes do Engine de Progressão

Testa matemática pura, isoladamente da API.
"""

import pytest
from engine.progression import ProgressiveEngine, ProgressionResult


class TestProgressiveEngine:
    """Testes do motor de progressão"""
    
    def test_basic_calculation(self):
        """Testa cálculo básico de progressão"""
        engine = ProgressiveEngine(target=100, periods=10)
        result = engine.calculate(start=1, increment=2, cap=50)
        
        assert isinstance(result, ProgressionResult)
        assert result.periods == 10
        assert len(result.progression) == 10
        assert result.total > 0
    
    def test_cap_limiting(self):
        """Testa que o cap limita valores"""
        engine = ProgressiveEngine(target=1000, periods=10)
        result = engine.calculate(start=1, increment=10, cap=50)
        
        # Nenhum valor deve exceder o cap
        assert all(v <= 50 for v in result.progression)
        assert result.peak <= 50
    
    def test_optimize(self):
        """Testa otimização matemática"""
        engine = ProgressiveEngine(target=1000, periods=12)
        result = engine.optimize()
        
        # Deve estar muito próximo do target
        assert abs(result.total - 1000) < 10
    
    def test_viability_calculation(self):
        """Testa cálculo de viabilidade"""
        engine = ProgressiveEngine(target=100, periods=10)
        
        # 100% do target
        assert engine.calculate_viability(100) == 1.0
        
        # 50% do target
        assert engine.calculate_viability(50) == 0.5
        
        # 0% do target
        assert engine.calculate_viability(0) == 0.0
        
        # Mais que target
        assert engine.calculate_viability(150) == 1.0
    
    def test_arithmetic_validation(self):
        """Testa validação de progressão aritmética"""
        # Progressão válida
        valid_sequence = [1, 3, 5, 7, 9]
        is_valid, diff = ProgressiveEngine.validate_arithmetic_progression(valid_sequence)
        
        assert is_valid is True
        assert diff == 2.0
        
        # Progressão inválida
        invalid_sequence = [1, 3, 6, 10, 15]
        is_valid, diff = ProgressiveEngine.validate_arithmetic_progression(invalid_sequence)
        
        assert is_valid is False


class TestProgressionEdgeCases:
    """Testes de casos extremos"""
    
    def test_single_period(self):
        """Testa com 1 período apenas"""
        engine = ProgressiveEngine(target=100, periods=1)
        result = engine.calculate(start=50, increment=0, cap=100)
        
        assert len(result.progression) == 1
        assert result.total == 50
    
    def test_zero_increment(self):
        """Testa com incremento zero (constante)"""
        engine = ProgressiveEngine(target=100, periods=10)
        result = engine.calculate(start=10, increment=0, cap=50)
        
        # Todos valores devem ser iguais
        assert all(v == 10 for v in result.progression)
        assert result.total == 100
    
    def test_large_numbers(self):
        """Testa com números grandes"""
        engine = ProgressiveEngine(target=1_000_000, periods=120)
        result = engine.optimize()
        
        assert result.total > 0
        assert len(result.progression) == 120
