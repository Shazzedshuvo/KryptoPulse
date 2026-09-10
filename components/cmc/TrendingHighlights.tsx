'use client';

import React from 'react';
import Link from 'next/link';
import { Flame, TrendingUp, Sparkles, ArrowUpRight, ArrowDownRight, ChevronRight } from 'lucide-react';
import { CMC_TOP_COINS } from '@/lib/cmc/coinsData';
import { useCmcStore } from '@/lib/store/useCmcStore';

export const TrendingHighlights: React.FC = () => {
  const { setSelectedCoin } = useCmcStore();

  const trendingCoins = [CMC_TOP_COINS[0], CMC_TOP_COINS[3], CMC_TOP_COINS[11]]; // BTC, SOL, PEPE
  const topGainers = [...CMC_TOP_COINS].sort((a, b) => b.change24h - a.change24h).slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 select-none">
      {/* 1. Trending Card */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#182030] mb-3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold text-xs">
              🔥
            </div>
            <span className="font-bold text-xs text-slate-900 dark:text-white">Trending</span>
          </div>
          <Link href="/markets" className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold flex items-center hover:underline">
            <span>More</span>
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="space-y-2.5">
          {trendingCoins.map((coin, idx) => (
            <div
              key={coin.id}
              onClick={() => setSelectedCoin(coin)}
              className="flex items-center justify-between hover:bg-slate-50 dark:hover:bg-[#182030] p-1.5 rounded-lg cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-slate-400 font-mono text-xs w-3">{idx + 1}</span>
                <img src={coin.logo} alt={coin.name} className="h-5 w-5 rounded-full" />
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200">{coin.name}</span>
                <span className="text-[11px] text-slate-400 font-mono">{coin.symbol}</span>
              </div>
              <span
                className={`font-mono text-xs font-semibold flex items-center ${
                  coin.change24h >= 0 ? 'text-emerald-500' : 'text-red-500'
                }`}
              >
                {coin.change24h >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {coin.change24h >= 0 ? `+${coin.change24h}%` : `${coin.change24h}%`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Top Gainers Card */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#182030] mb-3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-xs">
              🚀
            </div>
            <span className="font-bold text-xs text-slate-900 dark:text-white">Top Gainers</span>
          </div>
          <Link href="/markets" className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold flex items-center hover:underline">
            <span>More</span>
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="space-y-2.5">
          {topGainers.map((coin, idx) => (
            <div
              key={coin.id}
              onClick={() => setSelectedCoin(coin)}
              className="flex items-center justify-between hover:bg-slate-50 dark:hover:bg-[#182030] p-1.5 rounded-lg cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-slate-400 font-mono text-xs w-3">{idx + 1}</span>
                <img src={coin.logo} alt={coin.name} className="h-5 w-5 rounded-full" />
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200">{coin.name}</span>
                <span className="text-[11px] text-slate-400 font-mono">{coin.symbol}</span>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-500 flex items-center">
                <ArrowUpRight className="h-3 w-3" />
                +{coin.change24h}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Fear & Greed Sentiment Card */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#182030] mb-3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold text-xs">
              📊
            </div>
            <span className="font-bold text-xs text-slate-900 dark:text-white">Fear & Greed Index</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold">
            Extreme Greed
          </span>
        </div>

        <div className="flex items-center justify-between py-1">
          <div>
            <div className="text-3xl font-black font-mono text-emerald-500 tracking-tight">
              78<span className="text-sm font-normal text-slate-400">/100</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Historical average: 64 (Greed)
            </p>
          </div>

          {/* Mini dial visualization */}
          <div className="relative h-14 w-14 rounded-full border-4 border-slate-100 dark:border-slate-800 border-t-emerald-500 border-r-emerald-500 flex items-center justify-center">
            <span className="font-mono font-bold text-xs text-slate-800 dark:text-slate-200">78%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
