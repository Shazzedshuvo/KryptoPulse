# KryptoPulse PRO ⚡

> **Next-Generation Non-Custodial Cryptocurrency Market Capitalization & Multi-Exchange Trading Hub**

KryptoPulse delivers institutional-grade crypto intelligence, live 7-day sparklines, depth charts, drawing tools, live CCXT-powered multi-exchange trading (Binance, Bybit, KuCoin, OKX), an interactive P&L performance dashboard, and a Super Admin control panel.

---

## 🚀 Key Features

- 📊 **CoinMarketCap-Style Ranking**: Real-time market cap rankings, 1h/24h/7d percentage changes, dynamic SVG 7-day sparklines, circulating supply progress bars, and live tick price updates.
- 📈 **Pro Trading Terminal**: TradingView Lightweight Charts with candlestick data, interactive drawing tools (Trendlines, Horizontal lines, Color selector), technical indicators (SMA 20, EMA 21, Bollinger Bands, Volume), order books, and real-time trade feed.
- ⚡ **Non-Custodial Architecture**: Users connect their own exchange API keys (read/trade scoped). The platform never takes custody of user funds.
- 🔄 **Live Crypto & Fiat Converter**: Bi-directional conversion supporting BTC, ETH, SOL, BNB, DOGE to USD, EUR, GBP, and BDT.
- 💼 **User Profile & P&L Analytics**: Cumulative P&L curve, daily profit/loss bars, win-rate analysis, and detailed execution fill history.
- 🛡️ **Super Admin Control Center**: Gateway controls, user management (KYC toggle, role elevation, suspension), and security audit logs.
- 💰 **Instant Crypto Deposit Simulation**: Multi-network support (TRC-20, ERC-20, BEP-20, Solana) with QR code generators and virtual top-ups.
- 🌓 **Dark & Light Mode**: Fluid, high-contrast theme toggling.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Lucide Icons
- **Charting**: TradingView `lightweight-charts` + Custom SVG Bezier Sparklines
- **Exchange Connectivity**: CCXT (Binance, Bybit, OKX, KuCoin, Coinbase, Kraken)
- **State Management**: Zustand
- **Security**: AES-256-GCM Encryption for API Keys

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to experience KryptoPulse.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## 👑 Super Admin Control Portal Access

The platform features an isolated, restricted-access Super Admin Control Portal for total platform management (user balances, deposit/withdrawal approval, trader activity monitor, and leaderboard):

- **Secret URL Route**: `/super-admin` (e.g. `http://localhost:3000/super-admin`)
- **Administrator Username**: `superadmin`
- **Master Security Password**: `kryptopulse2026`

> ⚠️ **Security Notice**: This route is intentionally isolated and not accessible from normal public user navigation. Only the designated administrator can log in.

---

## 📄 License
MIT © 2026 KryptoPulse. All rights reserved.
