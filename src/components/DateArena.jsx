import React, { useState, useEffect } from 'react';
import { 
  Flame, Play, Pause, RotateCcw, Sparkles, MapPin, 
  Heart, Brain, UserCheck, MessageSquare, Eye, Shuffle, ShieldCheck
} from 'lucide-react';

export const VENUES = [
  {
    id: 'tokyo-rooftop',
    name: 'Sunset Sky Lounge in Tokyo',
    atmosphere: 'Neon twilight over Shinjuku, artisanal yuzu cocktails, ambient lo-fi jazz',
    vibe: 'Reflective, sleek, romantic'
  },
  {
    id: 'west-village-cafe',
    name: 'Hidden Bookshop Cafe in West Village',
    atmosphere: 'Aroma of fresh pour-over Ethiopian coffee, vintage wooden shelves, rainy afternoon',
    vibe: 'Introspective, cozy, intellectually stimulating'
  },
  {
    id: 'pottery-wine',
    name: 'Late-Night Artisan Pottery & Wine Studio',
    atmosphere: 'Spinning pottery wheels, terracotta clay, candlelight, chilled natural wine',
    vibe: 'Playful, tactile, creatively vulnerable'
  },
  {
    id: 'austin-stargazing',
    name: 'Hill Country Fireside & Stargazing Lounge',
    atmosphere: 'Crackling cedar campfire, acoustic guitar strings, vast starlit Texas horizon',
    vibe: 'Grounded, honest, soul-stirring'
  }
];

