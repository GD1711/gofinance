"""
Configuração da API

Variáveis de ambiente, settings, constantes.
"""

from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """
    Configurações da API
    
    Em produção, usar variáveis de ambiente.
    """
    
    # API
    api_title: str = "Financial Protocol API"
    api_version: str = "1.0.0"
    api_description: str = "API de Governança Financeira Educacional"
    
    # Server
    host: str = "0.0.0.0"
    port: int = 8000
    reload: bool = False
    workers: int = 4
    
    # CORS
    cors_origins: list = ["*"]
    
    # Rate Limiting
    rate_limit_per_minute: int = 60
    rate_limit_per_hour: int = 1000
    
    # Validação
    max_target_amount: float = 1_000_000.0
    min_target_amount: float = 10.0
    max_periods: int = 120
    min_periods: int = 3
    
    # Protocolo
    default_start_value: float = 1.0
    default_increment: float = 1.0
    default_cap: float = 500.0
    
    # Logging
    log_level: str = "info"
    
    # Database (futuro)
    database_url: Optional[str] = None
    
    # Redis (futuro)
    redis_url: Optional[str] = None
    
    # Auth (futuro)
    secret_key: Optional[str] = None
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


# Instância global
settings = Settings()


# ==================== CONSTANTES ====================

PROTOCOL_VERSION = "1.0"

# Mensagens de erro
ERROR_MESSAGES = {
    "target_too_high": "Meta fora do escopo educacional. Este sistema constrói constância, não promete riqueza.",
    "target_too_low": "Meta muito baixa para formar padrão comportamental.",
    "periods_too_short": "Período muito curto. Comportamento requer no mínimo 3 ciclos para se formar.",
    "periods_too_long": "Período muito longo. Protocolos educacionais funcionam melhor em horizontes de 3 meses a 5 anos.",
    "rate_limit": "Limite de requisições excedido. Aguarde antes de fazer nova requisição.",
    "validation_failed": "Validação comportamental falhou. Revise os parâmetros.",
}

# Limites de validação
VALIDATION_LIMITS = {
    "target_amount": {
        "min": settings.min_target_amount,
        "max": settings.max_target_amount
    },
    "periods": {
        "min": settings.min_periods,
        "max": settings.max_periods
    },
    "start_value": {
        "min": 1.0,
        "max": 100.0
    },
    "increment": {
        "min": 0.5,
        "max": 50.0
    },
    "cap": {
        "min": 10.0,
        "max": 2000.0
    }
}
