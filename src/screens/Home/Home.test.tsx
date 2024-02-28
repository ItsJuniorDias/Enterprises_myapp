import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Home } from '../Home/Home';
import { Provider } from 'react-redux';
import { combineReducers, createStore, Reducer } from 'redux';
import { IEnterpriseState } from 'store/modules/enterprise/types';
import produce from 'immer';

const mockNavigation = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    navigate: mockNavigation,
  })),
}));

export const INITIAL_STATE: IEnterpriseState = {
  enterprise: {
    id: 0,
    email_enterprise: null,
    facebook: null,
    twitter: null,
    linkedin: null,
    phone: null,
    own_enterprise: false,
    enterprise_name: 'NuBank',
    photo: '',
    description:
      'Nubank é uma empresa startup brasileira pioneira no segmento de serviços financeiros',
    city: '',
    country: '',
    value: 0,
    share_price: 0,
    enterprise_type: undefined,
  },
};

const enterprise: Reducer<IEnterpriseState> = (
  state = INITIAL_STATE,
  action
) => {
  return produce(state, (draft) => {
    switch (action.type) {
      default: {
        return draft;
      }
    }
  });
};

describe('Behavior Home', () => {
  function createTestStore() {
    const store = createStore(
      combineReducers({
        enterprise,
      })
    );
    return store;
  }

  const screenRender = () => (
    <Provider store={createTestStore()}>
      <Home />
    </Provider>
  );

  it('render snapshot', () => {
    const result = render(screenRender()).toJSON();

    expect(result).toMatchSnapshot();
  });

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
