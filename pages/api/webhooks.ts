import { productsDetailsQuery } from '@/api/queries';
import { client, clientRead } from '@/sanity/lib/client';

const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

// export async function updateDocumentLeftInStock(_id: string, quantity: number) {
//   const result = await client
//     .patch(_id)
//     .dec({ leftInStock: quantity })
//     .commit();

//   console.log('Updated!! ', _id, quantity);

//   return result;
// }

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const sessions = await stripe.checkout.sessions.list({
        limit: 15,
      });

      const paymentIntentCheckout = sessions.data.find(
        (session: any) => session.payment_intent === req.body.data?.object.id
      );

      const listLineItems = paymentIntentCheckout
        ? await stripe.checkout.sessions.listLineItems(paymentIntentCheckout.id)
        : null;

      const allProductsData = await clientRead.fetch(productsDetailsQuery);

      // console.log(listLineItems);

      listLineItems &&
        listLineItems?.data.forEach(async (boughtItem: any) => {
          const boughtItemData = allProductsData.find(
            (product: any) => product.name === boughtItem.description
          );

          await client
            .patch(boughtItemData._id)
            .dec({ leftInStock: boughtItem.quantity })
            .commit();

          // await updateDocumentLeftInStock(
          //   boughtItemData._id,
          //   boughtItem.quantity
          // );
        });

      // console.log(update);

      // res.status(200);
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
