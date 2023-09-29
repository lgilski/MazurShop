const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

// const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    console.log(req.body);

    // const buf = await buffer(req);
    // const sig = req.headers['stripe-signature'];

    // let event;

    const listLineItems = stripe.checkout.sessions.listLineItems(
      req.body.data.object.id,
      function (err: any, lineItems: any) {
        return lineItems;
      }
    );

    console.log('LINE ITEM: ', listLineItems);

    try {
      // stripe.checkout.sessions.listLineItems(req.data.object.id)
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
