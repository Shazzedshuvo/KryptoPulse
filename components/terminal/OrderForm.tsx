'use client';

import React, { useState, useEffect } from 'react';
import { useTradingStore } from '@/lib/store/useTradingStore';
import { useApiKeyStore } from '@/lib/store/useApiKeyStore';
import { OrderSide, OrderType } from '@/lib/ccxt/types';
import { OrderConfirmModal } from './OrderConfirmModal';
import { Zap, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface OrderFormProps {
  prefilledPrice?: number | null;
}

export const OrderForm: React.FC<OrderFormProps> = ({ prefilledPrice }) => {
  const { 
    activeSymbol, 
    activeExchange, 
    ticker, 
    usdtBalance, 
    cryptoBalance, 
    placeOrder 
  } = useTradingStore();
  
  const { isPaperTrading } = useApiKeyStore();

  const [side, setSide] = useState<OrderSide>('buy');
  const [orderType, setOrderType] = useState<OrderType>('limit');
  const [price, setPrice] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [stopPrice, setStopPrice] = useState<string>('');
  const [sliderPct, setSliderPct] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const baseAsset = activeSymbol.split('/')[0] || 'BTC';
  const quoteAsset = activeSymbol.split('/')[1] || 'USDT';
  const currentMarketPrice = ticker?.lastPrice || 91420;

  // Sync prefilled price from OrderBook click or default market price
  useEffect(() => {
    if (prefilledPrice) {
      setPrice(prefilledPrice.toString());
    } else if (!price && currentMarketPrice) {
      setPrice(currentMarketPrice.toString());
    }
  }, [prefilledPrice, currentMarketPrice, price]);

  // Handle balance percentage clicks (25%, 50%, 75%, 100%)
  const handlePercentageSelect = (pct: number) => {
    setSliderPct(pct);
    const unitPrice = orderType === 'market' ? currentMarketPrice : parseFloat(price) || currentMarketPrice;
    
    if (side === 'buy') {
      const maxUsdt = (usdtBalance * pct) / 100;
      const calcAmount = maxUsdt / unitPrice;
      setAmount(calcAmount > 0 ? calcAmount.toFixed(4) : '');
    } else {
      const calcAmount = (cryptoBalance * pct) / 100;
      setAmount(calcAmount > 0 ? calcAmount.toFixed(4) : '');
    }
  };

  const parsedPrice = orderType === 'market' ? currentMarketPrice : parseFloat(price) || currentMarketPrice;
  const parsedAmount = parseFloat(amount) || 0;
  const totalCost = parsedPrice * parsedAmount;
  const estimatedFee = totalCost * 0.001; // 0.1%

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parsedAmount <= 0) {
      setFeedbackMsg('Please enter a valid amount.');
      return;
    }
    if (side === 'buy' && totalCost > usdtBalance) {
      setFeedbackMsg('Insufficient USDT balance.');
      return;
    }
    if (side === 'sell' && parsedAmount > cryptoBalance) {
      setFeedbackMsg(`Insufficient ${baseAsset} balance.`);
      return;
    }
    setFeedbackMsg(null);
    setIsModalOpen(true);
  };

  const handleExecuteOrder = () => {
    const executed = placeOrder({
      exchange: activeExchange,
      symbol: activeSymbol,
      type: orderType,
      side: side,
      price: parsedPrice,
      stopPrice: orderType === 'stop_limit' ? parseFloat(stopPrice) : undefined,
      amount: parsedAmount,
      isSimulated: isPaperTrading,
    });

    setFeedbackMsg(`Order placed: ${side.toUpperCase()} ${parsedAmount} ${baseAsset}!`);
    setAmount('');
    setSliderPct(0);
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#121722] select-none text-xs transition-colors p-3.5">
      {/* Buy / Sell Tabs */}
      <div className="grid grid-cols-2 p-1 rounded-lg bg-slate-100 dark:bg-[#0b0e14] mb-3">
        <button
          type="button"
          onClick={() => {
            setSide('buy');
            setSliderPct(0);
          }}
          className={`py-2 rounded-md font-bold text-xs transition-all ${
            side === 'buy'
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          Buy {baseAsset}
        </button>
        <button
          type="button"
          onClick={() => {
            setSide('sell');
            setSliderPct(0);
          }}
          className={`py-2 rounded-md font-bold text-xs transition-all ${
            side === 'sell'
              ? 'bg-red-500 text-white shadow-md shadow-red-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          Sell {baseAsset}
        </button>
      </div>

      {/* Order Type Selector (Limit, Market, Stop-Limit) */}
      <div className="flex items-center space-x-2 mb-3">
        {(['limit', 'market', 'stop_limit'] as OrderType[]).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setOrderType(type)}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold uppercase tracking-wider transition-colors ${
              orderType === type
                ? 'bg-slate-200 dark:bg-[#1f293d] text-emerald-600 dark:text-emerald-400'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {type.replace('_', '-')}
          </button>
        ))}
      </div>

      {/* Available Balance Indicator */}
      <div className="flex items-center justify-between text-[11px] mb-3 text-slate-500 dark:text-slate-400">
        <span>Avail. Balance:</span>
        <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
          {side === 'buy'
            ? `$${usdtBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT`
            : `${cryptoBalance.toFixed(4)} ${baseAsset}`}
        </span>
      </div>

      {/* Inputs Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Stop Price (if Stop-Limit) */}
        {orderType === 'stop_limit' && (
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-semibold text-slate-400">Stop Price</label>
            <div className="relative flex items-center">
              <input
                type="number"
                step="any"
                value={stopPrice}
                onChange={(e) => setStopPrice(e.target.value)}
                placeholder="0.00"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-[#1f293d] rounded-lg text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <span className="absolute right-3 text-[11px] font-mono text-slate-400">{quoteAsset}</span>
            </div>
          </div>
        )}

        {/* Order Price (for Limit & Stop-Limit) */}
        {orderType !== 'market' ? (
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-semibold text-slate-400">Order Price</label>
            <div className="relative flex items-center">
              <input
                type="number"
                step="any"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-[#1f293d] rounded-lg text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <span className="absolute right-3 text-[11px] font-mono text-slate-400">{quoteAsset}</span>
            </div>
          </div>
        ) : (
          <div className="py-2 px-3 rounded-lg bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-[#1f293d] text-slate-500 dark:text-slate-400 text-xs flex justify-between">
            <span>Market Price</span>
            <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
              ${currentMarketPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
        )}

        {/* Amount */}
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-semibold text-slate-400">Quantity</label>
          <div className="relative flex items-center">
            <input
              type="number"
              step="any"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setSliderPct(0);
              }}
              placeholder="0.00"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-[#1f293d] rounded-lg text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <span className="absolute right-3 text-[11px] font-mono text-slate-400">{baseAsset}</span>
          </div>
        </div>

        {/* Quick Percent Buttons */}
        <div className="grid grid-cols-4 gap-1.5 pt-1">
          {[25, 50, 75, 100].map((pct) => (
            <button
              key={pct}
              type="button"
              onClick={() => handlePercentageSelect(pct)}
              className={`py-1 rounded text-[10px] font-mono font-semibold border transition-all ${
                sliderPct === pct
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : 'border-slate-200 dark:border-[#1f293d] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#182030]'
              }`}
            >
              {pct}%
            </button>
          ))}
        </div>

        {/* Summary Info */}
        <div className="pt-2 pb-1 space-y-1 text-[11px] font-mono border-t border-slate-100 dark:border-[#182030]">
          <div className="flex justify-between text-slate-500 dark:text-slate-400">
            <span>Order Value</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              ${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {quoteAsset}
            </span>
          </div>
          <div className="flex justify-between text-slate-400 text-[10px]">
            <span>Est. Exchange Fee (0.1%)</span>
            <span>${estimatedFee.toFixed(2)} {quoteAsset}</span>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedbackMsg && (
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-1.5 animate-in fade-in">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-2.5 rounded-lg font-bold text-xs text-white shadow-lg transition-all ${
            side === 'buy'
              ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/25'
              : 'bg-red-500 hover:bg-red-600 shadow-red-500/25'
          }`}
        >
          {side === 'buy' ? `Buy ${baseAsset}` : `Sell ${baseAsset}`}
        </button>

        {/* Mode info note */}
        <div className="flex items-center justify-center gap-1.5 pt-1 text-[10px] text-slate-400">
          <Zap className="h-3 w-3 text-amber-500" />
          <span>
            {isPaperTrading
              ? 'Paper Trading: Zero capital risk'
              : `Direct execution on ${activeExchange.toUpperCase()}`}
          </span>
        </div>
      </form>

      {/* Confirmation Modal */}
      <OrderConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleExecuteOrder}
        order={{
          symbol: activeSymbol,
          exchange: activeExchange,
          side: side,
          type: orderType,
          price: parsedPrice,
          amount: parsedAmount,
          total: totalCost,
          isSimulated: isPaperTrading,
        }}
      />
    </div>
  );
};
