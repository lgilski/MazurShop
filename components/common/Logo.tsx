function Logo({
  className,
  otherProps,
}: {
  className?: any;
  otherProps?: any;
}) {
  return (
    <div className={`font-semibold text-black ${className}`} {...otherProps}>
      Mazur<span className='text-green-500'>Shop</span>
    </div>
  );
}

export default Logo;
