import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export const productsQuery = groq`*[_type == "product" && defined(slug.current)]{
  image, leftInStock, name, price, discount, slug, shouldBeOnTheBest, _id
}`;

export async function updateDocumentLeftInStock(_id: string, quantity: number) {
  const result = client.patch(_id).dec({ leftInStock: quantity });
  return result;
}

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    // console.log(req.body);

    //   client
    // .patch('bike-123') // Document ID to patch
    // .set({inStock: false}) // Shallow merge
    // .inc({numSold: 1}) // Increment field by count
    // .commit() // Perform the patch and return a promise
    const listLineItems = await stripe.checkout.sessions.listLineItems(
      req.body.data.object.id
    );

    const data = await client.fetch(productsQuery);

    // console.log('LINE ITEM: ', listLineItems, data);

    listLineItems.data.forEach(async (boughtItem: any) => {
      const boughtItemData = data.find(
        (product: any) => product.name === boughtItem.description
      );

      console.log('BOUGHT ITEM: ', boughtItem);
      console.log('BOUGHT ITEM DATA: ', boughtItemData);

      // DECREMENT THE STOCK!!!!!

      await updateDocumentLeftInStock(boughtItemData._id, boughtItem.quantity);

      // console.log(
      //   await client
      //     .patch(boughtItemData._id)
      //     .dec({ leftInStock: boughtItem.quantity })
      //     .commit()
      //     );
      // await client
      //   .mutate(client.patch(boughtItemData._id).)
      // .dec({ leftInStock: boughtItem.quantity })
      // .commit()
      // .then(updatedProduct => {
      //   console.log('Hurray, the product is updated! New document:');
      //   console.log(updatedProduct);
      // })
      // .catch(err => {
      //   console.error('Oh no, the update failed: ', err.message);
      // });
    });

    try {
      // event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
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

// Promise {
//   <pending>,
//   [Symbol(async_id_symbol)]: 515,
//   [Symbol(trigger_async_id_symbol)]: 470,
//   [Symbol(kResourceStore)]: {
//     requestId: '1',
//     serverId: 'cf92ee88-e5fc-42c5-874f-75e7355504e5',
//     n1RequestId: undefined,
//     vercelId: 'pdx1::kqzc7-1696057681149-6b7aa5cea6f5'
//   },
//   [Symbol(kResourceStore)]: {
//     headers: {
//       host: 'ecommerce-app-liart-five.vercel.app',
//       'content-type': 'application/json; charset=utf-8',
//       'x-real-ip': '54.187.174.169',
//       'x-vercel-proxy-signature-ts': '1696057981',
//       'x-vercel-deployment-url': 'ecommerce-oen3zjkgx-lgilski.vercel.app',
//       'cache-control': 'no-cache',
//       'x-vercel-sc-basepath': '',
//       'x-vercel-ip-latitude': '45.8234',
//       'x-vercel-forwarded-for': '54.187.174.169',
//       'x-vercel-sc-host': 'iad1.suspense-cache.vercel-infra.com',
//       'x-vercel-sc-headers': '{"Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXBsb3ltZW50SWQiOiJkcGxfRlM2M2dxWmdqUUtmdmFQOWFmN2lLdDVkYUFMQyIsInVubGltaXRlZCI6ZmFsc2UsInBsYW4iOiJob2JieSIsImRvbWFpbiI6ImVjb21tZXJjZS1hcHAtbGlhcnQtZml2ZS52ZXJjZWwuYXBwIiwiYmxvY2siOmZhbHNlLCJpYXQiOjE2OTYwNTc2ODEsInByb2plY3RJZCI6InByal9Ua0VkTFEwcXNEMk40WWw5U0Q3OTFqVWlLZUFOIiwiZXhwIjoxNjk2MDU4NjAxLCJvd25lcklkIjoiaTRWVTJnODBwQk0zdlhobUNjQ1o0YjZSIiwicmVxdWVzdElkIjoia3F6YzctMTY5NjA1NzY4MTE0OS02YjdhYTVjZWE2ZjUiLCJlbnYiOiJwcm9kdWN0aW9uIn0.qmECdIotkEeUcWBjZWZG1Zjtq2Qaj_DTf0tT7ywabwA"}',
//       forwarded: 'for=54.187.174.169;host=ecommerce-app-liart-five.vercel.app;proto=https;sig=0QmVhcmVyIGI5YWIyOGZjNjIwZDhlNjkwNWM0NzRhODM1NDk4ODE1ODI2ZGFmMzkzODlhNDhmMGJmMzZiYTEzZDkyYWU4ODM=;exp=1696057981',
//       'x-vercel-id': 'pdx1::kqzc7-1696057681149-6b7aa5cea6f5',
//       'content-length': '3345',
//       'x-matched-path': '/api/webhooks',
//       'x-vercel-ip-longitude': '-119.7257',
//       accept: '*/*; q=0.5, application/xml',
//       'x-forwarded-host': 'ecommerce-app-liart-five.vercel.app',
//       'stripe-signature': 't=1696057680,v1=ba9fce88786dfcb16646a40b1dbeeec709b6bf08f04e5bc6e0b7090bfe417b1c,v0=2218137223ec447917a9c6dc198937f875f26212ab492c29c633e0e32f3eac82',
//       'x-vercel-ip-country': 'US',
//       'x-vercel-ip-country-region': 'OR',
//       'x-vercel-proxy-signature': 'Bearer b9ab28fc620d8e6905c474a835498815826daf39389a48f0bf36ba13d92ae883',
//       'x-forwarded-for': '54.187.174.169',
//       'user-agent': 'Stripe/1.0 (+https://stripe.com/docs/webhooks)',
//       'x-vercel-ip-timezone': 'America/Los_Angeles',
//       'x-vercel-ip-city': 'Boardman',
//       'x-forwarded-proto': 'https',
//       'x-vercel-proxied-for': '54.187.174.169',
//       connection: 'close'
//     },
//     url: 'https://ecommerce-app-liart-five.vercel.app/api/webhooks'
//   }
// }
