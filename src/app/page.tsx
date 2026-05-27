import Link from 'next/link';
import { User, Stethoscope, Shield } from 'lucide-react';

const surfaces = [
  {
    title: 'Cliente',
    description: 'Dashboard personal, check-ins diarios y semanales, Lucy Insights.',
    href: '/cliente',
    icon: User,
  },
  {
    title: 'Nutricionista',
    description: 'Vista de clientes, patrones del proceso, prioridades de intervención.',
    href: '/nutricionista',
    icon: Stethoscope,
  },
  {
    title: 'Admin',
    description: 'Vista agregada del piloto, métricas de engagement, seguridad emocional.',
    href: '/admin',
    icon: Shield,
  },
];

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-3xl font-semibold text-stone-800 mb-2">Lucy Coach Consistency Tracker</h1>
        <p className="text-sm text-stone-400 mb-10 max-w-md mx-auto">
          Demo interactivo del sistema de seguimiento de consistencia. Frontend-only, datos simulados.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {surfaces.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.href}
                href={s.href}
                className="bg-white rounded-xl border border-stone-200 p-6 text-left hover:border-stone-300 hover:shadow-sm transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-stone-50 flex items-center justify-center mb-4 group-hover:bg-stone-100 transition-colors">
                  <Icon size={20} className="text-stone-500" />
                </div>
                <h2 className="text-base font-semibold text-stone-800 mb-1">{s.title}</h2>
                <p className="text-xs text-stone-400 leading-relaxed">{s.description}</p>
              </Link>
            );
          })}
        </div>

        <p className="text-[10px] text-stone-300 mt-10">
          Concepto visual interno. No es producto final. Sin datos reales.
        </p>
      </div>
    </div>
  );
}
