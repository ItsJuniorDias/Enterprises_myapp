import styled from 'styled-components/native';

export const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

export const ContentLoading = styled.View`
  flex: 1;
`;

export const Container = styled.View`
  padding: 0 22px;
`;

export const Header = styled.View`
  width: 100%;
  height: 160px;
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
  margin-top: 24px;
`;

export const Title = styled.Text`
  font-family: 'Poppins-SemiBold';
  color: #0d253c;
  font-size: 24px;
  margin-left: 8px;
  margin-top: 24px;
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

  padding: 0 30px;
`;

export const TitleBody = styled.Text`
  font-family: 'Poppins-SemiBold';
  font-size: 18px;
  line-height: 22px;

  color: #0d253c;
  margin-top: 32px;
`;

export const Description = styled.Text`
  font-family: 'Poppins-Regular';
  font-size: 14px;
  line-height: 24px;
  margin-top: 18px;

  color: #2d4379;
  margin-bottom: 16px;
`;

export const FloatView = styled.View`
  width: 120px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  margin-top: 32px;
`;

export const FloatLocation = styled.View`
  width: 80px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  margin-top: 32px;
`;

export const FloatDescription = styled.View`
  width: 160px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  margin-top: 32px;
`;

export const SkeletonPhoto = styled.View`
  width: '100%';
  height: 219px;
  position: absolute;
  border-top-left-radius: 28;
  border-top-right-radius: 28;
`;
