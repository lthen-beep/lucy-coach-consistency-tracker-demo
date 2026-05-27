'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, Calendar, Target } from 'lucide-react';
import BandBadge from '@/components/BandBadge';
import PriorityBadge from '@/components/PriorityBadge';
import InsightCard from '@/components/InsightCard';
import Heatmap from '@/components/Heatmap';
import TrendChart from '@/components/TrendChart';
import PillarBars from '@/components/PillarBars';
import FrictionBars from '@/components/FrictionBars';
import SupplementMatrix from '@/components/SupplementMatrix';
import { mockClients } from '@/data/mockData';

export default function ClientDetail({ params }: { params: Promise<{ clientId: string }> }) {
  const { clientId } = use(params);
  const client = mockClients.find((c) => c.id === clientId);

  if (!client) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-stone-400">Cliente no encontrado.</p>
        <Link href="/nutricionista" className="text-teal-600 text-sm mt-2 inline-block">Volver</Link>
      </div>
    );
  }

  const insufficientData = client.totalDaysRegistered < 14;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/nutricionista" className="flex items-center gap-1 text-sm text-stone-400 hover:text-stone-600 mb-6 transition-colors">
        <ArrowLeft size={16} />
        Volver a la lista
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-stone-800 mb-1">{client.name}</h1>
          <p className="text-xs text-stone-400 mb-2">{client.archetype}</p>
          <div className="flex items-center gap-3 flex-wrap">
            <BandBadge band={client.band} />
            <PriorityBadge priority={client.priority} />
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-stone-400">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              Último: {client.lastCheckIn}
            </span>
            <span className="flex items-center gap-1">
              <Target size={12} />
              {client.daysRegisteredThisWeek} días esta semana
            </span>
          </div>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium hover:bg-emerald-100 transition-colors"
          onClick={() => window.open(`https://wa.me/?text=Hola ${client.name.split(' ')[0]}, ¿cómo vas con tu proceso?`, '_blank')}
        >
          <MessageCircle size={16} />
          Enviar WhatsApp
        </button>
      </div>

      <div className="bg-teal-50 border border-teal-100 rounded-xl p-5 mb-6">
        <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-1">Foco de la semana</p>
        <p className="text-sm text-teal-800">{client.focusOfWeek}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-stone-200 p-5">
          <Heatmap data={client.heatmapData} label="Adherencia mensual" />
          <p className="text-xs text-stone-400 italic mt-3">
            {insufficientData
              ? 'Datos insuficientes para detectar patrón temporal.'
              : 'Adherencia más baja durante fin de semana. Observar si se repite la próxima semana.'}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-5">
          <TrendChart
            data={client.trendData}
            label="Tendencia de adherencia — 14 días"
            question="¿La tendencia sube, baja o se mantiene?"
          />
          <p className="text-xs text-stone-400 italic mt-3">
            {client.trendData[client.trendData.length - 1] > client.trendData[0]
              ? 'Tendencia ascendente en las últimas dos semanas.'
              : client.trendData[client.trendData.length - 1] < client.trendData[0] - 10
                ? 'Tendencia descendente. Revisar posibles causas en sesión.'
                : 'Tendencia estable. Mantener observación.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-stone-200 p-5">
          <PillarBars
            data={{
              adherence: client.adherence,
              supplementation: client.supplementation,
              hydration: client.hydration,
              wellbeing: client.wellbeing,
              friction: client.frictionScore,
            }}
            question="¿Qué pilar necesita más atención?"
          />
          <p className="text-xs text-stone-400 italic mt-3">
            {client.supplementation < 50
              ? 'Suplementación por debajo del 50%. Priorizar en la próxima conversación.'
              : client.hydration < 60
                ? 'Hidratación por debajo del promedio. Explorar barreras.'
                : 'Pilares dentro de rangos esperados.'}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-5">
          <FrictionBars
            data={client.frictionBreakdown}
            question="¿Qué fricciones se repiten más?"
          />
          <p className="text-xs text-stone-400 italic mt-3">
            {client.frictionBreakdown[0]
              ? `Fricción dominante: ${client.frictionBreakdown[0].name}. Reportada ${client.frictionBreakdown[0].value} veces esta semana.`
              : 'Sin fricciones significativas reportadas.'}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 p-5 mb-6">
        <SupplementMatrix
          data={client.supplementMatrix}
          question="¿Hay un patrón de omisión por día?"
        />
        <p className="text-xs text-stone-400 italic mt-3">
          {client.supplementMatrix.filter((s) => s === 'no').length > 3
            ? 'Omisión frecuente de suplementos. Explorar si es olvido, acceso o decisión.'
            : 'Suplementación relativamente consistente durante la semana.'}
        </p>
      </div>

      <div className="bg-stone-50 border border-stone-200 rounded-xl p-5">
        <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">Patrones del Proceso</p>
        <p className="text-xs text-stone-400 italic mb-3">Interpretación interna para el equipo. No es Lucy Insights.</p>
        {insufficientData ? (
          <p className="text-sm text-stone-500">Datos insuficientes para detectar patrón. Se necesitan al menos 14 días de registro.</p>
        ) : (
          <div className="space-y-2">
            <InsightCard
              title="Patrones del Proceso"
              message={client.weeklyInsight}
            />
          </div>
        )}
      </div>
    </div>
  );
}
