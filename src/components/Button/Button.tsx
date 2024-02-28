import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, ButtonText } from './styles';
interface ButtonProps extends TouchableOpacityProps {
  children: string;
}

export const Button = ({
  testID = 'buttonId',
  children,
  ...rest
}: ButtonProps) => {
  return (
    <Container activeOpacity={0.6} testID={testID} {...rest}>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
};
