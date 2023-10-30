import { SanityDocument } from '@sanity/client';
import dynamic from 'next/dynamic';
import { GetStaticPaths, GetStaticProps } from 'next';
import { groq } from 'next-sanity';
import { client } from '../../sanity/lib/client';
// import ProductDetails from '@/components/Products/ProductDetails';
const ProductDetails = dynamic(
  () => import('@/components/Products/ProductDetails'),
  { ssr: false }
);
import { ProductType } from '@/types/types';
import { useDispatch } from 'react-redux';
import { productActions } from '@/store/product';

export const productQuery = groq`*[_type == "product" && slug.current == $slug][0]{
  details, image, leftInStock, name, price, discount, slug, _id
}`;

// Prepare Next.js to know which routes already exist
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await client.fetch(
    // Referes to PARAM [product], so the "params" must have a "product"
    groq`*[_type == "product" && defined(slug.current)][]{
      "params": { "product": slug.current }
    }`
  );

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryParams = { slug: params?.product ?? `` };

  const product = await client.fetch(productQuery, queryParams);
  const categorieNames = await client.fetch(
    groq`*[_type == "category"]{title, _id}`
  );

  return {
    props: {
      product,
      categorieNames,
    },
    // revalidate: 1,
  };
};

export default function ProductDetailsPage({
  product,
  categorieNames,
}: {
  product: ProductType;
  categorieNames: any;
}) {
  const dispatch = useDispatch();

  console.log(categorieNames);

  client
    .fetch(
      groq`*[_type == "product" && defined(slug.current)]{
    image, details, leftInStock, name, price, discount, slug, shouldBeOnTheBest, _id
  }`
    )
    .then(data => dispatch(productActions.setProducts(data)));

  client
    .listen(
      groq`*[_type == "product" && defined(slug.current)][0]{
    details, image, leftInStock, name, price, discount, slug, _id
  }`
    )
    .subscribe(async update => {
      dispatch(productActions.updateProducts(update));
    });

  return <ProductDetails product={product} />;
}
