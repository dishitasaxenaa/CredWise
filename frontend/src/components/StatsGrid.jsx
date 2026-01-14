"use client"

export default function StatsGrid({ metrics, streak }) {
  const stats = [
    {
      title: "Financial Health",
      value: `${metrics?.greenPercent || "--"}%`,
      trend: "▲ Excellent",
      trendClass: "bg-emerald-500/30 text-emerald-300 border border-emerald-400/50",
    },
    {
      title: "Risk Level",
      value: `${metrics?.carbonPercent || "--"}%`,
      trend: "▼ Monitor",
      trendClass: "bg-red-500/30 text-red-300 border border-red-400/50",
    },
    {
      title: "Account Streak",
      value: `${streak || "?"} Months`,
      trend: "Keep Going!",
      trendClass: "bg-cyan-500/30 text-cyan-300 border border-cyan-400/50",
    },
  ]

  return (
    <div className="grid grid-rows-3 gap-3 sm:gap-4 sm:p-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="glass-card-glow p-4 sm:p-6 border-cyan-400/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 hover:scale-105 transition-transform duration-300"
          style={{
            animation: `slide-up 0.6s ease-out forwards`,
            animationDelay: `${index * 0.1}s`,
          }}
        >
          <div>
            <h3 className="text-xs sm:text-sm text-slate-300 mb-1 font-medium">{stat.title}</h3>
            <p className="text-xl sm:text-2xl font-bold text-cyan-300">{stat.value}</p>
          </div>
          <span className={`text-xs px-2 sm:px-3 py-1 rounded-lg font-semibold whitespace-nowrap ${stat.trendClass}`}>
            {stat.trend}
          </span>
        </div>
      ))}
    </div>
  )
}
