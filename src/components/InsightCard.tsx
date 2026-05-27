import { Sparkles } from 'lucide-react';

export default function InsightCard({ title, message }: { title: string; message: string }) {
  return (
    <div className="bg-stone-50 border border-stone-200 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles size={16} className="text-stone-400" />
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide">{title}</span>
      </div>
      <p className="text-sm text-stone-600 leading-relaxed">{message}</p>
    </div>
  );
}
