import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { InputSearch } from './InputSearch';

describe('Behavior component InputSearch', () => {
  const handleFilterValue = jest.fn();

  const screenRender = (
    <InputSearch
      title="Buscar por nome"
      name="filter"
      callBackParent={(value) => handleFilterValue(value)}
    />
  );

  it('should press touchable', () => {
    const { getByTestId } = render(screenRender);

    const touchable = getByTestId('touchable_testID');

    fireEvent.press(touchable);

    expect(touchable).toBeTruthy();
  });
});
