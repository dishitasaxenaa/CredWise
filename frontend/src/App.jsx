import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Auth from "./components/Auth";
import ScoreSection from "./components/ScoreSection";
import StatsGrid from "./components/StatsGrid";
import DetailsGrid from "./components/DetailsGrid";
import BadgesSection from "./components/BadgesSection";
import { useAnalysis } from "./hooks/useAnalysis";

function App() {
  const { data, loading, error, fetchAnalysis } = useAnalysis();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bankDetails, setBankDetails] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAnalysis();
    }
  }, [fetchAnalysis, isAuthenticated]);

  const handleLogin = (details) => {
    setBankDetails(details);
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} loading={loading} />;
  }

  return (
    <Layout>
      <Header
        onRefresh={fetchAnalysis}
        loading={loading}
        bankName={bankDetails?.bankName}
      />

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {!data && !loading && !error && (
        <div className="text-center text-slate-400 mt-20">
          No analysis data available. Click refresh to start.
        </div>
      )}

      {loading && !data && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
        </div>
      )}

      {data && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 mb-8">
            <ScoreSection score={data.score} rewards={data.rewards} />
            <StatsGrid
              metrics={data.metrics}
              streak={data.gamification?.streak}
            />
          </div>

          <DetailsGrid
            metrics={data.metrics}
            explainability={data.explainability}
          />

          <BadgesSection badges={data.gamification?.badges} />
        </>
      )}
    </Layout>
  );
}

export default App;
