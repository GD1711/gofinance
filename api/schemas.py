"""
API Schemas - Validação Comportamental

Não é só tipagem. É governança educacional.
Se o dado passou por aqui, ele está matematicamente e psicologicamente válido.
"""

from pydantic import BaseModel, Field, field_validator
from typing import Optional, Literal
from datetime import datetime


class GoalInput(BaseModel):
    """
    Validação de Meta Financeira
    
    Regras:
    - Valor > 0
    - Período razoável (1-120 meses = 10 anos máx)
    - Meta não absurda (teto educacional)
    """
    target_amount: float = Field(
        ..., 
        gt=0, 
        description="Valor alvo da meta financeira"
    )
    periods: int = Field(
        ..., 
        gt=0, 
        le=120,
        description="Número de períodos (1-120 meses)"
    )
    
    @field_validator("target_amount")
    @classmethod
    def validate_target(cls, v: float) -> float:
        """Valida que a meta está dentro do escopo educacional"""
        if v > 1_000_000:
            raise ValueError(
                "Meta fora do escopo educacional. "
                "Este sistema constrói constância, não promete riqueza."
            )
        if v < 10:
            raise ValueError(
                "Meta muito baixa para formar padrão comportamental. "
                "Mínimo: R$ 10"
            )
        return v
    
    @field_validator("periods")
    @classmethod
    def validate_periods(cls, v: int) -> int:
        """Valida que o período é razoável"""
        if v < 3:
            raise ValueError(
                "Período muito curto. "
                "Comportamento requer no mínimo 3 ciclos para se formar."
            )
        return v


class ProgressiveProtocolInput(BaseModel):
    """
    Protocolo Progressivo - Validação de Parâmetros
    
    Regras:
    - Valor inicial simbólico mas positivo
    - Incremento progressivo consistente
    - Teto máximo (barreira psicológica)
    """
    start_value: float = Field(
        default=1.0, 
        ge=1.0, 
        le=100.0,
        description="Valor inicial (simbólico)"
    )
    increment: float = Field(
        default=1.0, 
        ge=0.5, 
        le=50.0,
        description="Incremento por período"
    )
    cap: float = Field(
        default=500.0, 
        ge=10.0, 
        le=2000.0,
        description="Teto máximo (barreira psicológica)"
    )
    
    @field_validator("cap")
    @classmethod
    def validate_cap(cls, v: float, info) -> float:
        """Garante que o teto é coerente com o início"""
        start = info.data.get('start_value', 1.0)
        if v <= start:
            raise ValueError(
                "O teto precisa ser maior que o valor inicial. "
                "Progressão requer crescimento."
            )
        return v


class ProtocolRequest(BaseModel):
    """Request completo para criar protocolo"""
    goal: GoalInput
    protocol: ProgressiveProtocolInput
    
    class Config:
        json_schema_extra = {
            "example": {
                "goal": {
                    "target_amount": 1000.0,
                    "periods": 12
                },
                "protocol": {
                    "start_value": 1.0,
                    "increment": 2.0,
                    "cap": 100.0
                }
            }
        }


class ProtocolStatus(BaseModel):
    """Status do protocolo"""
    status: Literal["reached", "in_progress", "incomplete", "optimal"]
    viability: float = Field(
        ge=0.0, 
        le=1.0, 
        description="Taxa de viabilidade (0-1)"
    )
    insight: str = Field(description="Interpretação comportamental")
    recommendation: Optional[str] = Field(
        None, 
        description="Recomendação estratégica"
    )


class ProtocolResponse(BaseModel):
    """
    Response da API - Dados + Interpretação
    
    NUNCA expõe cálculos brutos.
    Sempre retorna status + insight.
    """
    protocol_version: str = Field(default="1.0")
    protocol_type: Literal["progressive", "optimized"]
    
    goal: dict = Field(description="Meta original")
    result: dict = Field(description="Resultado calculado")
    status: ProtocolStatus
    
    created_at: datetime = Field(default_factory=datetime.now)
    
    class Config:
        json_schema_extra = {
            "example": {
                "protocol_version": "1.0",
                "protocol_type": "progressive",
                "goal": {
                    "target_amount": 1000.0,
                    "periods": 12
                },
                "result": {
                    "total_accumulated": 858.0,
                    "periods_completed": 12
                },
                "status": {
                    "status": "in_progress",
                    "viability": 0.858,
                    "insight": "Ritmo sólido. O sistema está funcionando.",
                    "recommendation": "Continue operando. Maturidade em desenvolvimento."
                },
                "created_at": "2026-01-30T10:30:00"
            }
        }


class ValidationError(BaseModel):
    """Erro de validação estruturado"""
    protocol_version: str = Field(default="1.0")
    decision: Literal["rejected"]
    reason: str
    field: Optional[str] = None
    suggestion: Optional[str] = None
    
    created_at: datetime = Field(default_factory=datetime.now)


class HealthResponse(BaseModel):
    """Health check da API"""
    status: Literal["healthy", "degraded"]
    version: str
    message: str
