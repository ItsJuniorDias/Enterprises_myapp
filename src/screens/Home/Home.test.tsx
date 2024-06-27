import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

import { Home } from './Home';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '../../theme';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: mockGoBack,
  }),
}));

const mockDispatch = jest.fn();
const mockLogout = jest.fn();

jest.mock('../../hooks', () => ({
  useAuth: jest.fn(() => ({
    logout: mockLogout,
    user: {
      name: 'Test User',
      thumbnail: 'http://example.com/thumbnail.png',
    },
  })),
  useEnterprises: jest.fn(() => ({
    state: {
      _data: [
        { _data: { title: 'Test Title', description: 'Test Description' } },
      ],
      isFiltered: false,
      dataFiltered: [],
    },
    dispatch: mockDispatch,
  })),
}));

jest.mock('react-native-vector-icons/Feather', () => 'Icon');

jest.mock('react-native-responsive-fontsize', () => ({
  RFValue: (value: number, _?: number) => value,
}));

describe('Home screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setup = () =>
    render(
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    );

  it('renders correctly', () => {
    const { getByText, getByTestId } = setup();

    expect(getByText('Olá, Test User!')).toBeTruthy();
    expect(getByTestId('buttonExit_testId')).toBeTruthy();
  });

  it('navigates to SignIn on logout', () => {
    const { getByTestId } = setup();

    fireEvent.press(getByTestId('buttonExit_testId'));

    expect(mockNavigate).toHaveBeenCalledWith('SignIn');
  });

  it('navigates to Profile when RowThumbnail is pressed', () => {
    const { getByText } = setup();

    fireEvent.press(getByText('Olá, Test User!'));

    expect(mockNavigate).toHaveBeenCalledWith('Profile', {
      name: 'Test User',
      thumbnail: 'http://example.com/thumbnail.png',
    });
  });

  it('should call function handleShow', () => {
    const { getByTestId } = setup();

    fireEvent.press(getByTestId('containerCard_testId'));

    expect(mockNavigate).toHaveBeenCalled();
  });

  it('should render inputSearch and call function', () => {
    const { getByTestId } = setup();

    const input = getByTestId('inputSearch_testId');

    fireEvent.changeText(input, 'React Native');

    expect(mockDispatch).toHaveBeenCalled();
  });
});
