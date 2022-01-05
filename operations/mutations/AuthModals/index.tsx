import { authModalsVar } from '@/lib/cache';
import { AuthModalsState, InitialAuthModalState } from '@/models/AuthModals';

export const closeAuthModals = () => {
  authModalsVar(InitialAuthModalState);
};

export const openSignUpModal = () => {
  const modalState: AuthModalsState = authModalsVar();
  authModalsVar({ ...modalState, isSignInOpen: true });
};
