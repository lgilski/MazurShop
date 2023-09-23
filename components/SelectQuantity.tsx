import { SanityDocument } from 'next-sanity';
import { forwardRef, useState } from 'react';

const SelectQuantity = forwardRef(function (
  { product }: { product: SanityDocument },
  ref
) {
  const [numberToAdd, setNumberToAdd] = useState<number | string>(1);

  const increment = function () {
    if (numberToAdd >= product.leftInStock) return;
    setNumberToAdd(prevState => Number(prevState) + 1);
  };
  const decrement = function () {
    if (numberToAdd === 1) return;
    setNumberToAdd(prevState => Number(prevState) - 1);
  };

  function inputChangeHandler() {
    if (Number(ref?.current?.value) > product.leftInStock)
      return setNumberToAdd(product.leftInStock);

    setNumberToAdd(ref?.current!.value);
  }

  function inputBlurHandler() {
    if (Number(ref?.current?.value) === 0) return setNumberToAdd(1);
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
        max={product.leftInStock.toString()}
        className='w-10 inline-block text-center text-xl leading-none align-middle bg-inherit outline-none'
        value={numberToAdd}
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
