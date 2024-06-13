function ProductsSection({
  children,
  title,
}: { title: string } & React.PropsWithChildren<{}>) {
  return (
    <section className='max-w-7xl mx-auto my-12'>
      <h4 className='text-3xl text-center mb-8 font-bold text-green-900'>
        {title}
      </h4>
      <div className='grid grid-cols-4 gap-8'>{children}</div>
    </section>
  );
}

export default ProductsSection;
