import React from 'react';
import { Card, Badge } from '../components/UI';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-12 animate-enter">
      {/* Main Content */}
      <div className="flex-1 space-y-12">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Terms of Service</h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm">Last Updated: October 2024</p>
        </div>

        <section>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">1. Software License</h2>
            <Badge color="cyan">TL;DR: You can use it, but you don't own it.</Badge>
          </div>
          <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-sm">
            JustMe grants you a revocable, non-exclusive, non-transferable, limited license to download, install, and use the Application strictly in accordance with the terms of this Agreement. You strictly prohibited from sub-licensing, renting, leasing, selling, distributing, or otherwise making the Application available to third parties.
          </p>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">2. No Liability Clause</h2>
            <Badge color="cyan">TL;DR: We aren't responsible if you lag out.</Badge>
          </div>
          <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-sm">
            In no event shall JustMe, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service.
          </p>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">3. Anti-Reverse Engineering</h2>
            <Badge color="cyan">TL;DR: Don't try to crack our code.</Badge>
          </div>
          <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-sm">
            You agree not to, and you will not permit others to: (a) license, sell, rent, lease, assign, distribute, transmit, host, outsource, disclose or otherwise commercially exploit the Application; (b) copy or use the Application for any purpose other than as permitted under the above section 'License'; (c) modify, make derivative works of, disassemble, decrypt, reverse compile or reverse engineer any part of the Application.
          </p>
        </section>
      </div>

      {/* Sticky TL;DR Sidebar */}
      <div className="hidden lg:block w-80 relative">
        <div className="sticky top-24">
          <Card className="border-primary/20 bg-primary/5">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Summary</h3>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-gray-300">
              <li className="flex gap-2">
                <span className="text-primary font-bold">1.</span>
                <span>Use the software only for playing in supported tournaments.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">2.</span>
                <span>We are not liable for PC crashes or network issues.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">3.</span>
                <span>Decompiling or cracking the anti-cheat is a violation.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">4.</span>
                <span>Cheating results in an instant, non-negotiable ban.</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Terms;