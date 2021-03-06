import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { isDev, isSSR, JWT } from '@/utils/environment';

let token = '';

const httpLink = new HttpLink({
  uri: isDev
    ? process.env.NEXT_PUBLIC_LOCAL_GRAPHQL_ENDPOINT
    : process.env.NEXT_PUBLIC_REMOTE_GRAPHQL_ENDPOINT
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  if (typeof window !== 'undefined') {
    token = localStorage.getItem(JWT);
  }
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});

export const client = new ApolloClient({
  ssrMode: isSSR(),
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: isDev,
  credentials: 'include'
});
