function Hero() {
  return (
    <section className='bg-hero-image bg-cover bg-center h-[800px] w-full'>
      <div className='max-w-7xl h-full flex items-center justify-left m-auto'>
        <div className='max-w-4xl text-left'>
          <h2 className='text-7xl text-green-050 font-extrabold mb-6'>
            Here you can buy all things necessary for your pets!
          </h2>
          <p className='text-2xl text-green-100 mb-4'>
            We offer many healthy treats, toys and more.
          </p>
          <button className='px-8 py-4 bg-green-300 text-green-800 text-2xl rounded-full font-semibold hover:bg-green-700 hover:text-green-100 duration-300'>
            Shop now
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
