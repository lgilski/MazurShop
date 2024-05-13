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
    setInitialCartItems(state, action) {
      state.items = action.payload;
    },
    addToCart(state, action) {
      if (
        !state.items.find(item => item.productId === action.payload.productId)
      ) {
        state.items.push(action.payload);
      } else {
        state.items.find(
          item => item.productId === action.payload.productId
        )!.quantity += Number(action.payload.quantity);
      }

      // // Temporary
      // localStorage.setItem('cartItems', JSON.stringify(state));

      return state;
    },
    deleteItemFromCart(state, action) {
      state.items = state.items.filter(
        item => item.productId !== action.payload.productId
      );

      return state;
    },
    updateQuantity(state, action) {
      state.items.find(
        item => item.productId === action.payload.productId
      )!.quantity = action.payload.quantity;

      // // Temporary
      // localStorage.setItem('cartItems', JSON.stringify(state));

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
