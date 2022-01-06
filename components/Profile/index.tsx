import React, { FC } from 'react';

import ProfileImage from '@/components/Shared/ProfileImage';
import useUserProfile from '@/hooks/useUserProfile';

const Profile: FC = () => {
  const {
    data: {
      UserProfile: { displayName, profilePictureUrl }
    }
  } = useUserProfile();

  return (
    <div className="container">
      <div className="flex flex-col items-center shadow-lg">
        <ProfileImage photoURL={profilePictureUrl} size="lg" />
        <div className="font-bold">{displayName}</div>
      </div>
    </div>
  );
};

export default Profile;
