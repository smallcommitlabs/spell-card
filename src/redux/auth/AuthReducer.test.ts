import { login } from './thunks/login';
import configureStore from 'redux-mock-store';
import { AuthState } from './AuthSlice';

const mockStore = configureStore<AuthState>();

const initialState: AuthState = {
  resolvingAuthState: true,
  isAuthenticated: false,
};

// describe('auth reducer', () => {

//   it('should set authentication state to true on action login.fulfilled', () => {

//     // Setup the store
//     const store = mockStore(initialState);

//     store.dispatch(login.fulfilled(true, '', {username: '', password: ''}));

//     console.log(store.getState());

//     expect(store.getState().isAuthenticated).toBeTruthy();
//   });

// });
