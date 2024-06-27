import React from 'react';
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
import { ItemEnterprise, User } from '../hooks';

export type RootStackParamList = {
  Home: undefined;
  SignUp: undefined;
  SignIn: undefined;
  Profile: User;
  Show: ItemEnterprise;
  ForgetPassword: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export type ProfileScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const AuthRoutes = () => (
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
);

export default AuthRoutes;
