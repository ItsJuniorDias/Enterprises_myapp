import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Show } from './Show';
import { Provider } from 'react-redux';
import produce from 'immer';
import { combineReducers, createStore } from 'redux';
import { IShowState } from 'store/modules/show/types';

jest.mock('react-native-linear-gradient', () => {});

const mockNavigation = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    goBack: mockNavigation,
    navigate: mockNavigation,
  })),
}));

export const INITIAL_STATE: IShowState = {
  show: {
    id: 2,
    email_enterprise: null,
    facebook: null,
    twitter: null,
    linkedin: null,
    phone: null,
    own_enterprise: null,
    enterprise_name: 'C6 Bank',
    photo: '',
    description:
      'O C6 Bank é uma instituição financeira com sede em São Paulo.',
    city: '',
    country: '',
    value: 0,
    share_price: 0,
    enterprise_type: null,
  },
  headers: {
    uid: '69629154-fb3b-418f-905d-5aacb7c509b0',
    client: 'SSL',
    'access-token': 'access-token',
  },
};

const show: Reducer<IShowState> = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      default: {
        return draft;
      }
    }
  });
};

describe('Behavior Show', () => {
  function createTestStore() {
    const store = createStore(
      combineReducers({
        show,
      })
    );
    return store;
  }

  const screenRender = () => (
    <Provider store={createTestStore()}>
      <Show />
    </Provider>
  );

  it('render snapshot', () => {
    const result = render(screenRender()).toJSON();

    expect(result).toMatchSnapshot();
  });

  it('should call function handleGoBack', () => {
    const { getByTestId } = render(screenRender());

    const touchable = getByTestId('buttonTouchable_testID');

    fireEvent.press(touchable);

    expect(mockNavigation).toBeCalled();
  });
});
