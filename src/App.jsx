import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import ProfileExplorer from './components/ProfileExplorer.jsx';
import DateArena from './components/DateArena.jsx';
import RankingsDashboard from './components/RankingsDashboard.jsx';
import ArchitectureView from './components/ArchitectureView.jsx';
import ProfileModal from './components/ProfileModal.jsx';
import AddPersonModal from './components/AddPersonModal.jsx';
import { Heart, Sparkles, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('profiles');
  const [people, setPeople] = useState([]);
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals & Navigation state
  const [selectedPersonForModal, setSelectedPersonForModal] = useState(null);
  const [arenaPair, setArenaPair] = useState(null);
  const [rankingsTarget, setRankingsTarget] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [peopleRes, datesRes] = await Promise.all([
        fetch('/api/people'),
        fetch('/api/dates')
      ]);

      if (peopleRes.ok) {
        const peopleData = await peopleRes.json();
        setPeople(peopleData);
      }

      if (datesRes.ok) {
        const datesData = await datesRes.json();
        setDates(datesData);
      }
    } catch (err) {
      console.error('Failed to load initial data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Launch Date with one person (paired with their top match)
  const handleLaunchDateSingle = (person) => {
    const topMatchName = person.stats?.topMatch;
    const partner = people.find(p => p.name === topMatchName) || people.find(p => p.id !== person.id);
    setArenaPair({ personA: person, personB: partner });
    setActiveTab('arena');
  };

  // Launch Date with explicit pair
  const handleLaunchDateWithPair = (personA, personB) => {
    setArenaPair({ personA, personB });
    setActiveTab('arena');
  };

  // View Rankings for a person
  const handleViewRankings = (person) => {
    setRankingsTarget(person);
    setActiveTab('rankings');
  };

  // When a new person is deployed via links
  const handleAgentCreated = (newPerson) => {
    setPeople(prev => [newPerson, ...prev.filter(p => p.id !== newPerson.id)]);
    // Open profile modal first so the user sees the reading & analysis!
    setSelectedPersonForModal(newPerson);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        peopleCount={people.length}
        datesCount={dates.length}
      />

      {/* Main App Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
            <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-slate-600 font-medium">
              Synchronizing 26 autonomous dating agents...
            </p>
          </div>
        ) : (
          <>
            {activeTab === 'profiles' && (
              <ProfileExplorer
                people={people}
                onSelectPerson={(p) => setSelectedPersonForModal(p)}
                onLaunchDate={handleLaunchDateSingle}
                onViewRankings={handleViewRankings}
              />
            )}

            {activeTab === 'arena' && (
              <DateArena
                people={people}
                preloadedDates={dates}
                initialPair={arenaPair}
                onViewPersonDossier={(p) => setSelectedPersonForModal(p)}
                onViewRankings={handleViewRankings}
              />
            )}

            {activeTab === 'rankings' && (
              <RankingsDashboard
                people={people}
                initialTargetPerson={rankingsTarget}
                onLaunchDateWithPair={handleLaunchDateWithPair}
                onInspectPerson={(p) => setSelectedPersonForModal(p)}
              />
            )}

            {activeTab === 'architecture' && (
              <ArchitectureView />
            )}
          </>
        )}
      </main>

      {/* Modals */}
      <ProfileModal
        person={selectedPersonForModal}
        onClose={() => setSelectedPersonForModal(null)}
        onLaunchDate={handleLaunchDateSingle}
        onViewRankings={handleViewRankings}
      />

      <AddPersonModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAgentCreated={handleAgentCreated}
      />

      {/* Global Bottom Footer */}
      <footer className="glass-panel border-t border-slate-200 py-8 mt-12 bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500/20" />
            <span className="font-semibold text-slate-800">Affinity AI</span>
            <span>— Autonomous Agentic Dating Ecosystem</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>26 Verified Real Personas</span>
            <span>•</span>
            <span>Dual-Source Ground Truth (LinkedIn + Instagram)</span>
            <span>•</span>
            <span>Zero Presets</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
