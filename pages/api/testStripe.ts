import calculatePrice from '@/helpers/calculatePrice';
import { ItemType } from '@/types/types';
import { NextRequest, NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(request: any, res: any) {
  console.log('REQUEEEEESTTTT', request);

  try {
    // const priceId = await request?.json();

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      payment_method_types: ['card'],
      line_items: request.body.map((item: ItemType) => {
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
      // return_url: `${request.headers.get('origin')}/return?session_id={CHECKOUT_SESSION_ID}`,
      return_url: `http://localhost:3000/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    res.send({
      id: session.id,
      client_secret: session.client_secret,
    });
    // return NextResponse.json({
    //   id: session.id,
    //   client_secret: session.client_secret,
    // });
  } catch (error: any) {
    console.error(error);
    res.json({ message: error.message }, { status: 500 });
    // return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
