import React, { FC } from 'react';

import ProfileImage from '@/components/Shared/ProfileImage';
import useUserProfile from '@/hooks/useUserProfile';

import WalletBalance from '../Shared/WalletBalance';

const Profile: FC = () => {
  const {
    data: {
      UserProfile: { displayName, profilePictureUrl }
    }
  } = useUserProfile();

  return (
    <div className="container">
      <div className="flex flex-col space-y-4 justify-between p-2">
        <div className="flex flex-col items-center shadow p-2">
          <ProfileImage photoURL={profilePictureUrl} size="lg" />
          <div className="font-bold">{displayName}</div>
        </div>
        <div className="shadow p-2">
          <WalletBalance />
        </div>
      </div>
    </div>
  );
};

export default Profile;
