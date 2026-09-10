'use client';

import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Calendar, BarChart2 } from 'lucide-react';
import { usePnlStore, PnlDataPoint } from '@/lib/store/usePnlStore';

export const PnlChart: React.FC = () => {
  const { timeframe, setTimeframe, pnlData, netProfit } = usePnlStore();
  const [hoveredPoint, setHoveredPoint] = useState<PnlDataPoint | null>(null);

  const isNetPositive = netProfit >= 0;

  // Chart coordinate calculations
  const width = 760;
  const height = 240;
  const padding = 30;

  const minVal = Math.min(0, ...pnlData.map((d) => d.cumulativePnl));
  const maxVal = Math.max(...pnlData.map((d) => d.cumulativePnl)) * 1.1;
  const valRange = maxVal - minVal || 1;

  const points = pnlData.map((d, i) => {
    const x = padding + (i / (pnlData.length - 1)) * (width - padding * 2);
    const y = height - padding - ((d.cumulativePnl - minVal) / valRange) * (height - padding * 2);
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-[#121722] border border-slate-200 dark:border-[#1a2233] shadow-sm select-none space-y-4">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-[#182030]">
        <div>
          <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400 block">
            Cumulative Profit & Loss (P&L) Performance
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span
              className={`text-2xl font-black font-mono ${
                isNetPositive ? 'text-emerald-500' : 'text-red-500'
              }`}
            >
              {isNetPositive ? '+' : ''}${netProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
            <span className="text-xs font-semibold text-emerald-500 font-mono">
              (+18.75% ROI)
            </span>
          </div>
        </div>

        {/* Timeframe Switcher */}
        <div className="flex items-center space-x-1 p-1 rounded-xl bg-slate-100 dark:bg-[#0b0e14] text-xs font-semibold self-start sm:self-auto">
          {(['7D', '30D', '90D', '1Y'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded-lg transition-all ${
                timeframe === tf
                  ? 'bg-white dark:bg-[#182030] text-emerald-500 shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Interactive Line Chart */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-56 overflow-visible"
        >
          <defs>
            <linearGradient id="pnlGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0ecb81" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0ecb81" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Zero baseline */}
          <line
            x1={padding}
            y1={height - padding - ((0 - minVal) / valRange) * (height - padding * 2)}
            x2={width - padding}
            y2={height - padding - ((0 - minVal) / valRange) * (height - padding * 2)}
            stroke="#64748b"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.3"
          />

          {/* Gradient Fill Area */}
          <path d={areaD} fill="url(#pnlGrad)" />

          {/* Line Curve */}
          <path
            d={pathD}
            fill="none"
            stroke="#0ecb81"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points & Interactive Nodes */}
          {points.map((p, idx) => (
            <g key={idx}>
              <circle
                cx={p.x}
                cy={p.y}
                r="4"
                className="fill-white dark:fill-[#121722] stroke-emerald-500 stroke-2 cursor-pointer hover:r-6 transition-all"
                onMouseEnter={() => setHoveredPoint(p)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
              <text
                x={p.x}
                y={height - 8}
                fontSize="10"
                fontFamily="monospace"
                fill="#94a3b8"
                textAnchor="middle"
              >
                {p.date}
              </text>
            </g>
          ))}
        </svg>

        {/* Hover Tooltip */}
        {hoveredPoint && (
          <div
            className="absolute top-2 right-4 p-2.5 rounded-xl bg-slate-900 text-white text-xs font-mono shadow-xl border border-slate-700 animate-in fade-in"
          >
            <div className="font-bold text-slate-300">{hoveredPoint.date}</div>
            <div className="text-emerald-400 font-bold mt-0.5">
              Cumulative: +${hoveredPoint.cumulativePnl.toLocaleString()}
            </div>
            <div className={`text-[11px] ${hoveredPoint.dailyPnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              Daily P&L: {hoveredPoint.dailyPnl >= 0 ? '+' : ''}${hoveredPoint.dailyPnl.toLocaleString()}
            </div>
          </div>
        )}
      </div>

      {/* Daily P&L Bars Section */}
      <div className="pt-4 border-t border-slate-100 dark:border-[#182030]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
            <BarChart2 className="h-3.5 w-3.5" />
            Daily Profit / Loss Distribution
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            Green = Profitable Day, Red = Loss Day
          </span>
        </div>

        <div className="grid grid-cols-7 sm:grid-cols-8 gap-2 font-mono text-center">
          {pnlData.map((d, i) => {
            const isPos = d.dailyPnl >= 0;
            return (
              <div
                key={i}
                className={`p-2 rounded-xl border transition-all ${
                  isPos
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                    : 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400'
                }`}
              >
                <span className="text-[10px] text-slate-400 block">{d.date}</span>
                <span className="font-bold text-xs block mt-0.5">
                  {isPos ? '+' : ''}${d.dailyPnl}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
