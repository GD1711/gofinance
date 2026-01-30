"""
Insights Engine - Inteligência Comportamental Premium

O pulo do gato.

Responsabilidade: INTERPRETAR.
Não mostra números. Revela significado.
Transforma dado em decisão.
"""

from typing import Optional


def generate_insight(total: float, target: float) -> str:
    """
    Gera insight comportamental baseado na relação total/target
    
    Sem números crus para o usuário.
    Apenas interpretação psicológica.
    
    Args:
        total: Total acumulado
        target: Meta definida
    
    Returns:
        Insight narrativo premium
    """
    if target <= 0:
        return "Meta inválida. Impossível avaliar."
    
    ratio = total / target
    
    # Faixas comportamentais
    if ratio >= 1.0:
        return (
            "Constância consolidada. "
            "Base financeira estabilizada. "
            "Protocolo operando sob controle total."
        )
    elif ratio >= 0.85:
        return (
            "Ritmo sólido. O sistema está funcionando. "
            "Maturidade financeira em desenvolvimento."
        )
    elif ratio >= 0.70:
        return (
            "Progresso consistente detectado. "
            "O tempo está trabalhando a seu favor. "
            "Mantenha o protocolo ativo."
        )
    elif ratio >= 0.50:
        return (
            "Progresso inicial mensurável. "
            "Padrões começam a emergir. "
            "Evite interrupções no protocolo."
        )
    elif ratio >= 0.30:
        return (
            "Fase de construção. "
            "O hábito ainda está se formando. "
            "Consistência é mais importante que valor."
        )
    else:
        return (
            "Fase de adaptação. "
            "Sistema requer tempo para formar comportamento. "
            "Foque na constância, não na velocidade."
        )


def generate_recommendation(
    ratio: float, 
    periods: int,
    average: float
) -> Optional[str]:
    """
    Gera recomendação estratégica
    
    Args:
        ratio: Taxa de alcance (total/target)
        periods: Número de períodos
        average: Média por período
    
    Returns:
        Recomendação ou None
    """
    if ratio >= 1.0:
        return (
            "Protocolo concluído com sucesso. "
            "Considere estabelecer nova meta para manter constância."
        )
    elif ratio >= 0.85:
        return (
            "Continue operando. "
            "Ajustes menores podem otimizar o resultado final."
        )
    elif ratio >= 0.50:
        return (
            "Protocolo viável. "
            "Aumento gradual no ritmo pode acelerar maturidade."
        )
    elif ratio >= 0.30:
        return (
            "Revisite os parâmetros. "
            "Pequenos incrementos progressivos podem melhorar viabilidade."
        )
    else:
        return (
            "Meta pode estar fora de alcance com protocolo atual. "
            "Considere ajustar prazo ou parâmetros de progressão."
        )


def classify_status(ratio: float) -> str:
    """
    Classifica status do protocolo
    
    Args:
        ratio: Taxa de alcance (total/target)
    
    Returns:
        Status: reached, in_progress, incomplete, ou optimal
    """
    if ratio >= 1.0:
        return "reached"
    elif ratio >= 0.80:
        return "in_progress"
    elif ratio >= 0.40:
        return "incomplete"
    else:
        return "incomplete"


def interpret_viability(viability: float) -> str:
    """
    Interpreta viabilidade em linguagem clara
    
    Args:
        viability: Taxa 0-1
    
    Returns:
        Interpretação textual
    """
    if viability >= 0.95:
        return "Altamente viável. Probabilidade de sucesso elevada."
    elif viability >= 0.80:
        return "Viável. Ajustes menores podem otimizar."
    elif viability >= 0.60:
        return "Parcialmente viável. Requer ajustes estratégicos."
    elif viability >= 0.40:
        return "Baixa viabilidade. Revisar parâmetros do protocolo."
    else:
        return "Inviável com protocolo atual. Ajustes necessários."


def generate_comparative_insight(
    progressive_total: float,
    optimized_total: float,
    target: float
) -> str:
    """
    Compara protocolo progressivo vs otimizado
    
    Args:
        progressive_total: Total do protocolo progressivo
        optimized_total: Total do protocolo otimizado
        target: Meta
    
    Returns:
        Insight comparativo
    """
    prog_ratio = progressive_total / target if target > 0 else 0
    opt_ratio = optimized_total / target if target > 0 else 0
    
    diff = abs(opt_ratio - prog_ratio)
    
    if diff < 0.05:
        return (
            "Protocolo progressivo está próximo do ótimo. "
            "Mantenha os parâmetros atuais."
        )
    elif opt_ratio > prog_ratio:
        improvement = ((opt_ratio - prog_ratio) / prog_ratio * 100) if prog_ratio > 0 else 0
        return (
            f"Protocolo otimizado oferece {improvement:.1f}% mais eficiência. "
            "Considere ajustar incrementos para melhor performance."
        )
    else:
        return (
            "Protocolo progressivo está adequado. "
            "Otimização adicional não é crítica."
        )


def interpret_progression_curve(progression: list[float]) -> str:
    """
    Analisa a curva de progressão
    
    Args:
        progression: Lista de valores ao longo do tempo
    
    Returns:
        Interpretação da curva
    """
    if len(progression) < 3:
        return "Dados insuficientes para análise de curva."
    
    # Analisa tendência
    first_half = sum(progression[:len(progression)//2])
    second_half = sum(progression[len(progression)//2:])
    
    if second_half > first_half * 1.2:
        return (
            "Curva acelerada detectada. "
            "Momentum positivo construído ao longo do tempo."
        )
    elif second_half > first_half * 0.8:
        return (
            "Curva estável. "
            "Ritmo consistente mantido ao longo dos períodos."
        )
    else:
        return (
            "Curva desacelerada. "
            "Verifique se há fatores limitantes no protocolo."
        )


def generate_maturity_message(periods_completed: int) -> str:
    """
    Mensagem sobre maturidade comportamental
    
    Args:
        periods_completed: Número de períodos completados
    
    Returns:
        Mensagem de maturidade
    """
    if periods_completed >= 24:
        return (
            "Maturidade consolidada. "
            "Comportamento financeiro estabelecido a longo prazo."
        )
    elif periods_completed >= 12:
        return (
            "Maturidade em desenvolvimento. "
            "Um ano de constância demonstra comprometimento real."
        )
    elif periods_completed >= 6:
        return (
            "Padrão inicial formado. "
            "Seis meses marcam a transição de experimento para hábito."
        )
    elif periods_completed >= 3:
        return (
            "Fase de adaptação. "
            "Três ciclos são o mínimo para validar um protocolo."
        )
    else:
        return (
            "Início do protocolo. "
            "Comportamento ainda em fase de formação."
        )
