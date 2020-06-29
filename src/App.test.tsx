import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders component', () => {
  const { getByTestId } = render(<App />);
  const app = getByTestId("app");
  expect(app).toBeDefined();
});
