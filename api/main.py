"""
Financial Protocol API - Motor de Decisão Financeira

Não é CRUD de planilha.
É infraestrutura educacional de comportamento financeiro.

Responsabilidades:
✓ Validar metas (valor × período)
✓ Garantir coerência matemática
✓ Aplicar regras comportamentais
✓ Retornar dados + interpretação
✓ Nunca expor cálculos brutos
"""

from fastapi import FastAPI, HTTPException, Request, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from typing import Dict, Any

from schemas import (
    GoalInput,
    ProgressiveProtocolInput,
    ProtocolRequest,
    ProtocolResponse,
    ProtocolStatus,
    ValidationError,
    HealthResponse
)
from engine import (
    ProgressiveEngine,
    generate_insight,
    generate_recommendation,
    classify_status,
    interpret_viability,
    generate_comparative_insight,
    generate_maturity_message
)


# ==================== CONFIGURAÇÃO ====================

app = FastAPI(
    title="Financial Protocol API",
    description=(
        "API de Governança Financeira Educacional\n\n"
        "Não incentiva risco. Não promete retorno. "
        "Não infantiliza. Não expõe cálculo. "
        "Forma mentalidade."
    ),
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS para permitir front-end
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, especificar domínios
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==================== EXCEPTION HANDLERS ====================

@app.exception_handler(ValueError)
async def value_error_handler(request: Request, exc: ValueError):
    """Handler para erros de validação"""
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=ValidationError(
            decision="rejected",
            reason=str(exc),
            suggestion="Revise os parâmetros do protocolo."
        ).model_dump()
    )


@app.exception_handler(Exception)
async def general_error_handler(request: Request, exc: Exception):
    """Handler para erros gerais"""
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "protocol_version": "1.0",
            "decision": "rejected",
            "reason": "Erro interno no processamento.",
            "suggestion": "Tente novamente em alguns instantes."
        }
    )


# ==================== ENDPOINTS ====================

@app.get("/", response_model=HealthResponse)
async def root():
    """Health check da API"""
    return HealthResponse(
        status="healthy",
        version="1.0.0",
        message="Financial Protocol API operacional. Acesse /docs para documentação."
    )


