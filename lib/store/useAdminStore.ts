import { create } from 'zustand';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  uid: string;
  role: 'user' | 'pro' | 'superadmin';
  kycVerified: boolean;
  balanceUsdt: number;
  status: 'active' | 'suspended';
  joinedDate: string;
}

export interface GatewayStatus {
  id: string;
  name: string;
  enabled: boolean;
  latencyMs: number;
  ordersProcessed24h: number;
  volume24hUsd: number;
  errorRate: number; // e.g. 0.01%
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  ip: string;
  status: 'success' | 'warning' | 'error';
}

interface AdminState {
  totalUsers: number;
  totalVolume24h: number;
  activeExchangeKeys: number;
  gatewayHealthScore: number;
  
  users: AdminUser[];
  gateways: GatewayStatus[];
  auditLogs: AuditLogItem[];

  toggleKyc: (userId: string) => void;
  changeRole: (userId: string, role: 'user' | 'pro' | 'superadmin') => void;
  toggleUserStatus: (userId: string) => void;
  toggleGateway: (gatewayId: string) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  totalUsers: 1428,
  totalVolume24h: 48250900,
  activeExchangeKeys: 2894,
  gatewayHealthScore: 99.8,

  users: [
    {
      id: 'usr-1',
      name: 'Shazzed Shuvo',
      email: 'admin@nextrade.pro',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      uid: 'NX-894201',
      role: 'superadmin',
      kycVerified: true,
      balanceUsdt: 184520.45,
      status: 'active',
      joinedDate: 'Jan 15, 2026',
    },
    {
      id: 'usr-2',
      name: 'Sarah Connor',
      email: 'sarah.c@quantfund.io',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      uid: 'NX-710423',
      role: 'pro',
      kycVerified: true,
      balanceUsdt: 95400.00,
      status: 'active',
      joinedDate: 'Feb 02, 2026',
    },
    {
      id: 'usr-3',
      name: 'Alex Rivera',
      email: 'alex.r@blocktrade.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      uid: 'NX-652190',
      role: 'user',
      kycVerified: false,
      balanceUsdt: 12500.00,
      status: 'active',
      joinedDate: 'Feb 18, 2026',
    },
    {
      id: 'usr-4',
      name: 'David Chen',
      email: 'd.chen@defiwhale.net',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      uid: 'NX-419082',
      role: 'pro',
      kycVerified: true,
      balanceUsdt: 340000.00,
      status: 'active',
      joinedDate: 'Jan 28, 2026',
    },
    {
      id: 'usr-5',
      name: 'Suspicious Bot Node',
      email: 'bot902@darkmesh.ru',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      uid: 'NX-991024',
      role: 'user',
      kycVerified: false,
      balanceUsdt: 0.00,
      status: 'suspended',
      joinedDate: 'Mar 01, 2026',
    },
  ],

  gateways: [
    {
      id: 'binance',
      name: 'Binance Spot CCXT Gateway',
      enabled: true,
      latencyMs: 14,
      ordersProcessed24h: 18450,
      volume24hUsd: 28400000,
      errorRate: 0.01,
    },
    {
      id: 'bybit',
      name: 'Bybit Spot CCXT Gateway',
      enabled: true,
      latencyMs: 18,
      ordersProcessed24h: 9240,
      volume24hUsd: 11200000,
      errorRate: 0.02,
    },
    {
      id: 'kucoin',
      name: 'KuCoin CCXT Gateway',
      enabled: true,
      latencyMs: 24,
      ordersProcessed24h: 4850,
      volume24hUsd: 5800000,
      errorRate: 0.04,
    },
    {
      id: 'okx',
      name: 'OKX CCXT Gateway',
      enabled: true,
      latencyMs: 16,
      ordersProcessed24h: 3120,
      volume24hUsd: 2850000,
      errorRate: 0.01,
    },
  ],

  auditLogs: [
    {
      id: 'log-1',
      timestamp: 'Just now',
      actor: 'Shazzed Shuvo (Super Admin)',
      action: 'Enabled Zero-Custody Cryptographic Guardrails',
      ip: '192.168.1.45',
      status: 'success',
    },
    {
      id: 'log-2',
      timestamp: '5 mins ago',
      actor: 'David Chen',
      action: 'Placed LIMIT BUY order 2.5 BTC on Binance',
      ip: '104.28.19.12',
      status: 'success',
    },
    {
      id: 'log-3',
      timestamp: '22 mins ago',
      actor: 'Suspicious Bot Node',
      action: 'API Key with Withdrawal Permission Blocked by Security Gateway',
      ip: '185.220.101.5',
      status: 'warning',
    },
    {
      id: 'log-4',
      timestamp: '1 hour ago',
      actor: 'Sarah Connor',
      action: 'Connected Bybit AES-256 Encrypted Key',
      ip: '73.189.44.82',
      status: 'success',
    },
  ],

  toggleKyc: (userId) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.id === userId ? { ...u, kycVerified: !u.kycVerified } : u
      ),
    })),

  changeRole: (userId, role) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === userId ? { ...u, role } : u)),
    })),

  toggleUserStatus: (userId) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' }
          : u
      ),
    })),

  toggleGateway: (gatewayId) =>
    set((state) => ({
      gateways: state.gateways.map((g) =>
        g.id === gatewayId ? { ...g, enabled: !g.enabled } : g
      ),
    })),
}));
