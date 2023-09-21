import { SanityDocument } from 'next-sanity';
import Head from 'next/head';
import Link from 'next/link';

export default function Products({
  products = [],
}: {
  products: SanityDocument[];
}) {
  // const title = products.length === 1 ? `1 Pets` : `${products.length} Pets`;

  return (
    <>
      {/* <Head>
        <title>uwu</title>
      </Head> */}
      <main className='container mx-auto grid grid-cols-1 divide-y divide-blue-100'>
        {/* <h1 className='text-2xl p-4 font-bold'>{title}</h1> */}
        {products.map(product => (
          <Link
            key={product._id}
            href={product.slug.current}
            className='p-4 hover:bg-blue-50'
          >
            <h2>{product.name}</h2>
          </Link>
        ))}
      </main>
    </>
  );
}
