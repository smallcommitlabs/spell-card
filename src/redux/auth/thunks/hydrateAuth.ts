import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthClient } from '../../../util/AuthClient';
import { AuthState } from '../AuthSlice';

// Function for rehydrating the login state on app load
export const hydrateAuth = createAsyncThunk('auth/hydrate', async () => {
  const res = await AuthClient.isAuth();
  console.log(`auth state is ${res}`);
  return res;
});

// Reducers corresponding to each promise state
export const hydrateAuthReducers = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder.addCase(hydrateAuth.fulfilled, (state, { payload }) => ({
    ...state,
    resolvingAuthState: false,
    isAuthenticated: payload,
  }));
};
