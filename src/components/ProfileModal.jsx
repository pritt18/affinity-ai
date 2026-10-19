import React from 'react';
import { 
  X, Linkedin, Instagram, Sparkles, Heart, Brain, Compass, 
  Smile, ShieldCheck, Flame, ArrowUpRight, Award, MessageCircle, Eye
} from 'lucide-react';

export default function ProfileModal({ person, onClose, onLaunchDate, onViewRankings }) {
  if (!person) return null;

  const { agentAnalysis, sources } = person;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gradient Banner */}
        <div className="h-32 sm:h-44 bg-gradient-to-r from-pink-100 via-rose-100 to-purple-100 relative border-b border-slate-200">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center border border-slate-300 shadow-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-6 sm:left-8 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-pink-700 border border-pink-200 flex items-center gap-1.5 shadow-xs backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-pink-600" />
              Agentic Persona Analysis Dossier
            </span>
          </div>
        </div>

        {/* Profile Header Info */}
        <div className="px-6 sm:px-8 pb-6 border-b border-slate-200 relative bg-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              <img 
                src={person.avatar} 
                alt={person.name} 
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-white shadow-xl bg-slate-100"
              />
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  {person.name}
                </h2>
                <p className="text-sm sm:text-base text-pink-600 font-semibold">
                  {person.title}
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    Agent Active
                  </span>
                  <span>•</span>
                  <span>Energy: <strong className="text-slate-800">{agentAnalysis.qualities.energyType}</strong></span>
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
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-semibold text-sm shadow-md shadow-pink-500/20 transition-all"
              >
                <Flame className="w-4 h-4" />
                <span>Simulate Date</span>
              </button>
              <button
                onClick={() => {
                  onClose();
                  onViewRankings(person);
                }}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm border border-slate-300 transition-all"
              >
                <Award className="w-4 h-4 text-amber-500" />
                <span>View Rankings</span>
              </button>
            </div>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
            {person.bio}
          </p>

          {/* The Two Official Sources Display */}
          <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-pink-600" />
              The Two Ground-Truth Ingestion Sources
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a 
                href={person.linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                <span>LinkedIn Public Profile</span>
                <ArrowUpRight className="w-3 h-3 text-blue-500" />
              </a>
              <a 
                href={person.instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 text-xs font-semibold transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-600" />
                <span>Instagram Public Profile</span>
                <ArrowUpRight className="w-3 h-3 text-pink-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Scrollable Agent Analysis Content */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[55vh] overflow-y-auto bg-white">
          
          {/* Section 1: Needs Analysis */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-pink-600" />
              <h3 className="text-lg font-extrabold text-slate-900 tracking-wide">
                Agent's Reading: Relational & Personal Needs
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold uppercase text-pink-700 tracking-wider">Emotional Needs</span>
                <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                  {agentAnalysis.needs.emotional}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold uppercase text-indigo-700 tracking-wider">Intellectual Needs</span>
                <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                  {agentAnalysis.needs.intellectual}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold uppercase text-cyan-700 tracking-wider">Lifestyle Rhythm</span>
                <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                  {agentAnalysis.needs.lifestyle}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold uppercase text-emerald-700 tracking-wider">Partner Pace</span>
                <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                  {agentAnalysis.needs.partnerPace}
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Hobbies & Passions */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Compass className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-extrabold text-slate-900 tracking-wide">
                Extracted Hobbies & Passion Pursuits
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {agentAnalysis.hobbies.map((hobby, idx) => (
                <span 
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl text-sm font-semibold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  {hobby}
                </span>
              ))}
            </div>
          </div>

          {/* Section 3: Interests & Topics */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-extrabold text-slate-900 tracking-wide">
                Intellectual Interests & Curiosities
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {agentAnalysis.interests.map((interest, idx) => (
                <span 
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl text-sm font-semibold bg-purple-50 text-purple-800 border border-purple-200 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Section 4: Qualities & Persona Nuances */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Smile className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-extrabold text-slate-900 tracking-wide">
                Qualities, Personality & Quirks
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {agentAnalysis.qualities.traits.map((trait, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200"
                  >
                    {trait}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-500 block mb-1">Communication Style</span>
                  <p className="text-slate-800 font-medium">{agentAnalysis.qualities.communicationStyle}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-500 block mb-1">Core Values</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {agentAnalysis.qualities.values.map((val, idx) => (
                      <span key={idx} className="text-xs px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium">
                        {val}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {agentAnalysis.qualities.quirks && (
                <div className="p-3.5 rounded-xl bg-pink-50 border border-pink-200 text-sm">
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-700 block mb-1">
                    Unique Nuance / Quirk
                  </span>
                  <p className="text-pink-900 italic font-medium">"{agentAnalysis.qualities.quirks}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Section 5: What the Agent Looks For */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="text-sm font-extrabold text-slate-900 mb-2.5 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-600" />
              Autonomous Matchmaking Directives
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block font-bold mb-1">Ideal Partner Traits</span>
                <ul className="space-y-0.5 text-slate-700 list-disc list-inside font-medium">
                  {agentAnalysis.compatibilityPreferences.idealPartnerTraits.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-slate-500 block font-bold mb-1">Dealbreakers</span>
                <ul className="space-y-0.5 text-slate-700 list-disc list-inside font-medium">
                  {agentAnalysis.compatibilityPreferences.dealbreakers.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-slate-500 block font-bold mb-1">Romantic Love Language</span>
                <p className="text-pink-600 font-bold text-sm mt-0.5">{agentAnalysis.compatibilityPreferences.loveLanguage}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Source analysis generated autonomously from public web footprints.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold shadow-xs transition-colors"
          >
            Close Dossier
          </button>
        </div>

      </div>
    </div>
  );
}
