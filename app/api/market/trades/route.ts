import { NextRequest, NextResponse } from 'next/server';
import { fetchExchangeTrades } from '@/lib/ccxt/client';
import { SupportedExchange } from '@/lib/ccxt/types';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const exchange = (searchParams.get('exchange') || 'binance') as SupportedExchange;
  const symbol = searchParams.get('symbol') || 'BTC/USDT';
  const limit = parseInt(searchParams.get('limit') || '25', 10);

  try {
    const trades = await fetchExchangeTrades(exchange, symbol, limit);
    return NextResponse.json({ success: true, data: trades });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch trades' },
      { status: 500 }
    );
  }
}
