// Talks to the Django API and keeps the same function names/shapes the
// frontend components already use, so the components themselves barely
// change. A copy of the current user is cached in localStorage (refreshed
// after every login/register) purely so `getUser()` can stay synchronous.
import { apiRequest, getTokens, setTokens } from "./client";

const USER_KEY = "diary:user";
const canStore = () => typeof window !== "undefined";

function setUser(user) {
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  else localStorage.removeItem(USER_KEY);
}

function toUser(apiUser) {
  return { name: apiUser.name, email: apiUser.email, diaryName: apiUser.diary_name };
}

function toEntry(apiEntry) {
  return {
    id: apiEntry.id,
    title: apiEntry.title,
    content: apiEntry.content,
    mood: apiEntry.mood,
    createdAt: apiEntry.created_at,
  };
}

export function getUser() {
  if (!canStore()) return null;
  try {
    const value = localStorage.getItem(USER_KEY);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function isLoggedIn() {
  return canStore() && Boolean(getTokens()?.access) && Boolean(getUser());
}

export async function registerUser({ name, email, password, diaryName }) {
  const data = await apiRequest("/auth/register/", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
      confirm_password: password,
      diary_name: diaryName,
    }),
  });
  setTokens({ access: data.access, refresh: data.refresh });
  setUser(toUser(data.user));
}

export async function loginUser(email, password) {
  const data = await apiRequest("/auth/login/", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setTokens({ access: data.access, refresh: data.refresh });
  setUser(toUser(data.user));
}

export async function logoutUser() {
  const tokens = getTokens();
  try {
    if (tokens?.refresh) {
      await apiRequest("/auth/logout/", {
        method: "POST",
        body: JSON.stringify({ refresh: tokens.refresh }),
      });
    }
  } catch {
    // Even if the server call fails, we still clear the local session below.
  } finally {
    setTokens(null);
    setUser(null);
  }
}

export async function getEntries() {
  const entries = await apiRequest("/entries/");
  return entries.map(toEntry);
}

export async function addEntry({ title, content, mood }) {
  const entry = await apiRequest("/entries/", {
    method: "POST",
    body: JSON.stringify({ title, content, mood }),
  });
  return toEntry(entry);
}
