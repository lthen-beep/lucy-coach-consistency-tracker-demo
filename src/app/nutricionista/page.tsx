'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import BandBadge from '@/components/BandBadge';
import PriorityBadge from '@/components/PriorityBadge';
import { mockClients } from '@/data/mockData';

export default function NutricionistaDashboard() {
  const sorted = [...mockClients].sort((a, b) => {
    const order = { 'Revisar antes de sesión': 0, 'Necesita atención': 1, 'Observar': 2, 'Estable': 3 };
    return (order[a.priority] ?? 4) - (order[b.priority] ?? 4);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-stone-800 mb-1">Dashboard Nutricionista</h1>
        <p className="text-sm text-stone-400">Lectura rápida de clientes, patrones y prioridades de intervención.</p>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100">
                <th className="text-left px-4 py-3 text-xs font-medium text-stone-400 uppercase tracking-wide">Cliente</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-stone-400 uppercase tracking-wide">Estado</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-stone-400 uppercase tracking-wide">Último registro</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-stone-400 uppercase tracking-wide">Días/sem</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-stone-400 uppercase tracking-wide">Banda</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-stone-400 uppercase tracking-wide">Adh. ETM</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-stone-400 uppercase tracking-wide">Suplem.</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-stone-400 uppercase tracking-wide">Fricción</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-stone-400 uppercase tracking-wide">Acción sugerida</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((client) => (
                <tr key={client.id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/nutricionista/${client.id}`} className="font-medium text-stone-800 hover:text-teal-700 transition-colors">
                      {client.name}
                    </Link>
                    <p className="text-[10px] text-stone-400">{client.archetype}</p>
                  </td>
                  <td className="px-4 py-3">
                    <PriorityBadge priority={client.priority} />
                  </td>
                  <td className="px-4 py-3 text-stone-500 text-xs">{client.lastCheckIn}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-sm font-medium ${client.daysRegisteredThisWeek < 3 ? 'text-orange-500' : 'text-stone-700'}`}>
                      {client.daysRegisteredThisWeek}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <BandBadge band={client.band} size="sm" />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-sm font-medium ${client.adherence < 50 ? 'text-orange-500' : 'text-stone-700'}`}>
                      {client.adherence}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-sm font-medium ${client.supplementation < 40 ? 'text-orange-500' : 'text-stone-700'}`}>
                      {client.supplementation}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-stone-500">{client.mainFriction}</td>
                  <td className="px-4 py-3 text-xs text-stone-500 max-w-[200px]">{client.suggestedAction}</td>
                  <td className="px-4 py-3">
                    <button
                      title="Enviar WhatsApp"
                      className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center hover:bg-emerald-100 transition-colors"
                      onClick={() => window.open(`https://wa.me/?text=Hola ${client.name.split(' ')[0]}, ¿cómo vas con tu proceso esta semana?`, '_blank')}
                    >
                      <MessageCircle size={14} className="text-emerald-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
