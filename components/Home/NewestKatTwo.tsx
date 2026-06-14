import { ProductType } from '@/types/types';
import Product from '../Products/Product';
import ProductsSection from '../Products/ProductsSection';

function NewestKatTwo({
  newestKatTwoData,
}: {
  newestKatTwoData: ProductType[];
}) {
  return (
    <ProductsSection title='Najnowsze z Kategorii 2'>
      {newestKatTwoData.map(product => (
        <Product key={product.name} product={product} />
      ))}
    </ProductsSection>
  );
}

export default NewestKatTwo;
