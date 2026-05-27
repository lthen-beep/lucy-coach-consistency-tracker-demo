import type { SupStatus } from '@/data/mockData';

const dayLabels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

const statusConfig: Record<SupStatus, { bg: string; label: string }> = {
  completo: { bg: 'bg-teal-200', label: 'Completo' },
  parcial: { bg: 'bg-amber-200', label: 'Parcial' },
  no: { bg: 'bg-stone-200', label: 'No' },
};

export default function SupplementMatrix({ data, question }: { data: SupStatus[]; question?: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-stone-400 uppercase tracking-wide mb-1">Matriz de suplementación</p>
      {question && <p className="text-xs text-stone-400 italic mb-2">{question}</p>}
      <div className="flex gap-2 mt-2">
        {data.map((status, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="text-[10px] text-stone-400">{dayLabels[i]}</span>
            <div
              className={`w-8 h-8 rounded-md ${statusConfig[status].bg} flex items-center justify-center`}
              title={statusConfig[status].label}
            >
              <span className="text-[10px] font-medium text-stone-600">
                {status === 'completo' ? 'C' : status === 'parcial' ? 'P' : '—'}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 mt-2">
        {Object.entries(statusConfig).map(([key, cfg]) => (
          <div key={key} className="flex items-center gap-1">
            <div className={`w-3 h-3 rounded-sm ${cfg.bg}`} />
            <span className="text-[10px] text-stone-400">{cfg.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
