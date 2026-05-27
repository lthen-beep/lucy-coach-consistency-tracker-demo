'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const pillars = [
  { key: 'adherence', label: 'Adherencia ETM', color: '#5eead4' },
  { key: 'supplementation', label: 'Suplementación', color: '#a7f3d0' },
  { key: 'hydration', label: 'Hidratación', color: '#bae6fd' },
  { key: 'wellbeing', label: 'Bienestar', color: '#fde68a' },
  { key: 'friction', label: 'Fricciones', color: '#fed7aa' },
];

export default function PillarBars({
  data,
  question,
}: {
  data: { adherence: number; supplementation: number; hydration: number; wellbeing: number; friction: number };
  question?: string;
}) {
  const chartData = pillars.map((p) => ({
    name: p.label,
    value: data[p.key as keyof typeof data],
    color: p.color,
  }));

  return (
    <div>
      <p className="text-xs font-medium text-stone-400 uppercase tracking-wide mb-1">Pilares semanales</p>
      {question && <p className="text-xs text-stone-400 italic mb-2">{question}</p>}
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={chartData} layout="vertical" margin={{ left: 80 }}>
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: '#a8a29e' }} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#78716c' }} width={80} />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e7e5e4' }} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={16}>
            {chartData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
