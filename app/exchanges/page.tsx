'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, Star, ExternalLink, ShieldCheck, ChevronRight, Key } from 'lucide-react';
import { CMC_EXCHANGES } from '@/lib/cmc/exchangesData';

export default function ExchangesPage() {
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-6 select-none space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Building2 className="h-6 w-6 text-[#3861fb]" />
          Top Cryptocurrency Spot Exchanges
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          CoinMarketCap ranks and scores exchanges based on traffic, liquidity, trading volumes, and confidence in the legitimacy of trading volumes reported.
        </p>
      </div>

      {/* Exchanges Table */}
      <div className="w-full rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-[#1a2233] bg-slate-50/70 dark:bg-[#0b0e14]/50 text-slate-500 dark:text-slate-400 text-[11px] font-sans font-bold">
                <th className="py-3 px-3 w-10 text-center">#</th>
                <th className="py-3 px-3">Exchange</th>
                <th className="py-3 px-3 text-center">Score</th>
                <th className="py-3 px-3 text-right">Trading Volume (24h)</th>
                <th className="py-3 px-3 text-right">Avg. Liquidity</th>
                <th className="py-3 px-3 text-right">Weekly Visits</th>
                <th className="py-3 px-3 text-right">Markets</th>
                <th className="py-3 px-3 text-right">Coins</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#182030] font-mono text-xs">
              {CMC_EXCHANGES.map((ex) => (
                <tr key={ex.id} className="hover:bg-slate-50 dark:hover:bg-[#182030] transition-colors">
                  <td className="py-3 px-3 text-center text-slate-400 font-bold">
                    {ex.rank}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5 font-sans font-bold text-slate-900 dark:text-white">
                      <img src={ex.logo} alt={ex.name} className="h-6 w-6 rounded-full shrink-0" />
                      <span>{ex.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-block px-2 py-0.5 rounded-md font-bold text-xs bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      {ex.score}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-slate-900 dark:text-white">
                    ${(ex.volume24hUsd / 1e9).toFixed(2)}B
                  </td>
                  <td className="py-3 px-3 text-right text-slate-700 dark:text-slate-300">
                    {ex.avgLiquidity}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-700 dark:text-slate-300">
                    {ex.weeklyVisits}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-700 dark:text-slate-300">
                    {ex.marketsCount}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-700 dark:text-slate-300">
                    {ex.coinsCount}
                  </td>
                  <td className="py-3 px-3 text-right font-sans">
                    <Link
                      href="/settings/api-keys"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-[#3861fb]/10 hover:bg-[#3861fb]/20 text-[#3861fb] border border-[#3861fb]/20 transition-all"
                    >
                      <Key className="h-3 w-3" />
                      <span>Connect API</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
