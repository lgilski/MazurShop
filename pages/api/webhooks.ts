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

  return result;
}

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    const listLineItems = req.body.data?.object?.id
      ? await stripe.checkout.sessions.listLineItems(req.body.data?.object?.id)
      : null;

    const data = await client.fetch(productsQuery);

    listLineItems &&
      listLineItems?.data.forEach(async (boughtItem: any) => {
        const boughtItemData = data.find(
          (product: any) => product.name === boughtItem.description
        );

        await updateDocumentLeftInStock(
          boughtItemData._id,
          boughtItem.quantity
        );
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
