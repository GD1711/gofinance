"""
Demonstração Completa do Financial Engine
Sistema de Transição Comportamental

Este não é um sistema de cálculos.
É um mecanismo de transformação.
"""

import sys
sys.path.insert(0, 'financial_engine')

from financial_engine.goals import ProgressiveSavingProtocol
from financial_engine.progression import ArithmeticProgression
from financial_engine.validation import ProtocolValidator
from financial_engine.insights import BehavioralInsights
from financial_engine.narrative import NarrativeEngine


def display_section(title: str):
    """Exibe separador de seção"""
    print("\n" + "="*70)
    print(f"  {title}")
    print("="*70 + "\n")


def demo_protocol_introduction():
    """Demonstra introdução do protocolo"""
    display_section("PROTOCOLO - INTRODUÇÃO")
    
    narrative = NarrativeEngine.protocol_introduction()
    print(narrative)
    
    print("\n[ Aguardando resposta do usuário... ]\n")
    
    # Simula aceite
    print("[ PROTOCOLO ACEITO ]\n")
    
    confirmation = NarrativeEngine.protocol_accepted()
    print(confirmation)


def demo_protocol_creation():
    """Demonstra criação de protocolo"""
    display_section("PROTOCOLO - CRIAÇÃO")
    
    # Parâmetros
    target = 10000
    periods = 9
    
    print(f"PARÂMETROS DEFINIDOS:")
    print(f"  Alvo: R$ {target:,.2f}")
    print(f"  Períodos: {periods}\n")
    
    # Criar protocolo
    protocol = ProgressiveSavingProtocol(target, periods)
    
    # Estratégia 1: Progressiva Otimizada
    progressive = protocol.optimize_for_target()
    print("ESTRATÉGIA_1: PROGRESSÃO_OTIMIZADA")
    print(f"  Status: {progressive.status.upper()}")
    print(f"  Total acumulado: R$ {progressive.total:,.2f}")
    print(f"  Consistência requerida: {progressive.consistency_required * 100:.0f}%\n")
    
    print("  Valores por período:")
    for i, value in enumerate(progressive.progression, 1):
        print(f"    Período {i:02d}: R$ {value:,.2f}")
    
    print()
    
    # Estratégia 2: Linear
    linear = protocol.linear_distribution()
    print("ESTRATÉGIA_2: DISTRIBUIÇÃO_LINEAR")
    print(f"  Status: {linear.status.upper()}")
    print(f"  Valor constante: R$ {linear.progression[0]:,.2f}\n")


def demo_validation():
    """Demonstra validação de protocolo"""
    display_section("PROTOCOLO - VALIDAÇÃO")
    
    # Validar viabilidade
    validator = ProtocolValidator()
    
    # Caso 1: Viável
    result1 = validator.validate_feasibility(
        target=5000,
        periods=10,
        monthly_income=3000,
        max_commitment_rate=0.3
    )
    
    print("CASO_1: PROTOCOLO_VIÁVEL")
    print(f"  Viável: {'SIM' if result1['feasible'] else 'NÃO'}")
    print(f"  Classificação: {result1['tier'].upper()}")
    print(f"  Comprometimento: {result1['commitment_rate']}%")
    print(f"  Recomendação: {result1['recommendation']}\n")
    
    # Caso 2: Inviável
    result2 = validator.validate_feasibility(
        target=10000,
        periods=5,
        monthly_income=2000,
        max_commitment_rate=0.3
    )
    
    print("CASO_2: PROTOCOLO_INVIÁVEL")
    print(f"  Viável: {'SIM' if result2['feasible'] else 'NÃO'}")
    print(f"  Classificação: {result2['tier'].upper()}")
    print(f"  Comprometimento: {result2['commitment_rate']}%")
    print(f"  Recomendação: {result2['recommendation']}\n")


def demo_behavioral_insights():
    """Demonstra análise comportamental"""
    display_section("ANÁLISE - COMPORTAMENTO")
    
    # Simula dados de usuário
    protocol = ProgressiveSavingProtocol(5000, 6)
    expected = protocol.optimize_for_target().progression
    
    # Simulação 1: Usuário consistente (90%)
    actual_good = [v * 0.9 for v in expected]
    maturity_good = protocol.calculate_maturity_score(actual_good)
    
    print("USUÁRIO_A: CONSTÂNCIA_ELEVADA")
    print(f"  Score: {maturity_good['score'] * 100:.0f}%")
    print(f"  Nível: {maturity_good['level'].upper()}")
    print(f"  Pronto para investimentos: {'SIM' if maturity_good['ready_for_investment'] else 'NÃO'}\n")
    
    interpretation_good = BehavioralInsights.interpret_maturity(maturity_good)
    print(f"  Interpretação:")
    for line in interpretation_good.split('. '):
        if line:
            print(f"    {line}.")
    
    print()
    
    # Simulação 2: Usuário inconsistente (50%)
    actual_bad = [v * 0.5 if i % 2 == 0 else v * 0.3 for i, v in enumerate(expected)]
    maturity_bad = protocol.calculate_maturity_score(actual_bad)
    
    print("USUÁRIO_B: INCONSISTÊNCIA_DETECTADA")
    print(f"  Score: {maturity_bad['score'] * 100:.0f}%")
    print(f"  Nível: {maturity_bad['level'].upper()}")
    print(f"  Pronto para investimentos: {'SIM' if maturity_bad['ready_for_investment'] else 'NÃO'}\n")
    
    interpretation_bad = BehavioralInsights.interpret_maturity(maturity_bad)
    print(f"  Interpretação:")
    for line in interpretation_bad.split('. '):
        if line:
            print(f"    {line}.")
    
    print()


