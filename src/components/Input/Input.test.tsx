import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import Input from '../Input/Input';

jest.mock('react-native-vector-icons/Feather', () => 'Icon');
jest.mock('@unform/core', () => {
  return {
    useField: jest.fn(() => ({
      registerField: jest.fn(),
    })),
  };
});

describe('Behavior Input', () => {
  const screenRender = (
    <Input
      autoCorrect={false}
      autoCapitalize="none"
      keyboardType="email-address"
      name="email"
      icon="mail"
      placeholder="E-mail"
      returnKeyType="next"
    />
  );

  it('render snapshot', () => {
    const result = render(screenRender).toJSON();

    expect(result).toMatchSnapshot();
  });

  it('should call the onFocus', () => {
    const { getByTestId } = render(screenRender);

    const input = getByTestId('inputId');
    const container = getByTestId('container_inputId');

    fireEvent(input, 'focus');

    expect(container.props.style).toMatchObject([
      {
        borderColor: '#2d4379',
      },
    ]);
  });

  it('should call the onChange function', () => {
    const { getByTestId } = render(screenRender);

    const input = getByTestId('inputId');

    fireEvent.changeText(input, 'juniordias@gmail.com');

    expect(input.props.onChangeText()).toBeUndefined();
  });

  it('should call the onBlur', () => {
    const { getByTestId } = render(screenRender);

    const input = getByTestId('inputId');

    fireEvent(input, 'blur');

    expect(input.props.onBlur()).toBeUndefined();
  });
});
