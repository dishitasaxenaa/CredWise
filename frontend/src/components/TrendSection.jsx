import TrendCard from "./TrendCard";

export default function TrendSection({ trend, carbonTrend }) {
  if (!trend || !carbonTrend) return null;

  const improved = carbonTrend.changePercent < 0; // Less carbon is good
  const worsened = carbonTrend.changePercent > 0;

  return (
    <div className="h-full flex flex-col justify-center space-y-4">
        {/* Trend Cards rendered directly or using the sub-component */}
        <div className="grid grid-cols-1 gap-4">
             {/* Score Trend */}
             <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-between group hover:bg-slate-800 transition-colors">
                 <div>
                     <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Score Trend</p>
                     <p className="text-white font-semibold mt-1">
                         {trend.delta > 0 ? 'Improving' : 'Declining'}
                     </p>
                 </div>
                 <div className={`text-right ${trend.delta >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                     <span className="text-xl font-bold">{trend.delta > 0 ? '+' : ''}{trend.delta}</span>
                     <p className="text-xs opacity-80">points</p>
                 </div>
             </div>

             {/* Carbon Trend */}
             <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-between group hover:bg-slate-800 transition-colors">
                 <div>
                     <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Carbon Spending</p>
                     <p className="text-white font-semibold mt-1">
                         {improved ? 'Decreased' : 'Increased'}
                     </p>
                 </div>
                 <div className={`text-right ${improved ? 'text-emerald-400' : 'text-red-400'}`}>
                     <span className="text-xl font-bold">{Math.abs(carbonTrend.changePercent)}%</span>
                     <p className="text-xs opacity-80">{improved ? 'reduction' : 'increase'}</p>
                 </div>
             </div>
             
             {/* Context */}
             <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                 <p className="text-indigo-300 text-sm leading-relaxed">
                     <span className="font-semibold block mb-1">Insight:</span>
                     {trend.reason}
                 </p>
             </div>
        </div>
    </div>
  );
}
