'use client';

import React, { useEffect } from 'react';
import { useTradingStore } from '@/lib/store/useTradingStore';

export const RecentTrades: React.FC = () => {
  const { activeSymbol, activeExchange, recentTrades, setRecentTrades } = useTradingStore();

  useEffect(() => {
    let isMounted = true;

    async function loadTrades() {
      try {
        const res = await fetch(
          `/api/market/trades?exchange=${activeExchange}&symbol=${encodeURIComponent(activeSymbol)}&limit=25`
        );
        const json = await res.json();
        if (isMounted && json.success && Array.isArray(json.data)) {
          setRecentTrades(json.data);
        }
      } catch (err) {
        console.error('Failed to load trades:', err);
      }
    }

    loadTrades();
    const interval = setInterval(loadTrades, 3000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [activeSymbol, activeExchange, setRecentTrades]);

  const quoteCurrency = activeSymbol.split('/')[1] || 'USDT';
  const baseCurrency = activeSymbol.split('/')[0] || 'BTC';

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#121722] border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-[#1f293d] select-none text-xs transition-colors">
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200 dark:border-[#1f293d] bg-slate-50/50 dark:bg-[#10141d]">
        <span className="font-semibold text-slate-800 dark:text-slate-200">Recent Trades</span>
        <span className="text-[10px] text-emerald-500 font-mono flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          Live Feed
        </span>
      </div>

      <div className="grid grid-cols-3 px-3 py-1.5 text-[10px] font-semibold text-slate-400 border-b border-slate-100 dark:border-[#182030]">
        <span>Price ({quoteCurrency})</span>
        <span className="text-right">Size ({baseCurrency})</span>
        <span className="text-right">Time</span>
      </div>

      <div className="flex-1 overflow-y-auto max-h-[380px] lg:max-h-[460px] font-mono text-[11px] divide-y divide-slate-100/40 dark:divide-slate-800/40">
        {recentTrades.map((trade) => {
          const date = new Date(trade.time);
          const timeStr = date.toTimeString().split(' ')[0];
          const isBuy = trade.side === 'buy';

          return (
            <div
              key={trade.id}
              className={`grid grid-cols-3 px-3 py-1 items-center hover:bg-slate-50 dark:hover:bg-[#182030] transition-colors ${
                isBuy ? 'group' : 'group'
              }`}
            >
              <span className={`font-semibold ${isBuy ? 'text-emerald-500' : 'text-red-500'}`}>
                {trade.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <span className="text-right text-slate-700 dark:text-slate-300">
                {trade.amount.toFixed(4)}
              </span>
              <span className="text-right text-slate-400 text-[10px]">
                {timeStr}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
