import { productsDetailsQuery } from '@/api/queries';
import Products from '@/components/Products/Products';
import { clientRead } from '@/sanity/lib/client';
import { ProductType } from '@/types/types';
import { groq } from 'next-sanity';

export const categoriesQuery = groq`*[_type == "category"]{title, _id}`;

export const getStaticProps = async () => {
  const data = await clientRead.fetch(productsDetailsQuery);
  const categories = await clientRead.fetch(categoriesQuery);

  return {
    props: { data, categories },
    revalidate: 3,
  };
};

export default function ProductsPage({
  data,
  categories,
}: {
  data: ProductType[];
  categories: { title: string; _id: string }[];
}) {
  return <Products products={data} categories={categories} />;
}
