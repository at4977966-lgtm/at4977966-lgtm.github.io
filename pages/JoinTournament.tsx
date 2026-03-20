import React, { useState } from 'react';
import { Lock, AlertCircle, Terminal, LogIn } from 'lucide-react';
import { Button, Input, Card } from '../components/UI';

const JoinTournament: React.FC = () => {
  const [tid, setTid] = useState('');
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate connection
    setTimeout(() => {
      setLoading(false);
      setJoined(true);
    }, 2000);
  };

  if (joined) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6 flex items-center justify-center animate-enter">
        <Card className="max-w-md w-full text-center py-12">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Lock className="w-8 h-8 text-emerald-600 dark:text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Securely Connected</h2>
          <p className="text-slate-500 dark:text-gray-400 mb-8">
            Your Hardware ID has been logged and bound to Tournament #{tid}. 
            Do not switch devices or networks.
          </p>
          <div className="bg-slate-50 dark:bg-surfaceHighlight p-4 rounded-lg font-mono text-xs text-left mb-6 space-y-2 border border-slate-200 dark:border-white/5">
             <div className="flex justify-between text-slate-500 dark:text-gray-500"><span>STATUS</span><span className="text-emerald-500 dark:text-emerald-400">ACTIVE</span></div>
             <div className="flex justify-between text-slate-500 dark:text-gray-500"><span>HWID</span><span className="text-slate-700 dark:text-gray-300">B29F-XXXX-XXXX-99A1</span></div>
             <div className="flex justify-between text-slate-500 dark:text-gray-500"><span>CLIENT</span><span className="text-slate-700 dark:text-gray-300">v2.4.0-release</span></div>
          </div>
          <Button variant="outline" onClick={() => setJoined(false)}>Disconnect</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 flex items-center justify-center animate-enter">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Join Lobby</h1>
          <p className="text-slate-500 dark:text-gray-400 mt-2">Enter your credentials to sync with the tournament server.</p>
        </div>

        <Card className="border-t-4 border-t-indigo-500">
          <form onSubmit={handleJoin} className="space-y-6">
            <div className="bg-amber-100 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0" />
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-amber-700 dark:text-amber-500">Hardware Lock Active</h4>
                <p className="text-xs text-amber-600 dark:text-amber-200/70 leading-relaxed">
                  By joining, you consent to Sentinel scanning your active processes and locking your session to this device's HWID.
                </p>
              </div>
            </div>

            <Input 
              label="Tournament ID" 
              placeholder="e.g. 882910" 
              value={tid}
              onChange={(e) => setTid(e.target.value)}
              required
            />
            
            <Input 
              label="Player Name (IGN)" 
              placeholder="e.g. Skyler_FF" 
              required
            />

            <Button type="submit" className="w-full" isLoading={loading} icon={<Terminal className="w-4 h-4" />}>
              Connect & Verify
            </Button>
          </form>
        </Card>

        <p className="text-center text-xs text-slate-500 dark:text-gray-600">
          Powered by Sentinel Anti-Cheat Engine v2.4
        </p>
      </div>
    </div>
  );
};

export default JoinTournament;