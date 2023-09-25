import Layout from '@/components/Layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import { Roboto } from 'next/font/google';

import store from '@/store';
import { Provider } from 'react-redux';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-roboto',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <main className={`${roboto.variable} font-roboto `}>
        <Layout />
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}
