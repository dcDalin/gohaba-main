import { NetworkStatus } from '@apollo/client';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { RiBusFill, RiHome3Line } from 'react-icons/ri';
import { TiTicket } from 'react-icons/ti';

import NavMenuItem from '@/components/Navigation/NavMenuItem';
import { EVENTS, HOME, TOURS } from '@/components/Navigation/paths';
import useUserProfile from '@/hooks/useUserProfile';

import SignInButton from './SignInButton';
import UserProfile from './UserProfile';

const BottomNav: FC = () => {
  const router = useRouter();

  const { data, loading, networkStatus } = useUserProfile();

  const handleRedirect = (path: string) => {
    router.push(path);
  };

  return (
    <div className="shadow dark:bg-gray sm:block md:hidden w-full h-screen">
      <section className="block pt-2 px-4 fixed inset-x-0 bottom-0 z-50 bg-white shadow">
        <div id="tabs" className="flex justify-between items-center">
          <NavMenuItem
            icon={<RiHome3Line className="h-full w-full" />}
            active={router.pathname === HOME}
            onClick={() => handleRedirect(HOME)}
          />
          <NavMenuItem
            icon={<RiBusFill className="h-full w-full" />}
            active={router.pathname === TOURS}
            onClick={() => handleRedirect(TOURS)}
          />
          <NavMenuItem
            icon={<TiTicket className="h-full w-full" />}
            active={router.pathname === EVENTS}
            onClick={() => handleRedirect(EVENTS)}
          />

          {data && data.UserProfile.success ? (
            <UserProfile />
          ) : (
            <SignInButton loading={loading || networkStatus === NetworkStatus.refetch} />
          )}
        </div>
      </section>
    </div>
  );
};

export default BottomNav;
