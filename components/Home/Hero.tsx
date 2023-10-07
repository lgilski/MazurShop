import Link from 'next/link';

function Hero() {
  return (
    <section className='bg-hero-image bg-fixed bg-cover bg-center h-[700px] w-full mt-[68px]'>
      <div className='max-w-7xl h-full flex items-center justify-left m-auto'>
        <div className='max-w-4xl text-left'>
          <h2 className='text-7xl text-green-050 font-extrabold mb-6'>
            Here you can buy all things necessary for your pets!
          </h2>
          <p className='text-2xl text-green-100 mb-8'>
            We offer many healthy treats, toys and more.
          </p>
          <Link
            href={'/products'}
            className='px-8 py-4 bg-green-300 text-green-800 text-2xl rounded-full font-semibold hover:bg-green-700 hover:text-green-100 duration-300'
          >
            Shop now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
