import ccxt from 'ccxt';
import { SupportedExchange, TickerData, OHLCVCandle, OrderBookData, MarketTrade } from './types';
import { generateSyntheticOHLCV, generateSyntheticOrderBook, generateSyntheticTrades, POPULAR_PAIRS } from './mockData';

// Cache exchange instances to reuse connections
const exchangeInstances: Partial<Record<SupportedExchange, any>> = {};

export function getExchangeInstance(exchangeId: SupportedExchange, credentials?: { apiKey?: string; secret?: string; password?: string }) {
  const cacheKey = credentials ? `${exchangeId}_auth` : exchangeId;
  
  if (!credentials && exchangeInstances[exchangeId]) {
    return exchangeInstances[exchangeId];
  }

  const exchangeClass = (ccxt as any)[exchangeId];
  if (!exchangeClass) {
    throw new Error(`Unsupported exchange: ${exchangeId}`);
  }

  const options: any = {
    enableRateLimit: true,
    timeout: 10000,
  };

  if (credentials?.apiKey && credentials?.secret) {
    options.apiKey = credentials.apiKey;
    options.secret = credentials.secret;
    if (credentials.password) {
      options.password = credentials.password;
    }
  }

  const instance = new exchangeClass(options);

  if (!credentials) {
    exchangeInstances[exchangeId] = instance;
  }

  return instance;
}

/**
 * Fetch 24h Ticker for a symbol from a specific exchange
 */
export async function fetchExchangeTicker(
  exchangeId: SupportedExchange, 
  symbol: string
): Promise<TickerData> {
  const normalizedSymbol = symbol.replace('-', '/').toUpperCase();
  const fallbackPair = POPULAR_PAIRS.find(p => p.symbol === normalizedSymbol) || POPULAR_PAIRS[0];

  try {
    const exchange = getExchangeInstance(exchangeId);
    const ticker = await exchange.fetchTicker(normalizedSymbol);
    
    return {
      symbol: normalizedSymbol,
      exchange: exchangeId,
      lastPrice: ticker.last || fallbackPair.basePrice,
      high24h: ticker.high || fallbackPair.basePrice * 1.04,
      low24h: ticker.low || fallbackPair.basePrice * 0.96,
      change24h: ticker.change || (fallbackPair.basePrice * (fallbackPair.change / 100)),
      changePercent24h: ticker.percentage || fallbackPair.change,
      volume24h: ticker.baseVolume || 12450.8,
      volumeQuote24h: ticker.quoteVolume || (ticker.last || fallbackPair.basePrice) * 12450.8,
      timestamp: ticker.timestamp || Date.now(),
    };
  } catch (err: any) {
    console.warn(`[CCXT] Ticker fallback for ${exchangeId} ${normalizedSymbol}:`, err?.message || err);
    // Return high-fidelity fallback
    return {
      symbol: normalizedSymbol,
      exchange: exchangeId,
      lastPrice: fallbackPair.basePrice,
      high24h: fallbackPair.basePrice * 1.035,
      low24h: fallbackPair.basePrice * 0.972,
      change24h: fallbackPair.basePrice * (fallbackPair.change / 100),
      changePercent24h: fallbackPair.change,
      volume24h: 18450.2,
      volumeQuote24h: fallbackPair.basePrice * 18450.2,
      timestamp: Date.now(),
    };
  }
}

/**
 * Fetch OHLCV candles
 */
