import React, { useState } from 'react';
import { 
  X, Linkedin, Instagram, Sparkles, CheckCircle2, 
  Loader2, ArrowRight, ShieldCheck, AlertCircle 
} from 'lucide-react';

export default function AddPersonModal({ isOpen, onClose, onAgentCreated }) {
  const [name, setName] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0); // 0: input, 1: scraping, 2: synthesizing, 3: ranking
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!linkedinUrl || !instagramUrl) {
      setError('Please provide both LinkedIn and Instagram public URLs.');
      return;
    }

    setError(null);
    setLoading(true);
    setStep(1);

    // Multi-step animated progress simulation
    const timer1 = setTimeout(() => setStep(2), 1200);
    const timer2 = setTimeout(() => setStep(3), 2400);

    try {
      const res = await fetch('/api/agents/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, linkedinUrl, instagramUrl })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to analyze links');
      }

      setTimeout(() => {
        setLoading(false);
        setStep(0);
        onAgentCreated(data.person);
        onClose();
      }, 3200);
    } catch (err) {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setError(err.message);
      setLoading(false);
      setStep(0);
    }
  };

  const fillSampleLinks = (sampleName, sampleLi, sampleIg) => {
    setName(sampleName);
    setLinkedinUrl(sampleLi);
    setInstagramUrl(sampleIg);
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="relative w-full max-w-xl bg-[#0d121f] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 pb-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center border border-pink-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">Deploy New Dating Agent</h3>
              <p className="text-xs text-slate-400">Autonomous dual-source persona ingestion</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            disabled={loading}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors disabled:opacity-30"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        {loading ? (
          <div className="p-8 text-center space-y-6">
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-pink-500/20 border-t-pink-500 animate-spin"></div>
              <Sparkles className="w-8 h-8 text-pink-400 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-bold text-white">
                {step === 1 && 'Reading Public LinkedIn Profile...'}
                {step === 2 && 'Reading Public Instagram Footprint...'}
                {step === 3 && 'Synthesizing Needs, Hobbies & Personality...'}
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {step === 1 && 'Extracting career focus, intellectual skills, education, and public headline.'}
                {step === 2 && 'Parsing visual themes, lifestyle motifs, bio tags, and aesthetic rhythm.'}
                {step === 3 && 'Compiling agent dating directives, communication style, and 26-person compatibility vectors.'}
              </p>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden max-w-xs mx-auto">
              <div 
                className="bg-gradient-to-r from-pink-500 to-rose-500 h-full transition-all duration-700"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {error && (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/5 text-xs text-slate-300 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
              <span>
                <strong>Zero manual typing of hobbies or preferences.</strong> Exactly two official sources go in: a public LinkedIn and a public Instagram. The agent reads both and discovers the person's needs automatically.
              </span>
            </div>

            {/* Field: Full Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Person's Full Name (Optional — Auto-detected)
              </label>
              <input
                type="text"
                placeholder="e.g. Cleo Abram or Sam Altman"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-pink-500/50"
              />
            </div>

            {/* Field: LinkedIn URL */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                LinkedIn Public Profile URL *
              </label>
              <input
                type="url"
                required
                placeholder="https://www.linkedin.com/in/username"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-pink-500/50"
              />
            </div>

            {/* Field: Instagram URL */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                Instagram Public Profile URL *
              </label>
              <input
                type="url"
                required
                placeholder="https://www.instagram.com/username"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-pink-500/50"
              />
            </div>

            {/* Quick Fill Sample Links */}
            <div>
              <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                Or Click to Test with Sample Public Profiles:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => fillSampleLinks(
                    'Karpathy', 
                    'https://www.linkedin.com/in/andrej-karpathy', 
                    'https://www.instagram.com/karpathy'
                  )}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                >
                  Andrej Karpathy (AI)
                </button>
                <button
                  type="button"
                  onClick={() => fillSampleLinks(
                    'Sara Blakely', 
                    'https://www.linkedin.com/in/sarablakely', 
                    'https://www.instagram.com/sarablakely'
                  )}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                >
                  Sara Blakely (Spanx)
                </button>
                <button
                  type="button"
                  onClick={() => fillSampleLinks(
                    'Marques Brownlee', 
                    'https://www.linkedin.com/in/marquesbrownlee', 
                    'https://www.instagram.com/mkbhd'
                  )}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                >
                  MKBHD (Marques)
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white font-medium text-xs shadow-md shadow-pink-500/25 transition-all"
              >
                <span>Deploy Dating Agent</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
