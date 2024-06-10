import { groq } from 'next-sanity';
import { client, clientRead } from '@/sanity/lib/client';
import Head from 'next/head';
import Hero from '@/components/Home/Hero';
import Features from '@/components/Home/Features/Features';
import BuyNowSection from '@/components/Home/BuyNowSection';
import BestProducts from '@/components/Home/BestProducts';
import { ProductState, ProductType } from '@/types/types';
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
import { productActions } from '@/store/product';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export const getStaticProps = async () => {
  const data = await clientRead.fetch(productsDetailsQuery);
  const newestToysData = await clientRead.fetch(newestToysQuery);
  const newestFoodData = await clientRead.fetch(newestFoodQuery);

  return {
    props: { data, newestToysData, newestFoodData },
    revalidate: 2,
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
  const dispatch = useDispatch();
  const products = useSelector((state: ProductState) => state.products);

  clientRead
    .fetch(
      groq`*[_type == "product" && defined(slug.current)]{
    image, details, leftInStock, name, price, discount, slug, shouldBeOnTheBest, _id
  }`
    )
    .then(data => dispatch(productActions.setProducts(data)));

  // console.log(data);

  // dispatch(productActions.setProducts(data));

  clientRead
    .listen(
      groq`*[_type == "product" && defined(slug.current)]{
    image, details, leftInStock, name, price, discount, slug, shouldBeOnTheBest, _id
  }`
    )
    .subscribe(async update => {
      // console.log(update);

      dispatch(productActions.updateProducts(update));
    });

  // useEffect(() => {
  //   console.log(products);
  // }, [products]);

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
