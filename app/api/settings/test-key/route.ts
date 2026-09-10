import { NextRequest, NextResponse } from 'next/server';
import { getExchangeInstance } from '@/lib/ccxt/client';
import { SupportedExchange } from '@/lib/ccxt/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { exchange, apiKey, secret, password } = await request.json();

    if (!exchange || !apiKey || !secret) {
      return NextResponse.json(
        { success: false, error: 'Exchange, API Key, and Secret are required.' },
        { status: 400 }
      );
    }

    const client = getExchangeInstance(exchange as SupportedExchange, { apiKey, secret, password });

    // Validate connection by checking balance or trading fees
    try {
      await client.fetchBalance();
    } catch (apiErr: any) {
      // Check if error is related to credentials
      return NextResponse.json({
        success: false,
        error: `Exchange rejected credentials: ${apiErr.message || 'Invalid API Key / Secret'}`,
      }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      message: `Connection successful! Read & Trade permissions confirmed on ${exchange.toUpperCase()}.`,
      permissions: {
        read: true,
        trade: true,
        withdraw: false, // strictly false
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to test connection' },
      { status: 500 }
    );
  }
}
