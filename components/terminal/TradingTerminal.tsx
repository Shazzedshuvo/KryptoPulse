'use client';

import React, { useState } from 'react';
import { MarketHeader } from './MarketHeader';
import { TradingChart } from './TradingChart';
import { OrderBook } from './OrderBook';
import { RecentTrades } from './RecentTrades';
import { OrderForm } from './OrderForm';
import { TerminalBottomTabs } from './TerminalBottomTabs';

export const TradingTerminal: React.FC = () => {
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [rightPanelTab, setRightPanelTab] = useState<'order' | 'trades'>('order');

  return (
    <div className="flex-1 flex flex-col w-full bg-slate-50 dark:bg-[#0b0e14] transition-colors duration-200">
      {/* 24h Market Status Bar */}
      <MarketHeader />

      {/* Main Terminal Middle Row */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 border-b border-slate-200 dark:border-[#1f293d]">
        {/* Chart Column (Flexible Left Area) */}
        <div className="flex-1 min-w-0 flex flex-col min-h-[420px] lg:min-h-[500px]">
          <TradingChart />
        </div>

        {/* Order Book Column (Fixed Width Desktop) */}
        <div className="w-full lg:w-[280px] xl:w-[320px] shrink-0 min-h-[350px] lg:min-h-[500px]">
          <OrderBook onSelectPrice={(price) => setSelectedPrice(price)} />
        </div>

        {/* Right Execution & Trades Column */}
        <div className="w-full lg:w-[320px] xl:w-[340px] shrink-0 flex flex-col min-h-[450px] lg:min-h-[500px] bg-white dark:bg-[#121722] border-l border-slate-200 dark:border-[#1f293d]">
          {/* Mobile Tab Switcher between Order Form and Recent Trades */}
          <div className="flex lg:hidden items-center border-b border-slate-200 dark:border-[#1f293d] p-1 bg-slate-50 dark:bg-[#0b0e14]">
            <button
              onClick={() => setRightPanelTab('order')}
              className={`flex-1 py-1 text-xs font-semibold rounded ${
                rightPanelTab === 'order'
                  ? 'bg-white dark:bg-[#182030] text-emerald-500'
                  : 'text-slate-500'
              }`}
            >
              Trade Form
            </button>
            <button
              onClick={() => setRightPanelTab('trades')}
              className={`flex-1 py-1 text-xs font-semibold rounded ${
                rightPanelTab === 'trades'
                  ? 'bg-white dark:bg-[#182030] text-emerald-500'
                  : 'text-slate-500'
              }`}
            >
              Recent Trades
            </button>
          </div>

          {/* Desktop: Order Form is on top, or toggleable */}
          <div className="flex-1 flex flex-col">
            <div className={`${rightPanelTab === 'trades' ? 'hidden lg:block' : 'block'} flex-1`}>
              <OrderForm prefilledPrice={selectedPrice} />
            </div>
            <div className={`${rightPanelTab === 'order' ? 'hidden lg:block' : 'block'} h-[220px] border-t border-slate-200 dark:border-[#1f293d]`}>
              <RecentTrades />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Open Orders, Trade History & Asset Balances */}
      <TerminalBottomTabs />
    </div>
  );
};
