import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import Books from '@/components/Books';
import AppLayout from '@/components/Layouts/AppLayout';

const Home: NextPage = () => {
  return (
    <>
      <NextSeo title="Ficlin | Home" description="A short description goes here." />
      <AppLayout>
        <Books />
      </AppLayout>
    </>
  );
};

export default Home;
