import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body className='bg-grey-050'>
        <Main />
        <NextScript />
        <script
          defer
          type='module'
          src='https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js'
        ></script>
        <script
          defer
          src='https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js'
        ></script>
      </body>
    </Html>
  );
}
