import calculatePrice from '@/helpers/calculatePrice';
import { ItemType } from '@/types/types';

const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        submit_type: 'pay',
        payment_method_types: ['card', 'paypal', 'p24', 'blik'],
        // payment_intent_data: {
        //   capture_method: 'manual',
        // },
        billing_address_collection: 'required',
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
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.status(200).json(session);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
