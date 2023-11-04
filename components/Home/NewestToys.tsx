import { ProductType } from '@/types/types';
import Product from '../Products/Product';
import ProductsSection from '../Products/ProductsSection';

function NewestToys({ newestToysData }: { newestToysData: ProductType[] }) {
  return (
    <ProductsSection title='Najnowsze zabawki'>
      {newestToysData.map(product => (
        <Product key={product.name} product={product} />
      ))}
    </ProductsSection>
  );
}

export default NewestToys;
