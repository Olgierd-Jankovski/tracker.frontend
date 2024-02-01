import { configureStore } from '@reduxjs/toolkit';
import AuthenticationReducer from './authenticationReducer';
import PricesReducer from './pricesReducer';
import StatisticsReducer from './statisticsReducer';
import NotificationsReducer from './notificationsReducer.tsx'
import ToastMiddleware from '../middlewares/ToastMiddleware';

export default configureStore({
  reducer: {
    authenticationReducer: AuthenticationReducer,
    pricesReducer: PricesReducer,
    statisticsReducer: StatisticsReducer,
    notificationsReducer: NotificationsReducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ToastMiddleware)
});
