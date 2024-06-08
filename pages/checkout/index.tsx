// import * as React from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import {
//   EmbeddedCheckoutProvider,
//   EmbeddedCheckout,
// } from '@stripe/react-stripe-js';
// import { clientRead } from '@/sanity/lib/client';
// import { productsDetailsQuery } from '@/api/queries';
// import { ProductType, WholeState } from '@/types/types';
// import { useSelector } from 'react-redux';

// // Make sure to call `loadStripe` outside of a component’s render to avoid
// // recreating the `Stripe` object on every render.

// function useProductsDetails() {
//   const [productsData, setProductsData] = React.useState<ProductType[]>();

//   React.useEffect(() => {
//     clientRead.fetch(productsDetailsQuery).then(data => setProductsData(data));
//   }, []);
//   clientRead.listen(productsDetailsQuery).subscribe(async (update: any) => {
//     const indexToChange = productsData?.findIndex(
//       product => product._id === update.result._id
//     );

//     if (indexToChange && productsData) {
//       let newData = [...productsData];
//       newData[indexToChange] = update.result;
//       setProductsData(newData);
//     }
//   });

//   return productsData;
// }

// const CheckoutPage = () => {
//   const productsData = useProductsDetails();
//   const items = useSelector((state: WholeState) => state.cart.items);

//   const itemsData: any = items?.map(item => {
//     if (!productsData) return;

//     return {
//       product: productsData?.find(
//         productData => productData._id === item.productId
//       )!,
//       quantity: item.quantity,
//     };
//   });

//   console.log(itemsData);

//   const stripePromise = loadStripe(
//     process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
//   );

//   const fetchClientSecret = React.useCallback(async () => {
//     // Create a Checkout Session
//     const response = await fetch('/api/testStripe', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(itemsData),
//     });
//     const data = await response.json();

//     return data.client_secret;

//     // .then(res => res.json())
//     // .then(data => data.client_secret);
//   }, []);

//   const options = { fetchClientSecret };

//   return (
//     <div id='checkout'>
//       <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
//         <EmbeddedCheckout />
//       </EmbeddedCheckoutProvider>
//     </div>
//   );
// };

// export default CheckoutPage;
