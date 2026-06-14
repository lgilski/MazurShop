import { ProductType } from '@/types/types';
import Product from '../Products/Product';
import ProductsSection from '../Products/ProductsSection';

function NewestKatOne({
  newestKatOneData,
}: {
  newestKatOneData: ProductType[];
}) {
  return (
    <ProductsSection title='Najnowsze z Kategorii 1'>
      {newestKatOneData.map(product => (
        <Product key={product.name} product={product} />
      ))}
    </ProductsSection>
  );
}

export default NewestKatOne;
