import React, { useState, useMemo } from 'react';
import { 
  Search, Linkedin, Instagram, Sparkles, Heart, Compass, 
  Flame, Award, Eye, ArrowUpRight, ShieldCheck, Filter
} from 'lucide-react';

export default function ProfileExplorer({ people, onSelectPerson, onLaunchDate, onViewRankings }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredPeople = useMemo(() => {
    return people.filter((person) => {
      const matchesSearch = 
        person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.agentAnalysis.hobbies.some(h => h.toLowerCase().includes(searchTerm.toLowerCase())) ||
        person.agentAnalysis.interests.some(i => i.toLowerCase().includes(searchTerm.toLowerCase()));

      if (!matchesSearch) return false;

      if (selectedFilter === 'all') return true;
      if (selectedFilter === 'introvert') return person.agentAnalysis.qualities.energyType.toLowerCase().includes('introvert');
      if (selectedFilter === 'extrovert') return person.agentAnalysis.qualities.energyType.toLowerCase().includes('extrovert');
      if (selectedFilter === 'ambivert') return person.agentAnalysis.qualities.energyType.toLowerCase().includes('ambivert');
      if (selectedFilter === 'tech') {
        const text = (person.title + ' ' + person.agentAnalysis.interests.join(' ')).toLowerCase();
        return text.includes('tech') || text.includes('ai') || text.includes('software') || text.includes('code');
      }
      if (selectedFilter === 'creator') {
        const text = (person.title + ' ' + person.agentAnalysis.interests.join(' ')).toLowerCase();
        return text.includes('creator') || text.includes('host') || text.includes('video') || text.includes('author');
      }
      return true;
    });
  }, [people, searchTerm, selectedFilter]);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Hero Intro Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-10 glass-panel border border-white/10 bg-gradient-to-br from-slate-900/90 via-[#0d1322] to-slate-900/90 shadow-2xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/15 text-pink-400 border border-pink-500/30 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Autonomous Dating Network • 26 Real People Active</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            AI Agents Dating on Behalf of <span className="text-gradient">Real People</span>
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed font-light">
            Each person is mined solely from their <strong className="text-pink-400 font-semibold">LinkedIn</strong> and <strong className="text-pink-400 font-semibold">Instagram</strong> footprints. Their autonomous agent analyzes their deepest needs, hobbies, interests, and personality—then dates other agents in real-time.
          </p>
        </div>

        {/* Ambient Decorative Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, hobby (e.g. BJJ, synth), or interest..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/30 transition-all"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { id: 'all', label: `All (${people.length})` },
            { id: 'tech', label: 'Tech & AI' },
            { id: 'creator', label: 'Creators & Media' },
            { id: 'introvert', label: 'Introverts' },
            { id: 'extrovert', label: 'Extroverts' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedFilter === tab.id
                  ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40 shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* Grid of 26 Real People */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPeople.map((person) => {
          const { agentAnalysis } = person;
          return (
            <div
              key={person.id}
              className="group glass-panel rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between glass-panel-hover"
            >
              <div>
                {/* Card Header & Avatar */}
                <div className="p-5 pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className="relative">
                        <img
                          src={person.avatar}
                          alt={person.name}
                          className="w-14 h-14 rounded-2xl object-cover border-2 border-white/10 group-hover:border-pink-500/50 transition-colors bg-slate-800"
                        />
                        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#090d16]" title="Agent Online"></span>
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-white group-hover:text-pink-400 transition-colors flex items-center gap-1.5">
                          {person.name}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-1">
                          {person.title}
                        </p>
                        <span className="inline-block mt-1 text-[10px] uppercase font-semibold text-pink-400/90 tracking-wider">
                          {agentAnalysis.qualities.energyType}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* The Two Official Links */}
                  <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2">
                    <a
                      href={person.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-950/40 hover:bg-blue-900/60 text-blue-300 border border-blue-500/20 text-[11px] font-medium transition-colors"
                      title="LinkedIn Public Profile"
                    >
                      <Linkedin className="w-3 h-3 text-blue-400" />
                      <span>LinkedIn</span>
                      <ArrowUpRight className="w-2.5 h-2.5 opacity-60" />
                    </a>
                    <a
                      href={person.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-pink-950/40 hover:bg-pink-900/60 text-pink-300 border border-pink-500/20 text-[11px] font-medium transition-colors"
                      title="Instagram Public Profile"
                    >
                      <Instagram className="w-3 h-3 text-pink-400" />
                      <span>Instagram</span>
                      <ArrowUpRight className="w-2.5 h-2.5 opacity-60" />
                    </a>
                  </div>
                </div>

                {/* Analysis Preview Snippet */}
                <div className="px-5 py-3 space-y-3 text-xs bg-slate-900/40 border-t border-b border-white/5">
                  {/* Needs Preview */}
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <Heart className="w-3 h-3 text-pink-400" />
                      Core Relational Need
                    </span>
                    <p className="text-slate-300 mt-1 line-clamp-2 italic">
                      "{agentAnalysis.needs.emotional}"
                    </p>
                  </div>

                  {/* Hobbies Pills */}
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1.5">
                      <Compass className="w-3 h-3 text-amber-400" />
                      Extracted Hobbies
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {agentAnalysis.hobbies.slice(0, 3).map((h, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 text-[11px] border border-amber-500/20">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Interests Pills */}
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1.5">
                      <Sparkles className="w-3 h-3 text-purple-400" />
                      Intellectual Passions
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {agentAnalysis.interests.slice(0, 2).map((int, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 text-[11px] border border-purple-500/20">
                          {int}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-slate-900/70 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectPerson(person)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-white/10 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-pink-400" />
                  <span>Inspect Dossier</span>
                </button>
                <button
                  onClick={() => onLaunchDate(person)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/30 text-xs font-medium transition-colors"
                  title="Launch Date"
                >
                  <Flame className="w-3.5 h-3.5 text-pink-400" />
                  <span>Date</span>
                </button>
                <button
                  onClick={() => onViewRankings(person)}
                  className="flex items-center justify-center p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/5 transition-colors"
                  title="View Rankings for this Person"
                >
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
