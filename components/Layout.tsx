import React, { PropsWithChildren } from 'react';
import Navigation from './common/Navigation';
import { usePathname } from 'next/navigation';
import Cart from './Cart/Cart';
import Footer from './common/Footer';

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
      {children}
      {!pathname?.includes('studio') && <Footer />}
    </>
  );
};
export default Layout;
