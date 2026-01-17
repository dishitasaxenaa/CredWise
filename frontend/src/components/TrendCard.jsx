import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function TrendCard({
  title,
  value,
  subtitle,
  status,
  isText = false
}) {
  const styles = {
    positive: {
      border: "border-green-500/30",
      bg: "from-green-500/10 to-emerald-500/5",
      icon: <TrendingUp className="text-green-400" size={20} />
    },
    negative: {
      border: "border-red-500/30",
      bg: "from-red-500/10 to-rose-500/5",
      icon: <TrendingDown className="text-red-400" size={20} />
    },
    neutral: {
      border: "border-slate-500/30",
      bg: "from-slate-500/10 to-slate-500/5",
      icon: <Minus className="text-slate-400" size={20} />
    }
  };

  const theme = styles[status];

  return (
    <div
      className={`bg-gradient-to-br ${theme.bg} border ${theme.border} rounded-xl p-5`}
    >
      <div className="flex items-center gap-2 mb-3">
        {theme.icon}
        <h3 className="text-sm text-slate-300">{title}</h3>
      </div>

      <div className="text-white font-semibold text-lg">
        {isText ? value : value}
      </div>

      <p className="text-xs text-slate-400 mt-2">
        {subtitle}
      </p>
    </div>
  );
}
