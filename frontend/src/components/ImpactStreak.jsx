import { Zap } from "lucide-react";

export default function ImpactStreak({ trend }) {
  if (!trend) return null;

  // Assuming trend.streak contains the streak usage
  // If not exposed in trend, we can default or update backend later.
  // Using a placeholder or passing streak prop if available.
  const streakCount = 3; // Placeholder logic as streak isn't in mock data yet

  return (
    <div className="glass-card p-6 border-l-4 border-l-orange-500 relative overflow-hidden group">
        
       {/* Background glow */}
       <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-colors" />

       <div className="relative z-10 flex items-center justify-between">
           <div>
               <h3 className="text-white font-semibold text-lg flex items-center gap-2 mb-1">
                 <span className="text-orange-400"><Zap size={20} fill="currentColor" /></span>
                 Impact Streak
               </h3>
               <p className="text-slate-400 text-sm">Consistent Green Score improvement</p>
           </div>
           
           <div className="text-right">
               <span className="text-4xl font-bold text-orange-400">{streakCount}</span>
               <p className="text-xs text-orange-400/80 uppercase font-bold tracking-wider">Months</p>
           </div>
       </div>

       <div className="mt-4 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
           <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-full rounded-full" style={{ width: '60%' }}></div>
       </div>
       <p className="text-xs text-slate-500 mt-2 text-right">Next milestone: 6 months</p>

    </div>
  );
}
