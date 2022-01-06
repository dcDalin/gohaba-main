import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import AppLayout from '@/components/Layouts/AppLayout';
import DashboardLayout from '@/components/Layouts/DashboardLayout';

const Admin: NextPage = () => {
  return (
    <>
      <NextSeo title="Admin" description="" />
      <AppLayout admin>
        <DashboardLayout>
          <p className="text-4xl">Admin page</p>
        </DashboardLayout>
      </AppLayout>
    </>
  );
};

export default Admin;
