import { groq } from 'next-sanity';
import type { SanityDocument } from '@sanity/client';
import { client, clientRead } from '@/sanity/lib/client';
import Head from 'next/head';
import Hero from '@/components/Home/Hero';
import Navigation from '@/components/common/Navigation';
import Features from '@/components/Home/Features/Features';
import BestProducts from '@/components/Home/BestProducts';
import { useDispatch } from 'react-redux';
import { productActions } from '@/store/product';
import About from '@/components/Home/About';
import ShippingSection from '@/components/Home/ShippingSection';
import QuoteSection from '@/components/Home/QuoteSection';
import BuyNowSection from '@/components/Home/BuyNowSection';

// export const productsQuery = groq`*[_type == "product" && defined(slug.current)]{
//   image, leftInStock, name, price, discount, slug, shouldBeOnTheBest, _id
// }`;

// export const getStaticProps = async () => {
//   const data =
//     await client.fetch(groq`*[_type == "product" && defined(slug.current)]{
//     image, leftInStock, name, price, discount, slug, shouldBeOnTheBest, _id
//   }`);

//   return { props: { data } };
// };

// export default function Home({ data }: { data: SanityDocument[] }) {
export default function Home() {
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

  return (
    <>
      <Head>
        <title>MazurShop</title>
      </Head>
      <Hero />
      <BestProducts />
      <Features />
      <About />
      <ShippingSection />
      {/* <QuoteSection /> */}
      <BuyNowSection />
    </>
  );
}
