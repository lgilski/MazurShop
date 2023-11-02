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

  const controlStyles = {
    base: 'border rounded-full px-2 bg-white hover:cursor-pointer',
    focus: 'border-primary-600 ring-1 ring-primary-500',
    nonFocus: 'border-gray-300 hover:border-gray-400',
  };
  const placeholderStyles = 'text-gray-500 pl-1 py-0.5';
  const selectInputStyles = 'pl-1 py-0.5';
  const valueContainerStyles = 'p-1 gap-1';
  const singleValueStyles = 'leading-7 ml-1';
  const multiValueStyles =
    'text-sm uppercase bg-green-100 text-green-800 font-medium rounded-full items-center pl-2 pr-1 gap-2';
  const multiValueLabelStyles = 'leading-6 py-0.5';
  const multiValueRemoveStyles =
    'border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md';
  const indicatorsContainerStyles = 'p-1 gap-1';
  const clearIndicatorStyles =
    'text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800';
  const indicatorSeparatorStyles = 'bg-gray-300';
  const dropdownIndicatorStyles =
    'p-1 hover:bg-gray-100 text-gray-500 rounded-md hover:text-black';
  const menuStyles = 'p-1 mt-2 border border-gray-200 bg-white rounded-lg';
  const groupHeadingStyles = 'ml-3 mt-2 mb-1 text-gray-500 text-sm';
  const optionStyles = {
    base: 'hover:cursor-pointer px-3 py-2 rounded',
    focus: 'bg-gray-100 active:bg-gray-200',
    selected:
      "after:content-['✔'] after:ml-2 after:text-green-500 text-gray-500",
  };
  const noOptionsMessageStyles =
    'text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm';

  return (
    <>
      {products && (
        <section className='max-w-7xl mx-auto mb-16 mt-32 max-xl:max-w-3xl max-md:max-w-lg'>
          <div className='flex mb-8 justify-between gap-8 px-4'>
            <div className='bg-green-200 h-[38px] w-80 flex items-center [&_ion-icon]:p-1 [&_ion-icon]:w-6 [&_ion-icon]:h-6 rounded-full overflow-hidden'>
              <input
                onChange={e => setSearchedProduct(e.target.value)}
                className='bg-green-100 h-full text-base p-2 rounded-l-full w-full placeholder:text-green-600'
                placeholder='Pisz by znaleźć produkty...'
              />
              <ion-icon name='search-outline' />
            </div>
            <div className='max-w-xs justify-self-end'>
              <Select
                options={categories.map(category => ({
                  value: category.title,
                  label: category.title,
                }))}
                onChange={selectChange}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                unstyled
                placeholder='Wybierz kategorie...'
                styles={{
                  input: base => ({
                    ...base,
                    'input:focus': {
                      boxShadow: 'none',
                    },
                  }),
                  // On mobile, the label will truncate automatically, so we want to
                  // override that behaviour.
                  multiValueLabel: base => ({
                    ...base,
                    whiteSpace: 'normal',
                    overflow: 'visible',
                  }),
                  control: base => ({
                    ...base,
                    transition: 'none',
                  }),
                }}
                classNames={{
                  control: ({ isFocused }) =>
                    clsx(
                      isFocused ? controlStyles.focus : controlStyles.nonFocus,
                      controlStyles.base
                    ),
                  placeholder: () => placeholderStyles,
                  input: () => selectInputStyles,
                  valueContainer: () => valueContainerStyles,
                  singleValue: () => singleValueStyles,
                  multiValue: () => multiValueStyles,
                  multiValueLabel: () => multiValueLabelStyles,
                  multiValueRemove: () => multiValueRemoveStyles,
                  indicatorsContainer: () => indicatorsContainerStyles,
                  clearIndicator: () => clearIndicatorStyles,
                  indicatorSeparator: () => indicatorSeparatorStyles,
                  dropdownIndicator: () => dropdownIndicatorStyles,
                  menu: () => menuStyles,
                  groupHeading: () => groupHeadingStyles,
                  option: ({ isFocused, isSelected }) =>
                    clsx(
                      isFocused && optionStyles.focus,
                      isSelected && optionStyles.selected,
                      optionStyles.base
                    ),
                  noOptionsMessage: () => noOptionsMessageStyles,
                }}
              />
              {/* <Select
                // className='w-96 rounded-full'
                isMulti
                onChange={selectChange}
                // unstyled
                classNames={{
                  control: ({ isFocused }) =>
                    clsx(
                      'border rounded-full px-3 min-w-[200px] bg-green-100'
                      // isFocused ? 'border-green-500' : 'border-none'
                    ),
                  multiValue: () => 'bg-red-300',
                  multiValueLabel: () => 'bg-red-050',
                  multiValueRemove: () => 'bg-red-8s00',
                }}
                options={categories.map(category => ({
                  value: category.title,
                  label: category.title,
                }))}
              /> */}
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
                  !searchedCategories.every((v: any) =>
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
