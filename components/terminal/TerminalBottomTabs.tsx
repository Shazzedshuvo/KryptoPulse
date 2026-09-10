'use client';

import React, { useState } from 'react';
import { useTradingStore } from '@/lib/store/useTradingStore';
import { useApiKeyStore } from '@/lib/store/useApiKeyStore';
import { Trash2, RotateCcw, AlertTriangle, ShieldCheck, Clock, CheckCircle } from 'lucide-react';

export const TerminalBottomTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'open' | 'history' | 'assets' | 'logs'>('open');
  const { 
    openOrders, 
    orderHistory, 
    cancelOrder, 
    cancelAllOrders, 
    resetDemoBalances,
    usdtBalance,
    cryptoBalance,
    activeSymbol,
    activeExchange 
  } = useTradingStore();

  const { isPaperTrading } = useApiKeyStore();
  const baseAsset = activeSymbol.split('/')[0] || 'BTC';

  return (
    <div className="flex flex-col bg-white dark:bg-[#121722] border-t border-slate-200 dark:border-[#1f293d] select-none text-xs transition-colors">
      {/* Tab Navigation */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-200 dark:border-[#1f293d] bg-slate-50/50 dark:bg-[#10141d]">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('open')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
              activeTab === 'open'
                ? 'bg-slate-200 dark:bg-[#1f293d] text-emerald-600 dark:text-emerald-400'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Open Orders ({openOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
              activeTab === 'history'
                ? 'bg-slate-200 dark:bg-[#1f293d] text-emerald-600 dark:text-emerald-400'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Order History ({orderHistory.length})
          </button>
          <button
            onClick={() => setActiveTab('assets')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
              activeTab === 'assets'
                ? 'bg-slate-200 dark:bg-[#1f293d] text-emerald-600 dark:text-emerald-400'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Pair Balances
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`hidden sm:inline-flex px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
              activeTab === 'logs'
                ? 'bg-slate-200 dark:bg-[#1f293d] text-emerald-600 dark:text-emerald-400'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Gateway Audit
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-2">
          {activeTab === 'open' && openOrders.length > 0 && (
            <button
              onClick={cancelAllOrders}
              className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium text-red-500 hover:bg-red-500/10 border border-red-500/20 transition-colors"
            >
              <Trash2 className="h-3 w-3" />
              <span>Cancel All</span>
            </button>
          )}

          {isPaperTrading && (
            <button
              onClick={resetDemoBalances}
              className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#182030] transition-colors"
              title="Replenish Demo Balances ($50,000 USDT + 1.5 BTC)"
            >
              <RotateCcw className="h-3 w-3" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>
          )}
        </div>
      </div>

      {/* Tab Panels */}
      <div className="min-h-[160px] max-h-[220px] overflow-y-auto p-2">
        {/* Open Orders Tab */}
        {activeTab === 'open' && (
          <div>
            {openOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                <Clock className="h-6 w-6 mb-1 opacity-50" />
                <p>No open orders in current session.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-[11px]">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-100 dark:border-[#182030]">
                      <th className="pb-1.5 px-2">Time</th>
                      <th className="pb-1.5 px-2">Exchange</th>
                      <th className="pb-1.5 px-2">Pair</th>
                      <th className="pb-1.5 px-2">Type</th>
                      <th className="pb-1.5 px-2">Side</th>
                      <th className="pb-1.5 px-2">Price</th>
                      <th className="pb-1.5 px-2">Amount</th>
                      <th className="pb-1.5 px-2">Total</th>
                      <th className="pb-1.5 px-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100/60 dark:divide-slate-800/60">
                    {openOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-50 dark:hover:bg-[#182030]">
                        <td className="py-2 px-2 text-slate-400">
                          {new Date(ord.timestamp).toLocaleTimeString()}
                        </td>
                        <td className="py-2 px-2 uppercase font-sans text-slate-600 dark:text-slate-300">
                          {ord.exchange}
                        </td>
                        <td className="py-2 px-2 font-bold text-slate-800 dark:text-slate-200">
                          {ord.symbol}
                        </td>
                        <td className="py-2 px-2 uppercase text-slate-500">{ord.type}</td>
                        <td className="py-2 px-2 font-bold uppercase">
                          <span
                            className={
                              ord.side === 'buy' ? 'text-emerald-500' : 'text-red-500'
                            }
                          >
                            {ord.side}
                          </span>
                        </td>
                        <td className="py-2 px-2 text-slate-800 dark:text-slate-200">
                          ${ord.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-2 px-2">{ord.amount}</td>
                        <td className="py-2 px-2 text-slate-800 dark:text-slate-200">
                          ${ord.cost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-2 px-2 text-right">
                          <button
                            onClick={() => cancelOrder(ord.id)}
                            className="px-2 py-0.5 rounded text-[10px] font-semibold text-red-500 hover:bg-red-500/10 border border-red-500/20 transition-colors"
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Order History Tab */}
        {activeTab === 'history' && (
          <div>
            {orderHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                <CheckCircle className="h-6 w-6 mb-1 opacity-50" />
                <p>No historical filled orders yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-[11px]">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-100 dark:border-[#182030]">
                      <th className="pb-1.5 px-2">Time</th>
                      <th className="pb-1.5 px-2">Exchange</th>
                      <th className="pb-1.5 px-2">Pair</th>
                      <th className="pb-1.5 px-2">Side</th>
                      <th className="pb-1.5 px-2">Price</th>
                      <th className="pb-1.5 px-2">Filled</th>
                      <th className="pb-1.5 px-2">Total</th>
                      <th className="pb-1.5 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100/60 dark:divide-slate-800/60">
                    {orderHistory.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-50 dark:hover:bg-[#182030]">
                        <td className="py-2 px-2 text-slate-400">
                          {new Date(ord.timestamp).toLocaleTimeString()}
                        </td>
                        <td className="py-2 px-2 uppercase font-sans text-slate-600 dark:text-slate-300">
                          {ord.exchange}
                        </td>
                        <td className="py-2 px-2 font-bold text-slate-800 dark:text-slate-200">
                          {ord.symbol}
                        </td>
                        <td className="py-2 px-2 font-bold uppercase">
                          <span
                            className={
                              ord.side === 'buy' ? 'text-emerald-500' : 'text-red-500'
                            }
                          >
                            {ord.side}
                          </span>
                        </td>
                        <td className="py-2 px-2 text-slate-800 dark:text-slate-200">
                          ${ord.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-2 px-2">{ord.filled}</td>
                        <td className="py-2 px-2 text-slate-800 dark:text-slate-200">
                          ${ord.cost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-2 px-2">
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-semibold uppercase">
                            {ord.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Pair Balances Tab */}
        {activeTab === 'assets' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-1">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-[#1f293d]">
              <span className="text-[10px] uppercase font-semibold text-slate-400">USDT Balance</span>
              <div className="text-base font-mono font-bold text-slate-900 dark:text-white mt-1">
                ${usdtBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <span className="text-[10px] text-emerald-500">Available for buys</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-[#1f293d]">
              <span className="text-[10px] uppercase font-semibold text-slate-400">{baseAsset} Holdings</span>
              <div className="text-base font-mono font-bold text-slate-900 dark:text-white mt-1">
                {cryptoBalance.toFixed(4)} {baseAsset}
              </div>
              <span className="text-[10px] text-slate-400">Available for sells</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-[#1f293d]">
              <span className="text-[10px] uppercase font-semibold text-slate-400">Routing Exchange</span>
              <div className="text-base font-mono font-bold uppercase text-slate-900 dark:text-white mt-1">
                {activeExchange}
              </div>
              <span className="text-[10px] text-slate-400">Direct CCXT Relay</span>
            </div>
          </div>
        )}

        {/* Gateway Audit Tab */}
        {activeTab === 'logs' && (
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-[#1f293d] space-y-2 text-xs font-mono">
            <div className="flex items-center gap-2 text-emerald-500 font-sans font-bold">
              <ShieldCheck className="h-4 w-4" />
              <span>Non-Custodial Cryptographic Security Pass</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] font-sans">
              Every API call and trade signature originates locally on the server without logging sensitive private keys. No withdrawal capabilities are active or allowed.
            </p>
            <div className="text-[10px] text-slate-400">
              Gateway Relay Endpoint: <code>/api/trade/order</code> [CCXT REST v4]
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
