import Image from 'next/image';

import deDog from '../../assets/images/deDog.jpg';

function About() {
  return (
    <section className='max-w-full bg-green-100 py-16'>
      <div className='max-w-6xl mx-auto grid grid-cols-2 justify-items-center gap-20 [&_p]:text-xl [&_p]:mb-4 [&_p]:font-medium'>
        <div className='w-full overflow-hidden rounded-lg border-2 border-solid border-green-300 relative after:z-2 after:bg-gradient-to-tr after:from-green-400 after:to-green-700 after:opacity-40 after:content-[""] after:w-full after:h-full after:block after:top-0 after:absolute'>
          <Image
            src={deDog}
            className='w-full aspect-square object-cover'
            alt=''
          />
        </div>
        <div className='my-auto max-w-lg'>
          <h5 className='text-5xl font-semibold text-green-900 mb-8 text-center'>
            About us
          </h5>
          <p>
            We are the company that makes everything that is neccessary for your
            pets. Our mission is to satisfy you and your loved animals.
          </p>
          <p>
            We do this because we know how important pets are and we want the
            best for them.
          </p>
          <p>
            All your requirements will be satisfied with many options to choose
            from!
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
