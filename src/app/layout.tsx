import type { Metadata } from 'next';
import { Inter, Noto_Sans_JP } from 'next/font/google';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { ThemeProvider } from '@/components/providers/theme-provider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'toraco株式会社',
    template: '%s | toraco株式会社',
  },
  metadataBase: new URL('https://toraco.jp'),
  description:
    'toraco株式会社のミッションは、"やりたい" という原動力をテクノロジーを用いて実現することです。"やりたいけどできない"と後悔する人がいなくなることが目標です。',
  icons: {
    icon: [
      { url: '/meta/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      {
        url: '/meta/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    shortcut: '/meta/favicon.ico',
    apple: '/meta/apple-touch-icon.png',
  },
  manifest: '/meta/site.webmanifest',
  openGraph: {
    title: 'toraco株式会社',
    description:
      'toraco株式会社のミッションは、"やりたい" という原動力をテクノロジーを用いて実現することです。"やりたいけどできない"と後悔する人がいなくなることが目標です。',
    images: ['/images/hero-background.webp'],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${notoSansJP.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="flex min-h-dvh flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
