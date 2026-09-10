'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Star, ArrowLeft } from 'lucide-react';
import { CmcRankingTable } from '@/components/cmc/CmcRankingTable';
import { useCmcStore } from '@/lib/store/useCmcStore';

export default function WatchlistPage() {
  const { watchlist, setActiveCategory } = useCmcStore();

  useEffect(() => {
    setActiveCategory('Watchlist');
    return () => setActiveCategory('All');
  }, [setActiveCategory]);

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-6 select-none space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Star className="h-6 w-6 text-amber-400 fill-amber-400" />
            My CoinMarketCap Watchlist
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track your favorite cryptocurrencies in real-time with 7-day sparkline charts.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#182030] transition-colors self-start sm:self-auto"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>All Cryptocurrencies</span>
        </Link>
      </div>

      {watchlist.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] shadow-sm space-y-3">
          <Star className="h-10 w-10 text-amber-400/40 mx-auto" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Your Watchlist is empty</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click the star icon next to any coin in the ranking table to add it to your watchlist.
          </p>
          <Link
            href="/"
            className="inline-block px-4 py-2 rounded-xl text-xs font-bold bg-[#3861fb] text-white hover:bg-blue-700 transition-colors mt-2"
          >
            Explore Coins
          </Link>
        </div>
      ) : (
        <CmcRankingTable />
      )}
    </div>
  );
}
