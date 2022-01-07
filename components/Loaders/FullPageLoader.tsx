import React, { FC } from 'react';
import { ImSpinner2 } from 'react-icons/im';

interface IFullPageLoaderProps {
  message?: string;
}
const FullPageLoader: FC<IFullPageLoaderProps> = ({ message }: IFullPageLoaderProps) => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="h-12 w-12">
        <ImSpinner2 className="icon-spin h-full w-full" />
      </div>
      {message && <div className="p-2 tracking-wider">{message}</div>}
    </div>
  );
};

export default FullPageLoader;
