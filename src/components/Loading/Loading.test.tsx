import React from 'react';
import { render } from '@testing-library/react-native';

import { Loading } from '../Loading/Loading';

describe('Behavior Loading', () => {
  const screenRender = <Loading />;

  it('render snapshot', () => {
    const result = render(screenRender).toJSON();

    expect(result).toMatchSnapshot();
  });
});
