import Logo from './Logo';
import Link from 'next/link';

function Footer() {
  return (
    <footer className='bg-grey-050 mt-auto border-t-2 border-grey-100 py-12'>
      <nav className='max-w-5xl mx-auto grid grid-cols-4 gap-12 [&_h6]:text-lg [&_h6]:font-medium'>
        <div className='flex flex-col'>
          <Logo className='text-2xl' />
          <div className='text-sm mt-auto'>
            Copyright &copy; 2023 by MazurShop, Inc. All rights reserved .
          </div>
        </div>
        <div>
          <h6 className='mb-2'>Contact</h6>
          <ul className='flex flex-col gap-2'>
            <li>
              <Link href={''} className='hover:text-grey-700 inline-block'>
                uwu
              </Link>
            </li>
            <li>
              <Link href={''} className='hover:text-grey-700 inline-block'>
                uwu
              </Link>
            </li>
            <li>
              <Link href={''} className='hover:text-grey-700 inline-block'>
                uwu
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h6 className='mb-2'>Company</h6>
          <ul className='flex flex-col gap-2'>
            <li>
              <Link href={''} className='hover:text-grey-700 inline-block'>
                uwu
              </Link>
            </li>
            <li>
              <Link href={''} className='hover:text-grey-700 inline-block'>
                uwu
              </Link>
            </li>
            <li>
              <Link href={''} className='hover:text-grey-700 inline-block'>
                uwu
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h6 className='mb-2'>Shop</h6>
          <ul className='flex flex-col gap-2'>
            <li>
              <Link href={''} className='hover:text-grey-700 inline-block'>
                uwu
              </Link>
            </li>
            <li>
              <Link href={''} className='hover:text-grey-700 inline-block'>
                uwu
              </Link>
            </li>
            <li>
              <Link href={''} className='hover:text-grey-700 inline-block'>
                uwu
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </footer>
  );
}

export default Footer;
