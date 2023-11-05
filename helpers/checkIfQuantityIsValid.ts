import { ItemData, ProductType } from '@/types/types';
import toast from 'react-hot-toast';

export default function checkIfQuantityIsValid({
  product,
  cartItems,
  currentQuantityToAdd,
}: {
  product: ProductType;
  cartItems: ItemData[];
  currentQuantityToAdd: number;
}) {
  if (product.leftInStock <= 0) return;

  const productQuantityInCart = cartItems.find(
    cartItem => cartItem.productId === product._id
  )?.quantity;

  if (productQuantityInCart! >= product.leftInStock) {
    toast.error(`There's no more ${product.name} to add to your cart.`);
    return null;
  }

  if (product.leftInStock - productQuantityInCart! < currentQuantityToAdd) {
    toast.success(
      `Added ${product.leftInStock - productQuantityInCart!} of ${
        product.name
      } to your cart.`
    );
    return {
      productId: product._id,
      quantity: product.leftInStock - productQuantityInCart!,
    };
  } else {
    toast.success(
      `Added ${currentQuantityToAdd} of ${product.name} to your cart.`
    );
  }

  return {
    productId: product._id,
    quantity: currentQuantityToAdd,
  };
}
