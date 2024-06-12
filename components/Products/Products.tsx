import { ProductType } from '@/types/types';
import Product from './Product';
import { useEffect, useState } from 'react';
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
  const [productsToDisplay, setProductsToDisplay] = useState<
    ProductType[] | []
  >(products);

  const selectChange = function (e: any) {
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

  useEffect(() => {
    const filteredProducts =
      products &&
      products?.filter(productData => {
        if (
          searchedProduct.length > 0 &&
          !productData.name
            .toLocaleLowerCase()
            .includes(searchedProduct.toLocaleLowerCase())
        )
          return;

        if (
          !searchedCategories.every((v: any) =>
            productData.categories.some(category => category.title === v.value)
          )
        )
          return;

        return productData;
      });

    setProductsToDisplay(filteredProducts);
  }, [searchedProduct, searchedCategories]);

  return (
    <>
      {products && (
        <section className='max-w-7xl mx-auto mb-16 mt-32 max-xl:max-w-3xl max-md:max-w-lg flex flex-col'>
          <div className='flex mb-8 justify-between gap-8 px-4 w-[1280px]'>
            <div className='bg-green-200 h-[38px] w-80 flex items-center [&_ion-icon]:p-1 [&_ion-icon]:w-6 [&_ion-icon]:h-6 rounded-full overflow-hidden'>
              <input
                onChange={e => setSearchedProduct(e.target.value)}
                className='bg-green-100 h-full text-base p-2 rounded-l-full w-full placeholder:text-green-600'
                placeholder='Pisz by znaleźć produkty...'
              />
              <ion-icon name='search-outline' />
            </div>
            <div className='w-96 justify-self-end'>
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
            </div>
          </div>
          {productsToDisplay.length <= 0 && (
            <div className='mx-auto grid w-full grid-cols-4 gap-16 '>
              <div className='flex flex-col items-center col-span-4 mt-16'>
                <svg
                  className='text-green-700 bg-green-200 p-3 rounded-full'
                  width='120'
                  height='120'
                  viewBox='-1 -1 17 17'
                  fill=''
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M1.84998 7.49998C1.84998 4.66458 4.05979 1.84998 7.49998 1.84998C10.2783 1.84998 11.6515 3.9064 12.2367 5H10.5C10.2239 5 10 5.22386 10 5.5C10 5.77614 10.2239 6 10.5 6H13.5C13.7761 6 14 5.77614 14 5.5V2.5C14 2.22386 13.7761 2 13.5 2C13.2239 2 13 2.22386 13 2.5V4.31318C12.2955 3.07126 10.6659 0.849976 7.49998 0.849976C3.43716 0.849976 0.849976 4.18537 0.849976 7.49998C0.849976 10.8146 3.43716 14.15 7.49998 14.15C9.44382 14.15 11.0622 13.3808 12.2145 12.2084C12.8315 11.5806 13.3133 10.839 13.6418 10.0407C13.7469 9.78536 13.6251 9.49315 13.3698 9.38806C13.1144 9.28296 12.8222 9.40478 12.7171 9.66014C12.4363 10.3425 12.0251 10.9745 11.5013 11.5074C10.5295 12.4963 9.16504 13.15 7.49998 13.15C4.05979 13.15 1.84998 10.3354 1.84998 7.49998Z'
                    fill='currentColor'
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                  ></path>
                </svg>
                <p className='w-80 text-center mt-4'>
                  Nie znaleziono produktów, które spełniałyby te wyszukiwanie.
                </p>
              </div>
            </div>
          )}
          {productsToDisplay.length > 0 && (
            <div className='mx-auto grid w-full grid-cols-4 gap-16 max-xl:grid-cols-2 max-md:grid-cols-1'>
              {productsToDisplay?.map((productData: ProductType) => (
                <Product key={productData?.name} product={productData} />
              ))}
            </div>
          )}
        </section>
      )}
    </>
  );
}
