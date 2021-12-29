import { InMemoryCache, makeVar } from '@apollo/client';

import { InitialAuthModalState } from '@/models/AuthModals';

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        authModals: {
          read() {
            return authModalsVar();
          }
        }
      }
    }
  }
});

export const authModalsVar = makeVar(InitialAuthModalState);