def demo_pattern_analysis():
    """Demonstra análise de padrões"""
    display_section("ANÁLISE - PADRÕES_COMPORTAMENTAIS")
    
    insights = BehavioralInsights()
    
    # Padrão 1: Crescente
    values_growing = [100, 150, 200, 250, 300]
    pattern1 = insights.behavioral_pattern_analysis(values_growing)
    
    print("PADRÃO_1: CRESCIMENTO")
    print(f"  Tipo: {pattern1['pattern'].upper()}")
    print(f"  Tendência: {pattern1['trend'].upper()}")
    print(f"  Interpretação: {pattern1['interpretation']}\n")
    
    # Padrão 2: Decrescente
    values_shrinking = [300, 250, 200, 150, 100]
    pattern2 = insights.behavioral_pattern_analysis(values_shrinking)
    
    print("PADRÃO_2: RETRAÇÃO")
    print(f"  Tipo: {pattern2['pattern'].upper()}")
    print(f"  Tendência: {pattern2['trend'].upper()}")
    print(f"  Interpretação: {pattern2['interpretation']}\n")
    
    # Padrão 3: Estável
    values_stable = [200, 210, 195, 205, 200]
    pattern3 = insights.behavioral_pattern_analysis(values_stable)
    
    print("PADRÃO_3: ESTABILIDADE")
    print(f"  Tipo: {pattern3['pattern'].upper()}")
    print(f"  Tendência: {pattern3['trend'].upper()}")
    print(f"  Interpretação: {pattern3['interpretation']}\n")


def demo_investment_readiness():
    """Demonstra análise de prontidão para investimentos"""
    display_section("MÓDULO_INVESTIMENTOS - PRONTIDÃO")
    
    insights = BehavioralInsights()
    
    # Caso 1: Pronto
    readiness1 = insights.readiness_for_investment(maturity_score=0.85, periods=4)
    print("USUÁRIO_A:")
    print(f"  Status: {readiness1['status'].upper()}")
    print(f"  Mensagem:")
    for line in readiness1['message'].split('. '):
        if line:
            print(f"    {line}.")
    print()
    
    # Caso 2: Tempo insuficiente
    readiness2 = insights.readiness_for_investment(maturity_score=0.85, periods=2)
    print("USUÁRIO_B:")
    print(f"  Status: {readiness2['status'].upper()}")
    print(f"  Mensagem:")
    for line in readiness2['message'].split('. '):
        if line:
            print(f"    {line}.")
    print()
    
    # Caso 3: Maturidade insuficiente
    readiness3 = insights.readiness_for_investment(maturity_score=0.65, periods=5)
    print("USUÁRIO_C:")
    print(f"  Status: {readiness3['status'].upper()}")
    print(f"  Mensagem:")
    for line in readiness3['message'].split('. '):
        if line:
            print(f"    {line}.")
    print()


def demo_narrative_engine():
    """Demonstra motor narrativo"""
    display_section("NARRATIVAS - INTERPRETAÇÃO")
    
    narrative = NarrativeEngine()
    
    # Narrativas de status
    print("STATUS_NARRATIVAS:\n")
    for status in ['reached', 'in_progress', 'incomplete']:
        text = narrative.protocol_status(status)
        print(f"  {status.upper()}:")
        for line in text.split('\n'):
            print(f"    {line}")
        print()
    
    # Mensagem de investimento bloqueado
    print("\nINVESTIMENTO_BLOQUEADO:")
    locked_msg = narrative.investment_locked_message(periods_remaining=2, score_required=0.8)
    print(locked_msg)
    
    print("\n" + "-"*70 + "\n")
    
    # Mensagem de investimento desbloqueado
    print("INVESTIMENTO_DESBLOQUEADO:")
    unlocked_msg = narrative.investment_unlocked_message()
    print(unlocked_msg)


def main():
    """Executa demonstração completa"""
    print("\n")
    print("="*70)
    print(" "*20 + "FINANCIAL ENGINE")
    print(" "*15 + "Sistema de Transicao Comportamental")
    print("="*70)
    
    # Executar todas as demos
    demo_protocol_introduction()
    demo_protocol_creation()
    demo_validation()
    demo_behavioral_insights()
    demo_pattern_analysis()
    demo_investment_readiness()
    demo_narrative_engine()
    
    # Conclusão
    display_section("SISTEMA - STATUS")
    print("✓ Motor matemático: OPERACIONAL")
    print("✓ Sistema de validação: OPERACIONAL")
    print("✓ Análise comportamental: OPERACIONAL")
    print("✓ Motor narrativo: OPERACIONAL")
    print("✓ Integração completa: PRONTA\n")
    
    print("="*70)
    print("  ESTE NÃO É UM APP DE CÁLCULOS.")
    print("  É UM SISTEMA DE TRANSIÇÃO.")
    print("="*70)
    print()


if __name__ == "__main__":
    main()
