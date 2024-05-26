import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItemToCart: (state, action) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    decreaseItemQuantity: (state, action) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter(i => i.id !== action.payload.id);
      }
    },
    removeItemFromCart: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItemToCart, decreaseItemQuantity, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
