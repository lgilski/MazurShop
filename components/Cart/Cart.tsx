import toast from 'react-hot-toast';
import { cartActions } from '@/store/cart';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import CartItem from './CartItem';
import { WholeState } from '@/types/types';
import getStripe from '@/helpers/getStripe';
import calculatePrice from '@/helpers/calculatePrice';

export const Blur = () => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>('#portal');
    setMounted(true);
  }, []);

  return mounted && ref.current
    ? createPortal(
        <div
          onClick={() => dispatch(cartActions.setShowCart())}
          className='fixed top-0 left-0 bg-[#000000bf] w-full h-full z-[2] '
        />,
        ref.current
      )
    : null;
};

function Cart() {
  const showCart = useSelector((state: WholeState) => state.cart.showCart);
  const items = useSelector((state: WholeState) => state.cart.items);
  const products = useSelector((state: WholeState) => state.product.products);
  const dispatch = useDispatch();

  const [totalCost, setTotalCost] = useState<number>(0);

  const handleCheckout = async function () {
    const stripe = await getStripe();
    toast('Redirecting...');

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(items),
    });

    if (response.status === 500) return;

    const data = await response.json();

    const isEnoughtInInventoryArray: boolean[] = items
      .map(item =>
        products.find(
          product =>
            item.product._id === product._id &&
            product.leftInStock >= item.quantity
        )
          ? true
          : false
      )
      .filter(a => a !== undefined);

    if (isEnoughtInInventoryArray.some((item: boolean) => item === false))
      return toast.error('There are not enought items in inventory');

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  function addAllCosts() {
    const totalCostToAdd = items.map(item =>
      (
        item.quantity *
        calculatePrice({
          discount: item.product.discount,
          price: item.product.price,
        })
      ).toFixed(2)
    );

    setTotalCost(
      totalCostToAdd.reduce((accumulator, currentValue) => {
        return Number(accumulator.toFixed(2)) + Number(currentValue);
      }, 0)
    );
  }

  useEffect(() => {
    addAllCosts();
  }, [items]);

  return (
    <>
      <div
        className={`fixed top-0 right-0 pt-[68px] px-4 h-screen w-[600px] bg-white z-[4] duration-300 overflow-auto ${
          showCart ? '' : 'translate-x-[100%]'
        }`}
      >
        <button
          onClick={() => dispatch(cartActions.setShowCart())}
          className='absolute top-6 right-6 w-8 h-8 [&_ion-icon]:w-full [&_ion-icon]:h-full'
        >
          <ion-icon name='close-outline' />
        </button>
        {items.length === 0 && <div>There are no products in your cart.</div>}
        <div className='flex flex-col gap-4'>
          {items.map(item => (
            <CartItem key={item.product._id} item={item} />
          ))}
        </div>
        {items.length !== 0 && (
          <div className='mt-12'>
            <p className='text-3xl mb-4 pt-4 border-t border-solid border-grey-300 '>
              Total cost:{' '}
              <span className='text-green-800 text-5xl font-bold'>
                {totalCost.toFixed(2)}zł
              </span>
            </p>
            <button
              onClick={handleCheckout}
              className='w-full text-xl bg-green-700 px-4 py-2 rounded-full text-green-050 hover:bg-green-500 duration-200 '
            >
              Go to checkout
            </button>
          </div>
        )}
      </div>
      {showCart && <Blur />}
    </>
  );
}

export default Cart;
