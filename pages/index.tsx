import { groq } from 'next-sanity';
import type { SanityDocument } from '@sanity/client';
import Pets from '@/components/Products';
import { client } from '@/sanity/lib/client';
import Head from 'next/head';
import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import Features from '@/components/Features';
import BestProducts from '@/components/BestProducts';

export const postsQuery = groq`*[_type == "product" && defined(slug.current) && shouldBeOnTheBest == true]{
  image, leftInStock, name, price, discount, slug, _id
}`;

export default function Home({ data }: { data: SanityDocument[] }) {
  // client
  //   .listen(postsQuery)
  //   .subscribe(async update => await client.fetch(postsQuery));

  return (
    <>
      <Head>
        <title>uwu</title>
      </Head>
      {/* <Navigation /> */}
      <Hero />
      <Features />
      <BestProducts data={data} />
    </>
  );
}

export const getStaticProps = async () => {
  const data = await client.fetch(postsQuery);

  return { props: { data } };
};
