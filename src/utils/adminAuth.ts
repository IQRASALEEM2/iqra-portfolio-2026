export type AdminCredentials = {
  username: string;
  password: string;
};

const CREDENTIALS_KEY = 'deviqra.auth.credentials';
const LOGGED_IN_KEY = 'deviqra.auth.logged_in';

const DEFAULT_CREDENTIALS: AdminCredentials = {
  username: 'admin',
  password: 'password123',
};

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function ensureAdminCredentials(): AdminCredentials {
  if (typeof window === 'undefined') return DEFAULT_CREDENTIALS;

  const existing = safeParse<Partial<AdminCredentials>>(window.localStorage.getItem(CREDENTIALS_KEY));
  const hasUsername = typeof existing?.username === 'string' && existing.username.length > 0;
  const hasPassword = typeof existing?.password === 'string' && existing.password.length > 0;

  if (hasUsername && hasPassword) return { username: existing!.username!, password: existing!.password! };

  window.localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(DEFAULT_CREDENTIALS));
  return DEFAULT_CREDENTIALS;
}

export function getAdminCredentials(): AdminCredentials {
  return ensureAdminCredentials();
}

export function setAdminCredentials(next: AdminCredentials) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(next));
}

export function verifyAdminCredentials(username: string, password: string): boolean {
  const creds = getAdminCredentials();
  return username === creds.username && password === creds.password;
}

export function setAdminLoggedIn(isLoggedIn: boolean) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(LOGGED_IN_KEY, isLoggedIn ? 'true' : 'false');
}

export function isAdminLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(LOGGED_IN_KEY) === 'true';
}

export function logoutAdmin() {
  setAdminLoggedIn(false);
}

