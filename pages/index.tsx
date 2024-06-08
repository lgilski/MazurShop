import { groq } from 'next-sanity';
import { clientRead } from '@/sanity/lib/client';
import Head from 'next/head';
import Hero from '@/components/Home/Hero';
import Features from '@/components/Home/Features/Features';
import BuyNowSection from '@/components/Home/BuyNowSection';
import BestProducts from '@/components/Home/BestProducts';
import { ProductType } from '@/types/types';
import LastSeen from '@/components/Home/LastSeen';
import NewestToys from '@/components/Home/NewestToys';
import About from '@/components/Home/About';
import ShippingSection from '@/components/Home/ShippingSection';
import QuoteSection from '@/components/Home/QuoteSection';
import NewestFood from '@/components/Home/NewestFood';
import {
  newestFoodQuery,
  newestToysQuery,
  productsDetailsQuery,
} from '@/api/queries';

export const getStaticProps = async () => {
  const data = await clientRead.fetch(productsDetailsQuery);
  const newestToysData = await clientRead.fetch(newestToysQuery);
  const newestFoodData = await clientRead.fetch(newestFoodQuery);

  return {
    props: { data, newestToysData, newestFoodData },
    revalidate: 1,
  };
};

export default function Home({
  data,
  newestToysData,
  newestFoodData,
}: {
  data: ProductType[];
  newestToysData: ProductType[];
  newestFoodData: ProductType[];
}) {
  return (
    <>
      <Head>
        <title>MazurShop</title>
      </Head>
      {/* <Cart products={data} /> */}
      <Hero />

      <BestProducts products={data} />
      <Features />
      <LastSeen products={data} />
      <NewestToys newestToysData={newestToysData} />
      <NewestFood newestFoodData={newestFoodData} />
      {/* <QuoteSection /> */}
      {/* <About />
      <ShippingSection /> */}
      <BuyNowSection />
    </>
  );
}
