'use client';

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Key, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  Lock,
  RefreshCw
} from 'lucide-react';
import { useApiKeyStore } from '@/lib/store/useApiKeyStore';
import { SUPPORTED_EXCHANGES } from '@/lib/ccxt/mockData';
import { SupportedExchange } from '@/lib/ccxt/types';

export const ApiKeyManager: React.FC = () => {
  const { connectedExchanges, addExchangeKey, removeExchangeKey } = useApiKeyStore();

  const [selectedExchange, setSelectedExchange] = useState<SupportedExchange>('binance');
  const [keyName, setKeyName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [secret, setSecret] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const activeMeta = SUPPORTED_EXCHANGES.find((e) => e.id === selectedExchange) || SUPPORTED_EXCHANGES[0];

  const handleTestAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey || !secret) {
      setTestResult({ success: false, message: 'Please provide both API Key and API Secret.' });
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      const res = await fetch('/api/settings/test-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exchange: selectedExchange,
          apiKey,
          secret,
          password: passphrase || undefined,
        }),
      });

      const json = await res.json();

      if (json.success) {
        setTestResult({
          success: true,
          message: `Verified! Successfully connected to ${selectedExchange.toUpperCase()}.`,
        });

        // Add to connected exchanges
        const masked = `${apiKey.slice(0, 4)}••••••••${apiKey.slice(-4)}`;
        addExchangeKey({
          exchange: selectedExchange,
          name: keyName.trim() || `${activeMeta.name} Key`,
          apiKeyMasked: masked,
          hasTradePermission: true,
          hasReadPermission: true,
          hasWithdrawPermission: false,
          status: 'connected',
        });

        // Clear input form
        setKeyName('');
        setApiKey('');
        setSecret('');
        setPassphrase('');
      } else {
        setTestResult({
          success: false,
          message: json.error || 'Exchange rejected the credentials. Verify permissions and try again.',
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.message || 'Network error while testing exchange credentials.',
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="space-y-6 select-none">
      {/* Explicit Guardrail Banner */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 flex items-start gap-3">
        <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <h4 className="font-bold uppercase tracking-wider text-sm">Strict Zero-Custody Security Guardrail</h4>
          <p>
            This platform is a <strong>pure trading client</strong>. It does NOT hold your funds or run any internal wallet.
            When generating API keys on your exchange, only enable <strong>Read</strong> and <strong>Trade/Spot</strong> permissions.
            <strong> NEVER enable Withdrawal permissions.</strong> Any key with withdrawal permissions will be blocked by our gateway.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Connect New Key Form (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1f293d] shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-[#1f293d] mb-4">
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Plus className="h-4 w-4 text-emerald-500" />
              Connect Exchange API Key
            </h3>
            <a
              href={activeMeta.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>{activeMeta.name} Docs</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <form onSubmit={handleTestAndSave} className="space-y-4 text-xs">
            {/* Exchange Dropdown */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Select Exchange</label>
              <select
                value={selectedExchange}
                onChange={(e) => setSelectedExchange(e.target.value as SupportedExchange)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-[#1f293d] rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                {SUPPORTED_EXCHANGES.map((ex) => (
                  <option key={ex.id} value={ex.id}>
                    {ex.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Label / Key Name */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Key Name / Label</label>
              <input
                type="text"
                placeholder="e.g. My Primary Binance Spot Key"
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-[#1f293d] rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* API Key */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">API Key</label>
              <input
                type="text"
                placeholder="Enter API Key from exchange..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-3 py-2 font-mono bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-[#1f293d] rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* API Secret */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">API Secret</label>
              <input
                type="password"
                placeholder="Enter API Secret..."
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                className="w-full px-3 py-2 font-mono bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-[#1f293d] rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Passphrase (for KuCoin / OKX) */}
            {(selectedExchange === 'kucoin' || selectedExchange === 'okx') && (
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">API Passphrase</label>
                <input
                  type="password"
                  placeholder="Enter Passphrase..."
                  value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  className="w-full px-3 py-2 font-mono bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-[#1f293d] rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            )}

            {/* Security Guarantee */}
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <Lock className="h-3.5 w-3.5 text-emerald-500" />
              <span>Encrypted with AES-256-GCM. Never transmitted to 3rd parties.</span>
            </div>

            {/* Result Message */}
            {testResult && (
              <div
                className={`p-3 rounded-lg text-xs flex items-start gap-2 ${
                  testResult.success
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                    : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30'
                }`}
              >
                {testResult.success ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                )}
                <span>{testResult.message}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isTesting}
              className="w-full py-2.5 rounded-lg font-bold text-xs bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isTesting ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>Validating Exchange Connection...</span>
                </>
              ) : (
                <>
                  <Key className="h-3.5 w-3.5" />
                  <span>Test Connection & Connect</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Connected Keys List (7 cols) */}
        <div className="lg:col-span-7 p-5 rounded-xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1f293d] shadow-sm flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-slate-200 dark:border-[#1f293d] mb-4">
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                Active Exchange Accounts ({connectedExchanges.length})
              </h3>
            </div>

            {connectedExchanges.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400 text-xs">
                <Key className="h-8 w-8 mb-2 opacity-40" />
                <p>No exchange keys connected yet.</p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Connect your read+trade keys or use Paper Trading mode.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {connectedExchanges.map((ex) => (
                  <div
                    key={ex.id}
                    className="p-3.5 rounded-lg bg-slate-50 dark:bg-[#0b0e14] border border-slate-200 dark:border-[#1f293d] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white capitalize">{ex.name}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-200 dark:bg-[#1f293d] text-slate-700 dark:text-slate-300 font-semibold">
                          {ex.exchange}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-medium">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          Connected
                        </span>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                        <span>Key: {ex.apiKeyMasked}</span>
                        <span>•</span>
                        <span>Permissions: Read, Trade</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => removeExchangeKey(ex.id)}
                        className="p-1.5 rounded-md text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-colors"
                        title="Disconnect this key"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-[#182030] text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Server Proxy: CCXT Unified Engine</span>
            <span>Zero Fund Custody Guaranteed</span>
          </div>
        </div>
      </div>
    </div>
  );
};
