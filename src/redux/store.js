import { configureStore } from '@reduxjs/toolkit';
import AuthenticationReducer from './authenticationReducer';
import PricesReducer from './pricesReducer';
import ToastMiddleware from '../middlewares/ToastMiddleware';

export default configureStore({
  reducer: {
    authenticationReducer: AuthenticationReducer,
    pricesReducer: PricesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ToastMiddleware)
});
