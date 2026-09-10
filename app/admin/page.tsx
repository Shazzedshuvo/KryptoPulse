'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Users, Activity, Lock, ArrowLeft, Crown } from 'lucide-react';
import { AdminStatsCards } from '@/components/admin/AdminStatsCards';
import { UserManagementTable } from '@/components/admin/UserManagementTable';
import { GatewayControls } from '@/components/admin/GatewayControls';
import { AuditLogs } from '@/components/admin/AuditLogs';

export default function SuperAdminPage() {
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-6 select-none space-y-6">
      {/* Super Admin Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Crown className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Super Admin Control Center
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Master control room for user authorization, KYC compliance, gateway health, and platform audit trail.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#182030] transition-colors self-start sm:self-auto"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Return to CoinMarketCap</span>
        </Link>
      </div>

      {/* 1. Master KPIs */}
      <AdminStatsCards />

      {/* 2. User Management Directory */}
      <UserManagementTable />

      {/* 3. CCXT Exchange Gateway Controls */}
      <GatewayControls />

      {/* 4. Security Audit Trail */}
      <AuditLogs />
    </div>
  );
}
