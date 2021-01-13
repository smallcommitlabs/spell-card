import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Login from './Login';

const mockStore = configureStore();

test('Page should match snapshot', () => {
  const store = mockStore();

  const tree = render(
    <Provider store={store}>
      <Login />
    </Provider>
  ).asFragment();

  expect(tree).toMatchSnapshot();
});
