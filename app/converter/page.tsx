'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Repeat, ArrowRight, BarChart3, TrendingUp } from 'lucide-react';
import { CMC_TOP_COINS } from '@/lib/cmc/coinsData';

const FIAT_RATES: Record<string, { symbol: string; rate: number; name: string }> = {
  USD: { symbol: '$', rate: 1, name: 'United States Dollar' },
  EUR: { symbol: '€', rate: 0.92, name: 'Euro' },
  GBP: { symbol: '£', rate: 0.78, name: 'British Pound' },
  BDT: { symbol: '৳', rate: 120, name: 'Bangladeshi Taka' },
};

export default function ConverterPage() {
  const [selectedCoinId, setSelectedCoinId] = useState<string>('bitcoin');
  const [selectedFiat, setSelectedFiat] = useState<string>('USD');
  const [coinAmount, setCoinAmount] = useState<string>('1');
  const [fiatAmount, setFiatAmount] = useState<string>('');

  const coin = CMC_TOP_COINS.find((c) => c.id === selectedCoinId) || CMC_TOP_COINS[0];
  const fiat = FIAT_RATES[selectedFiat] || FIAT_RATES.USD;

  const handleCoinChange = (val: string) => {
    setCoinAmount(val);
    const num = parseFloat(val) || 0;
    const calc = num * coin.price * fiat.rate;
    setFiatAmount(calc > 0 ? calc.toFixed(2) : '');
  };

  const handleFiatChange = (val: string) => {
    setFiatAmount(val);
    const num = parseFloat(val) || 0;
    const calc = num / (coin.price * fiat.rate);
    setCoinAmount(calc > 0 ? calc.toFixed(6) : '');
  };

  const currentFiatVal = (parseFloat(coinAmount) || 1) * coin.price * fiat.rate;

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 py-8 select-none space-y-8">
      <div className="text-center max-w-lg mx-auto space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-2">
          <Repeat className="h-6 w-6 text-[#3861fb]" />
          Cryptocurrency Converter Calculator
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Convert live market prices between cryptocurrencies and fiat currencies in real-time.
        </p>
      </div>

      {/* Converter Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] shadow-lg space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-11 gap-4 items-center">
          {/* Left: Coin Input (5 cols) */}
          <div className="sm:col-span-5 p-4 rounded-xl bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-[#1a2233] space-y-2">
            <label className="text-[10px] uppercase font-bold text-slate-400">Cryptocurrency</label>
            <div className="flex items-center gap-2">
              <img src={coin.logo} alt={coin.name} className="h-6 w-6 rounded-full shrink-0" />
              <select
                value={selectedCoinId}
                onChange={(e) => {
                  setSelectedCoinId(e.target.value);
                  const newCoin = CMC_TOP_COINS.find((c) => c.id === e.target.value) || coin;
                  const num = parseFloat(coinAmount) || 1;
                  setFiatAmount((num * newCoin.price * fiat.rate).toFixed(2));
                }}
                className="w-full bg-transparent font-bold text-xs text-slate-900 dark:text-white focus:outline-none"
              >
                {CMC_TOP_COINS.map((c) => (
                  <option key={c.id} value={c.id} className="bg-white dark:bg-[#121722]">
                    {c.name} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>
            <input
              type="number"
              step="any"
              value={coinAmount}
              onChange={(e) => handleCoinChange(e.target.value)}
              placeholder="1"
              className="w-full text-xl font-mono font-black bg-transparent border-t border-slate-200 dark:border-slate-800 pt-2 text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          {/* Middle: Icon (1 col) */}
          <div className="sm:col-span-1 flex justify-center">
            <div className="h-10 w-10 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/20">
              <Repeat className="h-4 w-4" />
            </div>
          </div>

          {/* Right: Fiat / Target Input (5 cols) */}
          <div className="sm:col-span-5 p-4 rounded-xl bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-[#1a2233] space-y-2">
            <label className="text-[10px] uppercase font-bold text-slate-400">Fiat Currency</label>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-base text-blue-500 w-6 text-center">{fiat.symbol}</span>
              <select
                value={selectedFiat}
                onChange={(e) => {
                  setSelectedFiat(e.target.value);
                  const newFiat = FIAT_RATES[e.target.value] || fiat;
                  const num = parseFloat(coinAmount) || 1;
                  setFiatAmount((num * coin.price * newFiat.rate).toFixed(2));
                }}
                className="w-full bg-transparent font-bold text-xs text-slate-900 dark:text-white focus:outline-none"
              >
                {Object.keys(FIAT_RATES).map((f) => (
                  <option key={f} value={f} className="bg-white dark:bg-[#121722]">
                    {FIAT_RATES[f].name} ({f})
                  </option>
                ))}
              </select>
            </div>
            <input
              type="number"
              step="any"
              value={fiatAmount || (coin.price * fiat.rate).toFixed(2)}
              onChange={(e) => handleFiatChange(e.target.value)}
              placeholder="0.00"
              className="w-full text-xl font-mono font-black bg-transparent border-t border-slate-200 dark:border-slate-800 pt-2 text-slate-900 dark:text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Live Exchange Result Summary */}
        <div className="pt-4 border-t border-slate-100 dark:border-[#182030] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="font-mono">
            <span className="text-slate-500">Live Rate: </span>
            <strong className="text-slate-900 dark:text-white">
              1 {coin.symbol} = {fiat.symbol}{(coin.price * fiat.rate).toLocaleString(undefined, { minimumFractionDigits: 2 })} {selectedFiat}
            </strong>
          </div>

          <Link
            href={`/trade/${coin.symbol}-USDT`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#3861fb] hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all self-start sm:self-auto"
          >
            <BarChart3 className="h-3.5 w-3.5" />
            <span>Trade {coin.symbol} Live</span>
          </Link>
        </div>
      </div>

      {/* Quick Conversion Reference Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] shadow-sm">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4">
          Quick {coin.symbol} to {selectedFiat} Conversion Table
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          {[0.01, 0.05, 0.1, 0.5, 1, 2, 5, 10].map((amt) => (
            <div
              key={amt}
              onClick={() => handleCoinChange(amt.toString())}
              className="p-3 rounded-xl bg-slate-50 dark:bg-[#0b0e14] border border-slate-100 dark:border-[#1a2233] hover:border-blue-500/40 cursor-pointer transition-colors"
            >
              <span className="text-slate-400 block text-[10px]">{amt} {coin.symbol}</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 text-sm mt-0.5 block">
                {fiat.symbol}{(amt * coin.price * fiat.rate).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
