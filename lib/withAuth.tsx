import axios from 'axios';
import { useRouter } from 'next/router';
import type { FC } from 'react';

type withAuthenticationFn = (Component: FC) => FC;

const withAuth: withAuthenticationFn = (Component) => {
  const Authenticated: FC = (props): JSX.Element | null => {
    const router = useRouter();

    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');

      if (token) {
        console.log('Token exists');
      } else {
        // make request to auto token
        const getAnonymousUser = async () => {
          try {
            const {
              data: { token }
            } = await axios.get('/api/auth/anonymous');

            localStorage.setItem('token', token);
          } catch (err) {
            console.log('Err is: ', err);
          }
        };

        getAnonymousUser();
      }
    }

    // const allowedRoles = auth.getClaim('x-hasura-allowed-roles');

    // console.log('Allowed roles ***************: ', allowedRoles);

    // //public routes
    // if (signedIn === null) {
    //   return <div>Checking auth...</div>;
    // }
    // if (!signedIn) {
    //   router.push('/');
    //   return <div>Redirecting...</div>;
    // }

    // //private Routes

    // if (!allowedRoles.includes('user')) {
    //   router.push('/');
    //   return <div>Redirecting...</div>;
    // }

    return <Component {...props} />;
  };

  return Authenticated;
};

export default withAuth;
