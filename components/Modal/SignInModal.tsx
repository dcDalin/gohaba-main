import { FC } from 'react';
import { FaFacebookSquare } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import SignInForm from '@/components/Forms/SignInForm';
import Modal from '@/components/Modal';
import { authModalsVar } from '@/lib/cache';
import { closeAuthModals, openSignUpModal } from '@/operations/mutations/AuthModals';

const SignInModal: FC = () => {
  const { isSignInOpen } = authModalsVar();

  console.log('Is signin open: ', isSignInOpen);
  return (
    <Modal
      title="Sign In"
      openModal={isSignInOpen}
      closeModal={closeAuthModals}
      widths="w-full md:w-2/3 lg:w-1/2 xl:w-1/3"
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
            <div
              className="group flex h-10 items-center w-full border border-gray-600  custom-hover"
              role="button"
              tabIndex={0}
            >
              <div className="w-full md:w-10 border border-white h-full flex items-center">
                <FcGoogle className="m-auto" />
              </div>
              <button className="hidden md:block w-full text-center text-sm text-gray-600 group-hover:text-gray-800">
                Continue with Google
              </button>
            </div>
          </div>
          <SignInForm />
          <div className="mt-6">
            <div className="align-baseline font-bold text-sm pb-2">{`Don't have an account?`}</div>
            <button
              className="border border-gray-600 w-full custom-hover font-bold py-2 px-4 focus:outline-none focus:shadow-outline hover:bg-gray-600 hover:text-white"
              onClick={openSignUpModal}
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
