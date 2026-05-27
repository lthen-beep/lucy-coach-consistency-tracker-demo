export type Band = 'Sólida' | 'Consistente' | 'En progreso' | 'Con fricción' | 'Reinicio activo';
export type Priority = 'Estable' | 'Observar' | 'Necesita atención' | 'Revisar antes de sesión';
export type SupStatus = 'completo' | 'parcial' | 'no';

export interface DailyCheckIn {
  date: string;
  adherence: number;
  protein: string;
  hydration: string;
  supplements: SupStatus;
  wellbeing: number;
  frictions: string[];
  reflection?: string;
  sharedReflection?: boolean;
}

export interface WeeklyCheckIn {
  weekOf: string;
  sleepHours: string;
  sleepQuality: number;
  stress: number;
  trainingsCompleted: number;
  trainingsPlanned: number;
  processPerception: string;
  focusNextWeek: string[];
  toolFeeling: string;
  toolPerception: string;
  uncomfortable?: string;
}

export interface Client {
  id: string;
  name: string;
  archetype: string;
  band: Band;
  priority: Priority;
  lastCheckIn: string;
  daysRegisteredThisWeek: number;
  totalDaysRegistered: number;
  adherence: number;
  supplementation: number;
  hydration: number;
  wellbeing: number;
  frictionScore: number;
  mainFriction: string;
  suggestedAction: string;
  focusOfWeek: string;
  weeklyInsight: string;
  dailyCheckIns: DailyCheckIn[];
  weeklyCheckIns: WeeklyCheckIn[];
  supplementMatrix: SupStatus[];
  heatmapData: number[];
  trendData: number[];
  frictionBreakdown: { name: string; value: number }[];
}

function generateHeatmap(consistency: number): number[] {
  const days: number[] = [];
  for (let i = 0; i < 30; i++) {
    const rand = Math.random();
    if (rand < consistency) {
      days.push(Math.floor(Math.random() * 3) + 3);
    } else if (rand < consistency + 0.15) {
      days.push(Math.floor(Math.random() * 2) + 1);
    } else {
      days.push(0);
    }
  }
  return days;
}

function generateTrend(base: number, direction: 'up' | 'down' | 'stable'): number[] {
  const data: number[] = [];
  let val = base;
  for (let i = 0; i < 14; i++) {
    const noise = (Math.random() - 0.5) * 15;
    if (direction === 'up') val = Math.min(100, val + 1.5 + noise);
    else if (direction === 'down') val = Math.max(10, val - 1.5 + noise);
    else val = Math.max(10, Math.min(100, val + noise));
    data.push(Math.round(val));
  }
  return data;
}

