import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
