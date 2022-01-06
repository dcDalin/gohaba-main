import { FC, ReactNode, useEffect } from 'react';

import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import useUserProfile from '@/hooks/useUserProfile';

interface IAppLayoutProps {
  children: ReactNode;
  admin?: boolean;
}

const AppLayout: FC<IAppLayoutProps> = ({ children, admin = false }: IAppLayoutProps) => {
  const { refetch } = useUserProfile();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div>
      <Navigation />
      <div className={`${admin ? '' : 'container mx-auto p-2'} `}>{children}</div>
      <Footer />
    </div>
  );
};

export default AppLayout;
