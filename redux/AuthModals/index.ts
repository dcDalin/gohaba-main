import { createSlice } from '@reduxjs/toolkit';

export interface AuthModalsState {
  isSignInOpen: boolean;
  isSignUpOpen: boolean;
  isResetOpen: boolean;
}

const initialState: AuthModalsState = {
  isSignInOpen: false,
  isSignUpOpen: false,
  isResetOpen: false
};

export const authModals = createSlice({
  name: 'authModals',
  initialState,
  reducers: {
    openSignInModal: (state) => {
      state.isSignInOpen = true;
    },
    openSignUpModal: (state) => {
      state.isSignUpOpen = true;
    },
    openResetModal: (state) => {
      state.isResetOpen = true;
    },
    closeAuthModals: (state) => {
      state.isSignInOpen = false;
      state.isSignUpOpen = false;
      state.isResetOpen = false;
    }
  }
});

// Action creators are generated for each case reducer function
export const { openSignInModal, openSignUpModal, openResetModal, closeAuthModals } =
  authModals.actions;

export default authModals.reducer;
