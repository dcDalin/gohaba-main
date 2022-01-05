import fetch from 'cross-fetch';
import jwt from 'jsonwebtoken';

import { isDev } from '@/utils/environment';

const HASURA_ENDPOINT = isDev
  ? process.env.NEXT_PUBLIC_LOCAL_GRAPHQL_ENDPOINT
  : process.env.NEXT_PUBLIC_REMOTE_GRAPHQL_ENDPOINT;

const HASURA_GRAPHQL_JWT_SECRET = process.env.HASURA_GRAPHQL_JWT_SECRET;
const JWT_EXPIRE_TIME = '1h';

// This is a function which takes the URL and headers for Hasura queries
// and returns a function which sends GraphQL requests to the Hasura instance
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const makeGraphQLClient = ({ url, headers }) => {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async ({ query, variables }) => {
    const request = await fetch(url, {
      headers,
      method: 'POST',
      body: JSON.stringify({ query, variables })
    });
    return request.json();
  };
};

// execute the parent operation in Hasura
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const sendQuery = async (variables, HASURA_OPERATION) => {
  const fetchResponse = await fetch(HASURA_ENDPOINT, {
    headers: {
      'x-hasura-role': 'anonymous'
    },
    method: 'POST',
    body: JSON.stringify({
      query: HASURA_OPERATION,
      variables
    })
  });
  const data = await fetchResponse.json();
  console.log('DEBUG: ', data);
  return data;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const generateJWT = ({ allowedRoles, defaultRole, otherClaims = null }) => {
  const payload = {
    'https://hasura.io/jwt/claims': {
      'x-hasura-allowed-roles': allowedRoles,
      'x-hasura-default-role': defaultRole,
      ...otherClaims
    }
  };

  return jwt.sign(payload, HASURA_GRAPHQL_JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: JWT_EXPIRE_TIME
  });
};
