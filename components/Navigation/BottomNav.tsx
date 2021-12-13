import { useRouter } from 'next/router';
import { FC } from 'react';
import { RiBusFill } from 'react-icons/ri';
import { TiTicket } from 'react-icons/ti';
import { useSelector } from 'react-redux';

import NavMenuItem from '@/components/Navigation/NavMenuItem';
import { EVENTS, TOURS } from '@/components/Navigation/paths';
import { AppState } from '@/redux/store';

import SignInButton from './SignInButton';
import UserProfile from './UserProfile';

const BottomNav: FC = () => {
  const router = useRouter();

  const handleRedirect = (path: string) => {
    router.push(path);
  };

  const {
    auth: { isSignedIn }
  } = useSelector((state: AppState) => state);

  return (
    <div className="shadow dark:bg-gray sm:block md:hidden w-full h-screen">
      <section className="block pt-2 fixed inset-x-0 bottom-0 z-10 bg-white shadow">
        <div id="tabs" className="flex justify-between items-center">
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
          {isSignedIn ? <UserProfile /> : <SignInButton />}
        </div>
      </section>
    </div>
  );
};

export default BottomNav;
