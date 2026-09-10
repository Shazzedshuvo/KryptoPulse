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

export interface AdminTransaction {
  id: string;
  type: 'deposit' | 'withdrawal';
  userId: string;
  userName: string;
  userUid: string;
  asset: string;
  network: string;
  amount: number;
  txHash: string;
  address: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface AdminUserTrade {
  id: string;
  userId: string;
  userName: string;
  userUid: string;
  pair: string;
  type: 'market' | 'limit';
  side: 'buy' | 'sell';
  amountUsdt: number;
  cryptoAmount: number;
  entryPrice: number;
  currentPrice: number;
  pnlUsdt: number;
  pnlPercent: number;
  status: 'open' | 'closed';
  openedAt: string;
}

export interface LeaderboardTrader {
  rank: number;
  userId: string;
  name: string;
  avatar: string;
  uid: string;
  totalPnlUsdt: number;
  pnlRoiPercent: number;
  winRatePercent: number;
  totalVolumeUsd: number;
  totalTrades: number;
  badge: string;
}

export interface GatewayStatus {
  id: string;
  name: string;
  enabled: boolean;
  latencyMs: number;
  ordersProcessed24h: number;
  volume24hUsd: number;
  errorRate: number;
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
  // Super Admin Single-Admin Authentication
  isSuperAdminAuthenticated: boolean;
  superAdminUser: {
    username: string;
    role: string;
    lastLogin: string;
  } | null;

  totalUsers: number;
  totalVolume24h: number;
  activeExchangeKeys: number;
  gatewayHealthScore: number;
  
  users: AdminUser[];
  transactions: AdminTransaction[];
  userTrades: AdminUserTrade[];
  leaderboard: LeaderboardTrader[];
  gateways: GatewayStatus[];
  auditLogs: AuditLogItem[];

  // Auth Methods
  loginSuperAdmin: (username: string, pass: string) => boolean;
  logoutSuperAdmin: () => void;

  // User & Balance Controls
  adjustUserBalance: (userId: string, newBalance: number) => void;
  creditUserBalance: (userId: string, amount: number) => void;
  debitUserBalance: (userId: string, amount: number) => void;
  toggleKyc: (userId: string) => void;
  changeRole: (userId: string, role: 'user' | 'pro' | 'superadmin') => void;
  toggleUserStatus: (userId: string) => void;

  // Deposit & Withdrawal Controls
  approveTransaction: (txId: string) => void;
  rejectTransaction: (txId: string, reason?: string) => void;

  // Trade Execution Monitor
  closeUserTrade: (tradeId: string) => void;

