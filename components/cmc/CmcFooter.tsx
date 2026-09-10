'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Twitter, 
  Linkedin, 
  Send, 
  MessageSquare, 
  ShieldCheck, 
  Globe, 
  TrendingUp, 
  ExternalLink,
  Activity
} from 'lucide-react';

export const CmcFooter: React.FC = () => {
  return (
    <footer className="w-full bg-slate-50 dark:bg-[#080a0f] border-t border-slate-200 dark:border-[#1a2233] text-xs text-slate-500 dark:text-slate-400 select-none transition-colors mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {/* Col 1: Brand & Bio */}
          <div className="col-span-1 sm:col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-blue-500/20">
                <Activity className="h-4 w-4 text-white" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black text-slate-900 dark:text-white tracking-tight">
                  KryptoPulse
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  PRO
                </span>
              </div>
            </Link>
            <p className="text-xs leading-relaxed max-w-sm text-slate-500 dark:text-slate-400">
              KryptoPulse delivers institutional-grade cryptocurrency market capitalizations, real-time 7-day sparklines, live order books, and non-custodial direct trading terminals.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] hover:text-emerald-500 transition-colors">
                <Twitter className="h-3.5 w-3.5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] hover:text-cyan-500 transition-colors">
                <Linkedin className="h-3.5 w-3.5" />
              </a>
              <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] hover:text-teal-500 transition-colors">
                <Send className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Products */}
          <div className="space-y-2.5 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">Products</h4>
            <ul className="space-y-2">
              <li><Link href="/converter" className="hover:text-emerald-500">Crypto Converter</Link></li>
              <li><Link href="/trade" className="hover:text-emerald-500">Pro Trading Terminal</Link></li>
              <li><Link href="/watchlist" className="hover:text-emerald-500">Watchlist</Link></li>
              <li><Link href="/portfolio" className="hover:text-emerald-500">Portfolio Tracker</Link></li>
              <li><Link href="/deposit" className="hover:text-emerald-500">Instant Deposit</Link></li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="space-y-2.5 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/exchanges" className="hover:text-emerald-500">Top Exchanges</Link></li>
              <li><Link href="/settings/api-keys" className="hover:text-emerald-500">API Key Vault</Link></li>
              <li><Link href="/profile" className="hover:text-emerald-500">User Dashboard & P&L</Link></li>
              <li><Link href="/admin" className="hover:text-emerald-500">Super Admin Panel</Link></li>
              <li><span className="hover:text-emerald-500 cursor-pointer">Terms of Use</span></li>
            </ul>
          </div>

          {/* Col 4: Community & Support */}
          <div className="space-y-2.5 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">Support</h4>
            <ul className="space-y-2">
              <li><span className="hover:text-emerald-500 cursor-pointer">API Documentation</span></li>
              <li><span className="hover:text-emerald-500 cursor-pointer">Contact Support</span></li>
              <li><span className="hover:text-emerald-500 cursor-pointer">FAQ & Help Center</span></li>
              <li><span className="hover:text-emerald-500 cursor-pointer">Glossary</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 border-t border-slate-200 dark:border-[#1a2233] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <div>
            © 2026 KryptoPulse Platform. All rights reserved. Non-custodial multi-exchange intelligence.
          </div>
          <div className="flex items-center gap-1.5 text-emerald-500 font-semibold">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Zero Fund Custody • Direct CCXT Relay</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
