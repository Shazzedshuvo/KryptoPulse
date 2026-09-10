'use client';

import React from 'react';
import { ShieldCheck, Clock, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import { useAdminStore } from '@/lib/store/useAdminStore';

export const AuditLogs: React.FC = () => {
  const { auditLogs } = useAdminStore();

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] shadow-sm select-none space-y-4 text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#182030]">
        <div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-purple-500" />
            Security Audit Trail & Gateway Events
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time immutable event log of logins, orders, and cryptographic key validations.
          </p>
        </div>
      </div>

      <div className="space-y-2.5 font-mono text-xs">
        {auditLogs.map((log) => (
          <div
            key={log.id}
            className="p-3 rounded-xl bg-slate-50 dark:bg-[#0b0e14] border border-slate-100 dark:border-[#182030] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
          >
            <div className="flex items-center gap-3">
              {log.status === 'success' && <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />}
              {log.status === 'warning' && <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />}
              {log.status === 'error' && <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />}

              <div>
                <span className="font-bold text-slate-900 dark:text-white block font-sans text-xs">
                  {log.action}
                </span>
                <span className="text-[11px] text-slate-400">
                  Actor: <strong className="text-slate-700 dark:text-slate-300">{log.actor}</strong> • IP: {log.ip}
                </span>
              </div>
            </div>

            <span className="text-[11px] text-slate-400 self-end sm:self-center">
              {log.timestamp}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
