import { useState, useCallback } from 'react';

export const useAnalysis = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAnalysis = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/analysis/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await response.json();
      if (result.success) {
        setData(result.data.analysis);
      } else {
        setError('Failed to fetch analysis');
      }
    } catch (err) {
      console.error(err);
      setError('Error connecting to backend');
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchAnalysis };
};
