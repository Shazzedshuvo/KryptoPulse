import { create } from 'zustand';
import { useTradingStore } from './useTradingStore';

export interface DepositRecord {
  id: string;
  asset: string;
  network: string;
  amount: number;
  txHash: string;
  timestamp: number;
  status: 'confirmed' | 'pending';
}

interface DepositState {
  isDepositModalOpen: boolean;
  selectedAsset: string;
  selectedNetwork: string;
  depositHistory: DepositRecord[];

  openDepositModal: (asset?: string) => void;
  closeDepositModal: () => void;
  setSelectedAsset: (asset: string) => void;
  setSelectedNetwork: (network: string) => void;
  topUpDemoBalance: (amount: number) => void;
}

export const DEPOSIT_NETWORKS: Record<string, { name: string; address: string; confirmationTime: string; fee: string }> = {
  'TRC-20': {
    name: 'Tron (TRC-20)',
    address: 'TX9kZ8v6bYfM3g8R1qW2e4t5y6u7i8o9p0',
    confirmationTime: '~2 mins (12 network confirms)',
    fee: '0 USDT',
  },
  'ERC-20': {
    name: 'Ethereum (ERC-20)',
    address: '0x71C25c689C8F9e1E87E9854FaAc9E2D270b2a49B',
    confirmationTime: '~5 mins (32 network confirms)',
    fee: '3.5 USDT',
  },
  'BEP-20': {
    name: 'BNB Smart Chain (BEP-20)',
    address: '0x71C25c689C8F9e1E87E9854FaAc9E2D270b2a49B',
    confirmationTime: '~1 min (15 network confirms)',
    fee: '0.2 USDT',
  },
  'SOL': {
    name: 'Solana (SPL)',
    address: '9xQeWvG816bUx9EPjHmaT23yvVM2HA8WwM8mKL9r2T',
    confirmationTime: '~30 secs (10 network confirms)',
    fee: '0.01 USDT',
  },
};

export const useDepositStore = create<DepositState>((set, get) => ({
  isDepositModalOpen: false,
  selectedAsset: 'USDT',
  selectedNetwork: 'TRC-20',
  depositHistory: [
    {
      id: 'dep-9021',
      asset: 'USDT',
      network: 'TRC-20',
      amount: 15000.0,
      txHash: 'a89c...4f2b',
      timestamp: Date.now() - 86400000 * 2,
      status: 'confirmed',
    },
    {
      id: 'dep-9020',
      asset: 'USDT',
      network: 'BEP-20',
      amount: 5000.0,
      txHash: '3e1b...990d',
      timestamp: Date.now() - 86400000 * 4,
      status: 'confirmed',
    },
  ],

  openDepositModal: (asset = 'USDT') => set({ isDepositModalOpen: true, selectedAsset: asset }),
  closeDepositModal: () => set({ isDepositModalOpen: false }),
  setSelectedAsset: (asset) => set({ selectedAsset: asset }),
  setSelectedNetwork: (network) => set({ selectedNetwork: network }),

  topUpDemoBalance: (amount) => {
    // Credit trading store usdt balance
    const tradingStore = useTradingStore.getState();
    useTradingStore.setState({ usdtBalance: tradingStore.usdtBalance + amount });

    // Add to deposit history
    const record: DepositRecord = {
      id: `dep-${Date.now().toString().slice(-4)}`,
      asset: get().selectedAsset,
      network: get().selectedNetwork,
      amount,
      txHash: `0x${Math.random().toString(16).substring(2, 8)}...${Math.random().toString(16).substring(2, 6)}`,
      timestamp: Date.now(),
      status: 'confirmed',
    };

    set((s) => ({
      depositHistory: [record, ...s.depositHistory],
    }));
  },
}));
