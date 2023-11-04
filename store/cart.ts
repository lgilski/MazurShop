import { CartState } from '@/types/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: CartState = {
  items: [],
  showCart: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      console.log(action.payload);

      if (
        !state.items.find(item => item.productId === action.payload.productId)
      ) {
        state.items.push(action.payload);
      } else {
        state.items.find(
          item => item.productId === action.payload.productId
        )!.quantity += Number(action.payload.quantity);
      }

      /////////////////////////////////
      // Handle this somewhere elese!!!

      // const updatedItem = state.items.find(
      //   item => item.productId === action.payload.productId
      // );

      // if (updatedItem!.quantity > updatedItem!.product.leftInStock) {
      //   state.items.find(
      //     item => item.productId === action.payload.productId
      //   )!.quantity = updatedItem!.product.leftInStock;
      // }

      return state;
    },
    deleteItemFromCart(state, action) {
      state.items = state.items.filter(
        item => item.productId !== action.payload.productId
      );

      return state;
    },
    updateQuantity(state, action) {
      console.log();

      state.items.find(
        item => item.productId === action.payload.productId
      )!.quantity = action.payload.quantity;

      return state;
    },
    setShowCart(state) {
      state.showCart = !state.showCart;

      return state;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
