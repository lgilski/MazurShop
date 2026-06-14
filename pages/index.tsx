import { groq } from 'next-sanity';
import { client, clientRead } from '@/sanity/lib/client';
import Head from 'next/head';
import Hero from '@/components/Home/Hero';
import Features from '@/components/Home/Features/Features';
import BuyNowSection from '@/components/Home/BuyNowSection';
import BestProducts from '@/components/Home/BestProducts';
import { ProductState, ProductType } from '@/types/types';
import LastSeen from '@/components/Home/LastSeen';
import About from '@/components/Home/About';
import ShippingSection from '@/components/Home/ShippingSection';
import QuoteSection from '@/components/Home/QuoteSection';
import NewestFood from '@/components/Home/NewestKatTwo';
import {
  newestKatTwoQuery,
  newestKatOneQuery,
  productsDetailsQuery,
} from '@/api/queries';
import { productActions } from '@/store/product';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import NewestKatOne from '@/components/Home/NewestKatOne';
import NewestKatTwo from '@/components/Home/NewestKatTwo';

export const getStaticProps = async () => {
  const data = await clientRead.fetch(productsDetailsQuery);
  const newestKatOneData = await clientRead.fetch(newestKatOneQuery);
  const newestKatTwoData = await clientRead.fetch(newestKatTwoQuery);

  return {
    props: { data, newestKatOneData, newestKatTwoData },
    revalidate: 2,
  };
};

export default function Home({
  data,
  newestKatOneData,
  newestKatTwoData,
}: {
  data: ProductType[];
  newestKatOneData: ProductType[];
  newestKatTwoData: ProductType[];
}) {
  const dispatch = useDispatch();
  const products = useSelector((state: ProductState) => state.products);

  clientRead
    .fetch(
      groq`*[_type == "product" && defined(slug.current)]{
    image, details, leftInStock, name, price, discount, slug, shouldBeOnTheBest, _id
  }`,
    )
    .then(data => dispatch(productActions.setProducts(data)));

  clientRead
    .listen(
      groq`*[_type == "product" && defined(slug.current)]{
    image, details, leftInStock, name, price, discount, slug, shouldBeOnTheBest, _id
  }`,
    )
    .subscribe(async update => {
      dispatch(productActions.updateProducts(update));
    });

  return (
    <>
      <Head>
        <title>MazurShop</title>
      </Head>
      {/* <Cart products={data} /> */}
      <Hero />

      <BestProducts products={data} />
      {/* <Features /> */}
      <LastSeen products={data} />
      <NewestKatOne newestKatOneData={newestKatOneData} />
      <NewestKatTwo newestKatTwoData={newestKatTwoData} />
      {/* <QuoteSection /> */}
      {/* <About />
      <ShippingSection /> */}
      <BuyNowSection />
    </>
  );
}
