'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTradingStore } from '@/lib/store/useTradingStore';
import { TradingTerminal } from '@/components/terminal/TradingTerminal';

export default function TradePairPage() {
  const params = useParams();
  const { setActiveSymbol } = useTradingStore();

  useEffect(() => {
    if (params?.pair) {
      const rawPair = Array.isArray(params.pair) ? params.pair[0] : params.pair;
      const normalizedPair = decodeURIComponent(rawPair).replace('-', '/').toUpperCase();
      setActiveSymbol(normalizedPair);
    }
  }, [params, setActiveSymbol]);

  return <TradingTerminal />;
}
