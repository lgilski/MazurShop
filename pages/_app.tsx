import Layout from '@/components/Layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import { Roboto } from 'next/font/google';

import store from '@/store';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';

// import TosterComponent from '@/components/TosterComponent';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['900', '100', '300', '400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-roboto',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <main className={`${roboto.variable} font-roboto`}>
        <Layout />
        <Toaster />
        {/* <TosterComponent /> */}
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}
