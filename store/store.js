import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import authReducer from './authSlice';
import orderReducer from './orderSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    order: orderReducer,
    user: userReducer,
  },
});

export default store;

