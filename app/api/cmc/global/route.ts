import { NextResponse } from 'next/server';
import { GLOBAL_MARKET_STATS } from '@/lib/cmc/globalData';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    status: {
      timestamp: new Date().toISOString(),
      error_code: 0,
      error_message: null,
    },
    data: GLOBAL_MARKET_STATS,
  });
}
