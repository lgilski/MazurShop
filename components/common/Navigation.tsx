import { cartActions } from '@/store/cart';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Logo from './Logo';
import { WholeState } from '@/types/types';

function Navigation() {
  const dispatch = useDispatch();
  const items = useSelector((state: WholeState) => state.cart.items);

  const numberOfItems = items
    .map(item => item.quantity)
    .reduce((a, b) => Number(a) + Number(b), 0);

  return (
    <nav className='fixed w-full top-0 px-8 py-4 flex items-baseline justify-between shadow bg-white z-[2]'>
      <Link href='/' className='text-3xl font-bold justify-self-start w-40'>
        <Logo />
      </Link>
      <div className='flex gap-8'>
        <Link
          href='/products'
          className='font-medium text-xl text-grey-700 hover:text-green-500 duration-200'
        >
          Products
        </Link>
        <Link
          href='/'
          className='font-medium text-xl text-grey-700 hover:text-green-500 duration-200'
        >
          Regulations
        </Link>
        {/* <Link
          href='/'
          className='font-medium text-xl text-grey-700 hover:text-green-500 duration-200'
        >
          Products
        </Link> */}
      </div>
      <div className='w-40 justify-end flex'>
        <button
          onClick={() => dispatch(cartActions.setShowCart())}
          className='relative w-8 h-8 [&_ion-icon]:w-full [&_ion-icon]:h-full [&_ion-icon]:align-bottom [&_ion-icon]:cursor-pointer justify-self-end '
        >
          <ion-icon name='cart-outline' />
          {numberOfItems !== 0 && (
            <div className='flex absolute w-6 h-6 bg-green-500 -bottom-2 -right-2 rounded-full text-green-50 items-center text-sm justify-center'>
              {numberOfItems > 100 ? '+99' : numberOfItems}
            </div>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
