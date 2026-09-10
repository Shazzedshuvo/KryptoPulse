'use client';

import React from 'react';
import { ShieldCheck, AlertCircle, Check, X } from 'lucide-react';
import { SupportedExchange, OrderSide, OrderType } from '@/lib/ccxt/types';

interface OrderConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  order: {
    symbol: string;
    exchange: SupportedExchange;
    side: OrderSide;
    type: OrderType;
    price: number;
    amount: number;
    total: number;
    isSimulated: boolean;
  };
}

export const OrderConfirmModal: React.FC<OrderConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  order,
}) => {
  if (!isOpen) return null;

  const isBuy = order.side === 'buy';
  const baseAsset = order.symbol.split('/')[0] || 'BTC';
  const quoteAsset = order.symbol.split('/')[1] || 'USDT';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1f293d] shadow-2xl p-6 text-slate-900 dark:text-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                isBuy
                  ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                  : 'bg-red-500/10 text-red-500 border border-red-500/20'
              }`}
            >
              Confirm {order.side} {order.type} Order
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Order Details Table */}
        <div className="py-4 space-y-3 font-mono text-xs">
          <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
            <span className="text-slate-500">Routing Exchange</span>
            <span className="font-semibold uppercase text-slate-800 dark:text-slate-200">{order.exchange}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
            <span className="text-slate-500">Market Pair</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{order.symbol}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
            <span className="text-slate-500">Order Type</span>
            <span className="font-semibold uppercase text-slate-800 dark:text-slate-200">{order.type}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
            <span className="text-slate-500">Unit Price</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              ${order.price.toLocaleString(undefined, { minimumFractionDigits: 2 })} {quoteAsset}
            </span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
            <span className="text-slate-500">Quantity</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {order.amount.toFixed(4)} {baseAsset}
            </span>
          </div>
          <div className="flex justify-between py-1 pt-2 text-sm">
            <span className="font-sans font-bold text-slate-700 dark:text-slate-300">Total Outlay</span>
            <span
              className={`font-bold ${isBuy ? 'text-emerald-500' : 'text-red-500'}`}
            >
              ${order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })} {quoteAsset}
            </span>
          </div>
        </div>

        {/* Non-custodial Safety Note */}
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-[#1f293d] mb-5 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
            <span>Direct Relay Verification</span>
          </div>
          <p>
            {order.isSimulated
              ? 'This is a Paper Trading simulated order. No real capital will be committed.'
              : `Order will execute directly on ${order.exchange.toUpperCase()} using your non-custodial read+trade API key.`}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-lg font-semibold text-xs border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-xs text-white shadow-lg transition-all flex items-center justify-center gap-1.5 ${
              isBuy
                ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/25'
                : 'bg-red-500 hover:bg-red-600 shadow-red-500/25'
            }`}
          >
            <Check className="h-4 w-4" />
            <span>Confirm {isBuy ? 'Buy' : 'Sell'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
