export interface CmcCoin {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  slug: string;
  logo: string;
  price: number;
  change1h: number;
  change24h: number;
  change7d: number;
  volume24h: number;
  marketCap: number;
  circulatingSupply: number;
  totalSupply?: number;
  maxSupply?: number | null;
  sparkline7d: number[];
  category: 'Layer 1' | 'Layer 2' | 'DeFi' | 'Meme' | 'AI & Big Data' | 'Solana Ecosystem' | 'Stablecoin';
  allTimeHigh?: number;
  allTimeLow?: number;
  high24h?: number;
  low24h?: number;
}

export interface GlobalMarketStats {
  cryptosCount: number;
  exchangesCount: number;
  marketCapUsd: number;
  marketCapChange24h: number;
  volume24hUsd: number;
  volumeChange24h: number;
  btcDominance: number;
  ethDominance: number;
  ethGasGwei: number;
  fearAndGreedScore: number;
  fearAndGreedLabel: string;
}

export interface ExchangeRanking {
  id: string;
  rank: number;
  name: string;
  logo: string;
  score: number; // 9.9, 8.7 etc.
  volume24hUsd: number;
  avgLiquidity: number;
  weeklyVisits: string;
  marketsCount: number;
  coinsCount: number;
  fiatSupported: string[];
}
