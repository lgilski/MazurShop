import { ProductType } from '@/types/types';
import Product from '../Products/Product';
import ProductsSection from '../Products/ProductsSection';

function BestProducts({ products }: { products: ProductType[] }) {
  return (
    <>
      {products && (
        <ProductsSection title='Rekomendowane'>
          {products.length > 0 &&
            products?.map((productData: ProductType) => {
              if (productData?.shouldBeOnTheBest !== true) return;
              return <Product key={productData?._id} product={productData} />;
            })}
        </ProductsSection>
      )}
    </>
  );
}

export default BestProducts;
