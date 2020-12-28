import { AuthClient } from './AuthClient';

beforeEach(() => {
  localStorage.clear();
});

test('successful signin should return true', () => {
  const res = AuthClient.signIn('test', 'test');
  expect(res).toBeTruthy();
});

test('isAuth should return false if not logged in', () => {
  const isAuthenticated = AuthClient.isAuth();
  expect(isAuthenticated).toBeFalsy();
});

test('isAuth should return true after successful signin', () => {
  AuthClient.signIn('test', 'test');
  const isAuthenticated = AuthClient.isAuth();
  expect(isAuthenticated).toBeTruthy();
});

test('after signing in and out again isAuth should be false', () => {
  AuthClient.signIn('test', 'test');
  AuthClient.signOut();
  const isAuthenticated = AuthClient.isAuth();
  expect(isAuthenticated).toBeFalsy();
});
