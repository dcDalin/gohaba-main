import React, { FC } from 'react';
import { CgProfile } from 'react-icons/cg';
import { useDispatch } from 'react-redux';

import NavMenuItem from '@/components/Navigation/NavMenuItem';
import { openSignInModal } from '@/redux/AuthModals';

const SignInButton: FC = () => {
  const dispatch = useDispatch();

  return (
    <NavMenuItem title="Sign In" icon={<CgProfile />} onClick={() => dispatch(openSignInModal())} />
  );
};

export default SignInButton;
