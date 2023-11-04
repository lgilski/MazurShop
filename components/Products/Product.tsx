import Head from 'next/head';
import { urlForImage } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import SelectQuantity from '../common/SelectQuantity';
import Price from '../common/Price';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '@/store/cart';
import { ProductType, WholeState } from '@/types/types';
import toast from 'react-hot-toast';

export default function Product({ product }: { product: ProductType }) {
  const [lastSeen, setLastSeen] = useState<any>();

  const ref = useRef<HTMLInputElement | null>(null);
  const source = urlForImage(product.image[0]).toString();
  const cartItems = useSelector((state: WholeState) => state.cart.items);

  const dispatch = useDispatch();

  const handleAddToCart = function () {
    if (product.leftInStock <= 0) return;

    const productQuantityInCart = cartItems.find(
      cartItem => cartItem.productId === product._id
    )?.quantity;

    if (productQuantityInCart! >= product.leftInStock) {
      return toast.error(
        `There's no more ${product.name} to add to your cart.`
      );
    }

    if (
      product.leftInStock - productQuantityInCart! <
      Number(ref.current?.value)
    ) {
      toast.success(
        `Added ${product.leftInStock - Number(ref.current?.value)} of ${
          product.name
        } to your cart.`
      );
    } else {
      toast.success(
        `Added ${Number(ref.current?.value)} of ${product.name} to your cart.`
      );
    }

    dispatch(
      cartActions.addToCart({
        productId: product._id,
        quantity: Number(ref.current?.value),
      })
    );
  };

  const saveLastSeen = function () {
    if (
      lastSeen.length > 0 &&
      lastSeen.some((a: any) => a.name === product.name)
    ) {
      const withoutCurrent = lastSeen.filter(
        (a: any) => a.name !== product.name
      );

      localStorage.setItem(
        'lastSeen',
        JSON.stringify([
          { name: product.name, id: product._id },
          ...withoutCurrent,
        ])
      );
    } else {
      if (lastSeen.length > 0) {
        localStorage.setItem(
          'lastSeen',
          JSON.stringify([{ name: product.name, id: product._id }, ...lastSeen])
        );
      } else {
        localStorage.setItem(
          'lastSeen',
          JSON.stringify([{ name: product.name, id: product._id }])
        );
      }
    }
  };

  useEffect(() => {
    const elements = JSON.parse(localStorage.getItem('lastSeen') || '{}');
    if (elements) {
      setLastSeen(elements);
    }
  }, []);

  ////////////////////////////////////////////////////////
  // Implement updateing Cart when values change on server

  return (
    <div className='flex flex-col bg-white-100 relative w-full mx-auto rounded-xl overflow-hidden shadow-xl box-border border-2 border-solid border-grey-100'>
      <Image
        alt=''
        className='aspect-square block object-cover'
        src={source}
        width={0}
        height={0}
        sizes='100vw'
        style={{ width: '100%', height: 'auto' }}
      />
      {product.discount && (
        <p className='absolute flex w-16 h-16 items-center justify-center top-2 right-2 text-xl font-medium p-1 bg-purple-200 text-purple-900 rounded-full'>
          -{product.discount}%
        </p>
      )}
      <div className='p-4 flex flex-col flex-grow bg-white'>
        <div className='mb-2'>
          <Link
            onClick={saveLastSeen}
            href={product.slug.current}
            className='text-2xl font-semibold hover:text-green-700 duration-100'
          >
            {product.name}
          </Link>
          <div className='flex items-baseline justify-between'>
            <Price discount={product.discount} price={product.price} />
            <p className='font-medium'>
              {product.leftInStock > 0
                ? `${product.leftInStock} sztuk`
                : 'wyprzedane'}
            </p>
          </div>
        </div>
        <div className='flex justify-between gap-4 mt-auto pt-8'>
          <SelectQuantity ref={ref} product={product} />
          <button
            onClick={handleAddToCart}
            disabled={product.leftInStock <= 0 ? true : false}
            className={`text-xl flex-grow  px-4 py-2 rounded-full duration-200 ${
              product.leftInStock <= 0
                ? 'bg-gray-300 hover:bg-gray-300 text-gray-500'
                : 'bg-green-700 text-green-050 hover:bg-green-500'
            }`}
          >
            Dodaj do koszyka
          </button>
        </div>
      </div>
    </div>
  );
}
