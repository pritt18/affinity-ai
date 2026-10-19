import React, { useState } from 'react';
import { 
  Terminal, Layers, ShieldCheck, Heart, Sparkles, Cpu, 
  Database, Network, Copy, Check, ArrowRight, Code2
} from 'lucide-react';

export default function ArchitectureView() {
  const [copiedOverall, setCopiedOverall] = useState(false);
  const [copiedTech, setCopiedTech] = useState(false);

  // Exact answers strictly under limits
  const overallExplanation = "Affinity AI builds autonomous AI agents representing real people using solely their public LinkedIn & Instagram, enabling agents to simulate conversational dates and rank best-fit romantic partners.";
  
  const techStackExplanation = "Dual-source pipeline: Node.js, Axios & Cheerio extract OpenGraph, JSON-LD schema & meta tags with rotating user-agents. Instagram parses window.__additionalData & shared JSON; LinkedIn extracts Person schema. Resilient heuristic enrichment handles authwalls & rate limits.";

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'overall') {
      setCopiedOverall(true);
      setTimeout(() => setCopiedOverall(false), 2000);
    } else {
      setCopiedTech(true);
      setTimeout(() => setCopiedTech(false), 2000);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-200 bg-white shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200 mb-3">
          <Terminal className="w-3.5 h-3.5 text-indigo-600" />
          <span>System Architecture & Technical Stack</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How the Agentic Dating Platform Works
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed font-normal">
          An end-to-end autonomous harness that ingests exactly two official public endpoints per person, synthesizes psychological and relational profiles, conducts multi-turn dates, and computes mutual rankings.
        </p>
      </div>

      {/* Required Deliverables Copy Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Overall Explanation Card */}
        <div className="glass-panel rounded-2xl p-6 border border-pink-200 bg-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-700">
                Overall Explanation ({overallExplanation.length}/200 chars)
              </span>
              <span className="text-[10px] text-emerald-700 font-bold px-2 py-0.5 rounded bg-emerald-100 border border-emerald-200">
                Within Limit
              </span>
            </div>
            <p className="text-sm text-slate-800 leading-relaxed font-mono bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              "{overallExplanation}"
            </p>
          </div>
          <button
            onClick={() => handleCopy(overallExplanation, 'overall')}
            className="mt-4 flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 text-xs font-semibold transition-colors shadow-xs"
          >
            {copiedOverall ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedOverall ? 'Copied to Clipboard!' : 'Copy Overall Explanation'}</span>
          </button>
        </div>

        {/* Technical Section Card */}
        <div className="glass-panel rounded-2xl p-6 border border-indigo-200 bg-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                Technical Section ({techStackExplanation.length}/500 chars)
              </span>
              <span className="text-[10px] text-emerald-700 font-bold px-2 py-0.5 rounded bg-emerald-100 border border-emerald-200">
                Within Limit
              </span>
            </div>
            <p className="text-sm text-slate-800 leading-relaxed font-mono bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              "{techStackExplanation}"
            </p>
          </div>
          <button
            onClick={() => handleCopy(techStackExplanation, 'tech')}
            className="mt-4 flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-semibold transition-colors shadow-xs"
          >
            {copiedTech ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedTech ? 'Copied to Clipboard!' : 'Copy Technical Section'}</span>
          </button>
        </div>

      </div>

      {/* 4-Stage Architectural Pipeline */}
      <div className="space-y-4">
        <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-pink-600" />
          The Autonomous 4-Stage Pipeline
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          <div className="glass-panel p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2">
            <span className="text-xs font-black text-pink-600">STAGE 01</span>
            <h4 className="font-extrabold text-slate-900 text-base">Dual-Source Ingestion</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Consumes only official LinkedIn and public Instagram URLs. No manual surveys or preset lists.
            </p>
            <div className="pt-2 text-[11px] text-slate-500 space-y-1 font-medium">
              <div>• Cheerio DOM parsing</div>
              <div>• Schema.org JSON-LD</div>
              <div>• OpenGraph protocol</div>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2">
            <span className="text-xs font-black text-indigo-600">STAGE 02</span>
            <h4 className="font-extrabold text-slate-900 text-base">Persona Synthesis</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Extracts 4 pillars: relational needs, extracted hobbies, intellectual passions, and personality quirks.
            </p>
            <div className="pt-2 text-[11px] text-slate-500 space-y-1 font-medium">
              <div>• Big-Five energy vectors</div>
              <div>• Love language mapping</div>
              <div>• Conflict & pacing style</div>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2">
            <span className="text-xs font-black text-amber-600">STAGE 03</span>
            <h4 className="font-extrabold text-slate-900 text-base">Multi-Turn Dating</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Agents go out on simulated dates in curated atmospheres, conversing and generating private monologues.
            </p>
            <div className="pt-2 text-[11px] text-slate-500 space-y-1 font-medium">
              <div>• Turn-by-turn dialogue</div>
              <div>• Subconscious monologue</div>
              <div>• Dynamic chemistry meter</div>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2">
            <span className="text-xs font-black text-emerald-600">STAGE 04</span>
            <h4 className="font-extrabold text-slate-900 text-base">Mutual Ranking</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              For every single person, ranks all 25 candidates with multi-category breakdown and tailored rationale.
            </p>
            <div className="pt-2 text-[11px] text-slate-500 space-y-1 font-medium">
              <div>• Need alignment score</div>
              <div>• Lifestyle tempo synergy</div>
              <div>• Final mutual verdict</div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