@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Verificação de saúde da API"""
    return HealthResponse(
        status="healthy",
        version="1.0.0",
        message="Sistema operacional."
    )


@app.post(
    "/api/v1/protocols/progressive",
    response_model=ProtocolResponse,
    summary="Criar Protocolo Progressivo",
    description=(
        "Cria um protocolo de economia progressiva com validação comportamental.\n\n"
        "**Regras:**\n"
        "- Meta validada (10 a 1.000.000)\n"
        "- Período razoável (3 a 120 meses)\n"
        "- Progressão com teto psicológico\n\n"
        "**Retorno:** Status + Insight (nunca números crus)"
    )
)
async def create_progressive_protocol(
    goal: GoalInput,
    protocol: ProgressiveProtocolInput
) -> ProtocolResponse:
    """
    Endpoint principal: Protocolo Progressivo
    
    Fluxo:
    1. Validação (Pydantic automática)
    2. Cálculo (Engine)
    3. Interpretação (Insights)
    4. Response estruturado
    """
    
    # Inicializa engine
    engine = ProgressiveEngine(
        target=goal.target_amount,
        periods=goal.periods
    )
    
    # Calcula progressão
    result = engine.calculate(
        start=protocol.start_value,
        increment=protocol.increment,
        cap=protocol.cap
    )
    
    # Calcula viabilidade
    viability = engine.calculate_viability(result.total)
    
    # Gera insights
    insight = generate_insight(result.total, goal.target_amount)
    recommendation = generate_recommendation(
        ratio=viability,
        periods=goal.periods,
        average=result.average
    )
    status_value = classify_status(viability)
    
    # Monta response
    return ProtocolResponse(
        protocol_version="1.0",
        protocol_type="progressive",
        goal={
            "target_amount": goal.target_amount,
            "periods": goal.periods
        },
        result={
            "total_accumulated": result.total,
            "periods_completed": result.periods,
            "average_per_period": result.average,
            "peak_value": result.peak
        },
        status=ProtocolStatus(
            status=status_value,
            viability=round(viability, 3),
            insight=insight,
            recommendation=recommendation
        )
    )


@app.post(
    "/api/v1/protocols/optimized",
    response_model=ProtocolResponse,
    summary="Criar Protocolo Otimizado",
    description=(
        "Calcula protocolo otimizado matematicamente para atingir meta exata.\n\n"
        "**Diferencial:** Resolve equação de PA para ajustar incrementos automaticamente."
    )
)
async def create_optimized_protocol(goal: GoalInput) -> ProtocolResponse:
    """
    Endpoint: Protocolo Otimizado
    
    Calcula automaticamente os parâmetros ideais
    para atingir a meta exata.
    """
    
    # Inicializa engine
    engine = ProgressiveEngine(
        target=goal.target_amount,
        periods=goal.periods
    )
    
    # Calcula progressão otimizada
    result = engine.optimize()
    
    # Calcula viabilidade (deve ser ~1.0)
    viability = engine.calculate_viability(result.total)
    
    # Gera insights
    insight = generate_insight(result.total, goal.target_amount)
    recommendation = "Protocolo otimizado matematicamente. Siga a progressão sugerida."
    status_value = "optimal"
    
    # Mensagem de maturidade
    maturity_msg = generate_maturity_message(goal.periods)
    
    return ProtocolResponse(
        protocol_version="1.0",
        protocol_type="optimized",
        goal={
            "target_amount": goal.target_amount,
            "periods": goal.periods
        },
        result={
            "total_accumulated": result.total,
            "periods_completed": result.periods,
            "average_per_period": result.average,
            "peak_value": result.peak,
            "maturity_insight": maturity_msg
        },
        status=ProtocolStatus(
            status=status_value,
            viability=round(viability, 3),
            insight=insight,
            recommendation=recommendation
        )
    )


@app.post(
    "/api/v1/protocols/compare",
    summary="Comparar Protocolos",
    description="Compara protocolo progressivo vs otimizado para mostrar diferenças."
)
async def compare_protocols(
    goal: GoalInput,
    protocol: ProgressiveProtocolInput
) -> Dict[str, Any]:
    """
    Compara protocolo manual vs otimizado
    
    Útil para mostrar ao usuário o potencial de otimização.
    """
    
    engine = ProgressiveEngine(
        target=goal.target_amount,
        periods=goal.periods
    )
    
    # Calcula ambos
    progressive = engine.calculate(
        start=protocol.start_value,
        increment=protocol.increment,
        cap=protocol.cap
    )
    
    optimized = engine.optimize()
    
    # Gera insight comparativo
    comparative = generate_comparative_insight(
        progressive_total=progressive.total,
        optimized_total=optimized.total,
        target=goal.target_amount
    )
    
    return {
        "protocol_version": "1.0",
        "comparison": {
            "progressive": {
                "total": progressive.total,
                "viability": round(progressive.total / goal.target_amount, 3),
                "status": classify_status(progressive.total / goal.target_amount)
            },
            "optimized": {
                "total": optimized.total,
                "viability": round(optimized.total / goal.target_amount, 3),
                "status": "optimal"
            }
        },
        "insight": comparative,
        "recommendation": (
            "Protocolo otimizado" 
            if optimized.total > progressive.total 
            else "Protocolo progressivo adequado"
        )
    }


@app.get("/api/v1/protocols/info")
async def protocol_info() -> Dict[str, Any]:
    """
    Informações sobre os protocolos disponíveis
    """
    return {
        "protocol_version": "1.0",
        "available_protocols": [
            {
                "type": "progressive",
                "description": "Progressão personalizada com teto psicológico",
                "parameters": ["start_value", "increment", "cap"]
            },
            {
                "type": "optimized",
                "description": "Progressão matemática otimizada",
                "parameters": ["automatic"]
            }
        ],
        "validation_rules": {
            "target_amount": "10 a 1.000.000 (escopo educacional)",
            "periods": "3 a 120 meses",
            "start_value": "1 a 100",
            "increment": "0.5 a 50",
            "cap": "10 a 2000"
        }
    }


# ==================== LOGS E GOVERNANÇA ====================

@app.middleware("http")
async def log_decisions(request: Request, call_next):
    """
    Middleware para log de decisões (não de valores)
    
    Em produção, enviar para sistema de observabilidade.
    """
    start_time = datetime.now()
    
    response = await call_next(request)
    
    duration = (datetime.now() - start_time).total_seconds()
    
    # Log estruturado (não contém valores sensíveis)
    log_entry = {
        "timestamp": start_time.isoformat(),
        "method": request.method,
        "path": request.url.path,
        "status_code": response.status_code,
        "duration_ms": round(duration * 1000, 2),
        "decision": "processed" if response.status_code < 400 else "rejected"
    }
    
    # Em produção: enviar para CloudWatch, Datadog, etc.
    print(f"[LOG] {log_entry}")
    
    return response


# ==================== STARTUP ====================

if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
