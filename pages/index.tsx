import withAuth from 'lib/withAuth';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import AppLayout from '@/components/Layouts/AppLayout';

const Home: NextPage = () => {
  return (
    <>
      <NextSeo title="Ficlin | Home" description="A short description goes here." />
      <AppLayout>
        <p className="text-4xl">hello</p>
      </AppLayout>
    </>
  );
};

export default withAuth(Home);
