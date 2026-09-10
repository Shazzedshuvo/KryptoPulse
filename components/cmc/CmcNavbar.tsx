'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Search, 
  Star, 
  PieChart, 
  Coins, 
  Repeat, 
  BarChart3, 
  Sun, 
  Moon, 
  ChevronDown, 
  Wallet,
  Building2,
  X,
  Zap,
  ShieldCheck,
  TrendingUp,
  Activity,
  Menu
} from 'lucide-react';
import { useCmcStore } from '@/lib/store/useCmcStore';
import { useThemeStore } from '@/lib/store/useThemeStore';
import { useDepositStore } from '@/lib/store/useDepositStore';
import { UserProfileDropdown } from '@/components/auth/UserProfileDropdown';
import { AuthModal } from '@/components/auth/AuthModal';
import { DepositModal } from '@/components/deposit/DepositModal';
import { CMC_TOP_COINS } from '@/lib/cmc/coinsData';

export const CmcNavbar: React.FC = () => {
  const pathname = usePathname();
  const { watchlist, currency, setCurrency, setSelectedCoin } = useCmcStore();
  const { theme, toggleTheme } = useThemeStore();
  const { openDepositModal } = useDepositStore();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredSearchCoins = CMC_TOP_COINS.filter(
    (c) =>
      c.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      c.symbol.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      <nav className="w-full bg-white dark:bg-[#0b0e14] border-b border-slate-200 dark:border-[#1a2233] select-none sticky top-0 z-40 transition-colors">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          {/* Left: KryptoPulse Brand & Menu */}
          <div className="flex items-center gap-6">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
                <Activity className="h-5 w-5 text-white animate-pulse" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                    KryptoPulse
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                    PRO
                  </span>
                </div>
              </div>
            </Link>

            {/* Menu items */}
            <div className="hidden lg:flex items-center space-x-1 text-xs font-semibold">
              <Link
                href="/"
                className={`px-3 py-2 rounded-lg transition-colors ${
                  pathname === '/'
                    ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
              >
                Cryptocurrencies
              </Link>
              <Link
                href="/exchanges"
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  pathname === '/exchanges'
                    ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
              >
                <Building2 className="h-3.5 w-3.5" />
                <span>Exchanges</span>
              </Link>
              <Link
                href="/watchlist"
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  pathname === '/watchlist'
                    ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
              >
                <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400/20" />
                <span>Watchlist ({watchlist.length})</span>
              </Link>
              <Link
                href="/converter"
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  pathname === '/converter'
                    ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
              >
                <Repeat className="h-3.5 w-3.5" />
                <span>Converter</span>
              </Link>
              <Link
                href="/portfolio"
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  pathname === '/portfolio'
                    ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
              >
                <PieChart className="h-3.5 w-3.5" />
                <span>Portfolio</span>
              </Link>
              <Link
                href="/trade"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 transition-all font-bold"
              >
                <BarChart3 className="h-3.5 w-3.5" />
                <span>Pro Terminal</span>
              </Link>
            </div>
          </div>

          {/* Right Tools: Search, Currency, Deposit, Theme, User */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Quick Search Button */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#121722] hover:bg-slate-200 dark:hover:bg-[#1a2233] border border-slate-200 dark:border-[#1a2233] text-xs text-slate-500 dark:text-slate-400 transition-colors"
              >
                <Search className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Search coin...</span>
                <kbd className="hidden md:inline px-1.5 py-0.5 text-[9px] rounded bg-white dark:bg-[#080a0f] border border-slate-200 dark:border-slate-800 font-mono">
                  /
                </kbd>
              </button>
            </div>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#121722] border border-slate-200 dark:border-[#1a2233] text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors"
              >
                <span>{currency}</span>
                <ChevronDown className="h-3 w-3 text-slate-400" />
              </button>

              {currencyOpen && (
                <div className="absolute right-0 mt-1 w-28 rounded-xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] shadow-xl p-1 z-50 animate-in fade-in">
                  {(['USD', 'EUR', 'GBP', 'BDT'] as const).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrency(curr);
                        setCurrencyOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-semibold ${
                        currency === curr
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                          : 'hover:bg-slate-100 dark:hover:bg-[#182030] text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Deposit CTA */}
            <button
              onClick={() => openDepositModal('USDT')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20 transition-all"
            >
              <Wallet className="h-3.5 w-3.5" />
              <span>Deposit</span>
            </button>

            {/* Theme Toggle (Dark & Light) */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#121722] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#1a2233] transition-colors"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-indigo-500" />
              )}
            </button>

            {/* User Profile / Auth */}
            <UserProfileDropdown />

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#121722] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#1a2233] transition-colors"
              aria-label="Open Navigation Menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-sm animate-in fade-in select-none">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] shadow-2xl p-4 text-slate-900 dark:text-white">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="relative flex-1 flex items-center">
                <Search className="absolute left-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search by coin name, symbol or contract..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-transparent text-sm font-medium focus:outline-none"
                />
              </div>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Search Results List */}
            <div className="max-h-72 overflow-y-auto mt-2 space-y-1">
              {filteredSearchCoins.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    setSelectedCoin(c);
                    setSearchOpen(false);
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#1a2233] cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img src={c.logo} alt={c.name} className="h-6 w-6 rounded-full" />
                    <div>
                      <span className="font-bold text-xs">{c.name}</span>
                      <span className="text-[11px] text-slate-400 font-mono ml-1.5">{c.symbol}</span>
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs">
                    <div className="font-bold">${c.price.toLocaleString()}</div>
                    <div className={`text-[10px] ${c.change24h >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                      {c.change24h >= 0 ? `+${c.change24h}%` : `${c.change24h}%`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Global Modals */}
      <AuthModal />
      <DepositModal />

      {/* Mobile Slide-Over Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex select-none animate-in fade-in duration-200">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content (slides in from right) */}
          <div className="relative ml-auto w-full max-w-xs sm:max-w-sm h-full bg-white dark:bg-[#0e131d] border-l border-slate-200 dark:border-[#1f293d] shadow-2xl flex flex-col z-50 p-5 overflow-y-auto">
            {/* Header: Logo & Close */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                  <Activity className="h-4 w-4 text-white animate-pulse" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-slate-900 dark:text-white text-base">
                    KryptoPulse
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    PRO
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1a2233] text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                aria-label="Close Mobile Menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Actions: Search & Deposit */}
            <div className="py-4 space-y-2 border-b border-slate-200 dark:border-slate-800">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-[#151b26] border border-slate-200 dark:border-[#222c3f] text-xs text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-[#1a2333] transition-colors"
              >
                <Search className="h-4 w-4 text-slate-400" />
                <span>Search coins, pairs...</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openDepositModal('USDT');
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20 transition-all"
              >
                <Wallet className="h-4 w-4" />
                <span>Instant Deposit (Crypto / USDT)</span>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 py-4 space-y-1 overflow-y-auto">
              {[
                { href: '/', label: 'Cryptocurrencies', icon: Coins },
                { href: '/exchanges', label: 'Top Exchanges', icon: Building2 },
                { href: '/watchlist', label: `Watchlist (${watchlist.length})`, icon: Star },
                { href: '/converter', label: 'Crypto Converter', icon: Repeat },
                { href: '/portfolio', label: 'Portfolio Tracker', icon: PieChart },
                { href: '/markets', label: 'Markets Directory', icon: TrendingUp },
                { href: '/profile', label: 'User Dashboard & P&L', icon: BarChart3 },
                { href: '/admin', label: 'Super Admin Control', icon: ShieldCheck },
                { href: '/settings/api-keys', label: 'API Key Management', icon: Zap },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/20'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#151b26]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              })}

              {/* Highlighted Pro Terminal Link */}
              <Link
                href="/trade"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-cyan-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 mt-2 transition-all hover:border-emerald-500/50"
              >
                <div className="flex items-center gap-2.5">
                  <BarChart3 className="h-4 w-4" />
                  <span>Pro Trading Terminal</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-mono bg-emerald-500 text-white font-bold">LIVE</span>
              </Link>
            </div>

            {/* Bottom Controls: Currency & Theme */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Currency</span>
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#151b26] p-0.5 rounded-lg border border-slate-200 dark:border-[#222c3f]">
                  {(['USD', 'EUR', 'GBP', 'BDT'] as const).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => setCurrency(curr)}
                      className={`px-2 py-1 rounded text-[11px] font-bold ${
                        currency === curr
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Theme</span>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#151b26] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#222c3f] font-semibold text-xs"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="h-3.5 w-3.5 text-amber-400" />
                      <span>Dark</span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-3.5 w-3.5 text-indigo-500" />
                      <span>Light</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
