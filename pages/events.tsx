import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import AppLayout from '@/components/Layouts/AppLayout';

const Events: NextPage = () => {
  return (
    <>
      <NextSeo title="Events" description="A short description goes here." />
      <AppLayout>
        <p className="text-4xl">Events</p>
      </AppLayout>
    </>
  );
};

export default Events;
