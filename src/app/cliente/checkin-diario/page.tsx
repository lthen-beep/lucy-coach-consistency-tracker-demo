'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CheckInFlow from '@/components/CheckInFlow';
import type { FlowStep } from '@/components/CheckInFlow';
import { CheckCircle } from 'lucide-react';

const dailySteps: FlowStep[] = [
  {
    id: 'adherence',
    question: '¿Qué tan cerca estuviste hoy de tu plan?',
    type: 'single',
    options: ['Muy lejos', 'Lejos', 'Intermedio', 'Cerca', 'Muy cerca'],
  },
  {
    id: 'protein',
    question: '¿Cumpliste tu proteína aproximada?',
    type: 'single',
    options: ['Sí', 'Parcialmente', 'No', 'No estoy segura'],
  },
  {
    id: 'hydration',
    question: '¿Cómo estuvo tu hidratación?',
    type: 'single',
    options: ['Baja', 'Adecuada', 'Excelente'],
  },
  {
    id: 'supplements',
    question: '¿Cómo estuvieron tus suplementos?',
    type: 'single',
    options: ['Todos completos', 'Parciales', 'Ninguno hoy', 'N/A'],
  },
  {
    id: 'wellbeing',
    question: '¿Cómo te sentiste hoy?',
    subtitle: 'Energía, ánimo, claridad — todo junto',
    type: 'single',
    options: ['Bajo', 'Regular', 'Neutro', 'Bien', 'Pleno'],
  },
  {
    id: 'frictions',
    question: '¿Hubo algo que te sacó del proceso hoy?',
    type: 'chips',
    options: ['planificación', 'hambre', 'cravings', 'estrés', 'cansancio', 'evento social', 'viaje', 'ciclo', 'enfermedad', 'otro'],
    optional: true,
  },
  {
    id: 'reflection',
    question: '¿Quieres anotar algo sobre tu día?',
    type: 'textarea',
    optional: true,
    toggleLabel: 'Compartir esta reflexión con mi nutricionista',
  },
];

export default function CheckinDiario() {
  const router = useRouter();
  const [completed, setCompleted] = useState(false);

  if (completed) {
    return (
      <div className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center px-4 bg-stone-50">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-teal-500" />
          </div>
          <h2 className="text-xl font-semibold text-stone-800 mb-2">Listo. Tu día quedó registrado.</h2>
          <p className="text-sm text-stone-400 mb-8">
            No tienes que recuperar días anteriores. Hoy retomamos el proceso.
          </p>
          <button
            onClick={() => router.push('/cliente')}
            className="px-6 py-2.5 rounded-full bg-stone-800 text-white text-sm font-medium hover:bg-stone-700 transition-colors"
          >
            Volver al dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <CheckInFlow
      title="Check-in diario"
      steps={dailySteps}
      onComplete={() => setCompleted(true)}
    />
  );
}
