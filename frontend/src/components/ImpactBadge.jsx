import { Leaf, IndianRupee } from "lucide-react";

export default function ImpactBadge({ carbonTrend }) {
  if (!carbonTrend) return null;

  const { lastMonthCarbon, thisMonthCarbon } = carbonTrend;

  const moneySaved = Math.max(
    0,
    lastMonthCarbon - thisMonthCarbon
  );

  // 🌍 CO₂ estimation (1 kg CO₂ per ₹50 carbon spend)
  const co2SavedKg = Math.round(moneySaved / 50);

  // Show badge only if user improved
  if (moneySaved <= 0) return null;

  return (
    <div className="glass-card p-6 border-l-4 border-l-emerald-500 relative overflow-hidden group">
      
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors" />

      <h3 className="text-white font-semibold text-lg flex items-center gap-2 mb-4 relative z-10">
        <span className="p-1 bg-emerald-500/20 rounded text-emerald-400">🌱</span>
        Positive Impact
      </h3>

      <div className="space-y-4 relative z-10">
        <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
           <div className="flex items-center gap-3">
             <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
               <IndianRupee size={18} />
             </div>
             <div>
               <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Saved</p>
               <p className="font-bold text-emerald-300">₹{moneySaved.toLocaleString()}</p>
             </div>
           </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
           <div className="flex items-center gap-3">
             <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
               <Leaf size={18} />
             </div>
             <div>
               <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Reduced</p>
               <p className="font-bold text-emerald-300">~{co2SavedKg} kg CO₂</p>
             </div>
           </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-700/50 text-center">
         <p className="text-xs text-slate-500">
           Great job choosing sustainable options this month!
         </p>
      </div>
    </div>
  );
}
