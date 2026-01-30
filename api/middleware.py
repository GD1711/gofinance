"""
Middleware de Governança e Segurança

Rate limiting, validação de comportamento, proteção do usuário.
Nível startup: simples, mas eficaz.
"""

from fastapi import Request, HTTPException, status
from fastapi.responses import JSONResponse
from datetime import datetime, timedelta
from typing import Dict, Optional
from collections import defaultdict
import time


# ==================== RATE LIMITING ====================

class RateLimiter:
    """
    Rate Limiter simples em memória
    
    Em produção: usar Redis + distributed rate limiting
    """
    
    def __init__(
        self, 
        requests_per_minute: int = 60,
        requests_per_hour: int = 1000
    ):
        self.rpm = requests_per_minute
        self.rph = requests_per_hour
        
        # Storage em memória (trocar por Redis em produção)
        self.minute_requests: Dict[str, list] = defaultdict(list)
        self.hour_requests: Dict[str, list] = defaultdict(list)
    
    def _clean_old_requests(self, client_id: str):
        """Remove requisições antigas"""
        now = time.time()
        minute_ago = now - 60
        hour_ago = now - 3600
        
        # Limpa minuto
        self.minute_requests[client_id] = [
            ts for ts in self.minute_requests[client_id] 
            if ts > minute_ago
        ]
        
        # Limpa hora
        self.hour_requests[client_id] = [
            ts for ts in self.hour_requests[client_id] 
            if ts > hour_ago
        ]
    
    def check_limit(self, client_id: str) -> tuple[bool, Optional[str]]:
        """
        Verifica se cliente está dentro do limite
        
        Returns:
            (allowed, error_message)
        """
        self._clean_old_requests(client_id)
        
        # Verifica minuto
        minute_count = len(self.minute_requests[client_id])
        if minute_count >= self.rpm:
            return False, f"Limite de {self.rpm} requisições por minuto excedido."
        
        # Verifica hora
        hour_count = len(self.hour_requests[client_id])
        if hour_count >= self.rph:
            return False, f"Limite de {self.rph} requisições por hora excedido."
        
        # Registra requisição
        now = time.time()
        self.minute_requests[client_id].append(now)
        self.hour_requests[client_id].append(now)
        
        return True, None


# Instância global (em produção, usar dependency injection)
rate_limiter = RateLimiter(
    requests_per_minute=60,
    requests_per_hour=1000
)


# ==================== VALIDAÇÃO COMPORTAMENTAL ====================

class BehaviorValidator:
    """
    Valida padrões de uso suspeitos
    
    Protege usuário de comportamento autodestrutivo.
    """
    
    @staticmethod
    def validate_goal_sanity(target: float, periods: int) -> tuple[bool, Optional[str]]:
        """
        Valida se a meta é psicologicamente saudável
        
        Evita:
        - Metas absurdas
        - Períodos muito curtos para valores altos
        - Expectativas irreais
        """
        
        # Meta muito alta para período curto
        monthly_rate = target / periods if periods > 0 else 0
        
        if monthly_rate > 10000 and periods < 12:
            return False, (
                "Meta não alinhada com educação financeira. "
                "Valores elevados requerem períodos mais longos para formar comportamento."
            )
        
        # Período muito longo (perda de relevância)
        if periods > 120:  # 10 anos
            return False, (
                "Período muito longo. "
                "Protocolos educacionais funcionam melhor em horizontes de 3 meses a 5 anos."
            )
        
        return True, None
    
    @staticmethod
    def validate_protocol_safety(
        start: float, 
        increment: float, 
        cap: float, 
        periods: int
    ) -> tuple[bool, Optional[str]]:
        """
        Valida se protocolo não é destrutivo
        """
        
        # Incremento muito agressivo
        if increment > cap * 0.5:
            return False, (
                "Incremento muito agressivo. "
                "Progressão requer crescimento sustentável."
            )
        
        # Cap muito baixo
        if cap < start + (increment * 2):
            return False, (
                "Teto muito próximo do início. "
                "Protocolo precisa de espaço para progressão."
            )
        
        return True, None


behavior_validator = BehaviorValidator()


