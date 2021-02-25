import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthClient } from '../../../util/AuthClient';
import { AuthState } from '../AuthSlice';

export const logout = createAsyncThunk('auth/logout', async () => AuthClient.signOut());

// Reducers corresponding to each promise state
export const logoutReducers = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder.addCase(logout.fulfilled, (state) => {
    state.isAuthenticated = false;
    return state;
  });
};
