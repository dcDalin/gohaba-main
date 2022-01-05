import '../styles/globals.css';
import 'nprogress/nprogress.css'; //styles of nprogress
import 'react-toastify/dist/ReactToastify.css';

import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import { useApollo } from '@/lib/apollo';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const client = useApollo(pageProps);

  useEffect(() => {
    Router.events.on('routeChangeStart', () => NProgress.start());
    Router.events.on('routeChangeComplete', () => NProgress.done());
    Router.events.on('routeChangeError', () => NProgress.done());
  }, []);

  return (
    <ApolloProvider client={client}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Home</title>
      </Head>
      <Component {...pageProps} />

      <ToastContainer />
    </ApolloProvider>
  );
};

export default MyApp;
