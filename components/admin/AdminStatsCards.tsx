'use client';

import React from 'react';
import { Users, BarChart3, Key, ShieldCheck, ArrowUpRight, Activity } from 'lucide-react';
import { useAdminStore } from '@/lib/store/useAdminStore';

export const AdminStatsCards: React.FC = () => {
  const { totalUsers, totalVolume24h, activeExchangeKeys, gatewayHealthScore } = useAdminStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 select-none">
      <div className="p-5 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] shadow-sm">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span className="font-bold uppercase tracking-wider text-[10px]">Registered Users</span>
          <Users className="h-4 w-4 text-blue-500" />
        </div>
        <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
          {totalUsers.toLocaleString()}
        </div>
        <span className="text-[11px] text-emerald-500 font-semibold flex items-center mt-2">
          <ArrowUpRight className="h-3 w-3" /> +14.2% this week
        </span>
      </div>

      <div className="p-5 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] shadow-sm">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span className="font-bold uppercase tracking-wider text-[10px]">24h Processed Volume</span>
          <BarChart3 className="h-4 w-4 text-emerald-500" />
        </div>
        <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
          ${(totalVolume24h / 1e6).toFixed(2)}M
        </div>
        <span className="text-[11px] text-slate-400 font-mono mt-2 block">
          Non-custodial direct relay
        </span>
      </div>

      <div className="p-5 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] shadow-sm">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span className="font-bold uppercase tracking-wider text-[10px]">Active Exchange Keys</span>
          <Key className="h-4 w-4 text-amber-500" />
        </div>
        <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
          {activeExchangeKeys.toLocaleString()}
        </div>
        <span className="text-[11px] text-emerald-500 font-semibold mt-2 block">
          AES-256 Encrypted at rest
        </span>
      </div>

      <div className="p-5 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] shadow-sm">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span className="font-bold uppercase tracking-wider text-[10px]">Gateway Health Uptime</span>
          <Activity className="h-4 w-4 text-purple-500" />
        </div>
        <div className="text-2xl font-black font-mono text-emerald-500">
          {gatewayHealthScore}%
        </div>
        <span className="text-[11px] text-slate-400 font-mono mt-2 block">
          Avg. latency: 16ms
        </span>
      </div>
    </div>
  );
};
