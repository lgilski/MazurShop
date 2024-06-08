import calculatePrice from '@/helpers/calculatePrice';
import { ItemType } from '@/types/types';
import { NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req: any, res: any) {
  // console.log('Received response:', res);

  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        submit_type: 'pay',
        // payment_method_types: ['card', 'paypal', 'p24', 'blik'],
        payment_method_types: ['card', 'paypal'],
        shipping_address_collection: {
          allowed_countries: ['PL'],
        },
        // billing_address_collection: 'required',
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
        payment_intent_data: {
          capture_method: 'manual',
        },
        // return_url: `${req.headers.get('origin')}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
        // return_url: `http://localhost:3000/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });

      res.status(200).json(session);

      // res.send({ clientSecret: session.client_secret });
      // return NextResponse.json({
      //   id: session.id,
      //   client_secret: session.cliet_secret,
      // });
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
