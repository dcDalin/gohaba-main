import '../styles/globals.css';
import 'nprogress/nprogress.css'; //styles of nprogress

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import Head from 'next/head';
import Router from 'next/router';
import withApollo from 'next-with-apollo';
import NProgress from 'nprogress';
import { useEffect } from 'react';

import { wrapper } from '@/redux/store';
import { isDev, isSSR } from '@/utils/environment';

const MyApp = ({ Component, pageProps, apollo }) => {
  useEffect(() => {
    Router.events.on('routeChangeStart', () => NProgress.start());
    Router.events.on('routeChangeComplete', () => NProgress.done());
    Router.events.on('routeChangeError', () => NProgress.done());
  }, []);
  return (
    <ApolloProvider client={apollo}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Home</title>
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default withApollo(({ initialState }) => {
  const httpLink = new HttpLink({
    uri: isDev
      ? process.env.NEXT_PUBLIC_LOCAL_GRAPHQL_ENDPOINT
      : process.env.NEXT_PUBLIC_REMOTE_GRAPHQL_ENDPOINT
  });

  let token = '';

  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token') || '';
  }

  return new ApolloClient({
    ssrMode: isSSR(),
    link: httpLink,
    cache: new InMemoryCache().restore(initialState || {}),
    connectToDevTools: isDev,
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
})(wrapper.withRedux(MyApp));
