import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import {
  Home,
  Show,
  SignIn,
  SignUp,
  Profile,
  ForgetPassword,
} from '../screens';

export type RootStackParamList = {
  Home: undefined;
  SignUp: undefined;
  SignIn: undefined;
  Profile: undefined;
  Show: undefined;
  ForgetPassword: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export type ProfileScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const AuthRoutes = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#fff',
        },
      }}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Show" component={Show} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AuthRoutes;
