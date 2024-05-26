import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrdersFromAPI } from '../services/apiService';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await fetchOrdersFromAPI();
  return response;
});

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectOrders = (state) => state.orders.orders;

export default orderSlice.reducer;
