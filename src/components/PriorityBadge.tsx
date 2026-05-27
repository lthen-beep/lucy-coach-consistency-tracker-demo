import type { Priority } from '@/data/mockData';

const priorityConfig: Record<Priority, { bg: string; text: string }> = {
  'Estable': { bg: 'bg-emerald-50', text: 'text-emerald-700' },
  'Observar': { bg: 'bg-amber-50', text: 'text-amber-700' },
  'Necesita atención': { bg: 'bg-orange-50', text: 'text-orange-700' },
  'Revisar antes de sesión': { bg: 'bg-rose-50', text: 'text-rose-700' },
};

export default function PriorityBadge({ priority }: { priority: Priority }) {
  const config = priorityConfig[priority];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {priority}
    </span>
  );
}
