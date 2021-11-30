import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthUser } from 'next-firebase-auth';
import { FC } from 'react';
import { RiBusFill } from 'react-icons/ri';
import { TiTicket } from 'react-icons/ti';

import NavMenuItem from '@/components/Navigation/NavMenuItem';
import { EVENTS, TOURS } from '@/components/Navigation/paths';
import SignInButton from '@/components/Navigation/SignInButton';

import SignInModal from './SignInModal';
import UserProfile from './UserProfile';

const TopNav: FC = () => {
  const router = useRouter();

  const { email } = useAuthUser();

  const handleRedirect = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <div className="shadow dark:bg-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <a className="px-0">goHaba</a>
          </Link>

          <div className="hidden md:flex">
            <NavMenuItem
              title="Tours"
              icon={<RiBusFill />}
              active={router.pathname === TOURS}
              onClick={() => handleRedirect(TOURS)}
            />
            <NavMenuItem
              title="Events"
              icon={<TiTicket />}
              active={router.pathname === EVENTS}
              onClick={() => handleRedirect(EVENTS)}
            />
          </div>
          <div className="hidden md:flex">{email ? <UserProfile /> : <SignInButton />}</div>
        </div>
      </div>
      <SignInModal />
    </>
  );
};

export default TopNav;
