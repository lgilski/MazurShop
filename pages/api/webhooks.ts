import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

// const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const productsQuery = groq`*[_type == "product" && defined(slug.current)]{
  image, leftInStock, name, price, discount, slug, shouldBeOnTheBest, _id
}`;

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    console.log(req.body);

    // const buf = await buffer(req);
    // const sig = req.headers['stripe-signature'];

    // let event;

    //   client
    // .patch('bike-123') // Document ID to patch
    // .set({inStock: false}) // Shallow merge
    // .inc({numSold: 1}) // Increment field by count
    // .commit() // Perform the patch and return a promise
    const listLineItems = await stripe.checkout.sessions.listLineItems(
      req.body.data.object.id
    );

    const data = await client.fetch(productsQuery);

    console.log('LINE ITEM: ', listLineItems, data);

    try {
      // event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err: any) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    res.json({ received: true, data: listLineItems });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default handler;

// de: false,
//       locale: null,
//       metadata: {},
//       mode: 'payment',
//       payment_intent: 'pi_3Nvgz0G8O1OemN5V1SEpJe4e',
//       payment_link: null,
//       payment_method_collection: 'if_required',
//       payment_method_configuration_details: null,
//       payment_method_options: {},
//       payment_method_types: [Array],
//       payment_status: 'paid',
//       phone_number_collection: [Object],
//       recovered_from: null,
//       setup_intent: null,
//       shipping_address_collection: null,
//       shipping_cost: [Object],
//       shipping_details: null,
//       shipping_options: [Array],
//       status: 'complete',
//       submit_type: 'pay',
//       subscription: null,
//       success_url: 'https://ecommerce-app-liart-five.vercel.app/?success=true',
//       total_details: [Object],
//       url: null
//     }
//   },
//   livemode: false,
//   pending_webhooks: 1,
//   request: { id: null, idempotency_key: null },
//   type: 'checkout.session.completed'
// }
// LINE ITEM:  Promise {
//   <pending>,
//   autoPagingEach: [Function: autoPagingEach],
//   autoPagingToArray: [Function: autoPagingToArray],
//   next: [Function: next],
//   return: [Function: return],
//   [Symbol(async_id_symbol)]: 304,
//   [Symbol(trigger_async_id_symbol)]: 302,
//   [Symbol(kResourceStore)]: {
//     requestId: '1',
//     serverId: '1f23a0a4-e497-48ac-829c-0f682f1a2f2f',
//     n1RequestId: undefined,
//     vercelId: 'pdx1::9kxl5-1695995036240-6efc6844a5dd'
//   },
//   [Symbol(kResourceStore)]: {
//     headers: {
//       host: 'ecommerce-app-liart-five.vercel.app',
//       'content-type': 'application/json; charset=utf-8',
//       'x-real-ip': '54.187.174.169',
//       'x-vercel-proxy-signature-ts': '1695995336',
//       'x-vercel-deployment-url': 'ecommerce-ldoxesmwa-lgilski.vercel.app',
//       'cache-control': 'no-cache',
//       'x-vercel-sc-basepath': '',
//       'x-vercel-ip-latitude': '45.8234',
//       'x-vercel-forwarded-for': '54.187.174.169',
//       'x-vercel-sc-host': 'iad1.suspense-cache.vercel-infra.com',
//       'x-vercel-sc-headers': '{"Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXBsb3ltZW50SWQiOiJkcGxfRkQ3ckdQQ2ZDcTFRRjV2YWdFTlYyaVZtMzg4WSIsInVubGltaXRlZCI6ZmFsc2UsInBsYW4iOiJob2JieSIsImRvbWFpbiI6ImVjb21tZXJjZS1hcHAtbGlhcnQtZml2ZS52ZXJjZWwuYXBwIiwiYmxvY2siOmZhbHNlLCJpYXQiOjE2OTU5OTUwMzYsInByb2plY3RJZCI6InByal9Ua0VkTFEwcXNEMk40WWw5U0Q3OTFqVWlLZUFOIiwiZXhwIjoxNjk1OTk1OTU2LCJvd25lcklkIjoiaTRWVTJnODBwQk0zdlhobUNjQ1o0YjZSIiwicmVxdWVzdElkIjoiOWt4bDUtMTY5NTk5NTAzNjI0MC02ZWZjNjg0NGE1ZGQiLCJlbnYiOiJwcm9kdWN0aW9uIn0.kzdSI5mf0jx-s9OYZQ9jlmUBWUHmF4LpE_JW2vvt2_Y"}',
//       forwarded: 'for=54.187.174.169;host=ecommerce-app-liart-five.vercel.app;proto=https;sig=0QmVhcmVyIDc4NWFmZjczMmQ4NGU0MmNlNjE5ZGI0ZTI2Mzc1NWRjMjhkNjg5Y2NmOWZmMjc5ZDExYTcxZmIwNWEyYzAxOWQ=;exp=1695995336',
//       'x-vercel-id': 'pdx1::9kxl5-1695995036240-6efc6844a5dd',
//       'content-length': '3356',
//       'x-matched-path': '/api/webhooks',
//       'x-vercel-ip-longitude': '-119.7257',
//       accept: '*/*; q=0.5, application/xml',
//       'x-forwarded-host': 'ecommerce-app-liart-five.vercel.app',
//       'stripe-signature': 't=1695995036,v1=aeee2d554f29e3848cf9dc899ed025f04263de8cbe086719f758719dd104be4b,v0=8ca6d1e6bf29305d0b551582a3d2dcd6a763d2af21008475ada953975c6d4b55',
//       'x-vercel-ip-country': 'US',
//       'x-vercel-ip-country-region': 'OR',
//       'x-vercel-proxy-signature': 'Bearer 785aff732d84e42ce619db4e263755dc28d689ccf9ff279d11a71fb05a2c019d',
//       'x-forwarded-for': '54.187.174.169',
//       'user-agent': 'Stripe/1.0 (+https://stripe.com/docs/webhooks)',
//       'x-vercel-ip-timezone': 'America/Los_Angeles',
//       'x-vercel-ip-city': 'Boardman',
//       'x-forwarded-proto': 'https',
//       'x-vercel-proxied-for': '54.187.174.169',
//       connection: 'close'
//     },
//     url: 'https://ecommerce-app-liart-five.vercel.app/api/webhooks'
//   },
//   [Symbol(Symbol.asyncIterator)]: [Function: [Symbol.asyncIterator]]
// }
