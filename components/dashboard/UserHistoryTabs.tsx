'use client';

import React, { useState } from 'react';
import { Clock, CheckCircle2, ArrowUpRight, ArrowDownRight, Wallet, Layers } from 'lucide-react';
import { useTradingStore } from '@/lib/store/useTradingStore';
import { useDepositStore } from '@/lib/store/useDepositStore';

export const UserHistoryTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'fills' | 'orders' | 'deposits'>('fills');
  const { orderHistory, openOrders } = useTradingStore();
  const { depositHistory } = useDepositStore();

  const mockTradeFills = [
    {
      id: 'fill-101',
      date: 'Today, 09:42',
      exchange: 'binance',
      pair: 'BTC/USDT',
      side: 'sell',
      price: 91450.00,
      amount: 0.25,
      total: 22862.50,
      realizedPnl: 1420.00,
      realizedPnlPct: 6.62,
    },
    {
      id: 'fill-102',
      date: 'Yesterday, 14:15',
      exchange: 'bybit',
      pair: 'SOL/USDT',
      side: 'sell',
      price: 214.50,
      amount: 15.0,
      total: 3217.50,
      realizedPnl: 345.00,
      realizedPnlPct: 12.01,
    },
    {
      id: 'fill-103',
      date: 'Sep 8, 18:30',
      exchange: 'binance',
      pair: 'ETH/USDT',
      side: 'buy',
      price: 3250.00,
      amount: 2.0,
      total: 6500.00,
      realizedPnl: 520.00,
      realizedPnlPct: 8.70,
    },
    {
      id: 'fill-104',
      date: 'Sep 6, 11:20',
      exchange: 'okx',
      pair: 'DOGE/USDT',
      side: 'sell',
      price: 0.245,
      amount: 5000,
      total: 1225.00,
      realizedPnl: -180.00,
      realizedPnlPct: -12.8,
    },
  ];

  return (
    <div className="rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] shadow-sm select-none overflow-hidden text-xs">
      {/* Tabs Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-[#182030] bg-slate-50/50 dark:bg-[#0b0e14]/50">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('fills')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
              activeTab === 'fills'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-[#182030]'
            }`}
          >
            Realized P&L Fills ({mockTradeFills.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
              activeTab === 'orders'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-[#182030]'
            }`}
          >
            Order Log ({orderHistory.length + openOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('deposits')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
              activeTab === 'deposits'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-[#182030]'
            }`}
          >
            Deposit Records ({depositHistory.length})
          </button>
        </div>

        <span className="text-slate-400 text-[11px] font-mono hidden sm:inline">
          Server Synced
        </span>
      </div>

      {/* Tab Panels */}
      <div className="p-4 overflow-x-auto">
        {activeTab === 'fills' && (
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100 dark:border-[#182030] pb-2 font-sans font-semibold">
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Exchange</th>
                <th className="py-2.5 px-3">Pair</th>
                <th className="py-2.5 px-3">Side</th>
                <th className="py-2.5 px-3 text-right">Exec. Price</th>
                <th className="py-2.5 px-3 text-right">Amount</th>
                <th className="py-2.5 px-3 text-right">Total Outlay</th>
                <th className="py-2.5 px-3 text-right">Realized Profit / Loss</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#182030]">
              {mockTradeFills.map((fill) => {
                const isPos = fill.realizedPnl >= 0;
                return (
                  <tr key={fill.id} className="hover:bg-slate-50 dark:hover:bg-[#182030]">
                    <td className="py-3 px-3 text-slate-400">{fill.date}</td>
                    <td className="py-3 px-3 uppercase font-sans text-slate-700 dark:text-slate-300 font-medium">
                      {fill.exchange}
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">{fill.pair}</td>
                    <td className="py-3 px-3 uppercase font-bold">
                      <span className={fill.side === 'buy' ? 'text-emerald-500' : 'text-red-500'}>
                        {fill.side}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">${fill.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td className="py-3 px-3 text-right">{fill.amount}</td>
                    <td className="py-3 px-3 text-right text-slate-700 dark:text-slate-300">
                      ${fill.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span
                        className={`inline-flex items-center font-bold ${
                          isPos ? 'text-emerald-500' : 'text-red-500'
                        }`}
                      >
                        {isPos ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                        {isPos ? '+' : ''}${fill.realizedPnl.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        <span className="text-[10px] ml-1 opacity-80">({isPos ? '+' : ''}{fill.realizedPnlPct}%)</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {activeTab === 'orders' && (
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100 dark:border-[#182030] pb-2 font-sans font-semibold">
                <th className="py-2.5 px-3">Exchange</th>
                <th className="py-2.5 px-3">Pair</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Side</th>
                <th className="py-2.5 px-3 text-right">Price</th>
                <th className="py-2.5 px-3 text-right">Amount</th>
                <th className="py-2.5 px-3 text-right">Total</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#182030]">
              {[...openOrders, ...orderHistory].map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50 dark:hover:bg-[#182030]">
                  <td className="py-3 px-3 uppercase font-sans text-slate-700 dark:text-slate-300 font-medium">
                    {ord.exchange}
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">{ord.symbol}</td>
                  <td className="py-3 px-3 uppercase text-slate-500">{ord.type}</td>
                  <td className="py-3 px-3 uppercase font-bold">
                    <span className={ord.side === 'buy' ? 'text-emerald-500' : 'text-red-500'}>
                      {ord.side}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">${ord.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="py-3 px-3 text-right">{ord.amount}</td>
                  <td className="py-3 px-3 text-right">${ord.cost.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="py-3 px-3 text-right">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        ord.status === 'closed'
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                          : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'deposits' && (
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100 dark:border-[#182030] pb-2 font-sans font-semibold">
                <th className="py-2.5 px-3">Time</th>
                <th className="py-2.5 px-3">Asset</th>
                <th className="py-2.5 px-3">Network</th>
                <th className="py-2.5 px-3 text-right">Amount</th>
                <th className="py-2.5 px-3 text-right">TxHash</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#182030]">
              {depositHistory.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50 dark:hover:bg-[#182030]">
                  <td className="py-3 px-3 text-slate-400">{new Date(d.timestamp).toLocaleDateString()}</td>
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">{d.asset}</td>
                  <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{d.network}</td>
                  <td className="py-3 px-3 text-right font-bold text-emerald-500">
                    +{d.amount.toLocaleString()} {d.asset}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-400">{d.txHash}</td>
                  <td className="py-3 px-3 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
