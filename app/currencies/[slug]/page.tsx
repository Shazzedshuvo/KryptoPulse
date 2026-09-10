'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Star, 
  ArrowUpRight, 
  ArrowDownRight, 
  BarChart3, 
  ArrowLeft, 
  ExternalLink,
  ShieldCheck,
  Globe,
  FileText
} from 'lucide-react';
import { CMC_TOP_COINS } from '@/lib/cmc/coinsData';
import { SparklineChart } from '@/components/cmc/SparklineChart';
import { useCmcStore } from '@/lib/store/useCmcStore';
import { useTradingStore } from '@/lib/store/useTradingStore';

export default function CurrencyDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { watchlist, toggleWatchlist } = useCmcStore();
  const { setActiveSymbol } = useTradingStore();

  const coin = CMC_TOP_COINS.find((c) => c.slug === slug) || CMC_TOP_COINS[0];
  const isWatched = watchlist.includes(coin.id);
  const isPositive = coin.change24h >= 0;

  const low24h = coin.low24h || coin.price * 0.97;
  const high24h = coin.high24h || coin.price * 1.03;
  const rangeProgress = Math.min(100, Math.max(0, Math.round(((coin.price - low24h) / (high24h - low24h)) * 100)));

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-6 select-none space-y-6">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 transition-colors font-semibold"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Cryptocurrencies</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Coin Header, Price, Chart */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] shadow-sm space-y-6">
            {/* Header badges */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src={coin.logo} alt={coin.name} className="h-12 w-12 rounded-full shadow-sm" />
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white">{coin.name}</h1>
                    <span className="text-sm font-mono font-bold text-slate-400 uppercase">{coin.symbol}</span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#182030] text-slate-500 font-mono font-bold text-xs">
                      #{coin.rank}
                    </span>
                  </div>
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">{coin.category}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleWatchlist(coin.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${
                    isWatched
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-500'
                      : 'border-slate-200 dark:border-[#1a2233] text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#182030]'
                  }`}
                >
                  <Star className={`h-3.5 w-3.5 ${isWatched ? 'fill-amber-500' : ''}`} />
                  <span>{isWatched ? 'In Watchlist' : 'Add to Watchlist'}</span>
                </button>
              </div>
            </div>

            {/* Price Row */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-t border-slate-100 dark:border-[#182030] pt-4">
              <div>
                <span className="text-xs text-slate-400 block mb-0.5">{coin.name} Price ({coin.symbol})</span>
                <div className="text-3xl font-black font-mono text-slate-900 dark:text-white">
                  ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center font-bold text-sm px-2.5 py-1 rounded-lg ${
                    isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                  }`}
                >
                  {isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  {isPositive ? '+' : ''}{coin.change24h}%
                </span>
                <span className="text-xs text-slate-400 font-mono">(24h)</span>
              </div>
            </div>

            {/* 24h Range */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0b0e14] border border-slate-100 dark:border-[#182030] space-y-1.5 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400">
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

            {/* Historical 7d Chart */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                7-Day Price Movement
              </span>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0b0e14] border border-slate-100 dark:border-[#182030] flex justify-center">
                <SparklineChart data={coin.sparkline7d} isPositive={coin.change7d >= 0} width={620} height={140} />
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Stats & Quick Trade */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">{coin.symbol} Market Statistics</h3>

            <div className="space-y-3 font-mono text-xs divide-y divide-slate-100 dark:divide-[#182030]">
              <div className="flex justify-between pt-2">
                <span className="text-slate-400 font-sans">Market Cap</span>
                <span className="font-bold text-slate-900 dark:text-white">${(coin.marketCap / 1e9).toFixed(2)}B</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-slate-400 font-sans">24h Volume</span>
                <span className="font-bold text-slate-900 dark:text-white">${(coin.volume24h / 1e9).toFixed(2)}B</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-slate-400 font-sans">Circulating Supply</span>
                <span className="font-bold text-slate-900 dark:text-white">{coin.circulatingSupply.toLocaleString()} {coin.symbol}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-slate-400 font-sans">All-Time High</span>
                <span className="font-bold text-slate-900 dark:text-white">${coin.allTimeHigh?.toLocaleString() || 'N/A'}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-slate-400 font-sans">All-Time Low</span>
                <span className="font-bold text-slate-900 dark:text-white">${coin.allTimeLow?.toLocaleString() || 'N/A'}</span>
              </div>
            </div>

            {/* Direct Trade CTA */}
            <div className="pt-3">
              <Link
                href={`/trade/${coin.symbol}-USDT`}
                onClick={() => setActiveSymbol(`${coin.symbol}/USDT`)}
                className="w-full py-3 rounded-xl font-bold text-xs bg-[#3861fb] hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Trade {coin.symbol}/USDT on Terminal</span>
              </Link>
            </div>
          </div>

          {/* Official Info links */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] shadow-sm space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs">Official Resources</h4>
            <div className="space-y-2 font-medium">
              <a href="https://bitcoin.org" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-[#0b0e14] hover:text-blue-500 transition-colors">
                <span className="flex items-center gap-2"><Globe className="h-3.5 w-3.5" /> Official Website</span>
                <ExternalLink className="h-3 w-3 text-slate-400" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-[#0b0e14] hover:text-blue-500 transition-colors">
                <span className="flex items-center gap-2"><FileText className="h-3.5 w-3.5" /> Whitepaper</span>
                <ExternalLink className="h-3 w-3 text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
