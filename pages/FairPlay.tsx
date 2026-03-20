import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Gavel, HelpCircle } from 'lucide-react';
import { Card, Button } from '../components/UI';
import { Link } from 'react-router-dom';

const FairPlay: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-5xl mx-auto animate-enter">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Fair Play & Integrity Policy</h1>
        <p className="text-slate-500 dark:text-gray-400">The Rules of Engagement. Strict, simple, and equal for everyone.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card className="border-t-4 border-t-emerald-500 hover:-translate-y-1 transition-transform duration-300">
           <div className="flex items-center gap-3 mb-6">
             <CheckCircle2 className="w-6 h-6 text-emerald-500" />
             <h2 className="text-xl font-bold text-slate-900 dark:text-white">Allowed Behavior</h2>
           </div>
           <ul className="space-y-4 text-slate-600 dark:text-gray-300 text-sm">
             <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>Standard peripherals (Mouse, Keyboard).</li>
             <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>Official Emulator versions (BlueStacks 5, MSI).</li>
             <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>Discord/TeamSpeak overlays (Visual only).</li>
             <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>OS Optimization (Windows Debloater).</li>
           </ul>
        </Card>

        <Card className="border-t-4 border-t-danger hover:-translate-y-1 transition-transform duration-300">
           <div className="flex items-center gap-3 mb-6">
             <XCircle className="w-6 h-6 text-danger" />
             <h2 className="text-xl font-bold text-slate-900 dark:text-white">Prohibited Behavior</h2>
           </div>
           <ul className="space-y-4 text-slate-600 dark:text-gray-300 text-sm">
             <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-danger mt-2 flex-shrink-0"></div>Any AOB (Array of Bytes) scanning or modification.</li>
             <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-danger mt-2 flex-shrink-0"></div>DLL Injection of any kind (ReShade, etc).</li>
             <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-danger mt-2 flex-shrink-0"></div>ADB-based script panels or 'regedit' tools.</li>
             <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-danger mt-2 flex-shrink-0"></div>Stream-proof overlays designed to hide visuals.</li>
           </ul>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="flex flex-col md:flex-row gap-6 items-center border border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/5">
          <div className="p-4 rounded-full bg-amber-100 dark:bg-amber-500/10">
             <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Hardware Locking Policy</h3>
            <p className="text-slate-600 dark:text-gray-400 text-sm">
              One PC, One UID. JustMe binds your account to your specific hardware signature. 
              Logging into a tournament account from a different machine mid-tournament will trigger an automatic disqualification.
            </p>
          </div>
        </Card>

        <Card className="flex flex-col md:flex-row gap-6 items-center border border-primary/20 bg-primary/5">
          <div className="p-4 rounded-full bg-primary/10">
             <Gavel className="w-8 h-8 text-cyan-700 dark:text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">The Strike System</h3>
            <p className="text-slate-600 dark:text-gray-400 text-sm mb-2">
              <strong className="text-slate-900 dark:text-white">Minor Offense (Macros):</strong> 1st Warning &rarr; 30 Day Ban.<br/>
              <strong className="text-slate-900 dark:text-white">Major Offense (Memory/Injection):</strong> Instant Permanent HWID Ban.
            </p>
            <p className="text-xs text-slate-500 dark:text-gray-500">Bans are shared across all tournament organizers using JustMe.</p>
          </div>
        </Card>
      </div>
      
      <div className="mt-12 text-center">
         <p className="text-slate-500 dark:text-gray-400 mb-4">Think you were flagged falsely?</p>
         <Link to="/support">
            <Button variant="secondary" icon={<HelpCircle className="w-4 h-4"/>}>Visit Appeals Center</Button>
         </Link>
      </div>
    </div>
  );
};
export default FairPlay;