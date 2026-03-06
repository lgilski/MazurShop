import { productsDetailsQuery } from '@/api/queries';
import { client, clientRead } from '@/sanity/lib/client';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const handler = async (req: any, res: any) => {
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
          limit: 15,
        });

        const paymentIntentCheckout = sessions.data.find(
          (session: any) => session.payment_intent === event.data.object.id,
        );

        const listLineItems = paymentIntentCheckout
          ? await stripe.checkout.sessions.listLineItems(paymentIntentCheckout.id)
          : null;

        const allProductsData = await clientRead.fetch(productsDetailsQuery);

        // Process inventory updates sequentially to avoid race conditions
        if (listLineItems && listLineItems.data) {
          for (const boughtItem of listLineItems.data) {
            const boughtItemData = allProductsData.find(
              (product: any) => product.name === boughtItem.description,
            );

            if (boughtItemData) {
              await client
                .patch(boughtItemData._id)
                .dec({ leftInStock: boughtItem.quantity })
                .commit();
            }
          }
        }

        res.status(200).json({ received: true });
      } catch (err: any) {
        console.error('Error processing webhook:', err);
        res.status(400).send(`Webhook Error: ${err.message}`);
      }
    } else {
      // Return a response to acknowledge receipt of the event
      res.status(200).json({ received: true });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default handler;
