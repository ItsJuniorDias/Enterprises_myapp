import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { theme } from '../../theme';
import { SignUp } from './SignUp';

import { ThemeProvider } from 'styled-components/native';

const mockGoBack = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-native-responsive-fontsize', () => ({
  RFValue: (value: number, _?: number) => value,
}));
jest.mock('react-native-vector-icons/Feather', () => 'Icon');

jest.mock('react-native-iphone-x-helper', () => ({
  getStatusBarHeight: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
    navigate: mockNavigate,
  }),
}));

jest.mock('../../hooks', () => ({
  useAuth: jest.fn().mockReturnValue({
    createUser: jest.fn(),
    loading: true,
    formRef: { current: { submitForm: jest.fn() } },
  }),
}));

describe('SignUp screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setup = () =>
    render(
      <ThemeProvider theme={theme}>
        <SignUp />
      </ThemeProvider>
    );

  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = setup();

    expect(getByPlaceholderText('Nome')).toBeTruthy();
    expect(getByPlaceholderText('E-mail')).toBeTruthy();
    expect(getByPlaceholderText('Senha')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
  });

  it('navigates back on Pressable icon press', () => {
    const { getByTestId } = setup();

    const button = getByTestId('pressable_back_testID');

    fireEvent.press(button);

    expect(mockGoBack).toHaveBeenCalled();
  });

  it('should call form on button press', () => {
    const { getByTestId, getByText } = setup();

    const button = getByTestId('button_testID');

    fireEvent.press(button);

    expect(getByText('Inscrever-se')).toBeTruthy();
  });

  it('should call function onSubmitEditing input name', () => {
    const { getByTestId } = setup();

    const inputName = getByTestId('input_name_testID');

    inputName.props.onSubmitEditing();

    expect(typeof inputName.props.onSubmitEditing).toEqual('function');
  });

  it('should call function onSubmitEditing input email', () => {
    const { getByTestId } = setup();

    const inputEmail = getByTestId('input_email_testID');

    inputEmail.props.onSubmitEditing();

    expect(typeof inputEmail.props.onSubmitEditing).toEqual('function');
  });

  it('should call function onSubmitEditing input password', () => {
    const { getByTestId } = setup();

    const inputPassword = getByTestId('input_password_testID');

    inputPassword.props.onSubmitEditing();

    expect(typeof inputPassword.props.onSubmitEditing).toEqual('function');
  });

  it('should call function onPress in pressable component', () => {
    const { getByTestId } = setup();

    const pressable = getByTestId('pressable_testID');

    fireEvent.press(pressable);

    expect(mockGoBack).toHaveBeenCalled();
  });
});