export default function DateArena({ 
  people, 
  preloadedDates = [], 
  initialPair = null,
  onViewPersonDossier,
  onViewRankings 
}) {
  const [personAId, setPersonAId] = useState(initialPair?.personA?.id || 'lex-fridman');
  const [personBId, setPersonBId] = useState(initialPair?.personB?.id || 'simone-giertz');
  const [selectedVenueId, setSelectedVenueId] = useState('tokyo-rooftop');
  
  const [currentDate, setCurrentDate] = useState(null);
  const [visibleTurnsCount, setVisibleTurnsCount] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMonologues, setShowMonologues] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);

  // Initialize or load date
  useEffect(() => {
    if (initialPair && initialPair.turns) {
      setCurrentDate(initialPair);
      setPersonAId(initialPair.personA.id);
      setPersonBId(initialPair.personB.id);
      setVisibleTurnsCount(initialPair.turns.length);
      return;
    }

    // Check if we have a preloaded date for this pair
    const existing = preloadedDates.find(
      d => (d.personA.id === personAId && d.personB.id === personBId) ||
           (d.personA.id === personBId && d.personB.id === personAId)
    );

    if (existing) {
      setCurrentDate(existing);
      setVisibleTurnsCount(existing.turns.length);
    } else {
      triggerSimulate(personAId, personBId, selectedVenueId);
    }
  }, [personAId, personBId]);

  // Autoplay turns
  useEffect(() => {
    let interval = null;
    if (isPlaying && currentDate && visibleTurnsCount < currentDate.turns.length) {
      interval = setInterval(() => {
        setVisibleTurnsCount(prev => {
          if (prev >= currentDate.turns.length) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3500);
    } else if (currentDate && visibleTurnsCount >= currentDate.turns.length) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, visibleTurnsCount, currentDate]);

  const triggerSimulate = async (pAId, pBId, vId) => {
    setIsSimulating(true);
    setIsPlaying(false);
    try {
      const res = await fetch('/api/dates/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ personAId: pAId, personBId: pBId, venueId: vId })
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentDate(data);
        setVisibleTurnsCount(1);
        setIsPlaying(true);
      }
    } catch (err) {
      console.error('Date simulation error:', err);
    } finally {
      setIsSimulating(false);
    }
  };

  const handleRandomPair = () => {
    if (people.length < 2) return;
    const idxA = Math.floor(Math.random() * people.length);
    let idxB = Math.floor(Math.random() * people.length);
    while (idxB === idxA) {
      idxB = Math.floor(Math.random() * people.length);
    }
    setPersonAId(people[idxA].id);
    setPersonBId(people[idxB].id);
    triggerSimulate(people[idxA].id, people[idxB].id, selectedVenueId);
  };

  const personA = people.find(p => p.id === personAId) || people[0];
  const personB = people.find(p => p.id === personBId) || people[1];
  const currentVenue = VENUES.find(v => v.id === selectedVenueId) || VENUES[0];

  const currentTurn = currentDate?.turns?.[visibleTurnsCount - 1];
  const chemistry = currentTurn ? currentTurn.chemistryGauge : (currentDate?.overallChemistry || 75);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Bar */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200 bg-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-700 border border-pink-200 mb-2">
            <Flame className="w-3.5 h-3.5 text-pink-600" />
            <span>Autonomous Agent Date Arena</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Watch Agents Date in Real-Time
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl font-normal">
            Agents embody each person's needs, humor, and intellectual rhythm. Watch them converse, test boundaries, and calculate romantic chemistry.
          </p>
        </div>

        {/* Quick Date Shortcuts */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleRandomPair}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-300 transition-colors shadow-xs"
          >
            <Shuffle className="w-3.5 h-3.5 text-pink-600" />
            <span>Random Pair</span>
          </button>
          <button
            onClick={() => triggerSimulate(personAId, personBId, selectedVenueId)}
            disabled={isSimulating}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-semibold text-xs shadow-md shadow-pink-500/20 transition-all disabled:opacity-50"
          >
            <Flame className="w-4 h-4" />
            <span>{isSimulating ? 'Simulating...' : 'Simulate Fresh Date'}</span>
          </button>
        </div>
      </div>

      {/* Date Setup Selector Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 glass-panel p-4 rounded-2xl border border-slate-200 bg-white shadow-sm">
        
        {/* Person A Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Agent 1 (Representing Person A)
          </label>
          <select
            value={personAId}
            onChange={(e) => setPersonAId(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-sm focus:outline-none focus:border-pink-500 font-medium"
          >
            {people.map(p => (
              <option key={p.id} value={p.id} disabled={p.id === personBId}>
                {p.name} — {p.title.split('|')[0].substring(0, 30)}
              </option>
            ))}
          </select>
        </div>

        {/* Venue Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-pink-600" />
            Date Setting & Atmosphere
          </label>
          <select
            value={selectedVenueId}
            onChange={(e) => {
              setSelectedVenueId(e.target.value);
              triggerSimulate(personAId, personBId, e.target.value);
            }}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-sm focus:outline-none focus:border-pink-500 font-medium"
          >
            {VENUES.map(v => (
              <option key={v.id} value={v.id}>
                {v.name} ({v.vibe})
              </option>
            ))}
          </select>
        </div>

        {/* Person B Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Agent 2 (Representing Person B)
          </label>
          <select
            value={personBId}
            onChange={(e) => setPersonBId(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-sm focus:outline-none focus:border-pink-500 font-medium"
          >
            {people.map(p => (
              <option key={p.id} value={p.id} disabled={p.id === personAId}>
                {p.name} — {p.title.split('|')[0].substring(0, 30)}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Featured Famous Pairings */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        <span className="text-slate-500 font-bold whitespace-nowrap">Featured Dates:</span>
        {[
          { a: 'lex-fridman', b: 'simone-giertz', label: 'Lex & Simone (Robotics & Love)' },
          { a: 'marques-brownlee', b: 'cleo-abram', label: 'Marques & Cleo (Tech Optimism)' },
          { a: 'justine-ezarik', b: 'austin-evans', label: 'Justine & Austin (Gadget Nerds)' },
          { a: 'sara-blakely', b: 'shaan-puri', label: 'Sara & Shaan (Billion-Dollar Play)' },
          { a: 'dan-abramov', b: 'cassidy-williams', label: 'Dan & Cassidy (Keyboards & Code)' }
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              setPersonAId(item.a);
              setPersonBId(item.b);
              triggerSimulate(item.a, item.b, selectedVenueId);
            }}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-pink-50 text-slate-700 hover:text-pink-700 border border-slate-200 font-medium whitespace-nowrap transition-colors shadow-xs"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Arena Stage */}
      {currentDate && (
        <div className="glass-panel rounded-3xl border border-slate-200 overflow-hidden shadow-lg bg-white">
          
          {/* Top Atmosphere Bar */}
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-pink-600" />
              <span className="text-xs font-bold text-slate-800 tracking-wide">{currentVenue.name}</span>
              <span className="text-xs text-slate-500 hidden sm:inline">• {currentVenue.atmosphere}</span>
            </div>
            
            {/* Live Chemistry Gauge */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 font-bold">Romantic Chemistry:</span>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 border border-pink-200">
                <Flame className="w-4 h-4 text-pink-600 animate-pulse" />
                <span className="text-sm font-extrabold text-pink-700">{chemistry}%</span>
              </div>
            </div>
          </div>

          {/* Dual Agents Face-Off Banner */}
          <div className="p-6 bg-white border-b border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
            
            {/* Agent A Card */}
            <div className="flex items-center gap-4">
              <img
                src={personA?.avatar}
                alt={personA?.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-pink-300 shadow-sm bg-slate-100"
              />
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-pink-600 block">Agent A</span>
                <h4 className="font-extrabold text-slate-900 text-lg">{personA?.name}</h4>
                <p className="text-xs text-slate-500 line-clamp-1 font-medium">{personA?.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button 
                    onClick={() => onViewPersonDossier(personA)}
                    className="text-[11px] text-pink-600 hover:text-pink-700 underline font-semibold"
                  >
                    Inspect Dossier
                  </button>
                  <span className="text-slate-400">•</span>
                  <button 
                    onClick={() => onViewRankings(personA)}
                    className="text-[11px] text-amber-600 hover:text-amber-700 underline font-semibold"
                  >
                    Rankings
                  </button>
                </div>
              </div>
            </div>

            {/* Central Spark Indicator (Desktop) */}
            <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-pink-300 items-center justify-center shadow-md shadow-pink-500/10">
              <Heart className="w-5 h-5 text-pink-600 fill-pink-600/30" />
            </div>

            {/* Agent B Card */}
            <div className="flex items-center justify-end sm:text-right gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 block">Agent B</span>
                <h4 className="font-extrabold text-slate-900 text-lg">{personB?.name}</h4>
                <p className="text-xs text-slate-500 line-clamp-1 font-medium">{personB?.title}</p>
                <div className="flex items-center justify-end gap-2 mt-1">
                  <button 
                    onClick={() => onViewRankings(personB)}
                    className="text-[11px] text-amber-600 hover:text-amber-700 underline font-semibold"
                  >
                    Rankings
                  </button>
                  <span className="text-slate-400">•</span>
                  <button 
                    onClick={() => onViewPersonDossier(personB)}
                    className="text-[11px] text-pink-600 hover:text-pink-700 underline font-semibold"
                  >
                    Inspect Dossier
                  </button>
                </div>
              </div>
              <img
                src={personB?.avatar}
                alt={personB?.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-300 shadow-sm bg-slate-100"
              />
            </div>

          </div>

          {/* Conversation Transcript Stage */}
          <div className="p-6 sm:p-8 space-y-6 min-h-[380px] bg-slate-50/70 border-b border-slate-200">
            {currentDate.turns.slice(0, visibleTurnsCount).map((turn, idx) => {
              const isSpeakerA = turn.speakerId === personA.id;
              const speaker = isSpeakerA ? personA : personB;

              return (
                <div
                  key={idx}
                  className={`flex flex-col ${isSpeakerA ? 'items-start' : 'items-end'} animate-slideUp`}
                >
                  <div className={`flex items-start gap-3 max-w-2xl ${isSpeakerA ? 'flex-row' : 'flex-row-reverse'}`}>
                    <img
                      src={speaker.avatar}
                      alt={speaker.name}
                      className="w-9 h-9 rounded-xl object-cover border border-slate-200 mt-1 bg-slate-100 shadow-xs"
                    />
                    <div>
                      {/* Speaker Name & Sentiment */}
                      <div className={`flex items-center gap-2 mb-1 text-xs ${isSpeakerA ? 'justify-start' : 'justify-end'}`}>
                        <span className="font-bold text-slate-900">{speaker.name}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-pink-700 border border-slate-200 shadow-xs">
                          {turn.sentiment}
                        </span>
                      </div>

                      {/* Dialogue Bubble */}
                      <div
                        className={`p-4 rounded-2xl text-sm leading-relaxed ${
                          isSpeakerA
                            ? 'bg-white text-slate-800 rounded-tl-sm border border-pink-200 shadow-sm'
                            : 'bg-white text-slate-800 rounded-tr-sm border border-indigo-200 shadow-sm'
                        }`}
                      >
                        <p>{turn.text}</p>
                      </div>

                      {/* Agent Inner Monologue Bubble */}
                      {showMonologues && turn.innerMonologue && (
                        <div
                          className={`mt-2 p-3 rounded-xl text-xs border border-dashed ${
                            isSpeakerA ? 'bg-pink-50/80 border-pink-300 text-pink-900' : 'bg-indigo-50/80 border-indigo-300 text-indigo-900'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] mb-0.5 opacity-90">
                            <Brain className="w-3 h-3" />
                            <span>Agent Subconscious Analysis</span>
                          </div>
                          <p className="italic font-normal">{turn.innerMonologue}</p>
                        </div>
                      )}

                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Date Conclusion Card (when all turns shown) */}
          {visibleTurnsCount >= currentDate.turns.length && (
            <div className="p-6 bg-gradient-to-r from-pink-50/40 via-white to-purple-50/40 border-b border-slate-200 animate-fadeIn">
              <div className="max-w-3xl mx-auto text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 text-pink-800 border border-pink-300 text-xs font-bold">
                  <Sparkles className="w-4 h-4 text-pink-600" />
                  <span>Date Concluded • Verdict Generated</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {currentDate.verdict}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
                  Both agents evaluated conversational flow, emotional safety, intellectual curiosity, and lifestyle pacing before concluding this date.
                </p>

                {/* Compatibility Breakdown Bars */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-left">
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Emotional</span>
                    <span className="text-base font-extrabold text-pink-600">{currentDate.breakdown.emotionalAlignment}%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Intellectual</span>
                    <span className="text-base font-extrabold text-indigo-600">{currentDate.breakdown.intellectualResonance}%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Lifestyle</span>
                    <span className="text-base font-extrabold text-cyan-600">{currentDate.breakdown.lifestyleSynergy}%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Flow</span>
                    <span className="text-base font-extrabold text-emerald-600">{currentDate.breakdown.conversationalFlow}%</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <button
                    onClick={() => setVisibleTurnsCount(1)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-300 shadow-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Replay Date</span>
                  </button>
                  <button
                    onClick={handleRandomPair}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold shadow-md shadow-pink-500/20"
                  >
                    <Shuffle className="w-3.5 h-3.5" />
                    <span>Next Autonomous Date</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Player Controls Footer */}
          <div className="p-4 bg-white flex flex-wrap items-center justify-between gap-4">
            
            {/* Play/Pause & Step Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold transition-all shadow-sm"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
              </button>

              <button
                onClick={() => setVisibleTurnsCount(prev => Math.min(prev + 1, currentDate.turns.length))}
                disabled={visibleTurnsCount >= currentDate.turns.length}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-300 transition-colors disabled:opacity-40"
              >
                Next Turn ({visibleTurnsCount}/{currentDate.turns.length})
              </button>

              <button
                onClick={() => setVisibleTurnsCount(currentDate.turns.length)}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 text-xs transition-colors font-medium"
                title="Jump to Verdict"
              >
                Show All
              </button>
            </div>

            {/* Toggle Monologues */}
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 font-medium">
                <input
                  type="checkbox"
                  checked={showMonologues}
                  onChange={(e) => setShowMonologues(e.target.checked)}
                  className="rounded bg-white border-slate-300 text-pink-600 focus:ring-0"
                />
                <span className="flex items-center gap-1">
                  <Brain className="w-3.5 h-3.5 text-pink-600" />
                  Show Subconscious Agent Monologues
                </span>
              </label>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
