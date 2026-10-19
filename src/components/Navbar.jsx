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
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/90 bg-white/85 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('profiles')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-500 p-0.5 shadow-md shadow-pink-500/15 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Heart className="w-5 h-5 text-pink-600 fill-pink-600/30 group-hover:scale-110 transition-transform duration-200" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-pink-600 transition-colors">
                  Affinity <span className="text-pink-600">AI</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-pink-100 text-pink-700 border border-pink-200">
                  Agentic Dating
                </span>
              </div>
              <p className="text-xs text-slate-500 font-normal hidden sm:block">
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
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-pink-50 text-pink-700 border border-pink-200 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-pink-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 px-1.5 py-0.2 text-[9px] uppercase font-bold rounded bg-amber-100 text-amber-800 border border-amber-200">
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
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-semibold text-sm shadow-md shadow-pink-500/20 hover:shadow-pink-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Deploy Agent</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>

        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-2 border-t border-slate-200 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center whitespace-nowrap gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-pink-50 text-pink-700 border border-pink-200'
                    : 'text-slate-600 hover:text-slate-900 bg-slate-100'
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
