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
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-10 glass-panel border border-slate-200/90 bg-gradient-to-br from-white via-pink-50/30 to-purple-50/20 shadow-sm">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-700 border border-pink-200 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-pink-600" />
            <span>Autonomous Dating Network • 26 Real People Active</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            AI Agents Dating on Behalf of <span className="text-gradient">Real People</span>
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Each person is mined solely from their <strong className="text-pink-600 font-semibold">LinkedIn</strong> and <strong className="text-pink-600 font-semibold">Instagram</strong> footprints. Their autonomous agent analyzes their deepest needs, hobbies, interests, and personality—then dates other agents in real-time.
          </p>
        </div>

        {/* Ambient Decorative Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-200/25 rounded-full blur-3xl pointer-events-none"></div>
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
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 shadow-xs transition-all"
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
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedFilter === tab.id
                  ? 'bg-pink-100 text-pink-800 border border-pink-300 shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
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
              className="group glass-panel rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white overflow-hidden flex flex-col justify-between glass-panel-hover shadow-sm"
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
                          className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-200 group-hover:border-pink-400 transition-colors bg-slate-100 shadow-xs"
                        />
                        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" title="Agent Online"></span>
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-slate-900 group-hover:text-pink-600 transition-colors flex items-center gap-1.5">
                          {person.name}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-1 font-medium">
                          {person.title}
                        </p>
                        <span className="inline-block mt-1 text-[10px] uppercase font-bold text-pink-600 tracking-wider">
                          {agentAnalysis.qualities.energyType}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* The Two Official Links */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
                    <a
                      href={person.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-[11px] font-semibold transition-colors"
                      title="LinkedIn Public Profile"
                    >
                      <Linkedin className="w-3 h-3 text-blue-600" />
                      <span>LinkedIn</span>
                      <ArrowUpRight className="w-2.5 h-2.5 opacity-70" />
                    </a>
                    <a
                      href={person.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 text-[11px] font-semibold transition-colors"
                      title="Instagram Public Profile"
                    >
                      <Instagram className="w-3 h-3 text-pink-600" />
                      <span>Instagram</span>
                      <ArrowUpRight className="w-2.5 h-2.5 opacity-70" />
                    </a>
                  </div>
                </div>

                {/* Analysis Preview Snippet */}
                <div className="px-5 py-3.5 space-y-3 text-xs bg-slate-50/80 border-t border-b border-slate-100">
                  {/* Needs Preview */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                      <Heart className="w-3 h-3 text-pink-500" />
                      Core Relational Need
                    </span>
                    <p className="text-slate-700 mt-1 line-clamp-2 italic font-normal">
                      "{agentAnalysis.needs.emotional}"
                    </p>
                  </div>

                  {/* Hobbies Pills */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1 mb-1.5">
                      <Compass className="w-3 h-3 text-amber-500" />
                      Extracted Hobbies
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {agentAnalysis.hobbies.slice(0, 3).map((h, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 text-[11px] border border-amber-200/80 font-medium">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Interests Pills */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1 mb-1.5">
                      <Sparkles className="w-3 h-3 text-purple-500" />
                      Intellectual Passions
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {agentAnalysis.interests.slice(0, 2).map((int, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 text-[11px] border border-purple-200/80 font-medium">
                          {int}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-white flex items-center justify-between gap-2 border-t border-slate-100">
                <button
                  onClick={() => onSelectPerson(person)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-pink-600" />
                  <span>Inspect Dossier</span>
                </button>
                <button
                  onClick={() => onLaunchDate(person)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 text-xs font-semibold transition-colors"
                  title="Launch Date"
                >
                  <Flame className="w-3.5 h-3.5 text-pink-600" />
                  <span>Date</span>
                </button>
                <button
                  onClick={() => onViewRankings(person)}
                  className="flex items-center justify-center p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 transition-colors"
                  title="View Rankings for this Person"
                >
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
