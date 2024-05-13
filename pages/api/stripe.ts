import calculatePrice from '@/helpers/calculatePrice';
import { ItemType } from '@/types/types';

const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

// // pages/api/capture-payment.js
// import { stripe } from '../../utils/stripe';

// export default async function handler(req, res) {
//   const { paymentIntentId } = req.body;

//   try {
//     const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId);
//     res.json({ status: 'success', paymentIntent });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ status: 'error', message: 'Payment capture failed' });
//   }
// }

export default async function handler(req: any, res: any) {
  console.log('Received request:', req);
  // console.log('Received response:', res);

  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        submit_type: 'pay',
        payment_method_types: ['card', 'paypal', 'p24', 'blik'],
        shipping_address_collection: 'required',
        shipping_options: [
          { shipping_rate: 'shr_1NuywcG8O1OemN5VNCUDBM3v' },
          { shipping_rate: 'shr_1NuyxKG8O1OemN5VMkoDIVZq' },
        ],
        line_items: req.body.map((item: ItemType) => {
          const img = item.product.image[0].asset._ref;
          const newImage = img
            .replace(
              'image-',
              'https://cdn.sanity.io/images/rwsjsahd/production/'
            )
            .replace('-webp', '.webp')
            .replace('-jpg', '.jpg');

          const priceToDisplay =
            calculatePrice({
              discount: item.product.discount,
              price: item.product.price,
            }) * 100;

          return {
            price_data: {
              currency: 'pln',
              product_data: {
                name: item.product.name,
                images: [newImage],
              },
              unit_amount: priceToDisplay,
            },
            quantity: item.quantity,
          };
        }),
        // expires_at: Math.floor(Date.now() / 1000) + 2,
        mode: 'payment',
        // Causes errors maybe??????
        // payment_intent_data: {
        //   capture_method: 'manual',
        // },
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}`,
      });

      // console.log('SESSION: ', session);

      res.json({
        sessionId: session.id,
        // paymentIntentId: session.payment_intent,
      });
      // res.status(200).json(session);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
