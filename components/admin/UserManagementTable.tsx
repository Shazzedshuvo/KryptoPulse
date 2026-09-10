'use client';

import React, { useState } from 'react';
import { 
  Users, 
  BadgeCheck, 
  ShieldAlert, 
  Search, 
  MoreHorizontal, 
  Check, 
  Ban, 
  Shield, 
  Crown 
} from 'lucide-react';
import { useAdminStore, AdminUser } from '@/lib/store/useAdminStore';

export const UserManagementTable: React.FC = () => {
  const { users, toggleKyc, changeRole, toggleUserStatus } = useAdminStore();
  const [search, setSearch] = useState('');

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.uid.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] shadow-sm select-none overflow-hidden text-xs">
      {/* Table Header with Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-slate-100 dark:border-[#182030] bg-slate-50/50 dark:bg-[#0b0e14]/50">
        <div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-500" />
            Platform User Management
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Super admin controls to verify KYC, promote roles, or suspend user access.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email or UID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="text-slate-400 border-b border-slate-100 dark:border-[#182030] font-sans font-semibold">
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">UID</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">KYC Status</th>
              <th className="py-3 px-4 text-right">Balance</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Super Admin Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-[#182030]">
            {filteredUsers.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-[#182030] transition-colors">
                {/* User */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3 font-sans">
                    <img src={u.avatar} alt={u.name} className="h-8 w-8 rounded-full object-cover shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">{u.name}</span>
                      <span className="text-[11px] text-slate-400 font-mono">{u.email}</span>
                    </div>
                  </div>
                </td>

                {/* UID */}
                <td className="py-3 px-4 text-slate-700 dark:text-slate-300 font-bold">
                  {u.uid}
                </td>

                {/* Role */}
                <td className="py-3 px-4 font-sans">
                  <select
                    value={u.role}
                    onChange={(e) => changeRole(u.id, e.target.value as any)}
                    className={`px-2 py-1 rounded-md text-[11px] font-bold uppercase border bg-transparent focus:outline-none ${
                      u.role === 'superadmin'
                        ? 'border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-500/10'
                        : u.role === 'pro'
                        ? 'border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <option value="user" className="bg-white dark:bg-[#121722]">User</option>
                    <option value="pro" className="bg-white dark:bg-[#121722]">Pro Trader</option>
                    <option value="superadmin" className="bg-white dark:bg-[#121722]">Super Admin</option>
                  </select>
                </td>

                {/* KYC */}
                <td className="py-3 px-4 font-sans">
                  <button
                    onClick={() => toggleKyc(u.id)}
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                      u.kycVerified
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                    }`}
                    title="Click to toggle KYC status"
                  >
                    <BadgeCheck className="h-3 w-3" />
                    <span>{u.kycVerified ? 'Verified' : 'Pending'}</span>
                  </button>
                </td>

                {/* Balance */}
                <td className="py-3 px-4 text-right font-bold text-slate-800 dark:text-slate-200">
                  ${u.balanceUsdt.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>

                {/* Status */}
                <td className="py-3 px-4 font-sans">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      u.status === 'active'
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : 'bg-red-500/10 text-red-500'
                    }`}
                  >
                    {u.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-3 px-4 text-right font-sans">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => toggleUserStatus(u.id)}
                      className={`px-2 py-1 rounded text-[10px] font-bold transition-colors ${
                        u.status === 'active'
                          ? 'text-red-500 hover:bg-red-500/10 border border-red-500/20'
                          : 'text-emerald-500 hover:bg-emerald-500/10 border border-emerald-500/20'
                      }`}
                    >
                      {u.status === 'active' ? 'Suspend' : 'Activate'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
