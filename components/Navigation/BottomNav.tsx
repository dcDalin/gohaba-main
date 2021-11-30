import { useRouter } from 'next/router';
import { useAuthUser } from 'next-firebase-auth';
import { FC } from 'react';
import { RiBusFill } from 'react-icons/ri';
import { TiTicket } from 'react-icons/ti';

import NavMenuItem from '@/components/Navigation/NavMenuItem';
import { EVENTS, TOURS } from '@/components/Navigation/paths';

import SignInButton from './SignInButton';
import UserProfile from './UserProfile';

const BottomNav: FC = () => {
  const router = useRouter();

  const { email } = useAuthUser();

  const handleRedirect = (path: string) => {
    router.push(path);
  };

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
          {email ? <UserProfile /> : <SignInButton />}
        </div>
      </section>
    </div>
  );
};

export default BottomNav;
