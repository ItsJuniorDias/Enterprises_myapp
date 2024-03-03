import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

type TouchableTextProps = {
  isAlign: boolean;
};

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
  height: ${RFValue(230)};
  /* background-color: red; */
`;

export const TouchableText = styled.TouchableOpacity<TouchableTextProps>`
  width: 100%;
  flex-direction: row;
  justify-content: ${({ isAlign }) => (isAlign ? 'center' : 'flex-end')};
  margin-top: ${({ isAlign }) => (isAlign ? '24px' : '8px')};
`;

export const Text = styled.Text<TextProps>`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.light_secondary};
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-top: ${RFValue(16)};
`;

export const ContentButton = styled.View``;
