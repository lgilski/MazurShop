import Products from '@/components/Products/Products';
import { clientRead } from '@/sanity/lib/client';
import { ProductType } from '@/types/types';
import { groq } from 'next-sanity';

export const productsQuery = groq`*[_type == "product" && defined(slug.current)]{
  image, details, leftInStock, name, price, discount, slug, shouldBeOnTheBest, _id, 'categories': categories[]->{title, _key}
} | order(name asc)`;

export const categoriesQuery = groq`*[_type == "category"]{title, _id}`;

export const getStaticProps = async () => {
  const data = await clientRead.fetch(productsQuery);
  const categories = await clientRead.fetch(categoriesQuery);

  return {
    props: { data, categories },
    revalidate: 1,
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
