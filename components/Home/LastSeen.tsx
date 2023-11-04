import { ProductType, WholeState } from '@/types/types';
import { useState, useEffect } from 'react';
import Product from '../Products/Product';
import ProductsSection from '../Products/ProductsSection';

const LastSeen = function ({ products }: { products: ProductType[] }) {
  const [lastSeen, setLastSeen] = useState<any>([]);

  useEffect(() => {
    const elements = JSON.parse(localStorage.getItem('lastSeen') || '{}');
    if (elements) {
      setLastSeen(elements);
    }
  }, []);

  ////////////////////////////////////////////////////
  // Handle the situation when the product is no longer on the server

  return (
    <>
      {lastSeen.length > 0 && (
        <ProductsSection title='Ostatnio oglądane'>
          {lastSeen
            .slice(0, 3)
            .map((lastSeenElement: any) =>
              products.find(product => product._id === lastSeenElement.id)
            )
            .map((seenProduct: ProductType) => {
              if (!seenProduct) return;
              return <Product key={seenProduct.name} product={seenProduct} />;
            })}
        </ProductsSection>
      )}
    </>
  );
};

export default LastSeen;
