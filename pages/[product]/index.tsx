import { GetStaticPaths, GetStaticProps } from 'next';
import { groq } from 'next-sanity';
import { client, clientRead } from '../../sanity/lib/client';
import ProductDetails from '@/components/Products/ProductDetails';
import { ProductType } from '@/types/types';
import { useDispatch } from 'react-redux';
import { productActions } from '@/store/product';

// To get referenced data:
// something[]->

export const productQuery = groq`*[_type == "product" && slug.current == $slug][0]{
  details, 'categories': categories[]->{title, _id}, image, leftInStock, name, price, discount, slug, _id,
}`;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await clientRead.fetch(
    // Referes to PARAM [product], so the "params" must have a "product"
    groq`*[_type == "product" && defined(slug.current)][]{
      "params": { "product": slug.current }
    }`
  );

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryParams = { slug: params?.product ?? `` };

  const product = await clientRead.fetch(productQuery, queryParams);

  return {
    props: {
      product,
    },
    revalidate: 3,
  };
};

export default function ProductDetailsPage({
  product,
}: {
  product: ProductType;
}) {
  return <ProductDetails product={product} />;
}
