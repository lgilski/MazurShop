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

export const productsQuery = groq`*[_type == "product" && defined(slug.current)]{
  image, details, leftInStock, name, price, discount, slug, shouldBeOnTheBest, _id, _key, 'categories': categories[]->{title, _key}
} | order(name asc)`;

export const newestToysQuery = groq`*[_type == 'product' && defined(slug.current) && categories[]->{title}.title match 'Zabawka']{
  _createdAt, image, details, leftInStock, name, price, discount, slug, shouldBeOnTheBest, _id, _key, 'categories': categories[]->{title, _key}
} | order(_createdAt desc)[0...3]`;
export const newestFoodQuery = groq`*[_type == 'product' && defined(slug.current) && categories[]->{title}.title match 'Karma']{
  _createdAt, image, details, leftInStock, name, price, discount, slug, shouldBeOnTheBest, _id, _key, 'categories': categories[]->{title, _key}
} | order(_createdAt desc)[0...3]`;

export const getStaticProps = async () => {
  const data = await clientRead.fetch(productsQuery);
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
  console.log(newestToysData);

  return (
    <>
      <Head>
        <title>MazurShop</title>
      </Head>
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
