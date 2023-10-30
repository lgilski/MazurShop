import { groq } from 'next-sanity';
import type { SanityDocument } from '@sanity/client';
import { client, clientRead } from '@/sanity/lib/client';
import Head from 'next/head';
import Hero from '@/components/Home/Hero';
import dynamic from 'next/dynamic';
import Navigation from '@/components/common/Navigation';
import Features from '@/components/Home/Features/Features';
import { useDispatch } from 'react-redux';
import { productActions } from '@/store/product';
import About from '@/components/Home/About';
import ShippingSection from '@/components/Home/ShippingSection';
import QuoteSection from '@/components/Home/QuoteSection';
import BuyNowSection from '@/components/Home/BuyNowSection';
const BestProductsNoSSR = dynamic(
  () => import('@/components/Home/BestProducts'),
  { ssr: false }
);

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
    image, details, leftInStock, name, price, discount, slug, shouldBeOnTheBest, _id, categories
  }`
    )
    .then(data => dispatch(productActions.setProducts(data)));

  clientRead
    .listen(
      groq`*[_type == "product" && defined(slug.current)]{
    image, details, leftInStock, name, price, discount, slug, shouldBeOnTheBest, _id, categories
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
      <BestProductsNoSSR />
      <Features />
      <div>LAST SEEN</div>
      <div>ALSO IN THIS CATEGORY</div>
      <div>FOR CATS</div>
      <div>FOR DOGS</div>
      {/* <About /> */}
      {/* <ShippingSection /> */}
      {/* <QuoteSection /> */}
      <BuyNowSection />
    </>
  );
}
