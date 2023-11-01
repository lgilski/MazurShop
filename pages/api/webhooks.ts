import { client, clientRead } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export const productsQuery = groq`*[_type == "product" && defined(slug.current)]{
  image, leftInStock, name, price, discount, slug, shouldBeOnTheBest, _id
}`;

export async function updateDocumentLeftInStock(_id: string, quantity: number) {
  const result = await client
    .patch(_id)
    .dec({ leftInStock: quantity })
    .commit();

  return result;
}

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const listLineItems = req.body.data?.object?.id
        ? await stripe.checkout.sessions.listLineItems(
            req.body.data?.object?.id
          )
        : null;

      const data = await clientRead.fetch(productsQuery);

      listLineItems &&
        listLineItems?.data.forEach(async (boughtItem: any) => {
          const boughtItemData = data.find(
            (product: any) => product.name === boughtItem.description
          );

          await updateDocumentLeftInStock(
            boughtItemData._id,
            boughtItem.quantity
          );
        });

      // event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err: any) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default handler;
