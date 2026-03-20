import React from 'react';
import { Loader2 } from 'lucide-react';

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  isLoading, 
  icon,
  disabled,
  ...props 
}) => {
  const baseStyles = "relative overflow-hidden inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-bold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-[#0D1117] focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed uppercase active:scale-[0.98] group";
  
  const variants = {
    // Primary: Neon Cyan
    primary: "bg-primary hover:bg-primaryHover text-black shadow-[0_0_15px_rgba(0,242,255,0.3)] hover:shadow-[0_0_25px_rgba(0,242,255,0.5)] focus:ring-primary border border-transparent hover:-translate-y-0.5",
    
    // Secondary: Glass / White-ish in light mode
    secondary: "bg-slate-200/50 dark:bg-white/5 backdrop-blur-md border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white hover:bg-slate-300/50 dark:hover:bg-white/10 hover:border-slate-400 dark:hover:border-white/40 focus:ring-slate-500 dark:focus:ring-white/50 hover:-translate-y-0.5 shadow-sm",
    
    danger: "bg-red-50 dark:bg-danger/10 hover:bg-red-100 dark:hover:bg-danger/20 text-red-600 dark:text-danger border border-red-200 dark:border-danger/20 focus:ring-danger hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]",
    
    ghost: "text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 focus:ring-gray-500",
    
    outline: "bg-transparent border border-slate-300 dark:border-white/20 text-slate-600 dark:text-gray-300 hover:border-slate-400 dark:hover:border-white/40 hover:text-slate-900 dark:hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      disabled={isLoading || disabled}
      {...props}
    >
      {/* Background shine effect for primary */}
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
      )}
      
      {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : icon ? <span className="mr-2 transition-transform group-hover:scale-110">{icon}</span> : null}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

// --- Input ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full group">
      {label && <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 mb-2 uppercase tracking-wider group-focus-within:text-primary transition-colors">{label}</label>}
      <input 
        className={`w-full bg-slate-50 dark:bg-[#0D1117]/50 backdrop-blur-sm border ${error ? 'border-danger focus:ring-danger' : 'border-slate-200 dark:border-white/10 focus:ring-primary focus:border-primary/50 group-hover:border-slate-300 dark:group-hover:border-white/20'} rounded-lg px-4 py-3 text-slate-900 dark:text-gray-200 placeholder-slate-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all shadow-inner ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-danger animate-pulse">{error}</p>}
    </div>
  );
};

// --- Card ---
export const Card: React.FC<{ children: React.ReactNode; className?: string; hover?: boolean }> = ({ children, className = '', hover = false }) => {
  return (
    <div className={`
      bg-white dark:bg-[#161b22]/60 backdrop-blur-xl 
      border border-slate-200 dark:border-white/10 
      rounded-xl p-6 shadow-lg dark:shadow-xl 
      transition-all duration-300
      ${hover ? 'hover:border-primary/30 dark:hover:border-white/20 hover:-translate-y-1 hover:shadow-2xl dark:hover:bg-[#161b22]/80' : ''} 
      ${className}
    `}>
      {children}
    </div>
  );
};

// --- Badge ---
export const Badge: React.FC<{ children: React.ReactNode; color?: 'green' | 'yellow' | 'red' | 'blue' | 'gray' | 'cyan' | 'lime' }> = ({ children, color = 'gray' }) => {
  const colors = {
    green: "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20",
    yellow: "bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20",
    red: "bg-rose-100 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-500/20",
    blue: "bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20",
    gray: "bg-slate-100 dark:bg-gray-500/10 text-slate-600 dark:text-gray-400 border-slate-200 dark:border-gray-500/20",
    cyan: "bg-cyan-100 dark:bg-primary/10 text-cyan-800 dark:text-primary border-cyan-200 dark:border-primary/20 shadow-[0_0_10px_rgba(0,242,255,0.1)]",
    lime: "bg-lime-100 dark:bg-secondary/10 text-lime-800 dark:text-secondary border-lime-200 dark:border-secondary/20 shadow-[0_0_10px_rgba(204,255,0,0.1)]",
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${colors[color]} tracking-wide uppercase transition-colors duration-300`}>
      {children}
    </span>
  );
};