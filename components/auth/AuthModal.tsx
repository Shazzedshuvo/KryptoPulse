'use client';

import React, { useState } from 'react';
import { X, Mail, Lock, User, Wallet, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '@/lib/store/useAuthStore';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, authMode, closeAuthModal, openAuthModal, login, signup, connectWallet } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (authMode === 'login') {
      login(email, name);
    } else {
      signup(email, name || 'Trader');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in select-none">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1f293d] shadow-2xl p-6 text-slate-900 dark:text-white">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
              NX
            </div>
            <div>
              <h3 className="font-bold text-sm">
                {authMode === 'login' ? 'Sign In to NexTrade' : 'Create Trader Account'}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Non-custodial trading workspace
              </p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Auth Mode Switcher */}
        <div className="grid grid-cols-2 p-1 rounded-lg bg-slate-100 dark:bg-[#0b0e14] my-4 text-xs font-semibold">
          <button
            type="button"
            onClick={() => openAuthModal('login')}
            className={`py-1.5 rounded-md transition-all ${
              authMode === 'login'
                ? 'bg-white dark:bg-[#182030] text-emerald-500 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => openAuthModal('signup')}
            className={`py-1.5 rounded-md transition-all ${
              authMode === 'signup'
                ? 'bg-white dark:bg-[#182030] text-emerald-500 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {authMode === 'signup' && (
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Trader Name</label>
              <div className="relative flex items-center">
                <User className="absolute left-3 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-[#1f293d] rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 h-3.5 w-3.5 text-slate-400" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-[#1f293d] rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300">Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 h-3.5 w-3.5 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-[#1f293d] rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg font-bold text-xs bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5 transition-all mt-2"
          >
            <span>{authMode === 'login' ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-semibold">
            <span className="bg-white dark:bg-[#121722] px-2 text-slate-400">Or continue with</span>
          </div>
        </div>

        {/* Web3 Wallet & Google Connect */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={connectWallet}
            className="py-2 px-3 rounded-lg border border-slate-200 dark:border-[#1f293d] hover:bg-slate-50 dark:hover:bg-[#182030] text-slate-700 dark:text-slate-300 font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Wallet className="h-3.5 w-3.5 text-indigo-500" />
            <span>Web3 Wallet</span>
          </button>

          <button
            type="button"
            onClick={() => login('trader.google@nextrade.pro', 'Google Trader')}
            className="py-2 px-3 rounded-lg border border-slate-200 dark:border-[#1f293d] hover:bg-slate-50 dark:hover:bg-[#182030] text-slate-700 dark:text-slate-300 font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <span className="font-bold text-red-500">G</span>
            <span>Google Account</span>
          </button>
        </div>

        {/* Non-custodial Note */}
        <div className="mt-4 p-2.5 rounded-lg bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-[#1f293d] text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
          <span>Non-custodial account. Your trading keys remain encrypted.</span>
        </div>
      </div>
    </div>
  );
};
