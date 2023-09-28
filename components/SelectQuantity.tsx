import { cartActions } from '@/store/cart';
import { ItemType, ProductType } from '@/types/types';
import { forwardRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const SelectQuantity = forwardRef(function (
  { product, item }: { product?: ProductType; item?: ItemType },
  ref: any
) {
  const dispatch = useDispatch();

  const [numberToAdd, setNumberToAdd] = useState<number | string>(1);

  const increment = function () {
    if (item) {
      if (item.quantity >= item.product.leftInStock) return;

      dispatch(
        cartActions.updateQuantity({
          product: item.product,
          quantity: Number(item.quantity) + 1,
        })
      );
    } else if (!item) {
      if (Number(numberToAdd) >= Number(product?.leftInStock)) return;
      setNumberToAdd(prevState => Number(prevState) + 1);
    }
  };
  const decrement = function () {
    if (item) {
      if (item.quantity === 1) return;

      dispatch(
        cartActions.updateQuantity({
          product: item.product,
          quantity: Number(item.quantity) - 1,
        })
      );
    } else if (!item) {
      if (numberToAdd === 1) return;
      setNumberToAdd(prevState => Number(prevState) - 1);
    }
  };

  function inputChangeHandler() {
    if (item) {
      if (Number(ref?.current?.value) > item.product.leftInStock)
        return dispatch(
          cartActions.updateQuantity({
            product: item.product,
            quantity: item.product.leftInStock,
          })
        );

      dispatch(
        cartActions.updateQuantity({
          product: item.product,
          quantity: ref?.current!.value,
        })
      );
    } else if (!item) {
      if (Number(ref?.current?.value) > product!.leftInStock)
        return setNumberToAdd(product?.leftInStock!);

      setNumberToAdd(ref?.current!.value);
    }
  }

  function inputBlurHandler() {
    if (item) {
      if (Number(ref?.current?.value) === 0)
        return dispatch(
          cartActions.updateQuantity({ product: item.product, quantity: 1 })
        );
    } else if (!item) {
      if (Number(ref?.current?.value) === 0) return setNumberToAdd(1);
    }
  }

  return (
    <div className='inline-block p-1 [&_ion-icon]:align-middle [&_ion-icon]:w-6 [&_ion-icon]:h-6 bg-green-050 border border-solid border-green-700 rounded-full overflow-hidden'>
      <button
        onClick={decrement}
        className='p-1 h-full hover:text-green-500 duration-100'
      >
        <ion-icon name='remove-outline' />
      </button>
      <input
        onChange={inputChangeHandler}
        onBlur={inputBlurHandler}
        ref={ref}
        type='number'
        min={'1'}
        max={
          product?.leftInStock
            ? product?.leftInStock.toString()
            : item?.product.leftInStock.toString()
        }
        className='font-roboto w-10 inline-block text-center text-xl leading-none align-middle bg-inherit outline-none'
        value={item ? item.quantity : numberToAdd}
      />
      <button
        onClick={increment}
        className='p-1 h-full hover:text-green-500 duration-100'
      >
        <ion-icon name='add-outline' />
      </button>
    </div>
  );
});
SelectQuantity.displayName = 'SelectQuantity';

export default SelectQuantity;
