import { productsDetailsQuery } from '@/api/queries';
import { client, clientRead } from '@/sanity/lib/client';

const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function captureFounds(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      const sessions = await stripe.checkout.sessions.list({
        limit: 3,
      });

      console.log(sessions);

      const paymentIntentCheckout = await sessions.find(
        (session: any) => session.payment_intent === req.data.object.id
      );

      console.log('paymentIntentCheckout: ', paymentIntentCheckout);

      // const listLineItems = req.body.data?.object?.id
      //   ? stripe.checkout.session.listLineItems(paymentIntentCheckout.data?.id)
      //   : null;
      // console.log('listLineItems:', listLineItems);

      // const data = await clientRead.fetch(productsDetailsQuery);

      // const areItemsAvailable =
      //   listLineItems &&
      //   listLineItems?.data.forEach(async (boughtItem: any) => {
      //     const boughtItemData = data.find(
      //       (product: any) => product.name === boughtItem.description
      //     );

      //     return boughtItemData.leftInStock - boughtItem.qantity > 0;
      //   });

      // console.log('areItemsAvailable:', areItemsAvailable);

      // if (areItemsAvailable.every((element: any) => element === true)) {
      //   await stripe.paymentIntents.capture(req.id, {
      //     amount_to_capture: req.amount,
      //   });
      // } else {
      //   await stripe.paymentIntents.cancel(req.id);
      // }

      res.status(200);
    } catch (error: any) {
      res.status(400).send(`Webhook Error: ${error}`);
      return;
    }
    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

// _reference_id: null,
// client_secret: null,
// consent: null,
// consent_collection: null,
// created: 1717849708,
// currency: 'pln',
// currency_conversion: null,
// custom_fields: [],
// custom_text: [Object],
// customer: null,
// customer_creation: 'if_required',
// customer_details: [Object],
// customer_email: null,
// expires_at: 1717936108,
// invoice: null,
// invoice_creation: [Object],
// livemode: false,
// locale: null,
// metadata: {},
// mode: 'payment',
// payment_intent: 'pi_3PPOO3G8O1OemN5V0Baffy6M',
// payment_link: null,
// payment_method_collection: 'if_required',
// payment_method_configuration_details: null,
// payment_method_options: [Object],
// payment_method_types: [Array],
// payment_status: 'unpaid',
// phone_number_collection: [Object],
// recovered_from: null,
// saved_payment_method_options: null,
// setup_intent: null,
// shipping_address_collection: [Object],
// shipping_cost: [Object],
// shipping_details: [Object],
// shipping_options: [Array],
// status: 'complete',
// submit_type: 'pay',
// subscription: null,
// success_url: 'http://localhost:3000/?success=true',
// total_details: [Object],
// ui_mode: 'hosted',
// url: null
// },
// {
// id: 'cs_test_a1n35n4Mutk5TFZy7YE4ARRQJZseFCsm6Mh9m7UR7RwVqIgx7WXeUa3Wc3',
// object: 'checkout.session',
// after_expiration: null,
// allow_promotion_codes: null,
// amount_subtotal: 1119,
// amount_total: 1119,
// automatic_tax: [Object],
// billing_address_collection: null,
// cancel_url: 'http://localhost:3000/?canceled=true',
// client_reference_id: null,
// client_secret: null,
// consent: null,
// consent_collection: null,
// created: 1717848484,
// currency: 'pln',
// currency_conversion: null,
// custom_fields: [],
// custom_text: [Object],
// customer: null,
// customer_creation: 'if_required',
// customer_details: [Object],
// customer_email: null,
// expires_at: 1717934884,
// invoice: null,
// invoice_creation: [Object],
// livemode: false,
// locale: null,
// metadata: {},
// mode: 'payment',
// payment_intent: 'pi_3PPO4HG8O1OemN5V1osOqsv0',
// payment_link: null,
// payment_method_collection: 'if_required',
// payment_method_configuration_details: null,
// payment_method_options: [Object],
// payment_method_types: [Array],
// payment_status: 'unpaid',
// phone_number_collection: [Object],
// recovered_from: null,
// saved_payment_method_options: null,
// setup_intent: null,
// shipping_address_collection: [Object],
// shipping_cost: [Object],
// shipping_details: [Object],
// shipping_options: [Array],
// status: 'complete',
// submit_type: 'pay',
// subscription: null,
// success_url: 'http://localhost:3000/?success=true',
// total_details: [Object],
// ui_mode: 'hosted',
// url: null
// },
// {
// id: 'cs_test_a1rFuQqULJSLWSpjGqzRIZBm7TvXhvIHfY7ZiBBXZoFQRUIH4HLt1znBtc',
// object: 'checkout.session',
// after_expiration: null,
// allow_promotion_codes: null,
// amount_subtotal: 3357,
// amount_total: 3357,
// automatic_tax: [Object],
// billing_address_collection: null,
// cancel_url: 'http://localhost:3000/?canceled=true',
// client_reference_id: null,
// client_secret: null,
// consent: null,
// consent_collection: null,
// created: 1717848071,
// currency: 'pln',
// currency_conversion: null,
// custom_fields: [],
// custom_text: [Object],
// customer: null,
// customer_creation: 'if_required',
// customer_details: [Object],
// customer_email: null,
// expires_at: 1717934471,
// invoice: null,
// invoice_creation: [Object],
// livemode: false,
// locale: null,
// metadata: {},
// mode: 'payment',
// payment_intent: 'pi_3PPNxhG8O1OemN5V1IiHzHzg',
// payment_link: null,
// payment_method_collection: 'if_required',
// payment_method_configuration_details: null,
// payment_method_options: [Object],
// payment_method_types: [Array],
// payment_status: 'unpaid',
// phone_number_collection: [Object],
// recovered_from: null,
// saved_payment_method_options: null,
// setup_intent: null,
// shipping_address_collection: [Object],
// shipping_cost: [Object],
// shipping_details: [Object],
// shipping_options: [Array],
// status: 'complete',
// submit_type: 'pay',
// subscription: null,
// success_url: 'http://localhost:3000/?success=true',
// total_details: [Object],
// ui_mode: 'hosted',
// url: null
// }
// ],
// has_more: true,
// url: '/v1/checkout/sessions'
// }
