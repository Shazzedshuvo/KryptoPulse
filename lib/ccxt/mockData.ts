import { 
  SupportedExchange, 
  TickerData, 
  OHLCVCandle, 
  OrderBookData, 
  MarketTrade,
  ExchangeMeta
} from './types';

export const SUPPORTED_EXCHANGES: ExchangeMeta[] = [
  {
    id: 'binance',
    name: 'Binance',
    logo: 'https://assets.coingecko.com/markets/images/52/small/binance.jpg',
    makerFee: 0.001,
    takerFee: 0.001,
    docsUrl: 'https://www.binance.com/en/my/settings/api-management',
    wsSupported: true,
  },
  {
    id: 'bybit',
    name: 'Bybit',
    logo: 'https://assets.coingecko.com/markets/images/698/small/bybit_spot.png',
    makerFee: 0.001,
    takerFee: 0.001,
    docsUrl: 'https://www.bybit.com/app/user/api-management',
    wsSupported: true,
  },
  {
    id: 'kucoin',
    name: 'KuCoin',
    logo: 'https://assets.coingecko.com/markets/images/61/small/kucoin.png',
    makerFee: 0.001,
    takerFee: 0.001,
    docsUrl: 'https://www.kucoin.com/account/api',
    wsSupported: true,
  },
  {
    id: 'okx',
    name: 'OKX',
    logo: 'https://assets.coingecko.com/markets/images/96/small/WeChat_Image_20211105171545.png',
    makerFee: 0.0008,
    takerFee: 0.001,
    docsUrl: 'https://www.okx.com/account/my-api',
    wsSupported: true,
  },
  {
    id: 'coinbase',
    name: 'Coinbase Advanced',
    logo: 'https://assets.coingecko.com/markets/images/23/small/Coinbase_Coin_Primary.png',
    makerFee: 0.004,
    takerFee: 0.006,
    docsUrl: 'https://www.coinbase.com/settings/api',
    wsSupported: true,
  },
  {
    id: 'kraken',
    name: 'Kraken',
    logo: 'https://assets.coingecko.com/markets/images/29/small/kraken.jpg',
    makerFee: 0.0016,
    takerFee: 0.0026,
    docsUrl: 'https://www.kraken.com/u/security/api',
    wsSupported: true,
  },
];

export const POPULAR_PAIRS = [
  { symbol: 'BTC/USDT', base: 'BTC', quote: 'USDT', basePrice: 91420.50, change: 2.84 },
  { symbol: 'ETH/USDT', base: 'ETH', quote: 'USDT', basePrice: 3280.10, change: -1.15 },
  { symbol: 'SOL/USDT', base: 'SOL', quote: 'USDT', basePrice: 215.75, change: 5.42 },
  { symbol: 'BNB/USDT', base: 'BNB', quote: 'USDT', basePrice: 654.30, change: 0.78 },
  { symbol: 'XRP/USDT', base: 'XRP', quote: 'USDT', basePrice: 1.4850, change: 12.30 },
  { symbol: 'DOGE/USDT', base: 'DOGE', quote: 'USDT', basePrice: 0.2450, change: -3.20 },
  { symbol: 'ADA/USDT', base: 'ADA', quote: 'USDT', basePrice: 0.8650, change: 4.10 },
  { symbol: 'AVAX/USDT', base: 'AVAX', quote: 'USDT', basePrice: 38.40, change: 1.65 },
];

/**
 * Generates realistic synthetic OHLCV candles
 */
export function generateSyntheticOHLCV(
  basePrice: number = 91400,
  count: number = 100,
  timeframe: string = '1h'
): OHLCVCandle[] {
  const candles: OHLCVCandle[] = [];
  const now = Math.floor(Date.now() / 1000);
  
  let stepSec = 3600;
  if (timeframe === '1m') stepSec = 60;
  if (timeframe === '5m') stepSec = 300;
  if (timeframe === '15m') stepSec = 900;
  if (timeframe === '4h') stepSec = 14400;
  if (timeframe === '1D') stepSec = 86400;
  
  let currentClose = basePrice * 0.94; // start slightly lower for upward trend
  
  for (let i = count; i >= 0; i--) {
    const time = now - i * stepSec;
    const volatility = currentClose * 0.008;
    const drift = (Math.random() - 0.48) * volatility;
    
    const open = currentClose;
    const close = Math.max(1, open + drift);
    const high = Math.max(open, close) + Math.random() * (volatility * 0.7);
    const low = Math.min(open, close) - Math.random() * (volatility * 0.7);
    const volume = Math.floor(10 + Math.random() * 250);
    
    candles.push({
      time,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume,
    });
    
    currentClose = close;
  }
  
  return candles;
}

/**
 * Generates order book depth entries for Asks and Bids
 */
export function generateSyntheticOrderBook(
  symbol: string = 'BTC/USDT',
  exchange: SupportedExchange = 'binance',
  midPrice: number = 91420
): OrderBookData {
  const asks = [];
  const bids = [];
  
  const step = midPrice * 0.0003;
  let askRunningTotal = 0;
  let bidRunningTotal = 0;
  
  // 15 Asks (Sell orders above market)
  for (let i = 1; i <= 15; i++) {
    const price = midPrice + i * step + (Math.random() * step * 0.3);
    const amount = Number((0.05 + Math.random() * 1.8).toFixed(4));
    askRunningTotal += amount;
    asks.push({
      price: Number(price.toFixed(2)),
      amount,
      total: Number(askRunningTotal.toFixed(4)),
    });
  }
  
  // 15 Bids (Buy orders below market)
  for (let i = 1; i <= 15; i++) {
    const price = midPrice - i * step - (Math.random() * step * 0.3);
    const amount = Number((0.05 + Math.random() * 1.8).toFixed(4));
    bidRunningTotal += amount;
    bids.push({
      price: Number(price.toFixed(2)),
      amount,
      total: Number(bidRunningTotal.toFixed(4)),
    });
  }
  
  const lowestAsk = asks[0]?.price || midPrice;
  const highestBid = bids[0]?.price || midPrice;
  const spread = Math.max(0.01, lowestAsk - highestBid);
  const spreadPercent = (spread / midPrice) * 100;
  
  return {
    symbol,
    exchange,
    timestamp: Date.now(),
    asks,
    bids,
    spread: Number(spread.toFixed(2)),
    spreadPercent: Number(spreadPercent.toFixed(4)),
  };
}

/**
 * Generates recent executed trades
 */
export function generateSyntheticTrades(midPrice: number = 91420, count: number = 20): MarketTrade[] {
  const trades: MarketTrade[] = [];
  const now = Date.now();
  
  for (let i = 0; i < count; i++) {
    const isBuy = Math.random() > 0.48;
    const offset = (Math.random() - 0.5) * (midPrice * 0.001);
    const price = Number((midPrice + offset).toFixed(2));
    const amount = Number((0.01 + Math.random() * 0.85).toFixed(4));
    
    trades.push({
      id: `trade-${now - i * 1500}`,
      price,
      amount,
      side: isBuy ? 'buy' : 'sell',
      time: now - i * 1500 - Math.floor(Math.random() * 800),
    });
  }
  
  return trades;
}
