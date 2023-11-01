import { ProductType } from '@/types/types';
import Product from '../Products/Product';
import ProductsSection from '../Products/ProductsSection';

function NewestFood({ newestFoodData }: { newestFoodData: ProductType[] }) {
  return (
    <ProductsSection title='Najnowsze karmy'>
      {newestFoodData.map(product => (
        <Product key={product._key} product={product} />
      ))}
    </ProductsSection>
  );
}

export default NewestFood;
