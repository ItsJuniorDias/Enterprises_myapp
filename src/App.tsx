import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { theme } from './theme';

import store from './store';

import Routes from './routes';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          <Routes />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
