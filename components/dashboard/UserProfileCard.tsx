'use client';

import React, { useState } from 'react';
import { 
  User, 
  BadgeCheck, 
  ShieldCheck, 
  Wallet, 
  Key, 
  Calendar, 
  Edit3, 
  Lock, 
  CheckCircle2, 
  ShieldAlert,
  Zap
} from 'lucide-react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useTradingStore } from '@/lib/store/useTradingStore';

export const UserProfileCard: React.FC = () => {
  const { user } = useAuthStore();
  const { usdtBalance, cryptoBalance } = useTradingStore();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.name || 'Shazzed Shuvo');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  if (!user) return null;

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] shadow-sm select-none">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left: Avatar & Personal Info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={user.avatar}
              alt={displayName}
              className="h-16 w-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#121722] flex items-center justify-center text-[10px] text-white">
              ✓
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#0b0e14] border border-slate-300 dark:border-slate-700 text-sm font-bold"
                  />
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-2 py-0.5 rounded bg-emerald-500 text-white text-xs font-semibold"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">{displayName}</h2>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1 rounded hover:bg-slate-100 dark:hover:bg-[#182030] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <BadgeCheck className="h-3 w-3" />
                <span>KYC Verified</span>
              </span>

              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                VIP Pro
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <span>UID: <strong className="text-slate-800 dark:text-slate-200">{user.uid}</strong></span>
              <span>•</span>
              <span>Email: <strong className="text-slate-800 dark:text-slate-200">{user.email}</strong></span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Member since {user.joinedDate}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Balance & Security Switcher */}
        <div className="flex flex-wrap items-center gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-[#182030]">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0b0e14] border border-slate-100 dark:border-[#1a2233] text-xs font-mono">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Available Balance</span>
            <span className="text-lg font-black text-emerald-500 block mt-0.5">
              ${usdtBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })} USDT
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0b0e14] border border-slate-100 dark:border-[#1a2233] text-xs font-mono flex flex-col justify-between">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">2FA Security</span>
              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`h-4 w-8 rounded-full transition-colors relative ${
                  twoFactorEnabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`h-3 w-3 rounded-full bg-white absolute top-0.5 transition-transform ${
                    twoFactorEnabled ? 'right-0.5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
            <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 mt-1 flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-emerald-500" />
              {twoFactorEnabled ? 'Protected (App Authenticator)' : 'Disabled'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
