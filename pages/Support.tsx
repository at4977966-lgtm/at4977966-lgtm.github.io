import React, { useState } from 'react';
import { MessageSquare, Wrench, AlertCircle, Send } from 'lucide-react';
import { Card, Input, Button } from '../components/UI';

const Support: React.FC = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6 flex items-center justify-center animate-enter">
        <Card className="text-center py-12 max-w-md">
           <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
             <Send className="w-8 h-8 text-emerald-600 dark:text-emerald-500" />
           </div>
           <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Ticket Received</h2>
           <p className="text-slate-500 dark:text-gray-400">Our team will review your request. If this is a ban appeal, expect a response within 72 hours.</p>
           <Button className="mt-6" onClick={() => setSent(false)}>Back to Support</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-4xl mx-auto animate-enter">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Support & Appeals</h1>
        <p className="text-slate-500 dark:text-gray-400">We are here to help, even when things go wrong.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Card>
           <div className="flex items-center gap-3 mb-4">
             <Wrench className="w-6 h-6 text-primary" />
             <h3 className="text-xl font-bold text-slate-900 dark:text-white">Troubleshooting</h3>
           </div>
           <ul className="space-y-3 text-sm text-slate-500 dark:text-gray-400">
             <li className="border-b border-slate-200 dark:border-white/5 pb-2">
               <strong className="block text-slate-900 dark:text-white mb-1">Client won't launch?</strong>
               Check if Windows Defender is blocking 'JustMe_Client.exe'. Whitelist it.
             </li>
             <li className="border-b border-slate-200 dark:border-white/5 pb-2">
               <strong className="block text-slate-900 dark:text-white mb-1">Connection Error (Jio Fiber)?</strong>
               Disable IPv6 in your network adapter settings or use a VPN.
             </li>
             <li>
               <strong className="block text-slate-900 dark:text-white mb-1">Dashboard not updating?</strong>
               Refresh the browser. Do not close the game client.
             </li>
           </ul>
        </Card>

        <Card>
           <div className="flex items-center gap-3 mb-4">
             <AlertCircle className="w-6 h-6 text-danger" />
             <h3 className="text-xl font-bold text-slate-900 dark:text-white">Ban Policy</h3>
           </div>
           <p className="text-sm text-slate-500 dark:text-gray-400 mb-4">
             Bans are issued automatically by the Sentinel Engine. False positives are rare (0.01%).
           </p>
           <div className="text-sm text-slate-500 dark:text-gray-400">
             <strong>Required for Appeal:</strong>
             <ul className="list-disc pl-4 mt-2 space-y-1">
               <li>Handcam recording of gameplay</li>
               <li>Task Manager process dump</li>
               <li>Match ID</li>
             </ul>
           </div>
        </Card>
      </div>

      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-secondary" /> Submit a Ticket
        </h2>
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Player Name" placeholder="IGN" required />
              <Input label="UID" placeholder="12345678" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Issue Type</label>
              <select className="w-full bg-slate-50 dark:bg-[#0D1117]/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-primary">
                <option>Technical Issue</option>
                <option>Ban Appeal</option>
                <option>Report a Bug</option>
                <option>General Question</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Message</label>
              <textarea 
                className="w-full bg-slate-50 dark:bg-[#0D1117]/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-primary h-32 transition-shadow"
                placeholder="Describe your issue..."
                required
              ></textarea>
            </div>
            <Input label="Proof URL (Google Drive/YouTube)" placeholder="https://..." />
            <Button type="submit" className="w-full" icon={<Send className="w-4 h-4"/>}>Submit Request</Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
export default Support;