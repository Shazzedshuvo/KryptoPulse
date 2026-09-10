'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  User, 
  ChevronDown, 
  LogOut, 
  ShieldCheck, 
  Wallet, 
  Key, 
  BadgeCheck, 
  UserPlus, 
  LogIn,
  Crown,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useTradingStore } from '@/lib/store/useTradingStore';

export const UserProfileDropdown: React.FC = () => {
  const { user, isLoggedIn, logout, openAuthModal } = useAuthStore();
  const { usdtBalance } = useTradingStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isLoggedIn || !user) {
    return (
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => openAuthModal('login')}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#182030] transition-colors"
        >
          <LogIn className="h-3.5 w-3.5" />
          <span>Log In</span>
        </button>
        <button
          onClick={() => openAuthModal('signup')}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#3861fb] hover:bg-blue-700 text-white shadow-sm transition-all"
        >
          <UserPlus className="h-3.5 w-3.5" />
          <span>Sign Up</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-[#182030] border border-transparent hover:border-slate-200 dark:hover:border-[#1f293d] transition-colors"
      >
        <img
          src={user.avatar}
          alt={user.name}
          className="h-7 w-7 rounded-full object-cover border border-emerald-500/40"
        />
        <div className="hidden md:flex flex-col text-left">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
            {user.name}
          </span>
          <span className="text-[10px] text-emerald-500 font-mono font-medium">
            {user.uid}
          </span>
        </div>
        <ChevronDown className="h-3 w-3 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1f293d] shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 text-xs select-none">
          {/* User Info Header */}
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#0b0e14] border border-slate-100 dark:border-[#182030] mb-2 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white">{user.name}</span>
              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <BadgeCheck className="h-3 w-3" />
                <span>Verified</span>
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">{user.email}</div>
            <div className="pt-1 flex items-center justify-between text-[11px] border-t border-slate-200/60 dark:border-slate-800/60 font-mono">
              <span className="text-slate-500">Available USDT:</span>
              <span className="font-bold text-emerald-500">${usdtBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-0.5">
            {/* My Profile & PnL Analytics Dashboard */}
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold transition-colors"
            >
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Profile & P&L Analytics</span>
            </Link>

            <Link
              href="/deposit"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#182030] text-slate-700 dark:text-slate-300 transition-colors font-medium"
            >
              <Wallet className="h-3.5 w-3.5 text-emerald-500" />
              <span>Deposit Funds</span>
            </Link>

            <Link
              href="/settings/api-keys"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#182030] text-slate-700 dark:text-slate-300 transition-colors font-medium"
            >
              <Key className="h-3.5 w-3.5 text-indigo-500" />
              <span>Exchange API Keys</span>
            </Link>

            <Link
              href="/portfolio"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#182030] text-slate-700 dark:text-slate-300 transition-colors font-medium"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-500" />
              <span>Portfolio & Balances</span>
            </Link>
          </div>

          {/* Logout Button */}
          <div className="pt-2 mt-2 border-t border-slate-100 dark:border-[#182030]">
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors font-semibold"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
