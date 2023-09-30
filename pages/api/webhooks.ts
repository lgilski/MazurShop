import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export const productsQuery = groq`*[_type == "product" && defined(slug.current)]{
  image, leftInStock, name, price, discount, slug, shouldBeOnTheBest, _id
}`;

export async function updateDocumentLeftInStock(_id: string, quantity: number) {
  const result = await client
    .patch(_id)
    .dec({ leftInStock: quantity })
    .commit();

  // console.log(result);
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
      req.body.data?.object?.id
    );

    const data = await client.fetch(productsQuery);

    // console.log('LINE ITEM: ', listLineItems, data);
    // await updateDocumentLeftInStock('192f82dd-2ad0-409b-8002-e2f27896477c', 2);

    listLineItems?.data.forEach(async (boughtItem: any) => {
      const boughtItemData = data.find(
        (product: any) => product.name === boughtItem.description
      );

      console.log('BOUGHT ITEM: ', boughtItem);
      console.log('BOUGHT ITEM DATA: ', boughtItemData);

      // DECREMENT THE STOCK!!!!!
      // await updateDocumentLeftInStock(boughtItemData._id, boughtItem.quantity);

      await client
        .patch(boughtItemData._id)
        .dec({ leftInStock: boughtItem.quantity })
        .commit();

      // async function mutate(mutations: any) {
      //   const result = await fetch(
      //     `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.SANITY_DATASET}`,
      //     {
      //       headers: {
      //         'content-type': 'application/json',
      //         Authorization: `Bearer ${process.env.SANITY_KEY}`,
      //       },
      //       body: JSON.stringify(mutations),
      //       method: 'POST',
      //     }
      //   );

      //   const json = await result.json();
      //   return json;
      // }

      // const mutations = {
      //   mutations: [
      //     {
      //       patch: {
      //         id: boughtItemData._id,
      //         inc: {
      //           leftInStock: boughtItem.quantity,
      //         },
      //       },
      //     },
      //   ],
      // };

      // mutate(mutations);

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

// TypeError: Cannot read properties of undefined (reading 'object')
//     at handler (/var/task/.next/server/pages/api/webhooks.js:119:90)
//     at /var/task/node_modules/next/dist/server/api-utils/node.js:456:16
//     at /var/task/node_modules/next/dist/server/lib/trace/tracer.js:117:36
//     at NoopContextManager.with (/var/task/node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:7057)
//     at ContextAPI.with (/var/task/node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:516)
//     at NoopTracer.startActiveSpan (/var/task/node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:18086)
//     at ProxyTracer.startActiveSpan (/var/task/node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:18847)
//     at /var/task/node_modules/next/dist/server/lib/trace/tracer.js:106:107
//     at NoopContextManager.with (/var/task/node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:7057)
//     at ContextAPI.with (/var/task/node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:516)
// TypeError: Cannot read properties of undefined (reading 'object')
//     at handler (/var/task/.next/server/pages/api/webhooks.js:119:90)
//     at /var/task/node_modules/next/dist/server/api-utils/node.js:456:16
//     at /var/task/node_modules/next/dist/server/lib/trace/tracer.js:117:36
//     at NoopContextManager.with (/var/task/node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:7057)
//     at ContextAPI.with (/var/task/node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:516)
//     at NoopTracer.startActiveSpan (/var/task/node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:18086)
//     at ProxyTracer.startActiveSpan (/var/task/node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:18847)
//     at /var/task/node_modules/next/dist/server/lib/trace/tracer.js:106:107
//     at NoopContextManager.with (/var/task/node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:7057)
//     at ContextAPI.with (/var/task/node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:516)
// TypeError: Cannot read properties of undefined (reading 'object')
//     at handler (/var/task/.next/server/pages/api/webhooks.js:119:90)
//     at /var/task/node_modules/next/dist/server/api-utils/node.js:456:16
//     at /var/task/node_modules/next/dist/server/lib/trace/tracer.js:117:36
//     at NoopContextManager.with (/var/task/node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:7057)
//     at ContextAPI.with (/var/task/node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:516)
//     at NoopTracer.startActiveSpan (/var/task/node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:18086)
//     at ProxyTracer.startActiveSpan (/var/task/node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:18847)
//     at /var/task/node_modules/next/dist/server/lib/trace/tracer.js:106:107
//     at NoopContextManager.with (/var/task/node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:7057)
//     at ContextAPI.with (/var/task/node_modules/next/dist/compiled/@opentelemetry/api/index.js:1:516)
// Error: Runtime exited with error: exit status 1
// Runtime.ExitError

// [{"id":"atm-2W6mQ7L6mqHDXFLpz59wlr7IKAT","projectId":"rwsjsahd","inProgress":false,"duration":1137,"createdAt":"2023-09-30T08:09:43.694Z","updatedAt":"2023-09-30T08:09:43.694Z","messageId":"msg-2W6mPxYdiaiWlUyDpf5oTRxvll5","hookId":"8MbJ088VfP7yfyeB","isFailure":true,"failureReason":"other","resultCode":405,"resultBody":""},{"id":"atm-2W6lunTcaoVfjAbJ6A74xO2P6qL","projectId":"rwsjsahd","inProgress":false,"duration":1132,"createdAt":"2023-09-30T08:05:34.849Z","updatedAt":"2023-09-30T08:05:34.849Z","messageId":"msg-2W6luer2E43DqpFTNenj9AJcr96","hookId":"8MbJ088VfP7yfyeB","isFailure":true,"failureReason":"other","resultCode":405,"resultBody":""}]
