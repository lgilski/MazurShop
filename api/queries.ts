import { groq } from 'next-sanity';

export const productsDetailsQuery = groq`*[_type == "product" && defined(slug.current)]{
  image, details, leftInStock, name, price, discount, slug, shouldBeOnTheBest, _id, 'categories': categories[]->{title, _id}
} | order(name asc)`;

export const allProductsQuery = groq`*[_type == 'product']`;

export const newestKatOneQuery = groq`*[_type == 'product' && defined(slug.current) && categories[]->{title}.title match 'Kategoria 1']{
  _createdAt, image, details, leftInStock, name, price, discount, slug, shouldBeOnTheBest, _id, 'categories': categories[]->{title, _id}
} | order(_createdAt desc)[0...3]`;

export const newestKatTwoQuery = groq`*[_type == 'product' && defined(slug.current) && categories[]->{title}.title match 'Kategoria 2']{
  _createdAt, image, details, leftInStock, name, price, discount, slug, shouldBeOnTheBest, _id, 'categories': categories[]->{title, _id}
} | order(_createdAt desc)[0...3]`;
