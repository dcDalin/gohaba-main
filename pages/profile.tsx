import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import AppLayout from '@/components/Layouts/AppLayout';

const Profile: NextPage = () => {
  return (
    <>
      <NextSeo title="Profile" description="A short description goes here." />
      <AppLayout>
        <p className="text-4xl">Profile page</p>
      </AppLayout>
    </>
  );
};

export default Profile;
