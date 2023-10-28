import { urlForImage } from '@/sanity/lib/image';
import Price from '../common/Price';
import SelectQuantity from '../common/SelectQuantity';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '@/store/cart';
import { ProductType, WholeState } from '@/types/types';
import Image from 'next/image';

function ProductDetails({ product }: { product: ProductType }) {
  // console.log(product);

  const [imgIndex, setImgIndex] = useState(0);
  const dispatch = useDispatch();

  const currentProduct = useSelector(
    (state: WholeState) => state.product.products
  ).find(innerProduct => innerProduct._id === product._id);

  const handleAddToCart = function () {
    if (currentProduct?.leftInStock === 0) return;

    dispatch(
      cartActions.addToCart({
        currentProduct,
        quantity: Number(ref.current?.value),
      })
    );
  };

  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <>
      {currentProduct && (
        <div className='max-w-7xl  mx-auto mb-16 mt-32 '>
          <section className='grid grid-cols-[2fr_1fr] gap-8 items-start'>
            <div className='flex flex-col max-w-full bg-white rounded-2xl p-4  shadow-md'>
              <Image
                alt=''
                className='w-full aspect-video block object-cover rounded-lg'
                src={
                  currentProduct?.image
                    ? urlForImage(currentProduct?.image[imgIndex]).toString()
                    : ''
                }
                width={0}
                height={0}
                sizes='100vw'
                style={{ width: '100%', height: 'auto' }}
              />
              <div className='flex gap-4 mt-4 justify-center items-center'>
                {currentProduct?.image.map((imageInner, index) => (
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
                        currentProduct?.image
                          ? urlForImage(imageInner).toString()
                          : ''
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
              <h4 className='text-3xl font-medium mb-4'>
                {currentProduct.name}
              </h4>
              <h6 className='font-medium'>Details:</h6>
              <p className='mb-12'>{currentProduct.details}</p>
              <div className='flex items-center gap-4 relative '>
                {currentProduct.discount && (
                  <p className=' flex w-10 h-10 items-center justify-center  text-base font-medium p-1 bg-purple-200 text-purple-900 rounded-full'>
                    -{currentProduct.discount}%
                  </p>
                )}
                <Price
                  discount={currentProduct.discount}
                  price={currentProduct.price}
                />
              </div>
              <div className='flex items-baseline gap-2 mb-4 pt-2'>
                <SelectQuantity product={currentProduct} ref={ref} />
                <p className='font-medium'>
                  {currentProduct.leftInStock > 0
                    ? `${currentProduct.leftInStock} left in stock`
                    : 'sold out'}
                </p>
              </div>
              <div className='flex flex-col'>
                <button
                  onClick={handleAddToCart}
                  className='text-xl flex-grow bg-green-700 px-4 py-2 rounded-full text-green-050 hover:bg-green-500 duration-200 mb-4'
                >
                  Add to cart
                </button>
                <button
                  onClick={() => {
                    handleAddToCart();
                    dispatch(cartActions.setShowCart());
                  }}
                  className='text-xl flex-grow bg-green-700 px-4 py-2 rounded-full text-green-050 hover:bg-green-500 duration-200'
                >
                  Buy now
                </button>
                <p className='text-sm text-grey-600'>
                  Buy now will take you to the summery.
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
