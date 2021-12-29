import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

import { USER_SIGN_IN } from '@/graphql/mutations';
import { USER_PROFILE } from '@/graphql/queries';
import { createApolloClient } from '@/lib/apollo';
import { JWT } from '@/utils/environment';

const client = createApolloClient();
export interface AuthenticationState {
  isSignedIn: boolean;
  loading: boolean;
  error: any;
}

export const initialState: AuthenticationState = {
  isSignedIn: false,
  loading: false,
  error: null
};

export const fetchUserProfile = createAsyncThunk('authentication/fetchUserProfile', async () => {
  try {
    const token = localStorage.getItem(JWT) || '';

    if (token) {
      const decodedToken = jwt_decode(token);

      const userId = decodedToken['https://hasura.io/jwt/claims']['x-hasura-user-id'];

      const {
        data: { users_by_pk }
      } = await client.query({
        query: USER_PROFILE,
        variables: { id: userId }
      });

      return users_by_pk;
    } else {
      throw new Error('No jwt token');
    }
  } catch (error) {
    console.log('******** Error cautht: ', error);
    throw new Error(error.message);
  }
});

export const loginWithEmailAndPassword = createAsyncThunk(
  'authentication/loginWithEmailAndPassword',
  async ({ email, password }: { email: string; password: string }, { dispatch }) => {
    try {
      const {
        data: {
          UserSignIn: { id, token }
        }
      } = await client.mutate({
        mutation: USER_SIGN_IN,
        variables: { email, password }
      });

      // save jwt token
      localStorage.setItem(JWT, token);

      dispatch(fetchUserProfile());
      return id;
    } catch (error) {
      return error.message;
    }
  }
);

export const logOut = createAsyncThunk('authentication/logOut', (_args, { dispatch }) => {
  try {
    // save jwt token
    localStorage.removeItem(JWT);
    client.resetStore();
    dispatch(fetchUserProfile());
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(loginWithEmailAndPassword.pending, (state) => {
        return { ...state, loading: true, isSignedIn: false, error: null };
      })
      .addCase(loginWithEmailAndPassword.fulfilled, (state) => {
        return { ...state, loading: false, isSignedIn: true, error: null };
      })
      .addCase(loginWithEmailAndPassword.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          isSignedIn: false,
          error: action.payload
        };
      })
      .addCase(fetchUserProfile.pending, (state) => {
        return { ...state, loading: true, isSignedIn: false, error: null };
      })
      .addCase(fetchUserProfile.fulfilled, (state) => {
        return {
          ...state,
          loading: false,
          isSignedIn: true,
          error: null
        };
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          isSignedIn: false,
          error: action.payload
        };
      })
      .addCase(logOut.pending, (state) => {
        return { ...state, loading: true, isSignedIn: false, error: null };
      })
      .addCase(logOut.fulfilled, (state) => {
        return { ...state, loading: true, isSignedIn: false, error: null };
      })
      .addCase(logOut.rejected, (state) => {
        return { ...state, loading: true, isSignedIn: false, error: null };
      });
  }
});

export default authenticationSlice.reducer;
