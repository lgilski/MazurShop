import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export const productsQuery = groq`*[_type == "product" && defined(slug.current)]{
  image, leftInStock, name, price, discount, slug, shouldBeOnTheBest, _id
}`;

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    // console.log(req.body);

    //   client
    // .patch('bike-123') // Document ID to patch
    // .set({inStock: false}) // Shallow merge
    // .inc({numSold: 1}) // Increment field by count
    // .commit() // Perform the patch and return a promise
    const listLineItems = await stripe.checkout.sessions.listLineItems(
      req.body.data.object.id
    );

    const data = await client.fetch(productsQuery);

    // console.log('LINE ITEM: ', listLineItems, data);

    listLineItems.data.forEach((boughtItem: any) => {
      const boughtItemData = data.find(
        (product: any) => product.name === boughtItem.description
      );

      console.log('BOUGHT ITEM: ', boughtItem);
      console.log('BOUGHT ITEM DATA: ', boughtItemData);

      // DECREMENT THE STOCK!!!!!

      console.log(
        client
          .patch(boughtItemData._id)
          .dec({ leftInStock: boughtItem.quantity })
          .commit()
      );
      // .then(updatedProduct => {
      //   console.log('Hurray, the product is updated! New document:');
      //   console.log(updatedProduct);
      // })
      // .catch(err => {
      //   console.error('Oh no, the update failed: ', err.message);
      // });
    });

    try {
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
