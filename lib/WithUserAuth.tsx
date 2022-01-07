import { useRouter } from 'next/router';
import React, { FC } from 'react';

import FullPageLoader from '@/components/Loaders/FullPageLoader';
import { HOME } from '@/components/Navigation/paths';
import useUserProfile from '@/hooks/useUserProfile';

type withAuthenticationFn = (Component: FC) => FC;

const WithUserAuth: withAuthenticationFn = (Component) => {
  const Authenticated: FC = (props): JSX.Element | null => {
    const router = useRouter();

    const { data, loading } = useUserProfile();

    //public routes
    if (loading) {
      return <FullPageLoader message="Loading..." />;
    }

    console.log('Data auth is: ', !data.UserProfile.success);
    if (!loading && data && !data.UserProfile.success) {
      router.push(HOME);
      return <FullPageLoader message="Redirecting..." />;
    }

    return <Component {...props} />;
  };

  return Authenticated;
};

export default WithUserAuth;
