import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { GrUserAdmin } from 'react-icons/gr';
import { RiBusFill } from 'react-icons/ri';
import { TiTicket } from 'react-icons/ti';
import { useSelector } from 'react-redux';

import SignInModal from '@/components/Modal/SignInModal';
import NavMenuItem from '@/components/Navigation/NavMenuItem';
import { ADMIN, EVENTS, TOURS } from '@/components/Navigation/paths';
import SignInButton from '@/components/Navigation/SignInButton';
import UserProfile from '@/components/Navigation/UserProfile';
import { AppState } from '@/redux/store';

const TopNav: FC = () => {
  const router = useRouter();

  const handleRedirect = (path: string) => {
    router.push(path);
  };

  const {
    auth: { isSignedIn }
  } = useSelector((state: AppState) => state);

  return (
    <>
      <div className="shadow dark:bg-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <a className="px-0">goHaba</a>
          </Link>

          {/* Desktop top menu */}
          <div className="hidden md:flex">
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
          <div className="hidden md:flex">{isSignedIn ? <UserProfile /> : <SignInButton />}</div>
        </div>
      </div>
      <SignInModal />
    </>
  );
};

export default TopNav;
