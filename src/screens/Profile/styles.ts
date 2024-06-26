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
  padding: ${`${RFValue(24)}px ${RFValue(16)}px`};
`;

export const Content = styled.View`
  width: 100%;
  height: ${RFValue(130)}px;
  align-items: center;
  justify-content: center;
`;

export const WithoutThumbnail = styled.View`
  width: ${RFValue(96)}px;
  height: ${RFValue(96)}px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.skeleton};
  align-items: center;
  justify-content: center;
`;

export const Thumbnail = styled.Image`
  width: ${RFValue(96)}px;
  height: ${RFValue(96)}px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.skeleton};
`;

export const Title = styled.Text`
  font-size: ${RFValue(28)}px;
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.semiBold};
  margin-top: ${RFValue(24)}px;
`;

export const Body = styled.View`
  margin-top: ${RFValue(32)}px;
`;

export const TouchableDelete = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.error};
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  margin-top: ${RFValue(16)}px;
`;

export const TextDelete = styled.Text<TextProps>`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-right: 8px;
  font-weight: ${({ isBold }) => (isBold ? 700 : 400)};
`;
