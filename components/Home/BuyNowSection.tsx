import Link from 'next/link';

function BuyNowSection() {
  return (
    <section className='bg-green-800 py-24'>
      <div className='max-w-5xl mx-auto text-center'>
        <h5 className='text-4xl font-semibold text-green-050 mb-6 text-center'>
          Nie czekaj!
        </h5>
        <p className='text-xl font-medium max-w-2xl mx-auto text-green-100 mb-8'>
          Zacznij kupować lepsze jakościowo produkty razem z MazurShop już dziś!
        </p>
        <Link
          href={'/produkty'}
          className='px-4 py-2 bg-green-300 text-green-800 text-xl rounded-full font-semibold hover:bg-green-700 hover:text-green-100 duration-300'
        >
          Kupuj teraz
        </Link>
      </div>
    </section>
  );
}

export default BuyNowSection;
