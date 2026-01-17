"use client"

import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement } from "chart.js"

ChartJS.register(ArcElement)

export default function ScoreSection({ score, rewards }) {
  const data = {
    labels: ["Score", "Remaining"],
    datasets: [
      {
        data: [score, 900 - score],
        backgroundColor: ["#10b981", "rgba(255, 255, 255, 0.05)"], // Emerald-500
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
        cutout: "85%",
        borderRadius: 20
      },
    ],
  }

  const options = {
    plugins: { tooltip: { enabled: false }, legend: { display: false } },
    responsive: true,
    maintainAspectRatio: false,
  }

  return (
    <div className="glass-card sm:p-8 flex flex-col items-center justify-center relative h-full">
      <h2 className="text-xl font-semibold mb-6 text-white text-center">Your Green Score</h2>
      
      <div className="h-56 w-full relative flex items-center justify-center">
        <Doughnut data={data} options={options} />
        
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="text-6xl font-bold block leading-none bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent">
            {score}
          </span>
          <span className="text-emerald-400/80 text-sm font-medium uppercase tracking-wider mt-2 block">
            {score >= 750 ? "Excellent" : score >= 500 ? "Good" : "Needs Work"}
          </span>
        </div>
      </div>

      <div className="mt-2 text-center p-4 bg-emerald-900/10 rounded-xl border border-emerald-500/10 w-full max-w-xs backdrop-blur-sm">
        <p className="text-slate-300 text-sm">
          Projected Interest Rate Impact
        </p>
        <p className="text-emerald-400 font-bold text-xl mt-1">
          {rewards?.interestRateImpact || "--"}
        </p>
      </div>
    </div>
  )
}
