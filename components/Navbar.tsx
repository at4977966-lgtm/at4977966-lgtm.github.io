import React, { useEffect, useState } from 'react';
import { Shield, LayoutDashboard, PlusCircle, LogIn, LogOut, Lock, Moon, Sun } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const { user, signOut } = useAuth();
  
  // Theme State
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    // Default to dark if no preference or explicitly dark
    return saved ? saved === 'dark' : true; 
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 border-b border-slate-200 dark:border-white/5 bg-white/80 dark:bg-[#0D1117]/80 backdrop-blur-md z-50 flex items-center px-6 justify-between transition-colors duration-300">
      {/* Brand */}
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center shadow-[0_0_15px_rgba(0,242,255,0.15)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
          <Shield className="w-5 h-5 text-primary" />
        </div>
        <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-primary transition-colors">JustMe</span>
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-1 bg-slate-100/50 dark:bg-[#161b22]/50 p-1 rounded-lg border border-slate-200 dark:border-white/5 backdrop-blur-sm">
        {[
          { path: '/dashboard', icon: LayoutDashboard, label: 'Live Dashboard' },
          { path: '/create', icon: PlusCircle, label: 'Create' },
          { path: '/security', icon: Lock, label: 'Transparency' }
        ].map((item) => (
          <Link key={item.path} to={item.path}>
            <button className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-300 relative overflow-hidden group ${isActive(item.path) ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'}`}>
              <span className="flex items-center gap-2 relative z-10">
                <item.icon className={`w-4 h-4 transition-transform duration-300 ${isActive(item.path) ? 'scale-110' : 'group-hover:scale-110'}`} /> 
                {item.label}
              </span>
            </button>
          </Link>
        ))}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button 
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 dark:text-gray-400 hover:text-primary transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {!user ? (
          <Link to="/auth">
            <button className="text-sm font-medium text-slate-500 dark:text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group">
              <LogIn className="w-4 h-4 group-hover:text-primary group-hover:translate-x-1 transition-all" /> Login
            </button>
          </Link>
        ) : (
          <>
            <button
              onClick={() => signOut()}
              className="text-sm font-medium text-slate-500 dark:text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
              title="Logout"
            >
              <LogOut className="w-4 h-4 group-hover:text-primary transition-all" /> Logout
            </button>
            <div
              className="w-8 h-8 rounded-full bg-gradient-to-r from-slate-200 to-slate-300 dark:from-gray-800 dark:to-gray-700 border border-slate-300 dark:border-white/10 shadow-lg grid place-items-center text-xs font-bold text-slate-700 dark:text-gray-300"
              title={user.displayName || user.email || 'User'}
            >
              {(user.displayName?.[0] || user.email?.[0] || 'U').toUpperCase()}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
