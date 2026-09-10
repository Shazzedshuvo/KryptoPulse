import { NextRequest, NextResponse } from 'next/server';
import { fetchExchangeTicker } from '@/lib/ccxt/client';
import { SupportedExchange } from '@/lib/ccxt/types';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const exchange = (searchParams.get('exchange') || 'binance') as SupportedExchange;
  const symbol = searchParams.get('symbol') || 'BTC/USDT';

  try {
    const ticker = await fetchExchangeTicker(exchange, symbol);
    return NextResponse.json({ success: true, data: ticker });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch ticker' },
      { status: 500 }
    );
  }
}
