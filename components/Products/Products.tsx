import { ProductType, WholeState } from '@/types/types';
import Product from './Product';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

export default function Products({}: {}) {
  const data = useSelector((state: WholeState) => state.product.products);

  const [searchedProduct, setSearchedProduct] = useState('');

  return (
    <>
      {data && (
        <section className='max-w-7xl mx-auto mb-16 mt-32'>
          <div className='flex mb-8 justify-between items-end'>
            <div>owo</div>
            <div className='bg-green-100 flex items-center [&_ion-icon]:p-1 [&_ion-icon]:w-6 [&_ion-icon]:h-6 p-2 rounded-full overflow-hidden'>
              <input
                onChange={e => setSearchedProduct(e.target.value)}
                className='bg-inherit h-full text-base p-1 rounded-full'
              />
              <ion-icon name='search-outline' />
            </div>
          </div>
          <div className='grid grid-cols-3 gap-16'>
            {data.length > 0 &&
              data?.map((productData: ProductType) => {
                if (
                  searchedProduct.length > 0 &&
                  !productData.name
                    .toLocaleLowerCase()
                    .includes(searchedProduct.toLocaleLowerCase())
                )
                  return;

                return <Product key={productData?._id} product={productData} />;
              })}
          </div>
        </section>
      )}
    </>
  );
}
