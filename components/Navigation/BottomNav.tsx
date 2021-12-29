import { useRouter } from 'next/router';
import { FC } from 'react';
import { GrUserAdmin } from 'react-icons/gr';
import { RiBusFill } from 'react-icons/ri';
import { TiTicket } from 'react-icons/ti';
import { useSelector } from 'react-redux';

import NavMenuItem from '@/components/Navigation/NavMenuItem';
import { ADMIN, EVENTS, TOURS } from '@/components/Navigation/paths';
import { AppState } from '@/redux/store';

import SignInButton from './SignInButton';
import UserProfile from './UserProfile';

const BottomNav: FC = () => {
  const router = useRouter();

  const handleRedirect = (path: string) => {
    router.push(path);
  };

  const isSignedIn = false;

  return (
    <div className="shadow dark:bg-gray sm:block md:hidden w-full h-screen">
      <section className="block pt-2 fixed inset-x-0 bottom-0 z-50 bg-white shadow">
        <div id="tabs" className="flex justify-between items-center">
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

          {isSignedIn ? <UserProfile /> : <SignInButton />}
        </div>
      </section>
    </div>
  );
};

export default BottomNav;
