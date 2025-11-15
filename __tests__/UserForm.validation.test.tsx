import React, { ReactNode } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { UserForm } from '../src/components/form/UserForm';
import { UserProvider } from '../src/context/AppContext';

const Wrapper = ({ children }: { children: ReactNode }) => (
  <UserProvider>{children}</UserProvider>
);

describe('UserForm validation tests', () => {
  const navigateMock = { navigate: jest.fn() };

  beforeEach(() => {
    navigateMock.navigate.mockClear();
  });

  it('shows error when DNI has invalid length', async () => {
    const { getByTestId, getByText } = render(
      <UserForm navigation={navigateMock} />,
      { wrapper: Wrapper },
    );

    fireEvent.changeText(getByTestId('dni-input'), '123');
    fireEvent.press(getByText('Cotiza aquí'));

    await waitFor(() => {
      expect(getByText('El DNI debe tener 8 dígitos numéricos')).toBeTruthy();
    });
  });

  it('shows error when phone does not start with 9', async () => {
    const { getByTestId, getByText } = render(
      <UserForm navigation={navigateMock} />,
      { wrapper: Wrapper },
    );

    fireEvent.changeText(getByTestId('phone-input'), '123456789');
    fireEvent.press(getByText('Cotiza aquí'));

    await waitFor(() => {
      expect(
        getByText('El celular debe tener 9 dígitos y empezar con 9'),
      ).toBeTruthy();
    });
  });

  it('submits correctly with valid data', async () => {
    const { getByTestId, getByText } = render(
      <UserForm navigation={navigateMock} />,
      { wrapper: Wrapper },
    );

    fireEvent.changeText(getByTestId('dni-input'), '12345678');
    fireEvent.changeText(getByTestId('phone-input'), '912345678');
    fireEvent.press(getByTestId('acceptedPrivacy-checkbox'));
    fireEvent.press(getByTestId('acceptedCommunication-checkbox'));

    fireEvent.press(getByText('Cotiza aquí'));

    await waitFor(() => {
      expect(navigateMock.navigate).toHaveBeenCalledTimes(1);
      expect(navigateMock.navigate).toHaveBeenCalledWith('Plans');
    });
  });
});
