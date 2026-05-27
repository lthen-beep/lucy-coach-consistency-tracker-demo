import type { Band } from '@/data/mockData';

const bandConfig: Record<Band, { bg: string; text: string; dot: string }> = {
  'Sólida': { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-400' },
  'Consistente': { bg: 'bg-teal-50', text: 'text-teal-700', dot: 'bg-teal-400' },
  'En progreso': { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-400' },
  'Con fricción': { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-400' },
  'Reinicio activo': { bg: 'bg-stone-100', text: 'text-stone-600', dot: 'bg-stone-400' },
};

export default function BandBadge({ band, size = 'md' }: { band: Band; size?: 'sm' | 'md' | 'lg' }) {
  const config = bandConfig[band];
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${config.bg} ${config.text} ${sizeClasses[size]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {band}
    </span>
  );
}
