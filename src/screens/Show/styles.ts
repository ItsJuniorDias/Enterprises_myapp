import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

export const ContentLoading = styled.View`
  flex: 1;
`;

export const Container = styled.View`
  padding: ${`${RFValue(24)}px ${RFValue(24)}px`};
`;


export const Header = styled.View`
  width: 100%;
  height: ${RFValue(116)}px;
`;

export const Touchable = styled.TouchableOpacity`
  width: 35px;
  height: 35px;
  border-radius: 50px;

  align-items: center;
  justify-content: center;
`;

export const Row = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-top: ${RFValue(8)}px;
`;

export const RowBody = styled.View`
  flex-direction: row;
  margin-bottom: ${RFValue(32)}px;
`;

export const Title = styled.Text`
  font-family: 'Poppins-SemiBold';
  color: #0d253c;
  font-size: ${RFValue(18)}px;
  margin-left: 8px;
  margin-top: ${RFValue(24)}px;
`;

export const Body = styled.View`
  width: 100%;
  height: 219px;
`;

export const ImageBody = styled.Image`
  width: 100%;
  height: 219px;
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
  z-index: 1;
`;

export const ContenFilterImage = styled.View`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 5;
  height: 219px;
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
  position: absolute;
`;

export const Content = styled.View`
  width: 100%;
  padding: ${`${RFValue(0)}px ${RFValue(24)}px`};
`;

export const TitleBody = styled.Text`
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.secondary};
  margin-top: ${RFValue(18)}px;
`;

export const ContentText = styled.View`
  padding: ${`${RFValue(0)}px ${RFValue(24)}px`};
  margin-top: ${RFValue(8)}px;
`;

export const PressableLink = styled.Pressable`
  width: 90%;
  margin-top: ${RFValue(14)}px;
  margin-left: ${RFValue(8)}px;
`;

export const TextLink = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  margin-top: 18px;
  color: ${({ theme }) => theme.colors.light_secondary};
  margin-bottom: 16px;
`;
