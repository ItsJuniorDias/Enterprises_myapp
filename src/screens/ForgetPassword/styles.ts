import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Dimensions } from 'react-native';

const windowDimensions = Dimensions.get('window').height;

type TextProps = {
  isBold?: boolean;
};

export const Container = styled.ScrollView`
  flex: 1;
  padding: ${`${RFValue(64)}px ${RFValue(24)}px`};
`;

export const Title = styled.Text`
  font-size: ${RFValue(28)}px;
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.semiBold};
`;

export const Header = styled.View`
  margin-top: ${RFValue(32)}px;
`;

export const Body = styled.View`
  margin-top: ${RFValue(64)}px;
  height: ${windowDimensions <= 592 ? RFValue(216) : RFValue(230)}px;
`;

export const Text = styled.Text<TextProps>`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.light_secondary};
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-top: ${RFValue(16)};
`;
