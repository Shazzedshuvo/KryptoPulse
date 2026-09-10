'use client';

import React, { useEffect, useState } from 'react';
import { PortfolioSummary } from '@/components/portfolio/PortfolioSummary';
import { HoldingsTable } from '@/components/portfolio/HoldingsTable';
import { AssetBalance } from '@/lib/ccxt/types';
import { useApiKeyStore } from '@/lib/store/useApiKeyStore';
import { useTradingStore } from '@/lib/store/useTradingStore';
import { ShieldCheck, RefreshCw, Wallet } from 'lucide-react';

export default function PortfolioPage() {
  const { isPaperTrading } = useApiKeyStore();
  const { usdtBalance, cryptoBalance, activeSymbol } = useTradingStore();
  const [isLoading, setIsLoading] = useState(false);

  const [holdings, setHoldings] = useState<AssetBalance[]>([
    { asset: 'USDT', free: 45000.00, locked: 2500.00, total: 47500.00, usdValue: 47500.00, change24h: 0.01 },
    { asset: 'BTC', free: 1.1500, locked: 0.1000, total: 1.2500, usdValue: 114275.60, change24h: 2.84 },
    { asset: 'ETH', free: 4.8000, locked: 0.2000, total: 5.0000, usdValue: 16400.50, change24h: -1.15 },
    { asset: 'SOL', free: 28.500, locked: 1.500, total: 30.000, usdValue: 6472.50, change24h: 5.42 },
    { asset: 'BNB', free: 6.0000, locked: 0.0000, total: 6.0000, usdValue: 3925.80, change24h: 0.78 },
    { asset: 'XRP', free: 1500.0, locked: 0.0000, total: 1500.0, usdValue: 2227.50, change24h: 12.30 },
  ]);

  // Sync store balances into USDT and BTC holdings if updated during trading
  useEffect(() => {
    setHoldings((prev) =>
      prev.map((item) => {
        if (item.asset === 'USDT') {
          return {
            ...item,
            free: usdtBalance,
            total: usdtBalance + item.locked,
            usdValue: usdtBalance + item.locked,
          };
        }
        if (item.asset === 'BTC') {
          return {
            ...item,
            free: cryptoBalance,
            total: cryptoBalance + item.locked,
            usdValue: (cryptoBalance + item.locked) * 91420.50,
          };
        }
        return item;
      })
    );
  }, [usdtBalance, cryptoBalance]);

  const totalUsd = holdings.reduce((acc, item) => acc + item.usdValue, 0);
  const totalUnrealizedPnl = 4820.75;
  const unrealizedPnlPercent = 2.68;

  // Calculate allocation percentages
  const assetDistribution = [
    { asset: 'BTC', percentage: Math.round((holdings.find(h => h.asset === 'BTC')?.usdValue || 0) / totalUsd * 100), color: '#f59e0b' },
    { asset: 'USDT', percentage: Math.round((holdings.find(h => h.asset === 'USDT')?.usdValue || 0) / totalUsd * 100), color: '#0ecb81' },
    { asset: 'ETH', percentage: Math.round((holdings.find(h => h.asset === 'ETH')?.usdValue || 0) / totalUsd * 100), color: '#6366f1' },
    { asset: 'SOL', percentage: Math.round((holdings.find(h => h.asset === 'SOL')?.usdValue || 0) / totalUsd * 100), color: '#8b5cf6' },
    { asset: 'Others', percentage: 4, color: '#94a3b8' },
  ];

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 select-none space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Wallet className="h-6 w-6 text-emerald-500" />
            Exchange Portfolio
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Aggregated balance directly from your connected exchanges. Zero custody.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
            <span>Non-Custodial Account</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <PortfolioSummary
        totalUsdValue={totalUsd}
        unrealizedPnl={totalUnrealizedPnl}
        unrealizedPnlPercent={unrealizedPnlPercent}
        assetDistribution={assetDistribution}
      />

      {/* Assets Breakdown Table */}
      <HoldingsTable holdings={holdings} />
    </div>
  );
}
