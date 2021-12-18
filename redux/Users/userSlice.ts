import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFunctions, httpsCallable } from 'firebase/functions';

const functions = getFunctions();

export interface UsersState {
  users: any;
  loading: boolean;
  error: any;
}

export const initialState: UsersState = {
  users: [],
  loading: false,
  error: null
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const users = httpsCallable(functions, 'getAllUsers');
    console.log('users is **********************: ', users);
    return users;
  } catch (error) {
    return false;
  }
});

export const userSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchUsers.pending, (state) => {
        return { ...state, loading: true, users: null, error: null };
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        return { ...state, loading: true, users: action.payload, error: null };
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        return {
          ...state,
          loading: false,

          users: null,
          error: action.payload
        };
      });
  }
});

export default userSlice.reducer;
