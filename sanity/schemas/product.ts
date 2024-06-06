import { defineArrayMember, defineField, defineType } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 90,
      },
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
    }),
    defineField({
      name: 'discount',
      title: 'Discount',
      description: 'Type only the number',
      type: 'number',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'shouldBeOnTheBest',
      title: 'Should be on the best?',
      type: 'boolean',
    }),
    defineField({
      name: 'leftInStock',
      title: 'Left in stock',
      type: 'number',
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [defineArrayMember({ type: 'image' })],
      // options: {
      //   hotspot: true,
      // },
    }),
  ],
  orderings: [
    {
      title: 'By title',
      name: 'byTitle',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
});
