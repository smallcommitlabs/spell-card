import { AuthClient } from './AuthClient';

beforeEach(() => {
  localStorage.clear();
});

test('successful signin should return true', () => {
  const res = AuthClient.signIn('test', 'test');
  expect(res).toBeTruthy();
});

test('isAuth should return false if not logged in', async () => {
  const isAuthenticated = await AuthClient.isAuth();
  expect(isAuthenticated).toBeFalsy();
});

test('isAuth should return true after successful signin', async () => {
  await AuthClient.signIn('test', 'test');
  const isAuthenticated = await AuthClient.isAuth();
  expect(isAuthenticated).toBeTruthy();
});

test('after signing in and out again isAuth should be false', async () => {
  await AuthClient.signIn('test', 'test');
  await AuthClient.signOut();
  const isAuthenticated = await AuthClient.isAuth();
  expect(isAuthenticated).toBeFalsy();
});
