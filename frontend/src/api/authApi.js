const API_BASE = "http://localhost:5000";

export async function connectBank(formData) {
  const res = await fetch(`${API_BASE}/bank/connect`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Bank connection failed");
  }

  return res.json();
}
