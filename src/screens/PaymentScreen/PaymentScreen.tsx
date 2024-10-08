import {
  PlatformPay,
  PlatformPayButton,
  usePlatformPay,
} from '@stripe/stripe-react-native';
import React, { useEffect } from 'react';
import { Alert, View } from 'react-native';

// import { Container } from './styles';

export const PaymentScreen = () => {
  return (
    <View>
      {/* <PlatformPayButton
        type={PlatformPay.ButtonType.Pay}
        onPress={() => pay()}
        style={{
          width: '100%',
          height: 50,
        }}
      /> */}
    </View>
  );
};
