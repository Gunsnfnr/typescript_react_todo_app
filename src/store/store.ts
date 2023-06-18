import {configureStore} from '@reduxjs/toolkit';
import locStorSlice from './locStorSlice';

export const store = configureStore({
  reducer: {
    locStor: locStorSlice.reducer,
  }
}
);