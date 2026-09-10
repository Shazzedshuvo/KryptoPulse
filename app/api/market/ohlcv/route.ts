import { NextRequest, NextResponse } from 'next/server';
import { fetchExchangeOHLCV } from '@/lib/ccxt/client';
import { SupportedExchange } from '@/lib/ccxt/types';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const exchange = (searchParams.get('exchange') || 'binance') as SupportedExchange;
  const symbol = searchParams.get('symbol') || 'BTC/USDT';
  const timeframe = searchParams.get('timeframe') || '1h';
  const limit = parseInt(searchParams.get('limit') || '100', 10);

  try {
    const candles = await fetchExchangeOHLCV(exchange, symbol, timeframe, limit);
    return NextResponse.json({ success: true, data: candles });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch OHLCV' },
      { status: 500 }
    );
  }
}
