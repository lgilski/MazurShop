import { SanityDocument } from '@sanity/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import { groq } from 'next-sanity';
import { client } from '../../sanity/lib/client';
import Pet from '@/components/Product';
import { useRouter } from 'next/router';

export const petQuery = groq`*[_type == "pet" && slug.current == $slug][0]{
  name
}`;

// Prepare Next.js to know which routes already exist
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await client.fetch(
    // Referes to PARAM [pet], so the "params" must have a "pet"
    groq`*[_type == "pet" && defined(slug.current)][]{
      "params": { "pet": slug.current }
    }`
  );

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryParams = { slug: params?.pet ?? `` };

  const pet = await client.fetch(petQuery, queryParams);

  return {
    props: {
      data: { pet },
    },
  };
};

export default function PetDetails({
  data,
}: {
  data: { pet: SanityDocument };
}) {
  return <Pet pet={data.pet}></Pet>;
}
