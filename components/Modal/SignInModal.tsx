import { FC } from 'react';
import { FaFacebookSquare } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';

import SignInForm from '@/components/Forms/SignInForm';
import Modal from '@/components/Modal';
import { userSignInWithGoogle } from '@/redux/Authentication/authenticationSlice';
import { closeAuthModals, openSignUpModal } from '@/redux/AuthModals';
import { AppState } from '@/redux/store';
const SignInModal: FC = () => {
  const dispatch = useDispatch();

  const {
    authModals: { isSignInOpen },
    auth: { loading, isSignedIn }
  } = useSelector((state: AppState) => state);

  const handleSignInWithGoogle = () => {
    dispatch(userSignInWithGoogle());
  };

  if (isSignedIn) {
    dispatch(closeAuthModals());
  }

  return (
    <Modal
      title="Sign In"
      openModal={isSignInOpen}
      closeModal={() => dispatch(closeAuthModals())}
      widths="w-full md:w-1/2 lg:w-1/2 xl:w-1/3"
      content={
        <div>
          <div className="flex justify-between items-center space-x-4 py-10 border-b border-gray-200 mb-4">
            <div className="group flex h-10 items-center w-full border border-gray-600  custom-hover">
              <div className="w-full md:w-10 border border-white h-full flex items-center ">
                <FaFacebookSquare className="text-blue-fb m-auto group-hover:text-blue-800" />
              </div>
              <div className="hidden md:block w-full text-center text-sm text-gray-600 group-hover:text-gray-800">
                Continue with Facebook
              </div>
            </div>
            <div className="group flex h-10 items-center w-full border border-gray-600  custom-hover">
              <div className="w-full md:w-10 border border-white h-full flex items-center">
                <FcGoogle className="m-auto" />
              </div>
              <button
                className="hidden md:block w-full text-center text-sm text-gray-600 group-hover:text-gray-800"
                onClick={() => handleSignInWithGoogle()}
                disabled={loading}
              >
                Continue with Google
              </button>
            </div>
          </div>
          <SignInForm />
          <div className="mt-6">
            <div className="align-baseline font-bold text-sm pb-2">{`Don't have an account?`}</div>
            <button
              className="border border-gray-600 w-full custom-hover font-bold py-2 px-4 focus:outline-none focus:shadow-outline hover:bg-gray-600 hover:text-white"
              onClick={() => dispatch(openSignUpModal())}
              disabled={loading}
            >
              Create a Ficlin Account
            </button>
          </div>
        </div>
      }
    />
  );
};

export default SignInModal;
