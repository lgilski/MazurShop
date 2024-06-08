import { productsDetailsQuery } from '@/api/queries';
import { client, clientRead } from '@/sanity/lib/client';

const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function captureFounds(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      const sessions = await stripe.checkout.sessions.list({
        limit: 3,
      });

      // console.log('Req object: ', req.body);

      // console.log('Sessions: ', sessions.data);

      // console.log(sessions.data[0].payment_intent, req.body.object.id);
      // console.log(sessions.data[1].payment_intent, req.body.object.id);

      const paymentIntentCheckout = sessions.data.find(
        (session: any) => session.payment_intent === req.body.data.object.id
      );

      // console.log('paymentIntentCheckout: ', paymentIntentCheckout);
      // console.log('paymentIntentCheckout: ', paymentIntentCheckout.id);

      const listItems = paymentIntentCheckout
        ? await stripe.checkout.sessions.listLineItems(paymentIntentCheckout.id)
        : null;
      // console.log('listItems:', listItems);

      const data = await clientRead.fetch(productsDetailsQuery);

      const areItemsAvailable =
        listItems &&
        listItems?.data.map((boughtItem: any) => {
          const boughtItemData = data.find(
            (product: any) => product.name === boughtItem.description
          );

          return boughtItemData.leftInStock - boughtItem.quantity > 0;
        });

      if (
        areItemsAvailable &&
        areItemsAvailable.every((element: any) => element === true)
      ) {
        await stripe.paymentIntents.capture(req.body.data.object.id, {
          amount_to_capture: req.body.data.object.amount,
        });
      } else {
        await stripe.paymentIntents.cancel(req.body.data.object.id);
      }

      res.status(200);
    } catch (error: any) {
      res.status(400).send(`Webhook Error: ${error}`);
      return;
    }
    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

//
