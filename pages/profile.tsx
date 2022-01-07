import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import AppLayout from '@/components/Layouts/AppLayout';
import Profile from '@/components/Profile';
import WithUserAuth from '@/lib/WithUserAuth';

const ProfilePage: NextPage = () => {
  return (
    <>
      <NextSeo title="Profile" description="A short description goes here." />
      <AppLayout>
        <Profile />
      </AppLayout>
    </>
  );
};

export default WithUserAuth(ProfilePage);
