import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AppLayout from '@/components/Layouts/AppLayout';
import DashboardLayout from '@/components/Layouts/DashboardLayout';
import { fetchUsers } from '@/redux/Users/userSlice';

const Admin: NextPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
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
