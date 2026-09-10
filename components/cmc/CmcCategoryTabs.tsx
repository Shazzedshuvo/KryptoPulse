'use client';

import React from 'react';
import { Star, Search, SlidersHorizontal } from 'lucide-react';
import { useCmcStore } from '@/lib/store/useCmcStore';

export const CMC_CATEGORIES = [
  'All',
  'Watchlist',
  'Layer 1',
  'DeFi',
  'Meme',
  'AI & Big Data',
  'Layer 2',
  'Solana Ecosystem',
  'Stablecoin'
];

export const CmcCategoryTabs: React.FC = () => {
  const { activeCategory, setActiveCategory, watchlist, searchQuery, setSearchQuery } = useCmcStore();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 select-none">
      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
        {CMC_CATEGORIES.map((cat) => {
          const isWatchlist = cat === 'Watchlist';
          const isActive = activeCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-[#121722] text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-[#1a2233] border border-transparent dark:border-[#1a2233]'
              }`}
            >
              {isWatchlist && (
                <Star
                  className={`h-3.5 w-3.5 ${
                    isActive ? 'text-amber-300 fill-amber-300' : 'text-amber-500 fill-amber-500/20'
                  }`}
                />
              )}
              <span>{cat}</span>
              {isWatchlist && <span className="opacity-75">({watchlist.length})</span>}
            </button>
          );
        })}
      </div>

      {/* Filter / Search inside table */}
      <div className="flex items-center gap-2">
        <div className="relative w-full sm:w-48">
          <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Filter list..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-2.5 py-1 text-xs bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-[#1a2233] rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};
