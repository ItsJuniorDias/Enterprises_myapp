import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Show, SignIn, SignUp } from '../screens';

const Auth = createStackNavigator();

const AuthRoutes = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: '#fff',
      },
    }}
  >
    <Auth.Screen name="/SignIn" component={SignIn} />
    <Auth.Screen name="/SignUp" component={SignUp} />
    <Auth.Screen name="/Home" component={Home} />
    <Auth.Screen name="/Show" component={Show} />
  </Auth.Navigator>
);

export default AuthRoutes;
