import Head from 'next/head';
import { SanityDocument } from '@sanity/client';
import { PortableText } from '@portabletext/react';
import { urlForImage } from '@/sanity/lib/image';
import Image from 'next/image';

export default function Product({ product }: { product: SanityDocument }) {
  console.log(product);

  const source = urlForImage(product.image[0]);
  const numberOfProductsToAdd = 1;

  return (
    <div className='bg-white-100 w-full mx-auto rounded-xl overflow-hidden shadow-xl mb-8'>
      <img
        alt=''
        className='max-w-full aspect-square block object-cover'
        src={source}
      />
      <div className='p-4 flex flex-col'>
        <h5 className='text-2xl font-semibold mb-2'>{product.name}</h5>
        {/* Check if the price should have more decimal points */}
        <p className='text-xl font-medium text-green-700 mb-8'>
          {product.price}zł
        </p>
        <div className='flex justify-between gap-4'>
          <div className='block [&_ion-icon]:align-middle [&_ion-icon]:w-6 [&_ion-icon]:h-6 bg-green-050 border border-solid border-green-700 rounded-full overflow-hidden'>
            <button className='p-1 h-full'>
              <ion-icon name='remove-outline' />
            </button>
            <span className='w-10 inline-block text-center text-xl leading-none align-middle'>
              {numberOfProductsToAdd}
            </span>
            <button className='p-1  h-full'>
              <ion-icon name='add-outline' />
            </button>
          </div>
          <button className='text-xl flex-grow bg-green-700 px-4 py-2 rounded-full text-green-050'>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
