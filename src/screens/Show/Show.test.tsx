import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Show } from './Show';

import { theme } from '../../theme';
import { IShowState } from '../../store/modules/show/types';
import { ThemeProvider } from 'styled-components/native';

const mockNavigation = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    goBack: mockNavigation,
    navigate: mockNavigation,
  })),
}));

jest.mock('react-native-responsive-fontsize', () => ({
  RFValue: (value: number, _?: number) => value,
}));

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
});
