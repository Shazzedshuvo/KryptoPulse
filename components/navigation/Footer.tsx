'use client';

import React from 'react';
import { Shield, Radio, CheckCircle2 } from 'lucide-react';
import { useTradingStore } from '@/lib/store/useTradingStore';
import { POPULAR_PAIRS } from '@/lib/ccxt/mockData';

export const Footer: React.FC = () => {
  const { activeExchange, setActiveSymbol } = useTradingStore();

  return (
    <footer className="w-full border-t bg-white dark:bg-[#0b0e14] border-slate-200 dark:border-[#1f293d] text-xs transition-colors duration-200 select-none">
      {/* Ticker tape bar */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#151d2c] px-3 py-1 overflow-x-auto">
        <div className="flex items-center space-x-5 whitespace-nowrap">
          {POPULAR_PAIRS.map((pair) => (
            <button
              key={pair.symbol}
              onClick={() => setActiveSymbol(pair.symbol)}
              className="flex items-center space-x-1.5 hover:opacity-80 transition-opacity"
            >
              <span className="font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                {pair.symbol}
              </span>
              <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                ${pair.basePrice.toLocaleString()}
              </span>
              <span
                className={`font-mono text-[10px] ${
                  pair.change >= 0 ? 'text-emerald-500' : 'text-red-500'
                }`}
              >
                {pair.change >= 0 ? `+${pair.change}%` : `${pair.change}%`}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Security & Disclaimer row */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-3 py-2 text-[11px] text-slate-500 dark:text-slate-400 gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
            <Radio className="h-3 w-3 animate-pulse" />
            <span>CCXT Live Gateway: {activeExchange.toUpperCase()} (12ms)</span>
          </div>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            <CheckCircle2 className="h-3 w-3 text-emerald-500" />
            <span>Zero Withdrawal Scopes Active</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-center sm:text-right">
          <Shield className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <span>
            Non-custodial interface. We never hold funds. All orders route directly to your exchange account.
          </span>
        </div>
      </div>
    </footer>
  );
};
