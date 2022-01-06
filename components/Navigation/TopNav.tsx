import { NetworkStatus } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { RiBusFill } from 'react-icons/ri';
import { TiTicket } from 'react-icons/ti';

import SignInModal from '@/components/Modal/SignInModal';
import NavMenuItem from '@/components/Navigation/NavMenuItem';
import { EVENTS, TOURS } from '@/components/Navigation/paths';
import SignInButton from '@/components/Navigation/SignInButton';
import UserProfile from '@/components/Navigation/UserProfile';
import useUserProfile from '@/hooks/useUserProfile';

const TopNav: FC = () => {
  const router = useRouter();

  const { data, loading, networkStatus } = useUserProfile();

  const handleRedirect = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <div className="shadow dark:bg-gray-800">
        <div className="container w-full mx-auto flex items-center">
          <div className="w-1/3">
            <Link href="/">
              <a className="px-0">goHaba</a>
            </Link>
          </div>

          {/* Desktop top menu */}
          <div className="hidden md:flex w-1/3 justify-center">
            <NavMenuItem
              title="Tours"
              icon={<RiBusFill className="h-full w-full" />}
              active={router.pathname === TOURS}
              onClick={() => handleRedirect(TOURS)}
            />
            <NavMenuItem
              title="Events"
              icon={<TiTicket className="h-full w-full" />}
              active={router.pathname === EVENTS}
              onClick={() => handleRedirect(EVENTS)}
            />
          </div>
          <div className="hidden md:flex w-1/3 justify-end">
            {!loading && data && data.UserProfile.success ? (
              <UserProfile />
            ) : (
              <SignInButton loading={loading || networkStatus === NetworkStatus.refetch} />
            )}
          </div>
        </div>
      </div>
      <SignInModal />
    </>
  );
};

export default TopNav;
