'use client';

import React, { useState } from 'react';
import { Newspaper, Clock, TrendingUp, ExternalLink, Flame } from 'lucide-react';
import { DAILY_CRYPTO_NEWS, CryptoNewsItem } from '@/lib/news/mockNewsData';

export const CryptoNewsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Bitcoin', 'Ethereum', 'DeFi', 'Regulation', 'Macro'];

  const filteredNews = selectedCategory === 'All'
    ? DAILY_CRYPTO_NEWS
    : DAILY_CRYPTO_NEWS.filter((n) => n.category === selectedCategory);

  return (
    <section className="py-8 select-none" id="news">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-6">
        {/* Section Title & Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Newspaper className="h-5 w-5 text-emerald-500" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Daily Crypto Market News
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Curated breaking news, institutional updates, and macro market developments.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#182030] border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNews.map((item) => (
            <article
              key={item.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1f293d] shadow-sm hover:border-emerald-500/30 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Meta Bar */}
                <div className="flex items-center justify-between text-[11px]">
                  <span className="px-2 py-0.5 rounded-md font-semibold bg-slate-100 dark:bg-[#182030] text-slate-700 dark:text-slate-300">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-2 text-slate-400 font-mono">
                    <span>{item.source}</span>
                    <span>•</span>
                    <span>{item.timeAgo}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors leading-snug">
                  {item.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              {/* Bottom bar */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#182030] flex items-center justify-between text-[11px]">
                <span className="text-slate-400">{item.readTime}</span>
                <span
                  className={`font-semibold capitalize px-2 py-0.5 rounded text-[10px] ${
                    item.sentiment === 'bullish'
                      ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {item.sentiment}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
