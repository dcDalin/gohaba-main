import { useApolloClient } from '@apollo/client';
import { Popover, Transition } from '@headlessui/react';
import router from 'next/router';
import React, { FC, Fragment } from 'react';
import { BsChevronDown } from 'react-icons/bs';

import { PROFILE } from '@/components/Navigation/paths';
import ProfileImage from '@/components/Shared/ProfileImage';
import useUserProfile from '@/hooks/useUserProfile';
import { JWT } from '@/utils/environment';

const UserProfile: FC = () => {
  const client = useApolloClient();

  const {
    data: {
      UserProfile: { displayName, profilePictureUrl }
    }
  } = useUserProfile();

  const handleSignOut = async () => {
    localStorage.removeItem(JWT);
    await client.refetchQueries({
      include: ['GetUserProfile']
    });
    client.clearStore();
  };

  const handleRedirect = (path: string) => {
    router.push(path);
  };

  return (
    <>
      {/* Display on mobile only */}
      <div className="flex md:hidden">
        <div
          className={`px-1 mx-auto flex flex-col md:flex-row h-12 md:h-16 outline-none tracking-wide text-lg items-center hover:text-gray-600 hover:border-gray-600 hover:bg-gray-50 border-transparent hover:border-current focus:outline-none focus:text-gray-600 cursor-pointer ${
            router.pathname === PROFILE && `border-gray-600 border-b-2`
          }`}
        >
          <ProfileImage photoURL={profilePictureUrl} handleClick={() => handleRedirect(PROFILE)} />
        </div>
      </div>

      {/* Display on desktop only */}
      <Popover className="hidden md:block relative">
        <Popover.Button>
          <div className="flex items-center h-full">
            <ProfileImage photoURL={profilePictureUrl} />
            <div className="px-2 hover:text-bold">{displayName}</div>
            <BsChevronDown />
          </div>
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute z-10 px-4 mt-5 transform -translate-x-1/2 left-2/3 bg-white">
            <div className="flex flex-col overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 w-28">
              <button onClick={() => handleRedirect(PROFILE)}>Profile</button>

              <button onClick={() => handleSignOut()}>Logout</button>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
};

export default UserProfile;
