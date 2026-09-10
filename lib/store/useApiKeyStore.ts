import { create } from 'zustand';
import { SupportedExchange } from '../ccxt/types';

export interface ConnectedExchange {
  id: string;
  exchange: SupportedExchange;
  name: string;
  apiKeyMasked: string;
  hasTradePermission: boolean;
  hasReadPermission: boolean;
  hasWithdrawPermission: boolean; // MUST ALWAYS BE FALSE
  status: 'connected' | 'error' | 'testing';
  addedAt: number;
}

interface ApiKeyStore {
  connectedExchanges: ConnectedExchange[];
  activeExchange: SupportedExchange;
  isPaperTrading: boolean;
  addExchangeKey: (item: Omit<ConnectedExchange, 'id' | 'addedAt'>) => void;
  removeExchangeKey: (id: string) => void;
  setActiveExchange: (exchange: SupportedExchange) => void;
  togglePaperTrading: (enabled?: boolean) => void;
}

export const useApiKeyStore = create<ApiKeyStore>((set) => ({
  connectedExchanges: [
    {
      id: 'demo-binance-1',
      exchange: 'binance',
      name: 'Binance Demo Account',
      apiKeyMasked: 'bin_••••••••8492',
      hasTradePermission: true,
      hasReadPermission: true,
      hasWithdrawPermission: false,
      status: 'connected',
      addedAt: Date.now() - 86400000 * 5,
    },
    {
      id: 'demo-bybit-1',
      exchange: 'bybit',
      name: 'Bybit Demo Account',
      apiKeyMasked: 'byb_••••••••910a',
      hasTradePermission: true,
      hasReadPermission: true,
      hasWithdrawPermission: false,
      status: 'connected',
      addedAt: Date.now() - 86400000 * 2,
    },
  ],
  activeExchange: 'binance',
  isPaperTrading: true, // Default to paper trading mode for safe, immediate testing!
  addExchangeKey: (item) =>
    set((state) => ({
      connectedExchanges: [
        ...state.connectedExchanges,
        {
          ...item,
          id: `key-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          addedAt: Date.now(),
        },
      ],
    })),
  removeExchangeKey: (id) =>
    set((state) => ({
      connectedExchanges: state.connectedExchanges.filter((ex) => ex.id !== id),
    })),
  setActiveExchange: (exchange) => set({ activeExchange: exchange }),
  togglePaperTrading: (enabled) =>
    set((state) => ({
      isPaperTrading: enabled !== undefined ? enabled : !state.isPaperTrading,
    })),
}));
