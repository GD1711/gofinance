"""
Testes de Validação

Testa schemas Pydantic e validadores.
"""

import pytest
from pydantic import ValidationError
from schemas import GoalInput, ProgressiveProtocolInput


class TestGoalInput:
    """Testes de validação de Goal"""
    
    def test_valid_goal(self):
        """Testa goal válido"""
        goal = GoalInput(target_amount=1000, periods=12)
        assert goal.target_amount == 1000
        assert goal.periods == 12
    
    def test_reject_negative_target(self):
        """Testa rejeição de valor negativo"""
        with pytest.raises(ValidationError):
            GoalInput(target_amount=-100, periods=12)
    
    def test_reject_zero_target(self):
        """Testa rejeição de valor zero"""
        with pytest.raises(ValidationError):
            GoalInput(target_amount=0, periods=12)
    
    def test_reject_target_too_high(self):
        """Testa rejeição de meta muito alta"""
        with pytest.raises(ValidationError) as exc_info:
            GoalInput(target_amount=2_000_000, periods=12)
        
        assert "educacional" in str(exc_info.value).lower()
    
    def test_reject_target_too_low(self):
        """Testa rejeição de meta muito baixa"""
        with pytest.raises(ValidationError) as exc_info:
            GoalInput(target_amount=5, periods=12)
        
        assert "baixa" in str(exc_info.value).lower()
    
    def test_reject_zero_periods(self):
        """Testa rejeição de período zero"""
        with pytest.raises(ValidationError):
            GoalInput(target_amount=1000, periods=0)
    
    def test_reject_periods_too_short(self):
        """Testa rejeição de período muito curto"""
        with pytest.raises(ValidationError) as exc_info:
            GoalInput(target_amount=1000, periods=2)
        
        assert "comportamento" in str(exc_info.value).lower()
    
    def test_reject_periods_too_long(self):
        """Testa rejeição de período muito longo"""
        with pytest.raises(ValidationError):
            GoalInput(target_amount=1000, periods=150)


class TestProgressiveProtocolInput:
    """Testes de validação de Protocol"""
    
    def test_valid_protocol(self):
        """Testa protocolo válido"""
        protocol = ProgressiveProtocolInput(
            start_value=1,
            increment=2,
            cap=100
        )
        assert protocol.start_value == 1
        assert protocol.increment == 2
        assert protocol.cap == 100
    
    def test_default_values(self):
        """Testa valores padrão"""
        protocol = ProgressiveProtocolInput()
        assert protocol.start_value == 1.0
        assert protocol.increment == 1.0
        assert protocol.cap == 500.0
    
    def test_reject_cap_below_start(self):
        """Testa rejeição de cap menor que start"""
        with pytest.raises(ValidationError) as exc_info:
            ProgressiveProtocolInput(
                start_value=100,
                increment=1,
                cap=50
            )
        
        assert "progressão" in str(exc_info.value).lower()
    
    def test_reject_negative_start(self):
        """Testa rejeição de start negativo"""
        with pytest.raises(ValidationError):
            ProgressiveProtocolInput(
                start_value=-1,
                increment=1,
                cap=100
            )
    
    def test_reject_start_too_high(self):
        """Testa rejeição de start muito alto"""
        with pytest.raises(ValidationError):
            ProgressiveProtocolInput(
                start_value=200,
                increment=1,
                cap=500
            )


class TestSchemaIntegration:
    """Testes de integração entre schemas"""
    
    def test_complete_request(self):
        """Testa request completo"""
        goal = GoalInput(target_amount=1000, periods=12)
        protocol = ProgressiveProtocolInput(start_value=1, increment=2, cap=100)
        
        assert goal.target_amount == 1000
        assert protocol.cap == 100
    
    def test_edge_values(self):
        """Testa valores nos limites"""
        # Valores mínimos válidos
        goal = GoalInput(target_amount=10, periods=3)
        protocol = ProgressiveProtocolInput(start_value=1, increment=0.5, cap=10)
        
        assert goal.target_amount == 10
        assert protocol.increment == 0.5
        
        # Valores máximos válidos
        goal = GoalInput(target_amount=1_000_000, periods=120)
        protocol = ProgressiveProtocolInput(start_value=100, increment=50, cap=2000)
        
        assert goal.periods == 120
        assert protocol.cap == 2000
