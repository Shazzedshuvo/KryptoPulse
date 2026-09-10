'use client';

import React from 'react';
import { Layers, Activity, CheckCircle2, AlertTriangle, Power } from 'lucide-react';
import { useAdminStore } from '@/lib/store/useAdminStore';

export const GatewayControls: React.FC = () => {
  const { gateways, toggleGateway } = useAdminStore();

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] shadow-sm select-none space-y-4 text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#182030]">
        <div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="h-4 w-4 text-emerald-500" />
            CCXT Exchange Gateway Monitors
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time proxy routing status across supported cryptocurrency exchange engines.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {gateways.map((gw) => (
          <div
            key={gw.id}
            className={`p-4 rounded-xl border transition-all ${
              gw.enabled
                ? 'bg-slate-50 dark:bg-[#0b0e14] border-slate-200 dark:border-[#1a2233]'
                : 'bg-red-500/5 border-red-500/20 opacity-70'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-slate-900 dark:text-white uppercase font-sans text-xs">
                {gw.id}
              </span>
              <button
                onClick={() => toggleGateway(gw.id)}
                className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors ${
                  gw.enabled
                    ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'
                    : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                }`}
              >
                <Power className="h-3 w-3" />
                <span>{gw.enabled ? 'Active' : 'Offline'}</span>
              </button>
            </div>

            <div className="space-y-1.5 font-mono text-[11px]">
              <div className="flex justify-between text-slate-500">
                <span>Latency</span>
                <span className="font-bold text-emerald-500">{gw.latencyMs}ms</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Orders Processed</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{gw.ordersProcessed24h.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>24h Volume</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">${(gw.volume24hUsd / 1e6).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Error Rate</span>
                <span className="text-slate-400">{gw.errorRate}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
