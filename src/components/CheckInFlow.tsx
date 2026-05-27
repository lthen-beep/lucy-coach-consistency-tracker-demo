'use client';

import { useState, type ReactNode } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export interface FlowStep {
  id: string;
  question: string;
  subtitle?: string;
  microcopy?: string;
  type: 'single' | 'chips' | 'textarea' | 'scale' | 'number' | 'display';
  options?: string[];
  optional?: boolean;
  toggleLabel?: string;
  displayContent?: ReactNode;
}

export default function CheckInFlow({
  steps,
  onComplete,
  title,
}: {
  steps: FlowStep[];
  onComplete: () => void;
  title: string;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[] | number | boolean>>({});
  const [toggles, setToggles] = useState<Record<string, boolean>>({});

  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleSelect = (value: string) => {
    setAnswers({ ...answers, [step.id]: value });
  };

  const handleChipToggle = (chip: string) => {
    const current = (answers[step.id] as string[]) || [];
    const updated = current.includes(chip) ? current.filter((c) => c !== chip) : [...current, chip];
    setAnswers({ ...answers, [step.id]: updated });
  };

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const canProceed = step.optional || step.type === 'display' || answers[step.id] !== undefined;

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <div className="w-full bg-stone-200 h-1">
        <div className="bg-teal-400 h-1 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 max-w-lg mx-auto w-full">
        <p className="text-xs text-stone-400 uppercase tracking-wide mb-8">{title}</p>

        <div className="w-full">
          <h2 className="text-xl font-semibold text-stone-800 mb-2">{step.question}</h2>
          {step.subtitle && <p className="text-sm text-stone-400 mb-4">{step.subtitle}</p>}
          {step.microcopy && (
            <p className="text-xs text-stone-400 italic mb-4 bg-stone-100 rounded-lg p-3">{step.microcopy}</p>
          )}

          {step.type === 'display' && step.displayContent && <div className="mt-4">{step.displayContent}</div>}

          {step.type === 'single' && step.options && (
            <div className="flex flex-col gap-2 mt-4">
              {step.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className={`text-left px-4 py-3 rounded-xl border transition-all text-sm ${
                    answers[step.id] === opt
                      ? 'border-teal-400 bg-teal-50 text-teal-800'
                      : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {step.type === 'scale' && (
            <div className="flex gap-2 mt-4">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setAnswers({ ...answers, [step.id]: n })}
                  className={`w-12 h-12 rounded-xl border text-sm font-medium transition-all ${
                    answers[step.id] === n
                      ? 'border-teal-400 bg-teal-50 text-teal-800'
                      : 'border-stone-200 bg-white text-stone-500 hover:border-stone-300'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          )}

          {step.type === 'number' && (
            <div className="mt-4">
              <input
                type="number"
                min={0}
                max={7}
                value={(answers[step.id] as number) || 0}
                onChange={(e) => setAnswers({ ...answers, [step.id]: parseInt(e.target.value) || 0 })}
                className="w-20 px-3 py-2 rounded-xl border border-stone-200 text-stone-800 text-center text-lg"
              />
            </div>
          )}

          {step.type === 'chips' && step.options && (
            <div className="flex flex-wrap gap-2 mt-4">
              {step.options.map((chip) => {
                const selected = ((answers[step.id] as string[]) || []).includes(chip);
                return (
                  <button
                    key={chip}
                    onClick={() => handleChipToggle(chip)}
                    className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                      selected
                        ? 'border-teal-400 bg-teal-50 text-teal-800'
                        : 'border-stone-200 bg-white text-stone-500 hover:border-stone-300'
                    }`}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>
          )}

          {step.type === 'textarea' && (
            <div className="mt-4">
              <textarea
                rows={3}
                placeholder="Escribe aquí..."
                value={(answers[step.id] as string) || ''}
                onChange={(e) => setAnswers({ ...answers, [step.id]: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-600 resize-none focus:outline-none focus:border-teal-300"
              />
              {step.toggleLabel && (
                <label className="flex items-center gap-2 mt-2 cursor-pointer">
                  <div
                    className={`w-8 h-5 rounded-full transition-colors ${
                      toggles[step.id] ? 'bg-teal-400' : 'bg-stone-300'
                    } relative`}
                    onClick={() => setToggles({ ...toggles, [step.id]: !toggles[step.id] })}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all ${
                        toggles[step.id] ? 'left-3.5' : 'left-0.5'
                      }`}
                    />
                  </div>
                  <span className="text-xs text-stone-400">{step.toggleLabel}</span>
                </label>
              )}
            </div>
          )}

          {step.optional && <p className="text-[10px] text-stone-300 mt-2">Opcional</p>}
        </div>

        <div className="flex items-center justify-between w-full mt-12">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-1 text-sm text-stone-400 hover:text-stone-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={16} />
            Atrás
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed && !step.optional}
            className="flex items-center gap-1 px-5 py-2 rounded-full bg-stone-800 text-white text-sm font-medium hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {isLast ? 'Finalizar' : 'Siguiente'}
            {!isLast && <ChevronRight size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
