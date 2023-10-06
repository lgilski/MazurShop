import Products from '@/components/Products/Products';
import { clientRead } from '@/sanity/lib/client';
import { productActions } from '@/store/product';
import { groq } from 'next-sanity';
import { useDispatch } from 'react-redux';

export default function ProductsPage() {
  const dispatch = useDispatch();

  clientRead
    .fetch(
      groq`*[_type == "product" && defined(slug.current)]{
    image, details, leftInStock, name, price, discount, slug, shouldBeOnTheBest, _id
  }`
    )
    .then(data => dispatch(productActions.setProducts(data)));

  clientRead
    .listen(
      groq`*[_type == "product" && defined(slug.current)]{
    image, details, leftInStock, name, price, discount, slug, shouldBeOnTheBest, _id
  }`
    )
    .subscribe(async update => {
      dispatch(productActions.updateProducts(update));
    });

  return <Products />;
}
