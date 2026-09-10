'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowDownRight, ExternalLink } from 'lucide-react';
import { AssetBalance } from '@/lib/ccxt/types';
import { useTradingStore } from '@/lib/store/useTradingStore';

interface HoldingsTableProps {
  holdings: AssetBalance[];
}

export const HoldingsTable: React.FC<HoldingsTableProps> = ({ holdings }) => {
  const { setActiveSymbol } = useTradingStore();

  return (
    <div className="rounded-xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1f293d] shadow-sm overflow-hidden select-none">
      <div className="p-4 border-b border-slate-200 dark:border-[#1f293d] flex items-center justify-between">
        <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-200">Asset Balances</h3>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Showing {holdings.length} assets
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="text-slate-400 bg-slate-50/50 dark:bg-[#0b0e14]/50 border-b border-slate-100 dark:border-[#182030]">
              <th className="py-3 px-4 font-semibold">Asset</th>
              <th className="py-3 px-4 font-semibold">Free Balance</th>
              <th className="py-3 px-4 font-semibold">In Orders</th>
              <th className="py-3 px-4 font-semibold">Total</th>
              <th className="py-3 px-4 font-semibold">USD Valuation</th>
              <th className="py-3 px-4 font-semibold">24h Change</th>
              <th className="py-3 px-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/60 dark:divide-slate-800/60">
            {holdings.map((h) => {
              const pairSymbol = h.asset === 'USDT' ? 'BTC/USDT' : `${h.asset}/USDT`;
              const isPositive = (h.change24h || 0) >= 0;

              return (
                <tr key={h.asset} className="hover:bg-slate-50 dark:hover:bg-[#182030] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 font-sans font-bold text-slate-900 dark:text-white">
                      <span className="h-6 w-6 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-[10px] font-mono font-bold">
                        {h.asset.slice(0, 3)}
                      </span>
                      <span>{h.asset}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                    {h.free.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                  </td>
                  <td className="py-3 px-4 text-slate-400">
                    {h.locked.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">
                    {h.total.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    ${h.usdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`flex items-center gap-0.5 font-semibold ${
                        isPositive ? 'text-emerald-500' : 'text-red-500'
                      }`}
                    >
                      {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {isPositive ? `+${(h.change24h || 0).toFixed(2)}%` : `${(h.change24h || 0).toFixed(2)}%`}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-sans">
                    <Link
                      href="/"
                      onClick={() => setActiveSymbol(pairSymbol)}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors"
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
  );
};
