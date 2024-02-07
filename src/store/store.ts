import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';
import userAuthSlice from './authSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    userAuth: userAuthSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
