function Price({ price, discount }: { price: number; discount: number }) {
  const priceAfterDiscount = discount
    ? (price * (1 - discount / 100)).toFixed(2)
    : null;

  return (
    <p className={`text-xl font-semibold text-green-700`}>
      <span
        className={`${priceAfterDiscount && 'line-through text-grey-500'} `}
      >
        {price.toFixed(2)}zł
      </span>{' '}
      {priceAfterDiscount && priceAfterDiscount + 'zł'}
    </p>
  );
}

export default Price;
