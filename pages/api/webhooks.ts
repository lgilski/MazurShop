import { productsDetailsQuery } from '@/api/queries';
import { client, clientRead } from '@/sanity/lib/client';

const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function updateDocumentLeftInStock(_id: string, quantity: number) {
  const result = await client
    .patch(_id)
    .dec({ leftInStock: quantity })
    .commit();

  console.log('Updated!! ', _id, quantity);

  return result;
}

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    const sessions = await stripe.checkout.sessions.list({
      limit: 15,
    });

    const paymentIntentCheckout = sessions.data.find(
      (session: any) => session.payment_intent === req.body.data?.object.id
    );

    try {
      const listLineItems = paymentIntentCheckout
        ? await stripe.checkout.sessions.listLineItems(paymentIntentCheckout.id)
        : null;

      const allProductsData = await clientRead.fetch(productsDetailsQuery);

      // console.log(listLineItems);

      const update =
        listLineItems &&
        listLineItems?.data.map(async (boughtItem: any) => {
          const boughtItemData = allProductsData.find(
            (product: any) => product.name === boughtItem.description
          );

          const updatedDocument = await updateDocumentLeftInStock(
            boughtItemData._id,
            boughtItem.quantity
          );
          return updatedDocument;
        });

      console.log(update);

      // res.status(200);
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

// Updated!!  192f82dd-2ad0-409b-8002-e2f27896477c 5
// TypeError: Cannot read properties of undefined (reading 'object')
// at /var/task/.next/server/pages/api/webhooks.js:7:596
// at Array.find (<anonymous>)
// at c (/var/task/.next/server/pages/api/webhooks.js:7:557)
// at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
// at async K (/var/task/node_modules/next/dist/compiled/next-server/pages-api.runtime.prod.js:20:16853)
// at async U.render (/var/task/node_modules/next/dist/compiled/next-server/pages-api.runtime.prod.js:20:17492)
// at async r3.runApi (/var/task/node_modules/next/dist/compiled/next-server/server.runtime.prod.js:17:43997)
// at async r3.handleCatchallRenderRequest (/var/task/node_modules/next/dist/compiled/next-server/server.runtime.prod.js:17:37953)
// at async r3.runImpl (/var/task/node_modules/next/dist/compiled/next-server/server.runtime.prod.js:16:17465)
// at async r3.handleRequestImpl (/var/task/node_modules/next/dist/compiled/next-server/server.runtime.prod.js:16:16554)
// ⨯ TypeError: Cannot read properties of undefined (reading 'object')
// at /var/task/.next/server/pages/api/webhooks.js:7:596
// at Array.find (<anonymous>)
// at c (/var/task/.next/server/pages/api/webhooks.js:7:557)
// at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
// at async K (/var/task/node_modules/next/dist/compiled/next-server/pages-api.runtime.prod.js:20:16853)
// at async U.render (/var/task/node_modules/next/dist/compiled/next-server/pages-api.runtime.prod.js:20:17492)
// at async r3.runApi (/var/task/node_modules/next/dist/compiled/next-server/server.runtime.prod.js:17:43997)
// at async r3.handleCatchallRenderRequest (/var/task/node_modules/next/dist/compiled/next-server/server.runtime.prod.js:17:37953)
// at async r3.runImpl (/var/task/node_modules/next/dist/compiled/next-server/server.runtime.prod.js:16:17465)
// at async r3.handleRequestImpl (/var/task/node_modules/next/dist/compiled/next-server/server.runtime.prod.js:16:16554)
// TypeError: Cannot read properties of undefined (reading 'object')
// at /var/task/.next/server/pages/api/webhooks.js:7:596
// at Array.find (<anonymous>)
// at c (/var/task/.next/server/pages/api/webhooks.js:7:557)
// at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
// at async K (/var/task/node_modules/next/dist/compiled/next-server/pages-api.runtime.prod.js:20:16853)
// at async U.render (/var/task/node_modules/next/dist/compiled/next-server/pages-api.runtime.prod.js:20:17492)
// at async r3.runApi (/var/task/node_modules/next/dist/compiled/next-server/server.runtime.prod.js:17:43997)
// at async r3.handleCatchallRenderRequest (/var/task/node_modules/next/dist/compiled/next-server/server.runtime.prod.js:17:37953)
// at async r3.runImpl (/var/task/node_modules/next/dist/compiled/next-server/server.runtime.prod.js:16:17465)
// at async r3.handleRequestImpl (/var/task/node_modules/next/dist/compiled/next-server/server.runtime.prod.js:16:16554)
// Node.js process exited with exit status: 1. The logs above can help with debugging the issue.
