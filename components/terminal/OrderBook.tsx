'use client';

import React, { useEffect, useState } from 'react';
import { useTradingStore } from '@/lib/store/useTradingStore';
import { OrderBookData } from '@/lib/ccxt/types';

interface OrderBookProps {
  onSelectPrice?: (price: number) => void;
}

export const OrderBook: React.FC<OrderBookProps> = ({ onSelectPrice }) => {
  const { activeSymbol, activeExchange, orderBook, setOrderBook } = useTradingStore();
  const [viewMode, setViewMode] = useState<'both' | 'bids' | 'asks'>('both');

  useEffect(() => {
    let isMounted = true;

    async function loadOrderBook() {
      try {
        const res = await fetch(
          `/api/market/orderbook?exchange=${activeExchange}&symbol=${encodeURIComponent(activeSymbol)}&limit=15`
        );
        const json = await res.json();
        if (isMounted && json.success && json.data) {
          setOrderBook(json.data);
        }
      } catch (err) {
        console.error('Failed to load order book:', err);
      }
    }

    loadOrderBook();
    const interval = setInterval(loadOrderBook, 2500); // 2.5s update cycle
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [activeSymbol, activeExchange, setOrderBook]);

  const asks = orderBook?.asks || [];
  const bids = orderBook?.bids || [];
  const maxAskTotal = asks.length > 0 ? asks[asks.length - 1]?.total || 1 : 1;
  const maxBidTotal = bids.length > 0 ? bids[bids.length - 1]?.total || 1 : 1;

  const quoteCurrency = activeSymbol.split('/')[1] || 'USDT';
  const baseCurrency = activeSymbol.split('/')[0] || 'BTC';

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#121722] border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-[#1f293d] select-none text-xs transition-colors">
      {/* Header with Mode Filter */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200 dark:border-[#1f293d] bg-slate-50/50 dark:bg-[#10141d]">
        <span className="font-semibold text-slate-800 dark:text-slate-200">Order Book</span>
        
        {/* View toggle */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setViewMode('both')}
            className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
              viewMode === 'both'
                ? 'bg-slate-200 dark:bg-[#1f293d] text-emerald-500 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setViewMode('bids')}
            className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
              viewMode === 'bids'
                ? 'bg-emerald-500/20 text-emerald-500 font-bold'
                : 'text-slate-400 hover:text-emerald-500'
            }`}
          >
            Bids
          </button>
          <button
            onClick={() => setViewMode('asks')}
            className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
              viewMode === 'asks'
                ? 'bg-red-500/20 text-red-500 font-bold'
                : 'text-slate-400 hover:text-red-500'
            }`}
          >
            Asks
          </button>
        </div>
      </div>

      {/* Column Titles */}
      <div className="grid grid-cols-3 px-3 py-1.5 text-[10px] font-semibold text-slate-400 border-b border-slate-100 dark:border-[#182030]">
        <span>Price ({quoteCurrency})</span>
        <span className="text-right">Size ({baseCurrency})</span>
        <span className="text-right">Total</span>
      </div>

      {/* Asks (Sells - Top) */}
      {(viewMode === 'both' || viewMode === 'asks') && (
        <div className="flex flex-col justify-end flex-1 overflow-hidden">
          {asks
            .slice(0, viewMode === 'asks' ? 14 : 7)
            .reverse()
            .map((ask, i) => {
              const depthPct = Math.min(100, Math.round((ask.total / maxAskTotal) * 100));
              return (
                <div
                  key={`ask-${i}-${ask.price}`}
                  onClick={() => onSelectPrice && onSelectPrice(ask.price)}
                  className="relative grid grid-cols-3 px-3 py-0.5 hover:bg-red-500/10 cursor-pointer font-mono text-[11px] group"
                >
                  <div
                    className="absolute right-0 top-0 bottom-0 bg-red-500/10 dark:bg-red-500/15 pointer-events-none transition-all duration-300"
                    style={{ width: `${depthPct}%` }}
                  />
                  <span className="text-red-500 font-medium z-10">{ask.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  <span className="text-right text-slate-700 dark:text-slate-300 z-10">{ask.amount.toFixed(4)}</span>
                  <span className="text-right text-slate-400 z-10">{ask.total.toFixed(4)}</span>
                </div>
              );
            })}
        </div>
      )}

      {/* Mid Price & Spread Bar */}
      <div className="px-3 py-1.5 my-0.5 bg-slate-50 dark:bg-[#0b0e14] border-y border-slate-200 dark:border-[#1f293d] flex items-center justify-between font-mono">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
            ${(orderBook?.asks[0]?.price || 91420).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="text-[10px] text-slate-400">
          Spread: {orderBook?.spread?.toFixed(2) || '0.50'} ({orderBook?.spreadPercent?.toFixed(3) || '0.001'}%)
        </div>
      </div>

      {/* Bids (Buys - Bottom) */}
      {(viewMode === 'both' || viewMode === 'bids') && (
        <div className="flex flex-col flex-1 overflow-hidden">
          {bids.slice(0, viewMode === 'bids' ? 14 : 7).map((bid, i) => {
            const depthPct = Math.min(100, Math.round((bid.total / maxBidTotal) * 100));
            return (
              <div
                key={`bid-${i}-${bid.price}`}
                onClick={() => onSelectPrice && onSelectPrice(bid.price)}
                className="relative grid grid-cols-3 px-3 py-0.5 hover:bg-emerald-500/10 cursor-pointer font-mono text-[11px] group"
              >
                <div
                  className="absolute right-0 top-0 bottom-0 bg-emerald-500/10 dark:bg-emerald-500/15 pointer-events-none transition-all duration-300"
                  style={{ width: `${depthPct}%` }}
                />
                <span className="text-emerald-500 font-medium z-10">{bid.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                <span className="text-right text-slate-700 dark:text-slate-300 z-10">{bid.amount.toFixed(4)}</span>
                <span className="text-right text-slate-400 z-10">{bid.total.toFixed(4)}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
