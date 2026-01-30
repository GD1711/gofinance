import * as simpleIcons from 'simple-icons';

export interface BrandSuggestion {
  name: string;
  displayName: string;
  category: string;
  icon?: any;
}

// Mapeamento de marcas populares com suas categorias
const POPULAR_BRANDS: Record<string, { displayName: string; category: string }> = {
  // Streaming
  netflix: { displayName: 'Netflix', category: 'Entretenimento' },
  spotify: { displayName: 'Spotify', category: 'Entretenimento' },
  disneyplus: { displayName: 'Disney+', category: 'Entretenimento' },
  primevideo: { displayName: 'Prime Video', category: 'Entretenimento' },
  hbomax: { displayName: 'HBO Max', category: 'Entretenimento' },
  youtube: { displayName: 'YouTube Premium', category: 'Entretenimento' },
  appletv: { displayName: 'Apple TV+', category: 'Entretenimento' },
  crunchyroll: { displayName: 'Crunchyroll', category: 'Entretenimento' },
  
  // Transporte
  uber: { displayName: 'Uber', category: 'Transporte' },
  lyft: { displayName: 'Lyft', category: 'Transporte' },
  99: { displayName: '99', category: 'Transporte' },
  
  // Alimentação
  ifood: { displayName: 'iFood', category: 'Alimentação' },
  rappi: { displayName: 'Rappi', category: 'Alimentação' },
  ubereats: { displayName: 'Uber Eats', category: 'Alimentação' },
  mcdonalds: { displayName: "McDonald's", category: 'Alimentação' },
  starbucks: { displayName: 'Starbucks', category: 'Alimentação' },
  subway: { displayName: 'Subway', category: 'Alimentação' },
  burgerking: { displayName: 'Burger King', category: 'Alimentação' },
  
  // Compras
  amazon: { displayName: 'Amazon', category: 'Compras' },
  mercadolivre: { displayName: 'Mercado Livre', category: 'Compras' },
  magazineluiza: { displayName: 'Magazine Luiza', category: 'Compras' },
  americanas: { displayName: 'Americanas', category: 'Compras' },
  shopee: { displayName: 'Shopee', category: 'Compras' },
  aliexpress: { displayName: 'AliExpress', category: 'Compras' },
  
  // Tecnologia
  apple: { displayName: 'Apple', category: 'Tecnologia' },
  google: { displayName: 'Google', category: 'Tecnologia' },
  microsoft: { displayName: 'Microsoft', category: 'Tecnologia' },
  samsung: { displayName: 'Samsung', category: 'Tecnologia' },
  playstation: { displayName: 'PlayStation', category: 'Tecnologia' },
  xbox: { displayName: 'Xbox', category: 'Tecnologia' },
  nintendo: { displayName: 'Nintendo', category: 'Tecnologia' },
  steam: { displayName: 'Steam', category: 'Tecnologia' },
  
  // Telecomunicações
  vivo: { displayName: 'Vivo', category: 'Telecomunicações' },
  tim: { displayName: 'TIM', category: 'Telecomunicações' },
  claro: { displayName: 'Claro', category: 'Telecomunicações' },
  oi: { displayName: 'Oi', category: 'Telecomunicações' },
  
  // Saúde e Fitness
  gympass: { displayName: 'Gympass', category: 'Saúde' },
  smartfit: { displayName: 'Smart Fit', category: 'Saúde' },
  
  // Educação
  udemy: { displayName: 'Udemy', category: 'Educação' },
  coursera: { displayName: 'Coursera', category: 'Educação' },
  duolingo: { displayName: 'Duolingo', category: 'Educação' },
  
  // Serviços
  dropbox: { displayName: 'Dropbox', category: 'Serviços' },
  notion: { displayName: 'Notion', category: 'Serviços' },
  canva: { displayName: 'Canva', category: 'Serviços' },
  adobe: { displayName: 'Adobe', category: 'Serviços' },
};

export class BrandIconsService {
  /**
   * Busca marcas que correspondem ao termo de busca
   */
  static searchBrands(query: string): BrandSuggestion[] {
    if (!query || query.length < 1) {
      return [];
    }

    const normalizedQuery = query.toLowerCase().trim();
    const suggestions: BrandSuggestion[] = [];

    // Busca nas marcas populares
    Object.entries(POPULAR_BRANDS).forEach(([key, value]) => {
      if (
        key.includes(normalizedQuery) ||
        value.displayName.toLowerCase().includes(normalizedQuery)
      ) {
        suggestions.push({
          name: key,
          displayName: value.displayName,
          category: value.category,
        });
      }
    });

    // Ordena por relevância (começa com a query primeiro)
    suggestions.sort((a, b) => {
      const aStartsWith = a.name.startsWith(normalizedQuery) || 
                         a.displayName.toLowerCase().startsWith(normalizedQuery);
      const bStartsWith = b.name.startsWith(normalizedQuery) || 
                         b.displayName.toLowerCase().startsWith(normalizedQuery);
      
      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;
      return a.displayName.localeCompare(b.displayName);
    });

    return suggestions.slice(0, 5); // Retorna no máximo 5 sugestões
  }

  /**
   * Obtém a categoria sugerida para uma marca
   */
  static getCategoryForBrand(brandName: string): string | null {
    const brand = POPULAR_BRANDS[brandName.toLowerCase()];
    return brand ? brand.category : null;
  }

  /**
   * Verifica se um ícone existe no simple-icons
   */
  static hasIcon(brandName: string): boolean {
    const iconKey = `si${brandName.charAt(0).toUpperCase() + brandName.slice(1).toLowerCase()}`;
    // @ts-ignore
    return !!simpleIcons[iconKey];
  }

  /**
   * Obtém todas as marcas disponíveis
   */
  static getAllBrands(): BrandSuggestion[] {
    return Object.entries(POPULAR_BRANDS).map(([key, value]) => ({
      name: key,
      displayName: value.displayName,
      category: value.category,
    }));
  }

  /**
   * Obtém marcas por categoria
   */
  static getBrandsByCategory(category: string): BrandSuggestion[] {
    return Object.entries(POPULAR_BRANDS)
      .filter(([_, value]) => value.category === category)
      .map(([key, value]) => ({
        name: key,
        displayName: value.displayName,
        category: value.category,
      }));
  }
}
