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

const SideNav: FC = () => {
  const router = useRouter();

  const {
    auth: { isSignedIn, claims }
  } = useSelector((state: AppState) => state);

  const handleRedirect = (path: string) => {
    router.push(path);
  };

  return <div className="invisible lg:visible">side nav here</div>;
};

export default SideNav;
