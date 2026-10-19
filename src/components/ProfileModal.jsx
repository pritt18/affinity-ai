import React from 'react';
import { 
  X, Linkedin, Instagram, Sparkles, Heart, Brain, Compass, 
  Smile, ShieldCheck, Flame, ArrowUpRight, Award, MessageCircle, Eye
} from 'lucide-react';

export default function ProfileModal({ person, onClose, onLaunchDate, onViewRankings }) {
  if (!person) return null;

  const { agentAnalysis, sources } = person;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-[#0d121f] border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gradient Banner */}
        <div className="h-32 sm:h-44 bg-gradient-to-r from-pink-900/60 via-purple-900/40 to-slate-900 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-6 sm:left-8 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/20 text-pink-300 border border-pink-500/40 flex items-center gap-1.5 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              Agentic Persona Analysis Dossier
            </span>
          </div>
        </div>

        {/* Profile Header Info */}
        <div className="px-6 sm:px-8 pb-6 border-b border-white/10 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              <img 
                src={person.avatar} 
                alt={person.name} 
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-[#0d121f] shadow-2xl bg-slate-800"
              />
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  {person.name}
                </h2>
                <p className="text-sm sm:text-base text-pink-400 font-medium">
                  {person.title}
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    Agent Active
                  </span>
                  <span>•</span>
                  <span>Energy: <strong className="text-slate-200">{agentAnalysis.qualities.energyType}</strong></span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  onLaunchDate(person);
                }}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white font-medium text-sm shadow-md shadow-pink-500/20 transition-all"
              >
                <Flame className="w-4 h-4" />
                <span>Simulate Date</span>
              </button>
              <button
                onClick={() => {
                  onClose();
                  onViewRankings(person);
                }}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-sm border border-white/10 transition-all"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>View Rankings</span>
              </button>
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
            {person.bio}
          </p>

          {/* The Two Official Sources Display */}
          <div className="mt-5 p-4 rounded-xl bg-slate-900/70 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-pink-400" />
              The Two Ground-Truth Ingestion Sources
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a 
                href={person.linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-900/30 hover:bg-blue-900/50 text-blue-300 border border-blue-500/30 text-xs font-medium transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                <span>LinkedIn Public Profile</span>
                <ArrowUpRight className="w-3 h-3 text-blue-400" />
              </a>
              <a 
                href={person.instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-pink-900/30 hover:bg-pink-900/50 text-pink-300 border border-pink-500/30 text-xs font-medium transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <span>Instagram Public Profile</span>
                <ArrowUpRight className="w-3 h-3 text-pink-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Scrollable Agent Analysis Content */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[55vh] overflow-y-auto">
          
          {/* Section 1: Needs Analysis */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-pink-400" />
              <h3 className="text-lg font-bold text-white tracking-wide">
                Agent's Reading: Relational & Personal Needs
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5">
                <span className="text-xs font-semibold uppercase text-pink-400 tracking-wider">Emotional Needs</span>
                <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                  {agentAnalysis.needs.emotional}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5">
                <span className="text-xs font-semibold uppercase text-indigo-400 tracking-wider">Intellectual Needs</span>
                <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                  {agentAnalysis.needs.intellectual}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5">
                <span className="text-xs font-semibold uppercase text-cyan-400 tracking-wider">Lifestyle Rhythm</span>
                <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                  {agentAnalysis.needs.lifestyle}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5">
                <span className="text-xs font-semibold uppercase text-emerald-400 tracking-wider">Partner Pace</span>
                <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                  {agentAnalysis.needs.partnerPace}
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Hobbies & Passions */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Compass className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white tracking-wide">
                Extracted Hobbies & Passion Pursuits
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {agentAnalysis.hobbies.map((hobby, idx) => (
                <span 
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl text-sm font-medium bg-amber-500/10 text-amber-300 border border-amber-500/25 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  {hobby}
                </span>
              ))}
            </div>
          </div>

          {/* Section 3: Interests & Topics */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-bold text-white tracking-wide">
                Intellectual Interests & Curiosities
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {agentAnalysis.interests.map((interest, idx) => (
                <span 
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl text-sm font-medium bg-purple-500/10 text-purple-300 border border-purple-500/25 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Section 4: Qualities & Persona Nuances */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Smile className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-bold text-white tracking-wide">
                Qualities, Personality & Quirks
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {agentAnalysis.qualities.traits.map((trait, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                  >
                    {trait}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="p-3.5 rounded-xl bg-slate-900/40 border border-white/5">
                  <span className="text-xs font-semibold text-slate-400 block mb-1">Communication Style</span>
                  <p className="text-slate-200">{agentAnalysis.qualities.communicationStyle}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/40 border border-white/5">
                  <span className="text-xs font-semibold text-slate-400 block mb-1">Core Values</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {agentAnalysis.qualities.values.map((val, idx) => (
                      <span key={idx} className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {val}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {agentAnalysis.qualities.quirks && (
                <div className="p-3.5 rounded-xl bg-pink-950/20 border border-pink-500/20 text-sm">
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-400 block mb-1">
                    Unique Nuance / Quirk
                  </span>
                  <p className="text-pink-200/90 italic">"{agentAnalysis.qualities.quirks}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Section 5: What the Agent Looks For */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-900/90 border border-white/10">
            <h4 className="text-sm font-bold text-slate-200 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" />
              Autonomous Matchmaking Directives
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block font-semibold mb-1">Ideal Partner Traits</span>
                <ul className="space-y-0.5 text-slate-300 list-disc list-inside">
                  {agentAnalysis.compatibilityPreferences.idealPartnerTraits.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold mb-1">Dealbreakers</span>
                <ul className="space-y-0.5 text-slate-300 list-disc list-inside">
                  {agentAnalysis.compatibilityPreferences.dealbreakers.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold mb-1">Romantic Love Language</span>
                <p className="text-pink-400 font-semibold">{agentAnalysis.compatibilityPreferences.loveLanguage}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-900/90 border-t border-white/10 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Source analysis generated autonomously from public web footprints.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
          >
            Close Dossier
          </button>
        </div>

      </div>
    </div>
  );
}
