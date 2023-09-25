import { ProductState } from '@/types/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ProductState = {
  products: [],
  // currentProduct: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;

      return state;
    },
    updateProducts(state, action) {
      console.log(action.payload);

      const indexToChange = state.products.findIndex(
        product => product._id === action.payload.documentId
      );

      state.products[indexToChange] = action.payload.result;

      return state;
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