  // Gateway Controls
  toggleGateway: (gatewayId: string) => void;
}

export const SUPERADMIN_CREDENTIALS = {
  username: 'superadmin',
  password: 'kryptopulse2026',
};

export const useAdminStore = create<AdminState>((set, get) => ({
  isSuperAdminAuthenticated: false,
  superAdminUser: null,

  totalUsers: 1428,
  totalVolume24h: 48250900,
  activeExchangeKeys: 2894,
  gatewayHealthScore: 99.8,

  users: [
    {
      id: 'usr-1',
      name: 'Shazzed Shuvo (Owner)',
      email: 'owner@kryptopulse.pro',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      uid: 'KP-000001',
      role: 'superadmin',
      kycVerified: true,
      balanceUsdt: 250000.00,
      status: 'active',
      joinedDate: 'Jan 15, 2026',
    },
    {
      id: 'usr-2',
      name: 'Sarah Connor',
      email: 'sarah.c@quantfund.io',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      uid: 'KP-710423',
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
      uid: 'KP-652190',
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
      uid: 'KP-419082',
      role: 'pro',
      kycVerified: true,
      balanceUsdt: 340000.00,
      status: 'active',
      joinedDate: 'Jan 28, 2026',
    },
    {
      id: 'usr-5',
      name: 'Elena Rostova',
      email: 'elena.r@cryptocap.de',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      uid: 'KP-821943',
      role: 'user',
      kycVerified: true,
      balanceUsdt: 45200.00,
      status: 'active',
      joinedDate: 'Feb 24, 2026',
    },
    {
      id: 'usr-6',
      name: 'Suspicious Bot Node',
      email: 'bot902@darkmesh.ru',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      uid: 'KP-991024',
      role: 'user',
      kycVerified: false,
      balanceUsdt: 0.00,
      status: 'suspended',
      joinedDate: 'Mar 01, 2026',
    },
  ],

  transactions: [
    {
      id: 'tx-101',
      type: 'deposit',
      userId: 'usr-4',
      userName: 'David Chen',
      userUid: 'KP-419082',
      asset: 'USDT',
      network: 'TRC-20',
      amount: 50000.00,
      txHash: '0x8f3c7b2a9e1d4f6c8a2b5e7d9c1f3a5b7d9e1c3f5a7b9d1e3c5a7b9d1e3c5a7b',
      address: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
      status: 'pending',
      createdAt: '5 mins ago',
    },
    {
      id: 'tx-102',
      type: 'withdrawal',
      userId: 'usr-2',
      userName: 'Sarah Connor',
      userUid: 'KP-710423',
      asset: 'USDT',
      network: 'ERC-20',
      amount: 15000.00,
      txHash: '0x4a7b9d1e3c5a7b9d1e3c5a7b9d1e3c5a7b9d1e3c5a7b9d1e3c5a7b9d1e3c5a7b',
      address: '0x71C...B29F',
      status: 'pending',
      createdAt: '18 mins ago',
    },
    {
      id: 'tx-103',
      type: 'deposit',
      userId: 'usr-3',
      userName: 'Alex Rivera',
      userUid: 'KP-652190',
      asset: 'BTC',
      network: 'Bitcoin Native',
      amount: 0.5,
      txHash: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
      address: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
      status: 'approved',
      createdAt: '1 hour ago',
    },
    {
      id: 'tx-104',
      type: 'withdrawal',
      userId: 'usr-5',
      userName: 'Elena Rostova',
      userUid: 'KP-821943',
      asset: 'USDT',
      network: 'Solana',
      amount: 8000.00,
      txHash: '5e7d9c1f3a5b7d9e1c3f5a7b9d1e3c5a7b9d1e3c5a7b9d1e3c5a7b9d1e3c5a7b',
      address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
      status: 'pending',
      createdAt: '2 hours ago',
    },
    {
      id: 'tx-105',
      type: 'deposit',
      userId: 'usr-6',
      userName: 'Suspicious Bot Node',
      userUid: 'KP-991024',
      asset: 'USDT',
      network: 'BEP-20',
      amount: 120000.00,
      txHash: '0x991024botmeshdark991024botmeshdark991024botmeshdark',
      address: '0xBadNodeAddr9910',
      status: 'rejected',
      createdAt: '1 day ago',
    },
  ],

  userTrades: [
    {
      id: 'tr-501',
      userId: 'usr-4',
      userName: 'David Chen',
      userUid: 'KP-419082',
      pair: 'BTC/USDT',
      type: 'market',
      side: 'buy',
      amountUsdt: 91450.00,
      cryptoAmount: 1.0,
      entryPrice: 90200.00,
      currentPrice: 91450.00,
      pnlUsdt: 1250.00,
      pnlPercent: 1.38,
      status: 'open',
      openedAt: '22 mins ago',
    },
    {
      id: 'tr-502',
      userId: 'usr-2',
      userName: 'Sarah Connor',
      userUid: 'KP-710423',
      pair: 'SOL/USDT',
      type: 'limit',
      side: 'buy',
      amountUsdt: 32175.00,
      cryptoAmount: 150.0,
      entryPrice: 205.00,
      currentPrice: 214.50,
      pnlUsdt: 1425.00,
      pnlPercent: 4.63,
      status: 'open',
      openedAt: '1 hour ago',
    },
    {
      id: 'tr-503',
      userId: 'usr-3',
      userName: 'Alex Rivera',
      userUid: 'KP-652190',
      pair: 'ETH/USDT',
      type: 'market',
      side: 'sell',
      amountUsdt: 16250.00,
      cryptoAmount: 5.0,
      entryPrice: 3310.00,
      currentPrice: 3250.00,
      pnlUsdt: 300.00,
      pnlPercent: 1.81,
      status: 'open',
      openedAt: '3 hours ago',
    },
    {
      id: 'tr-504',
      userId: 'usr-5',
      userName: 'Elena Rostova',
      userUid: 'KP-821943',
      pair: 'DOGE/USDT',
      type: 'market',
      side: 'buy',
      amountUsdt: 12250.00,
      cryptoAmount: 50000,
      entryPrice: 0.255,
      currentPrice: 0.245,
      pnlUsdt: -500.00,
      pnlPercent: -3.92,
      status: 'open',
      openedAt: '5 hours ago',
    },
    {
      id: 'tr-505',
      userId: 'usr-1',
      userName: 'Shazzed Shuvo',
      userUid: 'KP-000001',
      pair: 'BTC/USDT',
      type: 'limit',
      side: 'buy',
      amountUsdt: 182900.00,
      cryptoAmount: 2.0,
      entryPrice: 88500.00,
      currentPrice: 91450.00,
      pnlUsdt: 5900.00,
      pnlPercent: 3.33,
      status: 'closed',
      openedAt: 'Yesterday',
    },
  ],

  leaderboard: [
    {
      rank: 1,
      userId: 'usr-1',
      name: 'Shazzed Shuvo',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      uid: 'KP-000001',
      totalPnlUsdt: 68420.50,
      pnlRoiPercent: 42.8,
      winRatePercent: 78.5,
      totalVolumeUsd: 1450000,
      totalTrades: 142,
      badge: 'Master Whale 👑',
    },
    {
      rank: 2,
      userId: 'usr-4',
      name: 'David Chen',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      uid: 'KP-419082',
      totalPnlUsdt: 42150.00,
      pnlRoiPercent: 28.4,
      winRatePercent: 71.2,
      totalVolumeUsd: 980000,
      totalTrades: 98,
      badge: 'Alpha Quant ⚡',
    },
    {
      rank: 3,
      userId: 'usr-2',
      name: 'Sarah Connor',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      uid: 'KP-710423',
      totalPnlUsdt: 24890.00,
      pnlRoiPercent: 22.1,
      winRatePercent: 66.8,
      totalVolumeUsd: 620000,
      totalTrades: 74,
      badge: 'Sniper Trader 🎯',
    },
    {
      rank: 4,
      userId: 'usr-5',
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      uid: 'KP-821943',
      totalPnlUsdt: 12400.00,
      pnlRoiPercent: 14.5,
      winRatePercent: 62.0,
      totalVolumeUsd: 310000,
      totalTrades: 45,
      badge: 'Momentum Hunter 🚀',
    },
    {
      rank: 5,
      userId: 'usr-3',
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      uid: 'KP-652190',
      totalPnlUsdt: 4850.00,
      pnlRoiPercent: 8.9,
      winRatePercent: 54.3,
      totalVolumeUsd: 145000,
      totalTrades: 28,
      badge: 'Rising Star 🌟',
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
      actor: 'Super Admin',
      action: 'Super Admin Session Authorized from Secure Gateway',
      ip: '192.168.1.1',
      status: 'success',
    },
    {
      id: 'log-2',
      timestamp: '5 mins ago',
      actor: 'David Chen',
      action: 'Placed LIMIT BUY order 1.0 BTC on Binance',
      ip: '104.28.19.12',
      status: 'success',
    },
    {
      id: 'log-3',
      timestamp: '18 mins ago',
      actor: 'Sarah Connor',
      action: 'Requested 15,000 USDT Withdrawal to 0x71C...B29F',
      ip: '73.189.44.82',
      status: 'warning',
    },
    {
      id: 'log-4',
      timestamp: '1 hour ago',
      actor: 'Suspicious Bot Node',
      action: 'Unregistered Withdrawal Attempt Blocked & Node Suspended',
      ip: '185.220.101.5',
      status: 'error',
    },
  ],

  // Super Admin Login
  loginSuperAdmin: (user: string, pass: string) => {
    if (
      user.trim().toLowerCase() === SUPERADMIN_CREDENTIALS.username &&
      pass === SUPERADMIN_CREDENTIALS.password
    ) {
      set({
        isSuperAdminAuthenticated: true,
        superAdminUser: {
          username: 'superadmin',
          role: 'Master Super Admin',
          lastLogin: new Date().toLocaleTimeString(),
        },
      });
      return true;
    }
    return false;
  },

  logoutSuperAdmin: () => {
    set({
      isSuperAdminAuthenticated: false,
      superAdminUser: null,
    });
  },

  // Balance Adjustment
  adjustUserBalance: (userId: string, newBalance: number) => {
    set((state) => ({
      users: state.users.map((u) =>
        u.id === userId ? { ...u, balanceUsdt: Math.max(0, newBalance) } : u
      ),
      auditLogs: [
        {
          id: `log-${Date.now()}`,
          timestamp: 'Just now',
          actor: 'Super Admin',
          action: `Adjusted User Balance for ${state.users.find((u) => u.id === userId)?.name || userId} to $${newBalance.toLocaleString()}`,
          ip: '127.0.0.1',
          status: 'warning',
        },
        ...state.auditLogs,
      ],
    }));
  },

  creditUserBalance: (userId: string, amount: number) => {
    set((state) => ({
      users: state.users.map((u) =>
        u.id === userId ? { ...u, balanceUsdt: u.balanceUsdt + amount } : u
      ),
    }));
  },

  debitUserBalance: (userId: string, amount: number) => {
    set((state) => ({
      users: state.users.map((u) =>
        u.id === userId ? { ...u, balanceUsdt: Math.max(0, u.balanceUsdt - amount) } : u
      ),
    }));
  },

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

  // Deposit & Withdrawal Approval
  approveTransaction: (txId: string) => {
    const state = get();
    const tx = state.transactions.find((t) => t.id === txId);
    if (!tx || tx.status !== 'pending') return;

    // If deposit, credit user balance
    if (tx.type === 'deposit') {
      state.creditUserBalance(tx.userId, tx.amount);
    }

    set((s) => ({
      transactions: s.transactions.map((t) =>
        t.id === txId ? { ...t, status: 'approved' } : t
      ),
      auditLogs: [
        {
          id: `log-${Date.now()}`,
          timestamp: 'Just now',
          actor: 'Super Admin',
          action: `Approved ${tx.type.toUpperCase()} of ${tx.amount} ${tx.asset} for ${tx.userName}`,
          ip: '127.0.0.1',
          status: 'success',
        },
        ...s.auditLogs,
      ],
    }));
  },

  rejectTransaction: (txId: string, reason?: string) => {
    const state = get();
    const tx = state.transactions.find((t) => t.id === txId);
    if (!tx || tx.status !== 'pending') return;

    // If withdrawal was rejected, refund to balance
    if (tx.type === 'withdrawal') {
      state.creditUserBalance(tx.userId, tx.amount);
    }

    set((s) => ({
      transactions: s.transactions.map((t) =>
        t.id === txId ? { ...t, status: 'rejected' } : t
      ),
      auditLogs: [
        {
          id: `log-${Date.now()}`,
          timestamp: 'Just now',
          actor: 'Super Admin',
          action: `Rejected ${tx.type.toUpperCase()} of ${tx.amount} ${tx.asset} for ${tx.userName}${reason ? ` (${reason})` : ''}`,
          ip: '127.0.0.1',
          status: 'error',
        },
        ...s.auditLogs,
      ],
    }));
  },

  // Close User Trade
  closeUserTrade: (tradeId: string) => {
    set((state) => ({
      userTrades: state.userTrades.map((t) =>
        t.id === tradeId ? { ...t, status: 'closed' } : t
      ),
      auditLogs: [
        {
          id: `log-${Date.now()}`,
          timestamp: 'Just now',
          actor: 'Super Admin',
          action: `Admin Manually Closed Position #${tradeId}`,
          ip: '127.0.0.1',
          status: 'warning',
        },
        ...state.auditLogs,
      ],
    }));
  },

  toggleGateway: (gatewayId) =>
    set((state) => ({
      gateways: state.gateways.map((g) =>
        g.id === gatewayId ? { ...g, enabled: !g.enabled } : g
      ),
    })),
}));
