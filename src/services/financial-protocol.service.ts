/**
 * Financial Protocol Service
 * 
 * Serviço para integração com API Python de protocolos financeiros.
 * Não expõe cálculos. Consome insights.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_FINANCIAL_API_URL || 'http://localhost:8000';

export interface GoalInput {
  target_amount: number;
  periods: number;
}

export interface ProgressiveProtocolInput {
  start_value?: number;
  increment?: number;
  cap?: number;
}

export interface ProtocolResponse {
  protocol_version: string;
  protocol_type: 'progressive' | 'optimized';
  goal: GoalInput;
  result: {
    total_accumulated: number;
    periods_completed: number;
    average_per_period: number;
    peak_value: number;
    maturity_insight?: string;
  };
  status: {
    status: 'reached' | 'in_progress' | 'incomplete' | 'optimal';
    viability: number;
    insight: string;
    recommendation?: string;
  };
  created_at: string;
}

export interface ComparisonResponse {
  protocol_version: string;
  comparison: {
    progressive: {
      total: number;
      viability: number;
      status: string;
    };
    optimized: {
      total: number;
      viability: number;
      status: string;
    };
  };
  insight: string;
  recommendation: string;
}

export interface ProtocolInfo {
  protocol_version: string;
  available_protocols: Array<{
    type: string;
    description: string;
    parameters: string[];
  }>;
  validation_rules: {
    target_amount: string;
    periods: string;
    start_value: string;
    increment: string;
    cap: string;
  };
}

export class FinancialProtocolService {
  
  /**
   * Verifica se a API está disponível
   */
  static async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
  
  /**
   * Cria protocolo progressivo personalizado
   */
  static async createProgressiveProtocol(
    goal: GoalInput,
    protocol: ProgressiveProtocolInput = {}
  ): Promise<ProtocolResponse> {
    const response = await fetch(`${API_BASE_URL}/api/v1/protocols/progressive`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ goal, protocol })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.reason || 'Erro ao criar protocolo');
    }
    
    return response.json();
  }
  
  /**
   * Cria protocolo otimizado automaticamente
   */
  static async createOptimizedProtocol(
    goal: GoalInput
  ): Promise<ProtocolResponse> {
    const response = await fetch(`${API_BASE_URL}/api/v1/protocols/optimized`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(goal)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.reason || 'Erro ao criar protocolo');
    }
    
    return response.json();
  }
  
  /**
   * Compara protocolo manual vs otimizado
   */
  static async compareProtocols(
    goal: GoalInput,
    protocol: ProgressiveProtocolInput
  ): Promise<ComparisonResponse> {
    const response = await fetch(`${API_BASE_URL}/api/v1/protocols/compare`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ goal, protocol })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.reason || 'Erro ao comparar protocolos');
    }
    
    return response.json();
  }
  
  /**
   * Obtém informações sobre protocolos disponíveis
   */
  static async getProtocolInfo(): Promise<ProtocolInfo> {
    const response = await fetch(`${API_BASE_URL}/api/v1/protocols/info`);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar informações de protocolos');
    }
    
    return response.json();
  }
  
  /**
   * Formata viabilidade como porcentagem
   */
  static formatViability(viability: number): string {
    return `${(viability * 100).toFixed(1)}%`;
  }
  
  /**
   * Formata valor monetário
   */
  static formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }
  
  /**
   * Interpreta status em português
   */
  static translateStatus(status: string): string {
    const translations: Record<string, string> = {
      'reached': 'Meta Alcançada',
      'in_progress': 'Em Progresso',
      'incomplete': 'Incompleto',
      'optimal': 'Otimizado'
    };
    
    return translations[status] || status;
  }
}
