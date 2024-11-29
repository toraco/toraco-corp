import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import '@/styles/reset.css';
import 'remixicon/fonts/remixicon.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}
