import { FC, ReactNode } from 'react';

import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';

interface IAppLayoutProps {
  children: ReactNode;
  admin?: boolean;
}

const AppLayout: FC<IAppLayoutProps> = ({ children, admin = false }: IAppLayoutProps) => {
  return (
    <div>
      <Navigation />
      <div className={`${admin ? '' : 'container mx-auto'} `}>{children}</div>
      <Footer />
    </div>
  );
};

export default AppLayout;
