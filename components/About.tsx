import Image from 'next/image';

import deDog from '../assets/images/deDog.jpg';

function About() {
  return (
    <section className='max-w-full bg-green-100 py-12'>
      <div className='max-w-6xl mx-auto flex justify-center gap-20'>
        <div className='w-96 rounded-lg border-2 border-solid border-green-400 relative after:z-2 after:bg-gradient-to-tr after:from-green-400 after:to-green-700 after:opacity-60 after:content-[""] after:w-full after:h-full after:block after:top-0 after:absolute'>
          <Image src={deDog} className='w-full ' alt='' />
        </div>
        <div className='my-auto'>
          <h5 className='text-5xl font-semibold text-green-900 mb-8 text-center'>
            About us
          </h5>
          <p className='text-xl max-w-xl mb-4'>
            We are the company that makes everything that&apos;s neccessary for
            your pets. Our mission is to satisfy you and your loved animals.
          </p>
          <p className='text-xl max-w-xl mb-4'>
            We use only natural ingredients, so you do not need to worry about
            your pet&apos;s health.
          </p>
          <p className='text-xl max-w-xl'>
            Toys are made so the pets will not harm themeselfs and will have a
            lot of fun! So the owners.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
