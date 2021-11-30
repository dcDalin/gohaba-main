import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import AppLayout from '@/components/Layouts/AppLayout';
import { withUser } from '@/lib/withAuth';

const Tours: NextPage = () => {
  return (
    <>
      <NextSeo title="Tours" description="A short description goes here." />
      <AppLayout>
        <p className="text-4xl">Tours page</p>
      </AppLayout>
    </>
  );
};

export default withUser(Tours);
