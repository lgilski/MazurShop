import { ProductType, WholeState } from '@/types/types';
import Product from '../Products/Product';
import { useSelector } from 'react-redux';

function BestProducts() {
  const data = useSelector((state: WholeState) => state.product.products);

  return (
    <>
      {data && (
        <section className='max-w-7xl mx-auto mb-16'>
          <h4 className='text-5xl text-center mb-8 font-bold text-green-900'>
            Our best products
          </h4>
          <div className='grid grid-cols-3 gap-16'>
            {data.length > 0 &&
              data?.map((productData: ProductType) => {
                if (productData?.shouldBeOnTheBest !== true) return;
                return <Product key={productData?._id} product={productData} />;
              })}
          </div>
        </section>
      )}
    </>
  );
}

export default BestProducts;
