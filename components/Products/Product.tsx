import Head from 'next/head';
import { SanityDocument } from '@sanity/client';
import { PortableText } from '@portabletext/react';
import { urlForImage } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import SelectQuantity from '../common/SelectQuantity';
import Price from '../common/Price';
import { useDispatch } from 'react-redux';
import { cartActions } from '@/store/cart';
import { ProductType } from '@/types/types';
import toast from 'react-hot-toast';

export default function Product({ product }: { product: ProductType }) {
  const ref = useRef<HTMLInputElement | null>(null);
  const source = urlForImage(product.image[0]).toString();

  const dispatch = useDispatch();

  const sendAddToCart = function () {
    if (product.leftInStock <= 0) return;

    // Check if there's max quantity of an item in cart

    toast.success(
      `Added ${Number(ref.current?.value)} of ${product.name} to your cart`
    );

    dispatch(
      cartActions.addToCart({ product, quantity: Number(ref.current?.value) })
    );
  };

  return (
    <div className='flex flex-col bg-white-100 relative w-full mx-auto rounded-xl overflow-hidden shadow-xl box-border border-2 border-solid border-grey-100'>
      <img
        alt=''
        className='max-w-full aspect-square block object-cover'
        src={source}
      />
      {product.discount && (
        <p className='absolute flex w-16 h-16 items-center justify-center top-2 right-2 text-xl font-medium p-1 bg-purple-200 text-purple-900 rounded-full'>
          -{product.discount}%
        </p>
      )}
      <div className='p-4 flex flex-col flex-grow bg-white'>
        <div className='mb-2'>
          <Link
            href={product.slug.current}
            className='text-2xl font-semibold hover:text-green-700 duration-100'
          >
            {product.name}
          </Link>
          <div className='flex items-baseline justify-between'>
            <Price discount={product.discount} price={product.price} />
            <p className='font-medium'>
              {product.leftInStock > 0
                ? `${product.leftInStock} left in stock`
                : 'sold out'}
            </p>
          </div>
        </div>
        <div className='flex justify-between gap-4 mt-auto pt-8'>
          <SelectQuantity ref={ref} product={product} />
          <button
            onClick={sendAddToCart}
            className='text-xl flex-grow bg-green-700 px-4 py-2 rounded-full text-green-050 hover:bg-green-500 duration-200'
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
