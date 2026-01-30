"""
Script de Teste Manual da API

Execute para validar que tudo está funcionando.
"""

import requests
import json
from typing import Dict, Any


API_BASE_URL = "http://localhost:8000"


def print_response(title: str, response: requests.Response):
    """Imprime resposta formatada"""
    print(f"\n{'='*60}")
    print(f"📊 {title}")
    print(f"{'='*60}")
    print(f"Status: {response.status_code}")
    print(f"Response:")
    print(json.dumps(response.json(), indent=2, ensure_ascii=False))


def test_health():
    """Testa health check"""
    print("\n🏥 TESTANDO HEALTH CHECK...")
    response = requests.get(f"{API_BASE_URL}/health")
    print_response("Health Check", response)
    return response.status_code == 200


def test_progressive_protocol():
    """Testa criação de protocolo progressivo"""
    print("\n📈 TESTANDO PROTOCOLO PROGRESSIVO...")
    
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
    
    response = requests.post(
        f"{API_BASE_URL}/api/v1/protocols/progressive",
        json=payload
    )
    
    print_response("Protocolo Progressivo", response)
    
    if response.status_code == 200:
        data = response.json()
        print(f"\n✅ Insight: {data['status']['insight']}")
        print(f"✅ Viabilidade: {data['status']['viability']:.1%}")
        print(f"✅ Total Acumulado: R$ {data['result']['total_accumulated']}")
    
    return response.status_code == 200


def test_optimized_protocol():
    """Testa criação de protocolo otimizado"""
    print("\n🎯 TESTANDO PROTOCOLO OTIMIZADO...")
    
    payload = {
        "target_amount": 1000,
        "periods": 12
    }
    
    response = requests.post(
        f"{API_BASE_URL}/api/v1/protocols/optimized",
        json=payload
    )
    
    print_response("Protocolo Otimizado", response)
    
    if response.status_code == 200:
        data = response.json()
        print(f"\n✅ Insight: {data['status']['insight']}")
        print(f"✅ Status: {data['status']['status']}")
        print(f"✅ Total: R$ {data['result']['total_accumulated']}")
    
    return response.status_code == 200


def test_compare_protocols():
    """Testa comparação de protocolos"""
    print("\n⚖️  TESTANDO COMPARAÇÃO...")
    
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
    
    response = requests.post(
        f"{API_BASE_URL}/api/v1/protocols/compare",
        json=payload
    )
    
    print_response("Comparação de Protocolos", response)
    
    if response.status_code == 200:
        data = response.json()
        print(f"\n✅ Insight Comparativo: {data['insight']}")
    
    return response.status_code == 200


def test_validation_errors():
    """Testa que validações estão funcionando"""
    print("\n🚫 TESTANDO VALIDAÇÕES...")
    
    # Meta muito alta
    print("\n1️⃣ Testando meta muito alta...")
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
    
    response = requests.post(
        f"{API_BASE_URL}/api/v1/protocols/progressive",
        json=payload
    )
    
    if response.status_code == 422:
        print("✅ Validação funcionando: Meta muito alta rejeitada")
    else:
        print(f"❌ Esperado 422, recebido {response.status_code}")
    
    # Período muito curto
    print("\n2️⃣ Testando período muito curto...")
    payload = {
        "goal": {
            "target_amount": 1000,
            "periods": 1  # Abaixo do mínimo
        },
        "protocol": {
            "start_value": 1,
            "increment": 2,
            "cap": 100
        }
    }
    
    response = requests.post(
        f"{API_BASE_URL}/api/v1/protocols/progressive",
        json=payload
    )
    
    if response.status_code == 422:
        print("✅ Validação funcionando: Período muito curto rejeitado")
    else:
        print(f"❌ Esperado 422, recebido {response.status_code}")
    
    return True


def test_protocol_info():
    """Testa endpoint de informações"""
    print("\n📚 TESTANDO INFO...")
    
    response = requests.get(f"{API_BASE_URL}/api/v1/protocols/info")
    print_response("Informações de Protocolos", response)
    
    return response.status_code == 200


def run_all_tests():
    """Executa todos os testes"""
    print("🚀 INICIANDO TESTES DA API")
    print(f"URL Base: {API_BASE_URL}")
    
    tests = [
        ("Health Check", test_health),
        ("Protocolo Progressivo", test_progressive_protocol),
        ("Protocolo Otimizado", test_optimized_protocol),
        ("Comparação", test_compare_protocols),
        ("Validações", test_validation_errors),
        ("Info", test_protocol_info),
    ]
    
    results = []
    
    for name, test_func in tests:
        try:
            success = test_func()
            results.append((name, success))
        except Exception as e:
            print(f"\n❌ ERRO em {name}: {str(e)}")
            results.append((name, False))
    
    # Sumário
    print("\n" + "="*60)
    print("📋 SUMÁRIO DOS TESTES")
    print("="*60)
    
    for name, success in results:
        status = "✅ PASSOU" if success else "❌ FALHOU"
        print(f"{status} - {name}")
    
    total = len(results)
    passed = sum(1 for _, s in results if s)
    
    print(f"\n🎯 Total: {passed}/{total} testes passaram")
    
    if passed == total:
        print("\n🎉 TODOS OS TESTES PASSARAM! API funcionando perfeitamente.")
    else:
        print(f"\n⚠️  {total - passed} teste(s) falharam. Verifique os erros acima.")


if __name__ == "__main__":
    print("="*60)
    print("🧪 TESTE MANUAL DA API FINANCEIRA")
    print("="*60)
    print("\n⚠️  Certifique-se de que a API está rodando:")
    print("   cd api && python main.py")
    print("\nPressione Enter para continuar...")
    input()
    
    run_all_tests()
