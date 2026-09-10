'use client';

import React from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  ArrowRight, 
  ShieldCheck, 
  BarChart2, 
  Wallet, 
  Zap, 
  Flame, 
  ArrowUpRight, 
  ArrowDownRight,
  ExternalLink
} from 'lucide-react';
import { POPULAR_PAIRS } from '@/lib/ccxt/mockData';
import { useDepositStore } from '@/lib/store/useDepositStore';

export const HeroSection: React.FC = () => {
  const { openDepositModal } = useDepositStore();

  return (
    <div className="relative overflow-hidden pt-8 pb-12 border-b border-slate-200 dark:border-[#1f293d]">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 -z-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-1/4 -z-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Multi-Exchange CCXT Live Engine • Zero Custody</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Trade Directly on <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500">
                Top Exchanges
              </span> With Zero Custody.
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              Connect your read+trade API keys from Binance, Bybit, KuCoin, OKX, and Coinbase. Execute orders with TradingView charts, real-time depth books, and live portfolio tracking without giving up control of your funds.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/trade"
                className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/25 flex items-center gap-2 transition-all hover:gap-3"
              >
                <span>Launch Pro Terminal</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <button
                type="button"
                onClick={() => openDepositModal('USDT')}
                className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-white dark:bg-[#121722] hover:bg-slate-50 dark:hover:bg-[#182030] border border-slate-200 dark:border-[#1f293d] text-slate-800 dark:text-slate-200 flex items-center gap-2 transition-colors shadow-sm"
              >
                <Wallet className="h-4 w-4 text-emerald-500" />
                <span>Deposit Crypto</span>
              </button>

              <Link
                href="/markets"
                className="px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
              >
                Explore 50+ Markets
              </Link>
            </div>

            {/* Micro stats / trust pills */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-[#182030]">
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>AES-256 Encrypted</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Zap className="h-4 w-4 text-amber-500" />
                <span>Sub-15ms Relay</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Flame className="h-4 w-4 text-cyan-500" />
                <span>Non-Custodial Architecture</span>
              </div>
            </div>
          </div>

          {/* Right Column: Fear & Greed Index + Top 4 Trending Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Market Mood: Fear & Greed Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1f293d] shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Crypto Fear & Greed Index</span>
                <div className="text-2xl font-black font-mono text-emerald-500 mt-0.5 flex items-center gap-2">
                  <span>78</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 font-sans font-semibold">
                    Extreme Greed
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                  Daily sentiment across exchanges & social media
                </span>
              </div>
              <div className="h-12 w-12 rounded-full border-4 border-emerald-500/30 border-t-emerald-500 flex items-center justify-center font-mono font-bold text-xs text-emerald-500">
                78%
              </div>
            </div>

            {/* 4 Mini Market Cards Grid */}
            <div className="grid grid-cols-2 gap-3">
              {POPULAR_PAIRS.slice(0, 4).map((p) => {
                const isPositive = p.change >= 0;
                return (
                  <Link
                    key={p.symbol}
                    href={`/trade/${p.symbol.replace('/', '-')}`}
                    className="p-4 rounded-xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1f293d] shadow-sm hover:border-emerald-500/40 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                        {p.symbol}
                      </span>
                      <span
                        className={`text-[11px] font-mono font-semibold flex items-center ${
                          isPositive ? 'text-emerald-500' : 'text-red-500'
                        }`}
                      >
                        {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {isPositive ? `+${p.change}%` : `${p.change}%`}
                      </span>
                    </div>
                    <div className="font-mono font-black text-sm sm:text-base text-slate-800 dark:text-slate-200">
                      ${p.basePrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-1">
                      24h Vol: $4.2B
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
