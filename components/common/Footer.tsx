import Logo from './Logo';
import Link from 'next/link';

function Footer() {
  return (
    <footer className='bg-grey-050 mt-auto border-t-2 border-grey-100 py-12'>
      <nav className='max-w-5xl mx-auto grid grid-cols-4 gap-12 [&_h6]:text-xl [&_h6]:font-medium [&_h6]:mb-6 [&_li]:text-grey-700'>
        <nav className='flex flex-col'>
          <Logo className='text-2xl' />
          <div className='text-sm mt-auto'>
            Copyright &copy; 2023 przez firme MazurShop. Wszelkie prawa
            zastrzeżone.
          </div>
        </nav>
        <nav>
          <h6 className='mb-2'>Kontakt</h6>
          <ul className='flex flex-col gap-2 text-lg'>
            <li>test@test.com</li>
            <li>212 242 521</li>
          </ul>
        </nav>
        <nav>
          <h6 className='mb-2'>Firma</h6>
          <ul className='flex flex-col gap-2'>
            <li>
              <Link href={''} className='hover:text-grey-500 inline-block'>
                O MazurShop
              </Link>
            </li>
            <li>
              <Link
                href={'/regulamin'}
                className='hover:text-grey-500 inline-block'
              >
                Regulamin
              </Link>
            </li>
            <li>
              <Link href={''} className='hover:text-grey-500 inline-block'>
                Prywatność
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <h6 className='mb-2'>Sklep</h6>
          <ul className='flex flex-col gap-2'>
            <li>
              <Link
                href={'/produkty'}
                className='hover:text-grey-500 inline-block'
              >
                Produkty
              </Link>
            </li>
            <li>
              <Link href={''} className='hover:text-grey-500 inline-block'>
                Szczegóły
              </Link>
            </li>
            {/* <li>
              <Link href={''} className='hover:text-grey-500 inline-block'>
                uwu
              </Link>
            </li> */}
          </ul>
        </div>
      </nav>
    </footer>
  );
}

export default Footer;
