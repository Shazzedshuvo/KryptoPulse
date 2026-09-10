'use client';

import React from 'react';
import { ArrowUpRight, TrendingUp, ShieldCheck, PieChart, Layers, Wallet } from 'lucide-react';
import { useApiKeyStore } from '@/lib/store/useApiKeyStore';

interface PortfolioSummaryProps {
  totalUsdValue: number;
  unrealizedPnl: number;
  unrealizedPnlPercent: number;
  assetDistribution: { asset: string; percentage: number; color: string }[];
}

export const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({
  totalUsdValue,
  unrealizedPnl,
  unrealizedPnlPercent,
  assetDistribution,
}) => {
  const { connectedExchanges, isPaperTrading } = useApiKeyStore();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
      {/* Total Balance Card */}
      <div className="p-5 rounded-xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1f293d] shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span className="font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Wallet className="h-3.5 w-3.5 text-emerald-500" />
              Aggregate Balance
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Live Fetched
            </span>
          </div>
          <div className="text-3xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
            ${totalUsdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#182030] flex items-center justify-between text-xs">
          <span className="text-slate-500">24h Unrealized P&L:</span>
          <div className="flex items-center gap-1 font-mono font-bold text-emerald-500">
            <ArrowUpRight className="h-3.5 w-3.5" />
            <span>+${unrealizedPnl.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            <span className="text-[11px] font-semibold">({unrealizedPnlPercent >= 0 ? '+' : ''}{unrealizedPnlPercent}%)</span>
          </div>
        </div>
      </div>

      {/* Connected Exchanges Status Card */}
      <div className="p-5 rounded-xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1f293d] shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span className="font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-indigo-500" />
              Connected Exchanges
            </span>
            <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              {connectedExchanges.length} Connected
            </span>
          </div>
          <div className="space-y-2 mt-2">
            {connectedExchanges.map((ex) => (
              <div
                key={ex.id}
                className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-[#0b0e14] border border-slate-100 dark:border-[#182030] text-xs font-mono"
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  <span className="font-sans font-semibold capitalize text-slate-800 dark:text-slate-200">
                    {ex.exchange}
                  </span>
                </div>
                <span className="text-slate-400 text-[11px]">{ex.apiKeyMasked}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#182030] flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Non-Custodial: Funds remain 100% on your exchanges.</span>
        </div>
      </div>

      {/* Asset Allocation Breakdown */}
      <div className="p-5 rounded-xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1f293d] shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
            <span className="font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <PieChart className="h-3.5 w-3.5 text-amber-500" />
              Portfolio Allocation
            </span>
          </div>

          {/* Allocation progress bar */}
          <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-[#0b0e14] flex overflow-hidden mb-3">
            {assetDistribution.map((item) => (
              <div
                key={item.asset}
                style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                title={`${item.asset}: ${item.percentage}%`}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {assetDistribution.map((item) => (
              <div key={item.asset} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="font-medium text-slate-700 dark:text-slate-300">{item.asset}</span>
                </div>
                <span className="text-slate-400">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-[#182030] text-[11px] text-slate-400">
          <span>{isPaperTrading ? 'Paper portfolio simulation' : 'Live balance aggregation'}</span>
        </div>
      </div>
    </div>
  );
};
