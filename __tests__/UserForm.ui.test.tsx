import React, { ReactNode } from 'react';
import { render } from '@testing-library/react-native';
import { UserForm } from '../src/components/form/UserForm';
import { UserProvider } from '../src/context/AppContext';

const Wrapper = ({ children }: { children: ReactNode }) => (
  <UserProvider>{children}</UserProvider>
);

describe('UserForm UI tests', () => {
  it('renders all inputs correctly', () => {
    const { getByTestId, getByText } = render(
      <UserForm navigation={{ navigate: jest.fn() }} />,
      {
        wrapper: Wrapper,
      },
    );

    expect(getByTestId('dni-input')).toBeTruthy();
    expect(getByTestId('phone-input')).toBeTruthy();

    expect(getByText('Cotiza aquí')).toBeTruthy();
  });
});
