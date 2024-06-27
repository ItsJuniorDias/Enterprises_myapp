import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Show } from './Show';

import { Linking } from 'react-native';
import { theme } from '../../theme';
import { ThemeProvider } from 'styled-components/native';

const mockNavigation = jest.fn();
const mockAddEventListener = jest.fn();
const mockRemoveEventListener = jest.fn();

jest.mock('react-native/Libraries/Utilities/BackHandler', () => ({
  addEventListener: mockAddEventListener,
  removeEventListener: mockRemoveEventListener,
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    goBack: mockNavigation,
    navigate: mockNavigation,
  })),
}));

jest.mock('react-native-responsive-fontsize', () => ({
  RFValue: (value: number, _?: number) => value,
}));

jest.spyOn(Linking, 'canOpenURL').mockResolvedValue(true);
jest.spyOn(Linking, 'openURL').mockResolvedValue({});

describe('Behavior screen Show', () => {
  const props = {
    route: {
      params: {
        id: '',
        type: '',
        title: '',
        description: '',
        thumbnail: '',
        url_link: '',
        title_enterprise: '',
      },
    },
  };

  const setup = () =>
    render(
      <ThemeProvider theme={theme}>
        <Show {...props} />
      </ThemeProvider>
    );

  it('should call function handleGoBack', () => {
    const { getByTestId } = setup();

    const touchable = getByTestId('buttonTouchable_testID');

    fireEvent.press(touchable);

    expect(mockNavigation).toBeCalled();
  });

  it('should call function handlePress', () => {
    const { getByTestId } = setup();

    const pressable = getByTestId('pressableLink_testID');

    fireEvent.press(pressable);

    expect(
      Linking.openURL(
        'https://www.linkedin.com/jobs/search/?currentJobId=3913252746&distance=25&geoId=106057199&keywords=%22React%20Native%22&origin=JOBS_HOME_KEYWORD_HISTORY&refresh=true'
      )
    ).toBeTruthy();
  });

  it('should call function handlePress error open alert', () => {
    jest.spyOn(Linking, 'canOpenURL').mockResolvedValue(false);
    const { getByTestId } = setup();

    const pressable = getByTestId('pressableLink_testID');

    fireEvent.press(pressable);

    expect(Linking.openURL('')).toBeTruthy();
  });

  it('should call function handleBackButtonClick', () => {
    setup();

    mockAddEventListener.mock.calls[0][1]();

    expect(mockNavigation).toHaveBeenCalled();
  });
});
