import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const BreakdownChart = ({ analysis }) => {
  if (!analysis) return null;
  const green = Number.parseFloat(analysis.green_percentage)
  const carbon = Number.parseFloat(analysis.carbon_percentage)
  const withdrawal = Number.parseFloat(analysis.withdrawal_percentage)
  const other = Number.parseFloat(analysis.neutral_percentage) || 0

  const data = {
    labels: ["Sustainable", "Carbon Heavy", "Cash/Transfer", "Neutral"],
    datasets: [
      {
        label: "Spending Allocation %",
        data: [green, carbon, withdrawal, other],
        backgroundColor: [
          "#10b981", // Emerald 500
          "#ef4444", // Red 500
          "#f59e0b", // Amber 500
          "#475569"  // Slate 600
        ],
        hoverBackgroundColor: [
          "#059669",
          "#dc2626", 
          "#d97706",
          "#334155"
        ],
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 40,
      },
    ],
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(255,255,255,0.05)" },
        ticks: { 
            color: "#94a3b8", // Slate 400
            font: { family: 'Outfit', size: 11 }
        },
        border: { display: false }
      },
      x: {
        grid: { display: false },
        ticks: { 
            color: "#cbd5e1", // Slate 300
            font: { family: 'Outfit', size: 12, weight: 500 }
        },
        border: { display: false }
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
          backgroundColor: '#1e293b',
          padding: 12,
          titleFont: { family: 'Outfit', size: 13 },
          bodyFont: { family: 'Outfit', size: 13 },
          cornerRadius: 8,
          displayColors: false
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        duration: 2000,
        easing: 'easeOutQuart'
    }
  }

  return (
    <div className="h-64 w-full relative">
      <Bar data={data} options={options} />
    </div>
  )
}

export default BreakdownChart
