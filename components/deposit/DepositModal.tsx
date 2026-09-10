'use client';

import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  QrCode, 
  Zap, 
  ShieldAlert, 
  ExternalLink, 
  ArrowUpRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { useDepositStore, DEPOSIT_NETWORKS } from '@/lib/store/useDepositStore';
import { useApiKeyStore } from '@/lib/store/useApiKeyStore';

const ASSETS = ['USDT', 'BTC', 'ETH', 'SOL', 'BNB'];

export const DepositModal: React.FC = () => {
  const { 
    isDepositModalOpen, 
    closeDepositModal, 
    selectedAsset, 
    setSelectedAsset, 
    selectedNetwork, 
    setSelectedNetwork,
    topUpDemoBalance 
  } = useDepositStore();

  const { isPaperTrading } = useApiKeyStore();
  const [copied, setCopied] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  if (!isDepositModalOpen) return null;

  const currentNetwork = DEPOSIT_NETWORKS[selectedNetwork] || DEPOSIT_NETWORKS['TRC-20'];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentNetwork.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTopUp = (amount: number) => {
    topUpDemoBalance(amount);
    setSuccessToast(`Successfully deposited +$${amount.toLocaleString()} ${selectedAsset}!`);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in select-none text-xs">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1f293d] shadow-2xl p-6 text-slate-900 dark:text-white max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
              <QrCode className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Deposit Crypto</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Deposit to exchange or add instant test trading balance
              </p>
            </div>
          </div>
          <button
            onClick={closeDepositModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Asset Selection */}
        <div className="space-y-1.5 my-4">
          <label className="font-semibold text-slate-700 dark:text-slate-300">Select Coin</label>
          <div className="grid grid-cols-5 gap-1.5">
            {ASSETS.map((asset) => (
              <button
                key={asset}
                type="button"
                onClick={() => setSelectedAsset(asset)}
                className={`py-2 rounded-lg font-bold border transition-all ${
                  selectedAsset === asset
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                    : 'border-slate-200 dark:border-[#1f293d] text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#182030]'
                }`}
              >
                {asset}
              </button>
            ))}
          </div>
        </div>

        {/* Network Selection */}
        <div className="space-y-1.5 mb-4">
          <label className="font-semibold text-slate-700 dark:text-slate-300">Select Network</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {Object.keys(DEPOSIT_NETWORKS).map((netKey) => (
              <button
                key={netKey}
                type="button"
                onClick={() => setSelectedNetwork(netKey)}
                className={`p-2 rounded-lg text-left border transition-all ${
                  selectedNetwork === netKey
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-semibold'
                    : 'border-slate-200 dark:border-[#1f293d] text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#182030]'
                }`}
              >
                <div className="font-mono">{netKey}</div>
                <div className="text-[10px] text-slate-400 truncate">{DEPOSIT_NETWORKS[netKey].name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* QR Code and Address Box */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-[#1f293d] flex flex-col sm:flex-row items-center gap-4 mb-4">
          {/* Mock Stylized QR Code Visual */}
          <div className="relative h-28 w-28 shrink-0 bg-white p-2 rounded-lg shadow-sm border border-slate-200 flex items-center justify-center">
            <div className="w-full h-full bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:6px_6px] flex items-center justify-center">
              <div className="h-9 w-9 rounded-md bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-md">
                {selectedAsset}
              </div>
            </div>
          </div>

          {/* Address Details */}
          <div className="flex-1 w-full space-y-2">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Deposit Address ({selectedNetwork})</span>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  readOnly
                  value={currentNetwork.address}
                  className="w-full px-2.5 py-1.5 bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1f293d] rounded-lg font-mono text-[11px] text-slate-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 transition-colors"
                  title="Copy Address"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 pt-1">
              <div>Est. Arrival: <span className="text-slate-700 dark:text-slate-300 font-medium">{currentNetwork.confirmationTime}</span></div>
              <div>Min Deposit: <span className="text-slate-700 dark:text-slate-300 font-medium">10 {selectedAsset}</span></div>
            </div>
          </div>
        </div>

        {/* 1-Click Instant Demo Balance Top-Up */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/30 mb-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
              Instant Paper Trading Top-Up
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono font-semibold">
              Zero Risk
            </span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400">
            Add virtual {selectedAsset} directly into your active trading balance to test order placement immediately.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleTopUp(10000)}
              className="flex-1 py-2 rounded-lg font-bold text-xs bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20 transition-all"
            >
              +$10,000 {selectedAsset}
            </button>
            <button
              type="button"
              onClick={() => handleTopUp(50000)}
              className="flex-1 py-2 rounded-lg font-bold text-xs bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-500/20 transition-all"
            >
              +$50,000 {selectedAsset}
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {successToast && (
          <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-2 animate-in fade-in mb-3">
            <Check className="h-4 w-4 shrink-0" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Direct Exchange Gateway Notice */}
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-[#1f293d] text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
          <div className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
            <Layers className="h-3.5 w-3.5 text-indigo-500" />
            <span>Direct Connected Exchange Deposit</span>
          </div>
          <p>
            For real funds, deposit directly into your connected Binance, Bybit, or KuCoin account. NexTrade automatically reflects live balances via CCXT API sync.
          </p>
        </div>
      </div>
    </div>
  );
};
