export interface AuthModalsState {
  isSignInOpen: boolean;
  isSignUpOpen: boolean;
  isResetOpen: boolean;
}

export const InitialAuthModalState: AuthModalsState = {
  isSignInOpen: false,
  isSignUpOpen: false,
  isResetOpen: false
};
