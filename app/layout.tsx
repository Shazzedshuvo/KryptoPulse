import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { GlobalHeaderBar } from '@/components/cmc/GlobalHeaderBar';
import { CmcNavbar } from '@/components/cmc/CmcNavbar';
import { CmcFooter } from '@/components/cmc/CmcFooter';
import { CoinDetailModal } from '@/components/cmc/CoinDetailModal';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'KryptoPulse — Global Cryptocurrency Market Cap, Real-Time Prices & Non-Custodial Trading Terminal',
  description: 'KryptoPulse provides real-time crypto prices, 7-day sparklines, live order books, and direct multi-exchange trading across Binance, Bybit, KuCoin, and OKX.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('nextrade-theme') || 'dark';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} min-h-screen flex flex-col bg-white dark:bg-[#0b0e14] text-slate-900 dark:text-slate-100 transition-colors duration-200 antialiased`}>
        {/* Global Crypto Stats Header Bar */}
        <GlobalHeaderBar />

        {/* KryptoPulse Primary Navigation */}
        <CmcNavbar />

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>

        {/* Global Coin Detail Drawer Modal */}
        <CoinDetailModal />

        {/* KryptoPulse Footer */}
        <CmcFooter />
      </body>
    </html>
  );
}
