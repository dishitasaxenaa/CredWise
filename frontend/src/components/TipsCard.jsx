import { Leaf, Lightbulb } from "lucide-react";

export default function TipsCard({ tips }) {
  if (!tips?.length) return null;

  return (
    <div className="relative">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
           <Lightbulb size={24} />
        </div>
        <div>
            <h3 className="text-xl font-semibold text-white">
              Green Recommendations
            </h3>
            <p className="text-sm text-slate-400">Actionable steps to improve your score</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tips.map((tip, idx) => (
          <div key={idx} className="flex gap-4 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 hover:bg-emerald-500/10 transition-colors">
            <div className="mt-1 flex-shrink-0">
                 <Leaf className="text-emerald-400 w-5 h-5" />
            </div>
            <p className="text-slate-200 text-sm leading-relaxed">
              {tip}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
