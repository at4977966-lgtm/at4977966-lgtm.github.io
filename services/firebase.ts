import { initializeApp, getApps } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

type Cfg = {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  appId?: string;
};

const envConfig: Cfg = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const isValid = (c?: Cfg) =>
  !!(c && c.apiKey && c.authDomain && c.projectId && c.appId);

declare global {
  interface Window {
    __FIREBASE_CONFIG__?: Cfg;
  }
}

let app = getApps()[0] ?? null;
let auth: Auth | null = app ? getAuth(app) : null;

const initWithConfig = (cfg: Cfg) => {
  if (!isValid(cfg)) return null;
  if (!app) {
    app = initializeApp(cfg as Required<Cfg>);
  }
  auth = getAuth(app);
  return auth;
};

export const initAuth = async (): Promise<Auth | null> => {
  if (auth) return auth;
  if (isValid(envConfig)) {
    return initWithConfig(envConfig);
  }
  if (typeof window !== 'undefined') {
    if (isValid(window.__FIREBASE_CONFIG__)) {
      return initWithConfig(window.__FIREBASE_CONFIG__!);
    }
    try {
      const res = await fetch('/firebase-config.json', { cache: 'no-store' });
      if (res.ok) {
        const cfg = (await res.json()) as Cfg;
        window.__FIREBASE_CONFIG__ = cfg;
        if (isValid(cfg)) {
          return initWithConfig(cfg);
        }
      }
    } catch {
      /* noop */
    }
  }
  return null;
};

export { auth };
export default app;
