import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Trophy, Map, ChevronRight, Check } from 'lucide-react';
import { Button, Input, Card } from '../components/UI';
import { GameMode, MapType } from '../types';

const CreateTournament: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    maxPlayers: 48,
    prizePool: '',
    mode: GameMode.SQUAD,
    map: MapType.BERMUDA
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-3xl mx-auto animate-enter">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Create Tournament</h1>
        <p className="text-slate-500 dark:text-gray-400">Configure your match settings and security parameters.</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-4 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border transition-all duration-300 ${step >= s ? 'bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-slate-100 dark:bg-surface border-slate-200 dark:border-white/10 text-gray-500'}`}>
              {step > s ? <Check className="w-4 h-4" /> : s}
            </div>
            {s !== 3 && <div className={`w-12 h-[1px] transition-all duration-500 ${step > s ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-white/10'}`} />}
          </div>
        ))}
      </div>

      <Card className="min-h-[400px]">
        {step === 1 && (
          <div className="space-y-6 animate-enter">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-indigo-500 dark:text-indigo-400" /> Basic Information
            </h2>
            <Input 
              label="Tournament Name" 
              name="name" 
              placeholder="e.g. Winter Invitational 2024" 
              value={formData.name}
              onChange={handleChange}
              autoFocus
            />
            <div className="grid grid-cols-2 gap-4">
              <Input 
                label="Date" 
                name="date" 
                type="date"
                value={formData.date}
                onChange={handleChange}
              />
              <Input 
                label="Time" 
                name="time" 
                type="time"
                value={formData.time}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end pt-4">
              <Button onClick={handleNext} disabled={!formData.name} icon={<ChevronRight className="w-4 h-4" />} className="flex-row-reverse">
                Next Step
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-enter">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Map className="w-5 h-5 text-indigo-500 dark:text-indigo-400" /> Match Settings
            </h2>
            
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Game Mode</label>
              <div className="grid grid-cols-3 gap-3">
                {Object.values(GameMode).map((m) => (
                  <div 
                    key={m}
                    onClick={() => setFormData({ ...formData, mode: m })}
                    className={`cursor-pointer text-center py-3 rounded-lg border text-sm font-medium transition-all duration-300 hover:scale-[1.02] ${formData.mode === m ? 'bg-indigo-500/20 border-indigo-500 text-indigo-600 dark:text-white shadow-md' : 'bg-slate-50 dark:bg-surface border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-400 hover:border-slate-300 dark:hover:border-white/20'}`}
                  >
                    {m}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Map</label>
              <select 
                name="map"
                value={formData.map}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-slate-900 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-shadow"
              >
                {Object.values(MapType).map(map => (
                  <option key={map} value={map}>{map}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="ghost" onClick={handleBack}>Back</Button>
              <Button onClick={handleNext} icon={<ChevronRight className="w-4 h-4" />} className="flex-row-reverse">Next Step</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-enter">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-500 dark:text-indigo-400" /> Capacity & Prize
            </h2>
            
            <Input 
              label="Max Players" 
              name="maxPlayers" 
              type="number"
              placeholder="48" 
              value={formData.maxPlayers}
              onChange={handleChange}
            />

            <Input 
              label="Prize Pool (USD)" 
              name="prizePool" 
              type="text"
              placeholder="$1,000" 
              value={formData.prizePool}
              onChange={handleChange}
            />

            <div className="bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-lg p-4 flex items-start gap-3">
              <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Anti-Cheat Active</h4>
                <p className="text-xs text-emerald-600 dark:text-gray-400 mt-1">Sentinel will automatically enforce HWID locks and monitor background processes for all participants.</p>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="ghost" onClick={handleBack}>Back</Button>
              <Button onClick={handleSubmit} isLoading={loading}>Create Tournament</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CreateTournament;