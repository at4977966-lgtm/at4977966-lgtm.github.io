import React from 'react';
import { Eye, Lock, FileX, Server } from 'lucide-react';
import { Card } from '../components/UI';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-4xl mx-auto animate-enter">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Privacy & Data Promise</h1>
        <p className="text-slate-500 dark:text-gray-400">No legalese. Just the truth about your data.</p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Data Nutrition Label</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <Card className="bg-white dark:bg-[#161b22]/80">
              <h3 className="text-secondary dark:text-secondary font-bold mb-4 uppercase tracking-wider text-sm">What We Collect</h3>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-gray-300">
                <li className="flex items-center gap-3"><Server className="w-4 h-4 text-secondary"/> Hardware Hash (HWID)</li>
                <li className="flex items-center gap-3"><Server className="w-4 h-4 text-secondary"/> In-Game UID & IGN</li>
                <li className="flex items-center gap-3"><Server className="w-4 h-4 text-secondary"/> List of Active Process Names</li>
                <li className="flex items-center gap-3"><Server className="w-4 h-4 text-secondary"/> Game Window Screenshots</li>
              </ul>
           </Card>
           <Card className="bg-white dark:bg-[#161b22]/80">
              <h3 className="text-slate-400 dark:text-gray-500 font-bold mb-4 uppercase tracking-wider text-sm">What We Ignore</h3>
              <ul className="space-y-3 text-sm text-slate-500 dark:text-gray-400">
                <li className="flex items-center gap-3"><FileX className="w-4 h-4"/> Browser History & Cookies</li>
                <li className="flex items-center gap-3"><FileX className="w-4 h-4"/> Personal Files (Photos/Docs)</li>
                <li className="flex items-center gap-3"><FileX className="w-4 h-4"/> Chat Logs (Discord/WhatsApp)</li>
                <li className="flex items-center gap-3"><FileX className="w-4 h-4"/> Passwords & Credentials</li>
              </ul>
           </Card>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-cyan-50 dark:bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg shadow-sm transition-all duration-300 hover:shadow-md">
           <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
             <Eye className="w-5 h-5 text-primary"/> Screen-Capture Policy
           </h3>
           <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">
             Screenshots are taken randomly during active tournament hours only. 
             They are <strong>encrypted immediately</strong> (AES-256) and are <strong>automatically deleted</strong> from our servers 48 hours after the match concludes.
           </p>
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-500/5 border-l-4 border-emerald-500 p-6 rounded-r-lg shadow-sm transition-all duration-300 hover:shadow-md">
           <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
             <Lock className="w-5 h-5 text-emerald-500"/> Zero-Selling Pledge
           </h3>
           <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">
             We do not sell your data. We do not share your data with advertisers. 
             Your HWID is used solely for the purpose of integrity verification in tournaments you explicitly join.
           </p>
        </div>
      </div>
    </div>
  );
};
export default Privacy;