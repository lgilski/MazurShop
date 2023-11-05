import { groq } from 'next-sanity';

export const productsDetailsQuery = groq`*[_type == "product" && defined(slug.current)]{
  image, details, leftInStock, name, price, discount, slug, shouldBeOnTheBest, _id, 'categories': categories[]->{title, _id}
} | order(name asc)`;

export const allProductsQuery = groq`*[_type == 'product']`;

export const newestToysQuery = groq`*[_type == 'product' && defined(slug.current) && categories[]->{title}.title match 'Zabawka']{
  _createdAt, image, details, leftInStock, name, price, discount, slug, shouldBeOnTheBest, _id, 'categories': categories[]->{title, _id}
} | order(_createdAt desc)[0...3]`;

export const newestFoodQuery = groq`*[_type == 'product' && defined(slug.current) && categories[]->{title}.title match 'Karma']{
  _createdAt, image, details, leftInStock, name, price, discount, slug, shouldBeOnTheBest, _id, 'categories': categories[]->{title, _id}
} | order(_createdAt desc)[0...3]`;
