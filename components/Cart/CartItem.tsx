import { useDispatch } from 'react-redux';
import Price from '../common/Price';
import SelectQuantity from '../common/SelectQuantity';
import { useRef } from 'react';
import { cartActions } from '@/store/cart';
import { urlForImage } from '@/sanity/lib/image';

import Link from 'next/link';
import { ItemType } from '@/types/types';
import calculatePrice from '@/helpers/calculatePrice';

function CartItem({ item }: { item: ItemType }) {
  const dispatch = useDispatch();

  const ref = useRef<HTMLInputElement | null | undefined>(null);

  const cost =
    item.quantity *
    calculatePrice({
      discount: item.product.discount,
      price: item.product.price,
    });

  return (
    <div className='flex gap-6' key={item.product._id}>
      <img
        className='w-60 aspect-square object-cover rounded-md'
        src={urlForImage(item.product.image[0]).toString()}
      />
      <div className='flex flex-col flex-grow'>
        <Link
          onClick={() => dispatch(cartActions.setShowCart())}
          href={item.product.slug.current}
          className='text-2xl font-semibold hover:text-green-600 duration-200'
        >
          {item.product.name}
        </Link>
        <div className='flex gap-2 items-baseline mb-4'>
          <Price discount={item.product.discount} price={item.product.price} />
          <p className='font-medium'>za sztukę</p>
        </div>
        <div>
          <p>Obecna ilość w koszyku:</p>
          <SelectQuantity item={item} ref={ref} />
        </div>
        <div className='mt-auto mb-2 flex justify-between items-baseline'>
          <div className='flex items-baseline gap-1'>
            <p className='text-xl font-medium'>Cena:</p>
            <p className='text-3xl font-bold text-green-800 '>
              {cost.toFixed(2)}zł
            </p>
          </div>
          <button
            onClick={() =>
              dispatch(
                cartActions.deleteItemFromCart({ productId: item.product._id })
              )
            }
            className='w-6 h-6 [&_ion-icon]:w-full [&_ion-icon]:h-full mr-6 hover:text-red-500 duration-200'
          >
            <ion-icon name='trash-outline' />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
