'use client';

import React from 'react';
import { 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  Award, 
  AlertTriangle, 
  BarChart, 
  Percent 
} from 'lucide-react';
import { usePnlStore } from '@/lib/store/usePnlStore';

export const PnlMetricCards: React.FC = () => {
  const { netProfit, winRate, totalTrades, profitableTrades, lossTrades, bestTrade, worstTrade } = usePnlStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 select-none">
      {/* 1. Net Profit Card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-bold uppercase tracking-wider text-[10px]">Net Realized Profit</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
          </div>
          <div className="text-2xl font-black font-mono text-emerald-500">
            +${netProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-[#182030] text-[11px] text-slate-500 font-mono">
          Across {totalTrades} closed executions
        </div>
      </div>

      {/* 2. Win Rate Card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-bold uppercase tracking-wider text-[10px]">Win Rate</span>
            <Percent className="h-3.5 w-3.5 text-blue-500" />
          </div>
          <div className="text-2xl font-black font-mono text-blue-600 dark:text-blue-400">
            {winRate}%
          </div>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-[#182030] text-[11px] flex items-center justify-between font-mono">
          <span className="text-emerald-500 font-bold">{profitableTrades} Wins</span>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <span className="text-red-500 font-bold">{lossTrades} Losses</span>
        </div>
      </div>

      {/* 3. Best Trade */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-bold uppercase tracking-wider text-[10px]">Best Trade</span>
            <Award className="h-3.5 w-3.5 text-amber-500" />
          </div>
          <div className="text-2xl font-black font-mono text-emerald-500">
            +${bestTrade.profit.toLocaleString()}
          </div>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-[#182030] text-[11px] flex items-center justify-between font-mono">
          <span className="font-bold text-slate-800 dark:text-slate-200">{bestTrade.pair}</span>
          <span className="text-emerald-500 font-semibold">+{bestTrade.percent}%</span>
        </div>
      </div>

      {/* 4. Worst Trade */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-bold uppercase tracking-wider text-[10px]">Max Drawdown Trade</span>
            <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
          </div>
          <div className="text-2xl font-black font-mono text-red-500">
            -${Math.abs(worstTrade.loss).toLocaleString()}
          </div>
        </div>
        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-[#182030] text-[11px] flex items-center justify-between font-mono">
          <span className="font-bold text-slate-800 dark:text-slate-200">{worstTrade.pair}</span>
          <span className="text-red-500 font-semibold">{worstTrade.percent}%</span>
        </div>
      </div>
    </div>
  );
};
