import toast from 'react-hot-toast';
import { cartActions } from '@/store/cart';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import CartItem from './CartItem';
import { ItemData, ItemType, ProductType, WholeState } from '@/types/types';
import getStripe from '@/helpers/getStripe';
import calculatePrice from '@/helpers/calculatePrice';
import { clientRead } from '@/sanity/lib/client';
import { allProductsQuery, productsDetailsQuery } from '@/api/queries';
import { redirect } from 'next/navigation';

function useProductsDetails() {
  const [productsData, setProductsData] = useState<ProductType[]>();

  useEffect(() => {
    clientRead.fetch(productsDetailsQuery).then(data => setProductsData(data));
  }, []);
  clientRead.listen(productsDetailsQuery).subscribe(async (update: any) => {
    const indexToChange = productsData?.findIndex(
      product => product._id === update.result._id
    );

    if (indexToChange && productsData) {
      let newData = [...productsData];
      newData[indexToChange] = update.result;
      setProductsData(newData);
    }
  });

  return productsData;
}

function calculateTotalCost(items: ItemType[] | null) {
  if (!items || items.length === 0) return null;

  if (items) {
    const totalCostToAdd = items.map(item =>
      (
        item.quantity *
        calculatePrice({
          discount: item.product?.discount,
          price: item.product?.price,
        })
      ).toFixed(2)
    );

    return totalCostToAdd.reduce((accumulator, currentValue) => {
      return Number(accumulator.toFixed(2)) + Number(currentValue);
    }, 0);
  }
}

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
          className='fixed top-0 left-0 bg-[#000000bf] w-full h-full z-[4]'
        />,
        ref.current
      )
    : null;
};

///////////////////////////////////////////////////////////////
// Handle localStorage

function Cart() {
  const showCart = useSelector((state: WholeState) => state.cart.showCart);
  const items = useSelector((state: WholeState) => state.cart.items);
  const dispatch = useDispatch();

  const productsData = useProductsDetails();

  const itemsData: any = items?.map(item => {
    if (!productsData) return;

    return {
      product: productsData?.find(
        productData => productData._id === item.productId
      )!,
      quantity: item.quantity,
    };
  });

  const handleCheckout = async function () {
    const stripe = await getStripe();
    toast('Redirecting...');
    // console.log('Sending request body:', itemsData);
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemsData),
    });

    if (response.status === 500) return;
    const data = await response.json();
    const isEnoughtInInventory: boolean[] = itemsData.map(
      (item: ItemType) => item.product.leftInStock >= item.quantity
    );

    if (isEnoughtInInventory.some((item: boolean) => item === false))
      return toast.error('There are not enought items in inventory');
    stripe.redirectToCheckout({
      sessionId: data.id,
    });
  };
  // paymentIntentId: data.payment_intent,

  const totalCost = useMemo(
    () => calculateTotalCost(itemsData.includes(undefined) ? null : itemsData),
    [itemsData]
  );

  // useEffect(() => {
  //   console.log(productsData);
  // }, [productsData]);

  // useEffect(() => {
  //   // Handle loading data from localStorage at the beginning

  //   const cartItemsData = localStorage.getItem('cartItems');
  //   if (!cartItemsData) return;

  //   const cartItems = JSON.parse(cartItemsData);

  //   dispatch(cartActions.setInitialCartItems(cartItems));
  // }, []);

  return (
    <>
      <div
        className={`fixed top-0 right-0 pt-[68px] px-4 h-screen w-[600px] bg-white z-[5] duration-300 overflow-auto ${
          showCart ? '' : 'translate-x-[100%]'
        }`}
      >
        <button
          onClick={() => dispatch(cartActions.setShowCart())}
          className='absolute top-6 right-6 w-8 h-8 [&_ion-icon]:w-full [&_ion-icon]:h-full'
        >
          <ion-icon name='close-outline' />
        </button>
        {itemsData.length === 0 && (
          <div className='[&_ion-icon]:w-80 [&_ion-icon]:h-80 [&_ion-icon]:text-green-700 flex flex-col items-center justify-center h-full'>
            <ion-icon name='cart' />
            <p className='text-lg mt-6'>
              Nie ma żadnych produktów w Twoim koszyku.
            </p>
          </div>
        )}
        {itemsData.length !== 0 && (
          <div className='flex flex-col gap-4'>
            {itemsData.map((item: any) => {
              if (item?.product !== null)
                return <CartItem key={item?.product!.name} item={item} />;
            })}
          </div>
        )}
        {itemsData.length !== 0 && (
          <div className='mt-12'>
            <p className='text-3xl mb-4 pt-4 border-t border-solid border-grey-300 '>
              Finalny koszt:{' '}
              <span className='text-green-800 text-3xl font-bold'>
                {totalCost?.toFixed(2)}zł
              </span>
            </p>
            <button
              onClick={handleCheckout}
              className='w-full text-xl bg-green-700 px-4 py-2 rounded-full text-green-050 hover:bg-green-500 duration-200 '
            >
              Dokonaj zakupu
            </button>
          </div>
        )}
      </div>
      {showCart && <Blur />}
    </>
  );
}

export default Cart;
