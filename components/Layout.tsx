import React, { PropsWithChildren } from 'react';
import Navigation from './Navigation';
import { usePathname } from 'next/navigation';
import Cart from './Cart';

const Layout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  return (
    <>
      {!pathname?.includes('studio') && (
        <>
          <Navigation />
          <Cart />
        </>
      )}
      {/* {children} */}
    </>
  );
};
export default Layout;
