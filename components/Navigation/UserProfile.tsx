import { Popover, Transition } from '@headlessui/react';
import Image from 'next/image';
import { useAuthUser } from 'next-firebase-auth';
import React, { FC, Fragment } from 'react';
import { BsChevronDown } from 'react-icons/bs';

interface IProfileImageProps {
  photoURL: string;
}
const ProfileImage: FC<IProfileImageProps> = ({ photoURL }) => (
  <div className="rounded-full h-8 w-8 flex items-center justify-center border border-gray-100">
    <Image src={`${photoURL}`} alt="Picture of the author" width={32} height={32} />
  </div>
);
const UserProfile: FC = () => {
  const { displayName, photoURL, email, signOut } = useAuthUser();

  return (
    <>
      {/* Display on mobile only */}
      <div className="flex px-6 md:hidden">
        <ProfileImage photoURL={photoURL} />
      </div>

      {/* Display on desktop only */}
      <Popover className="hidden md:relative">
        <Popover.Button>
          <div className="flex items-center h-full">
            <ProfileImage photoURL={photoURL} />
            <div className="px-2 hover:text-bold">{email ? displayName : 'unknown'}</div>
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
          <Popover.Panel className="absolute z-10 px-4 mt-5 transform -translate-x-1/2 left-1/2">
            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 w-28">
              <button onClick={() => signOut()}>Logout</button>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
};

export default UserProfile;
