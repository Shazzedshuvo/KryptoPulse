import { create } from 'zustand';
import { CmcCoin } from '../cmc/types';
import { CMC_TOP_COINS } from '../cmc/coinsData';

interface CmcState {
  coins: CmcCoin[];
  watchlist: string[];
  activeCategory: string;
  searchQuery: string;
  currency: 'USD' | 'EUR' | 'GBP' | 'BDT';
  selectedCoin: CmcCoin | null;

  toggleWatchlist: (coinId: string) => void;
  setActiveCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  setCurrency: (currency: 'USD' | 'EUR' | 'GBP' | 'BDT') => void;
  setSelectedCoin: (coin: CmcCoin | null) => void;
  updateLivePrices: () => void;
}

export const useCmcStore = create<CmcState>((set) => ({
  coins: CMC_TOP_COINS,
  watchlist: ['bitcoin', 'ethereum', 'solana'],
  activeCategory: 'All',
  searchQuery: '',
  currency: 'USD',
  selectedCoin: null,

  toggleWatchlist: (coinId) =>
    set((state) => {
      const exists = state.watchlist.includes(coinId);
      const nextWatchlist = exists
        ? state.watchlist.filter((id) => id !== coinId)
        : [...state.watchlist, coinId];
      if (typeof window !== 'undefined') {
        localStorage.setItem('cmc_watchlist', JSON.stringify(nextWatchlist));
      }
      return { watchlist: nextWatchlist };
    }),

  setActiveCategory: (activeCategory) => set({ activeCategory }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setCurrency: (currency) => set({ currency }),
  setSelectedCoin: (selectedCoin) => set({ selectedCoin }),

  // Simulates minor realistic price ticks like CoinMarketCap live websockets
  updateLivePrices: () =>
    set((state) => ({
      coins: state.coins.map((c) => {
        if (c.symbol === 'USDT') return c; // stablecoin
        const driftPct = (Math.random() - 0.49) * 0.002;
        const newPrice = Number((c.price * (1 + driftPct)).toFixed(c.price < 1 ? 6 : 2));
        return {
          ...c,
          price: newPrice,
        };
      }),
    })),
}));
