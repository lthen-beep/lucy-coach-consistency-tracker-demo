'use client';

const levelColors = [
  'bg-stone-100',
  'bg-amber-100',
  'bg-amber-200',
  'bg-teal-200',
  'bg-teal-300',
  'bg-teal-400',
];

export default function Heatmap({ data, label }: { data: number[]; label?: string }) {
  return (
    <div>
      {label && <p className="text-xs font-medium text-stone-400 uppercase tracking-wide mb-2">{label}</p>}
      <div className="flex flex-wrap gap-1">
        {data.map((val, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-sm ${levelColors[Math.min(val, 5)]}`}
            title={`Día ${i + 1}: nivel ${val}`}
          />
        ))}
      </div>
      <div className="flex items-center gap-1 mt-2 text-[10px] text-stone-400">
        <span>Menos</span>
        {levelColors.map((c, i) => (
          <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
        ))}
        <span>Más</span>
      </div>
    </div>
  );
}
