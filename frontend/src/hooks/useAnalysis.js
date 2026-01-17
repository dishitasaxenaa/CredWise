import { useEffect, useState } from "react";
import { fetchDashboard } from "../api/dashboardApi";
import { useAuth } from "../context/AuthContext";

export default function useAnalysis() {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    async function load() {
      try {
        setLoading(true);
        const res = await fetchDashboard(token);
        setData(res);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [token]);

  return { data, loading, error };
}
