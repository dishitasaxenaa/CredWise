const API_BASE = "http://localhost:5000";

export async function fetchDashboard(token) {
  const res = await fetch(`${API_BASE}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to load dashboard");
  }

  return res.json();
}
