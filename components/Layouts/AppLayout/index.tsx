import { FC, ReactNode } from 'react';

import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';

interface IAppLayoutProps {
  children: ReactNode;
}

const AppLayout: FC<IAppLayoutProps> = ({ children }: IAppLayoutProps) => {
  return (
    <div>
      <Navigation />
      <div className="container mx-auto">{children}</div>
      <Footer />
    </div>
  );
};

export default AppLayout;
