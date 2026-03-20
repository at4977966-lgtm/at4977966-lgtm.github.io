import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth } from '../services/firebase';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword as fbSignInWithEmailAndPassword,
  createUserWithEmailAndPassword as fbCreateUserWithEmailAndPassword,
  signInAnonymously as fbSignInAnonymously,
  signOut as fbSignOut,
  User,
} from 'firebase/auth';

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  signUpWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  signInAnonymously: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const signInWithGoogle = async () => {
    if (!auth) throw new Error('Authentication is not configured');
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signInWithEmailAndPassword = async (email: string, password: string) => {
    if (!auth) throw new Error('Authentication is not configured');
    await fbSignInWithEmailAndPassword(auth, email, password);
  };

  const signUpWithEmailAndPassword = async (email: string, password: string) => {
    if (!auth) throw new Error('Authentication is not configured');
    await fbCreateUserWithEmailAndPassword(auth, email, password);
  };

  const signInAnonymously = async () => {
    if (!auth) throw new Error('Authentication is not configured');
    await fbSignInAnonymously(auth);
  };

  const signOut = async () => {
    if (!auth) throw new Error('Authentication is not configured');
    await fbSignOut(auth);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      signInWithGoogle,
      signInWithEmailAndPassword,
      signUpWithEmailAndPassword,
      signInAnonymously,
      signOut,
    }),
    [user, loading]
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
