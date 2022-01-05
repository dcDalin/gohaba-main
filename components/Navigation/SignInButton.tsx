import React, { FC } from 'react';
import { CgProfile } from 'react-icons/cg';

import NavMenuItem from '@/components/Navigation/NavMenuItem';
import { openSignUpModal } from '@/operations/mutations/AuthModals';

const SignInButton: FC = () => {
  return (
    <NavMenuItem
      title="Sign In"
      icon={<CgProfile className="h-full w-full" />}
      onClick={() => openSignUpModal()}
    />
  );
};

export default SignInButton;
