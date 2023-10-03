import shippingPhoto from '@/assets/images/chuttersnap-BNBA1h-NgdY-unsplash.jpg';

import Image from 'next/image';

function ShippingSection() {
  return (
    <section className='max-w-6xl mx-auto py-16 [&_p]:text-xl [&_p]:mb-4 grid grid-cols-2 gap-20'>
      <div className='my-auto max-w-lg'>
        <h5 className='text-5xl font-semibold text-green-900 mb-8 text-center'>
          Shipping
        </h5>
        <p>
          We ship all over the Poland. No matter where you are we will send you
          your order.
        </p>
        <p>
          Shipping is totally free, so you do not need to worry about it
          anymore!
        </p>
      </div>
      <div className='w-full overflow-hidden rounded-lg border-2 border-solid border-green-300 relative after:z-2 after:bg-gradient-to-tr after:from-green-400 after:to-green-700 after:opacity-40 after:content-[""] after:w-full after:h-full after:block after:top-0 after:absolute'>
        <Image
          src={shippingPhoto}
          className='w-full aspect-square object-cover'
          alt=''
        />
      </div>
    </section>
  );
}

export default ShippingSection;
