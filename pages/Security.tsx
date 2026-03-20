import React from 'react';
import { Shield, Eye, EyeOff, Lock, Cpu, Github, Check, X, FileText, Server, AlertTriangle } from 'lucide-react';
import { Button, Card } from '../components/UI';

const Security: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-7xl mx-auto animate-enter">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 border border-primary/20 shadow-[0_0_30px_rgba(0,242,255,0.1)] animate-float">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">The Transparency Hub</h1>
        <p className="text-slate-500 dark:text-gray-400 text-lg">
          We believe security should be open, auditable, and respect your privacy. 
          Here is exactly how JustMe protects tournaments without invading your life.
        </p>
      </div>

      {/* Section A: What We See vs What We Don't */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
          <Eye className="w-6 h-6 text-primary" /> What We See (And What We Don't)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* We Scan */}
          <Card className="border-t-4 border-t-primary hover:border-primary/50 transition-all duration-300">
            <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
              <Check className="w-5 h-5" /> We Scan For...
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-primary/10 p-1.5 rounded text-primary mt-0.5"><Cpu className="w-4 h-4" /></div>
                <div>
                  <span className="block text-slate-900 dark:text-white font-medium">Active Processes</span>
                  <span className="text-sm text-slate-500 dark:text-gray-400">To identify known hack signatures and injector tools running in background.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-primary/10 p-1.5 rounded text-primary mt-0.5"><Server className="w-4 h-4" /></div>
                <div>
                  <span className="block text-slate-900 dark:text-white font-medium">Emulator Memory</span>
                  <span className="text-sm text-slate-500 dark:text-gray-400">To detect real-time AOB (Array of Bytes) swaps used for aim-assist exploits.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-primary/10 p-1.5 rounded text-primary mt-0.5"><AlertTriangle className="w-4 h-4" /></div>
                <div>
                  <span className="block text-slate-900 dark:text-white font-medium">ADB Connections</span>
                  <span className="text-sm text-slate-500 dark:text-gray-400">To immediately block external script panels trying to bridge into the game instance.</span>
                </div>
              </li>
            </ul>
          </Card>

          {/* We NEVER Access */}
          <Card className="border-t-4 border-t-red-500/70 bg-red-50 dark:bg-danger/5 hover:border-red-500 transition-all duration-300">
            <h3 className="text-lg font-bold text-red-600 dark:text-danger mb-6 flex items-center gap-2">
              <X className="w-5 h-5" /> We NEVER Access...
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-red-100 dark:bg-danger/10 p-1.5 rounded text-red-600 dark:text-danger mt-0.5"><FileText className="w-4 h-4" /></div>
                <div>
                  <span className="block text-slate-900 dark:text-white font-medium">Personal Files</span>
                  <span className="text-sm text-slate-500 dark:text-gray-400">Your photos, documents, browser history, and private folders are off-limits.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-red-100 dark:bg-danger/10 p-1.5 rounded text-red-600 dark:text-danger mt-0.5"><Lock className="w-4 h-4" /></div>
                <div>
                  <span className="block text-slate-900 dark:text-white font-medium">Passwords & Keystrokes</span>
                  <span className="text-sm text-slate-500 dark:text-gray-400">We do not log what you type outside of the game window.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-red-100 dark:bg-danger/10 p-1.5 rounded text-red-600 dark:text-danger mt-0.5"><EyeOff className="w-4 h-4" /></div>
                <div>
                  <span className="block text-slate-900 dark:text-white font-medium">Microphone / Camera</span>
                  <span className="text-sm text-slate-500 dark:text-gray-400">We have absolutely no code capability to record your voice or video.</span>
                </div>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Section B: The 30-Second Screenshot */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">The 30-Second Screenshot Policy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#161b22] p-6 rounded-xl border border-slate-200 dark:border-white/10 hover:scale-105 transition-transform duration-300 shadow-md">
            <div className="text-secondary dark:text-secondary font-bold text-lg mb-2">01. Privacy Guard</div>
            <p className="text-slate-500 dark:text-gray-400 text-sm">Screenshots are strictly limited to the game window and desktop composition to find visual overlays. We do not capture secondary monitors if they are not running the game.</p>
          </div>
          <div className="bg-white dark:bg-[#161b22] p-6 rounded-xl border border-slate-200 dark:border-white/10 hover:scale-105 transition-transform duration-300 shadow-md">
            <div className="text-secondary dark:text-secondary font-bold text-lg mb-2">02. Instant Deletion</div>
            <p className="text-slate-500 dark:text-gray-400 text-sm">All captured images are encrypted end-to-end. They are automatically permanently deleted from our servers 48 hours after the tournament concludes.</p>
          </div>
          <div className="bg-white dark:bg-[#161b22] p-6 rounded-xl border border-slate-200 dark:border-white/10 hover:scale-105 transition-transform duration-300 shadow-md">
            <div className="text-secondary dark:text-secondary font-bold text-lg mb-2">03. Low Impact</div>
            <p className="text-slate-500 dark:text-gray-400 text-sm">Images are heavily compressed to ~50KB using high-efficiency algorithms so your internet bandwidth and ping remain unaffected.</p>
          </div>
        </div>
      </div>

      {/* Section C: Why No Kernel Driver? */}
      <div className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-8 md:p-12 mb-20 relative overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Cpu className="w-64 h-64 text-slate-900 dark:text-white" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Why No Kernel Driver?</h2>
          <p className="text-slate-600 dark:text-gray-300 mb-6 leading-relaxed">
            Unlike heavy anti-cheats that burrow deep into your operating system (Ring 0), JustMe operates entirely in 
            <span className="text-primary font-bold"> User-Mode (Ring 3)</span>.
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3 text-slate-600 dark:text-gray-300">
              <Check className="w-5 h-5 text-secondary" />
              <span><strong>Safe Execution:</strong> We cannot crash your Windows "Blue Screen" or corrupt boot files.</span>
            </li>
            <li className="flex items-center gap-3 text-slate-600 dark:text-gray-300">
              <Check className="w-5 h-5 text-secondary" />
              <span><strong>Easy Exit:</strong> When you close the tournament, the anti-cheat stops completely. It does not run 24/7.</span>
            </li>
            <li className="flex items-center gap-3 text-slate-600 dark:text-gray-300">
              <Check className="w-5 h-5 text-secondary" />
              <span><strong>No Conflicts:</strong> Works alongside your existing antivirus without false positives.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Section D: Open Source */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Open Source Verification</h2>
        <p className="text-slate-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          Don't just take our word for it. Our core engine is open-source, allowing any developer in the world to audit our code and verify that it matches our promises.
        </p>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <Button variant="secondary" icon={<Github className="w-5 h-5" />} className="px-8 hover:scale-105 transition-transform">
            View Source on GitHub
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Security;