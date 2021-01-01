import { render } from '@testing-library/react';
import React from 'react';
import Login from './Login';

test('Page should match snapshot', () => {
  const tree = render(<Login />).asFragment();

  expect(tree).toMatchSnapshot();
});
