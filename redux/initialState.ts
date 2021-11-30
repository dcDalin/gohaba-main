type InitialState = {
  isSignInOpen: boolean;
  isSignUpOpen: boolean;
  isResetOpen: boolean;
  isCodeOpen: boolean;
  isNewPassOpen: boolean;
};

const initialState: InitialState = {
  isSignInOpen: false,
  isSignUpOpen: false,
  isResetOpen: false,
  isCodeOpen: false,
  isNewPassOpen: false
};

export default initialState;
