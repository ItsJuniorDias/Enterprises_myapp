import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Home } from '../Home/Home';
import { Provider } from 'react-redux';

import { createTestStore } from '../../mocks';

jest.mock('react-native-vector-icons/Feather', () => 'Icon');

const mockNavigation = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    navigate: mockNavigation,
  })),
}));

describe('Behavior screen Home', () => {
  const screenRender = () => (
    <Provider store={createTestStore()}>
      <Home />
    </Provider>
  );

  it('should call funtion handeExit', () => {
    const { getByTestId } = render(screenRender());

    const button = getByTestId('buttonExit_testId');

    fireEvent.press(button);

    expect(mockNavigation).toHaveBeenCalledWith('/SignIn');
  });

  it('should call funtion handleShow', () => {
    const { getByTestId } = render(screenRender());

    const button = getByTestId('containerCard_testId');

    fireEvent.press(button);

    expect(mockNavigation).toHaveBeenCalledWith('/Show');
  });

  it('should call funtion handleFilterValue enterprise_name', () => {
    const { getByTestId, getByText } = render(screenRender());

    const input = getByTestId('inputSearch_testId');

    const nameEnterprise = 'NuBank';

    fireEvent.changeText(input, nameEnterprise);

    expect(getByText(nameEnterprise)).toBeTruthy();
  });

  it('should call funtion handleFilterValue description', () => {
    const { getByTestId, getByText } = render(screenRender());

    const input = getByTestId('inputSearch_testId');

    const description =
      'Nubank é uma empresa startup brasileira pioneira no segmento de serviços financeiros';

    fireEvent.changeText(input, description);

    expect(getByText(description)).toBeTruthy();
  });

  it('should call funtion handleFilterValue not filtered', () => {
    const { getByTestId } = render(screenRender());

    const input = getByTestId('inputSearch_testId');

    fireEvent.changeText(input, 'C9Bank');

    expect(input.props.placeholder).toEqual('Buscar por nome');
  });
});
