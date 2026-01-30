/**
 * COMPONENTE: StatusBadge
 * Badge visual de status (verde/amarelo/vermelho)
 */

import { ComponentType } from 'react';

interface StatusBadgeProps {
  status: 'healthy' | 'warning' | 'critical';
  label: string;
  icon?: ComponentType<any> | null;
}

export default function StatusBadge({ status, label, icon: Icon }: StatusBadgeProps) {
  const statusColors = {
    healthy: 'bg-primary/20 text-primary border border-primary/30',
    warning: 'bg-primary/20 text-primary border border-primary/30',
    critical: 'bg-primary/20 text-primary border border-primary/30',
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${statusColors[status]}`}>
      {Icon && <Icon size={16} />}
      {label}
    </div>
  );
}
