import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, Button, Input } from '../components/UI';
import { LogIn, Mail, Lock, UserPlus, Ghost } from 'lucide-react';
import { useAuth } from '../auth/AuthProvider';

const Auth: React.FC = () => {
  const { signInWithGoogle, signInWithEmailAndPassword, signUpWithEmailAndPassword, signInAnonymously } = useAuth();
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectTo = decodeURIComponent(search.get('redirect') || '/');

  const handleSuccess = () => {
    navigate(redirectTo || '/', { replace: true });
  };

  const handleGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithGoogle();
      handleSuccess();
    } catch (e: any) {
      setError(e?.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      if (mode === 'signin') {
        await signInWithEmailAndPassword(email, password);
      } else {
        await signUpWithEmailAndPassword(email, password);
      }
      handleSuccess();
    } catch (e: any) {
      setError(e?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymous = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInAnonymously();
      handleSuccess();
    } catch (e: any) {
      setError(e?.message || 'Anonymous sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 flex items-center justify-center animate-enter">
      <Card className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Authentication</h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Sign in to continue</p>
        </div>

        <div className="grid gap-3">
          <Button onClick={handleGoogle} isLoading={loading} className="w-full" icon={<LogIn className="w-4 h-4" />}>
            Continue with Google
          </Button>
          <Button onClick={handleAnonymous} isLoading={loading} className="w-full" variant="secondary" icon={<Ghost className="w-4 h-4" />}>
            Continue as Guest
          </Button>
        </div>

        <div className="relative">
          <div className="border-t border-slate-200 dark:border-white/10" />
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white dark:bg-[#161b22] px-2 text-xs text-slate-500 dark:text-gray-400">or with email</span>
        </div>

        <form onSubmit={handleEmail} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-danger text-sm">{error}</div>}
          <Button type="submit" isLoading={loading} className="w-full" icon={mode === 'signin' ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}>
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <div className="text-center text-sm">
          {mode === 'signin' ? (
            <button className="text-primary hover:text-primaryHover" onClick={() => setMode('signup')}>
              Need an account? Sign up
            </button>
          ) : (
            <button className="text-primary hover:text-primaryHover" onClick={() => setMode('signin')}>
              Have an account? Sign in
            </button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Auth;
