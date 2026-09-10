'use client';

import React from 'react';
import Link from 'next/link';
import { 
  X, 
  Star, 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp, 
  BarChart3, 
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { useCmcStore } from '@/lib/store/useCmcStore';
import { useTradingStore } from '@/lib/store/useTradingStore';
import { SparklineChart } from './SparklineChart';

export const CoinDetailModal: React.FC = () => {
  const { selectedCoin, setSelectedCoin, watchlist, toggleWatchlist } = useCmcStore();
  const { setActiveSymbol } = useTradingStore();

  if (!selectedCoin) return null;

  const isWatched = watchlist.includes(selectedCoin.id);
  const isPositive = selectedCoin.change24h >= 0;

  const low24h = selectedCoin.low24h || selectedCoin.price * 0.97;
  const high24h = selectedCoin.high24h || selectedCoin.price * 1.03;
  const rangeProgress = Math.min(100, Math.max(0, Math.round(((selectedCoin.price - low24h) / (high24h - low24h)) * 100)));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in select-none text-xs">
      <div className="w-full max-w-xl rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] shadow-2xl p-6 text-slate-900 dark:text-white max-h-[90vh] overflow-y-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#182030]">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#182030] text-slate-500 font-mono font-bold text-[11px]">
              Rank #{selectedCoin.rank}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold text-[11px]">
              {selectedCoin.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWatchlist(selectedCoin.id)}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-[#1a2233] hover:bg-slate-100 dark:hover:bg-[#182030] text-slate-400 hover:text-amber-400 transition-colors"
              title="Add to Watchlist"
            >
              <Star className={`h-4 w-4 ${isWatched ? 'text-amber-400 fill-amber-400' : ''}`} />
            </button>
            <button
              onClick={() => setSelectedCoin(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#182030] transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Coin Title & Price */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 my-5">
          <div className="flex items-center gap-3">
            <img src={selectedCoin.logo} alt={selectedCoin.name} className="h-10 w-10 rounded-full" />
            <div>
              <div className="flex items-baseline gap-2">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">{selectedCoin.name}</h2>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase">{selectedCoin.symbol}</span>
              </div>
              <span className="text-[11px] text-slate-400">CoinMarketCap Official Verified Listing</span>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
              ${selectedCoin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
            </div>
            <div className="flex items-center sm:justify-end gap-1.5 mt-0.5">
              <span
                className={`inline-flex items-center font-bold text-xs px-2 py-0.5 rounded-md ${
                  isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                }`}
              >
                {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {isPositive ? '+' : ''}{selectedCoin.change24h}%
              </span>
              <span className="text-[11px] text-slate-400 font-mono">(24h)</span>
            </div>
          </div>
        </div>

        {/* 24h Range Slider */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0b0e14] border border-slate-100 dark:border-[#182030] mb-5 space-y-1.5 font-mono">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>24h Low: <strong className="text-slate-700 dark:text-slate-300">${low24h.toLocaleString()}</strong></span>
            <span>24h High: <strong className="text-slate-700 dark:text-slate-300">${high24h.toLocaleString()}</strong></span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-[#182030] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500"
              style={{ width: `${rangeProgress}%` }}
            />
          </div>
        </div>

        {/* Key Market Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5 font-mono">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0b0e14] border border-slate-100 dark:border-[#182030]">
            <span className="text-[10px] text-slate-400 block">Market Cap</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white mt-1 block">
              ${(selectedCoin.marketCap / 1e9).toFixed(2)}B
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0b0e14] border border-slate-100 dark:border-[#182030]">
            <span className="text-[10px] text-slate-400 block">24h Volume</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white mt-1 block">
              ${(selectedCoin.volume24h / 1e9).toFixed(2)}B
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0b0e14] border border-slate-100 dark:border-[#182030]">
            <span className="text-[10px] text-slate-400 block">Circulating Supply</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white mt-1 block">
              {selectedCoin.circulatingSupply.toLocaleString()} {selectedCoin.symbol}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0b0e14] border border-slate-100 dark:border-[#182030]">
            <span className="text-[10px] text-slate-400 block">All-Time High</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white mt-1 block">
              ${selectedCoin.allTimeHigh?.toLocaleString() || 'N/A'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0b0e14] border border-slate-100 dark:border-[#182030]">
            <span className="text-[10px] text-slate-400 block">7d Price Change</span>
            <span
              className={`text-sm font-bold mt-1 block ${
                selectedCoin.change7d >= 0 ? 'text-emerald-500' : 'text-red-500'
              }`}
            >
              {selectedCoin.change7d >= 0 ? '+' : ''}{selectedCoin.change7d}%
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0b0e14] border border-slate-100 dark:border-[#182030]">
            <span className="text-[10px] text-slate-400 block">Max Supply</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white mt-1 block">
              {selectedCoin.maxSupply ? `${selectedCoin.maxSupply.toLocaleString()}` : 'Infinite (∞)'}
            </span>
          </div>
        </div>

        {/* 7d Sparkline Chart Preview */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0b0e14] border border-slate-100 dark:border-[#182030] mb-5">
          <span className="text-[10px] text-slate-400 font-mono font-semibold uppercase block mb-2">
            7-Day Historical Trend
          </span>
          <div className="flex justify-center w-full">
            <SparklineChart data={selectedCoin.sparkline7d} isPositive={selectedCoin.change7d >= 0} width={380} height={70} />
          </div>
        </div>

        {/* Trade CTA button */}
        <div className="flex items-center gap-3">
          <Link
            href={`/trade/${selectedCoin.symbol}-USDT`}
            onClick={() => {
              setActiveSymbol(`${selectedCoin.symbol}/USDT`);
              setSelectedCoin(null);
            }}
            className="flex-1 py-3 rounded-xl font-bold text-xs bg-[#3861fb] hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Trade {selectedCoin.symbol}/USDT on Pro Terminal</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
