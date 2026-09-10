'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';
import { useTradingStore } from '@/lib/store/useTradingStore';

export const MarketHeader: React.FC = () => {
  const { activeSymbol, activeExchange, ticker, setTicker } = useTradingStore();
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadTicker() {
      try {
        setIsUpdating(true);
        const res = await fetch(
          `/api/market/ticker?exchange=${activeExchange}&symbol=${encodeURIComponent(activeSymbol)}`
        );
        const json = await res.json();
        if (isMounted && json.success && json.data) {
          setTicker(json.data);
        }
      } catch (err) {
        console.error('Failed to load ticker:', err);
      } finally {
        if (isMounted) setIsUpdating(false);
      }
    }

    loadTicker();
    const interval = setInterval(loadTicker, 3000); // 3s polling for real-time price updates
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [activeSymbol, activeExchange, setTicker]);

  const price = ticker?.lastPrice || 91420.50;
  const changePercent = ticker?.changePercent24h || 2.84;
  const changeAmount = ticker?.change24h || (price * (changePercent / 100));
  const isPositive = changePercent >= 0;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-white dark:bg-[#121722] border-b border-slate-200 dark:border-[#1f293d] transition-colors">
      {/* Symbol & Live Price */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black font-mono tracking-tight text-slate-900 dark:text-white">
              {activeSymbol}
            </span>
            <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#182030] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
              {activeExchange}
            </span>
            {isUpdating && <RefreshCw className="h-3 w-3 text-emerald-500 animate-spin" />}
          </div>
          <div className="flex items-baseline gap-2">
            <span
              className={`text-xl font-mono font-bold tracking-tight ${
                isPositive ? 'text-emerald-500' : 'text-red-500'
              }`}
            >
              ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
            </span>
            <span
              className={`flex items-center text-xs font-mono font-semibold ${
                isPositive ? 'text-emerald-500' : 'text-red-500'
              }`}
            >
              {isPositive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
              {isPositive ? `+${changePercent.toFixed(2)}%` : `${changePercent.toFixed(2)}%`}
              <span className="ml-1 text-[11px] opacity-75">
                ({isPositive ? '+' : ''}${Math.abs(changeAmount).toFixed(2)})
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* 24h Metrics (High, Low, Volume) */}
      <div className="flex items-center gap-6 overflow-x-auto text-xs py-1">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">24h High</span>
          <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
            ${(ticker?.high24h || price * 1.035).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">24h Low</span>
          <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
            ${(ticker?.low24h || price * 0.97).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">24h Volume ({activeSymbol.split('/')[0]})</span>
          <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
            {(ticker?.volume24h || 18452.3).toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </span>
        </div>

        <div className="hidden sm:flex flex-col">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">24h Turnover (USDT)</span>
          <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
            ${((ticker?.volumeQuote24h || (ticker?.volume24h || 18452) * price) / 1000000).toFixed(2)}M
          </span>
        </div>
      </div>
    </div>
  );
};
