"""
Insights Module - Inteligência Comportamental

O sistema observa padrões, não prevê mercado.
Interpreta comportamento, não julga valores.
"""

from typing import Dict, List, Any


class BehavioralInsights:
    """
    Motor de Insights Comportamentais
    
    Não mostra números. Revela significado.
    """

    @staticmethod
    def interpret_maturity(maturity_data: Dict[str, Any]) -> str:
        """
        Interpreta maturidade financeira em linguagem narrativa
        
        Args:
            maturity_data: Dados de maturidade (do goals.py)
        
        Returns:
            Interpretação narrativa
        """
        score = maturity_data.get('score', 0)
        level = maturity_data.get('level', 'iniciante')

        interpretations = {
            'maduro': (
                "Constância consolidada. "
                "Base financeira estabilizada. "
                "Protocolo operando sob controle total."
            ),
            'desenvolvendo': (
                "O progresso é consistente. "
                "O tempo está trabalhando a seu favor. "
                "Maturidade em desenvolvimento."
            ),
            'aprendendo': (
                "Padrões começam a emergir. "
                "Cada período fortalece o método. "
                "Continue operando."
            ),
            'iniciante': (
                "Fase de adaptação. "
                "O sistema requer tempo para formar comportamento. "
                "Mantenha o protocolo ativo."
            )
        }

        return interpretations.get(level, "Dados insuficientes.")

    @staticmethod
    def interpret_progress(
        current_period: int,
        total_periods: int,
        accumulated: float,
        target: float
    ) -> str:
        """
        Interpreta progresso sem expor números crus
        
        Returns:
            Mensagem interpretativa
        """
        progress_rate = accumulated / target if target > 0 else 0
        time_rate = current_period / total_periods if total_periods > 0 else 0

        # Comparação entre progresso financeiro e progresso temporal
        if progress_rate >= time_rate + 0.1:
            return (
                "Ritmo acelerado detectado. "
                "Você está à frente da linha de tempo prevista."
            )
        elif progress_rate >= time_rate - 0.1:
            return (
                "Ritmo alinhado. "
                "O protocolo está seguindo a trajetória esperada."
            )
        else:
            return (
                "Ritmo atrasado. "
                "Ajustes podem ser necessários para manter viabilidade."
            )

    @staticmethod
    def interpret_consistency(consistency_score: float) -> str:
        """
        Interpreta taxa de consistência
        
        Args:
            consistency_score: Score de 0 a 1
        
        Returns:
            Interpretação narrativa
        """
        if consistency_score >= 0.95:
            return "Precisão excepcional. O método está internalizado."
        elif consistency_score >= 0.85:
            return "Consistência elevada. Pequenas variações dentro do aceitável."
        elif consistency_score >= 0.70:
            return "Consistência moderada. O protocolo está sendo seguido."
        elif consistency_score >= 0.50:
            return "Oscilações detectadas. Reforce o compromisso."
        else:
            return "Inconsistência significativa. O protocolo requer atenção."

    @staticmethod
    def generate_next_action(
        status: str,
        periods_remaining: int,
        consistency: float
    ) -> str:
        """
        Gera próxima ação recomendada (não instrução, orientação)
        
        Returns:
            Orientação sutil
        """
        if status == 'reached':
            return "Protocolo completo. Avalie expansão ou novo objetivo."
        
        if periods_remaining <= 1:
            return "Período final. Mantenha o foco."
        
        if consistency >= 0.8:
            return "Manter o ritmo atual."
        elif consistency >= 0.6:
            return "Reforçar a regularidade."
        else:
            return "Revisar o compromisso estabelecido."

    @staticmethod
    def behavioral_pattern_analysis(
        actual_values: List[float]
    ) -> Dict[str, Any]:
        """
        Analisa padrões comportamentais ao longo do tempo
        
        Args:
            actual_values: Sequência de valores depositados
        
        Returns:
            Análise de padrões
        """
        if len(actual_values) < 3:
            return {
                'pattern': 'insufficient_data',
                'trend': 'indefinido',
                'interpretation': 'Dados insuficientes para análise de padrão.'
            }

        # Detecta tendência
        increases = 0
        decreases = 0
        
        for i in range(len(actual_values) - 1):
            if actual_values[i+1] > actual_values[i]:
                increases += 1
            elif actual_values[i+1] < actual_values[i]:
                decreases += 1

        if increases > decreases * 1.5:
            pattern = 'crescente'
            trend = 'expansão'
            interpretation = (
                "Compromisso em expansão. "
                "Comportamento evolutivo detectado."
            )
        elif decreases > increases * 1.5:
            pattern = 'decrescente'
            trend = 'retração'
            interpretation = (
                "Retração identificada. "
                "Reavalie capacidade versus compromisso."
            )
        else:
            pattern = 'estável'
            trend = 'constante'
            interpretation = (
                "Padrão estável mantido. "
                "Consistência preservada ao longo do tempo."
            )

        # Detecta volatilidade
        if len(actual_values) >= 5:
            variance = sum((x - sum(actual_values)/len(actual_values))**2 
                          for x in actual_values) / len(actual_values)
            volatility = 'alta' if variance > 10000 else 'baixa'
        else:
            volatility = 'indefinido'

        return {
            'pattern': pattern,
            'trend': trend,
            'volatility': volatility,
            'interpretation': interpretation,
            'data_points': len(actual_values)
        }

    @staticmethod
    def readiness_for_investment(maturity_score: float, periods: int) -> Dict[str, str]:
        """
        Avalia prontidão para desbloquear investimentos
        
        Args:
            maturity_score: Score de maturidade (0-1)
            periods: Períodos completados
        
        Returns:
            Avaliação de prontidão
        """
        min_periods = 3  # Mínimo de períodos
        min_score = 0.8  # Mínimo de 80%

        ready = maturity_score >= min_score and periods >= min_periods

        if ready:
            return {
                'status': 'pronto',
                'message': (
                    "Base financeira consolidada. "
                    "Capacidade de investimento verificada. "
                    "Módulo de investimentos desbloqueado."
                )
            }
        elif periods < min_periods:
            return {
                'status': 'tempo_insuficiente',
                'message': (
                    f"Continue operando. "
                    f"{min_periods - periods} período(s) adicional(is) necessário(s)."
                )
            }
        else:
            return {
                'status': 'maturidade_insuficiente',
                'message': (
                    "Tempo cumprido, mas consistência abaixo do mínimo. "
                    "Reforce o protocolo antes de expandir."
                )
            }
