import { ApolloClient, HttpLink, NormalizedCacheObject, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import merge from 'deepmerge';
import fetch from 'isomorphic-unfetch';
import jwt_decode from 'jwt-decode';
import isEqual from 'lodash/isEqual';
import { useMemo } from 'react';
import { toast } from 'react-toastify';
import * as ws from 'ws';

import { cache } from '@/lib/cache';
import { isDev, isSSR, JWT } from '@/utils/environment';

let token = '';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const httpLink = new HttpLink({
  uri: isDev
    ? process.env.NEXT_PUBLIC_LOCAL_GRAPHQL_ENDPOINT
    : process.env.NEXT_PUBLIC_REMOTE_GRAPHQL_ENDPOINT,
  credentials: 'include',
  fetch
});

const wsLink = !isSSR
  ? new WebSocketLink({
      uri: isDev
        ? process.env.NEXT_PUBLIC_LOCAL_WS_GRAPHQL_ENDPOINT
        : process.env.NEXT_PUBLIC_REMOTE_WS_GRAPHQL_ENDPOINT,
      options: { reconnect: true },
      webSocketImpl: ws
    })
  : null;

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  if (typeof window !== 'undefined') {
    token = localStorage.getItem(JWT);
  }

  let authHeaders: { Authorization?: string; 'x-hasura-role'?: string };

  if (token) {
    // check if token has expired
    const decodedToken: any = jwt_decode(token);
    const currentDate = new Date();

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      // remove expired token from local storage
      localStorage.removeItem(JWT);

      authHeaders = {
        'x-hasura-role': 'anonymous'
      };
    } else {
      authHeaders = {
        Authorization: `Bearer ${token}`
      };
    }
  } else {
    authHeaders = {
      'x-hasura-role': 'anonymous'
    };
  }
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      ...authHeaders
    }
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, extensions }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${extensions.code}`);
      return toast.error(message);
    });
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
    // TODO: Redirect to network-error page
    // props.history.push('/network-error'); // redirect to network-error route
  }
});

const splitLink = !isSSR
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      wsLink,
      errorLink.concat(authLink.concat(httpLink))
    )
  : errorLink.concat(authLink.concat(httpLink));

export const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: isSSR(),
    link: splitLink,
    cache,
    connectToDevTools: true,
    queryDeduplication: true
  });
};

export const initializeApollo = (initialState: NormalizedCacheObject | null = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s)))
      ]
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const apolloState = (client: ApolloClient<NormalizedCacheObject>, pageProps: any) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useApollo = (pageProps: unknown) => {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
};