# ==================== DECISION LOGGING ====================

class DecisionLogger:
    """
    Log estruturado de decisões
    
    NÃO loga valores. Loga DECISÕES.
    """
    
    def __init__(self):
        self.logs = []
    
    def log_decision(
        self,
        decision_type: str,
        outcome: str,
        reason: str,
        metadata: Optional[Dict] = None
    ):
        """
        Registra decisão do sistema
        
        Args:
            decision_type: Tipo de decisão (validation, rate_limit, etc)
            outcome: approved ou rejected
            reason: Motivo da decisão
            metadata: Dados adicionais (sem informações sensíveis)
        """
        log_entry = {
            "timestamp": datetime.now().isoformat(),
            "decision_type": decision_type,
            "outcome": outcome,
            "reason": reason,
            "metadata": metadata or {}
        }
        
        self.logs.append(log_entry)
        
        # Em produção: enviar para CloudWatch, Datadog, etc.
        print(f"[DECISION] {log_entry}")
    
    def get_recent_logs(self, limit: int = 100) -> list:
        """Retorna logs recentes"""
        return self.logs[-limit:]


decision_logger = DecisionLogger()


# ==================== MIDDLEWARE ====================

async def rate_limit_middleware(request: Request, call_next):
    """
    Middleware de rate limiting
    """
    
    # Identifica cliente (em produção, usar auth token)
    client_id = request.client.host if request.client else "unknown"
    
    # Verifica limite
    allowed, error_msg = rate_limiter.check_limit(client_id)
    
    if not allowed:
        decision_logger.log_decision(
            decision_type="rate_limit",
            outcome="rejected",
            reason=error_msg,
            metadata={"client_id": client_id}
        )
        
        return JSONResponse(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            content={
                "protocol_version": "1.0",
                "decision": "rejected",
                "reason": error_msg,
                "suggestion": "Aguarde antes de fazer nova requisição."
            }
        )
    
    response = await call_next(request)
    return response


async def validation_middleware(request: Request, call_next):
    """
    Middleware de validação comportamental
    
    Valida padrões antes de processar
    """
    
    # Só valida endpoints de protocolo
    if "/protocols/" not in request.url.path:
        return await call_next(request)
    
    try:
        # Parse body (se houver)
        if request.method == "POST":
            body = await request.json()
            
            # Valida goal se presente
            if "goal" in body:
                goal = body["goal"]
                valid, msg = behavior_validator.validate_goal_sanity(
                    target=goal.get("target_amount", 0),
                    periods=goal.get("periods", 0)
                )
                
                if not valid:
                    decision_logger.log_decision(
                        decision_type="behavior_validation",
                        outcome="rejected",
                        reason=msg,
                        metadata={"endpoint": request.url.path}
                    )
                    
                    return JSONResponse(
                        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                        content={
                            "protocol_version": "1.0",
                            "decision": "rejected",
                            "reason": msg,
                            "suggestion": "Ajuste os parâmetros para valores educacionais."
                        }
                    )
            
            # Valida protocol se presente
            if "protocol" in body:
                protocol = body["protocol"]
                goal = body.get("goal", {})
                
                valid, msg = behavior_validator.validate_protocol_safety(
                    start=protocol.get("start_value", 1),
                    increment=protocol.get("increment", 1),
                    cap=protocol.get("cap", 500),
                    periods=goal.get("periods", 12)
                )
                
                if not valid:
                    decision_logger.log_decision(
                        decision_type="protocol_validation",
                        outcome="rejected",
                        reason=msg,
                        metadata={"endpoint": request.url.path}
                    )
                    
                    return JSONResponse(
                        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                        content={
                            "protocol_version": "1.0",
                            "decision": "rejected",
                            "reason": msg,
                            "suggestion": "Revise os parâmetros de progressão."
                        }
                    )
    
    except Exception as e:
        # Se erro no parse, deixa o FastAPI validar
        pass
    
    response = await call_next(request)
    return response


# ==================== SECURITY HEADERS ====================

async def security_headers_middleware(request: Request, call_next):
    """
    Adiciona headers de segurança
    """
    response = await call_next(request)
    
    # Security headers
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    
    return response
