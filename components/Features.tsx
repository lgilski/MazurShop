import Feature from './Feature';

function Features() {
  return (
    <section className='max-w-7xl mx-auto mt-16 mb-24'>
      <h5 className='text-5xl font-semibold text-green-900 mb-10'>
        What makes our products special?
      </h5>
      <div className='grid grid-cols-4 gap-12 mx-6'>
        <Feature
          icon='leaf-outline'
          header='Natural'
          description='Our products are made of natural and consciously chosen ingredients'
        />
        <Feature
          icon='nutrition-outline'
          header='Healthy'
          description='All food is specially analized to give the best healthy nutrition'
        />
        <Feature
          icon='happy-outline'
          header='Fun'
          description='Toys are designed so the pets can have a lot of fun and movement'
        />
        <Feature
          icon='ribbon-outline'
          header='Valued'
          description='All products are well valued and loved by all our customers'
        />
      </div>
    </section>
  );
}

export default Features;
