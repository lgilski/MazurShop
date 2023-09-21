function Feature({
  icon,
  header,
  description,
}: {
  icon: string;
  header: string;
  description: string;
}) {
  return (
    <div className='flex flex-col items-center [&_ion-icon]:w-10 [&_ion-icon]:h-10 [&_ion-icon]:p-4 [&_ion-icon]:bg-green-200 [&_ion-icon]:rounded-full [&_ion-icon]:text-green-900'>
      <ion-icon name={icon} />
      <h6 className='text-2xl font-bold mt-2'>{header}</h6>
      <p className='text-xl font-medium text-center'>{description}</p>
    </div>
  );
}

export default Feature;