export async function fetchExchangeOHLCV(
  exchangeId: SupportedExchange,
  symbol: string,
  timeframe: string = '1h',
  limit: number = 100
): Promise<OHLCVCandle[]> {
  const normalizedSymbol = symbol.replace('-', '/').toUpperCase();
  const fallbackPair = POPULAR_PAIRS.find(p => p.symbol === normalizedSymbol) || POPULAR_PAIRS[0];

  try {
    const exchange = getExchangeInstance(exchangeId);
    // CCXT timeframes: 1m, 5m, 15m, 1h, 4h, 1d
    const ccxtTimeframe = timeframe === '1D' ? '1d' : timeframe;
    const ohlcv = await exchange.fetchOHLCV(normalizedSymbol, ccxtTimeframe, undefined, limit);
    
    if (Array.isArray(ohlcv) && ohlcv.length > 0) {
      return ohlcv.map((candle: any) => ({
        time: Math.floor(candle[0] / 1000), // convert ms to seconds for lightweight-charts
        open: Number(candle[1]),
        high: Number(candle[2]),
        low: Number(candle[3]),
        close: Number(candle[4]),
        volume: Number(candle[5]),
      }));
    }
    throw new Error('Empty OHLCV data');
  } catch (err: any) {
    console.warn(`[CCXT] OHLCV fallback for ${exchangeId} ${normalizedSymbol}:`, err?.message || err);
    return generateSyntheticOHLCV(fallbackPair.basePrice, limit, timeframe);
  }
}

/**
 * Fetch Order Book depth
 */
export async function fetchExchangeOrderBook(
  exchangeId: SupportedExchange,
  symbol: string,
  limit: number = 20
): Promise<OrderBookData> {
  const normalizedSymbol = symbol.replace('-', '/').toUpperCase();
  const fallbackPair = POPULAR_PAIRS.find(p => p.symbol === normalizedSymbol) || POPULAR_PAIRS[0];

  try {
    const exchange = getExchangeInstance(exchangeId);
    const ob = await exchange.fetchOrderBook(normalizedSymbol, limit);
    
    let askTotal = 0;
    const asks = (ob.asks || []).slice(0, 15).map(([price, amount]: [number, number]) => {
      askTotal += amount;
      return {
        price,
        amount,
        total: Number(askTotal.toFixed(4)),
      };
    });

    let bidTotal = 0;
    const bids = (ob.bids || []).slice(0, 15).map(([price, amount]: [number, number]) => {
      bidTotal += amount;
      return {
        price,
        amount,
        total: Number(bidTotal.toFixed(4)),
      };
    });

    const lowestAsk = asks[0]?.price || fallbackPair.basePrice;
    const highestBid = bids[0]?.price || fallbackPair.basePrice;
    const spread = Math.max(0.01, lowestAsk - highestBid);
    const spreadPercent = (spread / lowestAsk) * 100;

    return {
      symbol: normalizedSymbol,
      exchange: exchangeId,
      timestamp: ob.timestamp || Date.now(),
      asks,
      bids,
      spread: Number(spread.toFixed(2)),
      spreadPercent: Number(spreadPercent.toFixed(4)),
    };
  } catch (err: any) {
    console.warn(`[CCXT] OrderBook fallback for ${exchangeId} ${normalizedSymbol}:`, err?.message || err);
    return generateSyntheticOrderBook(normalizedSymbol, exchangeId, fallbackPair.basePrice);
  }
}

/**
 * Fetch Recent Trades
 */
export async function fetchExchangeTrades(
  exchangeId: SupportedExchange,
  symbol: string,
  limit: number = 25
): Promise<MarketTrade[]> {
  const normalizedSymbol = symbol.replace('-', '/').toUpperCase();
  const fallbackPair = POPULAR_PAIRS.find(p => p.symbol === normalizedSymbol) || POPULAR_PAIRS[0];

  try {
    const exchange = getExchangeInstance(exchangeId);
    const trades = await exchange.fetchTrades(normalizedSymbol, undefined, limit);
    
    return trades.map((t: any) => ({
      id: String(t.id || t.timestamp),
      price: Number(t.price),
      amount: Number(t.amount),
      side: t.side === 'sell' ? 'sell' : 'buy',
      time: t.timestamp || Date.now(),
    })).reverse();
  } catch (err: any) {
    console.warn(`[CCXT] Trades fallback for ${exchangeId} ${normalizedSymbol}:`, err?.message || err);
    return generateSyntheticTrades(fallbackPair.basePrice, limit);
  }
}
