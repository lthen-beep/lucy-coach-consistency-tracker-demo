'use client';

import Link from 'next/link';
import { Droplets, Pill, Heart, AlertTriangle, ClipboardCheck, CalendarDays } from 'lucide-react';
import BandBadge from '@/components/BandBadge';
import MetricCard from '@/components/MetricCard';
import InsightCard from '@/components/InsightCard';
import Heatmap from '@/components/Heatmap';
import { currentClient } from '@/data/mockData';

export default function ClienteDashboard() {
  const c = currentClient;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-stone-800 mb-1">Hola, {c.name.split(' ')[0]}</h1>
        <p className="text-sm text-stone-400">{c.totalDaysRegistered} días registrados en tu proceso</p>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 p-5 mb-6">
        <p className="text-xs text-stone-400 uppercase tracking-wide mb-2">Banda semanal</p>
        <BandBadge band={c.band} size="lg" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        <MetricCard
          title="Adherencia ETM"
          value={`${c.adherence}%`}
          icon={<ClipboardCheck size={16} />}
        />
        <MetricCard
          title="Hidratación"
          value={`${c.hydration}%`}
          icon={<Droplets size={16} />}
        />
        <MetricCard
          title="Suplementación"
          value={`${c.supplementation}%`}
          icon={<Pill size={16} />}
        />
        <MetricCard
          title="Bienestar"
          value={`${c.wellbeing}%`}
          icon={<Heart size={16} />}
        />
        <MetricCard
          title="Fricciones"
          value={c.mainFriction}
          subtitle={`Score: ${c.frictionScore}`}
          icon={<AlertTriangle size={16} />}
        />
      </div>

      <InsightCard
        title="Lucy Insights"
        message="Esta semana hubo más estructura en los días donde registraste temprano. No buscamos perfección; buscamos señales que ayuden a ajustar el sistema."
      />

      <div className="bg-white rounded-xl border border-stone-200 p-5 mt-6">
        <div className="flex items-center gap-2 mb-3">
          <CalendarDays size={16} className="text-stone-400" />
          <p className="text-xs font-medium text-stone-400 uppercase tracking-wide">Consistencia mensual</p>
        </div>
        <Heatmap data={c.heatmapData} />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <Link
          href="/cliente/checkin-diario"
          className="flex-1 text-center px-5 py-3 rounded-xl bg-stone-800 text-white text-sm font-medium hover:bg-stone-700 transition-colors"
        >
          Hacer check-in diario
        </Link>
        <Link
          href="/cliente/checkin-semanal"
          className="flex-1 text-center px-5 py-3 rounded-xl border border-stone-300 text-stone-600 text-sm font-medium hover:bg-stone-50 transition-colors"
        >
          Cerrar mi semana
        </Link>
      </div>
    </div>
  );
}
