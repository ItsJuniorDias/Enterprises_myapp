import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from 'theme';
import 'jest-styled-components';
import { Button } from '../Button/Button';

describe('Behavior Button', () => {
  const screenRender = (
    <ThemeProvider theme={theme}>
      <Button>Assinar</Button>
    </ThemeProvider>
  );

  it('render snapshot', () => {
    const result = render(screenRender).toJSON();

    expect(result).toMatchSnapshot();
  });
  it('should render button', () => {
    const { getByTestId } = render(screenRender);

    const button = getByTestId('buttonId');

    expect(button).toBeTruthy();
  });
});
