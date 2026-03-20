import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, Search, MoreHorizontal, AlertTriangle, Eye, Activity, ShieldAlert, Sparkles, X } from 'lucide-react';
import { Button, Badge, Input, Card } from '../components/UI';
import { Player, PlayerStatus } from '../types';
import { analyzePlayerRisk } from '../services/geminiService';
import { useAuth } from '../auth/AuthProvider';

// Mock Data Generator
const generatePlayers = (count: number): Player[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `p-${i}`,
    name: `Player_${Math.floor(Math.random() * 10000)}`,
    uid: `8${Math.floor(Math.random() * 100000000)}`,
    hwid: `HWID-${Math.random().toString(36).substring(7).toUpperCase()}`,
    ping: Math.floor(Math.random() * 100) + 20,
    status: PlayerStatus.ONLINE,
    kdRatio: Number((Math.random() * 5 + 0.5).toFixed(2)),
    headshotRate: Math.floor(Math.random() * 95),
    reports: Math.random() > 0.9 ? Math.floor(Math.random() * 5) : 0,
    logs: [
      `[${new Date().toLocaleTimeString()}] Connected to server`,
      `[${new Date().toLocaleTimeString()}] Validated Game Client v1.6.2`,
      `[${new Date().toLocaleTimeString()}] HWID Verified`
    ]
  }));
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [players, setPlayers] = useState<Player[]>([]);
  const [search, setSearch] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{ score: number, text: string } | null>(null);

  // Initialize Data
  useEffect(() => {
    setPlayers(generatePlayers(12));
  }, []);

  // Heartbeat Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayers(prev => prev.map(p => {
        const newPing = Math.max(20, p.ping + (Math.random() * 20 - 10));
        let newStatus = p.status;
        
        // Randomly simulate disconnects or suspicious spikes
        if (Math.random() > 0.98) newStatus = PlayerStatus.OFFLINE;
        else if (Math.random() > 0.99) newStatus = PlayerStatus.SUSPICIOUS;
        else if (p.status === PlayerStatus.OFFLINE && Math.random() > 0.5) newStatus = PlayerStatus.ONLINE;

        return {
          ...p,
          ping: Math.floor(newPing),
          status: newStatus
        };
      }));
    }, 5000); // Update every 5s

    return () => clearInterval(interval);
  }, []);

  const handleAnalyze = async () => {
    if (!selectedPlayer) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    // Simulate screenshot check logic + Gemini
    // We pass the player data to the AI service
    const result = await analyzePlayerRisk(selectedPlayer);
    
    setAnalysisResult({
      score: result.riskScore,
      text: result.analysis
    });
    setIsAnalyzing(false);
  };

  const getStatusBadge = (status: PlayerStatus) => {
    switch (status) {
      case PlayerStatus.ONLINE: return <Badge color="green">Online</Badge>;
      case PlayerStatus.OFFLINE: return <Badge color="gray">Offline</Badge>;
      case PlayerStatus.IN_MATCH: return <Badge color="blue">In Match</Badge>;
      case PlayerStatus.SUSPICIOUS: return <Badge color="yellow">Suspicious</Badge>;
      case PlayerStatus.BANNED: return <Badge color="red">Banned</Badge>;
      default: return <Badge>Unknown</Badge>;
    }
  };

  const filteredPlayers = players.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.uid.includes(search)
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-7xl mx-auto animate-enter">
      {/* Simple Welcome Card */}
      <Card className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Welcome {user?.displayName || user?.email || 'Player'}
            </h2>
            <p className="text-slate-500 dark:text-gray-400 text-sm">
              Quick actions to get started.
            </p>
          </div>
          <div className="flex gap-2">
            <a href="#/create">
              <Button>New Tournament</Button>
            </a>
            <a href="#/join">
              <Button variant="secondary">Join Lobby</Button>
            </a>
          </div>
        </div>
      </Card>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Dashboard
          </h1>
          <p className="text-slate-500 dark:text-gray-400 mt-1">Tournament ID: #TRN-8829 • Winter Invitational 2024</p>
        </div>
        <div className="flex items-center gap-3">
           <Input 
             placeholder="Search UID or Name..." 
             className="w-64" 
             value={search}
             onChange={(e) => setSearch(e.target.value)}
           />
           <Button variant="secondary" icon={<RefreshCw className="w-4 h-4" />}>Refresh</Button>
        </div>
      </div>

      {/* Main Table Card */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5">
                <th className="p-4 text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wider">Player</th>
                <th className="p-4 text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wider">UID / HWID</th>
                <th className="p-4 text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wider">Telemetry</th>
                <th className="p-4 text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/5">
              {filteredPlayers.map(player => (
                <tr key={player.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-slate-900 dark:text-white">{player.name}</div>
                    <div className="text-xs text-slate-500 dark:text-gray-500">K/D: {player.kdRatio} • HS: {player.headshotRate}%</div>
                  </td>
                  <td className="p-4">
                    <div className="font-mono text-xs text-slate-600 dark:text-gray-300">{player.uid}</div>
                    <div className="font-mono text-[10px] text-slate-400 dark:text-gray-600 truncate max-w-[120px]">{player.hwid}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-gray-400">
                         <Activity className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
                         {player.ping}ms
                      </div>
                      {player.reports > 0 && (
                        <div className="flex items-center gap-1.5 text-xs text-rose-500 dark:text-rose-400">
                          <AlertTriangle className="w-3 h-3" />
                          {player.reports} Reports
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    {getStatusBadge(player.status)}
                  </td>
                  <td className="p-4 text-right">
                    <Button 
                      variant="ghost" 
                      className="h-8 px-2" 
                      onClick={() => {
                        setSelectedPlayer(player);
                        setAnalysisResult(null);
                      }}
                    >
                      <Eye className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Player Detail Modal */}
      {selectedPlayer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 dark:bg-black/80 backdrop-blur-sm animate-enter">
          <div className="bg-white dark:bg-[#121418] border border-slate-200 dark:border-white/10 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl transition-all duration-300">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-indigo-500" />
                  Security Audit: {selectedPlayer.name}
                </h2>
                <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">Session ID: {selectedPlayer.id} • {selectedPlayer.status}</p>
              </div>
              <button onClick={() => setSelectedPlayer(null)} className="text-slate-400 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Telemetry Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                  <div className="text-xs text-slate-500 dark:text-gray-500 uppercase">Headshot Rate</div>
                  <div className={`text-2xl font-mono mt-1 ${selectedPlayer.headshotRate > 80 ? 'text-rose-500 dark:text-rose-400' : 'text-slate-900 dark:text-white'}`}>
                    {selectedPlayer.headshotRate}%
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                  <div className="text-xs text-slate-500 dark:text-gray-500 uppercase">K/D Ratio</div>
                  <div className="text-2xl font-mono mt-1 text-slate-900 dark:text-white">{selectedPlayer.kdRatio}</div>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                  <div className="text-xs text-slate-500 dark:text-gray-500 uppercase">Ping Variance</div>
                  <div className="text-2xl font-mono mt-1 text-emerald-500 dark:text-emerald-400">Low</div>
                </div>
              </div>

              {/* Simulated Screenshot Area */}
              <div>
                <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-3">Live Screenshot Capture</h3>
                <div className="aspect-video w-full rounded-lg overflow-hidden border border-slate-200 dark:border-white/10 relative group bg-black">
                  <img 
                    src={`https://picsum.photos/800/450?random=${selectedPlayer.id.replace(/\D/g,'')}`} 
                    alt="Simulated Screenshot" 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 scale-100 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-[10px] font-mono text-white">
                    WATERMARK: {selectedPlayer.uid}
                  </div>
                </div>
              </div>

              {/* Logs */}
              <div>
                <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-2">System Logs</h3>
                <div className="h-32 overflow-y-auto bg-slate-900 dark:bg-black/50 rounded-lg p-3 border border-slate-200 dark:border-white/5 font-mono text-xs text-gray-300 dark:text-gray-400 space-y-1">
                  {selectedPlayer.logs.map((log, i) => (
                    <div key={i}>{log}</div>
                  ))}
                  <div className="text-indigo-400">...monitoring process list</div>
                </div>
              </div>

              {/* AI Analysis Section */}
              <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                {!analysisResult ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-slate-900 dark:text-white">AI Risk Assessment</h3>
                      <p className="text-xs text-slate-500 dark:text-gray-400">Use Gemini models to analyze player telemetry patterns.</p>
                    </div>
                    <Button onClick={handleAnalyze} isLoading={isAnalyzing} icon={<Sparkles className="w-4 h-4" />}>
                      Analyze Risk
                    </Button>
                  </div>
                ) : (
                  <div className={`p-4 rounded-lg border animate-enter ${analysisResult.score > 50 ? 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20' : 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20'}`}>
                    <div className="flex items-center justify-between mb-2">
                       <h4 className={`text-sm font-bold ${analysisResult.score > 50 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                         Risk Score: {analysisResult.score}/100
                       </h4>
                       <Button variant="ghost" className="h-6 text-xs" onClick={handleAnalyze}>Re-analyze</Button>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed">
                      {analysisResult.text}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-6 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setSelectedPlayer(null)}>Close</Button>
              <Button variant="danger">Ban Player</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
