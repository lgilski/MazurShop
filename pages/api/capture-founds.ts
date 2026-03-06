import { productsDetailsQuery } from '@/api/queries';
import { client, clientRead } from '@/sanity/lib/client';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function captureFounds(req: any, res: any) {
  if (req.method === 'POST') {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err: any) {
      console.warn(`Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    if (event.type === 'payment_intent.succeeded') {
      try {
        const sessions = await stripe.checkout.sessions.list({
          limit: 3,
        });

        const paymentIntentCheckout = sessions.data.find(
          (session: any) => session.payment_intent === event.data.object.id,
        );

        const listItems = paymentIntentCheckout
          ? await stripe.checkout.sessions.listLineItems(paymentIntentCheckout.id)
          : null;

        const data = await clientRead.fetch(productsDetailsQuery);

        const areItemsAvailable =
          listItems &&
          listItems?.data.map((boughtItem: any) => {
            const boughtItemData = data.find(
              (product: any) => product.name === boughtItem.description,
            );

            return boughtItemData.leftInStock - boughtItem.quantity >= 0;
          });

        if (
          areItemsAvailable &&
          areItemsAvailable.every((element: any) => element === true)
        ) {
          await stripe.paymentIntents.capture(event.data.object.id, {
            amount_to_capture: event.data.object.amount,
          });
        } else {
          await stripe.paymentIntents.cancel(event.data.object.id);
        }

        res.status(200).json({ received: true });
      } catch (error: any) {
        console.error('Error processing payment intent:', error);
        res.status(400).send(`Webhook Error: ${error.message}`);
      }
    } else {
      // Return a response to acknowledge receipt of the event
      res.status(200).json({ received: true });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
