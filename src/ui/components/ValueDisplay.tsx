/**
 * COMPONENTE: ValueDisplay
 * Exibição de valores financeiros com hierarquia visual
 */

interface ValueDisplayProps {
  value: number;
  label: string;
  size?: 'small' | 'medium' | 'large';
  prefix?: string;
  suffix?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export default function ValueDisplay({
  value,
  label,
  size = 'medium',
  prefix = 'R$',
  suffix = '',
  trend,
  trendValue,
}: ValueDisplayProps) {
  const sizeClasses = {
    small: 'value-small',
    medium: 'value-medium',
    large: 'value-large',
  };

  const trendColors = {
    up: 'text-primary',
    down: 'text-primary',
    neutral: 'text-white/60',
  };

  const formatValue = (num: number) => {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Math.abs(num));
  };

  const isNegative = value < 0;

  return (
    <div className="space-y-1">
      <p className="text-secondary text-sm">{label}</p>
      <div className="flex items-baseline gap-2">
        <h2 className={`${sizeClasses[size]} ${isNegative ? 'text-primary' : 'text-primary'}`}>
          {isNegative && '-'}
          {prefix} {formatValue(value)}
          {suffix}
        </h2>
        {trend && trendValue && (
          <span className={`text-sm font-medium ${trendColors[trend]}`}>
            {trend === 'up' && '↑'}
            {trend === 'down' && '↓'}
            {trendValue}
          </span>
        )}
      </div>
    </div>
  );
}
