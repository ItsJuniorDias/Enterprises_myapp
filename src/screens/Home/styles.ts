import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  padding: 0 30px;
  margin-top: ${getStatusBarHeight()};
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
  color: #2d4379;
  line-height: 24px;
  margin-bottom: 8px;
`;

export const Description = styled.Text`
  font-family: 'Poppins-SemiBold';

  font-weight: 800;
  font-size: 24px;
  line-height: 33px;

  color: #0d253c;
`;

export const TouchableExit = styled.TouchableOpacity`
  margin-top: -32px;
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
  height: 162px;

  margin-bottom: 32px;
  border-radius: 8px;
`;

export const ImageCard = styled.Image`
  width: 100%;
  height: 162px;
  position: absolute;
  z-index: 2;
  border-radius: 8px;
`;

export const ShadowContent = styled.View`
  width: 100%;
  height: 162px;
  position: absolute;
  z-index: 3;
  border-radius: 8px;
  padding: 16px;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const TitleCard = styled.Text`
  font-family: 'Poppins-SemiBold';

  font-size: 18px;
  z-index: 5;

  /* identical to box height */

  color: #ffffff;
`;

export const ContentDescription = styled.View`
  height: 80px;
`;

export const DescriptionCard = styled.Text`
  font-family: 'Poppins-SemiBold';

  font-size: 14px;
  z-index: 5;

  /* identical to box height */

  color: #ffffff;
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
