import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Lock, 
  Smartphone, 
  Code, 
  CheckCircle, 
  XCircle, 
  Terminal, 
  Eye, 
  Server, 
  Github, 
  ExternalLink,
  AlertOctagon,
  Cpu,
  Activity
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const BentoCard = ({ children, className, title, icon: Icon }: { children: React.ReactNode; className?: string; title: string; icon: any }) => (
  <div className={cn("relative overflow-hidden rounded-3xl bg-[#161b22]/80 border border-white/10 p-6 hover:border-white/20 transition-colors group", className)}>
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 rounded-lg bg-white/5 text-white/80">
        <Icon size={20} />
      </div>
      <h3 className="text-lg font-semibold text-white/90">{title}</h3>
    </div>
    <div className="relative z-10 h-full">{children}</div>
    {/* Subtle gradient glow on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
  </div>
);

const PricingCard = ({ title, price, features, cta, highlight = false }: { title: string; price: string; features: string[]; cta: string; highlight?: boolean }) => (
  <div className={cn("flex flex-col p-8 rounded-3xl border transition-all duration-300", 
    highlight ? "bg-[#161b22] border-primary/50 shadow-[0_0_30px_rgba(0,242,255,0.1)]" : "bg-[#0D1117] border-white/10 hover:border-white/20"
  )}>
    <h3 className="text-xl font-medium text-white/70 mb-2">{title}</h3>
    <div className="text-4xl font-mono font-bold text-white mb-6">{price}</div>
    <ul className="space-y-4 mb-8 flex-1">
      {features.map((feat, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
          <CheckCircle size={16} className="text-primary mt-0.5 shrink-0" />
          <span>{feat}</span>
        </li>
      ))}
    </ul>
    <button className={cn("w-full py-3 rounded-xl font-medium transition-all", 
      highlight ? "bg-primary text-black hover:bg-primaryHover" : "bg-white/10 text-white hover:bg-white/20"
    )}>
      {cta}
    </button>
  </div>
);

// --- Main Page ---

const Landing: React.FC = () => {
  const navigate = useNavigate();
  
  // Live Demo State
  const [players, setPlayers] = useState([
    { id: 'USR_9921', name: 'FaZe_Sniper', status: 'verified', ping: 24 },
    { id: 'USR_8832', name: 'OpTic_Rush', status: 'verified', ping: 18 },
    { id: 'USR_7745', name: 'Liquid_Aim', status: 'verified', ping: 32 },
    { id: 'USR_6651', name: 'C9_Shroud', status: 'verified', ping: 15 },
    { id: 'USR_5512', name: '100T_Nade', status: 'verified', ping: 28 },
  ]);
  const [alert, setAlert] = useState<{ title: string; msg: string } | null>(null);

  // Simulation Effect
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly flag a player
      if (Math.random() > 0.7) {
        const targetIdx = Math.floor(Math.random() * players.length);
        const newPlayers = [...players];
        
        // If already flagged, reset (to keep the demo moving)
        if (newPlayers[targetIdx].status === 'flagged') {
          newPlayers[targetIdx].status = 'verified';
          setAlert(null);
        } else {
          // Flag them
          newPlayers[targetIdx].status = 'flagged';
          setAlert({
            title: 'ADB-Bridge Attempt Blocked',
            msg: `HWID Blacklisted for ${newPlayers[targetIdx].name}`
          });
          
          // Reset after 3 seconds
          setTimeout(() => {
            setPlayers(prev => {
              const reset = [...prev];
              if (reset[targetIdx]) reset[targetIdx].status = 'verified';
              return reset;
            });
            setAlert(null);
          }, 3000);
        }
        setPlayers(newPlayers);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [players]);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans selection:bg-primary/30 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Grid & Scanning Line */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          <motion.div 
            initial={{ top: '-10%' }}
            animate={{ top: '110%' }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-primary shadow-[0_0_20px_rgba(0,242,255,0.5)]"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight">
              Integrity by Design.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Security by JustMe.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              The only headless C++ anti-cheat designed specifically to eliminate ADB hacks and screen-share bypasses in Free Fire PC.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => navigate('/create')}
                className="px-8 py-4 bg-primary text-[#0d0d0d] font-bold rounded-full text-lg shadow-[0_0_20px_rgba(0,242,255,0.4)] hover:shadow-[0_0_35px_rgba(0,242,255,0.6)] hover:scale-105 transition-all duration-300"
              >
                Get Started
              </button>
              <button 
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white/5 text-white font-medium rounded-full text-lg border border-white/10 hover:bg-white/10 transition-all"
              >
                See It In Action
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURES BENTO GRID */}
      <section className="py-32 px-6 relative z-10 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Engineered for Zero Tolerance</h2>
            <p className="text-gray-400">Our multi-layer protection stack runs silently in the background.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-auto md:h-[600px]">
            
            {/* Card 1: The Tech (Large, spans 2 cols) */}
            <BentoCard title="Kernel-Level Logic, User-Mode Safety" icon={Terminal} className="md:col-span-2 md:row-span-1">
              <div className="absolute inset-0 bg-[#0a0c10] p-4 font-mono text-xs text-green-400/80 overflow-hidden opacity-80">
                <div className="animate-[translateY_-50%_10s_linear_infinite]">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="whitespace-pre">
                      {`[INFO] Scanning process memory range 0x${Math.random().toString(16).slice(2,10).toUpperCase()}... OK`}
                      <br />
                      {`[CHECK] Integrity verification hash: ${Math.random().toString(36).slice(2)}... MATCH`}
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#161b22] to-transparent" />
            </BentoCard>

            {/* Card 2: The Catch (Tall) */}
            <BentoCard title="Screenshot Monitoring" icon={Eye} className="md:col-span-1 md:row-span-2">
              <div className="relative h-full w-full rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80" 
                  alt="Game Screenshot" 
                  className="w-full h-full object-cover blur-sm opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-red-500/20 border border-red-500 backdrop-blur-md px-4 py-2 rounded-lg flex items-center gap-2">
                    <AlertOctagon className="text-red-500" size={20} />
                    <span className="text-red-500 font-bold tracking-wider text-sm">VIOLATION DETECTED</span>
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Card 3: The Lock */}
            <BentoCard title="HWID Locking" icon={Lock} className="md:col-span-1 md:row-span-1">
              <div className="flex items-center justify-center h-full pb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                  <Lock size={64} className="text-primary relative z-10" />
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-xs text-primary/60">
                    ID: 8B-2A-F1-99
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Card 4: ADB Block */}
            <BentoCard title="ADB & Emulator Block" icon={Smartphone} className="md:col-span-1 md:row-span-1">
              <div className="flex items-center justify-center h-full pb-8">
                <div className="relative">
                  <Smartphone size={64} className="text-gray-600" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BanIcon className="text-red-500 w-24 h-24 opacity-80" />
                  </div>
                </div>
              </div>
            </BentoCard>

          </div>
        </div>
      </section>

      {/* 3. LIVE TRUST DEMO */}
      <section id="demo" className="py-24 px-6 bg-[#0a0c10] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Activity className="text-primary" /> Live Integrity Feed
            </h2>
            <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              SYSTEM ONLINE
            </div>
          </div>

          <div className="relative bg-[#0D1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            {/* Mock Header */}
            <div className="h-12 bg-[#161b22] border-b border-white/5 flex items-center px-4 justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                <div className="w-3 h-3 rounded-full bg-green-500/20" />
              </div>
              <div className="text-xs font-mono text-gray-600">admin_panel.exe</div>
            </div>

            {/* Player List */}
            <div className="p-2">
              <div className="grid grid-cols-4 px-4 py-2 text-xs font-mono text-gray-500 uppercase tracking-wider">
                <div>Player ID</div>
                <div>Gamertag</div>
                <div>Ping</div>
                <div className="text-right">Status</div>
              </div>
              <div className="space-y-1 mt-2">
                <AnimatePresence>
                  {players.map((p) => (
                    <motion.div 
                      key={p.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, backgroundColor: p.status === 'flagged' ? 'rgba(239, 68, 68, 0.1)' : 'transparent' }}
                      className={cn("grid grid-cols-4 px-4 py-3 rounded-lg items-center text-sm font-mono border border-transparent transition-colors",
                        p.status === 'flagged' ? "border-red-500/30" : "hover:bg-white/5"
                      )}
                    >
                      <div className="text-gray-400">{p.id}</div>
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-gray-500">{p.ping}ms</div>
                      <div className="text-right flex justify-end">
                        {p.status === 'verified' ? (
                          <span className="flex items-center gap-2 text-green-400 bg-green-400/10 px-2 py-1 rounded text-xs">
                            <CheckCircle size={12} /> VERIFIED
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 text-red-500 bg-red-500/10 px-2 py-1 rounded text-xs">
                            <XCircle size={12} /> FLAGGED
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Alert Popup */}
            <AnimatePresence>
              {alert && (
                <motion.div 
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  className="absolute bottom-8 right-8 bg-[#161b22] border border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.2)] p-4 rounded-xl flex items-start gap-4 max-w-sm z-20"
                >
                  <div className="p-2 bg-red-500/20 rounded-lg text-red-500">
                    <AlertOctagon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-red-500">{alert.title}</h4>
                    <p className="text-xs text-gray-400 mt-1">{alert.msg}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4. TRANSPARENCY */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-white/5 mb-8">
            <Github size={32} />
          </div>
          <h2 className="text-4xl font-bold mb-6">Open for Audit. Closed to Cheaters.</h2>
          <p className="text-xl text-gray-400 mb-10 leading-relaxed">
            We believe security shouldn't be a black box. Our client-side protection logic is open-source to prove it's not malware, while our Server-Side Verification remains the secret sauce that keeps games clean.
          </p>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primaryHover transition-colors border-b border-primary/30 hover:border-primary pb-1"
          >
            View Repository <ExternalLink size={16} />
          </a>
        </div>
      </section>

      {/* 5. PRICING */}
      <section className="py-24 px-6 bg-[#0a0c10]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Simple, Transparent Pricing</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard 
              title="Lite" 
              price="$0" 
              features={['Basic Protection', 'Up to 50 Players', 'Community Support', 'Standard Dashboard']} 
              cta="Start for Free" 
            />
            <PricingCard 
              title="Pro" 
              price="$49" 
              features={['Full Dashboard Access', 'Cloud Screenshots', 'HWID Logs & Export', 'Priority Support']} 
              cta="Register Tournament" 
              highlight 
            />
            <PricingCard 
              title="Elite" 
              price="Custom" 
              features={['API Access', 'White-label Client', 'Dedicated Server', '24/7 Live Monitoring']} 
              cta="Contact Sales" 
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/10 text-center text-gray-600 text-sm">
        <p>&copy; 2024 JustMe Integrity Systems. Not affiliated with Garena Free Fire.</p>
      </footer>

    </div>
  );
};

// Helper Icon for the Ban symbol overlay
const BanIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m4.9 4.9 14.2 14.2" />
  </svg>
);

export default Landing;
