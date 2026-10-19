import React from 'react';
import { Heart, Sparkles, Trophy, Users, PlusCircle, Terminal, Layers } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenAddModal, peopleCount, datesCount }) {
  const navItems = [
    { id: 'profiles', label: `Agent Personas (${peopleCount})`, icon: Users },
    { id: 'arena', label: 'Live Date Arena', icon: Sparkles, badge: 'Interactive' },
    { id: 'rankings', label: 'Compatibility Rankings', icon: Trophy },
    { id: 'architecture', label: 'Tech Stack & Scraper', icon: Terminal }
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 bg-[#080c14]/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('profiles')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-500 p-0.5 shadow-lg shadow-pink-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-[#0d121f] rounded-[14px] flex items-center justify-center">
                <Heart className="w-5 h-5 text-pink-500 fill-pink-500/30 group-hover:scale-110 transition-transform duration-200" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-pink-300 transition-colors">
                  Affinity <span className="text-pink-500">AI</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">
                  Agentic Dating
                </span>
              </div>
              <p className="text-xs text-slate-400 font-normal hidden sm:block">
                Autonomous agents dating on behalf of real people
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-pink-500/15 text-pink-400 border border-pink-500/30 shadow-sm shadow-pink-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-pink-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 px-1.5 py-0.2 text-[9px] uppercase font-semibold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Deploy Agent Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white font-medium text-sm shadow-md shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Deploy Agent</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>

        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-2 border-t border-white/5 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center whitespace-nowrap gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-900/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
