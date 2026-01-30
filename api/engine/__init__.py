"""
API Engine Package

Motor de cálculo e interpretação.
Isolado. Testável. Reutilizável.
"""

from .progression import ProgressiveEngine, ProgressionResult
from .insights import (
    generate_insight,
    generate_recommendation,
    classify_status,
    interpret_viability,
    generate_comparative_insight,
    interpret_progression_curve,
    generate_maturity_message
)

__all__ = [
    'ProgressiveEngine',
    'ProgressionResult',
    'generate_insight',
    'generate_recommendation',
    'classify_status',
    'interpret_viability',
    'generate_comparative_insight',
    'interpret_progression_curve',
    'generate_maturity_message',
]
