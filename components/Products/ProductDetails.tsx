import { urlForImage } from '@/sanity/lib/image';
import Price from '../common/Price';
import SelectQuantity from '../common/SelectQuantity';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '@/store/cart';
import { ProductType, WholeState } from '@/types/types';
import Image from 'next/image';
import checkIfQuantityIsValid from '@/helpers/checkIfQuantityIsValid';

function ProductDetails({ product }: { product: ProductType }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: WholeState) => state.cart.items);

  const [imgIndex, setImgIndex] = useState(0);
  const ref = useRef<HTMLInputElement | null>(null);

  const handleAddToCart = function () {
    const itemObject = checkIfQuantityIsValid({
      cartItems,
      product,
      currentQuantityToAdd: Number(ref.current?.value),
    });

    if (!itemObject) return;

    dispatch(cartActions.addToCart(itemObject));
  };

  return (
    <>
      {product && (
        <div
          key={product.name}
          className='w-[1280px] mx-auto mb-16 mt-32 max-xl:w-full max-xl:max-w-7xl'
        >
          <section className='grid grid-cols-[2fr_1fr] gap-8 items-start max-w-full'>
            <div className='flex flex-col max-w-full bg-white rounded-2xl p-4  shadow-md'>
              <Image
                alt=''
                className='w-full aspect-video block object-cover rounded-lg'
                src={
                  product?.image
                    ? urlForImage(product?.image[imgIndex]).toString()
                    : ''
                }
                width={0}
                height={0}
                sizes='100vw'
                style={{ width: '100%', height: 'auto' }}
              />
              <div className='flex gap-4 mt-4 justify-center items-center'>
                {product?.image.map((imageInner, index) => (
                  <div
                    key={imageInner._key}
                    className={`relative w-[20%] rounded overflow-hidden ${
                      index === imgIndex &&
                      'after:content-[""] after:absolute after:top-0 after:right-0 after:w-full after:h-full after:inline-block after:bg-detail-image after:z-[2]'
                    }`}
                  >
                    <Image
                      alt=''
                      className={` relative aspect-square block object-cover cursor-pointer`}
                      src={
                        product?.image ? urlForImage(imageInner).toString() : ''
                      }
                      onClick={() => setImgIndex(index)}
                      width={0}
                      height={0}
                      sizes='100vw'
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className='pt-8 relative flex flex-col bg-white rounded-2xl p-4 shadow-md'>
              <h4 className='text-3xl font-medium '>{product.name}</h4>
              <div className='flex mb-4 gap-2 flex-wrap'>
                {product.categories &&
                  product.categories.map(category => (
                    <div
                      key={category.title}
                      className='text-sm uppercase rounded-full bg-green-100 px-2 py-0.5 font-medium text-green-800'
                    >
                      {category.title}
                    </div>
                  ))}
              </div>
              <h6 className='font-medium'>Szczegóły:</h6>
              <p className='mb-12'>{product.details}</p>
              <div className='flex items-center gap-4 relative '>
                {product.discount && (
                  <p className=' flex w-10 h-10 items-center justify-center  text-base font-medium p-1 bg-purple-200 text-purple-900 rounded-full'>
                    -{product.discount}%
                  </p>
                )}
                <Price discount={product.discount} price={product.price} />
              </div>
              <div className='flex items-baseline gap-2 mb-4 pt-2'>
                <SelectQuantity product={product} ref={ref} />
                <p className='font-medium'>
                  {product.leftInStock > 0
                    ? `${product.leftInStock} sztuk`
                    : 'wyprzedane'}
                </p>
              </div>
              <div className='flex flex-col'>
                <button
                  onClick={handleAddToCart}
                  disabled={product.leftInStock <= 0 ? true : false}
                  className={`text-xl flex-grow px-4 py-2 rounded-full duration-200 mb-4 ${
                    product.leftInStock <= 0
                      ? 'bg-gray-300 hover:bg-gray-300 text-gray-500'
                      : 'bg-green-700 text-green-050 hover:bg-green-500'
                  }`}
                >
                  Dodaj do koszyka
                </button>
                <button
                  onClick={() => {
                    handleAddToCart();
                    dispatch(cartActions.setShowCart());
                  }}
                  disabled={product.leftInStock <= 0 ? true : false}
                  className={`text-xl flex-grow px-4 py-2 rounded-full duration-200 ${
                    product.leftInStock <= 0
                      ? 'bg-gray-300 hover:bg-gray-300 text-gray-500'
                      : 'bg-green-700 text-green-050 hover:bg-green-500'
                  }`}
                >
                  Kup teraz
                </button>
                <p className='text-sm text-grey-600'>
                  Kup teraz zabierze Cię do podsumowania.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
