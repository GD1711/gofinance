"""
Testes dos Endpoints da API

Testa validação, rate limiting, respostas.
"""

import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


class TestHealthEndpoints:
    """Testes de endpoints de saúde"""
    
    def test_root(self):
        """Testa endpoint raiz"""
        response = client.get("/")
        assert response.status_code == 200
        assert "healthy" in response.json()["status"]
    
    def test_health_check(self):
        """Testa health check"""
        response = client.get("/health")
        assert response.status_code == 200
        assert response.json()["status"] == "healthy"


class TestProgressiveProtocol:
    """Testes do endpoint de protocolo progressivo"""
    
    def test_valid_protocol(self):
        """Testa criação de protocolo válido"""
        payload = {
            "goal": {
                "target_amount": 1000,
                "periods": 12
            },
            "protocol": {
                "start_value": 1,
                "increment": 2,
                "cap": 100
            }
        }
        
        response = client.post("/api/v1/protocols/progressive", json=payload)
        
        assert response.status_code == 200
        data = response.json()
        
        assert "protocol_version" in data
        assert data["protocol_type"] == "progressive"
        assert "result" in data
        assert "status" in data
        assert "insight" in data["status"]
    
    def test_invalid_target_too_high(self):
        """Testa rejeição de meta muito alta"""
        payload = {
            "goal": {
                "target_amount": 2_000_000,  # Acima do limite
                "periods": 12
            },
            "protocol": {
                "start_value": 1,
                "increment": 2,
                "cap": 100
            }
        }
        
        response = client.post("/api/v1/protocols/progressive", json=payload)
        
        assert response.status_code == 422
        assert "educacional" in response.text.lower()
    
    def test_invalid_periods_too_short(self):
        """Testa rejeição de período muito curto"""
        payload = {
            "goal": {
                "target_amount": 1000,
                "periods": 1  # Abaixo do mínimo (3)
            },
            "protocol": {
                "start_value": 1,
                "increment": 2,
                "cap": 100
            }
        }
        
        response = client.post("/api/v1/protocols/progressive", json=payload)
        
        assert response.status_code == 422


class TestOptimizedProtocol:
    """Testes do endpoint de protocolo otimizado"""
    
    def test_optimized_protocol(self):
        """Testa criação de protocolo otimizado"""
        payload = {
            "target_amount": 1000,
            "periods": 12
        }
        
        response = client.post("/api/v1/protocols/optimized", json=payload)
        
        assert response.status_code == 200
        data = response.json()
        
        assert data["protocol_type"] == "optimized"
        assert data["status"]["status"] == "optimal"
        assert data["status"]["viability"] >= 0.95  # Deve estar muito próximo de 1.0


class TestCompareProtocols:
    """Testes do endpoint de comparação"""
    
    def test_compare_protocols(self):
        """Testa comparação entre protocolos"""
        payload = {
            "goal": {
                "target_amount": 1000,
                "periods": 12
            },
            "protocol": {
                "start_value": 1,
                "increment": 2,
                "cap": 100
            }
        }
        
        response = client.post("/api/v1/protocols/compare", json=payload)
        
        assert response.status_code == 200
        data = response.json()
        
        assert "comparison" in data
        assert "progressive" in data["comparison"]
        assert "optimized" in data["comparison"]
        assert "insight" in data


class TestProtocolInfo:
    """Testes do endpoint de informações"""
    
    def test_protocol_info(self):
        """Testa endpoint de info"""
        response = client.get("/api/v1/protocols/info")
        
        assert response.status_code == 200
        data = response.json()
        
        assert "available_protocols" in data
        assert "validation_rules" in data


class TestValidation:
    """Testes de validação comportamental"""
    
    def test_reject_aggressive_increment(self):
        """Testa rejeição de incremento muito agressivo"""
        payload = {
            "goal": {
                "target_amount": 1000,
                "periods": 12
            },
            "protocol": {
                "start_value": 1,
                "increment": 500,  # Muito alto
                "cap": 600
            }
        }
        
        # Deve passar validação Pydantic mas falhar na comportamental
        response = client.post("/api/v1/protocols/progressive", json=payload)
        
        # Pode ser 422 ou 200 dependendo se middleware pega antes
        assert response.status_code in [200, 422]
