import type { ReactNode } from 'react';

export default function MetricCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-stone-150 p-4 flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-stone-400 uppercase tracking-wide">{title}</span>
        {icon && <span className="text-stone-300">{icon}</span>}
      </div>
      <span className="text-2xl font-semibold text-stone-800">{value}</span>
      {subtitle && <span className="text-xs text-stone-400">{subtitle}</span>}
    </div>
  );
}
