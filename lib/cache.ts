import { InMemoryCache, makeVar } from '@apollo/client';

import { InitialAuthModalState } from '@/models/AuthModals';

// reactive vars
export const authModalsVar = makeVar(InitialAuthModalState);

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
