'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  TrendingUp, 
  ShieldCheck, 
  Sun, 
  Moon, 
  ChevronDown, 
  Check, 
  Zap, 
  Key, 
  PieChart, 
  BarChart3,
  Search,
  ExternalLink,
  Layers,
  Wallet,
  Newspaper
} from 'lucide-react';
import { useTradingStore } from '@/lib/store/useTradingStore';
import { useThemeStore } from '@/lib/store/useThemeStore';
import { useApiKeyStore } from '@/lib/store/useApiKeyStore';
import { useDepositStore } from '@/lib/store/useDepositStore';
import { UserProfileDropdown } from '@/components/auth/UserProfileDropdown';
import { AuthModal } from '@/components/auth/AuthModal';
import { DepositModal } from '@/components/deposit/DepositModal';
import { SUPPORTED_EXCHANGES, POPULAR_PAIRS } from '@/lib/ccxt/mockData';
import { SupportedExchange } from '@/lib/ccxt/types';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { theme, toggleTheme, setTheme } = useThemeStore();
  const { activeSymbol, setActiveSymbol, activeExchange, setActiveExchange } = useTradingStore();
  const { isPaperTrading, togglePaperTrading } = useApiKeyStore();
  const { openDepositModal } = useDepositStore();

  const [pairDropdownOpen, setPairDropdownOpen] = useState(false);
  const [exchangeDropdownOpen, setExchangeDropdownOpen] = useState(false);
  const [pairSearch, setPairSearch] = useState('');

  // Sync theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('nextrade-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
    } else {
      setTheme('dark');
    }
  }, [setTheme]);

  const filteredPairs = POPULAR_PAIRS.filter((p) =>
    p.symbol.toLowerCase().includes(pairSearch.toLowerCase())
  );

  const activeExchangeMeta = SUPPORTED_EXCHANGES.find((e) => e.id === activeExchange) || SUPPORTED_EXCHANGES[0];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-white dark:bg-[#0b0e14] border-slate-200 dark:border-[#1f293d] transition-colors duration-200 select-none">
        <div className="flex h-14 items-center justify-between px-3 md:px-4">
          {/* Left: Brand, Pair Selector & Navigation */}
          <div className="flex items-center space-x-3 md:space-x-5">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <TrendingUp className="h-5 w-5 text-white stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black tracking-wider text-slate-900 dark:text-white flex items-center gap-1">
                  NEXTRADE
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    PRO
                  </span>
                </span>
              </div>
            </Link>

            {/* Pair Selector Dropdown (Shown on terminal or anytime) */}
            <div className="relative">
              <button
                onClick={() => {
                  setPairDropdownOpen(!pairDropdownOpen);
                  setExchangeDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-[#182030] text-slate-800 dark:text-slate-100 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              >
                <span className="font-mono font-bold text-xs sm:text-sm">{activeSymbol}</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>

              {pairDropdownOpen && (
                <div className="absolute left-0 mt-1 w-64 rounded-lg bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1f293d] shadow-xl p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="relative mb-2">
                    <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search market..."
                      value={pairSearch}
                      onChange={(e) => setPairSearch(e.target.value)}
                      className="w-full pl-8 pr-2 py-1.5 text-xs bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="max-h-56 overflow-y-auto space-y-0.5">
                    {filteredPairs.map((pair) => (
                      <button
                        key={pair.symbol}
                        onClick={() => {
                          setActiveSymbol(pair.symbol);
                          setPairDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-xs transition-colors ${
                          activeSymbol === pair.symbol
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold'
                            : 'hover:bg-slate-100 dark:hover:bg-[#182030] text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span className="font-mono">{pair.symbol}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-slate-500 dark:text-slate-400">${pair.basePrice.toLocaleString()}</span>
                          <span className={`font-mono text-[11px] ${pair.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                            {pair.change >= 0 ? `+${pair.change}%` : `${pair.change}%`}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              <Link
                href="/"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  pathname === '/'
                    ? 'bg-slate-100 dark:bg-[#182030] text-emerald-600 dark:text-emerald-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Home
              </Link>
              <Link
                href="/trade"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  pathname.startsWith('/trade')
                    ? 'bg-slate-100 dark:bg-[#182030] text-emerald-600 dark:text-emerald-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <BarChart3 className="h-3.5 w-3.5" />
                Terminal
              </Link>
              <Link
                href="/markets"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  pathname === '/markets'
                    ? 'bg-slate-100 dark:bg-[#182030] text-emerald-600 dark:text-emerald-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                Markets
              </Link>
              <Link
                href="/#news"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
              >
                <Newspaper className="h-3.5 w-3.5" />
                News & Feeds
              </Link>
              <Link
                href="/portfolio"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  pathname === '/portfolio'
                    ? 'bg-slate-100 dark:bg-[#182030] text-emerald-600 dark:text-emerald-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <PieChart className="h-3.5 w-3.5" />
                Portfolio
              </Link>
              <Link
                href="/settings/api-keys"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  pathname.startsWith('/settings')
                    ? 'bg-slate-100 dark:bg-[#182030] text-emerald-600 dark:text-emerald-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Key className="h-3.5 w-3.5" />
                Keys
              </Link>
            </nav>
          </div>

          {/* Right: Exchange Selector + Deposit + Auth + Theme */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Exchange Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setExchangeDropdownOpen(!exchangeDropdownOpen);
                  setPairDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-slate-100 dark:bg-[#121722] hover:bg-slate-200 dark:hover:bg-[#182030] border border-slate-200 dark:border-[#1f293d] text-xs font-medium transition-colors"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-slate-800 dark:text-slate-200 font-semibold">{activeExchangeMeta.name}</span>
                <ChevronDown className="h-3 w-3 text-slate-400" />
              </button>

              {exchangeDropdownOpen && (
                <div className="absolute right-0 mt-1 w-52 rounded-lg bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1f293d] shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-2 py-1 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                    Routing Exchange
                  </div>
                  {SUPPORTED_EXCHANGES.map((ex) => (
                    <button
                      key={ex.id}
                      onClick={() => {
                        setActiveExchange(ex.id);
                        setExchangeDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-xs transition-colors ${
                        activeExchange === ex.id
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold'
                          : 'hover:bg-slate-100 dark:hover:bg-[#182030] text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="font-medium">{ex.name}</span>
                      {activeExchange === ex.id && <Check className="h-3.5 w-3.5 text-emerald-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Deposit Button */}
            <button
              type="button"
              onClick={() => openDepositModal('USDT')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm transition-all"
            >
              <Wallet className="h-3.5 w-3.5" />
              <span>Deposit</span>
            </button>

            {/* Paper Trading Mode Toggle */}
            <button
              onClick={() => togglePaperTrading()}
              className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold border transition-all ${
                isPaperTrading
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
              }`}
              title="Toggle Paper Trading / Live API"
            >
              <Zap className="h-3.5 w-3.5" />
              <span>{isPaperTrading ? 'Demo' : 'Live'}</span>
            </button>

            {/* Dark / Light Theme Toggle ("drak and wite") */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark and Light theme"
              className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-[#182030] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#1f293d] transition-colors"
              title={`Switch to ${theme === 'dark' ? 'White / Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-indigo-500" />
              )}
            </button>

            {/* User Profile / Account Dropdown */}
            <UserProfileDropdown />
          </div>
        </div>
      </header>

      {/* Global Modals */}
      <AuthModal />
      <DepositModal />
    </>
  );
};
