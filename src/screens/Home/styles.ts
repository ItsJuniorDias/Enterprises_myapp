import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.ScrollView`
  flex: 1;
  padding: ${`${RFValue(Platform.OS === 'ios' ? 24 : 0)}px ${RFValue(24)}px`};
  margin-top: ${getStatusBarHeight(true)};
`;

export const Header = styled.View`
  width: 100%;
  height: 140px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-family: 'Poppins-Regular';
  color: ${({ theme }) => theme.colors.light_secondary};
  line-height: 24px;
`;

export const Description = styled.Text`
  font-family: 'Poppins-SemiBold';
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
  color: #0d253c;
`;

export const TouchableExit = styled.TouchableOpacity`
  margin-top: -40px;
  width: 48px;
  height: 48px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;

export const ContentFlat = styled.SafeAreaView`
  flex: 1;
  margin-top: 24px;
`;

export const ContainerCard = styled.TouchableOpacity`
  width: 100%;
  height: ${RFValue(146)}px;
  margin-bottom: 32px;
  border-radius: 8px;
`;

export const ImageCard = styled.Image`
  width: 100%;
  height: ${RFValue(146)}px;
  position: absolute;
  z-index: 2;
  border-radius: 8px;
`;

export const ShadowContent = styled.View`
  width: 100%;
  height: ${RFValue(146)}px;
  position: absolute;
  z-index: 3;
  border-radius: 8px;
  padding: 16px;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const TitleCard = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const ContentDescription = styled.View`
  height: ${RFValue(80)}px;
`;

export const DescriptionCard = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  margin-top: ${RFValue(8)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const ContentEmpty = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 120px;
  flex-direction: row;
`;

export const EmptyFilterData = styled.Text`
  font-size: 18px;
  font-family: 'Poppins-Regular';
  color: #2d4379;
  line-height: 24px;
  margin-bottom: 8px;
  margin-top: 8px;
  margin-right: 8px;
`;

export const RowThumbnail = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${RFValue(8)}px;
`;

export const WithoutThumbnail = styled.View`
  width: ${RFValue(32)}px;
  height: ${RFValue(32)}px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.skeleton};
  margin-right: ${RFValue(8)}px;
  align-items: center;
  justify-content: center;
`;

export const Thumbnail = styled.Image`
  width: ${RFValue(32)}px;
  height: ${RFValue(32)}px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.skeleton};
  margin-right: ${RFValue(8)}px;
`;
