'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function FrictionBars({
  data,
  question,
}: {
  data: { name: string; value: number }[];
  question?: string;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-stone-400 uppercase tracking-wide mb-1">Fricciones principales</p>
      {question && <p className="text-xs text-stone-400 italic mb-2">{question}</p>}
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} layout="vertical" margin={{ left: 80 }}>
          <XAxis type="number" tick={{ fontSize: 10, fill: '#a8a29e' }} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#78716c' }} width={80} />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e7e5e4' }} />
          <Bar dataKey="value" fill="#fed7aa" radius={[0, 4, 4, 0]} barSize={14} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
