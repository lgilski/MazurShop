import { CartState } from '@/types/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: CartState = {
  items: [],
  totalCost: 0,
  showCart: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      if (
        !state.items.find(
          item => item.product._id === action.payload.product._id
        )
      ) {
        state.items.push(action.payload);
      } else {
        state.items.find(
          item => item.product._id === action.payload.product._id
        )!.quantity += Number(action.payload.quantity);
      }

      const updatedItem = state.items.find(
        item => item.product._id === action.payload.product._id
      );

      if (updatedItem!.quantity > updatedItem!.product.leftInStock) {
        state.items.find(
          item => item.product._id === action.payload.product._id
        )!.quantity = updatedItem!.product.leftInStock;
      }

      return state;
    },
    // updateTotalCost(state, action){
    //   state.totalCost
    // },
    updateQuantity(state, action) {
      state.items.find(
        item => item.product._id === action.payload.product._id
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
