const API_BASE = "http://localhost:3001";

// Helper: attach token automatically
export function authHeaders() {
  const token = localStorage.getItem("prepme_token");

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

export const api = {
  // Auth
  register: `${API_BASE}/auth/register`,
  login: `${API_BASE}/auth/login`,

  // Interview
  interview: `${API_BASE}/api/interview`,
  endInterview: `${API_BASE}/api/interview/end`,

  // Sessions
  sessions: `${API_BASE}/sessions`,
  sessionById: (id) => `${API_BASE}/sessions/${id}`,

  // Resume / CV / future endpoints (optional but recommended)
  resumes: `${API_BASE}/api/resumes`,
  enhance: `${API_BASE}/api/enhance`,
  enhanceAll: `${API_BASE}/api/enhance-all`,
};