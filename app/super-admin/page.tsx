'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Lock, 
  Crown, 
  Users, 
  ArrowLeft, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Clock, 
  TrendingUp, 
  Trophy, 
  Search, 
  Plus, 
  Minus, 
  Edit3, 
  LogOut, 
  Eye, 
  EyeOff, 
  Activity, 
  Radio, 
  Copy, 
  Check, 
  Layers, 
  Wallet,
  Zap
} from 'lucide-react';
import { useAdminStore, SUPERADMIN_CREDENTIALS, AdminUser, AdminTransaction, AdminUserTrade, LeaderboardTrader } from '@/lib/store/useAdminStore';

export default function SuperAdminPortalPage() {
  const {
    isSuperAdminAuthenticated,
    superAdminUser,
    loginSuperAdmin,
    logoutSuperAdmin,
    users,
    adjustUserBalance,
    creditUserBalance,
    debitUserBalance,
    toggleKyc,
    toggleUserStatus,
    transactions,
    approveTransaction,
    rejectTransaction,
    userTrades,
    closeUserTrade,
    leaderboard,
    auditLogs
  } = useAdminStore();

  // Login form state
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Admin Dashboard Tabs
  const [activeTab, setActiveTab] = useState<'users' | 'transactions' | 'trades' | 'leaderboard' | 'logs'>('users');
  
  // Search & Filter States
  const [userSearch, setUserSearch] = useState('');
  const [txFilter, setTxFilter] = useState<'all' | 'pending' | 'deposit' | 'withdrawal'>('all');
  const [tradeFilter, setTradeFilter] = useState<'all' | 'open' | 'closed'>('all');

  // Balance Adjustment Modal State
  const [balanceModalUser, setBalanceModalUser] = useState<AdminUser | null>(null);
  const [balanceInput, setBalanceInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = loginSuperAdmin(usernameInput, passwordInput);
    if (!success) {
      setLoginError('Invalid Super Admin credentials. Unauthorized access is logged.');
    }
  };

  const handleBalanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!balanceModalUser) return;
    const num = parseFloat(balanceInput);
    if (isNaN(num) || num < 0) return;
    adjustUserBalance(balanceModalUser.id, num);
    setBalanceModalUser(null);
    setBalanceInput('');
  };

  // -------------------------------------------------------------
  // VIEW 1: RESTRICTED LOGIN SCREEN (If not authenticated)
  // -------------------------------------------------------------
  if (!isSuperAdminAuthenticated) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#07090e] text-white select-none relative overflow-hidden">
        {/* Background Cyber Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md p-8 rounded-3xl bg-[#0f141f]/90 border border-purple-500/30 shadow-2xl backdrop-blur-xl relative z-10 space-y-6">
          {/* Top Shield Header */}
          <div className="text-center space-y-2">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-xl shadow-purple-500/25">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-[10px] font-mono font-bold tracking-wider uppercase mt-2">
              CONFIDENTIAL • ROOT ACCESS
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white mt-1">
              Super Admin Control Portal
            </h1>
            <p className="text-xs text-slate-400">
              Only designated platform super administrator has authorization to access this terminal.
            </p>
          </div>

          {/* Quick Helper Chip for Owner */}
          <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300 font-mono space-y-1">
            <div className="flex items-center justify-between text-[11px] font-bold text-purple-200">
              <span>Super Admin Credentials:</span>
              <span className="text-[10px] bg-purple-500/20 px-1.5 py-0.5 rounded">Pre-configured</span>
            </div>
            <div className="flex items-center justify-between">
              <span>User: <strong className="text-white">superadmin</strong></span>
              <span>Pass: <strong className="text-white">kryptopulse2026</strong></span>
            </div>
          </div>

          {/* Error Message */}
          {loginError && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2 font-medium">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5 font-mono">
                Administrator Username
              </label>
              <input
                type="text"
                autoFocus
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Enter superadmin"
                className="w-full px-4 py-2.5 rounded-xl bg-[#161c28] border border-slate-700 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors font-mono"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5 font-mono">
                Master Security Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#161c28] border border-slate-700 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors font-mono pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
            >
              <Lock className="h-4 w-4" />
              <span>Authorize & Enter Terminal</span>
            </button>
          </form>

          {/* Return link */}
          <div className="text-center pt-2">
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors inline-flex items-center gap-1 font-semibold"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Public Market</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: AUTHENTICATED SUPER ADMIN CONTROL ROOM
  // -------------------------------------------------------------
  const pendingTxCount = transactions.filter((t) => t.status === 'pending').length;
  const openTradesCount = userTrades.filter((t) => t.status === 'open').length;

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.uid.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredTxs = transactions.filter((tx) => {
    if (txFilter === 'pending') return tx.status === 'pending';
    if (txFilter === 'deposit') return tx.type === 'deposit';
    if (txFilter === 'withdrawal') return tx.type === 'withdrawal';
    return true;
  });

  const filteredTrades = userTrades.filter((t) => {
    if (tradeFilter === 'open') return t.status === 'open';
    if (tradeFilter === 'closed') return t.status === 'closed';
    return true;
  });

  return (
    <div className="min-h-screen w-full bg-[#080b11] text-slate-200 select-none pb-16 font-sans">
      {/* Top Super Admin Header */}
      <header className="sticky top-0 z-40 bg-[#0f141f]/95 border-b border-purple-500/20 backdrop-blur-md px-4 md:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white font-black shadow-md shadow-purple-500/20">
              <Crown className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-white text-base tracking-tight">
                  KryptoPulse Super Admin
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  ROOT PRIVILEGES
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono flex items-center gap-2">
                <span>Admin: <strong className="text-slate-200">superadmin</strong></span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                  Active Session
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 rounded-xl bg-[#161c28] border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition-colors inline-flex items-center gap-1.5"
            >
              <span>View Live Market</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>

            <button
              onClick={logoutSuperAdmin}
              className="px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-bold text-red-400 hover:bg-red-500/20 transition-colors inline-flex items-center gap-1.5"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Exit Admin</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6">
        {/* KPI Quick Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#0f141f] border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium block">Total Registered Traders</span>
            <div className="text-2xl font-black font-mono text-white mt-1">{users.length} Active</div>
            <span className="text-[10px] text-emerald-400 font-mono mt-1 block">Full Balance Control</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0f141f] border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">Pending Requests</span>
              {pendingTxCount > 0 && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse">
                  {pendingTxCount} ACTION REQUIRED
                </span>
              )}
            </div>
            <div className="text-2xl font-black font-mono text-amber-400 mt-1">{pendingTxCount} Pending</div>
            <span className="text-[10px] text-slate-500 font-mono mt-1 block">Deposits & Withdrawals</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0f141f] border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium block">Live Active Positions</span>
            <div className="text-2xl font-black font-mono text-blue-400 mt-1">{openTradesCount} Trades</div>
            <span className="text-[10px] text-blue-400/80 font-mono mt-1 block">Real-time Volume Monitor</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0f141f] border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium block">Top Trader P&L</span>
            <div className="text-2xl font-black font-mono text-emerald-400 mt-1">+$68,420.50</div>
            <span className="text-[10px] text-slate-500 font-mono mt-1 block">Leaderboard Rank #1</span>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-none">
          {[
            { id: 'users', label: 'User Balances & Accounts', icon: Users, badge: users.length },
            { id: 'transactions', label: 'Deposits & Withdrawals', icon: Wallet, badge: pendingTxCount > 0 ? `${pendingTxCount} Pending` : undefined, badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
            { id: 'trades', label: 'Trader Positions & Volume', icon: Activity, badge: `${openTradesCount} Live`, badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
            { id: 'leaderboard', label: 'Trader Leaderboard', icon: Trophy, badge: 'Top 5' },
            { id: 'logs', label: 'Audit Security Log', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20 border border-purple-400/30'
                    : 'bg-[#121722] text-slate-400 hover:text-white hover:bg-[#182030] border border-slate-800'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`px-1.5 py-0.2 rounded text-[10px] font-mono border ${
                      tab.badgeColor || 'bg-white/10 text-white border-white/20'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* TAB 1: USERS & BALANCE CONTROL                            */}
        {/* ========================================================= */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#0f141f] border border-slate-800">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-400" />
                  <span>Trader User Balances & Authorization</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  View, credit, debit, or manually override any user's USDT balance. Toggle KYC & account lock.
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search trader by name, email, UID..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#161c28] border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Users Table */}
            <div className="rounded-2xl bg-[#0f141f] border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 bg-[#141a29] text-slate-400 font-sans font-bold text-[11px]">
                      <th className="py-3 px-4">Trader</th>
                      <th className="py-3 px-4">UID</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">KYC</th>
                      <th className="py-3 px-4 text-right">USDT Balance</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-right font-sans">Balance Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-800/20 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5 font-sans">
                            <img src={u.avatar} alt={u.name} className="h-8 w-8 rounded-full object-cover border border-slate-700" />
                            <div>
                              <div className="font-bold text-white text-xs">{u.name}</div>
                              <div className="text-[10px] text-slate-500 font-mono">{u.email}</div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4 font-mono font-bold text-purple-400">{u.uid}</td>

                        <td className="py-3 px-4 font-sans">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              u.role === 'superadmin'
                                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                : u.role === 'pro'
                                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <button
                            onClick={() => toggleKyc(u.id)}
                            className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold transition-all ${
                              u.kycVerified
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            }`}
                          >
                            {u.kycVerified ? 'Verified ✓' : 'Unverified ✗'}
                          </button>
                        </td>

                        {/* LIVE USER BALANCE */}
                        <td className="py-3 px-4 text-right">
                          <div className="text-sm font-black text-emerald-400">
                            ${u.balanceUsdt.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                          <span className="text-[10px] text-slate-500">USDT Available</span>
                        </td>

                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => toggleUserStatus(u.id)}
                            className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold transition-all ${
                              u.status === 'active'
                                ? 'bg-emerald-500/10 text-emerald-400'
                                : 'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}
                          >
                            {u.status === 'active' ? 'Active' : 'Suspended'}
                          </button>
                        </td>

                        {/* BALANCE ACTIONS */}
                        <td className="py-3 px-4 text-right font-sans">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => creditUserBalance(u.id, 5000)}
                              className="px-2 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold transition-colors inline-flex items-center gap-0.5"
                              title="Quick +$5,000 USDT"
                            >
                              <Plus className="h-3 w-3" />
                              <span>$5k</span>
                            </button>

                            <button
                              onClick={() => debitUserBalance(u.id, 5000)}
                              className="px-2 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[11px] font-bold transition-colors inline-flex items-center gap-0.5"
                              title="Quick -$5,000 USDT"
                            >
                              <Minus className="h-3 w-3" />
                              <span>$5k</span>
                            </button>

                            <button
                              onClick={() => {
                                setBalanceModalUser(u);
                                setBalanceInput(u.balanceUsdt.toString());
                              }}
                              className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-bold transition-colors inline-flex items-center gap-1 shadow-xs"
                            >
                              <Edit3 className="h-3 w-3" />
                              <span>Set</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: DEPOSITS & WITHDRAWALS CONTROL                     */}
        {/* ========================================================= */}
        {activeTab === 'transactions' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#0f141f] border border-slate-800">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-emerald-400" />
                  <span>Trader Deposits & Withdrawals Gateway</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Review incoming crypto deposits and approve or reject user withdrawals. Approved deposits automatically credit the trader's balance.
                </p>
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center gap-1 bg-[#161c28] p-1 rounded-xl border border-slate-800 self-start sm:self-auto text-xs">
                {(['all', 'pending', 'deposit', 'withdrawal'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setTxFilter(f)}
                    className={`px-3 py-1 rounded-lg font-bold capitalize transition-colors ${
                      txFilter === f ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Transactions Table */}
            <div className="rounded-2xl bg-[#0f141f] border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 bg-[#141a29] text-slate-400 font-sans font-bold text-[11px]">
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">Trader</th>
                      <th className="py-3 px-4">Asset & Network</th>
                      <th className="py-3 px-4 text-right">Amount</th>
                      <th className="py-3 px-4">TxHash / Address</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-right font-sans">Super Admin Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredTxs.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-800/20 transition-colors">
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold uppercase ${
                              tx.type === 'deposit'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            }`}
                          >
                            {tx.type}
                          </span>
                        </td>

                        <td className="py-3 px-4 font-sans">
                          <div className="font-bold text-white">{tx.userName}</div>
                          <div className="text-[10px] text-purple-400 font-mono">{tx.userUid}</div>
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-bold text-white">{tx.asset}</div>
                          <div className="text-[10px] text-slate-500 font-sans">{tx.network}</div>
                        </td>

                        <td className="py-3 px-4 text-right font-black text-white text-sm">
                          {tx.amount.toLocaleString()} {tx.asset}
                        </td>

                        <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                          <div className="flex items-center gap-1">
                            <span>{tx.txHash.slice(0, 14)}...</span>
                            <button
                              onClick={() => handleCopy(tx.txHash, tx.id)}
                              className="text-slate-500 hover:text-white"
                            >
                              {copiedId === tx.id ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                            </button>
                          </div>
                          <span className="text-[10px] text-slate-600 block">{tx.createdAt}</span>
                        </td>

                        <td className="py-3 px-4 text-center">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold uppercase ${
                              tx.status === 'approved'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : tx.status === 'rejected'
                                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse'
                            }`}
                          >
                            {tx.status}
                          </span>
                        </td>

                        {/* APPROVE / REJECT ACTIONS */}
                        <td className="py-3 px-4 text-right font-sans">
                          {tx.status === 'pending' ? (
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => approveTransaction(tx.id)}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors inline-flex items-center gap-1 shadow-md shadow-emerald-600/20"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                <span>Approve</span>
                              </button>
                              <button
                                onClick={() => rejectTransaction(tx.id, 'Risk Compliance Flag')}
                                className="px-2.5 py-1 rounded-lg bg-red-600/80 hover:bg-red-600 text-white font-bold text-xs transition-colors inline-flex items-center gap-1"
                              >
                                <XCircle className="h-3.5 w-3.5" />
                                <span>Reject</span>
                              </button>
                            </div>
                          ) : (
                            <span className="text-slate-500 text-[11px] font-mono">Processed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: TRADER POSITIONS & VOLUME MONITOR (k koto trade nibe) */}
        {/* ========================================================= */}
        {activeTab === 'trades' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#0f141f] border border-slate-800">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-400" />
                  <span>Real-Time Trader Positions & Execution Monitor</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  See every active order taken by users: pair, trade size, entry price, floating profit/loss, and admin liquidation controls.
                </p>
              </div>

              {/* Trade Filter */}
              <div className="flex items-center gap-1 bg-[#161c28] p-1 rounded-xl border border-slate-800 self-start sm:self-auto text-xs">
                {(['all', 'open', 'closed'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setTradeFilter(f)}
                    className={`px-3 py-1 rounded-lg font-bold capitalize transition-colors ${
                      tradeFilter === f ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Trades Monitor Table */}
            <div className="rounded-2xl bg-[#0f141f] border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 bg-[#141a29] text-slate-400 font-sans font-bold text-[11px]">
                      <th className="py-3 px-4">Trader Name & UID</th>
                      <th className="py-3 px-4">Pair</th>
                      <th className="py-3 px-4">Side</th>
                      <th className="py-3 px-4 text-right">Size (USDT)</th>
                      <th className="py-3 px-4 text-right">Entry Price</th>
                      <th className="py-3 px-4 text-right">Current Price</th>
                      <th className="py-3 px-4 text-right">Floating PnL</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-right font-sans">Admin Control</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredTrades.map((t) => {
                      const isProfit = t.pnlUsdt >= 0;
                      return (
                        <tr key={t.id} className="hover:bg-slate-800/20 transition-colors">
                          <td className="py-3 px-4 font-sans">
                            <div className="font-bold text-white">{t.userName}</div>
                            <div className="text-[10px] text-purple-400 font-mono">{t.userUid}</div>
                          </td>

                          <td className="py-3 px-4 font-bold text-white">{t.pair}</td>

                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold uppercase ${
                                t.side === 'buy'
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
                              }`}
                            >
                              {t.side === 'buy' ? 'BUY / LONG' : 'SELL / SHORT'}
                            </span>
                          </td>

                          <td className="py-3 px-4 text-right font-bold text-white">
                            ${t.amountUsdt.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            <span className="text-[10px] text-slate-500 block font-normal">
                              {t.cryptoAmount} {t.pair.split('/')[0]}
                            </span>
                          </td>

                          <td className="py-3 px-4 text-right text-slate-300">
                            ${t.entryPrice.toLocaleString()}
                          </td>

                          <td className="py-3 px-4 text-right font-bold text-white">
                            ${t.currentPrice.toLocaleString()}
                          </td>

                          <td className="py-3 px-4 text-right font-bold">
                            <span className={isProfit ? 'text-emerald-400' : 'text-red-400'}>
                              {isProfit ? '+' : ''}${t.pnlUsdt.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </span>
                            <span
                              className={`text-[10px] block ${
                                isProfit ? 'text-emerald-400/80' : 'text-red-400/80'
                              }`}
                            >
                              ({isProfit ? '+' : ''}{t.pnlPercent}%)
                            </span>
                          </td>

                          <td className="py-3 px-4 text-center">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold uppercase ${
                                t.status === 'open'
                                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {t.status}
                            </span>
                          </td>

                          <td className="py-3 px-4 text-right font-sans">
                            {t.status === 'open' ? (
                              <button
                                onClick={() => closeUserTrade(t.id)}
                                className="px-2.5 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 text-[11px] font-bold transition-colors"
                              >
                                Force Close
                              </button>
                            ) : (
                              <span className="text-slate-500 text-[11px] font-mono">Settled</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: TRADER LEADERBOARD (ledarbord dekabe)               */}
        {/* ========================================================= */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-900/30 via-indigo-900/20 to-blue-900/30 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-400" />
                  <span>Platform Trader Leaderboard</span>
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Live rankings of top performing traders based on net realized profits, win rate percentage, and total exchange trading volume.
                </p>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  🥇 #1 Master Whale
                </span>
              </div>
            </div>

            {/* Leaderboard Table */}
            <div className="rounded-2xl bg-[#0f141f] border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 bg-[#141a29] text-slate-400 font-sans font-bold text-[11px]">
                      <th className="py-3.5 px-4 w-12 text-center">Rank</th>
                      <th className="py-3.5 px-4">Trader</th>
                      <th className="py-3.5 px-4">Badge Title</th>
                      <th className="py-3.5 px-4 text-right">Net Profit (P&L)</th>
                      <th className="py-3.5 px-4 text-right">ROI %</th>
                      <th className="py-3.5 px-4 text-right">Win Rate</th>
                      <th className="py-3.5 px-4 text-right">Total Traded Volume</th>
                      <th className="py-3.5 px-4 text-right">Total Trades</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {leaderboard.map((trader) => (
                      <tr
                        key={trader.userId}
                        className={`hover:bg-slate-800/20 transition-colors ${
                          trader.rank === 1
                            ? 'bg-amber-500/5'
                            : trader.rank === 2
                            ? 'bg-slate-400/5'
                            : trader.rank === 3
                            ? 'bg-orange-500/5'
                            : ''
                        }`}
                      >
                        {/* Rank Badge */}
                        <td className="py-3 px-4 text-center">
                          {trader.rank === 1 ? (
                            <span className="h-7 w-7 rounded-full bg-amber-400 text-slate-950 font-black inline-flex items-center justify-center text-xs shadow-md shadow-amber-400/30">
                              1
                            </span>
                          ) : trader.rank === 2 ? (
                            <span className="h-7 w-7 rounded-full bg-slate-300 text-slate-950 font-black inline-flex items-center justify-center text-xs shadow-md">
                              2
                            </span>
                          ) : trader.rank === 3 ? (
                            <span className="h-7 w-7 rounded-full bg-amber-700 text-white font-black inline-flex items-center justify-center text-xs shadow-md">
                              3
                            </span>
                          ) : (
                            <span className="text-slate-500 font-bold text-xs">{trader.rank}</span>
                          )}
                        </td>

                        {/* Trader Profile */}
                        <td className="py-3 px-4 font-sans">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={trader.avatar}
                              alt={trader.name}
                              className="h-8 w-8 rounded-full object-cover border border-slate-700"
                            />
                            <div>
                              <span className="font-bold text-white text-xs">{trader.name}</span>
                              <span className="text-[10px] text-purple-400 font-mono block">{trader.uid}</span>
                            </div>
                          </div>
                        </td>

                        {/* Badge */}
                        <td className="py-3 px-4 font-sans">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            {trader.badge}
                          </span>
                        </td>

                        {/* Profit */}
                        <td className="py-3 px-4 text-right font-black text-emerald-400 text-sm">
                          +${trader.totalPnlUsdt.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>

                        {/* ROI % */}
                        <td className="py-3 px-4 text-right font-bold text-emerald-400">
                          +{trader.pnlRoiPercent}%
                        </td>

                        {/* Win Rate */}
                        <td className="py-3 px-4 text-right font-bold text-blue-400">
                          {trader.winRatePercent}%
                        </td>

                        {/* Traded Volume */}
                        <td className="py-3 px-4 text-right text-slate-300">
                          ${(trader.totalVolumeUsd / 1e6).toFixed(2)}M
                        </td>

                        {/* Total Trades */}
                        <td className="py-3 px-4 text-right text-slate-400">
                          {trader.totalTrades}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: AUDIT LOGS                                         */}
        {/* ========================================================= */}
        {activeTab === 'logs' && (
          <div className="rounded-2xl bg-[#0f141f] border border-slate-800 p-5 space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-purple-400" />
              <span>Immutable Super Admin Audit Trail</span>
            </h3>
            <div className="space-y-2">
              {auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-xl bg-[#141a28] border border-slate-800 flex items-center justify-between gap-3 text-xs font-mono"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        log.status === 'success'
                          ? 'bg-emerald-500'
                          : log.status === 'warning'
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                      }`}
                    />
                    <div>
                      <span className="text-white font-sans font-bold">{log.actor}</span>
                      <span className="text-slate-400 text-[11px] block">{log.action}</span>
                    </div>
                  </div>
                  <div className="text-right text-slate-500 text-[11px]">
                    <div>{log.ip}</div>
                    <div>{log.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ========================================================= */}
      {/* MODAL: MANUAL BALANCE OVERRIDE                            */}
      {/* ========================================================= */}
      {balanceModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in select-none">
          <div className="w-full max-w-md p-6 rounded-2xl bg-[#0f141f] border border-purple-500/40 shadow-2xl space-y-4 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 font-bold text-sm">
                <DollarSign className="h-4 w-4 text-emerald-400" />
                <span>Adjust Balance: {balanceModalUser.name}</span>
              </div>
              <button
                onClick={() => setBalanceModalUser(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-xl bg-[#161c28] border border-slate-800 text-xs font-mono space-y-1">
              <div className="text-slate-400">UID: <strong className="text-purple-400">{balanceModalUser.uid}</strong></div>
              <div className="text-slate-400">Current Balance: <strong className="text-emerald-400">${balanceModalUser.balanceUsdt.toLocaleString()} USDT</strong></div>
            </div>

            <form onSubmit={handleBalanceSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold uppercase text-slate-400 block mb-1 font-mono">
                  Set Exact New USDT Balance
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500 font-mono font-bold">$</span>
                  <input
                    type="number"
                    step="any"
                    required
                    value={balanceInput}
                    onChange={(e) => setBalanceInput(e.target.value)}
                    placeholder="Enter amount in USDT"
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-[#161c28] border border-slate-700 text-sm font-mono text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setBalanceModalUser(null)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-purple-600/25 transition-all"
                >
                  Save & Update Balance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
