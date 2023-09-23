import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalCost: 0,
};

const cartSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
