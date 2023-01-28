import { configureStore } from '@reduxjs/toolkit'
import snackReducer from '../features/snacks/snackSlice'
import userReducer from '../features/users/userSlice'
import orderReducer from '../features/order/orderSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    snacks: snackReducer,
    order: orderReducer
  },
})