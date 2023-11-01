import Feature from './Feature';

function Features() {
  return (
    <section className='max-w-7xl mx-auto  mb-8'>
      <h5 className='text-5xl font-semibold text-green-900 mb-12'>
        Co jest specjalnego w naszych produktach?
      </h5>
      <div className='grid grid-cols-4 gap-12 mx-6'>
        <Feature
          icon='leaf-outline'
          header='Naturalne'
          description='Nasze produkty są zrobione ze zdrowych i świadomie wybranych składników'
        />
        <Feature
          icon='nutrition-outline'
          header='Zdrowe'
          description='Nasze karmy są specjalnie analizowane by dać najlepsze odżywienie'
        />
        <Feature
          icon='happy-outline'
          header='Radosne'
          description='Zabawki są zaprojektowane tak, aby dawały jak najwięcej zdrowej frajdy'
        />
        <Feature
          icon='ribbon-outline'
          header='Wartościowe'
          description='Wszystkie nasze produkty są doceniane przez naszych klientów'
        />
      </div>
    </section>
  );
}

export default Features;
