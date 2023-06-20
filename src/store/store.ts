import {configureStore} from '@reduxjs/toolkit';
import locStorSlice from './locStorSlice';

export const store = configureStore({
  reducer: {
    locStor: locStorSlice.reducer,
  }
}
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;