import Link from 'next/link';

function Navigation() {
  return (
    // fixed w-[1200px] right-[50%] top-3 translate-x-[50%] bg-white rounded
    <nav className='px-8 py-4 flex justify-between items-baseline bg-white'>
      <Link href='/' className='text-3xl font-bold'>
        Mazur<span className='text-green-500'>Shop</span>
      </Link>
      <div className='w-8 h-8 [&_ion-icon]:w-full [&_ion-icon]:h-full [&_ion-icon]:align-bottom [&_ion-icon]:cursor-pointer'>
        <ion-icon name='cart-outline'></ion-icon>
      </div>
    </nav>
  );
}

export default Navigation;
