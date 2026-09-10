'use client';

import React, { useState } from 'react';
import { 
  Wallet, 
  QrCode, 
  Copy, 
  Check, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ShieldAlert, 
  ExternalLink,
  Layers
} from 'lucide-react';
import { useDepositStore, DEPOSIT_NETWORKS } from '@/lib/store/useDepositStore';
import { useTradingStore } from '@/lib/store/useTradingStore';

const ASSETS = ['USDT', 'BTC', 'ETH', 'SOL', 'BNB'];

export default function DepositPage() {
  const { 
    selectedAsset, 
    setSelectedAsset, 
    selectedNetwork, 
    setSelectedNetwork, 
    depositHistory, 
    topUpDemoBalance 
  } = useDepositStore();

  const { usdtBalance } = useTradingStore();
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const currentNetwork = DEPOSIT_NETWORKS[selectedNetwork] || DEPOSIT_NETWORKS['TRC-20'];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentNetwork.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTopUp = (amount: number) => {
    topUpDemoBalance(amount);
    setToast(`Deposited +$${amount.toLocaleString()} ${selectedAsset}!`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 select-none space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Wallet className="h-6 w-6 text-emerald-500" />
            Deposit Crypto Assets
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Deposit crypto to your connected exchange address or top up virtual paper trading balance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1f293d] text-xs">
            <span className="text-slate-400 block text-[10px]">Current Available USDT:</span>
            <span className="font-mono font-bold text-sm text-emerald-500">
              ${usdtBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Deposit Interface (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1f293d] shadow-sm space-y-5">
          {/* Select Coin */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">1. Select Coin</label>
            <div className="grid grid-cols-5 gap-2">
              {ASSETS.map((asset) => (
                <button
                  key={asset}
                  type="button"
                  onClick={() => setSelectedAsset(asset)}
                  className={`py-2.5 rounded-xl font-bold text-xs border transition-all ${
                    selectedAsset === asset
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-sm'
                      : 'border-slate-200 dark:border-[#1f293d] text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#182030]'
                  }`}
                >
                  {asset}
                </button>
              ))}
            </div>
          </div>

          {/* Select Network */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">2. Select Network</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.keys(DEPOSIT_NETWORKS).map((netKey) => (
                <button
                  key={netKey}
                  type="button"
                  onClick={() => setSelectedNetwork(netKey)}
                  className={`p-3 rounded-xl text-left border transition-all text-xs ${
                    selectedNetwork === netKey
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-semibold shadow-sm'
                      : 'border-slate-200 dark:border-[#1f293d] text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#182030]'
                  }`}
                >
                  <div className="font-mono font-bold">{netKey}</div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">{DEPOSIT_NETWORKS[netKey].name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* QR Code and Address Card */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-[#1f293d] flex flex-col sm:flex-row items-center gap-5">
            {/* Mock QR Code */}
            <div className="h-32 w-32 shrink-0 bg-white p-2 rounded-xl shadow border border-slate-200 flex items-center justify-center">
              <div className="w-full h-full bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:6px_6px] flex items-center justify-center">
                <div className="h-10 w-10 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-md">
                  {selectedAsset}
                </div>
              </div>
            </div>

            {/* Address Info */}
            <div className="flex-1 w-full space-y-2 text-xs">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Official Deposit Address ({selectedNetwork})
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={currentNetwork.address}
                  className="w-full px-3 py-2 bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1f293d] rounded-lg font-mono text-xs text-slate-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 transition-colors shrink-0"
                  title="Copy Address"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-1">
                <div>Expected Confirmation: <span className="font-semibold text-slate-700 dark:text-slate-300">{currentNetwork.confirmationTime}</span></div>
                <div>Network Fee: <span className="font-semibold text-slate-700 dark:text-slate-300">{currentNetwork.fee}</span></div>
              </div>
            </div>
          </div>

          {/* Quick Demo Top-Up */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/30 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <Sparkles className="h-4 w-4" />
                Instant Practice Top-Up
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded font-mono font-semibold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                Demo Balance
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-[11px]">
              Instantly credit your terminal balance to test order placement, order books, and indicators.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => handleTopUp(10000)}
                className="flex-1 py-2.5 rounded-lg font-bold text-xs bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20 transition-all"
              >
                +$10,000 {selectedAsset}
              </button>
              <button
                type="button"
                onClick={() => handleTopUp(50000)}
                className="flex-1 py-2.5 rounded-lg font-bold text-xs bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-500/20 transition-all"
              >
                +$50,000 {selectedAsset}
              </button>
            </div>
          </div>

          {toast && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <Check className="h-4 w-4" />
              <span>{toast}</span>
            </div>
          )}
        </div>

        {/* Deposit History & Rules (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* History */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1f293d] shadow-sm">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-emerald-500" />
              Recent Deposits
            </h3>

            <div className="space-y-3 font-mono text-xs">
              {depositHistory.map((d) => (
                <div
                  key={d.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-[#0b0e14] border border-slate-100 dark:border-[#182030] flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-800 dark:text-slate-200">
                      +{d.amount.toLocaleString()} {d.asset}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {d.network} • Tx: {d.txHash}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-500">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span className="capitalize">{d.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Warnings */}
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs space-y-2">
            <div className="font-bold flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <ShieldAlert className="h-4 w-4" />
              <span>Deposit Guidelines</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Ensure you send only <strong>{selectedAsset}</strong> via the <strong>{selectedNetwork}</strong> network. Sending any other currency or using an incompatible network may result in permanent loss.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
