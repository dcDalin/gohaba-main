import types from '@/redux/AuthModals/types';
import initialState from '@/redux/initialState';

type STATE = typeof initialState;

export const authModalsReducer = (
  state = initialState,
  action: { type: string; payload: unknown }
): STATE => {
  switch (action.type) {
    case types.OPEN_LOGIN_MODAL:
      return {
        ...state,
        isSignInOpen: true,
        isSignUpOpen: false,
        isResetOpen: false,
        isCodeOpen: false,
        isNewPassOpen: false
      };

    case types.OPEN_SIGNUP_MODAL:
      return {
        ...state,
        isSignInOpen: false,
        isSignUpOpen: true,
        isResetOpen: false,
        isCodeOpen: false,
        isNewPassOpen: false
      };

    case types.OPEN_RESET_PASS_MODAL:
      return {
        ...state,
        isSignInOpen: false,
        isSignUpOpen: false,
        isResetOpen: true,
        isCodeOpen: false,
        isNewPassOpen: false
      };

    case types.CLOSE_AUTH_MODALS:
      return {
        ...state,
        isSignInOpen: false,
        isSignUpOpen: false,
        isResetOpen: false,
        isCodeOpen: false,
        isNewPassOpen: false
      };
    default:
      return initialState;
  }
};
