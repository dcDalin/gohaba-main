import React, { FC } from 'react';
import { CgProfile } from 'react-icons/cg';

import NavMenuItem from '@/components/Navigation/NavMenuItem';
import { openSignUpModal } from '@/operations/mutations/AuthModals';

interface ISignInButtonProps {
  loading: boolean;
}
const SignInButton: FC<ISignInButtonProps> = ({ loading }: ISignInButtonProps) => {
  return (
    <NavMenuItem
      title="Sign In"
      icon={<CgProfile className="h-full w-full" />}
      onClick={() => openSignUpModal()}
      loading={loading}
    />
  );
};

export default SignInButton;
