'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Star, 
  ArrowUpRight, 
  ArrowDownRight, 
  BarChart2, 
  ChevronRight, 
  ExternalLink 
} from 'lucide-react';
import { SparklineChart } from './SparklineChart';
import { useCmcStore } from '@/lib/store/useCmcStore';
import { CmcCoin } from '@/lib/cmc/types';
import { useTradingStore } from '@/lib/store/useTradingStore';

export const CmcRankingTable: React.FC = () => {
  const { 
    coins, 
    watchlist, 
    toggleWatchlist, 
    activeCategory, 
    searchQuery, 
    currency,
    setSelectedCoin,
    updateLivePrices 
  } = useCmcStore();

  const { setActiveSymbol } = useTradingStore();

  // Price flash tracker
  const [flashingCoinId, setFlashingCoinId] = useState<string | null>(null);

  // Periodic tick updater (every 4 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      updateLivePrices();
      // Pick random coin to flash
      const randomCoin = coins[Math.floor(Math.random() * coins.length)];
      if (randomCoin) {
        setFlashingCoinId(randomCoin.id);
        setTimeout(() => setFlashingCoinId(null), 800);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [updateLivePrices, coins]);

  // Filter coins
  const filteredCoins = coins.filter((coin) => {
    // Watchlist filter
    if (activeCategory === 'Watchlist' && !watchlist.includes(coin.id)) {
      return false;
    }
    // Category filter
    if (activeCategory !== 'All' && activeCategory !== 'Watchlist') {
      if (coin.category !== activeCategory) return false;
    }
    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return coin.name.toLowerCase().includes(q) || coin.symbol.toLowerCase().includes(q);
    }
    return true;
  });

  // Currency multiplier
  const currencyMultiplier = currency === 'EUR' ? 0.92 : currency === 'GBP' ? 0.78 : currency === 'BDT' ? 120 : 1;
  const currencySymbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency === 'BDT' ? '৳' : '$';

  return (
    <div className="w-full rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] shadow-sm overflow-hidden select-none">
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-slate-200 dark:border-[#1a2233] bg-slate-50/70 dark:bg-[#0b0e14]/50 text-slate-500 dark:text-slate-400 text-[11px] font-sans font-bold">
              <th className="py-3 px-3 w-10 text-center">#</th>
              <th className="py-3 px-3">Name</th>
              <th className="py-3 px-3 text-right">Price</th>
              <th className="py-3 px-3 text-right">1h %</th>
              <th className="py-3 px-3 text-right">24h %</th>
              <th className="py-3 px-3 text-right">7d %</th>
              <th className="py-3 px-3 text-right">Market Cap</th>
              <th className="py-3 px-3 text-right">24h Volume</th>
              <th className="py-3 px-3 text-right">Circulating Supply</th>
              <th className="py-3 px-4 text-center">Last 7 Days</th>
              <th className="py-3 px-3 text-right">Trade</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100 dark:divide-[#182030] font-mono text-xs">
            {filteredCoins.map((coin) => {
              const isWatched = watchlist.includes(coin.id);
              const isFlashing = flashingCoinId === coin.id;
              const convertedPrice = coin.price * currencyMultiplier;
              const convertedCap = coin.marketCap * currencyMultiplier;
              const convertedVol = coin.volume24h * currencyMultiplier;
              const is7dPositive = coin.change7d >= 0;

              return (
                <tr
                  key={coin.id}
                  className={`hover:bg-slate-50 dark:hover:bg-[#182030] transition-colors group cursor-pointer ${
                    isFlashing ? (coin.change24h >= 0 ? 'bg-emerald-500/10' : 'bg-red-500/10') : ''
                  }`}
                  onClick={() => setSelectedCoin(coin)}
                >
                  {/* Rank & Star */}
                  <td
                    className="py-3 px-3 text-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWatchlist(coin.id);
                    }}
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <Star
                        className={`h-3.5 w-3.5 transition-colors cursor-pointer ${
                          isWatched
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300 dark:text-slate-600 hover:text-amber-400'
                        }`}
                      />
                      <span className="text-slate-400 text-[11px] font-mono">{coin.rank}</span>
                    </div>
                  </td>

                  {/* Name & Symbol */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5 font-sans font-bold">
                      <img src={coin.logo} alt={coin.name} className="h-6 w-6 rounded-full shrink-0" />
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                          {coin.name}
                        </span>
                        <span className="text-[11px] font-mono font-medium text-slate-400 uppercase">
                          {coin.symbol}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="py-3 px-3 text-right font-bold text-slate-900 dark:text-white">
                    {currencySymbol}
                    {convertedPrice < 1
                      ? convertedPrice.toFixed(coin.price < 0.001 ? 7 : 4)
                      : convertedPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>

                  {/* 1h % */}
                  <td className="py-3 px-3 text-right">
                    <span
                      className={`inline-flex items-center font-semibold text-xs ${
                        coin.change1h >= 0 ? 'text-emerald-500' : 'text-red-500'
                      }`}
                    >
                      {coin.change1h >= 0 ? '+' : ''}{coin.change1h.toFixed(2)}%
                    </span>
                  </td>

                  {/* 24h % */}
                  <td className="py-3 px-3 text-right">
                    <span
                      className={`inline-flex items-center font-semibold text-xs ${
                        coin.change24h >= 0 ? 'text-emerald-500' : 'text-red-500'
                      }`}
                    >
                      {coin.change24h >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                    </span>
                  </td>

                  {/* 7d % */}
                  <td className="py-3 px-3 text-right">
                    <span
                      className={`inline-flex items-center font-semibold text-xs ${
                        is7dPositive ? 'text-emerald-500' : 'text-red-500'
                      }`}
                    >
                      {is7dPositive ? '+' : ''}{coin.change7d.toFixed(2)}%
                    </span>
                  </td>

                  {/* Market Cap */}
                  <td className="py-3 px-3 text-right font-semibold text-slate-800 dark:text-slate-200">
                    {currencySymbol}
                    {convertedCap >= 1e12
                      ? `${(convertedCap / 1e12).toFixed(2)}T`
                      : convertedCap >= 1e9
                      ? `${(convertedCap / 1e9).toFixed(2)}B`
                      : `${(convertedCap / 1e6).toFixed(2)}M`}
                  </td>

                  {/* 24h Volume */}
                  <td className="py-3 px-3 text-right">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">
                      {currencySymbol}
                      {convertedVol >= 1e9
                        ? `${(convertedVol / 1e9).toFixed(2)}B`
                        : `${(convertedVol / 1e6).toFixed(2)}M`}
                    </div>
                    <span className="text-[10px] text-slate-400">
                      {(coin.volume24h / coin.price).toLocaleString(undefined, { maximumFractionDigits: 0 })} {coin.symbol}
                    </span>
                  </td>

                  {/* Circulating Supply */}
                  <td className="py-3 px-3 text-right">
                    <div className="text-slate-800 dark:text-slate-200 font-semibold">
                      {coin.circulatingSupply.toLocaleString()} {coin.symbol}
                    </div>
                    {coin.maxSupply && (
                      <div className="w-24 ml-auto h-1.5 rounded-full bg-slate-100 dark:bg-[#182030] overflow-hidden mt-1">
                        <div
                          className="h-full bg-slate-400 dark:bg-slate-500"
                          style={{
                            width: `${Math.min(100, Math.round((coin.circulatingSupply / coin.maxSupply) * 100))}%`,
                          }}
                        />
                      </div>
                    )}
                  </td>

                  {/* Last 7 Days Sparkline Chart */}
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center">
                      <SparklineChart data={coin.sparkline7d} isPositive={is7dPositive} width={130} height={40} />
                    </div>
                  </td>

                  {/* Trade Action Link to Pro Terminal */}
                  <td
                    className="py-3 px-3 text-right font-sans"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link
                      href={`/trade/${coin.symbol}-USDT`}
                      onClick={() => setActiveSymbol(`${coin.symbol}/USDT`)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 transition-all"
                    >
                      <span>Trade</span>
                      <ChevronRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
