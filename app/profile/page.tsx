'use client';

import React from 'react';
import Link from 'next/link';
import { UserProfileCard } from '@/components/dashboard/UserProfileCard';
import { PnlMetricCards } from '@/components/dashboard/PnlMetricCards';
import { PnlChart } from '@/components/dashboard/PnlChart';
import { UserHistoryTabs } from '@/components/dashboard/UserHistoryTabs';
import { ArrowLeft, BarChart3, ShieldCheck } from 'lucide-react';

export default function UserProfileDashboardPage() {
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-6 select-none space-y-6">
      {/* Header breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></span>
            User Profile & Trading Performance
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time analytics on your trade executions, win-rate, and cumulative profit/loss curve.
          </p>
        </div>

        <Link
          href="/trade"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#3861fb] hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all self-start sm:self-auto"
        >
          <BarChart3 className="h-3.5 w-3.5" />
          <span>Launch Pro Terminal</span>
        </Link>
      </div>

      {/* 1. Profile Overview Card */}
      <UserProfileCard />

      {/* 2. Key P&L Metric Cards (Net Profit, Win Rate, Best/Worst) */}
      <PnlMetricCards />

      {/* 3. Interactive Cumulative P&L Graph + Daily Distribution Bars */}
      <PnlChart />

      {/* 4. Complete Execution & Orders History */}
      <UserHistoryTabs />
    </div>
  );
}
