import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthClient } from '../../../util/AuthClient';
import { AuthState } from '../AuthSlice';

interface loginArgs {
  username: string;
  password: string;
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: loginArgs): Promise<boolean> =>
    AuthClient.signIn(username, password)
);

// Reducers corresponding to each promise state
export const loginReducers = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder.addCase(login.fulfilled, (state, action) => {
    state.isAuthenticated = true;
    return state;
  });
};
