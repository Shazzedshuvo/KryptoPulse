import { create } from 'zustand';
import { 
  SupportedExchange, 
  TickerData, 
  OrderBookData, 
  MarketTrade, 
  TradeOrder, 
  OHLCVCandle 
} from '../ccxt/types';

export interface TradingState {
  activeSymbol: string; // e.g. "BTC/USDT"
  activeExchange: SupportedExchange;
  timeframe: string; // '1m' | '5m' | '15m' | '1h' | '4h' | '1D'
  chartType: 'candlestick' | 'line';
  showVolume: boolean;
  showSMA: boolean;
  showEMA: boolean;
  
  ticker: TickerData | null;
  candles: OHLCVCandle[];
  orderBook: OrderBookData | null;
  recentTrades: MarketTrade[];
  openOrders: TradeOrder[];
  orderHistory: TradeOrder[];
  
  // Balances
  usdtBalance: number;
  cryptoBalance: number;
  
  // Actions
  setActiveSymbol: (symbol: string) => void;
  setActiveExchange: (exchange: SupportedExchange) => void;
  setTimeframe: (tf: string) => void;
  setChartType: (type: 'candlestick' | 'line') => void;
  toggleVolume: () => void;
  toggleSMA: () => void;
  toggleEMA: () => void;
  
  setTicker: (ticker: TickerData) => void;
  setCandles: (candles: OHLCVCandle[]) => void;
  setOrderBook: (ob: OrderBookData) => void;
  addRecentTrade: (trade: MarketTrade) => void;
  setRecentTrades: (trades: MarketTrade[]) => void;
  
  placeOrder: (order: Omit<TradeOrder, 'id' | 'timestamp' | 'status' | 'filled' | 'remaining' | 'cost'>) => TradeOrder;
  cancelOrder: (orderId: string) => void;
  cancelAllOrders: () => void;
  resetDemoBalances: () => void;
}

export const useTradingStore = create<TradingState>((set, get) => ({
  activeSymbol: 'BTC/USDT',
  activeExchange: 'binance',
  timeframe: '1h',
  chartType: 'candlestick',
  showVolume: true,
  showSMA: true,
  showEMA: false,
  
  ticker: null,
  candles: [],
  orderBook: null,
  recentTrades: [],
  openOrders: [
    {
      id: 'ord-sim-101',
      exchange: 'binance',
      symbol: 'BTC/USDT',
      type: 'limit',
      side: 'buy',
      price: 88500,
      amount: 0.25,
      filled: 0,
      remaining: 0.25,
      cost: 22125,
      status: 'open',
      timestamp: Date.now() - 3600000 * 2,
      isSimulated: true,
    },
    {
      id: 'ord-sim-102',
      exchange: 'binance',
      symbol: 'BTC/USDT',
      type: 'limit',
      side: 'sell',
      price: 94000,
      amount: 0.15,
      filled: 0,
      remaining: 0.15,
      cost: 14100,
      status: 'open',
      timestamp: Date.now() - 3600000 * 5,
      isSimulated: true,
    }
  ],
  orderHistory: [
    {
      id: 'ord-sim-099',
      exchange: 'binance',
      symbol: 'BTC/USDT',
      type: 'market',
      side: 'buy',
      price: 89120,
      amount: 0.5,
      filled: 0.5,
      remaining: 0,
      cost: 44560,
      status: 'closed',
      timestamp: Date.now() - 86400000,
      isSimulated: true,
    }
  ],
  
  usdtBalance: 45000.00,
  cryptoBalance: 1.25,
  
  setActiveSymbol: (symbol) => set({ activeSymbol: symbol }),
  setActiveExchange: (exchange) => set({ activeExchange: exchange }),
  setTimeframe: (timeframe) => set({ timeframe }),
  setChartType: (chartType) => set({ chartType }),
  toggleVolume: () => set((s) => ({ showVolume: !s.showVolume })),
  toggleSMA: () => set((s) => ({ showSMA: !s.showSMA })),
  toggleEMA: () => set((s) => ({ showEMA: !s.showEMA })),
  
  setTicker: (ticker) => set({ ticker }),
  setCandles: (candles) => set({ candles }),
  setOrderBook: (orderBook) => set({ orderBook }),
  addRecentTrade: (trade) =>
    set((s) => ({
      recentTrades: [trade, ...s.recentTrades.slice(0, 49)],
    })),
  setRecentTrades: (recentTrades) => set({ recentTrades }),
  
  placeOrder: (orderData) => {
    const currentPrice = get().ticker?.lastPrice || orderData.price || 90000;
    const executionPrice = orderData.type === 'market' ? currentPrice : orderData.price;
    const cost = executionPrice * orderData.amount;
    
    const newOrder: TradeOrder = {
      id: `ord-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      exchange: orderData.exchange,
      symbol: orderData.symbol,
      type: orderData.type,
      side: orderData.side,
      price: executionPrice,
      stopPrice: orderData.stopPrice,
      amount: orderData.amount,
      filled: orderData.type === 'market' ? orderData.amount : 0,
      remaining: orderData.type === 'market' ? 0 : orderData.amount,
      cost: cost,
      status: orderData.type === 'market' ? 'closed' : 'open',
      timestamp: Date.now(),
      isSimulated: true,
    };
    
    // Balance update
    if (orderData.type === 'market') {
      if (orderData.side === 'buy') {
        set((s) => ({
          usdtBalance: Math.max(0, s.usdtBalance - cost),
          cryptoBalance: s.cryptoBalance + orderData.amount,
          orderHistory: [newOrder, ...s.orderHistory],
        }));
      } else {
        set((s) => ({
          usdtBalance: s.usdtBalance + cost,
          cryptoBalance: Math.max(0, s.cryptoBalance - orderData.amount),
          orderHistory: [newOrder, ...s.orderHistory],
        }));
      }
    } else {
      // Limit order holds usdt or crypto
      if (orderData.side === 'buy') {
        set((s) => ({
          usdtBalance: Math.max(0, s.usdtBalance - cost),
          openOrders: [newOrder, ...s.openOrders],
        }));
      } else {
        set((s) => ({
          cryptoBalance: Math.max(0, s.cryptoBalance - orderData.amount),
          openOrders: [newOrder, ...s.openOrders],
        }));
      }
    }
    
    return newOrder;
  },
  
  cancelOrder: (orderId) => {
    const target = get().openOrders.find((o) => o.id === orderId);
    if (!target) return;
    
    // Refund balance
    if (target.side === 'buy') {
      set((s) => ({
        usdtBalance: s.usdtBalance + target.cost,
        openOrders: s.openOrders.filter((o) => o.id !== orderId),
      }));
    } else {
      set((s) => ({
        cryptoBalance: s.cryptoBalance + target.amount,
        openOrders: s.openOrders.filter((o) => o.id !== orderId),
      }));
    }
  },
  
  cancelAllOrders: () => {
    const orders = get().openOrders;
    let usdtRefund = 0;
    let cryptoRefund = 0;
    
    orders.forEach((o) => {
      if (o.side === 'buy') usdtRefund += o.cost;
      else cryptoRefund += o.amount;
    });
    
    set((s) => ({
      usdtBalance: s.usdtBalance + usdtRefund,
      cryptoBalance: s.cryptoBalance + cryptoRefund,
      openOrders: [],
    }));
  },
  
  resetDemoBalances: () =>
    set({
      usdtBalance: 50000.0,
      cryptoBalance: 1.5,
      openOrders: [],
    }),
}));
