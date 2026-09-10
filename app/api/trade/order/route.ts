import { NextRequest, NextResponse } from 'next/server';
import { getExchangeInstance } from '@/lib/ccxt/client';
import { decryptSecret } from '@/lib/encryption/cipher';
import { SupportedExchange } from '@/lib/ccxt/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      exchange, 
      symbol, 
      type, 
      side, 
      amount, 
      price, 
      isSimulated, 
      encryptedKey, 
      encryptedSecret 
    } = body;

    // Safety guardrails
    if (!exchange || !symbol || !type || !side || !amount) {
      return NextResponse.json(
        { success: false, error: 'Missing required order parameters.' },
        { status: 400 }
      );
    }

    if (amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Order amount must be greater than 0.' },
        { status: 400 }
      );
    }

    // Simulation / Paper trading mode execution
    if (isSimulated || !encryptedKey) {
      const simulatedOrder = {
        id: `sim-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        exchange,
        symbol,
        type,
        side,
        price: price || 91400,
        amount,
        cost: (price || 91400) * amount,
        filled: type === 'market' ? amount : 0,
        remaining: type === 'market' ? 0 : amount,
        status: type === 'market' ? 'closed' : 'open',
        timestamp: Date.now(),
        isSimulated: true,
      };

      return NextResponse.json({
        success: true,
        message: `Simulated ${type.toUpperCase()} ${side.toUpperCase()} order executed!`,
        data: simulatedOrder,
      });
    }

    // Real exchange execution via CCXT
    const apiKey = decryptSecret(encryptedKey);
    const secret = decryptSecret(encryptedSecret);

    const client = getExchangeInstance(exchange as SupportedExchange, { apiKey, secret });
    const normalizedSymbol = symbol.replace('-', '/').toUpperCase();
    
    // Execute on exchange
    let exchangeOrder;
    if (type === 'market') {
      exchangeOrder = await client.createOrder(normalizedSymbol, 'market', side, amount);
    } else {
      exchangeOrder = await client.createOrder(normalizedSymbol, 'limit', side, amount, price);
    }

    return NextResponse.json({
      success: true,
      message: `Live ${type.toUpperCase()} ${side.toUpperCase()} order placed on ${exchange}!`,
      data: exchangeOrder,
    });
  } catch (error: any) {
    console.error('Order placement error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to execute order on exchange' },
      { status: 500 }
    );
  }
}
