import React from 'react';
import { render } from '@testing-library/react-native';

import { Loading } from '../Loading/Loading';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '../../theme';

describe('Behavior Loading', () => {
  const screenRender = (
    <ThemeProvider theme={theme}>
      <Loading />
    </ThemeProvider>
  );

  it('render snapshot', () => {
    const result = render(screenRender).toJSON();

    expect(result).toMatchSnapshot();
  });
});
