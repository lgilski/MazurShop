import Link from 'next/link';

import image from '@/assets/images/andrew-s-ouo1hbizWwo-unsplash-big.jpg';
import Image from 'next/image';

function Hero() {
  return (
    // bg-hero-image
    // linear-gradient(to right top, #05400ABF, #207227BF) bg-fixed bg-cover bg-center h-[700px]
    <section className='bg-gradient-to-tr from-[#05400ABF] to-[#207227BF] h-[460px] bg-fixed bg-cover bg-center w-full mt-[52px]'>
      <div className='max-w-7xl h-full flex items-center justify-center m-auto'>
        {/* max-w-4xl */}
        <div className='max-w-2xl text-center'>
          <h2 className='text-5xl text-white font-extrabold mb-6'>
            Tutaj możesz kupić wszystko czego potrzebujesz!
          </h2>
          <p className='text-xl text-green-050 mb-8'>
            Oferujemy wiele produktów wysokiej jakości
          </p>
          <Link
            href={'/produkty'}
            className='px-4 py-2 bg-green-300 text-green-800 text-xl rounded-full font-semibold hover:bg-green-700 hover:text-green-100 duration-300'
          >
            Kupuj teraz
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
