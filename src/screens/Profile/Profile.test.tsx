import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Profile, ProfileProps } from './Profile';
import { Alert } from 'react-native';
import { theme } from '../../theme';
import { ThemeProvider } from 'styled-components/native';

jest.spyOn(Alert, 'alert');

jest.mock('react-native-iphone-x-helper', () => ({
  getStatusBarHeight: jest.fn(),
}));

jest.mock('react-native-image-picker', () => {
  return {
    launchImageLibrary: jest.fn(),
    ImagePickerResponse: jest.fn(),
  };
});

jest.mock('@react-native-firebase/auth', () => {
  return {
    __esModule: true,
    default: jest.fn(() => ({
      currentUser: {},
      sendPasswordResetEmail: jest.fn(),
      signOut: jest.fn(),
    })),
  };
});

jest.mock('@react-native-firebase/firestore', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    collection: jest.fn().mockReturnValue({
      get: jest.fn().mockReturnValue({
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
  })),
}));

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

describe('Profile Screen', () => {
  const props: ProfileProps = {
    route: {
      params: {
        id: 'id',
        name: 'Test',
        email: 'test@gmail.com',
        thumbnail: 'thumbnail',
      },
    },
  };

  const setup = () =>
    render(
      <ThemeProvider theme={theme}>
        <Profile {...props} />
      </ThemeProvider>
    );

  it('should render the screen correctly', () => {
    const { getByTestId } = setup();

    // const pressable = getByTestId('pressable_testID');

    // fireEvent.press(pressable);

    // expect(mockGoBack).toHaveBeenCalled();
  });
});
