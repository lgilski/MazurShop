import { groq } from 'next-sanity';
import type { SanityDocument } from '@sanity/client';
import Pets from '@/components/Products';
import { client } from '@/sanity/lib/client';
import Head from 'next/head';
import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import Features from '@/components/Features';
import BestProducts from '@/components/BestProducts';
import { useDispatch } from 'react-redux';
import { productActions } from '@/store/product';

export const productsQuery = groq`*[_type == "product" && defined(slug.current)]{
  image, leftInStock, name, price, discount, slug, shouldBeOnTheBest, _id
}`;

export const getStaticProps = async () => {
  const data = await client.fetch(productsQuery);

  return { props: { data } };
};

export default function Home({ data }: { data: SanityDocument[] }) {
  const dispatch = useDispatch();

  console.log(data);

  dispatch(productActions.setProducts(data));

  client.listen(productsQuery).subscribe(async update => {
    console.log(update);

    dispatch(productActions.updateProducts(update));
  });

  return (
    <>
      <Head>
        <title>uwu</title>
      </Head>
      <Hero />
      <Features />
      <BestProducts />
    </>
  );
}
