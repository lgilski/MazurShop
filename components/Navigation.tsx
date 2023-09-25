import { cartActions } from '@/store/cart';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';

// export const Portal = props => {
//   const ref = useRef<Element | null>(null);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     ref.current = document.querySelector<HTMLElement>('#portal');
//     setMounted(true);
//   }, []);

//   return mounted && ref.current
//     ? createPortal(<div {...props}>{props.children}</div>, ref.current)
//     : null;
// };

function Navigation() {
  const dispatch = useDispatch();

  return (
    // fixed w-[1200px] right-[50%] top-3 translate-x-[50%] bg-white rounded
    <nav className='fixed w-full top-0 px-8 py-4 flex justify-between items-baseline shadow bg-white z-[2]'>
      <Link href='/' className='text-3xl font-bold'>
        Mazur<span className='text-green-500'>Shop</span>
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
