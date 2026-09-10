'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  Search, 
  ArrowUpRight, 
  ArrowDownRight, 
  ExternalLink,
  Layers
} from 'lucide-react';
import { POPULAR_PAIRS, SUPPORTED_EXCHANGES } from '@/lib/ccxt/mockData';
import { useTradingStore } from '@/lib/store/useTradingStore';

export default function MarketsPage() {
  const { setActiveSymbol, activeExchange, setActiveExchange } = useTradingStore();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'gainers' | 'losers'>('all');

  const filteredPairs = POPULAR_PAIRS.filter((p) => {
    const matchesSearch = p.symbol.toLowerCase().includes(search.toLowerCase()) ||
      p.base.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === 'gainers') return p.change > 0;
    if (filter === 'losers') return p.change < 0;
    return true;
  });

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 select-none space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="h-6 w-6 text-emerald-500" />
            Markets Overview
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time cross-exchange market prices and 24h volume tracking.
          </p>
        </div>

        {/* Exchange Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {SUPPORTED_EXCHANGES.map((ex) => (
            <button
              key={ex.id}
              onClick={() => setActiveExchange(ex.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap border transition-all ${
                activeExchange === ex.id
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'border-slate-200 dark:border-[#1f293d] bg-white dark:bg-[#121722] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {ex.name}
            </button>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1f293d] shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search coin or pair (e.g. BTC)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-[#1f293d] rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-center">
          {(['all', 'gainers', 'losers'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                filter === tab
                  ? 'bg-slate-200 dark:bg-[#1f293d] text-emerald-600 dark:text-emerald-400'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Markets Table */}
      <div className="rounded-xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1f293d] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="text-slate-400 bg-slate-50/50 dark:bg-[#0b0e14]/50 border-b border-slate-100 dark:border-[#182030]">
                <th className="py-3.5 px-4 font-semibold">Asset Pair</th>
                <th className="py-3.5 px-4 font-semibold">Active Exchange</th>
                <th className="py-3.5 px-4 font-semibold">Last Price</th>
                <th className="py-3.5 px-4 font-semibold">24h Change</th>
                <th className="py-3.5 px-4 font-semibold">24h High</th>
                <th className="py-3.5 px-4 font-semibold">24h Low</th>
                <th className="py-3.5 px-4 font-semibold text-right">Trade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/60 dark:divide-slate-800/60">
              {filteredPairs.map((pair) => {
                const isPositive = pair.change >= 0;
                return (
                  <tr key={pair.symbol} className="hover:bg-slate-50 dark:hover:bg-[#182030] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5 font-sans font-bold text-slate-900 dark:text-white">
                        <span className="h-7 w-7 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-xs font-mono font-bold">
                          {pair.base.slice(0, 3)}
                        </span>
                        <div>
                          <span>{pair.symbol}</span>
                          <span className="block text-[10px] text-slate-400 font-normal">{pair.base}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 uppercase font-sans text-slate-500 font-medium">
                      {activeExchange}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white text-sm">
                      ${pair.basePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded font-semibold text-xs ${
                          isPositive
                            ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
                            : 'text-red-600 dark:text-red-400 bg-red-500/10'
                        }`}
                      >
                        {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {isPositive ? `+${pair.change}%` : `${pair.change}%`}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                      ${(pair.basePrice * 1.035).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                      ${(pair.basePrice * 0.97).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-right font-sans">
                      <Link
                        href={`/trade/${pair.symbol.replace('/', '-')}`}
                        onClick={() => setActiveSymbol(pair.symbol)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm transition-all"
                      >
                        <span>Trade</span>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
