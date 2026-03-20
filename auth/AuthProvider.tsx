import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth as rawAuth, initAuth } from '../services/firebase';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword as fbSignInWithEmailAndPassword,
  createUserWithEmailAndPassword as fbCreateUserWithEmailAndPassword,
  signOut as fbSignOut,
  User,
} from 'firebase/auth';

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  configured: boolean;
  status: 'idle' | 'signing-in' | 'signing-out' | 'error';
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  signUpWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [configured, setConfigured] = useState(false);
  const [status, setStatus] = useState<'idle' | 'signing-in' | 'signing-out' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsub: (() => void) | undefined;
    const boot = async () => {
      const a = rawAuth ?? (await initAuth());
      if (!a) {
        setConfigured(false);
        setLoading(false);
        return;
      }
      setConfigured(true);
      unsub = onAuthStateChanged(a, (u) => {
        setUser(u);
        setLoading(false);
      });
    };
    boot();
    return () => {
      if (unsub) unsub();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      setStatus('signing-in');
      setError(null);
      const a = rawAuth ?? (await initAuth());
      if (!a) throw new Error('Authentication is not configured');
      const provider = new GoogleAuthProvider();
      await signInWithPopup(a, provider);
      setStatus('idle');
    } catch (e: any) {
      setStatus('error');
      setError(e?.message || 'Sign in failed');
      throw e;
    }
  };

  const signInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      setStatus('signing-in');
      setError(null);
      const a = rawAuth ?? (await initAuth());
      if (!a) throw new Error('Authentication is not configured');
      await fbSignInWithEmailAndPassword(a, email, password);
      setStatus('idle');
    } catch (e: any) {
      setStatus('error');
      setError(e?.message || 'Sign in failed');
      throw e;
    }
  };

  const signUpWithEmailAndPassword = async (email: string, password: string) => {
    try {
      setStatus('signing-in');
      setError(null);
      const a = rawAuth ?? (await initAuth());
      if (!a) throw new Error('Authentication is not configured');
      await fbCreateUserWithEmailAndPassword(a, email, password);
      setStatus('idle');
    } catch (e: any) {
      setStatus('error');
      setError(e?.message || 'Sign up failed');
      throw e;
    }
  };

  const signOut = async () => {
    try {
      setStatus('signing-out');
      setError(null);
      const a = rawAuth ?? (await initAuth());
      if (!a) throw new Error('Authentication is not configured');
      await fbSignOut(a);
      setStatus('idle');
    } catch (e: any) {
      setStatus('error');
      setError(e?.message || 'Sign out failed');
      throw e;
    }
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      configured,
      status,
      error,
      signInWithGoogle,
      signInWithEmailAndPassword,
      signUpWithEmailAndPassword,
      signOut,
    }),
    [user, loading, configured, status, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
