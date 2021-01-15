import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { hydrateAuth, hydrateAuthReducers } from './thunks/hydrateAuth';
import { loginReducers } from './thunks/login';
import { logoutReducers } from './thunks/logout';

export type AuthState = {
  /**
   * A boolean representing if the users authentication state has been resolved. Initially this is true
   */
  resolvingAuthState: boolean;
  /**
   * A boolean representing if the user is authenticated. This will be changed in the future to hold a user object with more information
   */
  isAuthenticated: boolean;
  token?: string;
};

const AuthSlice = createSlice<AuthState, SliceCaseReducers<AuthState>>({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    resolvingAuthState: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    loginReducers(builder);
    logoutReducers(builder);
    hydrateAuthReducers(builder);
  },
});

// Export reducer
const { reducer } = AuthSlice;
export default reducer;
