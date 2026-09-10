import { create } from 'zustand';

export interface PnlDataPoint {
  date: string;
  cumulativePnl: number;
  dailyPnl: number;
}

interface PnlState {
  timeframe: '7D' | '30D' | '90D' | '1Y';
  netProfit: number;
  netProfitPercent: number;
  winRate: number; // percentage e.g. 68.4
  totalTrades: number;
  profitableTrades: number;
  lossTrades: number;
  bestTrade: { pair: string; profit: number; percent: number; date: string };
  worstTrade: { pair: string; loss: number; percent: number; date: string };
  pnlData: PnlDataPoint[];

  setTimeframe: (tf: '7D' | '30D' | '90D' | '1Y') => void;
}

const PNL_DATA_7D: PnlDataPoint[] = [
  { date: 'Sep 4', cumulativePnl: 1250, dailyPnl: 1250 },
  { date: 'Sep 5', cumulativePnl: 2100, dailyPnl: 850 },
  { date: 'Sep 6', cumulativePnl: 1850, dailyPnl: -250 },
  { date: 'Sep 7', cumulativePnl: 3400, dailyPnl: 1550 },
  { date: 'Sep 8', cumulativePnl: 4950, dailyPnl: 1550 },
  { date: 'Sep 9', cumulativePnl: 4600, dailyPnl: -350 },
  { date: 'Sep 10', cumulativePnl: 6850, dailyPnl: 2250 },
];

const PNL_DATA_30D: PnlDataPoint[] = [
  { date: 'Aug 12', cumulativePnl: 500, dailyPnl: 500 },
  { date: 'Aug 16', cumulativePnl: 1800, dailyPnl: 1300 },
  { date: 'Aug 20', cumulativePnl: 1400, dailyPnl: -400 },
  { date: 'Aug 24', cumulativePnl: 3100, dailyPnl: 1700 },
  { date: 'Aug 28', cumulativePnl: 4200, dailyPnl: 1100 },
  { date: 'Sep 1', cumulativePnl: 3900, dailyPnl: -300 },
  { date: 'Sep 5', cumulativePnl: 5800, dailyPnl: 1900 },
  { date: 'Sep 10', cumulativePnl: 8450, dailyPnl: 2650 },
];

export const usePnlStore = create<PnlState>((set) => ({
  timeframe: '30D',
  netProfit: 8450.75,
  netProfitPercent: 18.75,
  winRate: 68.4,
  totalTrades: 38,
  profitableTrades: 26,
  lossTrades: 12,
  bestTrade: {
    pair: 'BTC/USDT',
    profit: 2650.00,
    percent: 14.8,
    date: 'Sep 9, 2026',
  },
  worstTrade: {
    pair: 'DOGE/USDT',
    loss: -450.00,
    percent: -6.2,
    date: 'Sep 6, 2026',
  },
  pnlData: PNL_DATA_30D,

  setTimeframe: (timeframe) => {
    const data = timeframe === '7D' ? PNL_DATA_7D : PNL_DATA_30D;
    const net = data[data.length - 1].cumulativePnl;
    set({
      timeframe,
      pnlData: data,
      netProfit: net,
    });
  },
}));
