import { NextRequest, NextResponse } from 'next/server';
import { CMC_TOP_COINS } from '@/lib/cmc/coinsData';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const limit = parseInt(searchParams.get('limit') || '50', 10);

  let result = [...CMC_TOP_COINS];

  if (category && category !== 'All') {
    result = result.filter((c) => c.category === category);
  }

  return NextResponse.json({
    status: {
      timestamp: new Date().toISOString(),
      error_code: 0,
      error_message: null,
      total_count: result.length,
    },
    data: result.slice(0, limit),
  });
}
