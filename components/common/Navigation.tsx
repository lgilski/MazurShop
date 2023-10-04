import { cartActions } from '@/store/cart';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import Logo from './Logo';

function Navigation() {
  const dispatch = useDispatch();

  return (
    <nav className='fixed w-full top-0 px-8 py-4 flex justify-between items-baseline shadow bg-white z-[2]'>
      <Link href='/' className='text-3xl font-bold'>
        <Logo />
      </Link>
      <button
        onClick={() => dispatch(cartActions.setShowCart())}
        className='w-8 h-8 [&_ion-icon]:w-full [&_ion-icon]:h-full [&_ion-icon]:align-bottom [&_ion-icon]:cursor-pointer'
      >
        <ion-icon name='cart-outline' />
      </button>
    </nav>
  );
}

export default Navigation;
