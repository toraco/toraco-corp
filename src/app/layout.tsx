import { Metadata } from 'next';
import styles from './layout.module.scss';
import { Header } from '@/components/ui/Header';
import '@/styles/reset.css';
import 'remixicon/fonts/remixicon.css';

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
    images: [`/images/hero-background.png`],
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
    <html lang="ja">
      <body className={styles.body}>
        <Header />
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
}
