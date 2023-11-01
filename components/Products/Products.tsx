import { ProductType } from '@/types/types';
import Product from './Product';
import { useState } from 'react';
import Select from 'react-select';
import clsx from 'clsx';

export default function Products({
  products,
  categories,
}: {
  products: ProductType[];
  categories: { title: string; _id: string }[];
}) {
  const [searchedProduct, setSearchedProduct] = useState('');
  const [searchedCategories, setSearchedCategories] = useState([]);

  const selectChange = function (e: any) {
    console.log(e);

    setSearchedCategories(e);
  };

  console.log(products);

  return (
    <>
      {products && (
        <section className='max-w-7xl mx-auto mb-16 mt-32 max-xl:max-w-3xl max-md:max-w-lg '>
          <div className='flex mb-8 justify-between gap-8 px-4'>
            <div className='bg-green-200 w-80 flex items-center [&_ion-icon]:p-1 [&_ion-icon]:w-6 [&_ion-icon]:h-6 rounded-full overflow-hidden'>
              <input
                onChange={e => setSearchedProduct(e.target.value)}
                className='bg-green-100 h-full text-base p-2 rounded-l-full w-full placeholder:text-green-600'
                placeholder='Pisz by znaleźć produkty...'
              />
              <ion-icon name='search-outline' />
            </div>
            <div className='max-w-xs justify-self-end'>
              <Select
                // className='w-96 rounded-full'
                isMulti
                onChange={selectChange}
                // unstyled
                // classNames={{
                //   control: ({ isFocused }) =>
                //     clsx(
                //       'border rounded-full px-3 min-w-[200px] bg-green-100'
                //       // isFocused ? 'border-green-500' : 'border-none'
                //     ),
                // }}
                options={categories.map(category => ({
                  value: category.title,
                  label: category.title,
                }))}
              />
            </div>
            {/* <select onChange={selectChange}>
              <option value={''}></option>
              {categories.map(category => (
                <option key={category._id} value={category.title}>
                {category.title}
                </option>
                ))}
              </select> */}
          </div>
          <div className='mx-auto  grid w-full grid-cols-3 gap-16 max-xl:grid-cols-2 max-md:grid-cols-1'>
            {products.length > 0 &&
              products?.map((productData: ProductType) => {
                if (
                  searchedProduct.length > 0 &&
                  !productData.name
                    .toLocaleLowerCase()
                    .includes(searchedProduct.toLocaleLowerCase())
                )
                  return;

                if (
                  !searchedCategories.every(v =>
                    productData.categories.some(
                      category => category.title === v.value
                    )
                  )
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
