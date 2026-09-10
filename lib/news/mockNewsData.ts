export interface CryptoNewsItem {
  id: string;
  title: string;
  summary: string;
  category: 'Bitcoin' | 'Ethereum' | 'DeFi' | 'Regulation' | 'Macro';
  source: string;
  timeAgo: string;
  url: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  readTime: string;
}

export interface TweetItem {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  verified: boolean;
  content: string;
  timeAgo: string;
  likes: string;
  retweets: string;
  url: string;
}

export interface LinkedInPostItem {
  id: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  timeAgo: string;
  likes: number;
  comments: number;
  url: string;
}

export const DAILY_CRYPTO_NEWS: CryptoNewsItem[] = [
  {
    id: 'news-1',
    title: 'Bitcoin Surges Above $91,000 as Institutional Spot ETF Inflows Reach New Records',
    summary: 'Spot Bitcoin exchange-traded funds recorded over $1.2B in net daily inflows led by BlackRock and Fidelity as institutional accumulation accelerates.',
    category: 'Bitcoin',
    source: 'CoinDesk',
    timeAgo: '25m ago',
    url: 'https://twitter.com',
    sentiment: 'bullish',
    readTime: '3 min read',
  },
  {
    id: 'news-2',
    title: 'Ethereum Layer 2 TVL Crosses $50 Billion Amid Dencun Upgrade Cost Reductions',
    summary: 'Arbitrum and Base lead user activity as average gas fees drop below $0.01 per transaction, boosting on-chain DEX trading volume.',
    category: 'Ethereum',
    source: 'CoinTelegraph',
    timeAgo: '1h ago',
    url: 'https://twitter.com',
    sentiment: 'bullish',
    readTime: '4 min read',
  },
  {
    id: 'news-3',
    title: 'Global Regulators Align on Unified Non-Custodial Trading Standards',
    summary: 'The International Organization of Securities Commissions (IOSCO) published updated recommendations clarifying that non-custodial software relays do not hold client funds.',
    category: 'Regulation',
    source: 'Bloomberg Crypto',
    timeAgo: '3h ago',
    url: 'https://linkedin.com',
    sentiment: 'neutral',
    readTime: '5 min read',
  },
  {
    id: 'news-4',
    title: 'Solana DEX Volume Hits All-Time High Driven by High-Frequency Trading Swaps',
    summary: 'Raydium and Orca processed over $4.8B in 24-hour trading volume, briefly flipping Uniswap daily volume metrics.',
    category: 'DeFi',
    source: 'The Block',
    timeAgo: '5h ago',
    url: 'https://twitter.com',
    sentiment: 'bullish',
    readTime: '3 min read',
  },
  {
    id: 'news-5',
    title: 'Federal Reserve Signals Favorable Liquidity Environment for Risk Assets',
    summary: 'Central bank officials noted cooling inflation metrics, paving the way for gradual rate cuts that traditionally spark crypto bull rallies.',
    category: 'Macro',
    source: 'Reuters Financial',
    timeAgo: '7h ago',
    url: 'https://linkedin.com',
    sentiment: 'bullish',
    readTime: '4 min read',
  },
];

export const TWITTER_CRYPTO_FEED: TweetItem[] = [
  {
    id: 'tw-1',
    author: 'Bitcoin Magazine',
    handle: '@BitcoinMagazine',
    avatar: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?w=80&auto=format&fit=crop&q=80',
    verified: true,
    content: 'BREAKING: Global corporate treasuries now hold over 3.2% of the entire circulating #Bitcoin supply. Non-custodial institutional accumulation shows no signs of slowing down. 🚀',
    timeAgo: '42m ago',
    likes: '14.2K',
    retweets: '3.8K',
    url: 'https://twitter.com',
  },
  {
    id: 'tw-2',
    author: 'Vitalik Buterin',
    handle: '@VitalikButerin',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80',
    verified: true,
    content: 'Non-custodial cryptographic verification is the core premise of Web3. Keep your private keys secure, verify contract logic, and minimize trusted third-party reliance.',
    timeAgo: '2h ago',
    likes: '28.6K',
    retweets: '5.1K',
    url: 'https://twitter.com',
  },
  {
    id: 'tw-3',
    author: 'Binance Research',
    handle: '@BinanceResearch',
    avatar: 'https://assets.coingecko.com/markets/images/52/small/binance.jpg',
    verified: true,
    content: 'Weekly Market Brief: Spot trading volumes up +28% week-over-week across major pairs BTC, ETH, and SOL. Depth on bid books is tightening as retail participants re-enter.',
    timeAgo: '4h ago',
    likes: '8.9K',
    retweets: '1.9K',
    url: 'https://twitter.com',
  },
  {
    id: 'tw-4',
    author: 'PlanB',
    handle: '@100trillionUSD',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&auto=format&fit=crop&q=80',
    verified: true,
    content: 'Next leg up is underway. RSI indicator is entering high-velocity momentum territory. Watch the 20-week SMA closely on all macro timeframes.',
    timeAgo: '6h ago',
    likes: '19.4K',
    retweets: '4.2K',
    url: 'https://twitter.com',
  },
];

export const LINKEDIN_CRYPTO_FEED: LinkedInPostItem[] = [
  {
    id: 'li-1',
    author: 'Cathie Wood',
    role: 'Chief Executive Officer',
    company: 'ARK Invest',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80',
    content: 'Our latest research highlights the profound shift toward non-custodial trading architecture. Financial institutions are demanding direct API execution without counterparty custody risk.',
    timeAgo: '3h ago',
    likes: 3420,
    comments: 218,
    url: 'https://linkedin.com',
  },
  {
    id: 'li-2',
    author: 'Michael Saylor',
    role: 'Executive Chairman',
    company: 'MicroStrategy',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
    content: 'Capital allocation in the digital age requires programmatic certainty. Bitcoin represents digital property backed by thermodynamic security. Every balance sheet should evaluate non-custodial holdings.',
    timeAgo: '5h ago',
    likes: 8940,
    comments: 612,
    url: 'https://linkedin.com',
  },
  {
    id: 'li-3',
    author: 'Brad Garlinghouse',
    role: 'CEO',
    company: 'Ripple Labs',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
    content: 'Cross-border liquidity and multi-exchange order routing are transforming modern corporate treasuries. Compliance and non-custodial safety must go hand-in-hand.',
    timeAgo: '8h ago',
    likes: 2850,
    comments: 184,
    url: 'https://linkedin.com',
  },
];
