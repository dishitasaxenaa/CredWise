"use client"

import { ShieldCheck, Target, TrendingUp } from "lucide-react"

export default function StatsGrid({ analysis }) {
  const stats = [
    {
      title: "Sustainable Spending",
      value: `${analysis?.green_percentage || "--"}%`,
      icon: Target,
      trend: "Excellent",
      className: "from-emerald-500/20 to-teal-500/5 border-emerald-500/20 text-emerald-400"
    },
    {
      title: "Carbon Footprint",
      value: `${analysis?.carbon_percentage || "--"}%`,
      icon: TrendingUp,
      trend: "Monitor",
      className: "from-orange-500/20 to-red-500/5 border-orange-500/20 text-orange-400"
    },
    {
      title: "Financial Security",
      value: "92%", // Placeholder or derived metric
      icon: ShieldCheck,
      trend: "Safe",
      className: "from-blue-500/20 to-indigo-500/5 border-blue-500/20 text-blue-400"
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="glass-card p-6 flex items-start justify-between group hover:translate-y-[-4px] transition-transform duration-300"
        >
          <div>
            <p className="text-slate-400 text-sm font-medium mb-1">{stat.title}</p>
            <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
            <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r border ${stat.className}`}>
              {stat.trend}
            </span>
          </div>
          
          <div className={`p-3 rounded-xl bg-slate-800 group-hover:bg-slate-700 transition-colors`}>
            <stat.icon className={`w-6 h-6 ${stat.className.split(" ").pop()}`} />
          </div>
        </div>
      ))}
    </div>
  )
}
