import React, { FC } from 'react';
import { BsWallet2 } from 'react-icons/bs';

const WalletBalance: FC = () => {
  return (
    <div className="flex flex-col space-x-2">
      <div className="flex items-center">
        <div className="w-4 h-4">
          <BsWallet2 className="h-full w-full" />
        </div>
        <div className="font-light">Kshs. 0</div>
      </div>
    </div>
  );
};

export default WalletBalance;