export const mockClients: Client[] = [
  {
    id: 'mariana-castillo',
    name: 'Mariana Castillo',
    archetype: 'Profesional Estancada',
    band: 'Consistente',
    priority: 'Estable',
    lastCheckIn: '2026-05-26',
    daysRegisteredThisWeek: 6,
    totalDaysRegistered: 42,
    adherence: 78,
    supplementation: 85,
    hydration: 72,
    wellbeing: 75,
    frictionScore: 25,
    mainFriction: 'planificación',
    suggestedAction: 'Mantener seguimiento. Sesión de rutina.',
    focusOfWeek: 'Hidratación y planificación de almuerzos',
    weeklyInsight: 'Tres semanas en zona consistente. Eso ya no es accidente, es sistema.',
    dailyCheckIns: [
      { date: '2026-05-26', adherence: 4, protein: 'Sí', hydration: 'Adecuada', supplements: 'completo', wellbeing: 4, frictions: [] },
      { date: '2026-05-25', adherence: 3, protein: 'Parcialmente', hydration: 'Adecuada', supplements: 'completo', wellbeing: 3, frictions: ['planificación'] },
      { date: '2026-05-24', adherence: 4, protein: 'Sí', hydration: 'Excelente', supplements: 'completo', wellbeing: 4, frictions: [] },
      { date: '2026-05-23', adherence: 4, protein: 'Sí', hydration: 'Adecuada', supplements: 'parcial', wellbeing: 4, frictions: [] },
      { date: '2026-05-22', adherence: 3, protein: 'Parcialmente', hydration: 'Baja', supplements: 'completo', wellbeing: 3, frictions: ['estrés'] },
      { date: '2026-05-21', adherence: 4, protein: 'Sí', hydration: 'Adecuada', supplements: 'completo', wellbeing: 4, frictions: [] },
    ],
    weeklyCheckIns: [
      { weekOf: '2026-05-19', sleepHours: '6-7h', sleepQuality: 3, stress: 3, trainingsCompleted: 3, trainingsPlanned: 4, processPerception: 'Manejable', focusNextWeek: ['hidratación', 'planificación'], toolFeeling: 'Liviana', toolPerception: 'Acompañamiento' },
    ],
    supplementMatrix: ['completo', 'completo', 'parcial', 'completo', 'completo', 'completo', 'no'],
    heatmapData: generateHeatmap(0.8),
    trendData: generateTrend(72, 'up'),
    frictionBreakdown: [
      { name: 'planificación', value: 3 },
      { name: 'estrés', value: 2 },
      { name: 'cansancio', value: 1 },
      { name: 'cravings', value: 1 },
    ],
  },
  {
    id: 'carla-reyes',
    name: 'Carla Reyes',
    archetype: 'Profesional Estancada',
    band: 'En progreso',
    priority: 'Observar',
    lastCheckIn: '2026-05-25',
    daysRegisteredThisWeek: 4,
    totalDaysRegistered: 28,
    adherence: 62,
    supplementation: 45,
    hydration: 58,
    wellbeing: 60,
    frictionScore: 40,
    mainFriction: 'estrés',
    suggestedAction: 'Revisar suplementación y explorar manejo de estrés.',
    focusOfWeek: 'Revisar suplementación y planificación de fin de semana',
    weeklyInsight: 'La estructura de días laborales es más fuerte. El fin de semana es el área a observar.',
    dailyCheckIns: [
      { date: '2026-05-25', adherence: 3, protein: 'Parcialmente', hydration: 'Baja', supplements: 'parcial', wellbeing: 3, frictions: ['estrés', 'cravings'] },
      { date: '2026-05-24', adherence: 2, protein: 'No', hydration: 'Baja', supplements: 'no', wellbeing: 2, frictions: ['evento social'] },
      { date: '2026-05-23', adherence: 3, protein: 'Parcialmente', hydration: 'Adecuada', supplements: 'parcial', wellbeing: 3, frictions: ['estrés'] },
      { date: '2026-05-21', adherence: 4, protein: 'Sí', hydration: 'Adecuada', supplements: 'completo', wellbeing: 4, frictions: [] },
    ],
    weeklyCheckIns: [
      { weekOf: '2026-05-19', sleepHours: '5-6h', sleepQuality: 2, stress: 4, trainingsCompleted: 2, trainingsPlanned: 3, processPerception: 'Pesado', focusNextWeek: ['manejo de estrés', 'suplementación'], toolFeeling: 'Neutra', toolPerception: 'Neutra' },
    ],
    supplementMatrix: ['completo', 'no', 'parcial', 'parcial', 'no', 'completo', 'no'],
    heatmapData: generateHeatmap(0.6),
    trendData: generateTrend(65, 'stable'),
    frictionBreakdown: [
      { name: 'estrés', value: 5 },
      { name: 'cravings', value: 3 },
      { name: 'evento social', value: 2 },
      { name: 'planificación', value: 1 },
    ],
  },
  {
    id: 'laura-jimenez',
    name: 'Laura Jiménez',
    archetype: 'Profesional Estancada',
    band: 'Con fricción',
    priority: 'Necesita atención',
    lastCheckIn: '2026-05-23',
    daysRegisteredThisWeek: 2,
    totalDaysRegistered: 15,
    adherence: 45,
    supplementation: 30,
    hydration: 40,
    wellbeing: 50,
    frictionScore: 60,
    mainFriction: 'cansancio',
    suggestedAction: 'Revisar carga y sueño antes de sesión. Priorizar bienestar.',
    focusOfWeek: 'Reducir fricción. Revisar sueño y carga laboral.',
    weeklyInsight: 'Datos insuficientes para detectar patrón estable. Observar próxima semana.',
    dailyCheckIns: [
      { date: '2026-05-23', adherence: 2, protein: 'No', hydration: 'Baja', supplements: 'no', wellbeing: 2, frictions: ['cansancio', 'estrés'] },
      { date: '2026-05-21', adherence: 3, protein: 'Parcialmente', hydration: 'Adecuada', supplements: 'parcial', wellbeing: 3, frictions: ['cansancio'] },
    ],
    weeklyCheckIns: [
      { weekOf: '2026-05-19', sleepHours: '<5h', sleepQuality: 1, stress: 5, trainingsCompleted: 1, trainingsPlanned: 3, processPerception: 'Muy pesado', focusNextWeek: ['sueño', 'manejo de estrés'], toolFeeling: 'Pesada', toolPerception: 'Neutra' },
    ],
    supplementMatrix: ['no', 'parcial', 'no', 'no', 'no', 'parcial', 'no'],
    heatmapData: generateHeatmap(0.35),
    trendData: generateTrend(50, 'down'),
    frictionBreakdown: [
      { name: 'cansancio', value: 6 },
      { name: 'estrés', value: 4 },
      { name: 'hambre', value: 2 },
      { name: 'planificación', value: 2 },
    ],
  },
  {
    id: 'patricia-mendez',
    name: 'Patricia Méndez',
    archetype: 'Profesional Estancada',
    band: 'Sólida',
    priority: 'Estable',
    lastCheckIn: '2026-05-27',
    daysRegisteredThisWeek: 7,
    totalDaysRegistered: 56,
    adherence: 90,
    supplementation: 92,
    hydration: 88,
    wellbeing: 85,
    frictionScore: 10,
    mainFriction: 'ninguna destacada',
    suggestedAction: 'Mantener. Sesión de revisión de progreso.',
    focusOfWeek: 'Mantener ritmo actual. Explorar nuevas recetas.',
    weeklyInsight: 'El sistema funciona. No hay necesidad de cambiar nada esta semana.',
    dailyCheckIns: [
      { date: '2026-05-27', adherence: 5, protein: 'Sí', hydration: 'Excelente', supplements: 'completo', wellbeing: 5, frictions: [] },
      { date: '2026-05-26', adherence: 4, protein: 'Sí', hydration: 'Adecuada', supplements: 'completo', wellbeing: 4, frictions: [] },
      { date: '2026-05-25', adherence: 5, protein: 'Sí', hydration: 'Excelente', supplements: 'completo', wellbeing: 5, frictions: [] },
      { date: '2026-05-24', adherence: 4, protein: 'Sí', hydration: 'Adecuada', supplements: 'completo', wellbeing: 4, frictions: [] },
      { date: '2026-05-23', adherence: 5, protein: 'Sí', hydration: 'Excelente', supplements: 'completo', wellbeing: 5, frictions: [] },
      { date: '2026-05-22', adherence: 4, protein: 'Sí', hydration: 'Adecuada', supplements: 'completo', wellbeing: 4, frictions: [] },
      { date: '2026-05-21', adherence: 5, protein: 'Sí', hydration: 'Excelente', supplements: 'completo', wellbeing: 5, frictions: [] },
    ],
    weeklyCheckIns: [
      { weekOf: '2026-05-19', sleepHours: '7-8h', sleepQuality: 4, stress: 2, trainingsCompleted: 4, trainingsPlanned: 4, processPerception: 'Fluyó', focusNextWeek: ['recuperación'], toolFeeling: 'Liviana', toolPerception: 'Acompañamiento' },
    ],
    supplementMatrix: ['completo', 'completo', 'completo', 'completo', 'completo', 'completo', 'completo'],
    heatmapData: generateHeatmap(0.92),
    trendData: generateTrend(88, 'up'),
    frictionBreakdown: [
      { name: 'planificación', value: 1 },
    ],
  },
  {
    id: 'andres-molina',
    name: 'Andrés Molina',
    archetype: 'Hombre Disciplinado',
    band: 'Consistente',
    priority: 'Observar',
    lastCheckIn: '2026-05-26',
    daysRegisteredThisWeek: 5,
    totalDaysRegistered: 35,
    adherence: 75,
    supplementation: 60,
    hydration: 70,
    wellbeing: 72,
    frictionScore: 30,
    mainFriction: 'comer fuera',
    suggestedAction: 'Revisar estrategia para comidas fuera de casa.',
    focusOfWeek: 'Adherencia en días de comidas fuera',
    weeklyInsight: 'Adherencia sólida entre semana. Explorar flexibilidad los fines de semana.',
    dailyCheckIns: [
      { date: '2026-05-26', adherence: 4, protein: 'Sí', hydration: 'Adecuada', supplements: 'parcial', wellbeing: 4, frictions: [] },
      { date: '2026-05-25', adherence: 2, protein: 'No', hydration: 'Baja', supplements: 'no', wellbeing: 3, frictions: ['comer fuera', 'evento social'] },
      { date: '2026-05-24', adherence: 3, protein: 'Parcialmente', hydration: 'Adecuada', supplements: 'parcial', wellbeing: 3, frictions: ['comer fuera'] },
      { date: '2026-05-23', adherence: 4, protein: 'Sí', hydration: 'Adecuada', supplements: 'completo', wellbeing: 4, frictions: [] },
      { date: '2026-05-22', adherence: 4, protein: 'Sí', hydration: 'Excelente', supplements: 'completo', wellbeing: 4, frictions: [] },
    ],
    weeklyCheckIns: [
      { weekOf: '2026-05-19', sleepHours: '6-7h', sleepQuality: 3, stress: 3, trainingsCompleted: 4, trainingsPlanned: 5, processPerception: 'Manejable', focusNextWeek: ['adherencia fin de semana', 'comer fuera'], toolFeeling: 'Liviana', toolPerception: 'Acompañamiento' },
    ],
    supplementMatrix: ['completo', 'completo', 'completo', 'parcial', 'no', 'parcial', 'no'],
    heatmapData: generateHeatmap(0.72),
    trendData: generateTrend(73, 'stable'),
    frictionBreakdown: [
      { name: 'comer fuera', value: 4 },
      { name: 'evento social', value: 3 },
      { name: 'planificación', value: 1 },
    ],
  },
  {
    id: 'carlos-nunez',
    name: 'Carlos Núñez',
    archetype: 'Hombre Disciplinado',
    band: 'Reinicio activo',
    priority: 'Revisar antes de sesión',
    lastCheckIn: '2026-05-22',
    daysRegisteredThisWeek: 1,
    totalDaysRegistered: 8,
    adherence: 35,
    supplementation: 20,
    hydration: 35,
    wellbeing: 45,
    frictionScore: 70,
    mainFriction: 'viaje',
    suggestedAction: 'Contactar. Validar si necesita ajuste de plan o pausa.',
    focusOfWeek: 'Retomar registro diario. Sin presión de adherencia.',
    weeklyInsight: 'Datos insuficientes para detectar patrón.',
    dailyCheckIns: [
      { date: '2026-05-22', adherence: 2, protein: 'No', hydration: 'Baja', supplements: 'no', wellbeing: 2, frictions: ['viaje'] },
    ],
    weeklyCheckIns: [],
    supplementMatrix: ['no', 'no', 'no', 'no', 'no', 'no', 'no'],
    heatmapData: generateHeatmap(0.2),
    trendData: generateTrend(40, 'down'),
    frictionBreakdown: [
      { name: 'viaje', value: 5 },
      { name: 'planificación', value: 2 },
      { name: 'cansancio', value: 2 },
    ],
  },
  {
    id: 'diego-herrera',
    name: 'Diego Herrera',
    archetype: 'Híbrido / Hyrox',
    band: 'En progreso',
    priority: 'Observar',
    lastCheckIn: '2026-05-26',
    daysRegisteredThisWeek: 4,
    totalDaysRegistered: 21,
    adherence: 68,
    supplementation: 55,
    hydration: 65,
    wellbeing: 70,
    frictionScore: 35,
    mainFriction: 'hambre',
    suggestedAction: 'Revisar ingesta calórica vs. gasto de entrenamiento.',
    focusOfWeek: 'Ajustar proteína y revisar timing de comidas',
    weeklyInsight: 'La tendencia mejora. El ajuste de proteína podría estabilizar la adherencia.',
    dailyCheckIns: [
      { date: '2026-05-26', adherence: 4, protein: 'Sí', hydration: 'Adecuada', supplements: 'parcial', wellbeing: 4, frictions: [] },
      { date: '2026-05-25', adherence: 3, protein: 'Parcialmente', hydration: 'Adecuada', supplements: 'parcial', wellbeing: 3, frictions: ['hambre'] },
      { date: '2026-05-23', adherence: 3, protein: 'Parcialmente', hydration: 'Baja', supplements: 'no', wellbeing: 3, frictions: ['hambre', 'cansancio'] },
      { date: '2026-05-21', adherence: 4, protein: 'Sí', hydration: 'Adecuada', supplements: 'completo', wellbeing: 4, frictions: [] },
    ],
    weeklyCheckIns: [
      { weekOf: '2026-05-19', sleepHours: '6-7h', sleepQuality: 3, stress: 3, trainingsCompleted: 5, trainingsPlanned: 5, processPerception: 'Manejable', focusNextWeek: ['hidratación', 'suplementación'], toolFeeling: 'Neutra', toolPerception: 'Acompañamiento' },
    ],
    supplementMatrix: ['completo', 'no', 'parcial', 'completo', 'no', 'parcial', 'no'],
    heatmapData: generateHeatmap(0.6),
    trendData: generateTrend(60, 'up'),
    frictionBreakdown: [
      { name: 'hambre', value: 5 },
      { name: 'cansancio', value: 3 },
      { name: 'planificación', value: 2 },
    ],
  },
];

export const currentClient = mockClients[0];

export const pilotMetrics = {
  totalClients: 7,
  activeClients: 6,
  totalCheckIns: 152,
  clientsWith4Plus: 5,
  weeklyCheckInRate: 0.71,
  toolFeelingBreakdown: { liviana: 3, neutra: 2, pesada: 1 },
  toolPerceptionBreakdown: { acompanamiento: 4, neutra: 1, vigilancia: 1 },
  microSurveyOmissionRate: 0.14,
  clientsAtRisk: [
    { name: 'Carlos Núñez', reason: 'Sin registrar 5+ días', severity: 'high' as const },
    { name: 'Laura Jiménez', reason: 'Baja adherencia sostenida y alta fricción', severity: 'high' as const },
  ],
  pilotStatus: 'amber' as const,
  pilotStatusReason: 'Un cliente en reinicio activo y una señal de vigilancia reportada. Ajustar antes de continuar.',
  hasVigilanciaSignal: true,
};
