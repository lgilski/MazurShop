import { SanityDocument } from '@sanity/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import { groq } from 'next-sanity';
import { client } from '../../sanity/lib/client';
import ProductDetails from '@/components/ProductDetails';

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

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryParams = { slug: params?.product ?? `` };

  const product = await client.fetch(productQuery, queryParams);

  return {
    props: {
      product,
    },
  };
};

export default function ProductDetailsPage({
  product,
}: {
  product: SanityDocument;
}) {
  // client.listen(productQuery, queryParams).subscribe(async update => {
  //   console.log(update);

  //   dispatch(cartActions.updateProducts(update));
  // });

  return <ProductDetails product={product} />;
}
