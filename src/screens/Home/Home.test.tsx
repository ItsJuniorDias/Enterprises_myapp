import React from 'react';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react-native';

import { useEnterprises } from '../../mocks';
import { Home } from '../Home/Home';

import { theme } from '../../theme';
import { ThemeProvider } from 'styled-components/native';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
  Provider: jest.fn(),
}));

jest.mock('react-native-vector-icons/Feather', () => 'Icon');

const mockUser = { email: 'test@example.com' };

jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    onAuthStateChanged: jest.fn(),
    signOut: jest.fn(),
  })),
}));

jest.mock('@react-native-firebase/firestore', () => ({
  __esModule: true,
  default: jest.fn(),
  firestore: jest.fn(() => ({
    collection: jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue({
        docs: [
          {
            _data: {
              id: '',
              type: '',
              title: '',
              description: '',
              thumbnail: '',
              url_link: '',
              title_enterprise: '',
            },
          },
        ],
      }),
    }),
    add: jest.fn(),
    get: jest.fn(),
    doc: jest.fn().mockReturnThis(),
    update: jest.fn(),
  })),
}));

const mockNavigation = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    navigate: mockNavigation,
  })),
}));

jest.mock('react-native-responsive-fontsize', () => ({
  RFValue: (value: number, _?: number) => value,
}));

describe('Behavior screen Home', () => {
  const setup = () =>
    render(
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    );

  it('should call funtion handleExit', () => {
    const { getByTestId } = setup();

    const button = getByTestId('buttonExit_testId');

    fireEvent.press(button);

    expect(mockNavigation).toHaveBeenCalledWith('SignIn');
  });
});
