export default function calculatePrice({
  price,
  discount,
}: {
  price: number;
  discount: number | null | undefined;
}) {
  return discount
    ? Number((price * (1 - discount / 100)).toFixed(2))
    : Number(price.toFixed(2));
}
