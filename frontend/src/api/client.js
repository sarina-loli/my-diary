// Thin fetch wrapper around the Django REST API: attaches the JWT access
// token to every request and transparently refreshes it once if a request
// comes back as 401 (expired token).
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
const TOKENS_KEY = "diary:tokens";

export function getTokens() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(TOKENS_KEY) || "null");
  } catch {
    return null;
  }
}

export function setTokens(tokens) {
  if (tokens) localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
  else localStorage.removeItem(TOKENS_KEY);
}

async function refreshAccessToken() {
  const tokens = getTokens();
  if (!tokens?.refresh) return null;
  const res = await fetch(`${API_URL}/auth/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: tokens.refresh }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  const next = { ...tokens, access: data.access };
  setTokens(next);
  return next;
}

function firstErrorMessage(data) {
  if (!data || typeof data !== "object") return null;
  const value = Object.values(data)[0];
  return Array.isArray(value) ? value[0] : typeof value === "string" ? value : null;
}

// Runs one API call, retrying once with a refreshed token if it expired.
export async function apiRequest(path, options = {}) {
  const call = async () => {
    const tokens = getTokens();
    const headers = { "Content-Type": "application/json", ...options.headers };
    if (tokens?.access) headers.Authorization = `Bearer ${tokens.access}`;
    return fetch(`${API_URL}${path}`, { ...options, headers });
  };

  let res = await call();
  if (res.status === 401 && getTokens()?.refresh) {
    const refreshed = await refreshAccessToken();
    if (refreshed) res = await call();
  }

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(firstErrorMessage(data) || "Something went wrong. Please try again.");
  }
  return data;
}
