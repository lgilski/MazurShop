import { productsDetailsQuery } from '@/api/queries';
import { client, clientRead } from '@/sanity/lib/client';

const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function captureFounds(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      const listLineItems = req.body.data?.object?.id
        ? await stripe.paymentIntents.listLineItems(req.body.data?.object?.id)
        : null;

      const data = await clientRead.fetch(productsDetailsQuery);

      const areItemsAvailable =
        listLineItems &&
        listLineItems?.data.forEach(async (boughtItem: any) => {
          const boughtItemData = data.find(
            (product: any) => product.name === boughtItem.description
          );

          return boughtItemData.leftInStock - boughtItem.qantity > 0;
        });

      if (areItemsAvailable.every((element: any) => element === true)) {
        await stripe.paymentIntents.capture(req.id, {
          amount_to_capture: req.amount,
        });
      } else {
        await stripe.paymentIntents.cancel(req.id);
      }
    } catch (error: any) {
      res.status(400).send(`Webhook Error: ${error.message}`);
      return;
    }
    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
