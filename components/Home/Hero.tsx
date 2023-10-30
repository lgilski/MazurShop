import Link from 'next/link';

import image from '@/assets/images/andrew-s-ouo1hbizWwo-unsplash-big.jpg';
import Image from 'next/image';

function Hero() {
  return (
    // bg-hero-image
    // linear-gradient(to right top, #05400ABF, #207227BF) bg-fixed bg-cover bg-center h-[700px]
    <section className='bg-gradient-to-tr from-[#05400ABF] to-[#207227BF] h-[550px] bg-fixed bg-cover bg-center w-full mt-[68px]'>
      <div className='max-w-7xl h-full flex items-center justify-between m-auto'>
        {/* max-w-4xl */}
        <div className='max-w-2xl text-left'>
          <h2 className='text-7xl text-white font-extrabold mb-6'>
            Here you can buy all things necessary for your pets!
          </h2>
          <p className='text-2xl text-green-050 mb-8'>
            We offer many healthy treats, toys and more.
          </p>
          <Link
            href={'/products'}
            className='px-8 py-4 bg-green-300 text-green-800 text-2xl rounded-full font-semibold hover:bg-green-700 hover:text-green-100 duration-300'
          >
            Shop now
          </Link>
        </div>
        <div className='relative after:content-[""] after:bg-gradient-to-tr after:from-[#05400ABF] after:to-[#207227BF] after:absolute after:top-0 after:left-0 after:block after:w-full after:h-full rounded-lg overflow-hidden w-[550px] after:opacity-60'>
          <Image
            src={image}
            width={550}
            // fill={true}
            // height={200}
            alt=''
            className=' aspect-video object-cover '
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
