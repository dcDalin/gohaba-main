import Image from 'next/image';
import React, { FC } from 'react';

interface IProfileImageProps {
  photoURL: string;
  handleClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}
const ProfileImage: FC<IProfileImageProps> = ({ size, photoURL, handleClick }) => {
  let dimentions: string;

  if (size === 'sm') {
    dimentions = 'h-8 w-8';
  } else if (size === 'md') {
    dimentions = 'h-12 w-12';
  } else if (size === 'lg') {
    dimentions = 'h-20 w-20';
  } else {
    dimentions = 'h-8 w-8';
  }

  return (
    <div
      className={`rounded-full flex items-center justify-center border border-gray-100 ${dimentions}`}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleClick}
    >
      <Image
        src={`${photoURL}`}
        alt="Picture of the author"
        width="100%"
        height="100%"
        className="rounded-full"
        priority={true}
      />
    </div>
  );
};

export default ProfileImage;
