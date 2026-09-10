import { NextRequest, NextResponse } from 'next/server';
import { getExchangeInstance } from '@/lib/ccxt/client';
import { decryptSecret } from '@/lib/encryption/cipher';
import { SupportedExchange, ExchangeBalance } from '@/lib/ccxt/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { exchange, encryptedKey, encryptedSecret, isSimulated } = body;

    // If simulated or demo mode
    if (isSimulated || !encryptedKey) {
      const simulatedBalance: ExchangeBalance = {
        exchange: (exchange as SupportedExchange) || 'binance',
        totalUsdValue: 184520.45,
        balances: [
          { asset: 'USDT', free: 45000.00, locked: 2500.00, total: 47500.00, usdValue: 47500.00, change24h: 0.01 },
          { asset: 'BTC', free: 1.1500, locked: 0.1000, total: 1.2500, usdValue: 114275.60, change24h: 2.84 },
          { asset: 'ETH', free: 4.8000, locked: 0.2000, total: 5.0000, usdValue: 16400.50, change24h: -1.15 },
          { asset: 'SOL', free: 28.500, locked: 1.500, total: 30.000, usdValue: 6472.50, change24h: 5.42 },
          { asset: 'BNB', free: 6.0000, locked: 0.0000, total: 6.0000, usdValue: 3925.80, change24h: 0.78 },
          { asset: 'XRP', free: 1500.0, locked: 0.0000, total: 1500.0, usdValue: 2227.50, change24h: 12.30 },
        ],
      };

      return NextResponse.json({
        success: true,
        data: simulatedBalance,
      });
    }

    // Live exchange balance fetch via CCXT
    const apiKey = decryptSecret(encryptedKey);
    const secret = decryptSecret(encryptedSecret);

    const client = getExchangeInstance(exchange as SupportedExchange, { apiKey, secret });
    const rawBalance = await client.fetchBalance();

    const nonZeroBalances = Object.keys(rawBalance.total || {})
      .filter((asset) => (rawBalance.total[asset] || 0) > 0)
      .map((asset) => ({
        asset,
        free: rawBalance.free[asset] || 0,
        locked: rawBalance.used[asset] || 0,
        total: rawBalance.total[asset] || 0,
        usdValue: (rawBalance.total[asset] || 0) * (asset === 'USDT' || asset === 'USDC' ? 1 : 0), // rough baseline
      }));

    return NextResponse.json({
      success: true,
      data: {
        exchange,
        totalUsdValue: nonZeroBalances.reduce((acc, b) => acc + b.usdValue, 0),
        balances: nonZeroBalances,
      },
    });
  } catch (error: any) {
    console.error('Balance fetch error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch balance from exchange' },
      { status: 500 }
    );
  }
}
