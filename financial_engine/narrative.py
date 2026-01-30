"""
Narrative Module - Motor Narrativo

Não explica. Não ensina. Apenas apresenta realidade processada.
Linguagem fria, científica, protocolar.
"""


class NarrativeEngine:
    """
    Motor de Narrativas Comportamentais
    
    Transforma dados em experiência.
    """

    @staticmethod
    def protocol_introduction() -> str:
        """
        Narrativa de introdução ao protocolo
        Texto para modal com efeito máquina de escrever
        """
        return """Registro nº 001.

Nenhum sistema financeiro falhou por falta de dinheiro.
Falhou por falta de método.

Antes dos juros,
antes das projeções,
antes do risco…

existe apenas uma variável controlável:
o comportamento humano ao longo do tempo.

Este mecanismo não acelera.
Ele sustenta.

Você define o alvo.
Você define o período.
O sistema remove o acaso.

Aceita operar sob constância?"""

    @staticmethod
    def protocol_accepted() -> str:
        """
        Confirmação após aceite
        """
        return """Protocolo ativado.

O valor inicial é simbólico.
O crescimento é progressivo.
O limite existe para evitar ruptura.

O objetivo não é guardar mais.
É permanecer.

O sistema ajusta o percurso
para que o destino seja alcançado
dentro do tempo definido.

Você não precisa entender o cálculo.
Apenas manter o compromisso."""

    @staticmethod
    def protocol_status(status: str) -> str:
        """
        Narrativa de status do protocolo
        """
        narratives = {
            'reached': (
                "Protocolo completo.\n"
                "Constância estabelecida.\n"
                "Base financeira estabilizada."
            ),
            'in_progress': (
                "Protocolo em operação.\n"
                "O tempo está processando os dados.\n"
                "Continue."
            ),
            'incomplete': (
                "Protocolo iniciado.\n"
                "Padrões ainda em formação.\n"
                "A constância está sendo testada."
            )
        }
        return narratives.get(status, "Status indefinido.")

    @staticmethod
    def maturity_levels() -> dict:
        """
        Narrativas para níveis de maturidade
        """
        return {
            'maduro': {
                'title': 'Maturidade Consolidada',
                'description': (
                    'Base financeira estabilizada. '
                    'Comportamento previsível detectado. '
                    'Sistema operando sob controle total.'
                ),
                'unlock': 'Módulo de investimentos disponível.'
            },
            'desenvolvendo': {
                'title': 'Maturidade em Desenvolvimento',
                'description': (
                    'Constância em formação. '
                    'Padrões comportamentais emergindo. '
                    'Progressão identificada.'
                ),
                'unlock': 'Continue para desbloquear próximo nível.'
            },
            'aprendendo': {
                'title': 'Fase de Aprendizado',
                'description': (
                    'Protocolo em adaptação. '
                    'Sistema registrando comportamento. '
                    'Tempo necessário para consolidação.'
                ),
                'unlock': 'Módulo avançado bloqueado.'
            },
            'iniciante': {
                'title': 'Protocolo Iniciado',
                'description': (
                    'Fase inicial detectada. '
                    'Sistema em calibração. '
                    'Dados insuficientes para análise profunda.'
                ),
                'unlock': 'Módulo avançado bloqueado.'
            }
        }

    @staticmethod
    def investment_locked_message(periods_remaining: int, score_required: float) -> str:
        """
        Mensagem quando investimentos estão bloqueados
        """
        return f"""Módulo de Investimentos

Status: BLOQUEADO

Pré-requisitos:
• Base financeira estabilizada
• Mínimo de 3 períodos consecutivos
• Constância verificada (≥80%)

Progresso atual:
• Períodos restantes: {periods_remaining}
• Consistência necessária: {int(score_required * 100)}%

Antes de investir dinheiro,
prove que pode investir comportamento."""

    @staticmethod
    def investment_unlocked_message() -> str:
        """
        Mensagem quando investimentos são desbloqueados
        """
        return """Módulo de Investimentos

Status: DESBLOQUEADO

Pré-requisitos cumpridos:
✓ Base financeira consolidada
✓ Constância verificada
✓ Maturidade comportamental atingida

Você formou um método.
Agora pode aplicá-lo com risco controlado.

Bem-vindo ao próximo protocolo."""

    @staticmethod
    def period_milestone(period: int, total: int, on_track: bool) -> str:
        """
        Narrativa para marcos de período
        """
        progress_pct = int((period / total) * 100)
        
        if period == 1:
            return "Primeiro período registrado. O sistema inicia observação."
        
        if period == total:
            if on_track:
                return "Período final. Protocolo em vias de conclusão bem-sucedida."
            else:
                return "Período final. Avalie resultado e recalibre se necessário."
        
        if progress_pct >= 75:
            return f"Marco: {progress_pct}%. Fase final do protocolo."
        elif progress_pct >= 50:
            return f"Marco: {progress_pct}%. Metade do percurso completada."
        elif progress_pct >= 25:
            return f"Marco: {progress_pct}%. Primeiro quartil concluído."
        else:
            return f"Período {period}/{total}. Protocolo em andamento."

    @staticmethod
    def consistency_interpretation(consistency: float) -> str:
        """
        Interpreta consistência em linguagem protocolar
        """
        pct = int(consistency * 100)
        
        if consistency >= 0.95:
            return f"Precisão: {pct}%. Desvio mínimo detectado."
        elif consistency >= 0.85:
            return f"Consistência: {pct}%. Variação dentro dos parâmetros."
        elif consistency >= 0.70:
            return f"Constância: {pct}%. Protocolo sendo seguido."
        elif consistency >= 0.50:
            return f"Oscilação: {pct}%. Ajuste recomendado."
        else:
            return f"Inconsistência: {pct}%. Revisão necessária."

    @staticmethod
    def behavioral_transition(from_state: str, to_state: str) -> str:
        """
        Narrativa para transições comportamentais
        """
        transitions = {
            ('iniciante', 'aprendendo'): (
                "Transição detectada.\n"
                "De adaptação para formação.\n"
                "Padrões começam a emergir."
            ),
            ('aprendendo', 'desenvolvendo'): (
                "Evolução confirmada.\n"
                "De formação para consolidação.\n"
                "Comportamento se estabilizando."
            ),
            ('desenvolvendo', 'maduro'): (
                "Maturidade atingida.\n"
                "De consolidação para controle total.\n"
                "Protocolo internalizado."
            ),
        }
        
        key = (from_state, to_state)
        return transitions.get(key, "Transição em processamento.")
