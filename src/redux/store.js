import { configureStore } from '@reduxjs/toolkit';
import AuthenticationReducer from './authenticationReducer';
import PricesReducer from './pricesReducer';
import StatisticsReducer from './statisticsReducer';
import ToastMiddleware from '../middlewares/ToastMiddleware';

export default configureStore({
  reducer: {
    authenticationReducer: AuthenticationReducer,
    pricesReducer: PricesReducer,
    statisticsReducer: StatisticsReducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ToastMiddleware)
});
