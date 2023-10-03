function BuyNowSection() {
  return (
    <section className='bg-green-800 py-24'>
      <div className='max-w-5xl mx-auto text-center'>
        <h5 className='text-5xl font-semibold text-green-050 mb-6 text-center'>
          Make your pets happier and healthier!
        </h5>
        <p className='text-3xl font-medium max-w-4xl mx-auto text-green-100 mb-8'>
          With us you will take your pets&apos; health and enjoyment to another
          level. Are you ready to try?
        </p>
        <button className='px-8 py-4 bg-green-300 text-green-800 text-2xl rounded-full font-semibold hover:bg-green-700 hover:text-green-100 duration-300'>
          Shop now
        </button>
      </div>
    </section>
  );
}

export default BuyNowSection;
