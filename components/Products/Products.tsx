import { ProductType, WholeState } from '@/types/types';
import Product from './Product';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function Products() {
  const data = useSelector((state: WholeState) => state.product.products);

  const [searchedProduct, setSearchedProduct] = useState('');

  return (
    <>
      {data && (
        <section className='max-w-7xl mx-auto mb-16 mt-32 max-xl:max-w-3xl max-md:max-w-lg '>
          <div className='flex mb-8 justify-center gap-8 items-end px-4'>
            {/* <div>owo</div> */}
            <div className='bg-green-200 w-80 flex items-center [&_ion-icon]:p-1 [&_ion-icon]:w-6 [&_ion-icon]:h-6 rounded-full overflow-hidden'>
              <input
                onChange={e => setSearchedProduct(e.target.value)}
                className='bg-green-100 h-full text-base p-2 rounded-l-full w-full placeholder:text-green-600'
                placeholder='Type to find products...'
              />
              <ion-icon name='search-outline' />
            </div>
          </div>
          <div className='mx-auto  grid w-full grid-cols-3 gap-16 max-xl:grid-cols-2 max-md:grid-cols-1'>
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
