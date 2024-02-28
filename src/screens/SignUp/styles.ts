import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

type TextProps = {
  isBold?: boolean;
};

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.shape};
  margin-top: ${getStatusBarHeight()};
  padding: ${`${RFValue(16)}px ${RFValue(16)}px`};
`;

export const Title = styled.Text`
  font-size: ${RFValue(28)}px;
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.semiBold};
  margin-top: ${RFValue(24)}px;
`;

export const Body = styled.View`
  margin-top: ${RFValue(64)}px;
`;

export const TouchableText = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  margin-top: ${RFValue(24)}px;
`;

export const Text = styled.Text<TextProps>`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.light_secondary};
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-right: 8px;
  font-weight: ${({ isBold }) => (isBold ? 700 : 400)};
`;
