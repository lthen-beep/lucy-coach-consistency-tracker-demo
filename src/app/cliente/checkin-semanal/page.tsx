'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CheckInFlow from '@/components/CheckInFlow';
import type { FlowStep } from '@/components/CheckInFlow';
import BandBadge from '@/components/BandBadge';
import InsightCard from '@/components/InsightCard';
import { currentClient } from '@/data/mockData';

const weeklySteps: FlowStep[] = [
  {
    id: 'welcome',
    question: 'Vamos a cerrar tu semana',
    subtitle: 'Sin respuestas correctas. Solo datos para entender mejor tu proceso.',
    type: 'display',
    displayContent: null,
  },
  {
    id: 'sleep-hours',
    question: '¿Cómo estuvo tu sueño esta semana?',
    subtitle: 'Horas promedio por noche',
    type: 'single',
    options: ['<5h', '5-6h', '6-7h', '7-8h', '8h+'],
  },
  {
    id: 'sleep-quality',
    question: 'Calidad del sueño',
    subtitle: '1 = muy mala, 5 = excelente',
    type: 'scale',
  },
  {
    id: 'stress',
    question: '¿Cómo estuvo tu estrés base esta semana?',
    subtitle: '1 = bajo, 5 = muy alto',
    microcopy: 'El estrés sostenido puede cambiar hambre, energía y adherencia. Por eso lo observamos.',
    type: 'scale',
  },
  {
    id: 'trainings',
    question: 'Entrenamientos completados vs planeados',
    subtitle: '¿Cuántos entrenamientos completaste? (Planeados: 4)',
    type: 'number',
  },
  {
    id: 'perception',
    question: '¿Cómo se sintió tu proceso esta semana?',
    microcopy: 'Esta percepción no afecta tu banda. Es para entender cómo se sintió tu semana.',
    type: 'single',
    options: ['Muy pesado', 'Pesado', 'Neutral', 'Manejable', 'Fluyó'],
  },
  {
    id: 'reflection',
    question: '¿Qué observaste esta semana?',
    type: 'textarea',
    optional: true,
  },
  {
    id: 'focus',
    question: '¿Cuál será tu foco la próxima semana?',
    type: 'chips',
    options: ['hidratación', 'sueño', 'planificación', 'suplementación', 'manejo de estrés', 'adherencia fin de semana', 'comer fuera', 'recuperación', 'otro'],
  },
  {
    id: 'tool-feeling',
    question: 'Esta semana, la herramienta se sintió:',
    type: 'single',
    options: ['Liviana', 'Neutra', 'Pesada'],
  },
  {
    id: 'tool-perception',
    question: 'Se sintió como:',
    type: 'single',
    options: ['Acompañamiento', 'Neutra', 'Vigilancia'],
  },
  {
    id: 'uncomfortable',
    question: '¿Algo te resultó incómodo esta semana?',
    microcopy: 'Solo Lucy ve esto. No aparece en el dashboard de tu nutricionista.',
    type: 'textarea',
    optional: true,
  },
];

export default function CheckinSemanal() {
  const router = useRouter();
  const [completed, setCompleted] = useState(false);

  if (completed) {
    return (
      <div className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center px-4 bg-stone-50">
        <div className="max-w-md text-center">
          <p className="text-xs text-stone-400 uppercase tracking-wide mb-4">Tu semana</p>
          <div className="mb-4">
            <BandBadge band={currentClient.band} size="lg" />
          </div>
          <InsightCard
            title="Lucy Insights"
            message={currentClient.weeklyInsight}
          />
          <button
            onClick={() => router.push('/cliente')}
            className="mt-8 px-6 py-2.5 rounded-full bg-stone-800 text-white text-sm font-medium hover:bg-stone-700 transition-colors"
          >
            Volver al dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <CheckInFlow
      title="Cierre semanal"
      steps={weeklySteps}
      onComplete={() => setCompleted(true)}
    />
  );
}
