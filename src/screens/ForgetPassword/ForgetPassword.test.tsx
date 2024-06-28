import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ForgetPassword } from './ForgetPassword';
import { Alert } from 'react-native';
import { theme } from '../../theme';
import { ThemeProvider } from 'styled-components/native';

jest.spyOn(Alert, 'alert');

jest.mock('@react-native-firebase/auth', () => {
  return {
    __esModule: true,
    default: jest.fn(() => ({
      sendPasswordResetEmail: jest.fn(),
    })),
  };
});

const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    goBack: mockGoBack,
  })),
}));

jest.mock('react-native-vector-icons/Feather', () => 'Icon');

jest.mock('react-native-responsive-fontsize', () => ({
  RFValue: (value: number, _?: number) => value,
}));

describe('ForgetPassword Screen', () => {
  const setup = () =>
    render(
      <ThemeProvider theme={theme}>
        <ForgetPassword />
      </ThemeProvider>
    );

  it('should render the screen correctly', () => {
    const { getByTestId } = setup();

    const pressable = getByTestId('pressable_testID');

    fireEvent.press(pressable);

    expect(mockGoBack).toHaveBeenCalled();
  });

  it('should call function navigate goBack', () => {
    const { getByPlaceholderText, getByText } = setup();

    expect(getByPlaceholderText('E-mail')).toBeTruthy();

    expect(getByText('Esqueceu sua senha ?')).toBeTruthy();
  });

  it('should call function handleResetPassword without email', () => {
    const { getByTestId } = setup();

    const input = getByTestId('input_email_testID');

    input.props.onSubmitEditing();

    fireEvent.changeText(input, '');

    const button = getByTestId('button_testID');

    fireEvent.press(button);

    expect(Alert.alert).toHaveBeenCalled();
  });

  it('should call function handleResetPassword', () => {
    const { getByTestId } = setup();

    const input = getByTestId('input_email_testID');

    input.props.onSubmitEditing();

    fireEvent.changeText(input, 'test@gmail.com');

    const button = getByTestId('button_testID');

    fireEvent.press(button);

    expect(Alert.alert).toHaveBeenCalled();
  });
});
