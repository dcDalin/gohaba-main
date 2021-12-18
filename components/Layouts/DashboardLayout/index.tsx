import { FC, ReactNode } from 'react';

import SideNav from '@/components/Navigation/SideNav';

interface IDashboardLayout {
  children: ReactNode;
}

const DashboardLayout: FC<IDashboardLayout> = ({ children }: IDashboardLayout) => {
  return (
    <div className="flex">
      <SideNav />
      {children}
    </div>
  );
};

export default DashboardLayout;
