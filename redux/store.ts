import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { Action } from 'redux';

import AuthenticationReducer from '@/redux/Authentication/authenticationSlice';
import AuthModals from '@/redux/AuthModals';

const makeStore = () =>
  configureStore({
    reducer: {
      authModals: AuthModals,
      auth: AuthenticationReducer
    },
    devTools: true
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);
