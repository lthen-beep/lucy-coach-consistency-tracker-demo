'use client';

import { AlertTriangle, Activity, ShieldCheck, Users, CheckCircle, Eye } from 'lucide-react';
import MetricCard from '@/components/MetricCard';
import { pilotMetrics, mockClients } from '@/data/mockData';

const statusConfig = {
  green: { label: 'Verde — Continuar', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  amber: { label: 'Ámbar — Ajustar', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  red: { label: 'Rojo — Pausar y revisar', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
};

export default function AdminDashboard() {
  const m = pilotMetrics;
  const status = statusConfig[m.pilotStatus];

  const noCheckIn3Days = mockClients.filter((c) => c.daysRegisteredThisWeek <= 1);
  const lowAdherence = mockClients.filter((c) => c.adherence < 50);
  const repeatedFriction = mockClients.filter((c) => c.frictionScore >= 50);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-stone-800 mb-1">Vista agregada del piloto</h1>
        <p className="text-sm text-stone-400">Métricas internas del sistema de consistencia.</p>
      </div>

      <div className={`${status.bg} ${status.border} border rounded-xl p-5 mb-6`}>
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck size={18} className={status.text} />
          <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'inherit' }}>
            <span className={status.text}>Estado del piloto</span>
          </p>
        </div>
        <p className={`text-lg font-semibold ${status.text}`}>{status.label}</p>
        <p className="text-xs text-stone-500 mt-1">{m.pilotStatusReason}</p>
      </div>

      <section className="mb-8">
        <h2 className="text-sm font-semibold text-stone-600 uppercase tracking-wide mb-4 flex items-center gap-2">
          <Activity size={16} />
          Engagement
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <MetricCard
            title="Clientes activos"
            value={`${m.activeClients} de ${m.totalClients}`}
            subtitle={`${Math.round((m.activeClients / m.totalClients) * 100)}% activos`}
            icon={<Users size={16} />}
          />
          <MetricCard
            title="Check-ins totales"
            value={m.totalCheckIns}
            icon={<CheckCircle size={16} />}
          />
          <MetricCard
            title="Clientes con 4+ check-ins"
            value={`${m.clientsWith4Plus} de ${m.totalClients}`}
            subtitle={`${Math.round((m.clientsWith4Plus / m.totalClients) * 100)}%`}
          />
          <MetricCard
            title="Tasa check-in semanal"
            value={`${Math.round(m.weeklyCheckInRate * 100)}%`}
          />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-sm font-semibold text-stone-600 uppercase tracking-wide mb-4 flex items-center gap-2">
          <Eye size={16} />
          Seguridad emocional
        </h2>
        <p className="text-xs text-stone-400 mb-4">Datos agregados de la microencuesta. No se muestran respuestas individuales.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div className="bg-white rounded-xl border border-stone-200 p-4">
            <p className="text-xs text-stone-400 mb-2">La herramienta se sintió:</p>
            <div className="space-y-1.5">
              {Object.entries(m.toolFeelingBreakdown).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-stone-600 capitalize">{key}</span>
                  <span className="text-sm font-medium text-stone-700">{val}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-stone-200 p-4">
            <p className="text-xs text-stone-400 mb-2">Se sintió como:</p>
            <div className="space-y-1.5">
              {Object.entries(m.toolPerceptionBreakdown).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-stone-600 capitalize">{key === 'acompanamiento' ? 'acompañamiento' : key}</span>
                  <span className="text-sm font-medium text-stone-700">{val}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-stone-200 p-4">
            <p className="text-xs text-stone-400 mb-2">Tasa de omisión:</p>
            <p className="text-2xl font-semibold text-stone-700">{Math.round(m.microSurveyOmissionRate * 100)}%</p>
          </div>
        </div>

        {m.hasVigilanciaSignal && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle size={18} className="text-rose-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-rose-700">1 señal de vigilancia reportada</p>
              <p className="text-xs text-rose-600 mt-0.5">
                Revisar lenguaje, frecuencia y onboarding antes de intervenir individualmente.
              </p>
            </div>
          </div>
        )}
      </section>

      <section className="mb-8">
        <h2 className="text-sm font-semibold text-stone-600 uppercase tracking-wide mb-4 flex items-center gap-2">
          <AlertTriangle size={16} />
          Clientes en riesgo
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div className="bg-white rounded-xl border border-stone-200 p-4">
            <p className="text-xs text-stone-400 mb-2">Sin registrar 3+ días</p>
            {noCheckIn3Days.length > 0 ? (
              <ul className="space-y-1">
                {noCheckIn3Days.map((c) => (
                  <li key={c.id} className="text-sm text-stone-600">{c.name}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-stone-400 italic">Ninguno</p>
            )}
          </div>
          <div className="bg-white rounded-xl border border-stone-200 p-4">
            <p className="text-xs text-stone-400 mb-2">Baja adherencia sostenida</p>
            {lowAdherence.length > 0 ? (
              <ul className="space-y-1">
                {lowAdherence.map((c) => (
                  <li key={c.id} className="text-sm text-stone-600">{c.name} — {c.adherence}%</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-stone-400 italic">Ninguno</p>
            )}
          </div>
          <div className="bg-white rounded-xl border border-stone-200 p-4">
            <p className="text-xs text-stone-400 mb-2">Fricción repetida</p>
            {repeatedFriction.length > 0 ? (
              <ul className="space-y-1">
                {repeatedFriction.map((c) => (
                  <li key={c.id} className="text-sm text-stone-600">{c.name} — {c.mainFriction}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-stone-400 italic">Ninguno</p>
            )}
          </div>
        </div>
      </section>

      <div className="bg-stone-100 rounded-xl p-4 text-center">
        <p className="text-xs text-stone-400">Esta vista es interna. No es reporte para clientes ni para terceros.</p>
      </div>
    </div>
  );
}
