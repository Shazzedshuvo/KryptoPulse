'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownRight, Fuel, Flame, ExternalLink } from 'lucide-react';
import { GLOBAL_MARKET_STATS } from '@/lib/cmc/globalData';

export const GlobalHeaderBar: React.FC = () => {
  const stats = GLOBAL_MARKET_STATS;

  return (
    <div className="w-full bg-slate-50 dark:bg-[#080a0f] border-b border-slate-200 dark:border-[#1a2233] text-[11px] select-none text-slate-500 dark:text-slate-400 py-1.5 px-3 md:px-6 transition-colors overflow-x-auto">
      <div className="flex items-center justify-between min-w-max gap-6">
        {/* Left Stats items */}
        <div className="flex items-center gap-4 sm:gap-6 font-mono">
          <div>
            <span>Cryptos: </span>
            <span className="text-blue-600 dark:text-blue-400 font-semibold">{stats.cryptosCount.toLocaleString()}</span>
          </div>

          <div>
            <span>Exchanges: </span>
            <span className="text-blue-600 dark:text-blue-400 font-semibold">{stats.exchangesCount}</span>
          </div>

          <div className="flex items-center gap-1">
            <span>Market Cap: </span>
            <span className="text-slate-800 dark:text-slate-200 font-semibold">
              ${(stats.marketCapUsd / 1e12).toFixed(2)}T
            </span>
            <span className="text-emerald-500 font-semibold flex items-center">
              <ArrowUpRight className="h-3 w-3" />
              {stats.marketCapChange24h}%
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span>24h Vol: </span>
            <span className="text-slate-800 dark:text-slate-200 font-semibold">
              ${(stats.volume24hUsd / 1e9).toFixed(2)}B
            </span>
            <span className="text-red-500 font-semibold flex items-center">
              <ArrowDownRight className="h-3 w-3" />
              {Math.abs(stats.volumeChange24h)}%
            </span>
          </div>

          <div>
            <span>Dominance: </span>
            <span className="text-blue-600 dark:text-blue-400 font-semibold">BTC: {stats.btcDominance}% </span>
            <span className="text-blue-600 dark:text-blue-400 font-semibold">ETH: {stats.ethDominance}%</span>
          </div>

          <div className="flex items-center gap-1">
            <Fuel className="h-3 w-3 text-slate-400" />
            <span>ETH Gas: </span>
            <span className="text-slate-800 dark:text-slate-200 font-semibold">{stats.ethGasGwei} Gwei</span>
          </div>
        </div>

        {/* Right Mood / Fear & Greed pill */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold text-[10px]">
            <Flame className="h-3 w-3" />
            <span>Fear & Greed: {stats.fearAndGreedScore}/100 ({stats.fearAndGreedLabel})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
