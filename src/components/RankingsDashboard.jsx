import React, { useState, useEffect } from 'react';
import { 
  Trophy, Award, Heart, Sparkles, Flame, Linkedin, Instagram, 
  ArrowUpRight, Eye, ChevronRight, BarChart3, Users
} from 'lucide-react';

export default function RankingsDashboard({ 
  people, 
  initialTargetPerson = null,
  onLaunchDateWithPair,
  onInspectPerson 
}) {
  const [selectedPersonId, setSelectedPersonId] = useState(
    initialTargetPerson?.id || people[0]?.id || 'lex-fridman'
  );
  const [rankingsData, setRankingsData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedPersonId) {
      fetchRankings(selectedPersonId);
    }
  }, [selectedPersonId]);

  const fetchRankings = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/people/${id}/rankings`);
      if (res.ok) {
        const data = await res.json();
        setRankingsData(data);
      }
    } catch (err) {
      console.error('Failed to fetch rankings:', err);
    } finally {
      setLoading(false);
    }
  };

  const selectedPerson = people.find(p => p.id === selectedPersonId) || people[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30 mb-2">
            <Trophy className="w-3.5 h-3.5" />
            <span>Algorithmic Compatibility Rankings</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Who Fits Each Person Best?
          </h2>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            For every single person in the network, their agent evaluates all 25 other candidates across relational needs, intellectual resonance, lifestyle tempo, and date chemistry.
          </p>
        </div>

        {/* Target Person Selector Dropdown */}
        <div className="min-w-[280px]">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Select Person to View Rankings:
          </label>
          <select
            value={selectedPersonId}
            onChange={(e) => setSelectedPersonId(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-pink-500/50"
          >
            {people.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.title.split('|')[0].substring(0, 28)})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Target Person Profile Summary Card */}
      {selectedPerson && (
        <div className="p-6 rounded-2xl glass-panel border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-gradient-to-r from-slate-900/90 to-[#0e1424]">
          <div className="flex items-center gap-4">
            <img
              src={selectedPerson.avatar}
              alt={selectedPerson.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-pink-500/40 shadow-lg bg-slate-800"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-pink-400">Target Persona</span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400">{selectedPerson.agentAnalysis.qualities.energyType}</span>
              </div>
              <h3 className="text-xl font-extrabold text-white">{selectedPerson.name}</h3>
              <p className="text-xs text-slate-300 max-w-xl mt-0.5 line-clamp-1">{selectedPerson.title}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <a
              href={selectedPerson.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950/40 hover:bg-blue-900/60 text-blue-300 border border-blue-500/20 text-xs font-medium"
            >
              <Linkedin className="w-3 h-3 text-blue-400" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-2.5 h-2.5" />
            </a>
            <a
              href={selectedPerson.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-950/40 hover:bg-pink-900/60 text-pink-300 border border-pink-500/20 text-xs font-medium"
            >
              <Instagram className="w-3 h-3 text-pink-400" />
              <span>Instagram</span>
              <ArrowUpRight className="w-2.5 h-2.5" />
            </a>
            <button
              onClick={() => onInspectPerson(selectedPerson)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 text-xs font-medium"
            >
              <Eye className="w-3 h-3 text-pink-400" />
              <span>Full Dossier</span>
            </button>
          </div>
        </div>
      )}

      {/* Rankings Leaderboard */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 glass-panel rounded-2xl">
          <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm">Calculating 25-person compatibility vectors...</p>
        </div>
      ) : rankingsData ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <span>Ranking Candidates (1 - {rankingsData.rankings.length})</span>
            <span>Sorted by Multi-Dimensional Agent Fit</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {rankingsData.rankings.map((item) => {
              const candidate = people.find(p => p.id === item.candidateId) || {
                avatar: item.candidateAvatar,
                name: item.candidateName,
                title: item.candidateTitle,
                linkedinUrl: item.candidateLinkedin,
                instagramUrl: item.candidateInstagram
              };

              const isTop1 = item.rank === 1;
              const isTop3 = item.rank <= 3;

              return (
                <div
                  key={item.candidateId}
                  className={`glass-panel rounded-2xl p-5 sm:p-6 border transition-all ${
                    isTop1
                      ? 'border-pink-500/40 bg-gradient-to-r from-pink-950/20 via-slate-900 to-slate-900 shadow-lg shadow-pink-500/10'
                      : isTop3
                      ? 'border-amber-500/30 bg-slate-900/60'
                      : 'border-white/5 bg-slate-900/40 hover:border-white/10'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
                    
                    {/* Left: Rank Badge + Candidate Info */}
                    <div className="flex items-start sm:items-center gap-4 flex-1">
                      
                      {/* Rank Indicator */}
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-extrabold text-sm shrink-0 shadow-md ${
                        isTop1
                          ? 'bg-gradient-to-tr from-amber-500 to-pink-500 text-white shadow-pink-500/30'
                          : item.rank === 2
                          ? 'bg-gradient-to-tr from-slate-400 to-slate-200 text-slate-900 shadow-slate-400/20'
                          : item.rank === 3
                          ? 'bg-gradient-to-tr from-amber-700 to-amber-500 text-amber-100'
                          : 'bg-slate-800 text-slate-400 border border-white/5'
                      }`}>
                        {isTop1 ? <Trophy className="w-5 h-5" /> : `#${item.rank}`}
                      </div>

                      {/* Avatar */}
                      <img
                        src={item.candidateAvatar}
                        alt={item.candidateName}
                        className="w-14 h-14 rounded-2xl object-cover border border-white/10 shrink-0 bg-slate-800"
                      />

                      {/* Candidate Meta */}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-base sm:text-lg text-white hover:text-pink-400 cursor-pointer transition-colors"
                              onClick={() => onInspectPerson(candidate)}>
                            {item.candidateName}
                          </h4>
                          {isTop1 && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-pink-500/20 text-pink-300 border border-pink-500/40">
                              Best Fit
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1">{item.candidateTitle}</p>
                        
                        {/* Links */}
                        <div className="flex items-center gap-2 mt-1.5">
                          <a
                            href={item.candidateLinkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-0.5"
                          >
                            <Linkedin className="w-3 h-3" />
                            <span>LinkedIn</span>
                          </a>
                          <span className="text-slate-600 text-xs">•</span>
                          <a
                            href={item.candidateInstagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-pink-400 hover:text-pink-300 flex items-center gap-0.5"
                          >
                            <Instagram className="w-3 h-3" />
                            <span>Instagram</span>
                          </a>
                          <span className="text-slate-600 text-xs">•</span>
                          <span className="text-[11px] text-slate-400 italic">
                            {item.sharedVibe}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Middle: Dimensional Breakdown Bars */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full lg:w-auto text-xs shrink-0">
                      <div className="px-3 py-2 rounded-xl bg-slate-900/80 border border-white/5 text-center">
                        <span className="text-[9px] uppercase font-semibold text-slate-400 block">Emotional</span>
                        <span className="font-bold text-pink-400">{item.breakdown.emotionalAlignment}%</span>
                      </div>
                      <div className="px-3 py-2 rounded-xl bg-slate-900/80 border border-white/5 text-center">
                        <span className="text-[9px] uppercase font-semibold text-slate-400 block">Intellectual</span>
                        <span className="font-bold text-indigo-400">{item.breakdown.intellectualResonance}%</span>
                      </div>
                      <div className="px-3 py-2 rounded-xl bg-slate-900/80 border border-white/5 text-center">
                        <span className="text-[9px] uppercase font-semibold text-slate-400 block">Lifestyle</span>
                        <span className="font-bold text-cyan-400">{item.breakdown.lifestyleSynergy}%</span>
                      </div>
                      <div className="px-3 py-2 rounded-xl bg-slate-900/80 border border-white/5 text-center">
                        <span className="text-[9px] uppercase font-semibold text-slate-400 block">Flow</span>
                        <span className="font-bold text-emerald-400">{item.breakdown.conversationalFlow}%</span>
                      </div>
                    </div>

                    {/* Right: Overall Score + Watch Date Button */}
                    <div className="flex items-center justify-between lg:justify-end gap-4 w-full lg:w-auto pt-3 lg:pt-0 border-t lg:border-t-0 border-white/5">
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-semibold text-slate-400 block">Match Score</span>
                        <span className="text-xl sm:text-2xl font-black text-pink-400 tracking-tight">
                          {item.overallScore}%
                        </span>
                      </div>

                      <button
                        onClick={() => onLaunchDateWithPair(selectedPerson, candidate)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white font-medium text-xs shadow-md shadow-pink-500/20 transition-all"
                      >
                        <Flame className="w-3.5 h-3.5" />
                        <span>Watch Date</span>
                      </button>
                    </div>

                  </div>

                  {/* Rationale Paragraph */}
                  <div className="mt-4 pt-3 border-t border-white/5 text-xs text-slate-300 leading-relaxed bg-slate-950/30 p-3 rounded-xl">
                    <strong className="text-pink-300 font-semibold mr-1">Agent Compatibility Rationale:</strong>
                    {item.rationale}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

    </div>
  );
}
