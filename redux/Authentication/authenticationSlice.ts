import { ref } from '@firebase/database';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getDatabase, onValue } from 'firebase/database';

import { JWT } from '@/utils/environment';

const auth = getAuth();
const database = getDatabase();

// Auth providers
const googleProvider = new GoogleAuthProvider();

export interface AuthenticationState {
  isSignedIn: boolean;
  loading: boolean;
  user: any;
  error: any;
}

export const initialState: AuthenticationState = {
  isSignedIn: false,
  loading: false,
  user: null,
  error: null
};

// export const fetchUser = createAsyncThunk('authentication/fetchUser', () => {
//   auth.onAuthStateChanged(async (user) => {
//     // On user login add new listener.
//     if (user) {
//       const idTokenResult = await user.getIdTokenResult();
//       const hasuraClaim = idTokenResult.claims['https://hasura.io/jwt/claims'];

//       if (hasuraClaim) {
//         console.log('Valid claims');
//       } else {
//         // Check if refresh is required.
//         const metadataRef = ref(database, 'metadata/' + user.uid + '/refreshTime');

//         onValue(metadataRef, async (snapshot) => {
//           if (snapshot.exists()) {
//             const token = await user.getIdToken(true);
//             const idTokenResult = await user.getIdTokenResult();
//             const hasuraClaim = idTokenResult.claims['https://hasura.io/jwt/claims'];
//             console.log('Hasura claim is: ', hasuraClaim);
//             localStorage.setItem(JWT, token);
//           }
//         });
//       }
//     }
//   });
// });

export const fetchUser = createAsyncThunk('authentication/fetchUser', async () => {
  return new Promise<any>((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      unsubscribe();
      if (user) {
        console.log('User found ******************');
        const idTokenResult = await user.getIdTokenResult();
        const hasuraClaim = idTokenResult.claims['https://hasura.io/jwt/claims'];

        console.log('Hasura claim is: ****************: ', hasuraClaim);
        if (hasuraClaim) {
          const token = idTokenResult.token;
          localStorage.setItem(JWT, token);
          resolve(user);
        } else {
          // Check if refresh is required.
          const metadataRef = ref(database, 'metadata/' + user.uid + '/refreshTime');

          console.log('Metadata ref is: ', metadataRef);
          onValue(metadataRef, async (snapshot) => {
            console.log('Snapshot is: ', snapshot);
            if (snapshot) {
              const token = await user.getIdToken(true);
              const idTokenResult = await user.getIdTokenResult();
              const hasuraClaim = idTokenResult.claims['https://hasura.io/jwt/claims'];
              console.log('Hasura claim is: ', hasuraClaim);
              localStorage.setItem(JWT, token);
              resolve(user);
            } else {
              localStorage.removeItem(JWT);
              reject('Invalid token');
            }
          });
        }
      } else {
        localStorage.removeItem(JWT);
        reject('Invalid token');
      }
    });
  });
});

export const userSignInWithGoogle = createAsyncThunk(
  'authentication/signInWithGoogle',
  async (_url: string, thunkAPI) => {
    try {
      const credential = await signInWithPopup(auth, googleProvider);

      const token = await credential.user.getIdToken(true);
      localStorage.setItem(JWT, token);
      thunkAPI.dispatch(fetchUser());

      return credential.user;
    } catch (error) {
      return error.message;
    }
  }
);

export const userSignOut = createAsyncThunk('authentication/signOut', async () => {
  try {
    await auth.signOut();
    localStorage.removeItem(JWT);
    return true;
  } catch (error) {
    return false;
  }
});

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(userSignInWithGoogle.pending, (state) => {
        return { ...state, loading: true, isSignedIn: false, user: null, error: null };
      })
      .addCase(userSignInWithGoogle.fulfilled, (state, action) => {
        return { ...state, loading: false, isSignedIn: true, user: action.payload, error: null };
      })
      .addCase(userSignInWithGoogle.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          isSignedIn: false,
          user: null,
          error: action.payload
        };
      })
      .addCase(fetchUser.pending, (state) => {
        return { ...state, loading: true, isSignedIn: false, user: null, error: null };
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        return { ...state, loading: false, isSignedIn: true, user: action.payload, error: null };
      })
      .addCase(fetchUser.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          isSignedIn: false,
          user: null,
          error: action.payload
        };
      })
      .addCase(userSignOut.pending, (state) => {
        return { ...state, loading: true, isSignedIn: false, user: null, error: null };
      })
      .addCase(userSignOut.fulfilled, (state) => {
        return { ...state, loading: false, isSignedIn: false, user: null, error: null };
      })
      .addCase(userSignOut.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          isSignedIn: false,
          user: null,
          error: action.payload
        };
      });
  }
});

export default authenticationSlice.reducer;
