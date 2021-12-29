import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { Action } from 'redux';

import AuthenticationReducer from '@/redux/Authentication/authenticationSlice';

const makeStore = () =>
  configureStore({
    reducer: {
      auth: AuthenticationReducer
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);
