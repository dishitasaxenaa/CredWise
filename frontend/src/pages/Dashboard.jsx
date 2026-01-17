import useAnalysis from "../hooks/useAnalysis";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";
import ScoreSection from "../components/ScoreSection";
import BreakdownChart from "../components/BreakdownChart";
import StatsGrid from "../components/StatsGrid";
import ExplainabilitySection from "../components/ExplainabilitySection";
import TrendSection from "../components/TrendSection";
import ImpactBadge from "../components/ImpactBadge";
import ImpactStreak from "../components/ImpactStreak";

export default function Dashboard() {
  const { data, loading, error } = useAnalysis();

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-slate-950">
        <Loading />
    </div>
  );
  
  if (error) return (
    <Layout>
         <ErrorState message={error} />
    </Layout>
  );

  return (
    <Layout>
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Welcome Back!</h1>
                <p className="text-slate-400">Here's your latest financial sustainability report.</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Live Analysis
            </div>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <ScoreSection
                    score={data.score.finalScore}
                    grade={data.score.grade}
                    trend={data.trend}
                    rewards={data.rewards}
                />
            </div>
            <div className="flex flex-col gap-6">
                 <ImpactBadge carbonTrend={data.carbonTrend} />
                 <ImpactStreak trend={data.trend} />
            </div>
        </div>

        {/* Middle Stats - Cards */}
        <StatsGrid analysis={data.analysis} />

        {/* Charts & Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div className="glass-card p-6">
                 <h3 className="text-lg font-semibold text-white mb-6">Spending Breakdown</h3>
                 <BreakdownChart analysis={data.analysis} />
             </div>
             
             <div className="glass-card p-6">
                 <h3 className="text-lg font-semibold text-white mb-6">Emissions Trend</h3>
                 <TrendSection trend={data.trend} carbonTrend={data.carbonTrend} />
             </div>
        </div>

        {/* Insights & Recommendations */}
        <ExplainabilitySection explainability={data.explainability} />
        
    </Layout>
  );
}
