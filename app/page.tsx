'use client';

import React from 'react';
import { TrendingHighlights } from '@/components/cmc/TrendingHighlights';
import { CmcCategoryTabs } from '@/components/cmc/CmcCategoryTabs';
import { CmcRankingTable } from '@/components/cmc/CmcRankingTable';
import { GLOBAL_MARKET_STATS } from '@/lib/cmc/globalData';
import { ArrowUpRight } from 'lucide-react';

export default function HomePage() {
  const stats = GLOBAL_MARKET_STATS;

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-6 select-none">
      {/* Top 3 Highlight Cards (Trending, Gainers, Fear & Greed) */}
      <TrendingHighlights />

      {/* Main Page Title Header */}
      <div className="mb-5">
        <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
          Today's Cryptocurrency Prices by Market Cap
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5 flex-wrap">
          <span>The global crypto market cap is <strong>${(stats.marketCapUsd / 1e12).toFixed(2)}T</strong>, a</span>
          <span className="text-emerald-500 font-bold inline-flex items-center">
            <ArrowUpRight className="h-3 w-3" />
            {stats.marketCapChange24h}%
          </span>
          <span>increase over the last day.</span>
        </p>
      </div>

      {/* Category Pills & Table Filter */}
      <CmcCategoryTabs />

      {/* CoinMarketCap Ranking Table with Sparklines */}
      <CmcRankingTable />
    </div>
  );
}
