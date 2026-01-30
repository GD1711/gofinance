"""
Financial Engine - Sistema de Transição Comportamental

Não é um sistema de cálculos.
É um mecanismo de transformação:
  - inconsistência → constância
  - ansiedade → previsibilidade
  - caos financeiro → controle mensurável

Antes de investir dinheiro, o usuário aprende a investir comportamento.
"""

from .goals import ProgressiveSavingProtocol
from .progression import ArithmeticProgression
from .validation import ProtocolValidator
from .insights import BehavioralInsights
from .narrative import NarrativeEngine

__all__ = [
    'ProgressiveSavingProtocol',
    'ArithmeticProgression',
    'ProtocolValidator',
    'BehavioralInsights',
    'NarrativeEngine',
]

__version__ = '1.0.0'
