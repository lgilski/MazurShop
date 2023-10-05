import { cartActions } from '@/store/cart';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import Logo from './Logo';

function Navigation() {
  const dispatch = useDispatch();

  return (
    <nav className='fixed w-full top-0 px-8 py-4 flex items-baseline justify-between shadow bg-white z-[2]'>
      <Link href='/' className='text-3xl font-bold justify-self-start w-40'>
        <Logo />
      </Link>
      <div className='flex gap-8'>
        <Link
          href='/'
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
          className='w-8 h-8 [&_ion-icon]:w-full [&_ion-icon]:h-full [&_ion-icon]:align-bottom [&_ion-icon]:cursor-pointer justify-self-end'
        >
          <ion-icon name='cart-outline' />
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
