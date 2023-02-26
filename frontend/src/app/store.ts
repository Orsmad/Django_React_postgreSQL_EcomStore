import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import categoryReducer from '../features/category/categorySlice';
import profileReducer from '../features/profile/profileSclice';
import orderReducer from '../features/order/orderSlice';
import reviewReducer from '../features/review/reviewSlice';
import authReducer from'../features/authentication/authSlice'



export const store = configureStore({
  reducer: {
    product:productReducer,
    category:categoryReducer,
    profile:profileReducer,
    order:orderReducer,
    review:reviewReducer,
    auth:authReducer,


  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
