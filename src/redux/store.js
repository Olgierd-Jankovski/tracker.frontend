import { configureStore } from '@reduxjs/toolkit';
import PricesReducer from './pricesReducer';
import ToastMiddleware from '../middlewares/ToastMiddleware';

export default configureStore({
  reducer: {
    pricesReducer: PricesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ToastMiddleware)
});
