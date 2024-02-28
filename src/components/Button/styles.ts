import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Container = styled(TouchableOpacity)`
  width: 100%;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
`;

export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.shape};
  font-size: 18px;
`;
