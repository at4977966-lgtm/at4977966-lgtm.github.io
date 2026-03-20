import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Landing from './pages/Landing';
import CreateTournament from './pages/CreateTournament';
import Dashboard from './pages/Dashboard';
import JoinTournament from './pages/JoinTournament';
import Auth from './pages/Auth';
import Security from './pages/Security';
import FairPlay from './pages/FairPlay';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Support from './pages/Support';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0D1117] text-slate-900 dark:text-gray-200 font-sans selection:bg-primary/30 transition-colors duration-300">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateTournament />
              </ProtectedRoute>
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/join" element={<JoinTournament />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/security" element={<Security />} />
          <Route path="/fair-play" element={<FairPlay />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
