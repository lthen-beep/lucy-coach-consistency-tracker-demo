'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TrendChart({ data, label, question }: { data: number[]; label?: string; question?: string }) {
  const chartData = data.map((val, i) => ({ day: `D${i + 1}`, value: val }));

  return (
    <div>
      {label && <p className="text-xs font-medium text-stone-400 uppercase tracking-wide mb-1">{label}</p>}
      {question && <p className="text-xs text-stone-400 italic mb-2">{question}</p>}
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
          <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#a8a29e' }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#a8a29e' }} />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e7e5e4' }}
            labelStyle={{ color: '#78716c' }}
          />
          <Line type="monotone" dataKey="value" stroke="#5eead4" strokeWidth={2} dot={{ r: 2, fill: '#5eead4' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
