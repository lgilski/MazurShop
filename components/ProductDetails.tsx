import { urlForImage } from '@/sanity/lib/image';
import Price from './Price';
import SelectQuantity from './SelectQuantity';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from '@/store/cart';
import { ProductType } from '@/types/types';

function ProductDetails({ product }: { product: ProductType }) {
  // console.log(product);

  const [imgIndex, setImgIndex] = useState(0);
  const dispatch = useDispatch();

  const sendAddToCart = function () {
    if (product.leftInStock === 0) return;

    dispatch(
      cartActions.addToCart({ product, quantity: Number(ref.current?.value) })
    );
  };

  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <div className='max-w-7xl  mx-auto mb-16 mt-32 '>
      <section className='grid grid-cols-[2fr_1fr] gap-8 items-start'>
        <div className='flex flex-col max-w-full bg-white rounded-2xl p-4  shadow-md'>
          <img
            className='w-full aspect-video block object-cover rounded-lg'
            src={urlForImage(product.image[imgIndex]).toString()}
          />
          <div className='flex gap-4 mt-4 justify-center items-center'>
            {product.image.map((imageInner, index) => (
              <div
                key={imageInner._key}
                className={`relative w-[20%] rounded overflow-hidden ${
                  index === imgIndex &&
                  'after:content-[""] after:absolute after:top-0 after:right-0 after:w-full after:h-full after:inline-block after:bg-detail-image after:z-[2]'
                }`}
              >
                <img
                  className={` relative aspect-square block object-cover cursor-pointer`}
                  src={urlForImage(imageInner).toString()}
                  onClick={() => setImgIndex(index)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='pt-8 relative flex flex-col bg-white rounded-2xl p-4 shadow-md'>
          <h4 className='text-3xl font-medium mb-4'>{product.name}</h4>
          <h6 className='font-medium'>Details:</h6>
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
              {product.leftInStock !== 0
                ? `only ${product.leftInStock} left`
                : 'sold out'}
            </p>
          </div>
          <div className='flex flex-col'>
            <button
              onClick={sendAddToCart}
              className='text-xl flex-grow bg-green-700 px-4 py-2 rounded-full text-green-050 hover:bg-green-500 duration-200 mb-4'
            >
              Add to cart
            </button>
            <button
              onClick={() => {
                sendAddToCart();
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
  );
}

export default ProductDetails;
