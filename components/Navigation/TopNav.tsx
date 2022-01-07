import { NetworkStatus, useApolloClient } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { HiOutlineLogout } from 'react-icons/hi';
import { RiBusFill } from 'react-icons/ri';
import { TiTicket } from 'react-icons/ti';

import SignInModal from '@/components/Modal/SignInModal';
import NavMenuItem from '@/components/Navigation/NavMenuItem';
import { EVENTS, TOURS } from '@/components/Navigation/paths';
import SignInButton from '@/components/Navigation/SignInButton';
import UserProfile from '@/components/Navigation/UserProfile';
import useUserProfile from '@/hooks/useUserProfile';
import { JWT } from '@/utils/environment';

const TopNav: FC = () => {
  const client = useApolloClient();
  const router = useRouter();

  const { data, loading, networkStatus } = useUserProfile();

  const handleRedirect = (path: string) => {
    router.push(path);
  };

  const handleSignOut = async () => {
    localStorage.removeItem(JWT);
    await client.refetchQueries({
      include: ['GetUserProfile']
    });
    client.clearStore();
  };

  return (
    <>
      <div className="shadow dark:bg-gray-800 sticky top-0 z-50 bg-white">
        <div className="container w-full mx-auto flex items-center">
          <div className="w-full md:w-1/3 h-10 flex items-center justify-between px-4">
            <Link href="/">
              <a className="px-0">goHaba</a>
            </Link>
            {!loading && data && data.UserProfile.success && (
              <div
                className="md:hidden flex space-x-2 items-center"
                role="button"
                tabIndex={0}
                onClick={handleSignOut}
                onKeyDown={handleSignOut}
              >
                <div className="h-4 w-4">
                  <HiOutlineLogout className="h-full w-full" />
                </div>
                <div className="text-xs">LOG OUT</div>
              </div>
            )}
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
