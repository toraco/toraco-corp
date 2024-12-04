import { Metadata } from 'next';
import { ReactNode } from 'react';
import { SWRConfig } from 'swr';
import styles from './layout.module.scss';
import { Header } from '@/components/ui/Header';

export const metadata: Metadata = {
  title: {
    default: 'toraco株式会社',
    template: '%s | toraco株式会社',
  },
  metadataBase: new URL('https://toraco.jp'),
  description:
    'toraco株式会社のミッションは、”やりたい” という原動力をテクノロジーを用いて実現することです。"やりたいけどできない"と後悔する人がいなくなることが目標です。',
  openGraph: {
    title: 'toraco株式会社',
    description:
      'toraco株式会社のミッションは、”やりたい” という原動力をテクノロジーを用いて実現することです。"やりたいけどできない"と後悔する人がいなくなることが目標です。',
    images: [`/images/hero-background.png`],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <SWRConfig
          value={{
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
          }}
        >
          <div className={styles.layout}>
            <Header />
            <main className={styles.main}>{children}</main>
          </div>
        </SWRConfig>
      </body>
    </html>
  );
}
