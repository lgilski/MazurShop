function Logo({ className, otherProps }) {
  return (
    <div className={`font-semibold ${className}`} {...otherProps}>
      Mazur<span className='text-green-500'>Shop</span>
    </div>
  );
}

export default Logo;
