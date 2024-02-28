import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { InputSearch } from '../InputSearch/InputSearch';

describe('Behavior InputSearch', () => {
  const handleFilterValue = jest.fn();

  const screenRender = (
    <InputSearch
      title="Buscar por nome"
      name="filter"
      callBackParent={(value) => handleFilterValue(value)}
    />
  );

  it('render snapshot', () => {
    const result = render(screenRender).toJSON();

    expect(result).toMatchSnapshot();
  });

  it('should press touchable', () => {
    const { getByTestId } = render(screenRender);

    const touchable = getByTestId('touchable_testID');

    fireEvent.press(touchable);

    expect(touchable).toBeTruthy();
  });
});
