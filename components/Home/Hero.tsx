import Link from 'next/link';

import image from '@/assets/images/andrew-s-ouo1hbizWwo-unsplash-big.jpg';
import Image from 'next/image';

function Hero() {
  return (
    // bg-hero-image
    // linear-gradient(to right top, #05400ABF, #207227BF) bg-fixed bg-cover bg-center h-[700px]
    <section className='bg-gradient-to-tr from-[#05400ABF] to-[#207227BF] h-[550px] bg-fixed bg-cover bg-center w-full mt-[52px]'>
      <div className='max-w-7xl h-full flex items-center justify-between m-auto'>
        {/* max-w-4xl */}
        <div className='max-w-2xl text-left'>
          <h2 className='text-5xl text-white font-extrabold mb-6'>
            Tutaj możesz kupić wszystko potrzebne dla zwierząt!
          </h2>
          <p className='text-xl text-green-050 mb-8'>
            Oferujemy wiele zdrowych smakołyków i zabawek.
          </p>
          <Link
            href={'/produkty'}
            className='px-4 py-2 bg-green-300 text-green-800 text-xl rounded-full font-semibold hover:bg-green-700 hover:text-green-100 duration-300'
          >
            Kupuj teraz
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
