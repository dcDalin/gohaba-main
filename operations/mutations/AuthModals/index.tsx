import { ReactiveVar } from '@apollo/client';

import { authModalsVar } from '@/lib/cache';
import { AuthModalsState, InitialAuthModalState } from '@/models/AuthModals';

export const closeAuthModals = () => {
  return authModalsVar(InitialAuthModalState);
};

export const openSignUpModal = () => {
  console.log('Func called ***********');
  const modalState: AuthModalsState = authModalsVar();
  return authModalsVar({ ...modalState, isSignInOpen: true });
};
