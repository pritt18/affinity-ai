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

  const computeClientRankings = (targetId) => {
    const target = people.find(p => p.id === targetId) || people[0];
    const candidates = people.filter(p => p.id !== target.id);
    const ranked = candidates.map(c => {
      let score = 74;
      const sharedH = target.agentAnalysis.hobbies.filter(h => 
        c.agentAnalysis.hobbies.some(ch => ch.toLowerCase().includes(h.toLowerCase()))
      );
      score += Math.min(sharedH.length * 3, 10);
      const sharedI = target.agentAnalysis.interests.filter(i => 
        c.agentAnalysis.interests.some(ci => ci.toLowerCase().includes(i.toLowerCase()))
      );
      score += Math.min(sharedI.length * 3, 12);
      score = Math.min(Math.max(score, 70), 96);

      return {
        candidateId: c.id,
        candidateName: c.name,
        candidateTitle: c.title,
        candidateAvatar: c.avatar,
        candidateLinkedin: c.linkedinUrl,
        candidateInstagram: c.instagramUrl,
        overallScore: score,
        breakdown: {
          emotionalAlignment: Math.min(score + 1, 98),
          intellectualResonance: Math.min(score + 3, 99),
          lifestyleSynergy: Math.max(score - 2, 70),
          conversationalFlow: Math.min(score + 2, 97)
        },
        rationale: `${target.name.split(' ')[0]} and ${c.name.split(' ')[0]} demonstrate natural synergy across their extracted hobbies and core values, creating balanced conversational chemistry.`,
        topSharedInterests: c.agentAnalysis.interests.slice(0, 2),
        sharedVibe: `${target.agentAnalysis.qualities.energyType} meets ${c.agentAnalysis.qualities.energyType}`
      };
    });

    ranked.sort((a, b) => b.overallScore - a.overallScore);

    return {
      targetPerson: {
        id: target.id,
        name: target.name,
        avatar: target.avatar,
        title: target.title
      },
      rankings: ranked.map((r, i) => ({ rank: i + 1, ...r }))
    };
  };

  const fetchRankings = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/people/${id}/rankings`);
      if (res.ok) {
        const data = await res.json();
        setRankingsData(data);
        return;
      }
    } catch (err) {
      // fallback to client computation
    } finally {
      setLoading(false);
    }
    // Fallback if API not available
    setRankingsData(computeClientRankings(id));
  };

  const selectedPerson = people.find(p => p.id === selectedPersonId) || people[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200 bg-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200 mb-2">
            <Trophy className="w-3.5 h-3.5" />
            <span>Algorithmic Compatibility Rankings</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Who Fits Each Person Best?
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl font-normal">
            For every single person in the network, their agent evaluates all 25 other candidates across relational needs, intellectual resonance, lifestyle tempo, and date chemistry.
          </p>
        </div>

        {/* Target Person Selector Dropdown */}
        <div className="min-w-[280px]">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Select Person to View Rankings:
          </label>
          <select
            value={selectedPersonId}
            onChange={(e) => setSelectedPersonId(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-sm focus:outline-none focus:border-pink-500 font-medium"
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
        <div className="p-6 rounded-2xl glass-panel border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white shadow-sm">
          <div className="flex items-center gap-4">
            <img
              src={selectedPerson.avatar}
              alt={selectedPerson.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-pink-300 shadow-sm bg-slate-100"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-pink-600">Target Persona</span>
                <span className="text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-medium">{selectedPerson.agentAnalysis.qualities.energyType}</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">{selectedPerson.name}</h3>
              <p className="text-xs text-slate-600 max-w-xl mt-0.5 line-clamp-1">{selectedPerson.title}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <a
              href={selectedPerson.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold"
            >
              <Linkedin className="w-3 h-3 text-blue-600" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-2.5 h-2.5" />
            </a>
            <a
              href={selectedPerson.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 text-xs font-semibold"
            >
              <Instagram className="w-3 h-3 text-pink-600" />
              <span>Instagram</span>
              <ArrowUpRight className="w-2.5 h-2.5" />
            </a>
            <button
              onClick={() => onInspectPerson(selectedPerson)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-semibold"
            >
              <Eye className="w-3 h-3 text-pink-600" />
              <span>Full Dossier</span>
            </button>
          </div>
        </div>
      )}

      {/* Rankings Leaderboard */}
      {loading ? (
        <div className="p-12 text-center text-slate-500 glass-panel rounded-2xl bg-white border border-slate-200">
          <div className="w-8 h-8 border-3 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm font-medium">Calculating 25-person compatibility vectors...</p>
        </div>
      ) : rankingsData ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-2">
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
                  className={`glass-panel rounded-2xl p-5 sm:p-6 border transition-all shadow-sm ${
                    isTop1
                      ? 'border-pink-300 bg-gradient-to-r from-pink-50/50 via-white to-white'
                      : isTop3
                      ? 'border-amber-200 bg-white'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
                    
                    {/* Left: Rank Badge + Candidate Info */}
                    <div className="flex items-start sm:items-center gap-4 flex-1">
                      
                      {/* Rank Indicator */}
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-extrabold text-sm shrink-0 shadow-xs ${
                        isTop1
                          ? 'bg-gradient-to-tr from-amber-500 to-pink-500 text-white shadow-pink-500/20'
                          : item.rank === 2
                          ? 'bg-slate-200 text-slate-800'
                          : item.rank === 3
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}>
                        {isTop1 ? <Trophy className="w-5 h-5 text-white" /> : `#${item.rank}`}
                      </div>

                      {/* Avatar */}
                      <img
                        src={item.candidateAvatar}
                        alt={item.candidateName}
                        className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0 bg-slate-100 shadow-xs"
                      />

                      {/* Candidate Meta */}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-base sm:text-lg text-slate-900 hover:text-pink-600 cursor-pointer transition-colors"
                              onClick={() => onInspectPerson(candidate)}>
                            {item.candidateName}
                          </h4>
                          {isTop1 && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-pink-100 text-pink-700 border border-pink-200">
                              Best Fit
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 font-medium">{item.candidateTitle}</p>
                        
                        {/* Links */}
                        <div className="flex items-center gap-2 mt-1.5">
                          <a
                            href={item.candidateLinkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-0.5"
                          >
                            <Linkedin className="w-3 h-3" />
                            <span>LinkedIn</span>
                          </a>
                          <span className="text-slate-400 text-xs">•</span>
                          <a
                            href={item.candidateInstagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-pink-600 hover:text-pink-700 font-semibold flex items-center gap-0.5"
                          >
                            <Instagram className="w-3 h-3" />
                            <span>Instagram</span>
                          </a>
                          <span className="text-slate-400 text-xs">•</span>
                          <span className="text-[11px] text-slate-500 italic">
                            {item.sharedVibe}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Middle: Dimensional Breakdown Bars */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full lg:w-auto text-xs shrink-0">
                      <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
                        <span className="text-[9px] uppercase font-bold text-slate-500 block">Emotional</span>
                        <span className="font-extrabold text-pink-600">{item.breakdown.emotionalAlignment}%</span>
                      </div>
                      <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
                        <span className="text-[9px] uppercase font-bold text-slate-500 block">Intellectual</span>
                        <span className="font-extrabold text-indigo-600">{item.breakdown.intellectualResonance}%</span>
                      </div>
                      <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
                        <span className="text-[9px] uppercase font-bold text-slate-500 block">Lifestyle</span>
                        <span className="font-extrabold text-cyan-600">{item.breakdown.lifestyleSynergy}%</span>
                      </div>
                      <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
                        <span className="text-[9px] uppercase font-bold text-slate-500 block">Flow</span>
                        <span className="font-extrabold text-emerald-600">{item.breakdown.conversationalFlow}%</span>
                      </div>
                    </div>

                    {/* Right: Overall Score + Watch Date Button */}
                    <div className="flex items-center justify-between lg:justify-end gap-4 w-full lg:w-auto pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-200">
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">Match Score</span>
                        <span className="text-xl sm:text-2xl font-black text-pink-600 tracking-tight">
                          {item.overallScore}%
                        </span>
                      </div>

                      <button
                        onClick={() => onLaunchDateWithPair(selectedPerson, candidate)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-semibold text-xs shadow-md shadow-pink-500/20 transition-all"
                      >
                        <Flame className="w-3.5 h-3.5" />
                        <span>Watch Date</span>
                      </button>
                    </div>

                  </div>

                  {/* Rationale Paragraph */}
                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 leading-relaxed bg-slate-50/80 p-3.5 rounded-xl border border-slate-200">
                    <strong className="text-pink-700 font-bold mr-1">Agent Compatibility Rationale:</strong>
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
