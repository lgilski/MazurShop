import React, { PropsWithChildren } from 'react';
import Navigation from './Navigation';
import { usePathname } from 'next/navigation';

const Layout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  return (
    <>
      {!pathname?.includes('studio') && <Navigation />}
      {children}
    </>
  );
};
export default Layout;
