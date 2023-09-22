import Head from 'next/head';
import { SanityDocument } from '@sanity/client';
import { PortableText } from '@portabletext/react';
import { urlForImage } from '@/sanity/lib/image';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Product({ product }: { product: SanityDocument }) {
  console.log(product);

  const [numberToAdd, setNumberToAdd] = useState(1);

  const source = urlForImage(product.image[0]);
  const priceAfterDiscount = product.discount
    ? (product.price * (1 - product.discount / 100)).toFixed(2)
    : null;

  const increment = function () {
    if (numberToAdd >= product.leftInStock) return;

    setNumberToAdd(prevState => prevState + 1);
  };
  const decrement = function () {
    if (numberToAdd === 1) return;

    setNumberToAdd(prevState => prevState - 1);
  };

  useEffect(() => {
    console.log(numberToAdd);
  }, [numberToAdd]);

  return (
    <div className='flex flex-col bg-white-100 relative w-full mx-auto rounded-xl overflow-hidden shadow-xl box-border border-2 border-solid border-grey-100'>
      <img
        alt=''
        className='max-w-full aspect-square block object-cover'
        src={source}
      />
      {product.discount && (
        <div className='absolute flex w-16 h-16 items-center justify-center top-2 right-2 text-xl font-medium p-1 bg-purple-200 text-purple-900 rounded-full'>
          -{product.discount}%
        </div>
      )}
      <div className='p-4 flex flex-col flex-grow bg-white'>
        <div className='mb-2'>
          <h5 className='text-2xl font-semibold'>{product.name}</h5>
          <div className='flex items-baseline justify-between'>
            <p className={`text-xl font-semibold text-green-700 pb-8`}>
              <span
                className={`${
                  priceAfterDiscount && 'line-through text-grey-500'
                } `}
              >
                {product.price.toFixed(2)}zł
              </span>{' '}
              {priceAfterDiscount && priceAfterDiscount + 'zł'}
            </p>
            <p className='font-medium'>
              {product.leftInStock !== 0
                ? `only ${product.leftInStock} left`
                : 'sold out'}
            </p>
          </div>
        </div>
        <div className='flex justify-between gap-4 mt-auto '>
          <div className='block [&_ion-icon]:align-middle [&_ion-icon]:w-6 [&_ion-icon]:h-6 bg-green-050 border border-solid border-green-700 rounded-full overflow-hidden'>
            <button
              onClick={decrement}
              className='p-1 h-full hover:text-green-500 duration-100'
            >
              <ion-icon name='remove-outline' />
            </button>
            <span className='w-10 inline-block text-center text-xl leading-none align-middle'>
              {numberToAdd}
            </span>
            <button
              onClick={increment}
              className='p-1 h-full hover:text-green-500 duration-100'
            >
              <ion-icon name='add-outline' />
            </button>
          </div>
          <button className='text-xl flex-grow bg-green-700 px-4 py-2 rounded-full text-green-050 hover:bg-green-500 duration-200'>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
