import Layout from '@/components/Layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-roboto',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <main className={`${roboto.variable} font-roboto bg-grey-050`}>
          <Component {...pageProps} />
        </main>
      </Layout>
    </>
  );
}
