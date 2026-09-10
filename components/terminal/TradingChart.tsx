'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
  createChart, 
  IChartApi, 
  ISeriesApi, 
  CandlestickData, 
  HistogramData,
  LineData,
  ColorType 
} from 'lightweight-charts';
import { 
  BarChart2, 
  Activity, 
  Layers, 
  RefreshCw, 
  MousePointer, 
  TrendingUp, 
  Minus, 
  Trash2, 
  Palette,
  Sparkles
} from 'lucide-react';
import { useTradingStore } from '@/lib/store/useTradingStore';
import { useThemeStore } from '@/lib/store/useThemeStore';

const TIMEFRAMES = ['1m', '5m', '15m', '1h', '4h', '1D'];

export type DrawingTool = 'cursor' | 'trendline' | 'horizontal' | 'ray';

export interface DrawnLine {
  id: string;
  type: DrawingTool;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  price?: number;
}

export const TradingChart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<'Histogram'> | null>(null);
  const smaSeriesRef = useRef<ISeriesApi<'Line'> | null>(null);
  const emaSeriesRef = useRef<ISeriesApi<'Line'> | null>(null);
  const bbUpperSeriesRef = useRef<ISeriesApi<'Line'> | null>(null);
  const bbLowerSeriesRef = useRef<ISeriesApi<'Line'> | null>(null);

  const { 
    activeSymbol, 
    activeExchange, 
    timeframe, 
    setTimeframe,
    showVolume, 
    toggleVolume,
    showSMA, 
    toggleSMA,
    showEMA,
    toggleEMA
  } = useTradingStore();

  const { theme } = useThemeStore();
  const [isLoading, setIsLoading] = useState(true);
  const [showBollinger, setShowBollinger] = useState(false);

  // Line Art / Drawing state
  const [activeTool, setActiveTool] = useState<DrawingTool>('cursor');
  const [drawColor, setDrawColor] = useState<string>('#f59e0b');
  const [drawnLines, setDrawnLines] = useState<DrawnLine[]>([]);
  const [currentLine, setCurrentLine] = useState<{ startX: number; startY: number; endX: number; endY: number } | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Helper to calculate Simple Moving Average (SMA)
  const calculateSMA = useCallback((data: CandlestickData[], period: number = 20): LineData[] => {
    const sma: LineData[] = [];
    for (let i = period - 1; i < data.length; i++) {
      let sum = 0;
      for (let j = 0; j < period; j++) {
        sum += data[i - j].close;
      }
      sma.push({
        time: data[i].time,
        value: Number((sum / period).toFixed(2)),
      });
    }
    return sma;
  }, []);

  // Helper to calculate Exponential Moving Average (EMA)
  const calculateEMA = useCallback((data: CandlestickData[], period: number = 21): LineData[] => {
    const ema: LineData[] = [];
    const k = 2 / (period + 1);
    let prevEma = data[0]?.close || 0;

    for (let i = 0; i < data.length; i++) {
      const price = data[i].close;
      const currentEma = i === 0 ? price : (price * k) + (prevEma * (1 - k));
      prevEma = currentEma;
      if (i >= period - 1) {
        ema.push({
          time: data[i].time,
          value: Number(currentEma.toFixed(2)),
        });
      }
    }
    return ema;
  }, []);

  // Helper to calculate Bollinger Bands (SMA +/- 2 StdDev)
  const calculateBollinger = useCallback((data: CandlestickData[], period: number = 20, multiplier: number = 2) => {
    const upper: LineData[] = [];
    const lower: LineData[] = [];

    for (let i = period - 1; i < data.length; i++) {
      let sum = 0;
      for (let j = 0; j < period; j++) {
        sum += data[i - j].close;
      }
      const mean = sum / period;

      let varianceSum = 0;
      for (let j = 0; j < period; j++) {
        varianceSum += Math.pow(data[i - j].close - mean, 2);
      }
      const stdDev = Math.sqrt(varianceSum / period);

      upper.push({ time: data[i].time, value: Number((mean + stdDev * multiplier).toFixed(2)) });
      lower.push({ time: data[i].time, value: Number((mean - stdDev * multiplier).toFixed(2)) });
    }

    return { upper, lower };
  }, []);

  // Fetch candles & render
  const loadChartData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `/api/market/ohlcv?exchange=${activeExchange}&symbol=${encodeURIComponent(
          activeSymbol
        )}&timeframe=${timeframe}&limit=120`
      );
      const json = await res.json();
      
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        const sortedCandles: CandlestickData[] = json.data
          .map((c: any) => ({
            time: c.time,
            open: c.open,
            high: c.high,
            low: c.low,
            close: c.close,
          }))
          .sort((a: any, b: any) => (a.time as number) - (b.time as number));

        if (candleSeriesRef.current) {
          candleSeriesRef.current.setData(sortedCandles);
        }

        if (volumeSeriesRef.current && showVolume) {
          const volumeData: HistogramData[] = json.data
            .map((c: any) => ({
              time: c.time,
              value: c.volume,
              color: c.close >= c.open ? 'rgba(14, 203, 129, 0.45)' : 'rgba(246, 70, 93, 0.45)',
            }))
            .sort((a: any, b: any) => (a.time as number) - (b.time as number));
          volumeSeriesRef.current.setData(volumeData);
        }

        if (smaSeriesRef.current && showSMA) {
          const smaData = calculateSMA(sortedCandles, 20);
          smaSeriesRef.current.setData(smaData);
        }

        if (emaSeriesRef.current && showEMA) {
          const emaData = calculateEMA(sortedCandles, 21);
          emaSeriesRef.current.setData(emaData);
        }

        if (bbUpperSeriesRef.current && bbLowerSeriesRef.current && showBollinger) {
          const { upper, lower } = calculateBollinger(sortedCandles, 20, 2);
          bbUpperSeriesRef.current.setData(upper);
          bbLowerSeriesRef.current.setData(lower);
        }

        if (chartRef.current) {
          chartRef.current.timeScale().fitContent();
        }
      }
    } catch (err) {
      console.error('Error fetching chart candles:', err);
    } finally {
      setIsLoading(false);
    }
  }, [
    activeExchange, 
    activeSymbol, 
    timeframe, 
    showVolume, 
    showSMA, 
    showEMA, 
    showBollinger, 
    calculateSMA, 
    calculateEMA, 
    calculateBollinger
  ]);

  // Initialize or reconfigure chart
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const isDark = theme === 'dark';
    const bgColor = isDark ? '#121722' : '#ffffff';
    const textColor = isDark ? '#94a3b8' : '#64748b';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.05)';
    const borderColor = isDark ? '#1f293d' : '#e2e8f0';

    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight || 450,
      layout: {
        background: { type: ColorType.Solid, color: bgColor },
        textColor: textColor,
        fontFamily: 'Inter, -apple-system, sans-serif',
      },
      grid: {
        vertLines: { color: gridColor },
        horzLines: { color: gridColor },
      },
      crosshair: {
        vertLine: { color: isDark ? '#334155' : '#cbd5e1', width: 1, style: 3 },
        horzLine: { color: isDark ? '#334155' : '#cbd5e1', width: 1, style: 3 },
      },
      rightPriceScale: {
        borderColor: borderColor,
        scaleMargins: { top: 0.1, bottom: 0.2 },
      },
      timeScale: {
        borderColor: borderColor,
        timeVisible: true,
        secondsVisible: false,
      },
    });

    chartRef.current = chart;

    // Candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#0ecb81',
      downColor: '#f6465d',
      borderVisible: false,
      wickUpColor: '#0ecb81',
      wickDownColor: '#f6465d',
    });
    candleSeriesRef.current = candlestickSeries;

    // Volume series
    const volumeSeries = chart.addHistogramSeries({
      priceFormat: { type: 'volume' },
      priceScaleId: 'volume_scale',
    });
    chart.priceScale('volume_scale').applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
    });
    volumeSeriesRef.current = volumeSeries;

    // SMA Line
    const smaSeries = chart.addLineSeries({
      color: '#f59e0b',
      lineWidth: 2,
      title: 'SMA 20',
    });
    smaSeriesRef.current = smaSeries;

    // EMA Line
    const emaSeries = chart.addLineSeries({
      color: '#06b6d4',
      lineWidth: 2,
      title: 'EMA 21',
    });
    emaSeriesRef.current = emaSeries;

    // Bollinger Upper & Lower
    const bbUpper = chart.addLineSeries({
      color: 'rgba(168, 85, 247, 0.7)',
      lineWidth: 1,
      lineStyle: 2,
      title: 'BB Upper',
    });
    bbUpperSeriesRef.current = bbUpper;

    const bbLower = chart.addLineSeries({
      color: 'rgba(168, 85, 247, 0.7)',
      lineWidth: 1,
      lineStyle: 2,
      title: 'BB Lower',
    });
    bbLowerSeriesRef.current = bbLower;

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    loadChartData();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [theme, loadChartData]);

  useEffect(() => {
    loadChartData();
  }, [activeSymbol, activeExchange, timeframe, showBollinger, showSMA, showEMA, loadChartData]);

  // Drawing tools mouse events on overlay
  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (activeTool === 'cursor') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (activeTool === 'horizontal') {
      // Horizontal line spans entire width
      const newLine: DrawnLine = {
        id: `line-${Date.now()}`,
        type: 'horizontal',
        startX: 0,
        startY: y,
        endX: rect.width,
        endY: y,
        color: drawColor,
      };
      setDrawnLines((prev) => [...prev, newLine]);
      return;
    }

    setIsDrawing(true);
    setCurrentLine({ startX: x, startY: y, endX: x, endY: y });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDrawing || !currentLine) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCurrentLine((prev) => prev ? { ...prev, endX: x, endY: y } : null);
  };

  const handleMouseUp = () => {
    if (isDrawing && currentLine) {
      const newLine: DrawnLine = {
        id: `line-${Date.now()}`,
        type: activeTool,
        startX: currentLine.startX,
        startY: currentLine.startY,
        endX: currentLine.endX,
        endY: currentLine.endY,
        color: drawColor,
      };
      setDrawnLines((prev) => [...prev, newLine]);
    }
    setIsDrawing(false);
    setCurrentLine(null);
  };

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-[#121722] border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-[#1f293d] transition-colors select-none">
      {/* Chart Top Toolbar: Timeframes & Indicators */}
      <div className="flex flex-wrap items-center justify-between px-3 py-1.5 border-b border-slate-200 dark:border-[#1f293d] bg-slate-50/50 dark:bg-[#10141d] gap-2">
        {/* Timeframes */}
        <div className="flex items-center space-x-1">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2 py-1 text-xs font-mono rounded transition-colors ${
                timeframe === tf
                  ? 'bg-slate-200 dark:bg-[#1f293d] text-emerald-600 dark:text-emerald-400 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-[#182030]'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Indicators Toolbar ("ingarotar") */}
        <div className="flex items-center space-x-1.5 text-xs">
          {/* Volume toggle */}
          <button
            onClick={toggleVolume}
            className={`px-2 py-1 rounded border transition-colors flex items-center gap-1 ${
              showVolume
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:bg-slate-100 dark:hover:bg-[#182030]'
            }`}
            title="Toggle Volume Bars"
          >
            <BarChart2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Vol</span>
          </button>

          {/* SMA 20 */}
          <button
            onClick={toggleSMA}
            className={`px-2 py-1 rounded border transition-colors flex items-center gap-1 ${
              showSMA
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-slate-500 hover:bg-slate-100 dark:hover:bg-[#182030]'
            }`}
            title="Toggle SMA 20"
          >
            <Activity className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">SMA(20)</span>
          </button>

          {/* EMA 21 */}
          <button
            onClick={toggleEMA}
            className={`px-2 py-1 rounded border transition-colors flex items-center gap-1 ${
              showEMA
                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400'
                : 'border-transparent text-slate-500 hover:bg-slate-100 dark:hover:bg-[#182030]'
            }`}
            title="Toggle EMA 21"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">EMA(21)</span>
          </button>

          {/* Bollinger Bands */}
          <button
            onClick={() => setShowBollinger(!showBollinger)}
            className={`px-2 py-1 rounded border transition-colors flex items-center gap-1 ${
              showBollinger
                ? 'bg-purple-500/10 border-purple-500/30 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-slate-500 hover:bg-slate-100 dark:hover:bg-[#182030]'
            }`}
            title="Toggle Bollinger Bands (20, 2)"
          >
            <Layers className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Bollinger</span>
          </button>

          {/* Refresh */}
          <button
            onClick={loadChartData}
            disabled={isLoading}
            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-[#182030] text-slate-500 transition-colors"
            title="Refresh Candlesticks"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin text-emerald-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Canvas Area with Left Drawing Tools ("line art korar option") */}
      <div className="relative flex-1 min-h-[400px] lg:min-h-[480px] w-full flex">
        {/* Floating Vertical Drawing Tools Bar */}
        <div className="absolute left-2 top-3 z-30 flex flex-col p-1 rounded-xl bg-white/90 dark:bg-[#121722]/90 backdrop-blur-md border border-slate-200 dark:border-[#1f293d] shadow-lg space-y-1">
          {/* Cursor / Default */}
          <button
            onClick={() => setActiveTool('cursor')}
            className={`p-2 rounded-lg transition-colors ${
              activeTool === 'cursor'
                ? 'bg-emerald-500/20 text-emerald-500'
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-[#182030]'
            }`}
            title="Pan / Cursor Tool"
          >
            <MousePointer className="h-4 w-4" />
          </button>

          {/* Trendline Tool */}
          <button
            onClick={() => setActiveTool('trendline')}
            className={`p-2 rounded-lg transition-colors ${
              activeTool === 'trendline'
                ? 'bg-emerald-500/20 text-emerald-500'
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-[#182030]'
            }`}
            title="Trendline Drawing Tool"
          >
            <TrendingUp className="h-4 w-4" />
          </button>

          {/* Horizontal Line Tool (Support / Resistance) */}
          <button
            onClick={() => setActiveTool('horizontal')}
            className={`p-2 rounded-lg transition-colors ${
              activeTool === 'horizontal'
                ? 'bg-emerald-500/20 text-emerald-500'
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-[#182030]'
            }`}
            title="Horizontal Support/Resistance Line"
          >
            <Minus className="h-4 w-4" />
          </button>

          {/* Color Picker dots */}
          <div className="py-1 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center gap-1.5">
            {['#f59e0b', '#0ecb81', '#f6465d', '#06b6d4', '#ffffff'].map((c) => (
              <button
                key={c}
                onClick={() => setDrawColor(c)}
                style={{ backgroundColor: c }}
                className={`h-3 w-3 rounded-full transition-transform ${
                  drawColor === c ? 'ring-2 ring-emerald-500 scale-125' : 'hover:scale-110'
                }`}
                title={`Line Color: ${c}`}
              />
            ))}
          </div>

          {/* Clear Drawings */}
          {drawnLines.length > 0 && (
            <button
              onClick={() => setDrawnLines([])}
              className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors border-t border-slate-200 dark:border-slate-800"
              title="Clear All Drawings"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/40 dark:bg-[#121722]/60 backdrop-blur-[1px]">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-[#182030] shadow border border-slate-200 dark:border-[#1f293d] text-xs text-slate-700 dark:text-slate-300">
              <RefreshCw className="h-3.5 w-3.5 text-emerald-500 animate-spin" />
              <span>Updating Market Candles...</span>
            </div>
          </div>
        )}

        {/* Chart Canvas */}
        <div ref={chartContainerRef} className="h-full w-full" />

        {/* SVG Drawing Overlay (Line Art) */}
        <svg
          className={`absolute inset-0 w-full h-full ${
            activeTool !== 'cursor' ? 'cursor-crosshair z-20' : 'pointer-events-none z-10'
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* Committed Drawn Lines */}
          {drawnLines.map((line) => (
            <g key={line.id}>
              <line
                x1={line.startX}
                y1={line.startY}
                x2={line.endX}
                y2={line.endY}
                stroke={line.color}
                strokeWidth={2}
                strokeDasharray={line.type === 'horizontal' ? '4 4' : 'none'}
              />
              {line.type === 'horizontal' && (
                <text
                  x={15}
                  y={line.startY - 4}
                  fill={line.color}
                  fontSize={10}
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  SUPPORT / RESISTANCE
                </text>
              )}
            </g>
          ))}

          {/* Current In-progress Line */}
          {isDrawing && currentLine && (
            <line
              x1={currentLine.startX}
              y1={currentLine.startY}
              x2={currentLine.endX}
              y2={currentLine.endY}
              stroke={drawColor}
              strokeWidth={2}
              strokeDasharray="2 2"
            />
          )}
        </svg>
      </div>
    </div>
  );
};
