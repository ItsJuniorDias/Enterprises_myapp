import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { Profile, ProfileProps } from './Profile';
import { Alert } from 'react-native';
import { theme } from '../../theme';
import { ThemeProvider } from 'styled-components/native';

jest.spyOn(Alert, 'alert');

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: mockGoBack,
  }),
}));

jest.mock('react-native-iphone-x-helper', () => ({
  getStatusBarHeight: jest.fn(),
}));

const mockUri = 'mock-uri';
const mockResponse = {
  assets: [{ uri: mockUri }],
};

jest.mock('react-native-image-picker', () => {
  return {
    launchImageLibrary: jest.fn().mockImplementation((options, callback) => {
      callback(mockResponse);
    }),
    ImagePickerResponse: jest.fn(),
  };
});

jest.mock('@react-native-firebase/auth', () => {
  return {
    __esModule: true,
    default: jest.fn(() => ({
      currentUser: {
        delete: jest.fn().mockResolvedValue({}),
      },
      sendPasswordResetEmail: jest.fn(),
      signOut: jest.fn(),
    })),
  };
});

jest.mock('@react-native-firebase/firestore', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    collection: jest.fn().mockReturnValue({
      doc: jest.fn(() => ({
        update: jest.fn().mockResolvedValue({}),
        delete: jest.fn().mockResolvedValue({}),
      })),
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

  it('should call function handleSelectImage and updateThumnail', async () => {
    const { getByTestId } = setup();

    const pressable = getByTestId('thumbnail_pressable_testID');

    fireEvent.press(pressable);

    await waitFor(() => expect(Alert.alert).toHaveBeenCalled());
  });

  it('should call function updateDocument ', async () => {
    const { getByTestId } = setup();

    const inputName = getByTestId('input_name_testID');

    inputName.props.onSubmitEditing();

    fireEvent.changeText(inputName, 'Alexandre Test');

    const inputEmail = getByTestId('input_email_testID');

    inputEmail.props.onSubmitEditing();

    fireEvent.changeText(inputEmail, 'alexandre.test@gmail.com');

    const button = getByTestId('button_update_testID');

    fireEvent.press(button);

    await waitFor(() => expect(Alert.alert).toHaveBeenCalled());
  });

  it('should call function handleDeleteAccount', async () => {
    const { getByTestId } = setup();

    const button = getByTestId('button_delete_testID');

    fireEvent.press(button);

    const alert = Alert.alert as jest.Mock;

    alert.mock.calls[0][2][1].onPress();

    // await waitFor(() => expect(mockNavigate).toHaveBeenCalled());
  });
});
