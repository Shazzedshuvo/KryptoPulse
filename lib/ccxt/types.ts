export type SupportedExchange = 'binance' | 'bybit' | 'kucoin' | 'okx' | 'coinbase' | 'kraken';

export interface ExchangeMeta {
  id: SupportedExchange;
  name: string;
  logo: string;
  makerFee: number;
  takerFee: number;
  docsUrl: string;
  wsSupported: boolean;
}

export interface TickerData {
  symbol: string;
  exchange: SupportedExchange;
  lastPrice: number;
  high24h: number;
  low24h: number;
  change24h: number;
  changePercent24h: number;
  volume24h: number;
  volumeQuote24h: number;
  timestamp: number;
}

export interface OHLCVCandle {
  time: number; // Unix timestamp in seconds or milliseconds
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
}

export interface OrderBookData {
  symbol: string;
  exchange: SupportedExchange;
  timestamp: number;
  asks: OrderBookEntry[];
  bids: OrderBookEntry[];
  spread: number;
  spreadPercent: number;
}

export interface MarketTrade {
  id: string;
  price: number;
  amount: number;
  side: 'buy' | 'sell';
  time: number;
}

export type OrderType = 'limit' | 'market' | 'stop_limit';
export type OrderSide = 'buy' | 'sell';
export type OrderStatus = 'open' | 'closed' | 'canceled' | 'rejected';

export interface TradeOrder {
  id: string;
  clientOrderId?: string;
  exchange: SupportedExchange;
  symbol: string;
  type: OrderType;
  side: OrderSide;
  price: number;
  stopPrice?: number;
  amount: number;
  filled: number;
  remaining: number;
  cost: number;
  status: OrderStatus;
  timestamp: number;
  isSimulated?: boolean;
}

export interface AssetBalance {
  asset: string;
  free: number;
  locked: number;
  total: number;
  usdValue: number;
  change24h?: number;
}

export interface ExchangeBalance {
  exchange: SupportedExchange;
  totalUsdValue: number;
  balances: AssetBalance[];
}
